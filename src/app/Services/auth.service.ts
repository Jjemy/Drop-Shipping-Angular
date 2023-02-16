import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';
import { User } from '../Models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseURL = environment.ApiUrl + 'Auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any={};
  currentUser: User;

  login(model: any){
    return this.http.post(this.baseURL + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user))
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      }))
  }

  loggedIn() {
    try {
      const token = localStorage.getItem('token');
      return !this.jwtHelper.isTokenExpired(token);
    }
    catch {
      return false;
    }
  }

  roleMatch(AllowedRoles: Array<string>): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    AllowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  register(user: User) {
    return this.http.post(this.baseURL + 'register', user);
  }
}
