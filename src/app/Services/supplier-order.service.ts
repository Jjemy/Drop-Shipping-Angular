import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../Dtos/category';
import { ProductData } from '../Dtos/product-data';
import { ProductForUpload } from '../Dtos/product-for-upload';
import { SupplierOrder } from '../Models/supplier-order';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierOrderService {

  constructor(private http: HttpClient, private authService:AuthService){ }

  baseUrl:string= environment.ApiUrl;
  url:string = environment.ApiUrl + 'Supplier/';
  SupplierId:number;
  count:number;

  getOrders(){
    this.SupplierId = this.authService.decodedToken.nameid;
    return this.http.get<SupplierOrder[]>(this.url+this.SupplierId);
  }

  getCountOfOrders(){   
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer "+ window.localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
    this.SupplierId = this.authService.decodedToken.nameid;
    return this.http.get<number>(this.url+"count/"+this.SupplierId, httpOptions).pipe(
      map((resp:number) => this.count = resp)
    );
  }

  addproduct(productForUploadDto:ProductForUpload){
    this.SupplierId = this.authService.decodedToken.nameid;
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ window.localStorage.getItem('token')
    });
    const httpOptions = { headers: headers_object };
    productForUploadDto.CategoryId=3;
    var aa=productForUploadDto;
    return this.http.post('http://localhost:5000/api/addproduct/'+this.SupplierId,productForUploadDto,httpOptions);
  }

  addnewproduct(product:ProductData){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ window.localStorage.getItem('token')
    });
    const httpOptions = { headers: headers_object };
    this.SupplierId = this.authService.decodedToken.nameid;
    product.supplierId=this.SupplierId;
    return this.http.post('http://localhost:5000/api/addproduct',product,httpOptions);
  }

  getallcategories(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ window.localStorage.getItem('token')
    });
    const httpOptions = { headers: headers_object };
    return this.http.get<Category[]>('http://localhost:5000/api/getallcategories',httpOptions);
  }
}
