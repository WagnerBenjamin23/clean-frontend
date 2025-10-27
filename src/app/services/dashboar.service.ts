import { Injectable } from '@angular/core';
import { environments } from '../environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboarService {
  
  private apiUrl = environments.URL_LOCAL;

  constructor(private http : HttpClient) { }

  getDashboardMetrics() {
    return this.http.get(`${this.apiUrl}/dashboard/metrics`);
  }
}
