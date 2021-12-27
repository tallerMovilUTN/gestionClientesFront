import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor( ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let request = req;
      console.log("INTERCEPTOR-"+req);
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) =>
        {
              if (err.status === 400)
              {
                    console.log('INTERCEPTOR-OCURRIO ERROR 400');
              }
              return throwError( err );
        })
      );
  }





}
