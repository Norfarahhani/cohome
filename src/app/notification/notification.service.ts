import { Injectable } from '@angular/core';
import apiClient from '../service/api.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
  }

  async getNotifications() {
    const response = await apiClient.get('/notifications', {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    });
    return response;
  }

  async markAsRead() {
    const response = await apiClient.put(
      `/notifications/mark-as-read`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
      }
    );
    return response;
  }
}
