import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, getFirestore, getDoc } from '@angular/fire/firestore';
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
        console.log("User document data:", userDoc.data());
        return userDoc.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } else {
      console.log("No user is logged in");
      return null;
    }
  }

}
