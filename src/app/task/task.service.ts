import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData} from '@angular/fire/firestore';
import { Auth, getAuth} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  async createTask(tasks: string, notes: string, reminder: boolean, selectedRepeatOption: string, members: string[], days: string) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user: any = auth.currentUser; // Get the current user
      const taskRef = collection(this.firestore, 'tasks'); //'tasks" is nama table dalam firebase

      await addDoc(taskRef, {
        tasks: tasks,
        notes: notes,
        reminder: reminder,
        selectedRepeatOption: selectedRepeatOption,
        members: members,
        days: days,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getAllDocuments(): Observable<any[]> {
    const collectionRef = collection(this.firestore, 'tasks'); // Replace with your collection name
    return collectionData(collectionRef, { idField: 'id' });
  }

  

}
