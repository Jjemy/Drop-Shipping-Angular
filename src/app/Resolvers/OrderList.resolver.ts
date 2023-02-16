import { Order } from '../Models/order';
import { catchError } from 'rxjs/operators';
import { ProductOptionCart } from '../Models/product-option-cart';
import { Router, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartManagementService } from '../Services/cart-management.service';

@Injectable()
export class OrderListResolver implements Resolve<Order[]>{

  constructor(private service: CartManagementService, private router: Router) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {
    return this.service.GetAllOrders().pipe(
      catchError(
        err => {
          this.router.navigate[''];
          return of(null);
        }
      )
    )
  }

}
