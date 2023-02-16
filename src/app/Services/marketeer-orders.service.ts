import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MarketeerOrders } from '../Models/MarketeerOrders';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class MarketeerOrdersService {

  constructor(private http:HttpClient, private authservice:AuthService) { }

  url:string = environment.ApiUrl + 'MarketeerOrders/';

  getOrders(){
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+ window.localStorage.getItem('token')
    });
    const httpOptions = {
      headers: headers_object
    };
     return this.http.get<MarketeerOrders[]>(this.url,httpOptions);
  }
}

