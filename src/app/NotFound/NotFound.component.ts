import { Component, OnInit } from '@angular/core';
import { NavService } from '../Services/nav.service';

@Component({
  selector: 'app-NotFound',
  templateUrl: './NotFound.component.html',
  styleUrls: ['./NotFound.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(public nav:NavService) { }
  
  ngOnInit() {
    this.nav.hide();
  }
}
