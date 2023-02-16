import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserCrudService } from 'src/app/Services/user-crud.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  userData:User={
    id: 0,
    userName: '',
    email: '',
    password: 0,
    roleName: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    lockoutEnabled: false,
    emailConfirmed: false,
    normalizedUserName: ''
  };
  data:string;
  usr:User;
  mname="block"
  emailConf:string;

  constructor(private userserve:UserCrudService , private rout:Router , private ac:ActivatedRoute, private auth:AuthService) { }
  
  ngOnInit(): void {
    this.ac.params.subscribe(p=>{ 
      this.userserve.getUserDataById(p['id']).subscribe(a=>{this.userData=a;});
    })
    if(this.rout.url.includes('supplierDetails'))
    {
      this.userData.roleName='Supplier';
      this.auth.decodedToken.role=this.userData.roleName;
    }
  }

  selectChangeHandler (event: any ) {
    this.userData.emailConfirmed = event.target.value;
  }

  Update(){
    this.emailConf=this.userData.email;
    this.mname=this.userData.userName
    if(this.userData.emailConfirmed==false)
    {
        this.userData.normalizedUserName="block";
    }
    else{
      this.userData.normalizedUserName=this.userData.userName
    }
    this.ac.params.subscribe(p=>{   
      this.userserve.editUserDataById(p['id'],this.userData).subscribe(n=>{
        this.userData=n;
      });
    })
    alert("Data is Updated Successfully");
    setTimeout(() => {
      this.rout.navigateByUrl("/dashboard");
    }, 1000);
  }

  Cancel(){
    this.rout.navigateByUrl("");
  }
}
