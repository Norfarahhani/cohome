import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { HouseholdService } from 'src/app/household/household.service';
import { HouseholdMemberModel } from 'src/app/models/household-member.model';
import { TaskModel } from 'src/app/models/task.model';


@Component({
  selector: 'app-task-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  taskId: string = this.route.snapshot.paramMap.get('id') ?? '';
  taskModel: TaskModel = new TaskModel();
  householdMemberModels: HouseholdMemberModel[] = [];

  constructor(private router: Router, private taskService: TaskService, private householdService: HouseholdService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getHouseholdMembers();
    this.getTaskDetails();
  }

  async cancelCreate() {
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

  getTaskDetails() {
    this.taskService.getTaskDetails(this.taskId).subscribe({
      next: (data: any) => {
        if (data) {
          this.taskModel = data;
        }
      },
      error: (error) => {
        console.error('Error fetching household details:', error);
      }
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId);
    this.router.navigate(['/home/task']);
  }


}

