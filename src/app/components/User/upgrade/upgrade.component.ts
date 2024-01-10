import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  monthlyPlan: any = {};
  yearlyPlan: any = {};

  constructor(private subscriptionService: SubscriptionService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.subscriptionService.getAllPlans().subscribe((plans: any[]) => {
      this.monthlyPlan = plans.find(plan => plan.period === 'monthly') || null;
      this.yearlyPlan = plans.find(plan => plan.period === 'yearly') || null;
    })
  }

  createSubcription(planId: string){
    const userId = localStorage.getItem('userData');
    this.subscriptionService.createSubScription(userId,planId).subscribe({
      next: (data:any) => {
        this.initiateSubscriptionPayment(data.subscription_id);
      },
      error: (err) => {
        this.toastr.error(err);
      }
    })
  }

  initiateSubscriptionPayment(subscription_id: string): void {
    this.subscriptionService.initiateSubscriptionPayment(subscription_id);
  }

}
