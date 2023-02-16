import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { UserCrudService } from 'src/app/Services/user-crud.service';
import { User } from 'src/app/Models/user';
import { Count } from 'src/app/Models/count';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newUser:User[]=[]
  count:Count;
  data: any;

  constructor(private userCrud:UserCrudService ,private dashboard:DashboardService) {}

  ngOnInit(): void {
    this.userCrud.getAll().subscribe(a=>{this.newUser=a});
    this.dashboard.getCount().subscribe(c=>{this.count=c});
    this.data = {
      datasets: [{
          data: [
            1,2,3,4,5
          ],
          backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
          ],
          label: 'My dataset'
        }],
      labels: [
          "Red",
          "Green",
          "Yellow",
          "Grey",
          "Blue"
      ]
    }
  }
}
