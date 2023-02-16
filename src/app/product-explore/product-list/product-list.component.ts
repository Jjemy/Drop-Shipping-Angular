import { Component, OnInit } from '@angular/core';
import { ManageCategories } from '../../Models/ManageCategories';
import { Product } from '../../Models/Product';
import { AdminManageCategoriesService } from '../../Services/admin-manage-categories.service';
import { ProductService } from '../../Services/product.service';
import * as $ from '../../../assets/js/jquery-3.3.1.min.js';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products:Product[];
  topProducts:Product[];
  allCategories: ManageCategories[];
  selectedCategory: ManageCategories;
  testProds:Product[]=[];
  sortOptions: any[];
  sortOrder: number;
  sortField: string;

  constructor(private productServ:ProductService,private adminMCategoriesServ: AdminManageCategoriesService) { }

  ngOnInit(): void {
    this.productServ.getProducts().subscribe(
      prods => this.products = prods
    );
    this.productServ.getTopProducts(3).subscribe(
      prods => this.topProducts = prods
    );
    this.allCategories = [new ManageCategories(0, "All Categories")];
    this.sortOptions = [
      {label: 'By heighst price', value: '!price'},
      {label: 'By least price', value: 'price'}
    ];
    this.loadCategories();
  }

  loadCategories(){
    this.adminMCategoriesServ.getCategories().subscribe(d=>{
      d.forEach(x => this.allCategories.push(x));
    });
  }

  CategoryChanging( ID :number)
  {
    if(ID != 0){
      this.productServ.getCategoryProducts(ID).subscribe(
        prods => this.products = prods
      )
      this.productServ.getCatgoreyTopProducts(ID,3).subscribe(
        prods =>{
          this.topProducts = prods;
        }
      )
    }
    else{
      this.productServ.getProducts().subscribe(
        prods => this.products = prods
      );
      this.productServ.getTopProducts(3).subscribe(
        prods => this.topProducts = prods
      );
    }
  }

  onSortChange(event:any) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
