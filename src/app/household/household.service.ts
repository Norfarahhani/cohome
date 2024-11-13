import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  // Register a new user and add to Firestore
  async registerHousehold(household_name: string, household_address: string) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user: any = auth.currentUser; // Get the current user
      const leader_id = user.uid;

      const householdRef = collection(this.firestore, 'households');
      const newHouseholdRef = await addDoc(householdRef, {
        leader_id: leader_id,
        household_name: household_name,
        household_address: household_address,
      });

      const householdMemberRef = collection(this.firestore, 'household_members');
      await addDoc(householdMemberRef, {
        household_id: newHouseholdRef.id,
        member_id: leader_id
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async checkHousehold() {
    const householdMembersCollection = collection(this.firestore, 'household_members');
    const householdMembersQuery = query(householdMembersCollection, where('member_id', '==', getAuth().currentUser?.uid));
    const querySnapshot = await getDocs(householdMembersQuery);

    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return data;
  }

}
