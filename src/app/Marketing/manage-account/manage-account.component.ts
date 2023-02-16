// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserForManage } from '../../Models/UserForManage';
import { MarketingService } from '../../Services/marketing.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  constructor(private marketservice: MarketingService, private router : Router) { }

  userData : UserForManage={
    id: 0,
    email: '',
    userName: '',
    firstName: '',
    lastName: '',
    address: '',
    normalizedUserName: '',
    phoneNumber: ''
  };

  ngOnInit(): void {
    this.marketservice.getAllData().subscribe(d =>{
      this.userData = d;
    });
  }

  Update(){
    this.marketservice.UpdateData(this.userData);
    setTimeout(() => {
      this.router.navigateByUrl("");
    }, 1000);
  }

  Cancel(){
    this.router.navigateByUrl("");
  }
}

