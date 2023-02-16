import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShippingOrderDetailsComponent } from './ManageShipping/shipping-order-details/shipping-order-details.component';
import { NavbarComponent } from './Navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthService } from './Services/auth.service';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { AdminModule } from './Admin/admin.module';
import { CheckOutComponent } from './CartManagement/check-out/check-out.component';
import { OptionCartListresolver } from './Resolvers/OptionCartList.resolver';
import { ShippingListResolver } from './Resolvers/ShippingList.resolver';
import { OrderDetailsComponent } from './CartManagement/order-details/order-details.component';
import { EditUserComponent } from './crudUser/edit-user/edit-user.component';
import { DeleteUserComponent } from './crudUser/delete-user/delete-user.component';
import { UserListComponent } from './crudUser/user-list/user-list.component';
import { SupplierDetailsComponent } from './crudUser/supplier-details/supplier-details.component';
import { HasRoleDirective } from './Directives/has-role.directive';
import { FooterComponent } from './footer/footer.component';
import { BindingOrdersComponent } from './ManageShipping/BindingOrders/BindingOrders.component';
import { TableModule } from 'primeng/table';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FollowOrdersComponent } from './Marketing/follow-orders/follow-orders.component';
import { InputTextModule } from 'primeng/inputtext';
import { ManageAccountComponent } from './Marketing/manage-account/manage-account.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductExploreModule } from './product-explore/product-explore.module';
import { ProfitsComponent } from './profits/profits.component';
import { ToastModule } from 'primeng/toast';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { SupplierOrdersComponent } from './supplier-orders/supplier-orders.component';
import { OrderDetailsResolver } from './Resolvers/OrderDetails.resolver';

export function tokenGetter() {
    return localStorage.getItem('token');
  }

@NgModule({
    declarations: [
      AppComponent,
      NavbarComponent,
      HomePageComponent,
      ShippingOrderDetailsComponent,
      LoginComponent,
      RegisterComponent,
      CheckOutComponent,
      UserListComponent,
      SupplierDetailsComponent,
      SupplierOrdersComponent,
      DeleteUserComponent,
      EditUserComponent,
      OrderDetailsComponent,
      BindingOrdersComponent,
      ShippingOrderDetailsComponent,
      FollowOrdersComponent,
      UpdateOrderStatusComponent,
      ManageAccountComponent,
      PaymentComponent,
      ProfitsComponent,
      FooterComponent,
      HasRoleDirective
    ],
    providers: [
        AuthService,
        OptionCartListresolver,
        ShippingListResolver,
        OrderDetailsResolver,
        DynamicDialogRef,
        DynamicDialogConfig
    ],
    bootstrap: [AppComponent],
    imports: [
      AdminModule,
      ProductExploreModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      DropdownModule,
      TableModule,
      ButtonModule,
      InputTextModule,
      ToastModule,
      JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ['localhost:5000'],
            disallowedRoutes: ['localhost:5000/auth']
          }
        })
    ]
})
export class AppModule { }
