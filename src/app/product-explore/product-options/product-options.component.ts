import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../Models/Product';
import { CartManagementService } from '../../Services/cart-management.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.css']
})
export class ProductOptionComponent {

  constructor(private productService: ProductService, public ref: DynamicDialogRef, public config: DynamicDialogConfig ,private services : CartManagementService) { }
  
  product: Product = this.config.data;
  optionId:number;
  quantity:number=1;
  cols: any[];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  selectProduct(product: Product) {
    this.ref.close(product);
  }

  closeModel(){
    this.ref.close();
  }

  addToCart(){
    this.services.AddToCart(this.optionId,this.quantity).subscribe(
      suc=>{
        alert("Item is added to cart successfully")
      },e=>{
        alert(e.error)
      }
    )
  }
}
