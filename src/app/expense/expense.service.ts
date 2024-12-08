import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, getFirestore, updateDoc, query, where, collectionData, collectionSnapshots, docData, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { ExpenseModel } from '../models/expense.model';
import { firstValueFrom, forkJoin, from, map, merge, mergeMap, Observable, of, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  tokens: string[] = [];
  private apiUrl = 'https://fcm.googleapis.com/v1/projects/cohome-4dc5d/messages:send';
  constructor(
    private firestore: Firestore,
    private http: HttpClient
  ) { }

  async createExpense(expense: ExpenseModel) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user: any = auth.currentUser; // Get the current user
      const expenseRef = collection(this.firestore, 'expenses');

      const expenseDoc = await addDoc(expenseRef, {
        amount: expense.amount,
        selected_category: expense.selected_category,
        notes: expense.notes,
        date: expense.date,
        user_id: user.uid,
        members: expense.members
      });

      const expenseMembersRef = collection(this.firestore, 'expense_members');
      expense.members.forEach(async (member) => {
        await addDoc(expenseMembersRef, {
          expense_id: expenseDoc.id,
          member_id: member,
          status: false,
          members: expense.members.length + 1
        });
      });

      this.getFcmTokensByIds(expense.members).subscribe({
        next: async (data: any) => {
          this.tokens = data;
          const userId = getAuth().currentUser?.uid;

          if (!userId) {
            console.error('User ID not found');
            return;
          }

          const notificationsCollection = collection(this.firestore, 'notifications');

          this.tokens.forEach(async (token: any) => {
            this.sendPushNotification(
              token.fcmToken,
              "New Expense Assigned",
              "You've been assigned a new expense. Check your expenses for more details."
            );

            const notificationData = {
              from: userId,
              to: token.uid,
              title: "New Expense Assigned",
              body: "You've been assigned a new expense. Check your expenses for more details.",
              created_at: new Date().toISOString(),
              url: '/home/expense'
            };

            try {
              await addDoc(notificationsCollection, notificationData);
              console.log('Notification saved successfully:', notificationData);
            } catch (error) {
              console.error('Error saving notification:', error);
            }
          });
        },
        error: (error) => {
          console.error(error);
        },
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendPushNotification(fcmToken: string, title: string, body: string) {
    const token = localStorage.getItem('accessToken');
    const payload = {
      message: {
        token: fcmToken,
        notification: {
          title: title,
          body: body,
        },
      },
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Send the notification
    return firstValueFrom(this.http.post(this.apiUrl, payload, { headers }));
  }

  private async getIdToken() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      return await user.getIdToken();
    } else {
      throw new Error('User not authenticated');
    }
  }


  getFcmTokensByIds(userIds: string[]): Observable<{ uid: string; fcmToken: string }[]> {
    // Creating an array of promises for fetching documents by ID
    const userDocs = userIds.map(userId => {
      // Get reference to each document
      const userDocRef = doc(this.firestore, 'users', userId);
      return getDoc(userDocRef);
    });

    return new Observable<{ uid: string; fcmToken: string }[]>(observer => {
      // Wait for all document retrievals to complete
      Promise.all(userDocs)
        .then(docs => {
          // Map through the docs to extract the uid and fcmToken
          const userTokens = docs
            .map(docSnap => {
              const data: any = docSnap.data();
              if (data && data.fcmToken) {
                return { uid: docSnap.id, fcmToken: data.fcmToken }; // Include uid and fcmToken
              }
              return null; // Exclude documents without fcmToken
            })
            .filter(userToken => userToken !== null); // Exclude null values

          observer.next(userTokens as { uid: string; fcmToken: string }[]); // Emit the array of userTokens
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  getOwnExpenses() {
    const collectionRef = collection(this.firestore, 'expenses');
    const expenseQuery = query(collectionRef, where('user_id', '==', getAuth().currentUser?.uid));

    return collectionData(expenseQuery, { idField: 'id' });
  }

  getExpenseMembers(expenseId: string) {
    const expenseMembersRef = collection(this.firestore, 'expense_members');
    const expenseMembersQuery = query(expenseMembersRef, where('expense_id', '==', expenseId));

    return collectionData(expenseMembersQuery, { idField: 'id' });
  }

  getOtherExpenses() {
    const collectionRef = collection(this.firestore, 'expense_members');
    const q = query(collectionRef, where('member_id', '==', getAuth().currentUser?.uid));

    return collectionData(q, { idField: 'id' }).pipe(
      switchMap((expenses: any[]) => {
        const expenseObservables = expenses.map(expense => {
          const expenseDocRef = doc(this.firestore, 'expenses', expense.expense_id);
          return from(getDoc(expenseDocRef)).pipe(
            map(expenseDoc => ({ ...expense, expense: expenseDoc.exists() ? expenseDoc.data() : null }))
          );
        });
        return forkJoin(expenseObservables);
      })
    );
  }

  getExpenseDetails(id: string) {
    const expenseDocRef = doc(getFirestore(), "expenses", id);
    return docData(expenseDocRef);
  }

  async updateExpenseDetails(id: string, expenseModel: ExpenseModel) {
    const expenseDocRef = doc(getFirestore(), "expenses", id);

    try {
      await updateDoc(expenseDocRef, expenseModel as Record<string, any>);

      const collectionRef = collection(this.firestore, 'expense_members');
      const expenseMemberQuery = query(collectionRef, where('expense_id', '==', id));

      const querySnapshot = await getDocs(expenseMemberQuery);

      const deletePromises = querySnapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(this.firestore, 'expense_members', docSnapshot.id))
      );

      await Promise.all(deletePromises);

      const expenseMembersRef = collection(this.firestore, 'expense_members');
      expenseModel.members.forEach(async (member) => {
        await addDoc(expenseMembersRef, {
          expense_id: id,
          member_id: member,
          status: false,
          members: expenseModel.members.length + 1
        });

      });
      console.log("Expense updated successfully");
    } catch (error) {
      console.error("Error updating task document:", error);
    }

  }

  async updateStatus(check: boolean, id: string) {
    const expenseMemberDocRef = doc(getFirestore(), "expense_members", id);
    try {
      await updateDoc(expenseMemberDocRef, {
        status: check
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }



}
