import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

declare var Razorpay: any;

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private toastr: ToastrService, private route: Router) { }

  getAllPlans(): Observable<any>{
    return this.http.get(`${this.apiUrl}/plan`, httpOptions);
  }

  initiateSubscriptionPayment(subscription_id: string): void {
    
    const options = {
      key: 'rzp_test_NOvxLkFB5JGvn6',
      subscription_id: subscription_id,
      name: 'VoxVortex',
      // amount: 101*100,
      description: 'Monthly Test Plan',
      // image: '/your_logo.jpg',
      handler: (response: any) => {
        this.verifyPayment(response);
      },
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '+918129252000'
      },
      // notes: {
      //   note_key_1: 'Tea. Earl Grey. Hot',
      //   note_key_2: 'Make it so.'
      // },
      theme: {
        color: '#F37254'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  verifyPayment(responce: {razorpay_payment_id:string,razorpay_subscription_id:string,razorpay_signature:string}): void {
    const userId = localStorage.getItem('userData');
    console.log('frontend started...');
    
    this.http.post(`${this.apiUrl}/subscription/verifyPayment/${userId}`,responce,httpOptions).subscribe({
      next: (res: {success:boolean,message:string}) => {
        console.log('got response');
        
        this.toastr.success(res.message);
        this.route.navigate(['/']);

      }, error: (err: {success:boolean,message:string}) => {
        console.log('got error.');
        
        this.toastr.error(err.message)
      }
    })
  }

  createSubScription(userId:string, planId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscription/${userId}`, {planId}, httpOptions);
  }

  getUserPlan(userId: string){
    return this.http.get(`${this.apiUrl}/subscription/plan/${userId}`,httpOptions);
  }

  getUserSubscription(userId: string){
    return this.http.get(`${this.apiUrl}/subscription/${userId}`,httpOptions);
  }

  cancelSubscription(subscription_id: string){
    return this.http.post(`${this.apiUrl}/subscription/cancel/id`,{subscription_id},httpOptions);
  }
}
