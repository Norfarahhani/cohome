import { Injectable } from '@angular/core';
import apiClient from '../service/api.service';
import { HouseholdModel } from '../models/household.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HouseholdService {
  private refreshHousehold = new Subject<void>();
  refreshHousehold$ = this.refreshHousehold.asObservable();

  constructor() { }

  async createHousehold(householdData: HouseholdModel) {
    const response: any = await apiClient.post('/household', householdData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    if (response.success) {
      localStorage.setItem('has_household', 'true');
      localStorage.setItem('is_leader', 'true');
    }
    return response;
  }

  async updateHousehold(householdData: HouseholdModel) {
    const response: any = await apiClient.put(`/household/${householdData.id}`, householdData, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async getHouseholdDetails(householdId: string = '') {
    const response: any = await apiClient.get('/household', {
      params: { household_id: householdId },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async joinHousehold(code: string) {
    const response: any = await apiClient.post('/household/join', { code }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    if (response.success) {
      localStorage.setItem('has_household', 'true');
    }
    return response;
  }

  async inviteMember(email: string) {
    const response: any = await apiClient.post('/household/invite', { email }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async deleteMember(memberId: string) {
    const response: any = await apiClient.delete(`/household-member/${memberId}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  triggerRefreshHousehold() {
    this.refreshHousehold.next();
  }
}
