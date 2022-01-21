import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Contacto} from "../../model/contacto";
import {Persona} from "../../model/persona";
import {ClienteService} from "../../service/cliente.service";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {

  fotoFrente: any;
  fotoPerfil: any;
  imagenFotoFrente!: File;
  imagenFotoDorso!: File;


  agregoFamiliar:boolean = false;

  tipoRelacionLista = ['Hermano1',    'Hermano2',    'Hermano3',    'Hermano4',    'Hermano5',    'Hermano6',    'Hermano7',    'Hermano8',
    'Primo1',    'Primo2',    'Primo3',    'Primo4',    'Primo5',    'Primo6',    'Primo7',    'Primo8',
    'Tio1',    'Tio2',    'Tio3',    'Tio4',    'Tio5',    'Tio6',    'Tio7',    'Tio8'];





  cliente!: Persona;
  contacto!: Contacto;
  contactos: Contacto[]=[];

  apellidoCli:string="Cliente";
  nombreCli:string="";
  styleCli:string=""

  padreApellido:string="Padre";
  padreNombre:string="";
  stylePadre:string=""

  madreApellido:string="Madre";
  madreNombre:string="";
  styleMadre:string=""



  abueloPatpellido:string="Abuelo";
  abueloPatNombre:string="Pat";
  styleabueloPat:string=""

  abuelaPatpellido:string="Abuela";
  abuelaPatNombre:string="Pat";
  styleabuelaPat:string=""


  abueloMatpellido:string="Abuelo";
  abueloMatNombre:string="Mat";
  styleabueloMat:string=""

  abuelaMatpellido:string="Abuela";
  abuelaMatNombre:string="Mat";
  styleabuelaMat:string=""


  bisabueloPat1pellido:string="Bisabuelo";
  bisabueloPat1Nombre:string="Pat1";
  stylebisabueloPat1:string=""


  bisabueloPat2pellido:string="Bisabuelo";
  bisabueloPat2Nombre:string="Pat2";
  stylebisabueloPat2:string=""


  bisabueloPat3pellido:string="Bisabuelo";
  bisabueloPat3Nombre:string="Pat3";
  stylebisabueloPat3:string=""


  bisabueloPat4pellido:string="Bisabuelo";
  bisabueloPat4Nombre:string="Pat4";
  stylebisabueloPat4:string=""


  bisabueloMat1pellido:string="Bisabuelo";
  bisabueloMat1Nombre:string="Mat1";
  stylebisabueloMat1:string=""

  bisabueloMat2pellido:string="Bisabuelo";
  bisabueloMat2Nombre:string="Mat2";
  stylebisabueloMat2:string=""


  bisabueloMat3pellido:string="Bisabuelo";
  bisabueloMat3Nombre:string="Mat3";
  stylebisabueloMat3:string=""


  bisabueloMat4pellido:string="Bisabuelo";
  bisabueloMat4Nombre:string="Mat4";
  stylebisabueloMat4:string=""


  tatarabueloPat1pellido:string="Tatarabuelo";
  tatarabueloPat1Nombre:string="Pat1";
  styleTatarabueloPat1:string=""

  tatarabueloPat2pellido:string="Tatarabuelo";
  tatarabueloPat2Nombre:string="Pat2";
  styleTatarabueloPat2:string=""


  tatarabueloPat3pellido:string="Tatarabuelo";
  tatarabueloPat3Nombre:string="Pat3";
  styleTatarabueloPat3:string=""

  tatarabueloPat4pellido:string="Tatarabuelo";
  tatarabueloPat4Nombre:string="Pat4";
  styleTatarabueloPat4:string=""


  tatarabueloPat5pellido:string="Tatarabuelo";
  tatarabueloPat5Nombre:string="Pat5";
  styleTatarabueloPat5:string=""

  tatarabueloPat6pellido:string="Tatarabuelo";
  tatarabueloPat6Nombre:string="Pat6";
  styleTatarabueloPat6:string=""


  tatarabueloPat7pellido:string="Tatarabuelo";
  tatarabueloPat7Nombre:string="Pat7";
  styleTatarabueloPat7:string=""

  tatarabueloPat8pellido:string="Tatarabuelo";
  tatarabueloPat8Nombre:string="Pat8";
  styleTatarabueloPat8:string=""


  tatarabueloMat1pellido:string="Tatarabuelo";
  tatarabueloMat1Nombre:string="Mat1";
  styleTatarabueloMat1:string=""

  tatarabueloMat2pellido:string="Tatarabuelo";
  tatarabueloMat2Nombre:string="Mat2";
  styleTatarabueloMat2:string=""


  tatarabueloMat3pellido:string="Tatarabuelo";
  tatarabueloMat3Nombre:string="Mat3";
  styleTatarabueloMat3:string=""

  tatarabueloMat4pellido:string="Tatarabuelo";
  tatarabueloMat4Nombre:string="Mat4";
  styleTatarabueloMat4:string=""


  tatarabueloMat5pellido:string="Tatarabuelo";
  tatarabueloMat5Nombre:string="Mat5";
  styleTatarabueloMat5:string=""

  tatarabueloMat6pellido:string="Tatarabuelo";
  tatarabueloMat6Nombre:string="Mat6";
  styleTatarabueloMat6:string=""


  tatarabueloMat7pellido:string="Tatarabuelo";
  tatarabueloMat7Nombre:string="Mat7";
  styleTatarabueloMat7:string=""

  tatarabueloMat8pellido:string="Tatarabuelo";
  tatarabueloMat8Nombre:string="Mat8";
  styleTatarabueloMat8:string=""






  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
      this.cargarDatos()

  }





  limpiar()
  {

        Swal.fire({
          title: '¿Borrar Arbol Familiar?',
          text: `Esta a punto de borrar todos los datos cargados`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si, borrarlo'
        }).then((result) => {
          if (result.value)
          {
            //localStorage.setItem("key_"+cont, JSON.stringify(this.nuevoContacto));
            this.borrarStore();



            Swal.fire(
              'Arbol borrado',
              `Se borraron todos los datos`,
              'success'
            );
          }
        })

  }


  borrarStore()
  {

        localStorage.removeItem("theImageFotoFrente");
        localStorage.removeItem("theImageFotoPerfil");
        localStorage.removeItem("cliente");
        this.apellidoCli = "Cliente";
        this.nombreCli = "";
        this.styleCli="";


        localStorage.removeItem("Padre");
        this.padreApellido = "Padre";
        this.padreNombre = "";
        this.stylePadre="";

        localStorage.removeItem("Madre");
        this.madreApellido = "Madre";
        this.madreNombre = "";
        this.styleMadre="";



        localStorage.removeItem("AbueloPaterno");
        this.abueloPatpellido = "Abuelo";
        this.abueloPatNombre =  "Pat";
        this.styleabueloPat="";

        localStorage.removeItem("AbuelaPaterna");
        this.abuelaPatpellido = "Abuela"
        this.abuelaPatNombre = "Pat"
        this.styleabuelaPat="";

        localStorage.removeItem("AbueloMaterna");
        this.abueloMatpellido = "Abuelo";
        this.abueloMatNombre = "Mat";
        this.styleabueloMat="";

        localStorage.removeItem("AbuelaMaterna");
        this.abuelaMatpellido = "Abuela";
        this.abuelaMatNombre = "Mat";
        this.styleabuelaMat="";

        localStorage.removeItem("BisabueloPat1");
        this.bisabueloPat1pellido = "Bisabuelo";
        this.bisabueloPat1Nombre = "Pat1";
        this.stylebisabueloPat1="";

        localStorage.removeItem("BisabueloPat2");
        this.bisabueloPat2pellido = "Bisabuelo";
        this.bisabueloPat2Nombre = "Pat2";
        this.stylebisabueloPat2="";

        localStorage.removeItem("BisabueloPat3");
        this.bisabueloPat3pellido = "Bisabuelo";
        this.bisabueloPat3Nombre = "Pat3";
        this.stylebisabueloPat3="";

        localStorage.removeItem("BisabueloPat4");
        this.bisabueloPat4pellido = "Bisabuelo";
        this.bisabueloPat4Nombre = "Pat4";
        this.stylebisabueloPat4="";

        localStorage.removeItem("BisabueloMat1");
        this.bisabueloMat1pellido = "Bisabuelo";
        this.bisabueloMat1Nombre = "Mat1";
        this.stylebisabueloMat1="";

        localStorage.removeItem("BisabueloMat2");
        this.bisabueloMat2pellido = "Bisabuelo";
        this.bisabueloMat2Nombre = "Mat2";
        this.stylebisabueloMat2="";

        localStorage.removeItem("BisabueloMat3");
        this.bisabueloMat3pellido = "Bisabuelo";
        this.bisabueloMat3Nombre = "Mat3";
        this.stylebisabueloMat3="";

        localStorage.removeItem("BisabueloMat4");
        this.bisabueloMat4pellido = "Bisabuelo";
        this.bisabueloMat4Nombre = "Mat4";
        this.stylebisabueloMat4="";


        localStorage.removeItem("TatarabueloPat1");
        this.tatarabueloPat1pellido = "Tatarabuelo";
        this.tatarabueloPat1Nombre = "Pat1";
        this.styleTatarabueloPat1="";

        localStorage.removeItem("TatarabueloPat2");
        this.tatarabueloPat2pellido = "Tatarabuelo";
        this.tatarabueloPat2Nombre = "Pat2";
        this.styleTatarabueloPat2="";

        localStorage.removeItem("TatarabueloPat3");
        this.tatarabueloPat3pellido = "Tatarabuelo";
        this.tatarabueloPat3Nombre = "Pat3";
        this.styleTatarabueloPat3="";


        localStorage.removeItem("TatarabueloPat4");
        this.tatarabueloPat4pellido = "Tatarabuelo";
        this.tatarabueloPat4Nombre = "Pat4";
        this.styleTatarabueloPat4="";

        localStorage.removeItem("TatarabueloPat5");
        this.tatarabueloPat5pellido = "Tatarabuelo";
        this.tatarabueloPat5Nombre = "Pat5";
        this.styleTatarabueloPat5="";

        localStorage.removeItem("TatarabueloPat6");
        this.tatarabueloPat6pellido = "Tatarabuelo";
        this.tatarabueloPat5Nombre = "Pat6";
        this.styleTatarabueloPat6="";

        localStorage.removeItem("TatarabueloPat7");
        this.tatarabueloPat7pellido = "Tatarabuelo";
        this.tatarabueloPat7Nombre = "Pat7";
        this.styleTatarabueloPat7="";

        localStorage.removeItem("TatarabueloPat8");
        this.tatarabueloPat8pellido = "Tatarabuelo";
        this.tatarabueloPat8Nombre = "Pat8";
        this.styleTatarabueloPat8="";

        ///////TATARABUELOMAT
        localStorage.removeItem("TatarabueloMat1");
        this.tatarabueloMat1pellido = "Tatarabuelo";
        this.tatarabueloMat1Nombre = "Mat1";
        this.styleTatarabueloMat1="";

        localStorage.removeItem("TatarabueloMat2");
        this.tatarabueloMat2pellido = "Tatarabuelo";
        this.tatarabueloMat2Nombre = "Mat2";
        this.styleTatarabueloMat2="";

        localStorage.removeItem("TatarabueloMat3");
        this.tatarabueloMat3pellido = "Tatarabuelo";
        this.tatarabueloMat3Nombre = "Mat3";
        this.styleTatarabueloMat3="";


        localStorage.removeItem("TatarabueloMat4");
        this.tatarabueloMat4pellido = "Tatarabuelo";
        this.tatarabueloMat4Nombre = "Mat4";
        this.styleTatarabueloMat4="";

        localStorage.removeItem("TatarabueloMat5");
        this.tatarabueloMat5pellido = "Tatarabuelo";
        this.tatarabueloMat5Nombre = "Mat5";
        this.styleTatarabueloMat5="";

        localStorage.removeItem("TatarabueloMat6");
        this.tatarabueloMat6pellido = "Tatarabuelo";
        this.tatarabueloMat5Nombre = "Mat6";
        this.styleTatarabueloMat6="";

        localStorage.removeItem("TatarabueloMat7");
        this.tatarabueloMat7pellido = "Tatarabuelo";
        this.tatarabueloMat7Nombre = "Mat7";
        this.styleTatarabueloMat7="";


        localStorage.removeItem("TatarabueloMat8");
        this.tatarabueloMat8pellido = "Tatarabuelo";
        this.tatarabueloMat8Nombre = "Mat8";
        this.styleTatarabueloMat8="";

        for (let i = 0; i < this.tipoRelacionLista.length; i++)
        {
          localStorage.removeItem(this.tipoRelacionLista[i]);
        }

        this.cliente = new Persona();
        this.contactos=[];///vacio los contactos
  }


  cargarContactos()
  {


    let cont:any;
    let contact:any;
    if (localStorage.getItem("indexContacto") != null)
    {
      cont = localStorage.getItem("indexContacto");

      for (let i = 1; i <= cont; i++)
      {

        contact = localStorage.getItem("key_"+i);
        console.log(contact);
        if (contact != null)
        {
          let jsonObj: any;
          jsonObj = JSON.parse(contact); // string to generic object first
          this.contactos.push(<Contacto>jsonObj);
        }



      }

    }
  }









  borrarContacto(contacto:Contacto)
  {
    let apellido= contacto.apellido+" "+contacto.nombre;
    console.log("estoy en borrar Contacto "+contacto.id);
    Swal.fire({
      title: '¿Borrar Familiar?',
      text: `Esta a punto de borrar a ${ apellido }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value)
      {
        //localStorage.setItem("key_"+cont, JSON.stringify(this.nuevoContacto));
        localStorage.removeItem("key_"+contacto.id);
        this.contactos=[];///vacio los contactos
        this.cargarContactos();//actualizo los contactos


        Swal.fire(
          'Familiar borrado',
          `${ apellido } fue eliminado correctamente`,
          'success'
        );
      }
    })
  }



  cargarDatos()
  {
        let obj: any;
        let jsonObj: any;
        obj = localStorage.getItem("cliente");
        if (obj != null)
        {
              jsonObj = JSON.parse(obj); // string to generic object first
              this.cliente = (<Persona>jsonObj);
              this.apellidoCli = this.cliente.apellido;
              this.nombreCli = this.cliente.nombre
              this.styleCli="background-color:#99bef6;font-weight: bold;color: #0A0A0A";
        }


        obj = localStorage.getItem("Padre");
        if (obj != null)
        {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.padreApellido = this.contacto.apellido;
          this.padreNombre = this.contacto.nombre
          this.stylePadre="background-color:#5AAF63;font-weight: bold;color: #0A0A0A";
        }



        obj = localStorage.getItem("Madre");
        if (obj != null)
        {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.madreApellido = this.contacto.apellido;
          this.madreNombre = this.contacto.nombre
          this.styleMadre="background-color:#5AAF63;font-weight: bold;color: #0A0A0A";
        }


        obj = localStorage.getItem("AbueloPaterno");
        if (obj != null)
        {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.abueloPatpellido = this.contacto.apellido;
          this.abueloPatNombre = this.contacto.nombre
          this.styleabueloPat="background-color:#E8B276FF;font-weight: bold;color: #0A0A0A";
        }


        obj = localStorage.getItem("AbuelaPaterna");
        if (obj != null)
        {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.abuelaPatpellido = this.contacto.apellido;
          this.abuelaPatNombre = this.contacto.nombre
          this.styleabuelaPat="background-color:#E8B276FF;font-weight: bold;color: #0A0A0A";
        }


        obj = localStorage.getItem("AbueloMaterna");
        if (obj != null)
        {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.abueloMatpellido = this.contacto.apellido;
          this.abueloMatNombre = this.contacto.nombre
          this.styleabueloMat="background-color:#E8B276FF;font-weight: bold;color: #0A0A0A";
        }


      obj = localStorage.getItem("AbuelaMaterna");
      if (obj != null)
      {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.abuelaMatpellido = this.contacto.apellido;
          this.abuelaMatNombre = this.contacto.nombre
          this.styleabuelaMat="background-color:#E8B276FF;font-weight: bold;color: #0A0A0A";
      }



      obj = localStorage.getItem("BisabueloPat1");
      if (obj != null)
      {
              jsonObj = JSON.parse(obj); // string to generic object first
              this.contacto = (<Contacto>jsonObj);
              this.contactos.push(this.contacto);
              this.bisabueloPat1pellido = this.contacto.apellido;
              this.bisabueloPat1Nombre = this.contacto.nombre
              this.stylebisabueloPat1="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
      }

    obj = localStorage.getItem("BisabueloPat2");
    if (obj != null)
    {
            jsonObj = JSON.parse(obj); // string to generic object first
            this.contacto = (<Contacto>jsonObj);
            this.contactos.push(this.contacto);
            this.bisabueloPat2pellido = this.contacto.apellido;
            this.bisabueloPat2Nombre = this.contacto.nombre
            this.stylebisabueloPat2="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }

    obj = localStorage.getItem("BisabueloPat3");
    if (obj != null)
    {
            jsonObj = JSON.parse(obj); // string to generic object first
            this.contacto = (<Contacto>jsonObj);
            this.contactos.push(this.contacto);
            this.bisabueloPat3pellido = this.contacto.apellido;
            this.bisabueloPat3Nombre = this.contacto.nombre
            this.stylebisabueloPat3="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }

    obj = localStorage.getItem("BisabueloPat4");
    if (obj != null)
    {
            jsonObj = JSON.parse(obj); // string to generic object first
            this.contacto = (<Contacto>jsonObj);
            this.contactos.push(this.contacto);
            this.bisabueloPat4pellido = this.contacto.apellido;
            this.bisabueloPat4Nombre = this.contacto.nombre
            this.stylebisabueloPat4="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }

    obj = localStorage.getItem("BisabueloMat1");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.bisabueloMat1pellido = this.contacto.apellido;
      this.bisabueloMat1Nombre = this.contacto.nombre
      this.stylebisabueloMat1="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }

    obj = localStorage.getItem("BisabueloMat2");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.bisabueloMat2pellido = this.contacto.apellido;
      this.bisabueloMat2Nombre = this.contacto.nombre
      this.stylebisabueloMat2="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }

    obj = localStorage.getItem("BisabueloMat3");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.bisabueloMat3pellido = this.contacto.apellido;
      this.bisabueloMat3Nombre = this.contacto.nombre
      this.stylebisabueloMat3="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }

    obj = localStorage.getItem("BisabueloMat4");
    if (obj != null)
    {
          jsonObj = JSON.parse(obj); // string to generic object first
          this.contacto = (<Contacto>jsonObj);
          this.contactos.push(this.contacto);
          this.bisabueloMat4pellido = this.contacto.apellido;
          this.bisabueloMat4Nombre = this.contacto.nombre
          this.stylebisabueloMat4="background-color:#A8B276CC;font-weight: bold;color: #0A0A0A";
    }






    obj = localStorage.getItem("TatarabueloPat1");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat1pellido = this.contacto.apellido;
      this.tatarabueloPat1Nombre = this.contacto.nombre
      this.styleTatarabueloPat1="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloPat2");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat2pellido = this.contacto.apellido;
      this.tatarabueloPat2Nombre = this.contacto.nombre
      this.styleTatarabueloPat2="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloPat3");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat3pellido = this.contacto.apellido;
      this.tatarabueloPat3Nombre = this.contacto.nombre
      this.styleTatarabueloPat3="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }



    obj = localStorage.getItem("TatarabueloPat4");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat4pellido = this.contacto.apellido;
      this.tatarabueloPat4Nombre = this.contacto.nombre
      this.styleTatarabueloPat4="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloPat5");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat5pellido = this.contacto.apellido;
      this.tatarabueloPat5Nombre = this.contacto.nombre
      this.styleTatarabueloPat5="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloPat6");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat6pellido = this.contacto.apellido;
      this.tatarabueloPat5Nombre = this.contacto.nombre
      this.styleTatarabueloPat6="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloPat7");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat7pellido = this.contacto.apellido;
      this.tatarabueloPat7Nombre = this.contacto.nombre
      this.styleTatarabueloPat7="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }



    obj = localStorage.getItem("TatarabueloPat8");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloPat8pellido = this.contacto.apellido;
      this.tatarabueloPat8Nombre = this.contacto.nombre
      this.styleTatarabueloPat8="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }

    ///////TATARABUELOMAT
    obj = localStorage.getItem("TatarabueloMat1");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat1pellido = this.contacto.apellido;
      this.tatarabueloMat1Nombre = this.contacto.nombre
      this.styleTatarabueloMat1="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloMat2");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat2pellido = this.contacto.apellido;
      this.tatarabueloMat2Nombre = this.contacto.nombre
      this.styleTatarabueloMat2="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloMat3");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat3pellido = this.contacto.apellido;
      this.tatarabueloMat3Nombre = this.contacto.nombre
      this.styleTatarabueloMat3="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }



    obj = localStorage.getItem("TatarabueloMat4");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat4pellido = this.contacto.apellido;
      this.tatarabueloMat4Nombre = this.contacto.nombre
      this.styleTatarabueloMat4="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloMat5");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat5pellido = this.contacto.apellido;
      this.tatarabueloMat5Nombre = this.contacto.nombre
      this.styleTatarabueloMat5="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloMat6");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat6pellido = this.contacto.apellido;
      this.tatarabueloMat5Nombre = this.contacto.nombre
      this.styleTatarabueloMat6="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }


    obj = localStorage.getItem("TatarabueloMat7");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat7pellido = this.contacto.apellido;
      this.tatarabueloMat7Nombre = this.contacto.nombre
      this.styleTatarabueloMat7="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }



    obj = localStorage.getItem("TatarabueloMat8");
    if (obj != null)
    {
      jsonObj = JSON.parse(obj); // string to generic object first
      this.contacto = (<Contacto>jsonObj);
      this.contactos.push(this.contacto);
      this.tatarabueloMat8pellido = this.contacto.apellido;
      this.tatarabueloMat8Nombre = this.contacto.nombre
      this.styleTatarabueloMat8="background-color:#E2C9EFFF;font-weight: bold;color: #0A0A0A";
    }

  }/////limpiar()



  readURL(event:any, index:number): void
  {
        if (event.target.files && event.target.files[0])
        {
          const file = event.target.files[0];
          var reader = new FileReader();
          if (index == 1)
          {
            reader.onload = e => this.fotoFrente = reader.result;
            this.imagenFotoFrente = event.target.files[0];

          }
          else
          {
            reader.onload = e => this.fotoPerfil = reader.result;
            this.imagenFotoDorso = event.target.files[0];
          }
          console.log("file "+JSON.stringify(file));
          reader.readAsDataURL(file);
        }
  }



  agregarListaFamiliares()
  {
        let obj: any;
        let jsonObj: any;
        console.log("ESTOY EN CARGAR TABLA");
        for (let i = 0; i < this.tipoRelacionLista.length; i++)
        {
          console.log("RELACION: "+this.tipoRelacionLista[i]);
          obj = localStorage.getItem(this.tipoRelacionLista[i]);
          if (obj != null)
          {
            jsonObj = JSON.parse(obj); // string to generic object first
            let contacto = (<Contacto>jsonObj);
            this.contactos.push(contacto);
          }
        }
        this.agregoFamiliar = true;

  }


  enviarFormulario()
  {

              if (!this.agregoFamiliar)
              {
                    this.agregarListaFamiliares();
              }

              var fotoFrente,fotoPerfil;
              if (localStorage.theImageFotoFrente != null)
              {
                var dataImage = localStorage.theImageFotoFrente;
                const imageBlob = this.dataURItoBlob(dataImage);
                fotoFrente = new File([imageBlob], 'fotoFrente.png', { type: 'image/png' });

              }



              if (localStorage.theImageFotoPerfil != null)
              {
                var dataImage = localStorage.theImageFotoPerfil;
                const imageBlob = this.dataURItoBlob(dataImage);
                fotoPerfil = new File([imageBlob], 'fotoPerfil.png', { type: 'image/png' });

              }

              // @ts-ignore
              this.clienteService.enviarFormulario(fotoFrente,
                fotoPerfil,
              this.cliente,
              this.contactos).subscribe(
              data =>
              {
                console.log("PASO POR NEXT - NO HAGO NADA");


              },
              err  =>
              {
                //this.errorMsg = <any>err
                console.log('OCURRIO ERROR: '+<any>err);
                Swal.fire("Error enviado desde el Servidor", "Por favor verifique los datos cargados!", "error");
                return;
              },
              ()=>
              {
                console.log("COMPLETE SE EJECUTA SI NO DA ERROR");
                Swal.fire("Arbol Genealogico Familiar", 'Se han registrado correctamente todos los datos', 'success');
                this.borrarStore();
                //this.router.navigateByUrl(`/dashboard/clientes`)

              }

            );
  }





  dataURItoBlob(dataURI:any) {
        var byteString = atob(dataURI.toString().split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });
        return blob;
  }


}
