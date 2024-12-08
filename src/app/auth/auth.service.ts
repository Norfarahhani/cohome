import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, getAuth, getRedirectResult, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from '@angular/fire/auth';
import { UserModel } from '../models/user.model';
import { HouseholdService } from '../household/household.service';
import { getToken, isSupported, Messaging } from '@angular/fire/messaging';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { Capacitor } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fcmToken: any = "";

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private householdService: HouseholdService,
    private msg: Messaging,
    private platform: Platform
  ) {
  }

  async registerUser(email: string, password: string, userModel?: UserModel) {
    try {
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;
      this.fcmToken = await this.getFcmToken();
      // Create a reference to the user document in Firestore
      const userDocRef = doc(this.firestore, `users/${uid}`);

      // Save the user data along with the FCM token
      await setDoc(userDocRef, {
        name: userModel?.name,
        age: userModel?.age,
        phone: userModel?.phone,
        email: email,
        uid: uid,
        fcmToken: this.fcmToken // Store the FCM token in the user's Firestore document
      });

      return userCredential.user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  private async getFcmToken() {
    if (this.platform.is('android')) {
      // For Android (Capacitor Native)
      PushNotifications.requestPermissions().then(permission => {
        if (permission.receive === 'granted') {
          console.log('Push notifications permission granted');
          PushNotifications.register();
        } else {
          console.error('Push notifications permission denied');
        }
      });

      PushNotifications.addListener('registration', (token: any) => {
        console.log('FCM Token (Android):', token.value);
        this.fcmToken = token.value;
        localStorage.setItem('fcmToken', token.value);
      });

      PushNotifications.addListener('registrationError', (error: any) => {
        console.error('Error during token registration:', error);
      });
    }
    else if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      // For Mobile Web or Desktop
      const isMessagingSupported = await isSupported();
      if (!isMessagingSupported) {
        console.error('Firebase Messaging is not supported in this browser.');
        return null;
      }

      Notification.requestPermission().then(
        async (notificationPermissions: NotificationPermission) => {
          if (notificationPermissions === "granted") {
            console.log("Push notifications permission granted");

            try {
              // Register the service worker
              const serviceWorkerRegistration = await navigator.serviceWorker.register(
                "/assets/firebase-messaging-sw.js",
                { type: "module" }
              );

              // Get FCM Token
              const token = await getToken(this.msg, {
                vapidKey: `BFCYHKYvQyMfsWQeLk3LbxSlgRBtBGMtFNW3q9FVc8VSj2Ex4NsiYwMDUvhAY2-G8_QMy-rcKafz1QIFPHDzNnI`,
                serviceWorkerRegistration: serviceWorkerRegistration,
              });

              console.log('FCM Token (Web):', token);
              this.fcmToken = token;
              localStorage.setItem('fcmToken', token);
            } catch (error) {
              console.error('Error while fetching FCM token:', error);
            }
          } else {
            console.log("Push notifications permission denied");
          }
        }
      );
    } else {
      console.error('Unsupported platform for FCM token generation');
    }
    console.log(this.fcmToken);
    return this.fcmToken;
  }


  async loginUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const household = await this.householdService.checkHousehold();
      await this.getFcmToken();
      localStorage.setItem('auth', userCredential.user.uid);
      if (household.length > 0) {
        localStorage.setItem('household', JSON.stringify(household[0]));
        localStorage.setItem('hasHousehold', 'true');

        const householdData = await this.householdService.getHousehold();
        if (householdData.leader_id == getAuth().currentUser?.uid) {
          localStorage.setItem('isLeader', 'true');
        } else {
          localStorage.setItem('isLeader', 'false');
        }
      } else {
        localStorage.setItem('hasHousehold', 'false');
      }
      const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(
        userDocRef,
        {
          fcmToken: this.fcmToken
        },
        { merge: true }
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async initializeSocialLogin() {
    try {
      SocialLogin.initialize({
        google: {
          webClientId: '177188313300-hunumgnolnkojc9ldb505ucia6dfq64r.apps.googleusercontent.com',
        }
      })
    } catch (error) {
      console.error('Error initializing SocialLogin:', error);
    }
  }

  async loginUserWithGoogle() {
    try {
      const res = await SocialLogin.login({
        provider: 'google',
        options: {
          scopes: ['email', 'profile', 'https://www.googleapis.com/auth/firebase.messaging'],
        },
      });

      if (res && res.result.accessToken) {
        const credential = GoogleAuthProvider.credential(res.result.idToken);
        // Sign in to Firebase using the obtained credential
        const userCredential = await signInWithCredential(this.auth, credential);
        localStorage.setItem('accessToken', res.result.accessToken.token);
        const uid = userCredential.user.uid;
        this.fcmToken = await this.getFcmToken();
        // Check if the user exists in Firestore
        const userDocRef = doc(this.firestore, `users/${uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          // If the user doesn't exist, register them in the users collection
          const userData = {
            name: userCredential.user.displayName,
            email: userCredential.user.email,
            uid: uid,
            photoURL: userCredential.user.photoURL,
            createdAt: new Date().toISOString(),
            fcmToken: this.fcmToken
          };

          // Create the user document in Firestore
          await setDoc(userDocRef, userData);
        }

        // Get the household information
        const household = await this.householdService.checkHousehold();

        // Get the FCM token

        // Store the UID and household data in localStorage
        localStorage.setItem('auth', uid);

        if (household.length > 0) {
          localStorage.setItem('household', JSON.stringify(household[0]));
          localStorage.setItem('hasHousehold', 'true');

          const householdData = await this.householdService.getHousehold();
          if (householdData.leader_id === getAuth().currentUser?.uid) {
            localStorage.setItem('isLeader', 'true');
          } else {
            localStorage.setItem('isLeader', 'false');
          }
        } else {
          localStorage.setItem('hasHousehold', 'false');
        }

        // Update the FCM token in Firestore
        console.log(this.fcmToken);
        await setDoc(
          userDocRef,
          {
            fcmToken: this.fcmToken,
          },
          { merge: true }
        );

        return userCredential.user;
      } else {
        throw new Error('Google login failed: No token received');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
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
