import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams ,HttpRequest,HttpHandler, HttpResponse, HttpEvent, HttpInterceptor} from "@angular/common/http";

import {  Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
 
// @Injectable()
// class LoggingInterceptor implements HttpInterceptor {  
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{      const started = Date.now()    return next.handle(req).pipe(
        
//             const elapsed = Date.now() - started;
//             console.log(`URL: ${req.url} Method: ${req.method} Time took: ${elapsed} ms`)  
//         ))
//     }
//   }    
  
  
  
  

export class HttpClientService {
  
  url: string;
  httpOptions = {
    withCredentials: false,
    headers: new HttpHeaders().set('Content-Type', 'application/json').set('responseType', 'json'),
  }

  private healthCheckAPI = "http://localhost:3003/app/v1/check";
  private REST_API_SERVER = "http://localhost:3003/app/v1/check";
  constructor(private httpClient: HttpClient) { console.log("Invoke HttpClient")}

  post(path: string, payload: any): Observable<any> {
    this.url = environment.BACKEND_URI + environment.HEALTHZ_URL;
    return this.httpClient.post(this.url,payload,this.httpOptions);
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // interval(5000)
  // .pipe(switchMap(this.apiService.healthCheck()))
  // .subscribe((success) => {console.log('up')}, error => console.err('down'))
  

  public healthCheck() {
    return this.httpClient.get<any>(this.healthCheckAPI, { observe: 'response' }).pipe(
      ((resp: any) => {
        if(resp.status == 200){
          throw resp.body;
        }
        return resp;
      }),
      // repeatWhen(() => interval(5000))
      catchError(this.handleError));
  }

  public sendGetRequest() {
        // Add safe, URL encoded_page parameter 
        const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    return this.httpClient.get(this.REST_API_SERVER).pipe(retry(3),catchError(this.handleError));
  }
}