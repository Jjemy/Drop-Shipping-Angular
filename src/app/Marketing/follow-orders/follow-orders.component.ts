import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { MarketeerOrders } from '../../Models/MarketeerOrders';
import { MarketeerOrdersService } from '../../Services/marketeer-orders.service';

@Component({
  selector: 'app-follow-orders',
  templateUrl: './follow-orders.component.html',
  styleUrls: ['./follow-orders.component.css']
})

export class FollowOrdersComponent implements OnInit {

  constructor(private marketeeerOrdersservice: MarketeerOrdersService, private router : Router) { }

  allOrders: MarketeerOrders[];
  cols: any[] = [
    { field: 'marktingProfits', header: 'Your Prophits' },
    { field: 'status', header: 'Order Status' },
    { field: 'dealPrice', header: 'Deal Price' },
    { field: 'totalOptionPrice', header: 'Total Products Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'productName',field2:'availableOptions',field3:'code', header: 'Order Details' },
    { field: 'orderDate', header: 'Order Date' , data: true , format: 'yyyy/MM/dd'  },
    { field: 'orderId', header: 'Order ID' },
  ];
  
  ngOnInit(): void {
    this.marketeeerOrdersservice.getOrders().subscribe(d =>{
      this.allOrders = d;
    });
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }

  Back(){
    this.router.navigateByUrl(" ");
  }
}







