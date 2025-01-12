import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ArcElement, Tooltip, Chart, Legend, Title, PieController, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { ExpenseService } from 'src/app/expense/expense.service';

Chart.register(ArcElement, Tooltip, Legend, Title, PieController, LineController, CategoryScale, LinearScale, PointElement, LineElement);

@Component({
  selector: 'app-profile-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  expenseData: any[] = [];
  totalExpense = 0;
  highestCategory = '';
  avgExpense = 0;

  constructor(private expenseService: ExpenseService, private navCtrl: NavController) {}

  ngOnInit() {
    this.loadExpenseData();
  }

  async loadExpenseData() {
    try {
      const response: any = await this.expenseService.getExpenseSummaryByCategory();
      if (response.success) {
        this.expenseData = response.data;

        this.totalExpense = this.expenseData.reduce((sum, item) => sum + item.total_amount, 0);
        this.highestCategory = this.expenseData.sort((a, b) => b.total_amount - a.total_amount)[0]?.category || 'N/A';
        this.avgExpense = this.totalExpense / (this.expenseData.length || 1);

        this.renderCategoryChart();
      } else {
        console.error('Failed to load expense data');
      }
    } catch (error) {
      console.error('Error fetching expense summary:', error);
    }
  }

  renderCategoryChart() {
    const ctx = (document.getElementById('expenseChart') as HTMLCanvasElement).getContext('2d');

    if (!ctx) {
      console.error('Could not get canvas context.');
      return;
    }

    const categories = this.expenseData.map((item) => item.category);
    const amounts = this.expenseData.map((item) => item.total_amount);

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: categories,
        datasets: [
          {
            label: 'Expenses by Category',
            data: amounts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw as number;
                return ` RM${value.toFixed(2)}`;
              },
            },
          },
        },
      },
    });
  }

  back() {
    this.navCtrl.back();
  }
}
