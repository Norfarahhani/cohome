import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
import { Auth, getAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) { }

  async createTask(tasks: string, notes: string, date: string, reminder: boolean, selectedRepeatOption: string, members: string[], days: string) {
    try {
      const auth = getAuth(); // Get the Firebase Auth instance
      const user: any = auth.currentUser; // Get the current user
      const taskRef = collection(this.firestore, 'tasks'); //'tasks" is nama table dalam firebase

      const taskDoc = await addDoc(taskRef, {
        tasks: tasks,
        notes: notes,
        date: date,
        reminder: reminder,
        selectedRepeatOption: selectedRepeatOption,
        members: members,
        days: days,
      });

      const taskMembersRef= collection(this.firestore, 'task_members');
      members.forEach(async(member) => {
        await addDoc(taskMembersRef, {
          task_id: taskDoc.id,
          member_id: member,
          status: "unpaid",
        });
  
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  

}
