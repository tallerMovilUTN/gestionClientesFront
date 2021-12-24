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

    return next.handle( request ).pipe(
      catchError( this.manejarError )
    );
    /**return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) =>
      {
        console.log("ERROR CAPTURADOR POR INTERCEPTO::: "+err.status);
        return throwError( err );

      })
    );**/
  }





  manejarError( error: HttpErrorResponse ) {
    console.log('Sucedió un error INTERCEPTOR');
    console.warn(error);
    return throwError('Ocurrio un error de comunicacion con el Servidor');
  }




}
