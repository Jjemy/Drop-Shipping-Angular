import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortEvent } from 'primeng/api';
import { ShippingOrdersStatus } from '../Models/ShippingOrdersStatus';
import {UpdateStatus} from '../Models/UpdateStatus';
import { ShippingStatusService } from '../Services/shipping-status.service';

@Component({
  selector: 'app-update-order-status',
  templateUrl: './update-order-status.component.html',
  styleUrls: ['./update-order-status.component.css']
})

export class UpdateOrderStatusComponent implements OnInit {

  constructor(private shippingStatusService: ShippingStatusService, private router : Router, private ac: ActivatedRoute) { }
  
  allOrders: ShippingOrdersStatus[];
  cols: any[];
  status : UpdateStatus;

  ngOnInit(): void {
    this.shippingStatusService.getOrders().subscribe(d =>{
      this.allOrders = d;
    });

    this.cols = [
      { field: 'id', header: 'Request Number' },
      { field: 'orderDate', header: 'Request date' },
      { field: 'clientName', header: 'Client Name' },
      { field: 'shippingPolicy', header: 'Policy number' },
    ]
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

  updateStatus(id:number,value: string)
  {
    this.shippingStatusService.UpdateOrderStatus(id,value).subscribe(a=>{
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(["ShippingStatus"]);
      });
    });
  }
}