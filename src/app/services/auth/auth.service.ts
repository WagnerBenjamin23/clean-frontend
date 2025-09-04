import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environments.URL_LOCAL;
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>(this.apiUrl + '/login', { email, password });
  }
  
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
