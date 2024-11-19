import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { UserModel } from '../models/user.model';
import { HouseholdService } from '../household/household.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private householdService: HouseholdService
  ) { }

  async registerUser(email: string, password: string, userModel?: UserModel) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      const uid = userCredential.user.uid;

      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, {
        name: userModel?.name,
        age: userModel?.age,
        phone: userModel?.phone,
        email: email,
        uid: uid
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const household = await this.householdService.checkHousehold();

      if (household.length > 0) {
        localStorage.setItem('household', JSON.stringify(household[0]));
        localStorage.setItem('hasHousehold', 'true');

        this.householdService.getHousehold().subscribe({
          next: (data: any) => {
            if (data) {
              if (data.leader_id == getAuth().currentUser?.uid) {
                localStorage.setItem('isLeader', 'true');
              } else {
                localStorage.setItem('isLeader', 'false');
              }
            }
          },
          error: (error) => {
            console.error('Error fetching household details:', error);
          }
        });
      } else {
        localStorage.setItem('hasHousehold', 'false');
      }

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async logoutUser() {
    try {
      await signOut(this.auth);
      localStorage.clear();
    } catch (error) {
      throw error;
    }
  }
}
