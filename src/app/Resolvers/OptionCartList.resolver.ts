import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { ProductOptionCart } from "src/app/Models/product-option-cart";
import { CartManagementService } from "src/app/Services/cart-management.service";

@Injectable()
export class OptionCartListresolver implements Resolve<ProductOptionCart[]>{


    constructor(private service: CartManagementService, private router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<ProductOptionCart[]> {

      return this.service.getOptionsFromCart().pipe(

        catchError(

          err => {

            this.router.navigate[''];

            return of(null);

          }

        )

      )

    }


}
