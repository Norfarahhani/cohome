import { Injectable } from '@angular/core';
import apiClient from '../service/api.service';
import { ExpenseModel } from '../models/expense.model';
import { HouseholdMemberModel } from '../models/household-member.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor() { }

  async getExpenses(own: boolean = false) {
    const response = await apiClient.get('/expense', {
      params: {
        own: own
      },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async createExpense(expense: ExpenseModel) {
    const response = await apiClient.post('/expense', expense, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    return response;
  }

  async updatePaid(isPaid: boolean, id: number) {
    const response = await apiClient.put(`/expense_member/${id}`, { is_paid: isPaid }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async deleteExpense(id: string) {
    const response = await apiClient.delete(`/expense/${id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async getExpenseSummaryByCategory() {
    const response = await apiClient.get('/expense/summary', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async getExpenseById(id: string) {
    const response = await apiClient.get(`/expense/${id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async updateExpense(expense: ExpenseModel) {
    const response = await apiClient.put(`/expense/${expense.id}`, expense, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }

  async uploadReceipt(receipt: string, id: number) {
    const response = await apiClient.post(`/expense-member/receipt-upload/${id}`, { receipt }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
    });
    return response;
  }
}
