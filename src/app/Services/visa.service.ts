
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import{Visa} from 'src/app/Models/visa';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VisaService {
  url = environment.ApiUrl +'api/Users/';
  constructor( private http:HttpClient , private autserve:AuthService) { }

  paymentpost(visaObj:Visa)
  {
    visaObj.id=this.autserve.decodedToken.nameid;
    return this.http.post(this.url + 'paymentdetails', visaObj);
  }

  getVisaDataById(id:number)
  {
    return this.http.get<Visa>(this.url+'GetVisaData/'+id)
  }
}
