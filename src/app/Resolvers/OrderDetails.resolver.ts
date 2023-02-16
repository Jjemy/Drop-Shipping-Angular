import { Order } from 'src/app/Models/order';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartManagementService } from 'src/app/Services/cart-management.service';

@Injectable()
export class OrderDetailsResolver implements Resolve<Order>{
  constructor(private service: CartManagementService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    return this.service.GetOrderDetails(route.params['id']).pipe(
      catchError(
        err => {
          this.router.navigate[''];
          return of(null);
        }
      )
    )
  }
}
