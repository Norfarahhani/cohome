import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, getFirestore, updateDoc, query, where, collectionData, collectionSnapshots, docData, getDocs, deleteDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { ExpenseModel } from '../models/expense.model';
import { forkJoin, from, map, merge, mergeMap, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(
    private firestore: Firestore,
  ) { }

  // Register a new user and add to Firestore
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

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
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
