import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Option } from './../../Models/option';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from '../../Models/Product';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-SupplierProductEdit',
  templateUrl: './SupplierProductEdit.component.html',
  styleUrls: ['./SupplierProductEdit.component.css'],
  styles: [`
  :host ::ng-deep .p-cell-editing {
      padding-top: 0 !important;
      padding-bottom: 0 !important;
  }
`],
  providers: [MessageService],
})
export class SupplierProductEditComponent implements OnInit {

  product: Product;
  cols: any[];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  option:Option;

  constructor(private productService: ProductService, public dialogRef: DynamicDialogRef, public dialogConfig: DynamicDialogConfig , private messageService: MessageService, private router:Router, private http:HttpClient) { }

  ngOnInit() {
    this.product = this.dialogConfig.data;
  }

  closeModal(){
    this.dialogRef.close();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(["supplierProductsList"]);
    });
  }

  onRowEditInit(optionEdited:Option) {
    this.option=optionEdited;
  }

  onRowEditSave(option:Option) {
    if (option.itemPrice > 0 && option.name != "" && option.stockIn > 0) {
      this.productService.editOption(option).subscribe(a=>{
        alert("Done");
      });
    }
    else {
      this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
      alert("Error");
    }
  }
}