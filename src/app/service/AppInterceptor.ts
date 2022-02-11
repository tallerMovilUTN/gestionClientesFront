import { Injectable } from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor( private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let request = req;
      console.log("INTERCEPTOR-"+req);
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) =>
        {
              if ((err.status === 400) ||(err.status === 401) || (err.status === 403) || (err.status === 404))
              {
                this.router.navigateByUrl('Formulario');
              }
              return throwError( err );
        })
      );
  }





}
