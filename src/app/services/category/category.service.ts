import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.URL + '/categories';
  
  constructor(private http : HttpClient){}
  
  createHeader(){
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }

  getCategories(){
    return this.http.get(this.apiUrl, this.createHeader());
  }

  
  updateCategory(category: any) {
  return this.http.put<{ data: any }>(`${this.apiUrl}/${category.idcategory}`, category, this.createHeader());
  }

  getAllCategories() {
    return this.http.get(this.apiUrl, this.createHeader());
  }

  deleteCategory(categoryID:number){
    return this.http.delete(`${this.apiUrl}/${categoryID}`, this.createHeader())
  }

  saveCategory(categoryData: any){
    return this.http.post(this.apiUrl, categoryData, this.createHeader());
  }
  
}
