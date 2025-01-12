import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskModel } from 'src/app/models/task.model';
import { HouseholdService } from 'src/app/household/household.service';
import { ToastService } from 'src/app/service/toast.service';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-task-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  taskId: string = '';
  taskModel: TaskModel = new TaskModel();
  householdMembers: any;

  constructor(
    private router: Router,
    private taskService: TaskService,
    private householdService: HouseholdService,
    private toastService: ToastService,
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    this.taskId = this.navParams.get('id');
  }

  ngOnInit() {
    this.getHouseholdMembers();
    this.getTaskDetails();
  }

  async dismissModal() {
    this.modalController.dismiss();
  }

  async getHouseholdMembers() {
    const response: any = await this.householdService.getHouseholdDetails();
    if (response.success) {
      this.householdMembers = response.data.household_members;
    }
  }

  async getTaskDetails() {
    const response: any = await this.taskService.getTaskDetails(this.taskId);
    if (response) {
      this.taskModel = response.data;
      this.taskModel.members = response.data.task_members.map((member: any) => member.user.id);
      this.taskModel.task_id = response.data.task_id.toString()
      this.taskModel.days = JSON.parse(response.data.days);
    }
  }

  async deleteTask() {
    const response: any = await this.taskService.deleteTask(this.taskId);
    if (response.success) {
      this.dismissModal().then(() => {
        this.toastService.showSuccess('Task deleted successfully');
      });
    }
  }

  async updateTaskDetails() {
    const response: any = await this.taskService.updateTask(this.taskId, this.taskModel);
    if (response.success) {
      this.dismissModal().then(() => {
        this.toastService.showSuccess('Task updated successfully');
      });
    }
  }

}
