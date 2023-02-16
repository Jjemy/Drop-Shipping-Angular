import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManageCategories } from '../Models/manage-categories';

@Injectable({
  providedIn: 'root'
})
export class AdminManageCategoriesService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.ApiUrl + "AdminCategories/";

  getCategories(){
    return this.http.get<ManageCategories[]>(this.apiUrl+"GetCategories");
  }

  Add(cat: ManageCategories){
    return this.http.post(this.apiUrl+"CreateCategory", cat);
  }

  getById(id: number){
    return this.http.get<ManageCategories>(this.apiUrl+"GetById/"+id);
  }

  Update(Id: number, updatedCatName: string){
    return this.http.put(this.apiUrl+"UpdateCategoryName/" +Id+"/"+updatedCatName,{Id,updatedCatName});
  }
}
