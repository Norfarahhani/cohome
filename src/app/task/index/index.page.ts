import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { CreatePage } from '../create/create.page';
import { ViewPage } from '../view/view.page';

@Component({
  selector: 'app-task-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  days: string[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];
  tasks: string[] = [
    'Mop Floor',
    'Wash Sink',
    'Clean windows',
    'Empty trash',
    'Others',
  ];
  current: number =
    new Date().getDay() == 0 ? 6 : new Date().getDay() - 1;

  groupedByDays: { [key: string]: any[] } = {};

  today: string = this.days[this.current];
  isLeader: boolean = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getLocalStorage();
    this.getTasks();
  }

  async getTasks() {
    const response: any = await this.taskService.getTasks();
    if (response.success) {
      this.groupedByDays = response.data;
    }
  }

  ucfirst(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  navigateToEditTask(id: string) {
    if (!this.isLeader) return;
    this.router.navigate(['/task/view', id]);
  }

  getLocalStorage() {
    this.isLeader = localStorage.getItem('is_leader') === 'true';
  }

  implodeUsers(users: any[]) {
    return users.map((user: any) => user.user.name).join(', ');
  }

  async openCreateTaskModal() {
    const modal = await this.modalController.create({
      component: CreatePage,
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.refresh) {
        this.getTasks(); // Refresh tasks after creating a new one
      }
    });

    await modal.present();
  }

  async openEditTaskModal(id: string) {
    if (!this.isLeader) return;
    const modal = await this.modalController.create({
      component: ViewPage,
      componentProps: {
        id: id,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data?.refresh) {
        this.getTasks();
      }
    });

    await modal.present();
  }

  refreshData(event: any) {
    setTimeout(() => {
      this.getTasks();
      event.target.complete();
    }, 2000);
  }
}
