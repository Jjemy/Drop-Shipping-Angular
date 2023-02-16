import { Option } from '../Models/option';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/Product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = environment.ApiUrl + 'Product/';
  SupplierId:number;

  constructor(private http: HttpClient, private authService:AuthService){}

  getProducts(){
    return this.http.get<Product[]>(this.url);
  }

  GetSupplierProducts(id:number){
    return this.http.get<Product[]>(this.url+"GetSupplierProducts/"+id);
  }

  deleteProduct(id:number){
    return this.http.delete(this.url+"deleteProduct/"+id);
  }

  editOption(optionEdited:Option){
    return this.http.put(this.url+"editOption/",optionEdited);
  }

  getTopProducts(top:number){
    return this.http.get<Product[]>(this.url+"GetTopProducts/"+top);
  }

  getCatgoreyTopProducts(catgoreyId:number,top:number){
    return this.http.get<Product[]>(this.url+"GetTopProducts/"+catgoreyId+"/"+top);
  }

  getCategoryProducts(id : number){
    return this.http.get<Product[]>(this.url + id);
  }

  GetSupplierProductsEx(id:number){
    return this.http.get<Product[]>(this.url+"GetSupplierProductsEX/"+id);
  }
}
