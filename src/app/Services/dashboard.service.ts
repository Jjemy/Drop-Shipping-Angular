import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Count } from '../Models/count';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  apiUrl =environment.ApiUrl +"Dashboard/";

  getCount()
   {
     return this.http.get<Count>(this.apiUrl + "getCounts");
   }
}
