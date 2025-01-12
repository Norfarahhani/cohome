import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { HouseholdService } from 'src/app/household/household.service';
import { TaskModel } from 'src/app/models/task.model';
import { ToastService } from 'src/app/service/toast.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-task-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  taskModel: TaskModel = new TaskModel();
  householdMembers: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private householdService: HouseholdService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getHouseholdMembers();
  }

  async createTask() {
    const response: any = await this.taskService.createTask(this.taskModel);
    if (response.success) {
      this.dismissModal();
      this.toastService.showSuccess('Task created successfully');
    } else {
      this.toastService.showError('Error creating task');
    }
  }

  async getHouseholdMembers() {
    const response: any = await this.householdService.getHouseholdDetails();
    if (response.success) {
      this.householdMembers = response.data.household_members;
    }
  }

  dismissModal() {
    this.modalController.dismiss({ refresh: false });
  }


}



