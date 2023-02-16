import { Component, OnInit } from '@angular/core';
import { NavService } from '../Services/nav.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public nav:NavService) { }

}
