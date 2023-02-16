import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageWithdrawnRequestsComponent } from './manage-withdrawn-requests/manage-withdrawn-requests.component';
import { TableModule } from 'primeng/table';
import { UserDataComponent } from './user-data/user-data.component';
import {CardModule} from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { AppRoutingModule } from '../app-routing.module';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryComponent } from './add-category/add-category.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegisterShippingComponent } from './register-shipping/register-shipping.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageCategoriesComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    UserDataComponent,
    ManageWithdrawnRequestsComponent,
    RegisterShippingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    TableModule,
    CardModule,
    ToastModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    ToastModule,
    TableModule,
    CardModule,
  ]
})
export class AdminModule { }
