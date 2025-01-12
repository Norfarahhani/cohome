import { apiClient } from '../service/api.service';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HouseholdService } from '../household/household.service';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fcmToken: string | null = null;
  private refreshLocalStorage = new Subject<void>();
  refreshLocalStorage$ = this.refreshLocalStorage.asObservable();

  constructor(
    private platform: Platform
  ) { }

  async checkAuth() {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  async registerUser(userModel: UserModel) {
    const response: any = await apiClient.post('/register', userModel);

    if (response.success) {
      const data: any = response.data;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('has_household', data.has_household);
      localStorage.setItem('is_leader', data.is_leader);
    }

    return response;
  }

  private async getFcmToken() {
    if (this.platform.is('android')) {
      // For Android (Capacitor Native)
      console.warn('FCM Token generation logic for Android not yet implemented.');
      return 'mock-fcm-token'; // Replace with actual implementation
    } else if (this.platform.is('mobileweb') || this.platform.is('desktop')) {
      // For Web or Desktop
      console.warn('FCM Token generation logic for Web/Desktop not yet implemented.');
      return 'mock-fcm-token'; // Replace with actual implementation
    } else {
      console.error('Unsupported platform for FCM token generation');
      return null;
    }
  }

  async loginUser(email: string, password: string) {
    const response: any = await apiClient.post('/login', {
      email: email,
      password: password,
    });

    if (response.success) {
      const data: any = response.data;
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('has_household', data.has_household);
      localStorage.setItem('is_leader', data.is_leader);
    }

    return response;
  }

  async initializeSocialLogin() {
    console.warn('Social login logic will need to be re-implemented for Laravel.');
  }

  async loginUserWithGoogle() {
    console.warn('Google login logic will need to be re-implemented for Laravel.');
  }

  async logoutUser() {
    const token = localStorage.getItem('access_token');
    const response: any = await apiClient.post('/logout', {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    localStorage.clear();

    return { success: response.success, message: response.message };
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const token = localStorage.getItem('access_token');
    const response: any = await apiClient.post('/change-password', {
      password: currentPassword,
      new_password: newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  triggerRefreshLocalStorage() {
    this.refreshLocalStorage.next();
  }

  async sendResetLink(email: string) {
    const response: any = await apiClient.post('/reset-password', { email: email });
    return response;
  }
}

