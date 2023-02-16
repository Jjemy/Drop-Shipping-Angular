
import { catchError, retry } from 'rxjs/operators';

import { Shipping } from 'src/app/Models/shipping';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';

@Injectable()
export class ShippingListResolver implements Resolve<Shipping[]>{

constructor(private services:CartManagementService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Shipping[]> {
    return this.services.GetAllShipping().pipe(
      catchError(
        error=>{
            // this.alert.error("Sorry We Have A Problem");
            return of(null)
        }
      )



    )
  }



}