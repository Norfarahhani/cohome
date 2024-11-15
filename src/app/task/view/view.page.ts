import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { HouseholdService } from 'src/app/household/household.service';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';


@Component({
  selector: 'app-task-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  tasks: string = '';
  notes: string = '';
  reminder: boolean = false;
  selectedRepeatOption: string = "";
  members: string[] = [];
  householdMemberModels: HouseholdMemberModel[] = [];
  days: string = "";


  constructor(private router: Router, private taskService: TaskService, private householdService: HouseholdService) { }

  ngOnInit() {
    this.getTaskDetails();
    this.getHouseholdMembers();

  }

  async cancelCreate() {
    this.router.navigate(['/home/task']);
  }

  toggleReminder(event: any) {
    // Logic to handle toggle change
    console.log('Repeat Reminder:', this.reminder);
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

  getTaskDetails() {
    this.taskService.getTaskDetails().subscribe({
      next: (data: any) => {
        if (data) {
          this.tasks = data.tasks;
          this.notes = data.notes;
          this.reminder = data.reminder;
          this.selectedRepeatOption = data.selectedRepeatOption;
          
        }
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }


}

