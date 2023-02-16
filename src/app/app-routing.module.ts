import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './Authentication/login/login.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { UploadProductComponent } from './product-explore/upload-product/upload-product.component';
import { AddCategoryComponent } from './Admin/add-category/add-category.component';
import { ManageCategoriesComponent } from './Admin/manage-categories/manage-categories.component';
import { EditCategoryComponent } from './Admin/edit-category/edit-category.component';
import { NotFoundComponent } from './NotFound/NotFound.component';
import { ManageWithdrawnRequestsComponent } from './Admin/manage-withdrawn-requests/manage-withdrawn-requests.component';
import { UserDataComponent } from './Admin/user-data/user-data.component';
import { RegisterShippingComponent } from './Admin/register-shipping/register-shipping.component';
import { CheckOutComponent } from './CartManagement/check-out/check-out.component';
import { OptionCartListresolver } from './Resolvers/OptionCartList.resolver';
import { ShippingListResolver } from './Resolvers/ShippingList.resolver';
import { DeleteUserComponent } from './crudUser/delete-user/delete-user.component';
import { EditUserComponent } from './crudUser/edit-user/edit-user.component';
import { UserListComponent } from './crudUser/user-list/user-list.component';
import { UserDetailsComponent } from './crudUser/user-details/user-details.component';
import { SupplierDetailsComponent } from './crudUser/supplier-details/supplier-details.component';
import { BindingOrdersComponent } from './ManageShipping/BindingOrders/BindingOrders.component';
import { FollowOrdersComponent } from './Marketing/follow-orders/follow-orders.component';
import { ManageAccountComponent } from './Marketing/manage-account/manage-account.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductListComponent } from './product-explore/product-list/product-list.component';
import { SupplierProductsListComponent } from './product-explore/SupplierProductsList/SupplierProductsList.component';
import { ProfitsComponent } from './profits/profits.component';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { SupplierOrdersComponent } from './supplier-orders/supplier-orders.component';
import { OrderDetailsComponent } from './CartManagement/order-details/order-details.component';
import { OrderDetailsResolver } from './Resolvers/OrderDetails.resolver';

const routes: Routes = [
  { path:'',component:HomePageComponent},
  { path:'home',component:HomePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'managecategory', component: ManageCategoriesComponent,children:[
    { path: 'addcategory' , component: AddCategoryComponent },
    { path: 'editcategory/:id' , component: EditCategoryComponent}
  ]},
  { path: 'manageWithdrawRequest', component: ManageWithdrawnRequestsComponent},
  { path: 'userdata', component:UserDataComponent},
  { path: 'shippingregister', component: RegisterShippingComponent},
  { path: 'UserList', component:UserListComponent},
  { path: 'supplierDetails', component:SupplierDetailsComponent},
  { path: 'UserList/editUser/:id', component:EditUserComponent},
  { path: 'supplierDetails/editUser/:id', component:EditUserComponent},
  { path: 'UserList/details/:id', component:UserDetailsComponent},
  { path: 'UserList/deleteUser/:id', component:DeleteUserComponent},
  { path: 'Checkout', component: CheckOutComponent,resolve:{checkout:OptionCartListresolver,shipping:ShippingListResolver}},
  { path: 'uploadproduct', component: UploadProductComponent},
  { path: 'bindingorders', component:BindingOrdersComponent},
  { path: 'followorders', component: FollowOrdersComponent},
  { path: 'manageaccount', component: ManageAccountComponent},
  { path: 'payment', component:PaymentComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'supplierProductsList', component:SupplierProductsListComponent},
  { path: 'myorders', component: SupplierOrdersComponent},
  { path: 'ShippingStatus', component:UpdateOrderStatusComponent},
  { path: 'OrderDetails/:id', component: OrderDetailsComponent,resolve:{OrderDetails:OrderDetailsResolver}},
  { path: 'withdraw', component: ProfitsComponent},
  { path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }