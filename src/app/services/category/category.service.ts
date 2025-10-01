import { Injectable } from '@angular/core';
import { environments } from '../../environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environments.URL_LOCAL + '/categories';
  
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
  
}
