import { Injectable } from '@angular/core';
import { environments } from '../environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  
  private apiUrl = environments.URL;

  constructor(private http : HttpClient) { }
   createHeader(){
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  }

  getDashboardMetrics() {
    return this.http.get(`${this.apiUrl}/dashboard/metrics`, this.createHeader());
  }
}
