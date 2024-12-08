import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, query, where, getDocs, getFirestore, docData, collectionData, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { firstValueFrom, forkJoin, from, map, switchMap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {
  private apiUrl = 'https://fcm.googleapis.com/v1/projects/cohome-4dc5d/messages:send';
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private http: HttpClient
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

    const data: any = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (data.length > 0) {
      const householdMemberRef = collection(this.firestore, 'household_members');
      const newData = await addDoc(householdMemberRef, {
        household_id: data[0].id,
        member_id: getAuth().currentUser?.uid
      });

      const notificationsCollection = collection(this.firestore, 'notifications');
      this.sendPushNotification(
        localStorage.getItem('fcmToken') ?? '',
        "A New Member Has Joined Your Household",
        "A new member has just joined your household. Check your household details to welcome them!"
      );

      const notificationData = {
        from: getAuth().currentUser?.uid,
        to: data[0].leader_id,
        title: "A New Member Has Joined Your Household",
        body: "A new member has just joined your household. Check your household details to welcome them!",
        created_at: new Date().toISOString(),
        url: '/home/household'
      };

      try {
        await addDoc(notificationsCollection, notificationData);
        console.log('Notification saved successfully:', notificationData);
      } catch (error) {
        console.error('Error saving notification:', error);
      }

      return { 'success': true, 'data': newData };
    }

    return { 'success': false };
  }

  async sendPushNotification(fcmToken: string, title: string, body: string) {
    const token = localStorage.getItem('accessToken');
    const payload = {
      message: {
        token: fcmToken,
        notification: {
          title: title,
          body: body,
        },
      },
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    // Send the notification
    return firstValueFrom(this.http.post(this.apiUrl, payload, { headers }));
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
