import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './Models/user';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private auth: AuthService){}
  title = 'SPA';
  jwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token)
      this.auth.decodedToken = this.jwtHelperService.decodeToken(token);
    if (user)
      this.auth.currentUser = user;
  }
}
