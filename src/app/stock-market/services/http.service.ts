import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const baseUrl = environment.base_api_url;
console.log('baseUrl ===== ' + baseUrl);

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*.*',
        'Access-Control-Allow-Methods': 'GET, POST,PUT,DELETE',
        'Access-Control-Allow-Headers': '*'
    })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

  //   combineHeaders(newHeaders: HttpHeaders): void {
  //     var httpHeaders = httpOptions.headers;
  //     for (let key of newHeaders.keys()) {
  //         if (!httpHeaders.has(key)&&newHeaders.get(key)!='need-delete') {
  //             httpHeaders = httpHeaders.append(key, newHeaders.get(key));
  //         } else {
  //             if(newHeaders.get(key)=='need-delete'){
  //                 httpHeaders = httpHeaders.delete(key);
  //             }else{
  //                 httpHeaders = httpHeaders.set(key, newHeaders.get(key));
  //             }
  //         }
  //     }
  //     httpOptions.headers = httpHeaders;
  // }


  public get(url: string): Observable<any> {
    return this.http.get(`${baseUrl}${url}`, httpOptions).pipe(
      //map(this.extractData),
      catchError(this.handleError)
    );
  }

  public post(url: string, data = {}): Observable<any> {
    return this.http.post(`${baseUrl}${url}`, data, httpOptions).pipe(
      //map(this.extractData),
      catchError(this.handleError)
    );
  }

  public put(url: string, data = {}): Observable<any> {
    return this.http.put(`${baseUrl}${url}`, data, httpOptions).pipe(
     // map(this.extractData),
      catchError(this.handleError)
    );
  }

  public delete(url: string): Observable<{}> {
    return this.http.delete(`${baseUrl}${url}`, httpOptions).pipe(
      //map(this.extractData),
      catchError(this.handleError)
    );
  }

//   private extractData(res: Response) {
//     let body = res;
//     return body || {};
//   }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // alert('An error occurred:'+ error.error.message);
      console.error('An error occurred:', error.error.message);
    } else {
    //   alert(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(error);
  }

}