import { Injectable } from '@angular/core';
import apiClient from '../service/api.service';
import { UserModel } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private refreshProfile = new Subject<void>();
  refreshProfile$ = this.refreshProfile.asObservable();

  constructor() { }

  async getUserDetails() {
    const response = JSON.parse(localStorage.getItem('user') ?? '{}');
    return response;
  }

  async updateUserDetails(user: UserModel) {
    const response: any = await apiClient.post('/profile', user, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  }

  async uploadQrCode(qrCode: string) {
    const response: any = await apiClient.post('/profile/qr-code', { qr_code: qrCode }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    if (response.success) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  }

  triggerRefreshProfile() {
    this.refreshProfile.next();
  }
}
