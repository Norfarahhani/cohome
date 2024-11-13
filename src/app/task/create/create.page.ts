import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-task-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  tasks: string ="";
  notes: string = "";
  reminder: boolean = false;
  selectedRepeatOption: string = "";
  members: string[] = [];
  days: string = "";

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  async cancelCreate() {
    this.router.navigate(['/home/task']);
  }

  public alertButtons = ['Save'];
  public alertInputs = [
    {
      type: 'task',
      placeholder: 'Enter Task',
    },

  ];

  toggleReminder(event: any) {
    // Logic to handle toggle change
    console.log('Repeat Reminder:', this.reminder);
  }

  async create() {
    const register = await this.taskService.createTask(this.tasks, this.notes, this.reminder, this.selectedRepeatOption, this.members, this.days);
    this.router.navigate(['/home/task']);
  }

}



