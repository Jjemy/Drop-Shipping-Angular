import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserProfit } from '../Models/UserProfit';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = environment.ApiUrl + 'api/Users/';
  UserId:number;

  constructor(private http: HttpClient, private authService:AuthService) { }

  getProfits(){
    this.UserId = this.authService.decodedToken.nameid;
    return this.http.get<UserProfit>(this.url+"profits/"+this.UserId);
  }

  postWithdrawRequest(money:number){
    return this.http.post(this.url+"withdraw", money);
  }
}
