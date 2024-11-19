import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, query, where, getDocs, getFirestore, docData, collectionData, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { forkJoin, from, map, switchMap } from 'rxjs';

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
        code: this.generateCode()
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

  async joinHousehold(code: string) {
    const householdCollection = collection(this.firestore, 'households');
    const householdQuery = query(householdCollection, where('code', '==', code));
    const querySnapshot = await getDocs(householdQuery);

    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (data.length > 0) {
      const householdMemberRef = collection(this.firestore, 'household_members');
      const newData = await addDoc(householdMemberRef, {
        household_id: data[0].id,
        member_id: getAuth().currentUser?.uid
      });

      return { 'success': true, 'data': newData };
    }

    return { 'success': false };
  }

  async getHousehold(): Promise<any> {
    const household_id = JSON.parse(localStorage.getItem('household') ?? '').household_id;
    const householdDocRef = doc(getFirestore(), "households", household_id);
  
    try {
      const householdSnapshot = await getDoc(householdDocRef); // Fetch the document snapshot
      if (householdSnapshot.exists()) {
        return householdSnapshot.data(); // Return the document data
      } else {
        throw new Error("Household not found");
      }
    } catch (error) {
      console.error("Error fetching household:", error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  }

  getHouseholdMembers() {
    const household_id = JSON.parse(localStorage.getItem('household') ?? '').household_id;
    const collectionRef = collection(this.firestore, 'household_members');
    const q = query(collectionRef, where('household_id', '==', household_id));

    return collectionData(q, { idField: 'id' }).pipe(
      switchMap((members: any[]) => {
        const userObservables = members.map(member => {
          const userDocRef = doc(this.firestore, 'users', member.member_id);
          return from(getDoc(userDocRef)).pipe(
            map(userDoc => ({ ...member, userDetails: userDoc.exists() ? userDoc.data() : null }))
          );
        });
        return forkJoin(userObservables);
      })
    );
  }

  generateCode(length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
}
