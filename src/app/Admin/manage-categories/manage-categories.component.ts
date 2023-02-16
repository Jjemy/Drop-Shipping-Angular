import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageCategories } from 'src/app/Models/manage-categories';
import { AdminManageCategoriesService } from 'src/app/Services/admin-manage-categories.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  // styleUrls: ['./manage-categories.component.css'],
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class ManageCategoriesComponent implements OnInit {
  allCategories: ManageCategories[];
  cols: any[];

  constructor(private adminMCategoriesServ: AdminManageCategoriesService, private router : Router) { }

  ngOnInit(): void {
    this.adminMCategoriesServ.getCategories().subscribe(d=>{
      this.allCategories = d;
    });
    this.cols = [
      { field: 'categoryName', header: 'Category Name' },
    ]
  } 

  Back(){
    this.router.navigateByUrl("");
  }
}






