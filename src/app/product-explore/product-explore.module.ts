
import { SupplierProductComponent } from './SupplierProduct/SupplierProduct.component';
import { SupplierProductsListComponent } from './SupplierProductsList/SupplierProductsList.component';
import { TableModule } from 'primeng/table';
import { SupplierProductEditComponent } from './SupplierProductEdit/SupplierProductEdit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductOptionComponent } from './product-options/product-options.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import {GalleriaModule} from 'primeng/galleria';
import {DataViewModule} from 'primeng/dataview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {InputTextModule} from 'primeng/inputtext';
import { UploadProductComponent } from './upload-product/upload-product.component';
import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductComponent,
    ProductOptionComponent,
    SupplierProductEditComponent,
    SupplierProductsListComponent,
    SupplierProductComponent,
    UploadProductComponent
  ],
  imports: [
    CommonModule,
    DynamicDialogModule,
    InputNumberModule,
    RadioButtonModule,
    ButtonModule,
    GalleriaModule,
    DataViewModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    PaginatorModule,
    ProgressSpinnerModule,
    TableModule,
    InputTextModule,
    FileUploadModule
  ]
})
export class ProductExploreModule { }
