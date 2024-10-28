import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, getFirestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  async getUserDetails() {
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

  async updateUserDetails(data: {}) {
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
