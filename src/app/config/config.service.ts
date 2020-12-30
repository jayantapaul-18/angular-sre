import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import { repos } from './repos';
 
@Injectable()
export class GitHubService {
 
  baseURL: string = "http://localhost:3003/app/v1/healthcheck";
 
  constructor(private http: HttpClient) {
  }
 
  getRepos(serverState: string): Observable<any> {
    return this.http.get(this.baseURL + 'app/' + 'v1/healthcheck')
  }
 
}
  
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
}