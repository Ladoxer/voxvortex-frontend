import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Rank 1','Rank 2', 'Rank 3', 'Rank 4', 'Rank 5'],
    datasets: [{ data: [100,200,300,400,400], label:'Trending Labels'}]
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };


  // PIE CHART
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['Premium User', 'Normal User'];
  public pieChartDatasets = [
    {
      data: [1,3],
    },
  ];

  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(

  ) {}

  ngOnInit(): void {
    
  }
}
