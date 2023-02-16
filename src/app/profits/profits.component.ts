import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserProfit } from '../Models/UserProfit';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-profits',
  templateUrl: './profits.component.html',
  styleUrls: ['./profits.component.css'],
  providers: [MessageService]
})
export class ProfitsComponent implements OnInit {

  profitsData:UserProfit;
  money:number;
  available:boolean = true;

  constructor(private userService:UserService, private messageService:MessageService) { }
  ngOnInit(): void {
    this.userService.getProfits().subscribe(
      d => this.profitsData = d
    );
  }

  sendRequest(){
    if(this.money <= this.profitsData.availableProfits){
      this.profitsData.isRequestAvailable=false;
      this.userService.postWithdrawRequest(this.money).subscribe(
        _ => null,
        _ => this.profitsData.isRequestAvailable=true);
      this.messageService.add({key: 'bc', severity:'success', summary: 'Done', detail: 'Request is sent successfully, The transfer will be done in 2 days', sticky: true});
    }
    else
      this.messageService.add({key: 'bc', severity:'error', summary: 'Error', detail: 'The required amount is greater than the available amount'}); 
  }
}
