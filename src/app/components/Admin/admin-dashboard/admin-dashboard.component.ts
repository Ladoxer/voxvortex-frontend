import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { AdminService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalBlogs: number;
  totalLabels: number;
  totalUsers: number;
  totalPremiumUsers: number;
  totalNormalUsers: number;
  topLabels: {label: string; count: number}[];

  constructor(private adminService: AdminService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTopLabels();
    this.getTotalBlogs();
    this.getTotalLabels();
    this.getTotalUsers();
    this.getPremiumAndNormalUsers();
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Python', 'Machine Learning', 'Angular', 'Golang'],
    datasets: [{ data: [3,2,1,1], label: 'Trending Labels' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // PIE CHART
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Premium User', 'Normal User'];
  public pieChartDatasets = [];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  getTotalBlogs() {
    this.adminService.getTotalBlogs().subscribe((total: number) => {
      this.totalBlogs = total;
    });
  }

  getTotalLabels() {
    this.adminService.getTotalLabels().subscribe((total: number) => {
      this.totalLabels = total;
    });
  }

  getTotalUsers() {
    this.adminService.getTotalUsers().subscribe((total: number) => {
      this.totalUsers = total;
    });
  }

  getPremiumAndNormalUsers() {
    this.adminService.getPremiumAndNormalUsers().subscribe((res) => {
      this.totalNormalUsers = res.normalUsers;
      this.totalPremiumUsers = res.premiumUsers;
      this.pieChartDatasets = [
        {
          data: [this.totalPremiumUsers, this.totalNormalUsers],
        },
      ];
    });
  }

  getTopLabels() {
    this.adminService.getTopLabels().subscribe((res) => {
      this.topLabels = res;
      this.barChartData.labels = this.topLabels.map((item) => item.label);
      this.barChartData.datasets[0].data = this.topLabels.map((item) => item.count);
      // this.barChartData.datasets[0].label = 'Trending Labels';
      this.changeDetectorRef.detectChanges();
    })
  }
}
