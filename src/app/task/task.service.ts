import { Injectable } from '@angular/core';
import apiClient from '../service/api.service'; // Axios instance
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() { }

  async getTasks() {
    const response: any = await apiClient.get('/task', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async getTaskDetails(taskId: string) {
    const response: any = await apiClient.get(`/task/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async createTask(taskData: TaskModel) {
    const response: any = await apiClient.post('/task', taskData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async updateTask(taskId: string, taskData: TaskModel) {
    const response: any = await apiClient.put(`/task/${taskId}`, taskData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async deleteTask(taskId: string) {
    const response: any = await apiClient.delete(`/task/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

}
