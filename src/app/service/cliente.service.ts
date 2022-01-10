import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Persona } from '../model/persona';
import { retry, catchError, map } from 'rxjs/operators';
import { Contacto } from '../model/contacto';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {environment} from "../../environments/environment";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  //webApiUr:string="http://localhost:8181/servicioFabrica-RC1/clientes";
  webApiUr:string=environment.base_url+"/personas";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token})
  };


  httpOptions1 = {
    headers: new HttpHeaders({
      ///'Content-Type': 'multipart/form-data',
      'Authorization': this.token
    })
  };


  constructor( private http: HttpClient) { }


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


    let headers = new HttpHeaders();
    //headers=headers.set('content-type','application/json')
    headers=headers.set('Access-Control-Allow-Origin', '*');
    headers=headers.set('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    headers=headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    const req = new HttpRequest('POST', `${this.webApiUr}/upload`, formData,{'headers':headers});
    return this.http.request(req);

  }






  enviarFormulario(file1: File,
         file2: File,
         cli: Persona,contactos: Contacto[]): Observable<any>{
        //cli: Persona): Observable<any>{



    const formData: FormData = new FormData();
    formData.append('fotoFrente', file1);
    formData.append('fotoDorso', file2);
    var perJson = JSON.stringify(cli);



    formData.append('cliente', JSON.stringify(cli));
    formData.append('contactos', JSON.stringify(contactos));


    let headers = new HttpHeaders();
    //headers=headers.set('content-type','application/json')
    headers=headers.set('Access-Control-Allow-Origin', '*');
    headers=headers.set('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    headers=headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    const req = new HttpRequest('POST', `${this.webApiUr}/arbol`, formData,{'headers':headers});
    return this.http.request(req);

  }



  private extractData(res: any) {
    let body = res;
    return body;
  }






  get token(): string {
    return localStorage.getItem('token') || '';
  }




}



