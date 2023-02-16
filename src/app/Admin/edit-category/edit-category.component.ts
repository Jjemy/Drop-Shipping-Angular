import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminManageCategoriesService } from 'src/app/Services/admin-manage-categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private adminMCategoriesserv : AdminManageCategoriesService, private ac : ActivatedRoute, private router: Router) { }

  updatedName : string;

  ngOnInit(): void {
    this.ac.params.subscribe(d=>{
      this.adminMCategoriesserv.getById(d['id']).subscribe(a=>{
        this.updatedName = a.categoryName;
      })
    })
  }

  UpdateCategory()
  {
    this.ac.params.subscribe(a=>{
      this.adminMCategoriesserv.Update(a['id'] ,this.updatedName).subscribe(d=>{
        alert("Category is updated successfully");
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigateByUrl("/managecategory");
      })
    });
  })}

  Cancel()
  {
    this.router.navigateByUrl("/managecategory");
  }
}