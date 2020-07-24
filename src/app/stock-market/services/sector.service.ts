import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Sector } from '../models/sector.model';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpService) { }

  getAllSectors(): Observable<Sector[]> {
    return this.http.get("/sectors").pipe();
  }

  getSector(id: number): Observable<Sector> {
    var url = '/sectors/' + id;
    return this.http.get(url).pipe();
  }

  addSector(sector: Sector): Observable<Boolean> {
    return this.http.post('/sectors',sector).pipe();
  }


}
