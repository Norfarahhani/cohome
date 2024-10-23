import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // Register a new user and add to Firestore
  async registerUser(email: string, password: string, userData: { name: string; age: number; phone: string; }) {
    try {
      // Register user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Get the UID of the newly registered user
      const uid = userCredential.user.uid;

      // Create user data to store in Firestore
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, {
        name: userData.name,
        age: userData.age,
        phone: userData.phone,
        email: email,
        uid: uid
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Log in a user
  async loginUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Log out the user
  async logoutUser() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }
}
