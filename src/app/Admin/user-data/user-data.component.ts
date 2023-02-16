import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  user:any;
  
  constructor(private router:Router) { 
    this.user = this.router.getCurrentNavigation().extras.state;
  }
}
