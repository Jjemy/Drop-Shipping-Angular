import { ShippingOrderDetails } from '../../Models/shipping-order-details';
import { ShippingOrderDetailsComponent } from '../shipping-order-details/shipping-order-details.component';
import { Router } from '@angular/router';
import { ShippingCompanies } from '../../Models/ShippingCompanies';
import { ManageShippingService } from '../../Services/ManageShipping.service';
import { BindingOrders } from '../../Models/BindingOrders';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DialogService,DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-BindingOrders',
  templateUrl: './BindingOrders.component.html',
  styleUrls: ['./BindingOrders.component.css'],
  providers: [DialogService]
})

export class BindingOrdersComponent implements OnInit {

  bindingOrders: BindingOrders[];
  binOrder: BindingOrders;
  shippingCompanies: ShippingCompanies[];
  cols: any[];
  active=false;
  shippingCompany:number;
  shippingPolicy:string;
  dialogref:DynamicDialogRef;
  orderdetails:ShippingOrderDetails[];
  bindingOrder=new FormGroup({
    'ShippingCompany':new FormControl('',[Validators.required]),
    'ShippingPolicy':new FormControl('',Validators.required),
  });
  
  constructor(private _service: ManageShippingService, public router: Router, private dialogService: DialogService) { }

  ngOnInit() {
    this._service.GetAllBindingOrders().subscribe(a => {
      this.bindingOrders = a;
    });
    this._service.GetAllShippingCompanies().subscribe(s => {
      this.shippingCompanies = s;
    });
    this.cols = [
      { field: 'clientName', header: 'clientName' },
      { field: 'phone', header: 'phone' },
      { field: 'address', header: 'address' },
    ];
  }

  handleChange(e: { checked: any; }) {
    if (e.checked) {
      alert("Ordered was delivered to Shipping company")
    }
    var obj = this.bindingOrder.value;
  }


  ShippOrder(id:number){
    var obj:any = this.bindingOrder.value;
    if(obj['ShippingPolicy'] == "" || obj['ShippingCompany'] == "") {
      alert("Please, Enter Shipment Details");
    }
    else{
      this._service.ShippingOrder(id,obj['ShippingPolicy'],obj['ShippingCompany']).subscribe(a => {
        alert("Order Was delivered to Shipping company");
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(["bindingorders"]);
        });
      });
    }
  }

  showOrderDetailDialog(id:number){
    this._service.ShippingOrderDetails(id).subscribe(a => {
      this.orderdetails = a;
      this.dialogref = this.dialogService.open(ShippingOrderDetailsComponent, {
        data: this.orderdetails,
        width: '70%',
        contentStyle: { "max-height": "500px", "overflow": "auto", "border-radius": "40px", "padding": "30px" },
        baseZIndex: 10000,
        style: { "direction": "rtl" },
        showHeader: false
      });
    });
  }

  ngOnDestroy() {
    if (this.dialogref) {
      this.dialogref.close();
      this.orderdetails=null;
    }
  }
}