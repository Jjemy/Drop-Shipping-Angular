import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register-shipping',
  templateUrl: './register-shipping.component.html',
  styleUrls: ['./register-shipping.component.css']
})
export class RegisterShippingComponent implements OnInit {

  registerForm: FormGroup;
  user: User;
  errorMsg="";

  constructor(private fp: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  register() {
    if(this.registerForm.valid){
      this.user=Object.assign({},this.registerForm.value);
      this.authService.register(this.user).subscribe(
        ()=>{
          this.router.navigate(['/dashboard']);
        },  (error) => {
          this.errorMsg=error.error;
        }
      )
    }
    else{
      let invalid=[];
      let controls=this.registerForm.controls;
      for (const name in controls){
        if(controls[name].invalid){
          invalid.push(name);
        }
      }
      console.log(invalid);
    }
  }

  createRegisterForm() {
    this.registerForm = this.fp.group({
      roleName: ['Shipping', Validators.required],
      userName: ['', Validators.required],
      FirstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      phoneNumber: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]]
    })
  }
}