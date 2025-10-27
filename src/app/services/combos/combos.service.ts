import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  

  constructor(private http : HttpClient){}

  private apiUrl = environments.URL_LOCAL;
  

  createCombo(comboData: any) {
    return this.http.post(this.apiUrl +  '/combos', comboData);
  }

  getCombos() {
    return this.http.get(this.apiUrl + '/combos');
  }

  updateCombo(idcombo: any, newCombo: any) {
    return this.http.put(this.apiUrl + '/combos/' + idcombo, newCombo);
  }

  deleteCombo(comboId: number) {
    return this.http.delete(this.apiUrl + '/combos/' + comboId);
  }
  
}
