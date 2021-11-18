import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Persona } from '../model/persona';
import { retry, catchError, map } from 'rxjs/operators';
import { Contacto } from '../model/contacto';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //webApiUr:string="http://localhost:8181/servicioFabrica-RC1/clientes";
  webApiUr:string="http://localhost:8080/personas";

  constructor( private http: HttpClient ) { }


  getClientes()
  {
      return this.http.get<Persona[]>(this.webApiUr);
  }


  saveCliente(cli: Persona) 
  {
    const body = JSON.stringify(cli);
    console.log(body);
    return this.http.post<any>(this.webApiUr, body, httpOptions);
  }



  obtenerClientePorId( id: number ) {

    console.log("obtenerClientePorId: "+id);
    const url = `${this.webApiUr}/${id}`;
    return this.http.get<Persona>(url);
  }



  upload(file1: File,
        file2: File, 
        per: Persona,
        padre: Contacto,
        madre: Contacto,
        abueloPat: Contacto,
        abuelaPat: Contacto,
        abueloMat: Contacto,
        abuelaMat: Contacto        
        //): Promise<any>{
        ): Observable<any>{  
    const formData: FormData = new FormData();
    formData.append('fotoFrente', file1);
    formData.append('fotoDorso', file2);
    var perJson = JSON.stringify(per);

    

    formData.append('persona', JSON.stringify(per));
    formData.append('padre', JSON.stringify(padre));
    formData.append('madre', JSON.stringify(madre));
    formData.append('abueloPat', JSON.stringify(abueloPat));
    formData.append('abuelaPat', JSON.stringify(abuelaPat));
    formData.append('abueloMat', JSON.stringify(abueloMat));
    formData.append('abuelaMat', JSON.stringify(abuelaMat));

   
    const req = new HttpRequest('POST', `${this.webApiUr}/upload`, formData, 
    {
      reportProgress: true,
      responseType: 'json'
    });
    /**return this.http.request(req).toPromise()
                                          .then(this.extractData)
                                          .catch(this.handleErrorPromise);
    **/                                      
                                                                      
                  /**..pipe(
                            map(this.extractData),
                            catchError(this.handleErrorObservable)
                          );
                 */
      return this.http.request(req)
                      .pipe(
                        map( (resp: any) => {
                          //swal('Empleado creado', empleado.nombre, 'success');
                          Swal.fire('Se han registrado correctamente todos los datos', '', 'success');
                          //return empleado;
                         }),
                         catchError((e: any) => 
                         
                         throwError(e))
                      );    
                
  }



  private extractData(res: any) {
    let body = res;
    return body;
  }


  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  } 


  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  } 


  


}


