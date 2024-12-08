import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getFirestore, docData, query, where, deleteDoc, updateDoc, getDocs } from '@angular/fire/firestore';
import { Auth, getAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { TaskRoutingModule } from './task-routing.module';
import { LocalNotifications } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,

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
        'tasks': taskModel.tasks
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getAllTasks() {
    const household_id = JSON.parse(localStorage.getItem('household') ?? '').household_id;
    const collectionRef = collection(this.firestore, 'tasks');
    const tasksQuery = query(collectionRef, where('household_id', '==', household_id));

    const querySnapshot = await getDocs(tasksQuery);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  getTaskDetails(id: string): Observable<any | null> {
    const taskDocRef = doc(getFirestore(), "tasks", id);
    return docData(taskDocRef);
  }

  async deleteTask(id: string) {
    const taskDocRef = doc(this.firestore, 'tasks', id);
    await deleteDoc(taskDocRef);
  }

  async updateTaskDetails(id: string, taskModel: TaskModel) {
    const user = getAuth().currentUser;

    if (user) {
      const userId = user.uid; // Get authenticated user ID
      const taskDocRef = doc(getFirestore(), "tasks", id); // Reference to the specific task document by its ID

      try {
        // Updating the task document with the provided data
        await updateDoc(taskDocRef, taskModel as Record<string, any>);
        console.log("Task updated successfully");
        return true;
      } catch (error) {
        console.error("Error updating task document:", error);
      }
    } else {
      console.error("User not authenticated");
    }

    return false;
  }

}
