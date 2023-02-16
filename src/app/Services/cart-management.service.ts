import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MakeOrder } from '../Models/make-order';
import { Order } from '../Models/order';
import { ProductOptionCart } from '../Models/product-option-cart';
import { Shipping } from '../Models/shipping';

@Injectable({
  providedIn: 'root'
})
export class CartManagementService {

  constructor(private http: HttpClient) { }

  apiURL = environment.ApiUrl + "Cart/";
  OrderURL= environment.ApiUrl + "Order/";

  getOptionsFromCart(){
    return this.http.get<ProductOptionCart[]>(this.apiURL + "GetProductsFromCart");
  }

  updateQuantity(id, NewQuantity) {
    return this.http.get(this.apiURL + "UpdateQuantityCart/" + id + "/" + NewQuantity);
  }

  GetAllShipping(): Observable<Shipping[]> {
    return this.http.get<Shipping[]>(this.apiURL + "GetAllShipping");
  }


  MakeOrder(model: MakeOrder) {
    return this.http.post(this.OrderURL + 'MakeOrder' , model);
  }

  GetOrderDetails(id:number): Observable<Order> {
    return this.http.get<Order>(this.OrderURL + "OrderDetails/"+ id);
  }

  GetAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.OrderURL + "GetAllOrders");
  }

  DeleteAllProductCart(ids:string[])
  {
    return this.http.post(this.apiURL + 'DeleteAllProOptionFromCart' ,ids);
  }

  AddToCart(OptionId:number,Quantity:number)
  {
    return this.http.get(this.apiURL + 'AddToCart/'+OptionId +'/'+Quantity)
  }
}
