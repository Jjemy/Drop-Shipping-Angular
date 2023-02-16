import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/Models/order';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  order:Order;
  public total = 0;
  
  constructor( private resolve:ActivatedRoute,public authService: AuthService) { }

  ngOnInit() {
    this.resolve.data.subscribe(
      data=>{
        this.order=data['OrderDetails']
        this.findsum(data['OrderDetails'])
      })
    }

    findsum(data) {
      this.order = data;
      for(var result of data.orderDetail){
        this.total += result.totalOptionPrice;
      }
    }
}
