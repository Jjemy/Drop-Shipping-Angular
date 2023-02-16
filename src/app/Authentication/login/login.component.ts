import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private service: AuthService, private router: Router) { }

  loginForm: FormGroup;
  model: any = {};
  errorMsg = "";

  login() {
    this.service.login(this.model).subscribe(
      () => {
        this.router.navigate(['']);
      }, (error) => {
        if (error.error.toString() == "[object Object]") {
          this.errorMsg = "Email or password is not correct"
        } else {
          this.errorMsg = error.error;
        }
      },
      () => {
        if(this.service.decodedToken.role=="Admin")
        {
          this.router.navigate(['/dashboard'])
        }
        else if(this.service.decodedToken.role=="Supplier")
        {
          this.router.navigate(['/uploadproduct']) 
        }
        else if(this.service.decodedToken.role=="Marketing")
        {
          this.router.navigate(['products']) 
        }
        else if(this.service.decodedToken.role=="Marketing")
        {
          this.router.navigate(['/bindingorders']) 
        }
      }
    )
  }
}
