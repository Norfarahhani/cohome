import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/profile/profile.service';


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
    'sunday'
  ];
  tasks: string[] = [
    'Mop Floor',
    'Wash Sink',
    'Clean windows',
    'Empty trash',
    'Others'
  ]
  current: number = (
    new Date().getDay() == 0 //condition
      ? 6 //if true = 6
      : new Date().getDay() - 1 //if false = -1
  );

  groupedByDays: { [key: string]: any[] } = {};

  today: string = this.days[this.current];
  isLeader: boolean = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getTasks();
    this.leaderCheck();
  }
  public alertButtons = ['Save'];
  public alertInputs = [
    {
      type: 'task',
      placeholder: 'Enter Task',
    },
  ];

  ucfirst(str: string): string {
    if (!str) return str; // Handle empty string or null/undefined case
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getTaskName(index: number) {
    return this.tasks[index];
  }

  async getTasks() {
    const data: any[] = await this.taskService.getAllTasks();
    this.groupedByDays = {};
    data.forEach(async (task) => {
      const users = await this.getUsersById(task.members);
      task = { ...task, users: users.map((user: any) => user.name).join(', ') };
      task.days.forEach((day: string | number) => {
        if (!this.groupedByDays[day]) {
          this.groupedByDays[day] = [];
        }
        this.groupedByDays[day].push(task);
      });
    });
  }

  async getUsersById(ids: string[]) {
    return await this.profileService.getUsersByIds(ids);
  }

  navigateToEditTask(id: string) {
    if (!this.isLeader) return;
    this.router.navigate(['/task/view', id]);
  }

  leaderCheck() {
    const check = localStorage.getItem('isLeader');
    this.isLeader = (check == 'true') ? true : false;
  }

}
