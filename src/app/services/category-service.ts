import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environments.URL_LOCAL;

  constructor(private http : HttpClient) { }

  saveCategory(newCategory: any) {
    return this.http.post(this.apiUrl + '/categories', newCategory); 
  }

  deleteCategory(id : number){
    return this.http.delete(this.apiUrl + '/categories/' + id);
  }
  
  getAllCategories() {
    return this.http.get(this.apiUrl + '/categories');
  }
}
