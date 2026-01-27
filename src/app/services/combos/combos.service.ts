import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  

  constructor(private http : HttpClient){}

  private apiUrl = environments.URL;
  
   createHeader(){
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }

  createCombo(comboData: any) {
    return this.http.post(this.apiUrl +  '/combos', comboData, this.createHeader());
  }

  getCombos() {
    return this.http.get(this.apiUrl + '/combos', this.createHeader());
  }

  updateCombo(idcombo: any, newCombo: any) {
    return this.http.put(this.apiUrl + '/combos/' + idcombo, newCombo, this.createHeader());
  }

  deleteCombo(comboId: number) {
    return this.http.delete(this.apiUrl + '/combos/' + comboId, this.createHeader());
  }
  
}
