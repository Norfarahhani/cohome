import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';


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

  constructor(private modalCtrl: ModalController, private taskService: TaskService, private router: Router) { }

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

  getTasks() {
    this.taskService.getAllTasks().subscribe((data) => {
      this.groupedByDays = {};
      data.forEach(task => {
        task.days.forEach((day: string | number) => {
          if (!this.groupedByDays[day]) {
            this.groupedByDays[day] = [];
          }
          this.groupedByDays[day].push(task);
        });
      });
    });
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
