import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ProductOptionCart } from '../Models/product-option-cart';
import { AuthService } from '../Services/auth.service';
import { CartManagementService } from '../Services/cart-management.service';
import { NavService } from '../Services/nav.service';
import { SupplierOrderService } from '../Services/supplier-order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private resolver: ActivatedRoute,
    private cartService: CartManagementService,public nav:NavService, private supplierService:SupplierOrderService) { }
  
  count:number;
  products: ProductOptionCart[];
  isSupplier:boolean;
  hubConnection:HubConnection;
  public total = 0;

  findsum(data) {
    this.total=0;
    this.products = data;
    for (let j = 0; j < data.length; j++) {
      this.total += this.products[j].quantity * this.products[j].option.itemPrice;
    }
  }

  loadCart() {
    this.cartService.getOptionsFromCart().subscribe(
      succ => { this.products = succ;
        this.findsum(succ);
       },err=>{})
    }

    disabledButton() {
      if (this.total == 0) {
        return true;
      }
      else
        return false;
    }

    loggedIn() {
      return this.authService.loggedIn();
    }

    loggedOut() {
      localStorage.removeItem('token');
      this.authService.decodedToken = null;
      localStorage.removeItem('user');
      this.authService.currentUser = null;
      this.router.navigate(['']);
    }
  
    RefreshCart(){
      this.hubConnection.invoke('refresh');
    }

    ngOnInit(): void {
      this.loadCart()
      if (this.authService.decodedToken.role == "Supplier")
      {
        this.supplierService.getCountOfOrders().subscribe(
          d => {
            this.count = d;
          }
        );
      }
      this.hubConnection=new HubConnectionBuilder().withUrl("http://localhost:5000/cart").build();
      this.hubConnection.start();
      this.hubConnection.on('refresh',()=>{
        this.loadCart();
      })
    }
}
