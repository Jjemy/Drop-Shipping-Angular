import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MakeOrder } from 'src/app/Models/make-order';
import { ProductOptionCart } from 'src/app/Models/product-option-cart';
import { Shipping } from 'src/app/Models/shipping';
import { CartManagementService } from 'src/app/Services/cart-management.service';
import * as $ from '../../../assets/js/jquery-3.3.1.min.js';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {
  myForm:FormGroup;
  OrderData:MakeOrder;
  shipping: Shipping[];
  options: ProductOptionCart[];
  NewQuantity: ProductOptionCart;
  company: string = null;
  selectedCompany: string = null;
  public total = 0;
  public Updateprice  = 0;
  public DealPrice: number;
  public shippingPrice = 0;
  public totalPrices=0;
  num:number=0;
  city="alex";

  constructor(private resolve: ActivatedRoute, private services: CartManagementService, private router: Router, private fp:FormBuilder) {}

  ngOnInit() {
    this.selectAll();
    this.resolve.data.subscribe(
      data => {
        this.shipping = data['shipping']
        this.findsum(data['checkout'])
      });
    this.MakeOrderValidation();
  }

  UpdateDealPrice(event){
    this.DealPrice=event.target.value * .1;
  }

  findsum(data) {
    this.options = data;
    for (let j = 0; j < data?.length; j++) {
      this.total += this.options[j].quantity * this.options[j].option.itemPrice;
      this.TotalPrices(this.total)
    }
  }

  makeOrder(){
    console.log('jg');
    if(this.myForm.valid){
      this.OrderData=Object.assign({},this.myForm.value)
      this.services.MakeOrder(this.OrderData).subscribe(
        result=>{
          alert("Your order is sent")
          this.router.navigate(['/OrderDetails/',result]);
        },
        e=>{
          alert(e.error)
        }
      )
    }
  }

  MakeOrderValidation(){
    this.myForm=this.fp.group(
      {
        dealPrice: ['', [Validators.required,Validators.max(100000000)]],
        clientName: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        shippingId: ['', Validators.required],
        siteProfits: ['', Validators.required],
        shippingProfits: ['', Validators.required],
        marketingProfits:['',[ Validators.required,Validators.min(0)]],
      }
    )
  }

  updateQuantity(id, NewQuantity) {
    this.services.updateQuantity(id, NewQuantity).subscribe(
      () => {
        this.total = 0;
        this.services.getOptionsFromCart().subscribe(
          res => { this.findsum(res) })
          alert("Quantity is updated successfully");},
      e => {
        alert(e.error);
      }
    )
  }

  modelChangeFn(id) {
    for (let j = 0; j < this.shipping.length; j++) {
      if(this.shipping[j].id==id){
        this.shippingPrice=this.shipping[j].price;
        this.city=this.shipping[j].city;
      }
    }
  }

  TotalPrices( total){
    this.totalPrices=total+this.Updateprice;
  }

  selectAll()
  {
    var tb1=$('#tb1');
    var header =tb1.find('thead .ckheader'); 
    var item =tb1.find('tbody .ckitem');
    header.change(function(){
      var c =this.checked;
      item.prop('checked', c);
      item.trigger('check');
      if($(this).is(':checked'))
      {
        $(item).closest('tr').addClass('NewRowColor');
      }
      else{
        $(item).closest('tr').removeClass('NewRowColor');
      }
    })
    item.change(function(){
      if($(this).is(':checked'))
      {
        $(this).closest('tr').addClass('NewRowColor');
      }
      else{
        $(this).closest('tr').removeClass('NewRowColor');
      }}
    ).trigger('change');
  }

  IsDelete(){
    var Checkboxes = document.getElementsByClassName("ckitem");
    if(Checkboxes.length > 0)
    {
      for(let i=0;i< Checkboxes.length; i++)
      {
        if($(Checkboxes[i]).is(":checked")){
          return true;
        }
      }
    }
    return false;
  }

  DeleteCount(){
    var count =$(".ckitem:Checked").length;
    this.num=count;
  }

  DeleteAllProductCart(ids){
    let DIDs=ids;
    this.services.DeleteAllProductCart(DIDs).subscribe(
      res => {alert("Item was deleted successfully");
    },
    e => {
      alert("e.error");}
    )
  }

  DeleteConfirm(){
    var checkboxes =document.getElementsByClassName('ckitem');
    if(checkboxes.length > 0)
    {
      var ids=[];
      for(let i =0 ; i< checkboxes.length ; i++ )
      {
        if($(checkboxes[i]).is(":checked")){
          var id =$(checkboxes[i]).val();
          ids.push(id);
          this.DeleteAllProductCart(ids);
        }
      }
      window.location.reload();
    }
  }
}









