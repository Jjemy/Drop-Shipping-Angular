import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserCrudService } from 'src/app/Services/user-crud.service';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.css']
})

export class SupplierDetailsComponent implements OnInit {
  usr:User[]=[]
  status:string;

  constructor( private supserv:UserCrudService , private auth:AuthService) { }

  ngOnInit(): void {
    this.supserv.getSuppliers().subscribe(a=>{
      this.usr=a;
    })
  }
}
