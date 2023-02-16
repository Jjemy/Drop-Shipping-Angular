import { Component, OnInit } from '@angular/core';
import { SupplierOrder } from '../Models/supplier-order';
import { SupplierOrderService } from '../Services/supplier-order.service';

@Component({
  selector: 'app-supplier-orders',
  templateUrl: './supplier-orders.component.html',
  styleUrls: ['./supplier-orders.component.css']
})
export class SupplierOrdersComponent implements OnInit {
  loading: boolean;
  orders:SupplierOrder[];
  cols:any[];
  countToMark:number

  constructor(private supplierService:SupplierOrderService) { }

  ngOnInit(): void {
    this.countToMark = this.supplierService.count;
    this.loading = true;
    this.supplierService.getOrders().subscribe(d => {
      this.orders = d.reverse();
      this.supplierService.count = 0; 
      this.loading = false;
    });
    this.cols = [
      { field: 'orderId', header: 'Order ID' },
      { field: 'orderDate', header: 'Order Date' },
      { field: 'productId', header: 'Product ID' },
      { field: 'productName', header: 'Product Name' },
      { field: 'quantity', header: 'Quantity' },
      { field: 'totalOptionPrice', header: 'Price' },
      { field: 'status', header: 'Status' }
    ];
  }
}
