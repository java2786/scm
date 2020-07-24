import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpService) { }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get("/companies").pipe();
  }

  getCompany(id: number): Observable<Company> {
    var url = '/companies/' + id;
    return this.http.get(url).pipe();
  }

  addCompany(company: Company): Observable<Boolean> {
    return this.http.post('/companies',company).pipe();
  }

  updateCompany(company: Company, id:number): Observable<Boolean> {
    return this.http.put(`/companies/${id}`,company).pipe();
  }

  addCompanies(companies: Company[]): Observable<Boolean> {
    return this.http.post('/companies',companies).pipe();
  }

}
