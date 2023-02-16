import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserForWithdrawRequest } from 'src/app/Models/user-for-withdrawn-request';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-manage-withdrawn-requests',
  templateUrl: './manage-withdrawn-requests.component.html',
  styleUrls: ['./manage-withdrawn-requests.component.css'],
  providers: [MessageService]
})
export class ManageWithdrawnRequestsComponent implements OnInit {
  requests:UserForWithdrawRequest[];
  notConfirmedRequests:UserForWithdrawRequest[]=[];
  confirmedRequests:UserForWithdrawRequest[]=[];
  returnedReq:UserForWithdrawRequest;
  options:string[] = [
    "confirmed",
    "nonConfirmed",
    "all"
  ]
  actions:string[] = ["confirm", "disConfirm", "reject"];
  cols:any[]=[
    { field: 'fullName', header: 'Client Name' },
    { field: 'userRole', header: 'Job' },
    { field: 'money', header: 'Amount to be withdrawn' }, 
  ];
  typeOfAction:string;
  displayedTable:string = "nonConfirmed";
  index:number;
  reqId:number;

  constructor(private adminService:AdminService, private router:Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.adminService.getWithdrawRequests().subscribe(
      d => {
        this.requests = d;
        d.forEach(x => x.confirmed? this.confirmedRequests.push(x): this.notConfirmedRequests.push(x));
      } 
    );
    this.cols = [
      { field: 'fullName', header: 'اسم العميل' },
      { field: 'userRole', header: 'الوظيفة' },
      { field: 'money', header: 'المبلغ المراد سحبه' }, 
    ];
  }

  showDetails(userName:string){
    var user = this.requests.find(r => r.userName == userName);
    this.router.navigateByUrl('/userdata', { state: user });
  }

  showConfirm(reqId:number, type:string){
    this.typeOfAction = type;
    this.index = (type == this.actions[1]?
      this.confirmedRequests?.findIndex(x => x.requestId == reqId):
      this.notConfirmedRequests?.findIndex(x => x.requestId == reqId));
    this.returnedReq = (type == this.actions[1]? 
      this.confirmedRequests[this.index]:
      this.notConfirmedRequests[this.index]) ;
    this.reqId = reqId;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Ensure to continue'});
  }

  onConfirm(){
    var i = this.requests.findIndex(r => r.requestId == this.returnedReq.requestId);
    if(this.typeOfAction == this.actions[0]){
      this.adminService.confirmWithdrawRequests(this.reqId).subscribe(_ =>{
        this.notConfirmedRequests.splice(this.index, 1);
        this.returnedReq.confirmed = true;
        this.confirmedRequests.push(this.returnedReq);
        this.requests[i].confirmed = true;
      },_=> alert("A problem has happened, please try again"));

    }
    else if(this.typeOfAction == this.actions[1]){
      this.adminService.cancelConfirmWithdrawRequest(this.reqId).subscribe(_ =>{
        this.confirmedRequests.splice(this.index, 1);
      this.returnedReq.confirmed = false;
      this.notConfirmedRequests.push(this.returnedReq);
      this.requests[i].confirmed = false;
      },_=> alert("A problem has happened, please try again"));
    }
    else{
      this.adminService.rejectWithdrawRequest(this.reqId).subscribe(_ =>{      
        this.notConfirmedRequests.splice(this.index, 1);
        this.requests.splice(i, 1);
      },_=> alert("A problem has happened, please try again"));
    }  
    this.messageService.clear('c');
  }
  
  onReject(){
    this.messageService.clear('c');
  }
}
