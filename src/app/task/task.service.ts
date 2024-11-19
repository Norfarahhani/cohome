import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getFirestore, docData, query, where, deleteDoc } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  async createTask(taskModel: TaskModel) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const taskRef = collection(this.firestore, 'tasks'); //'tasks" is nama table dalam firebase

      await addDoc(taskRef, {
        'household_id': taskModel.household_id,
        'days': taskModel.days,
        'members': taskModel.members,
        'notes': taskModel.notes,
        'reminder': taskModel.reminder,
        'selectedRepeatOption': taskModel.selectedRepeatOption,
        'tasks': taskModel.tasks
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  getAllTasks(): Observable<any[]> {
    const household_id = JSON.parse(localStorage.getItem('household') ?? '').household_id;
    const collectionRef = collection(this.firestore, 'tasks');
    const tasksQuery = query(collectionRef, where('household_id', '==', household_id));
    
    return collectionData(tasksQuery, { idField: 'id' });
  }

  getTaskDetails(id: string): Observable<any | null> {
    const taskDocRef = doc(getFirestore(), "tasks", id);
    return docData(taskDocRef);
  }

  async deleteTask(id: string) {
    const taskDocRef = doc(this.firestore, 'tasks', id);
    await deleteDoc(taskDocRef);
  }

}
