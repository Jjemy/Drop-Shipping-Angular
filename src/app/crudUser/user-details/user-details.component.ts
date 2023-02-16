import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/user';
import { Visa } from 'src/app/Models/visa';
import { UserCrudService } from 'src/app/Services/user-crud.service';
import { VisaService } from 'src/app/Services/visa.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  visaObj:Visa=new Visa();
  usr:User;
  constructor( private visaServ:VisaService,private userserve:UserCrudService , private ac:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.ac.params.subscribe(p=>{ 
      this.visaServ.getVisaDataById(p['id']).subscribe(a=>{this.visaObj=a;});
      this.userserve.getUserDataById(p['id']).subscribe(a=>{this.usr=a;});
    })
  }
}
