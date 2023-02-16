import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserCrudService } from 'src/app/Services/user-crud.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  usr:User;

  constructor( private userserve:UserCrudService , private ac:ActivatedRoute , private rout:Router) { }

  ngOnInit(): void {
    this.ac.params.subscribe(p=>{this.userserve.getUserDataById(p['id']).subscribe(a=>{this.usr=a;});})
  }

  delete(){   
    this.ac.params.subscribe(p=>{ 
    this.userserve.deleteUser(p['id']).subscribe(a=>{this.usr=a;});
  })
    alert("Data is deleted successfully");
    setTimeout(() => {
      this.rout.navigateByUrl("/dashboard");
    }, 1000);
  }

  Cancel(){
    this.rout.navigateByUrl("");
  }
}
