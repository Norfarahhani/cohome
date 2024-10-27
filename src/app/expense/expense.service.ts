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
  async createExpense(name: string, selected_category: string, notes: string, selected_date: string) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user: any = auth.currentUser; // Get the current user
      const leader_id = user.uid;
      const expensedRef = collection(this.firestore, 'expense');

      await addDoc(expensedRef, {
        leader_id: leader_id,
        name: name,
        selected_category: selected_category,
        notes: notes,
        selected_date: selected_date,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
