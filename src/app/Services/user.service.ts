import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private authSecretKey = 'jwtToken';

  constructor(private http: HttpClient) {}

  public get isAuthenticated() {
    return !!localStorage.getItem(this.authSecretKey);
  }

  public register(username: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${API_URL}/register`,{username, email,password, role});
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.get(`${API_URL}/auth`,{params: {email,password}});
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${API_URL}/users`);
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(`${API_URL}/user`,{params: {id}});
  }

  public updateUser(id: number, email:string, username: string, role:string): Observable<any> {
    return this.http.put(`${API_URL}/updateUser`,{id,email,username,role});
  }

  public logout(): void {
    localStorage.removeItem(this.authSecretKey);
    localStorage.removeItem('user');
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    return JSON.parse(localStorage.getItem('user')!).role == 'admin';
  }

}
