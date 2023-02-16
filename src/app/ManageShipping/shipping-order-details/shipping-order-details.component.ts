import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShippingOrderDetails } from 'src/app/Models/shipping-order-details';

@Component({
  selector: 'app-shipping-order-details',
  templateUrl: './shipping-order-details.component.html',
  styleUrls: ['./shipping-order-details.component.css']
})
export class ShippingOrderDetailsComponent implements OnInit {

  constructor( public dialogRef: DynamicDialogRef, public dialogConfig: DynamicDialogConfig) { }

  shippingOrderDetails:ShippingOrderDetails[];

  ngOnInit(): void {
    this.shippingOrderDetails=this.dialogConfig.data;
  }

  closeModal(){
    this.dialogRef.close();
  }
}