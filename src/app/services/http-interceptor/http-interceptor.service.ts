import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import {HttpErrorResponse} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class HttpInterceptor implements HttpInterceptor {
    // constructor(private injector: Injector) {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const modified = req.clone({setHeaders: {'SRE-Monitoring': 'true'}});
      console.log(`http request url: ${req.urlWithParams}`);
      console.log(`http request to : ${JSON.stringify(req)}`);
      //return next.handle(req); // Send original request
      return next.handle(modified); // Send modified request
    }
}

@Injectable()
export class InterceptorHeaders implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        const health = [];
        const healthdata = [];
        const modified = req.clone({ setHeaders: { 'Debug': 'true' } });
        req = req.clone({ headers: req.headers.append('Content-Type', 'application/json') });
        
        return next.handle(modified).pipe(
            tap(event => {
            console.log(event);
            const elapsed = Date.now() - started;
                console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                // Object.assign(this.health);
            if (event instanceof HttpResponse) {
                console.log(`Response Received: `);
            };
        }));

    }
}


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   // constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            const error = err.error.message || err.statusText;
            console.error(err);
            return throwError(error);
        }))
    }
}


// @Injectable()
// export class ResInterceptor implements HttpInterceptor {
//    // constructor() {}
//     intercept(response: HttpResponse<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(response).pipe(tap(event => {
//             console.log(event);
//             if (event instanceof HttpResponse) {
//                 console.log(`Response Received from API : `);
//             };
//         }))
//     }
// }


// @Injectable()
// export class ResInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const token: string = 'invald token';
//         req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

//         return next.handle(req)
//             .pipe(resp => {
//                 // on Response
//                 if (resp instanceof HttpResponse) {
//                     // Do whatever you want with the response.
//                     return resp;
//                 }
//             }).catch(err => {
//                 // onError
//                 console.log(err);
//                 if (err instanceof HttpErrorResponse) {
//                     console.log(err.status);
//                     console.log(err.statusText);
//                     if (err.status === 401) {
//                         // redirect the user to login page
//                         // 401 unauthorised user
//                     }
//                 }
//                 return throwError(err);
//             });
//     }
// }
