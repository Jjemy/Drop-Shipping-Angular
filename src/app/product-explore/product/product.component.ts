import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ProductOptionComponent } from '../product-options/product-options.component';
import { CartManagementService } from '../../Services/cart-management.service';
import { AddToCart } from '../../Models/AddToCart';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [DialogService, MessageService]
})
export class ProductComponent {

  @Input() product: Product;
  ref:DynamicDialogRef;
  quantity:number=1;
  model : AddToCart;

  constructor(private dialogService: DialogService, private messageService:MessageService , private services : CartManagementService, private fb:FormBuilder) { }

  showOptionsDialog(){
    this.ref = this.dialogService.open(ProductOptionComponent, {
      data: this.product,
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto", "border-radius": "40px", "padding": "30px"},
      baseZIndex: 10000,
      style: {"direction":"rtl"},
      showHeader:false
    });
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

  addToCart(){
    this.services.AddToCart( this.product.options[0].id,this.quantity).subscribe(
      suc=>{
        alert("Item is added to cart successfully")
      },e=>{
        alert(e.error)
      }
    )
  }
}
