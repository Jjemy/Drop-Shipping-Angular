import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserCrudService } from 'src/app/Services/user-crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  userList:User[]=[];
  id:number;
 
  constructor(private serve:AuthService , private autserve:UserCrudService , private rout:Router) { }

  ngOnInit(): void {  
    this.autserve.getAll().subscribe(a=>{this.userList=a});
  }
 
  delete(ar:User)
  {     
    this.id=ar.id;
    if(ar.userName=="Admin")
    { 
      this.rout.navigateByUrl("/UserList");
      alert("You can't delete or edit Admin Data");
    }
    else
    {
      this.rout.navigateByUrl("UserList/deleteUser/"+this.id);
    }    
  }

  detail(ar:User)
  { 
    this.id=ar.id;
    if(ar.userName=="Admin")
    { 
      this.rout.navigateByUrl("/UserList");
      alert("You can't delete or edit Admin Data");
    }
    else
    {
      this.rout.navigateByUrl("UserList/editUser/"+this.id);
    }    
  }
}
