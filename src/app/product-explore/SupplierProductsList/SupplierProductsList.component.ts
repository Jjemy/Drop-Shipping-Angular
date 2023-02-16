import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product';
import { AuthService } from '../../Services/auth.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-SupplierProductsList',
  templateUrl: './SupplierProductsList.component.html',
  styleUrls: ['./SupplierProductsList.component.css']
})
export class SupplierProductsListComponent implements OnInit {

  products: Product[];
  productsEx: Product[];
  SupplierId:number;

  constructor(private productServ: ProductService ,private authService:AuthService) { }

  ngOnInit():void {
    this.SupplierId = this.authService.decodedToken.nameid;
    this.productServ.GetSupplierProducts(this.SupplierId).subscribe(prods =>{
      this.products = prods
    });
    this.productServ.GetSupplierProductsEx(this.SupplierId).subscribe(am=>{
      this.productsEx=am;
    });
  }
}