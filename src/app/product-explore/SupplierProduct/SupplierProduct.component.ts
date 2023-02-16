import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../Models/Product';
import { SupplierProductEditComponent } from '../SupplierProductEdit/SupplierProductEdit.component';

@Component({
  selector: 'app-SupplierProduct',
  templateUrl: './SupplierProduct.component.html',
  styleUrls: ['./SupplierProduct.component.css'],
  providers: [DialogService, MessageService]
})
export class SupplierProductComponent {
  @Input() product: Product;
  ref: DynamicDialogRef;

  constructor(private dialogService: DialogService, private messageService: MessageService, private router:Router, private service:ProductService) { }

  showOptionsDialog() {
    this.ref = this.dialogService.open(SupplierProductEditComponent, {
      data: this.product,
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto", "border-radius": "40px", "padding": "30px" },
      baseZIndex: 10000,
      style: { "direction": "rtl" },
      showHeader: false
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  deleteProduct(id: number) {
    this.service.deleteProduct(id).subscribe(a=>{
      alert("Product is deleted Successfully");
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(["supplierProductsList"]);
      });
    });
  }
}



