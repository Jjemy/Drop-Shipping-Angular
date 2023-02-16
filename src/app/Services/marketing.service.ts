import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserForManage } from "../Models/UserForManage";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})

export class MarketingService {

  constructor(private http: HttpClient, private authService:AuthService){
  }
  
  url:string = environment.ApiUrl + 'MAccountManage/';
  SupplierId:number;

  getAllData(){
    return this.http.get<UserForManage>(this.url);
  }

  UpdateData(updateduser : UserForManage)
  {
    return this.http.put<UserForManage>(this.url, updateduser).subscribe();
  }
}
