import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
import { Auth, getAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  // Register a new user and add to Firestore
  async createExpense(amount: number, selected_category: string, notes: string, date: string, members: string[]) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user: any = auth.currentUser; // Get the current user
      const expenseRef = collection(this.firestore, 'expenses');

      const expenseDoc = await addDoc(expenseRef, {
        amount: amount,
        selected_category: selected_category,
        notes: notes,
        date: date,
      });

      const expenseMembersRef= collection(this.firestore, 'expense_members');
      members.forEach(async(member) => {
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

}
