import { Injectable } from '@angular/core';
import { HttpService } from '../stock-market/services/http.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isValidUser:boolean = false;
  constructor(private http: HttpService, private router:Router) { }

  get auth(): boolean {
    return this.isValidUser;
  }

  set auth(valid: boolean) {
    this.isValidUser = valid;
    if(!this.isValidUser){
      this.router.navigate(["/"]);
    }
  }

  getAllCompanies(): Observable<User[]> {
    return this.http.get("/users").pipe();
  }

  getCompany(id: number): Observable<User> {
    var url = '/users/' + id;
    return this.http.get(url).pipe();
  }

  addCompany(user: User): Observable<Boolean> {
    return this.http.post('/users', user).pipe();
  }

  updateCompany(user: User, id:number): Observable<Boolean> {
    return this.http.put(`/users/${id}`,user).pipe();
  }

  getLogin(user:User): Observable<Boolean> {
    // return this.http.post(`/login`, user).pipe();
    return this.http.get(`/login`).pipe();
  }

}
