import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  toggleProductVisibility(product: any, id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environments.URL_LOCAL + '/products';
  
  constructor(private http : HttpClient){}
  createHeader(){
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }
  createProduct(product : any){
    return this.http.post(this.apiUrl, {product}, this.createHeader())
  }
  
  getProducts(){
    return this.http.get(this.apiUrl, this.createHeader());
  }

  changeProductVisibility(idProduct : number, newState: number){
    const url = `${this.apiUrl}/${idProduct}/visibility`;
    return this.http.patch(url, {newState}, this.createHeader());
  }

  deleteProduct(productID:number){
    return this.http.delete(`${this.apiUrl}/${productID}`, this.createHeader())
  }
 
  addProductImages(productId: number, images: string[]) {
  return this.http.post(`${this.apiUrl}/${productId}/images`, {images}, this.createHeader());
}

 uploadImages(productId: number, formData: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/${productId}/images`, formData);
  }
}
