import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, getFirestore, getDoc, updateDoc, docData, onSnapshot, where, query } from '@angular/fire/firestore';
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

  async getUsersByIds(userIds: string[]): Promise<any[]> {
    const userPromises = userIds.map(async userId => {
      const userDocRef = doc(this.firestore, 'users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() };
      } else {
        return null; // Return null if the user doesn't exist
      }
    });

    // Wait for all promises to resolve and filter out null values
    const users = await Promise.all(userPromises);
    return users.filter(user => user !== null);
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

  getNotificationsForUser(): Observable<any[]> {
    const notificationsCollection = collection(this.firestore, 'notifications');
    const q = query(notificationsCollection, where('to', '==', getAuth().currentUser?.uid));

    return new Observable<any[]>(observer => {
      onSnapshot(q, async snapshot => {
        const notifications = [];

        // Iterate through all notifications
        for (const docSnapshot of snapshot.docs) {
          const notificationData = docSnapshot.data();  // Correctly get the data from the snapshot

          // Ensure notificationData is properly typed
          const fromUserId = notificationData['from'];

          if (fromUserId) {
            try {
              // Get the 'from' user's data
              const userDocRef = doc(this.firestore, 'users', fromUserId);
              const userDocSnap = await getDoc(userDocRef);

              // Get user details if the document exists
              if (userDocSnap.exists()) {
                const userData: any = userDocSnap.data();
                notificationData['fromName'] = userData?.name || 'Unknown'; // You can store other user data if needed

                // Add the notification with the user's details
                notifications.push({
                  id: docSnapshot.id,  // Use docSnapshot.id to get the document ID
                  ...notificationData   // Add the user info (like fromName) to the notification data
                });
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          }
        }

        // Emit the notifications array
        observer.next(notifications);
      }, error => {
        observer.error(error);
      });
    });
  }

}
