import { Component, OnInit } from '@angular/core';
import { Visa } from '../Models/visa';
import { VisaService } from '../Services/visa.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  obj:Visa=new Visa();

  constructor(private servisevisa:VisaService) { }

  save()
  {  
    this.servisevisa.paymentpost(this.obj).subscribe(s=>{});
  }
}
