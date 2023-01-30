import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (localStorage.getItem('token') == null) {
    //   const req = request.clone({
    //     setHeaders: {
    //       'Access-Control-Allow-Origin': 'http://localhost:8080',
    //       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //       'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    //       'Access-Control-Allow-Credentials': 'true',
    //       'Accept' : '*/*',
    //       'Connention' : 'keep-alive'
    //     } 
    //   });
    //   return next.handle(req);
    // }
    // const token: string = localStorage.getItem('token') || "";
    
    const req = request.clone({
      setHeaders: {
        // 'Authorization': token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    }); //request richiesta originale
    return next.handle(req); //invia la richiesta
  }
}