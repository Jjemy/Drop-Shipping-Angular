import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  constructor( private http:HttpClient) { }

  nstd:User[]=[];
  ed:User;
  url:string = environment.ApiUrl + 'api/Users/';
 
  getAll()
  {
    return this.http.get<User[]>(this.url+'GetAll');
  }

  getSuppliers()
  {
    return this.http.get<User[]>(this.url+'GetByRole');
  }

  getUserDataById(id:number)
  {
    return this.http.get<User>(this.url+'GetUserData/'+id)
  }

  editUserDataById(id:number,ed:User)
  {
    return this.http.post<User>(this.url+'editUser/'+id,ed)
  }

  deleteUser(id:number)
  {
    return this.http.delete<User>(this.url+'deleteUser/'+id)
  }
}
