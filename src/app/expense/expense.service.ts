import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDoc, doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { ExpenseModel } from '../models/expense.model';

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
      });

      const expenseMembersRef = collection(this.firestore, 'expense_members');
      expense.members.forEach(async (member) => {
        await addDoc(expenseMembersRef, {
          expense_id: expenseDoc.id,
          member_id: member,
          status: "unpaid",
        });

      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getExpenseDetails() {
    const user = getAuth().currentUser;

    if (user) {
      const userId = user.uid; // Get authenticated user ID
      const userDocRef = doc(getFirestore(), "users", userId); // Reference to Firestore document
      const userDoc = await getDoc(userDocRef); // Fetch document

      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async updateExpenseDetails(data: {}) {
    const user = getAuth().currentUser;

    if (user) {
      const userId = user.uid; // Get authenticated user ID
      const userDocRef = doc(getFirestore(), "users", userId); // Reference to Firestore document

      try {
        await updateDoc(userDocRef, data);
      } catch (error) {
        console.error("Error updating document:", error);
      }

      return true;
    }

    return false;
  }



}
