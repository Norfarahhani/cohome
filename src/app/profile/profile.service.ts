import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, getFirestore, getDoc, updateDoc, docData } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  getUserDetails(): Observable<any | null> {
    const user = getAuth().currentUser;

    if (user) {
      const userId = user.uid; // Get authenticated user ID
      const userDocRef = doc(getFirestore(), "users", userId); // Reference to Firestore document

      // Return an observable that emits the document data in real-time
      return docData(userDocRef);
    } else {
      // Return an observable that emits null if no user is authenticated
      return of(null);
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
