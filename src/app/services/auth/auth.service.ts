import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.URL;
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>(this.apiUrl + '/login', { email, password });
  }
  
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
