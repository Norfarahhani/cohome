import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { HouseholdService } from 'src/app/household/household.service';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';
import { TaskModel } from 'src/app/models/task.model';


@Component({
  selector: 'app-task-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  taskModel: TaskModel = new TaskModel();
  householdMemberModels: HouseholdMemberModel[] = [];

  constructor(private taskService: TaskService, private router: Router, private householdService: HouseholdService) { }

  ngOnInit() {
    this.getHouseholdMembers();
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

  async create() {
    this.taskModel.household_id = JSON.parse(localStorage.getItem('household') ?? '').household_id;
    await this.taskService.createTask(this.taskModel);
    this.router.navigate(['/home/task']);
  }

  getHouseholdMembers() {
    this.householdService.getHouseholdMembers().subscribe({
      next: (data: any) => {
        if (data) {
          this.householdMemberModels = data;
        }
      },
      error: (error) => {
        console.error('Error fetching household details:', error);
      }
    });
  }

}



