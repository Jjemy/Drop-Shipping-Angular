import { ShippingCompanies } from '../Models/ShippingCompanies';
import { BindingOrders } from '../Models/BindingOrders';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingOrderDetails } from '../Models/ShippingOrderDetails';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ManageShippingService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  GetAllBindingOrders(){
   return this.http.get<BindingOrders[]>('http://localhost:5000/api/Shipping/GetBindingOrders');
  }

  GetAllShippingCompanies(){
    return this.http.get<ShippingCompanies[]>('http://localhost:5000/api/Shipping/GetAllShippingCompanies');
  }

  ShippingOrder(orderNumber:number,one:string,two:number){                                                   
    return this.http.post('http://localhost:5000/api/Shipping/MakeOrderInShipping/'+orderNumber+'/'+one+'/'+two,{orderNumber,one,two});
  }

  ShippingOrderDetails(id:number)
  {
    return this.http.get<ShippingOrderDetails[]>('http://localhost:5000/api/Shipping/GetShippingOrderDetails/'+id);
  }
}