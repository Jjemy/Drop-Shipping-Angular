import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageCategories } from 'src/app/Models/manage-categories';
import { AdminManageCategoriesService } from 'src/app/Services/admin-manage-categories.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  constructor(private addCategoryserv: AdminManageCategoriesService, private router: Router) {  }

  nCategory = new ManageCategories();

  Create()
  {
    if(this.nCategory.categoryName != undefined)
    {
      this.addCategoryserv.Add(this.nCategory).subscribe(
        ()=>{
          alert("Category is added");
        }
        )
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(["/managecategory"]);
      });
    }
      else
      {
        alert("Please, Enter Category name");
      }
   }

  Cancel(){
    this.router.navigateByUrl("/managecategory");
  }
}


