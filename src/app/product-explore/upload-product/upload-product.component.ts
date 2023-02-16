import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Category } from 'src/app/Dtos/category';
import { ProductData } from 'src/app/Dtos/product-data';
import { AuthService } from 'src/app/Services/auth.service';
import { SupplierOrderService } from 'src/app/Services/supplier-order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload-product',
  templateUrl: './upload-product.component.html',
  styleUrls: ['./upload-product.component.css']
})
export class UploadProductComponent {

  constructor(private authService: AuthService , private router : Router, private supplierService:SupplierOrderService) { }

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseurl = environment.ApiUrl;
  id:number;
  prodId:any;
  productadded:boolean=false;
  categories:Category[];
  obj:ProductData;
  Photouploaded=false;
  errorMsg="";
  active:boolean;
  productForm=new FormGroup({
    'productName':new FormControl('',[Validators.required]),
    'weight':new FormControl('',Validators.required),
    'description':new FormControl('',Validators.required),
    'brand':new FormControl('',Validators.required),
    'dimension':new FormControl('',Validators.required),
    'categoryId':new FormControl('',Validators.required),
    'codes':new FormArray([],Validators.required),
    'stockIns':new FormArray([],Validators.required),
    'itemPrices':new FormArray([],Validators.required),
    'availableOptions':new FormArray([],Validators.required),
  });

  ngOnInit() {
    this.supplierService.getallcategories().subscribe(a=>{
      this.categories=a;
    });
    this.active = this.authService.currentUser.emailConfirmed;
  }

  get Codes(){
    return this.productForm.get('codes') as FormArray
  }

  get StockIns(){
    return this.productForm.get('stockIns') as FormArray
  }

  get ItemPrices(){
    return this.productForm.get('itemPrices') as FormArray
  }

  get AvailableOptions(){
    return this.productForm.get('availableOptions') as FormArray
  }
  
  addoption(){
    this.Codes.push(new FormControl);
    this.StockIns.push(new FormControl);
    this.ItemPrices.push(new FormControl);
    this.AvailableOptions.push(new FormControl);
  }

  removeoption(i?:number){
    this.Codes.removeAt(i);
    this.StockIns.removeAt(i);
    this.ItemPrices.removeAt(i);
    this.AvailableOptions.removeAt(i);
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: "http://localhost:5000/api/"+this.id,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onAfterAddingFile=(file)=>{file.withCredentials=false;};
    this.uploader.onCompleteItem = () => {
      this.Photouploaded=true;
      alert("Item is successfully added");
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  addproductdata(){
     this.obj = this.productForm.value;
     this.supplierService.addnewproduct(this.obj).subscribe(a=>{
        this.prodId=a;
        this.id=this.prodId;
        this.productadded=true;
        this.initializeUploader(); 
        alert("Item was successfully added");
     }, (error) => {
      this.errorMsg=error.error;
    });
  }

  newproduct(){
    this.productadded=false;
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    this.router.navigate(["uploadproduct"]);
 });
 }
}
