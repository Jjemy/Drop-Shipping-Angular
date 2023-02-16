import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fp: FormBuilder, private authService: AuthService, private router: Router) { }

  registerForm: FormGroup;
  user: User;
  errorMsg="";

  register() {
    if(this.registerForm.valid){
      this.user=Object.assign({},this.registerForm.value);
      this.authService.register(this.user).subscribe(
        ()=>{
          this.router.navigate(['/login']);
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
      roleName: ['', Validators.required],
      userName: ['', Validators.required],
      FirstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      phoneNumber: ['', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]]
    })
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }
}