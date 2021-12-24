import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from './model/contacto';
import { Persona } from './model/persona';
import Swal from 'sweetalert2';
import { Tiporelacion } from './model/tiporelacion';
import { ClienteService } from './service/cliente.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './utils/custom-adapter';
import {catchError, delay} from 'rxjs/operators';
import {of, timer} from "rxjs";
import {HttpResponse} from "@angular/common/http";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  //fechaNac!: NgbDateStruct;

  title = 'newMat';

  @ViewChild("fileUpload1", { static: false }) fileUpload1!: ElementRef;
  @ViewChild("fileUpload2", { static: false }) fileUpload2!: ElementRef;

  selectedFiles1!: FileList;
  selectedFiles2!: FileList;

  files  = [];

  //fileToUpload: File | null = null;

  mostrarDatosPadre: boolean = true;
  mostrarDatosMadre: boolean = true;
  mostrarCamposMatrimonio: boolean = false;
  mostrarDatosPadreAbueloPaterno:boolean = true;
  mostrarDatosMadreAbueloPaterno:boolean = true;

  mostrarDatosPadreAbueloMaterno:boolean = true;
  mostrarDatosMadreAbueloMaterno:boolean = true;

  clienteNuevo!: Persona;
  cliente!: Persona;
  padre!: Contacto;
  madre!: Contacto;
  padreAbueloPaterno!: Contacto;
  madreAbueloPaterno!: Contacto;
  padreAbueloMaterno!: Contacto;
  madreAbueloMaterno!: Contacto;

  tipoRelPadre!: Tiporelacion;
  tipoRelMadre!: Tiporelacion;

  tipoRelPadreAbueloPaterno!: Tiporelacion;
  tipoRelMadreAbueloPaterno!: Tiporelacion;

  tipoRelPadreAbueloMaterno!: Tiporelacion;
  tipoRelMadreAbueloMaterno!: Tiporelacion;



  estadoCivil = [
    {valor:'Soltero', muestraValor:'Soltero'},
    {valor:'Casado', muestraValor:'Casado'},
    {valor:'Divorciado', muestraValor:'Divorciado'},
    {valor:'Viudo', muestraValor:'Viudo'}
  ];
  seleccionada: string = this.estadoCivil[0].valor;


  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  tercerFormGroup!: FormGroup;
  cuartoFormGroup!: FormGroup;

  submitted = false;
  submitted2 = false;
  submitted3 = false;
  submitted4 = false;
  isChecked:boolean = false;





  constructor(private _formBuilder: FormBuilder, private clienteService: ClienteService ) {}

  ngOnInit() {


    this.tipoRelPadre = new Tiporelacion();
    this.tipoRelPadre.id = 1;
    this.tipoRelPadre.descripcion = "Padre";

    this.tipoRelMadre = new Tiporelacion();
    this.tipoRelMadre.id = 2;
    this.tipoRelMadre.descripcion = "Madre";

    this.tipoRelPadreAbueloPaterno = new Tiporelacion();
    this.tipoRelPadreAbueloPaterno.id = 3;
    this.tipoRelPadreAbueloPaterno.descripcion = "Abuelo Paterno";

    this.tipoRelMadreAbueloPaterno = new Tiporelacion();
    this.tipoRelMadreAbueloPaterno.id = 4;
    this.tipoRelMadreAbueloPaterno.descripcion = "Abuela Paterno";

    this.tipoRelPadreAbueloMaterno = new Tiporelacion();
    this.tipoRelPadreAbueloMaterno.id = 5;
    this.tipoRelPadreAbueloMaterno.descripcion = "Abuelo Materno";

    this.tipoRelMadreAbueloMaterno = new Tiporelacion();
    this.tipoRelMadreAbueloMaterno.id = 6;
    this.tipoRelMadreAbueloMaterno.descripcion = "Abuela Materno";


    this.firstFormGroup = this._formBuilder.group({
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      lugarNac: ['', Validators.required],
      fechaNac: ['', Validators.required],
      email: [''],

      calleNombre: ['', Validators.required],
      calleNro: ['', Validators.required],

      cp: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],

      telefonoParticular: [''],
      celularNro: [''],
      estadocivil: ['', Validators.required],
      fechaMatrimonio: [''],
      lugarMatrimonio: [''],
      idfotoFrente: ['', Validators.compose([Validators.required])],
      idfotoDorso: ['', Validators.compose([Validators.required])],


    });


    this.secondFormGroup = this._formBuilder.group({
      apellidoPadre: ['', Validators.required],
      nombrePadre: ['', Validators.required],

      dniPadre: ['', Validators.required],
      emailPadre: [''],

      fechaNacPadre: ['', Validators.required],
      lugarNacPadre: ['', Validators.required],



      fechaMatrimonioPadre: [''],
      lugarMatrimonioPadre: [''],

      fechaDefPadre: [''],
      lugarDefPadre: [''],

      calleNombrePadre: ['', Validators.required],
      calleNroPadre: ['', Validators.required],
      cpPadre: ['', Validators.required],
      localidadPadre: ['', Validators.required],
      provinciaPadre: ['', Validators.required],

      telefonoParticularPadre: [''],
      celularNroPadre: [''],
      comentarioPadre: [''],


      apellidoMadre: ['', Validators.required],
      nombreMadre: ['', Validators.required],

      dniMadre: ['', Validators.required],
      fechaNacMadre: ['', Validators.required],
      lugarNacMadre: ['', Validators.required],

      fechaMatrimonioMadre: [''],
      lugarMatrimonioMadre: [''],

      emailMadre: [''],
      fechaDefMadre: [''],
      lugarDefMadre: [''],

      calleNombreMadre: ['', Validators.required],
      calleNroMadre: ['', Validators.required],
      cpMadre: ['', Validators.required],
      localidadMadre: ['', Validators.required],
      provinciaMadre: ['', Validators.required],
      telefonoParticularMadre: [''],
      celularNroMadre: [''],
      observacionMadre: [''],
    });


    this.tercerFormGroup = this._formBuilder.group({
      apellidoPadreAbueloPaterno: ['', Validators.required],
      nombrePadreAbueloPaterno: ['', Validators.required],

      dniPadreAbueloPaterno: ['', Validators.required],
      fechaNacPadreAbueloPaterno: ['', Validators.required],
      lugarNacPadreAbueloPaterno: ['', Validators.required],

      fechaMatrimonioPadreAbueloPaterno: [''],
      lugarMatrimonioPadreAbueloPaterno: [''],


      emailPadreAbueloPaterno: [''],
      fechaDefPadreAbueloPaterno: [''],
      lugarDefPadreAbueloPaterno: [''],

      calleNombrePadreAbueloPaterno: ['', Validators.required],
      calleNroPadreAbueloPaterno: ['', Validators.required],
      cpPadreAbueloPaterno: ['', Validators.required],
      localidadPadreAbueloPaterno: ['', Validators.required],
      provinciaPadreAbueloPaterno: ['', Validators.required],


      telefonoParticularPadreAbueloPaterno: [''],
      celularNroPadreAbueloPaterno: [''],
      comentarioPadreAbueloPaterno: [''],

      apellidoMadreAbueloPaterno: ['', Validators.required],
      nombreMadreAbueloPaterno: ['', Validators.required],
      dniMadreAbueloPaterno: ['', Validators.required],
      emailMadreAbueloPaterno: [''],
      fechaNacMadreAbueloPaterno: ['', Validators.required],
      lugarNacMadreAbueloPaterno: ['', Validators.required],

      fechaMatrimonioMadreAbueloPaterno: [''],
      lugarMatrimonioMadreAbueloPaterno: [''],

      fechaDefMadreAbueloPaterno: [''],
      lugarDefMadreAbueloPaterno: [''],

      calleNombreMadreAbueloPaterno: ['', Validators.required],
      calleNroMadreAbueloPaterno: ['', Validators.required],
      cpMadreAbueloPaterno: ['', Validators.required],
      localidadMadreAbueloPaterno: ['', Validators.required],
      provinciaMadreAbueloPaterno: ['', Validators.required],
      telefonoParticularMadreAbueloPaterno: [''],
      celularNroMadreAbueloPaterno: [''],
      comentarioMadreAbueloPaterno: [''],


    });

    this.cuartoFormGroup = this._formBuilder.group({
      apellidoPadreAbueloMaterno: ['', Validators.required],
      nombrePadreAbueloMaterno: ['', Validators.required],

      dniPadreAbueloMaterno: ['', Validators.required],
      fechaNacPadreAbueloMaterno: ['', Validators.required],
      lugarNacPadreAbueloMaterno: ['', Validators.required],
      emailPadreAbueloMaterno: [''],
      fechaMatrimonioPadreAbueloMaterno: [''],
      lugarMatrimonioPadreAbueloMaterno: [''],
      fechaDefPadreAbueloMaterno: [''],
      lugarDefPadreAbueloMaterno: [''],
      calleNombrePadreAbueloMaterno: ['', Validators.required],
      calleNroPadreAbueloMaterno: ['', Validators.required],
      cpPadreAbueloMaterno: ['', Validators.required],
      localidadPadreAbueloMaterno: ['', Validators.required],
      provinciaPadreAbueloMaterno: ['', Validators.required],


      telefonoParticularPadreAbueloMaterno: [''],
      celularNroPadreAbueloMaterno: [''],
      comentarioPadreAbueloMaterno: [''],



      apellidoMadreAbueloMaterno: ['', Validators.required],
      nombreMadreAbueloMaterno: ['', Validators.required],
      dniMadreAbueloMaterno: ['', Validators.required],
      emailMadreAbueloMaterno: [''],
      fechaNacMadreAbueloMaterno: ['', Validators.required],
      lugarNacMadreAbueloMaterno: ['', Validators.required],

      fechaMatrimonioMadreAbueloMaterno: [''],
      lugarMatrimonioMadreAbueloMaterno: [''],

      fechaDefMadreAbueloMaterno: [''],
      lugarDefMadreAbueloMaterno: [''],

      calleNombreMadreAbueloMaterno: ['', Validators.required],
      calleNroMadreAbueloMaterno: ['', Validators.required],
      cpMadreAbueloMaterno: ['', Validators.required],
      localidadMadreAbueloMaterno: ['', Validators.required],
      provinciaMadreAbueloMaterno: ['', Validators.required],
      telefonoParticularMadreAbueloMaterno: [''],
      celularNroMadreAbueloMaterno: [''],
      comentarioMadreAbueloMaterno: [''],


    });

   /** this.secondFormGroup.controls.fechaMatrimonioPadre.setValue('');
    this.secondFormGroup.controls.fechaDefPadre.setValue('');
    this.secondFormGroup.controls.fechaMatrimonioMadre.setValue('');
    this.secondFormGroup.controls.fechaDefMadre.setValue('');
    **/



  }




  get f(): { [key: string]: AbstractControl } {
    return this.firstFormGroup.controls;
  }


  get f2(): { [key: string]: AbstractControl } {
    return this.secondFormGroup.controls;
  }

  get f3(): { [key: string]: AbstractControl } {
    return this.tercerFormGroup.controls;
  }

  get f4(): { [key: string]: AbstractControl } {
    return this.cuartoFormGroup.controls;
  }









  onCheckboxChangeNoConocePadre(value:boolean) {
    console.log("NO CONOCE LOS DATOS DEL PADRE___"+value);

    this.mostrarDatosPadre = true;
    if (value)
    {
      this.mostrarDatosPadre = false;
    }
  }



  onCheckboxChangeNoConoceMadre(value:boolean) {
    console.log("NO CONOCE LOS DATOS DEL MADRE___"+value);

    this.mostrarDatosMadre = true;
    if (value)
    {
      this.mostrarDatosMadre = false;
    }
  }


  onCheckboxChangeNoConocePadreAbueloPaterno(value:boolean)
  {
      console.log("NO CONOCE LOS DATOS DEL ABUELO PARTERNO PADRE___"+value);

      this.mostrarDatosPadreAbueloPaterno = true;
      if (value)
      {
        this.mostrarDatosPadreAbueloPaterno = false;
      }
  }



  onCheckboxChangeNoConoceMadreAbueloPaterno(value:boolean)
  {
      console.log("NO CONOCE LOS DATOS DE LA ABUELA PARTERNO ___"+value);

      this.mostrarDatosMadreAbueloPaterno = true;
      if (value)
      {
        this.mostrarDatosMadreAbueloPaterno = false;
      }
  }



  onCheckboxChangeNoConocePadreAbueloMaterno(value:boolean)
  {
      console.log("NO CONOCE LOS DATOS DEL ABUELO PARTERNO PADRE___"+value);

      this.mostrarDatosPadreAbueloMaterno = true;
      if (value)
      {
        this.mostrarDatosPadreAbueloMaterno = false;
      }
  }



  onCheckboxChangeNoConoceMadreAbueloMaterno(value:boolean)
  {
      console.log("NO CONOCE LOS DATOS DE LA ABUELA PARTERNO ___"+value);

      this.mostrarDatosMadreAbueloMaterno = true;
      if (value)
      {
        this.mostrarDatosMadreAbueloMaterno = false;
      }
  }












  onOptionsSelectedEstadoCivil(value:string){
    console.log("the selected value is " + value);
    this.mostrarCamposMatrimonio = false;
    this.firstFormGroup.get('fechaMatrimonio')?.clearValidators;
    this.firstFormGroup.get('fechaMatrimonio')?.setValidators([]);
    this.firstFormGroup.get('fechaMatrimonio')?.updateValueAndValidity;


    this.firstFormGroup.get('lugarMatrimonio')?.clearValidators;
    this.firstFormGroup.get('lugarMatrimonio')?.setValidators([]);
    this.firstFormGroup.get('lugarMatrimonio')?.updateValueAndValidity;


    if (value == "Casado")
    {
        this.mostrarCamposMatrimonio = true;

        //calleNombreMadre: ['', Validators.required]
       this.firstFormGroup.get('fechaMatrimonio')?.setValidators([Validators.required,Validators.minLength(3)]); // 5.Set Required Validator
       this.firstFormGroup.get('fechaMatrimonio')?.updateValueAndValidity();


       this.firstFormGroup.get('lugarMatrimonio')?.setValidators([Validators.required,Validators.minLength(3)]); // 5.Set Required Validator
       this.firstFormGroup.get('lugarMatrimonio')?.updateValueAndValidity();



    }
    //this.firstFormGroup.get('fechaMatrimonio').setValue('');
    this.firstFormGroup.controls.fechaMatrimonio.setValue('');
    this.firstFormGroup.controls.lugarMatrimonio.setValue('');
    console.log("mostrarCamposMatrimonio: " + this.mostrarCamposMatrimonio);
  }




  onSubmit(): void {
        this.submitted = true;



    console.log("!!!!!!!!!!!ESTOS CAMPOS SON INVALIDOS::::: ");
    for (let el in this.firstFormGroup.controls) {
      if (this.firstFormGroup.controls[el].errors) {
        console.log(el)
      }
    }

        if (this.firstFormGroup.invalid) {
          return;
        }

  }

  onSubmit2(): void {
    console.log("presiono onSubmit2");
    console.log("this.secondFormGroup.invalid: "+this.secondFormGroup.invalid);
    this.submitted2 = true;
    console.log(JSON.stringify(this.secondFormGroup.value, null, 2));

    if (this.secondFormGroup.invalid) {
      return;
    }


  }



  onSubmit3(): void {
    console.log("presiono onSubmit2");
    console.log("this.secondFormGroup.invalid: "+this.tercerFormGroup.invalid);
    this.submitted3 = true;

    if (this.tercerFormGroup.invalid) {
      return;
    }

    console.log(JSON.stringify(this.tercerFormGroup.value, null, 2));
  }




  submit(){

    this.submitted4 = true;

    if (this.cuartoFormGroup.invalid) {

      return;
    }
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.tercerFormGroup.value);
    console.log(this.cuartoFormGroup.value);

    console.log("****************DATOS DEL CLIENTE****************");
    console.log("apellido: "+this.firstFormGroup.controls.apellido.value);
    console.log("nombre: "+this.firstFormGroup.controls.nombre.value);
    console.log("dni: "+this.firstFormGroup.controls.dni.value);
    console.log("lugarNac: "+this.firstFormGroup.controls.lugarNac.value);
    console.log("fechaNac: "+this.firstFormGroup.controls.fechaNac.value);
    console.log("email: "+this.firstFormGroup.controls.email.value);
    console.log("calleNombre: "+this.firstFormGroup.controls.calleNombre.value);
    console.log("calleNro: "+this.firstFormGroup.controls.calleNro.value);
    console.log("cp: "+this.firstFormGroup.controls.cp.value);
    console.log("localidad: "+this.firstFormGroup.controls.localidad.value);
    console.log("provincia: "+this.firstFormGroup.controls.provincia.value);
    console.log("telefonoParticular: "+this.firstFormGroup.controls.telefonoParticular.value);
    console.log("celularNro: "+this.firstFormGroup.controls.celularNro.value);
    console.log("idfotoFrente: "+this.firstFormGroup.controls.idfotoFrente.value);
    console.log("idfotoDorso: "+this.firstFormGroup.controls.idfotoDorso.value);
    console.log("estadocivil: "+this.firstFormGroup.controls.estadocivil.value);
    console.log("fechaMatrimonio: "+this.firstFormGroup.controls.fechaMatrimonio.value);
    console.log("lugarMatrimonio: "+this.firstFormGroup.controls.lugarMatrimonio.value);

   //////////////DATOS DEL SOLICITANTE//////////////
   this.cliente = new Persona();
   this.cliente.apellido = this.firstFormGroup.controls.apellido.value
   this.cliente.nombre = this.firstFormGroup.controls.nombre.value
   this.cliente.dni = this.firstFormGroup.controls.dni.value
   this.cliente.lugarNac = this.firstFormGroup.controls.lugarNac.value
   //this.cliente.fechaNac = this.obtenerFormatoFecha(this.firstFormGroup.controls.fechaNac.value);
   this.cliente.fechaNac = this.firstFormGroup.controls.fechaNac.value;
   this.cliente.email = this.firstFormGroup.controls.email.value
   this.cliente.calleNombre = this.firstFormGroup.controls.calleNombre.value
   this.cliente.cp = this.firstFormGroup.controls.cp.value
   this.cliente.localidad = this.firstFormGroup.controls.localidad.value
   this.cliente.provincia = this.firstFormGroup.controls.provincia.value
   this.cliente.telefonoParticular = this.firstFormGroup.controls.telefonoParticular.value
   this.cliente.celularNro = this.firstFormGroup.controls.celularNro.value


   this.cliente.idfotoFrente = this.firstFormGroup.controls.idfotoFrente.value
   this.cliente.idfotoDorso = this.firstFormGroup.controls.idfotoDorso.value
   this.cliente.estadocivil = this.firstFormGroup.controls.estadocivil.value
   //this.cliente.fechaMatrimonio = this.obtenerFormatoFecha(this.firstFormGroup.controls.fechaMatrimonio.value);
   this.cliente.fechaMatrimonio = this.firstFormGroup.controls.fechaMatrimonio.value;

   this.cliente.lugarMatrimonio = this.firstFormGroup.controls.lugarMatrimonio.value

   //////////////DATOS DEL PADRE//////////////
   this.padre = new Contacto();
   this.padre.apellido = this.secondFormGroup.controls.apellidoPadre.value
   this.padre.nombre = this.secondFormGroup.controls.nombrePadre.value
   this.padre.dni = this.secondFormGroup.controls.dniPadre.value

   //this.padre.fechaNac = this.obtenerFormatoFecha(this.secondFormGroup.controls.fechaNacPadre.value);
   this.padre.fechaNac = this.secondFormGroup.controls.fechaNacPadre.value;
   this.padre.lugarNac = this.secondFormGroup.controls.lugarNacPadre.value

   //this.padre.fechaDefuncion = this.obtenerFormatoFecha(this.secondFormGroup.controls.fechaDefPadre.value);
   this.padre.fechaDefuncion = this.secondFormGroup.controls.fechaDefPadre.value;
   this.padre.lugarDefuncion = this.secondFormGroup.controls.lugarDefPadre.value

   //this.padre.fechaMatrimonio = this.obtenerFormatoFecha(this.secondFormGroup.controls.fechaMatrimonioPadre.value);
   this.padre.fechaMatrimonio = this.secondFormGroup.controls.fechaMatrimonioPadre.value;
   this.padre.lugarMatrimonio = this.secondFormGroup.controls.lugarMatrimonioPadre.value

   this.padre.email = this.secondFormGroup.controls.emailPadre.value
   this.padre.calleNombre = this.secondFormGroup.controls.calleNombrePadre.value
   this.padre.calleNro = this.secondFormGroup.controls.calleNroPadre.value
   this.padre.cp = this.secondFormGroup.controls.cpPadre.value
   this.padre.localidad = this.secondFormGroup.controls.localidadPadre.value
   this.padre.provincia = this.secondFormGroup.controls.provinciaPadre.value
   this.padre.telefonoParticular = this.secondFormGroup.controls.telefonoParticularPadre.value
   this.padre.celularNro = this.secondFormGroup.controls.celularNroPadre.value
   this.padre.observacion = this.secondFormGroup.controls.comentarioPadre.value
   //this.padre.estadocivil = this.secondFormGroup.controls.comentarioPadre.value
   this.padre.persona = this.cliente;
    this.padre.tipoRelacion = this.tipoRelPadre;

   //////////////DATOS DE LA MADRE//////////////
   this.madre = new Contacto();
   this.madre.apellido = this.secondFormGroup.controls.apellidoMadre.value
   this.madre.nombre = this.secondFormGroup.controls.nombreMadre.value
   this.madre.dni = this.secondFormGroup.controls.dniMadre.value

   //this.madre.fechaNac = this.obtenerFormatoFecha(this.secondFormGroup.controls.fechaNacMadre.value);
   this.madre.fechaNac = this.secondFormGroup.controls.fechaNacMadre.value;
   this.madre.lugarNac = this.secondFormGroup.controls.lugarNacMadre.value

   //this.madre.fechaMatrimonio = this.obtenerFormatoFecha(this.secondFormGroup.controls.fechaMatrimonioMadre.value);
   this.madre.fechaMatrimonio = this.secondFormGroup.controls.fechaMatrimonioMadre.value;
   this.madre.lugarMatrimonio = this.secondFormGroup.controls.lugarMatrimonioMadre.value

   //this.madre.fechaDefuncion = this.obtenerFormatoFecha(this.secondFormGroup.controls.fechaDefMadre.value);
   this.madre.fechaDefuncion = this.secondFormGroup.controls.fechaDefMadre.value;
   this.madre.lugarDefuncion = this.secondFormGroup.controls.lugarDefMadre.value
   this.madre.email = this.secondFormGroup.controls.lugarDefMadre.value
   this.madre.calleNombre = this.secondFormGroup.controls.calleNombreMadre.value
   this.madre.calleNro = this.secondFormGroup.controls.calleNroMadre.value
   this.madre.cp = this.secondFormGroup.controls.cpMadre.value
   this.madre.localidad = this.secondFormGroup.controls.localidadMadre.value
   this.madre.provincia = this.secondFormGroup.controls.provinciaMadre.value
   this.madre.telefonoParticular = this.secondFormGroup.controls.telefonoParticularMadre.value
   this.madre.celularNro = this.secondFormGroup.controls.celularNroMadre.value
   this.madre.observacion = this.secondFormGroup.controls.observacionMadre.value
   this.madre.persona = this.cliente;
   this.madre.tipoRelacion = this.tipoRelMadre;


   //////////////DATOS DEL PADRE-MADRE - ABUELOS PATERNOS//////////////
   this.padreAbueloPaterno = new Contacto();
   this.padreAbueloPaterno.apellido = this.tercerFormGroup.controls.apellidoPadreAbueloPaterno.value
   this.padreAbueloPaterno.nombre = this.tercerFormGroup.controls.nombrePadreAbueloPaterno.value
   this.padreAbueloPaterno.dni = this.tercerFormGroup.controls.dniPadreAbueloPaterno.value

   //this.padreAbueloPaterno.fechaNac = this.obtenerFormatoFecha(this.tercerFormGroup.controls.fechaNacPadreAbueloPaterno.value);
   this.padreAbueloPaterno.fechaNac = this.tercerFormGroup.controls.fechaNacPadreAbueloPaterno.value;
   this.padreAbueloPaterno.lugarNac = this.tercerFormGroup.controls.lugarNacPadreAbueloPaterno.value

   //this.padreAbueloPaterno.fechaMatrimonio = this.obtenerFormatoFecha(this.tercerFormGroup.controls.fechaMatrimonioPadreAbueloPaterno.value);
   this.padreAbueloPaterno.fechaMatrimonio = this.tercerFormGroup.controls.fechaMatrimonioPadreAbueloPaterno.value;
   this.padreAbueloPaterno.lugarMatrimonio = this.tercerFormGroup.controls.lugarMatrimonioPadreAbueloPaterno.value


   //this.padreAbueloPaterno.fechaDefuncion = this.obtenerFormatoFecha(this.tercerFormGroup.controls.fechaDefPadreAbueloPaterno.value);
   this.padreAbueloPaterno.fechaDefuncion = this.tercerFormGroup.controls.fechaDefPadreAbueloPaterno.value;
   this.padreAbueloPaterno.lugarDefuncion = this.tercerFormGroup.controls.lugarDefPadreAbueloPaterno.value
   this.padreAbueloPaterno.email = this.tercerFormGroup.controls.emailPadreAbueloPaterno.value
   this.padreAbueloPaterno.calleNombre = this.tercerFormGroup.controls.calleNombrePadreAbueloPaterno.value
   this.padreAbueloPaterno.calleNro = this.tercerFormGroup.controls.calleNroPadreAbueloPaterno.value
   this.padreAbueloPaterno.cp = this.tercerFormGroup.controls.cpPadreAbueloPaterno.value
   this.padreAbueloPaterno.localidad = this.tercerFormGroup.controls.localidadPadreAbueloPaterno.value
   this.padreAbueloPaterno.provincia = this.tercerFormGroup.controls.provinciaPadreAbueloPaterno.value
   this.padreAbueloPaterno.telefonoParticular = this.tercerFormGroup.controls.telefonoParticularPadreAbueloPaterno.value
   this.padreAbueloPaterno.celularNro = this.tercerFormGroup.controls.celularNroPadreAbueloPaterno.value
   this.padreAbueloPaterno.observacion = this.tercerFormGroup.controls.comentarioPadreAbueloPaterno.value
   this.padreAbueloPaterno.persona = this.cliente;
   this.padreAbueloPaterno.tipoRelacion = this.tipoRelPadreAbueloPaterno;



   this.madreAbueloPaterno = new Contacto();
   this.madreAbueloPaterno.apellido = this.tercerFormGroup.controls.apellidoMadreAbueloPaterno.value
   this.madreAbueloPaterno.nombre = this.tercerFormGroup.controls.nombreMadreAbueloPaterno.value
   this.madreAbueloPaterno.dni = this.tercerFormGroup.controls.dniMadreAbueloPaterno.value

   //this.madreAbueloPaterno.fechaNac = this.obtenerFormatoFecha(this.tercerFormGroup.controls.fechaNacMadreAbueloPaterno.value);
   this.madreAbueloPaterno.fechaNac = this.tercerFormGroup.controls.fechaNacMadreAbueloPaterno.value;
   this.madreAbueloPaterno.lugarNac = this.tercerFormGroup.controls.lugarNacMadreAbueloPaterno.value


   //this.madreAbueloPaterno.fechaMatrimonio = this.obtenerFormatoFecha(this.tercerFormGroup.controls.fechaMatrimonioMadreAbueloPaterno.value);
   this.madreAbueloPaterno.fechaMatrimonio = this.tercerFormGroup.controls.fechaMatrimonioMadreAbueloPaterno.value;
   this.madreAbueloPaterno.lugarMatrimonio = this.tercerFormGroup.controls.lugarMatrimonioMadreAbueloPaterno.value


   //this.madreAbueloPaterno.fechaDefuncion = this.obtenerFormatoFecha(this.tercerFormGroup.controls.fechaDefMadreAbueloPaterno.value);
   this.madreAbueloPaterno.fechaDefuncion = this.tercerFormGroup.controls.fechaDefMadreAbueloPaterno.value;
   this.madreAbueloPaterno.lugarDefuncion = this.tercerFormGroup.controls.lugarDefMadreAbueloPaterno.value
   this.madreAbueloPaterno.email = this.tercerFormGroup.controls.emailMadreAbueloPaterno.value

   this.madreAbueloPaterno.calleNombre = this.tercerFormGroup.controls.calleNombreMadreAbueloPaterno.value
   this.madreAbueloPaterno.calleNro = this.tercerFormGroup.controls.calleNroMadreAbueloPaterno.value
   this.madreAbueloPaterno.cp = this.tercerFormGroup.controls.cpMadreAbueloPaterno.value
   this.madreAbueloPaterno.localidad = this.tercerFormGroup.controls.localidadMadreAbueloPaterno.value
   this.madreAbueloPaterno.provincia = this.tercerFormGroup.controls.provinciaMadreAbueloPaterno.value
   this.madreAbueloPaterno.telefonoParticular = this.tercerFormGroup.controls.telefonoParticularMadreAbueloPaterno.value
   this.madreAbueloPaterno.celularNro = this.tercerFormGroup.controls.celularNroMadreAbueloPaterno.value
   this.madreAbueloPaterno.observacion = this.tercerFormGroup.controls.comentarioMadreAbueloPaterno.value
   this.madreAbueloPaterno.persona = this.cliente;
   this.madreAbueloPaterno.tipoRelacion = this.tipoRelMadreAbueloPaterno;


   //////////////DATOS DEL PADRE-MADRE - ABUELOS MATERNOS//////////////
   this.padreAbueloMaterno = new Contacto();
   this.padreAbueloMaterno.apellido = this.cuartoFormGroup.controls.apellidoPadreAbueloMaterno.value
   this.padreAbueloMaterno.nombre = this.cuartoFormGroup.controls.nombrePadreAbueloMaterno.value
   this.padreAbueloMaterno.dni = this.cuartoFormGroup.controls.dniPadreAbueloMaterno.value

   //this.padreAbueloMaterno.fechaNac = this.obtenerFormatoFecha(this.cuartoFormGroup.controls.fechaNacPadreAbueloMaterno.value);
   this.padreAbueloMaterno.fechaNac = this.cuartoFormGroup.controls.fechaNacPadreAbueloMaterno.value;
   this.padreAbueloMaterno.lugarNac = this.cuartoFormGroup.controls.lugarNacPadreAbueloMaterno.value

   //this.padreAbueloMaterno.fechaMatrimonio = this.obtenerFormatoFecha(this.cuartoFormGroup.controls.fechaMatrimonioPadreAbueloMaterno.value);
   this.padreAbueloMaterno.fechaMatrimonio = this.cuartoFormGroup.controls.fechaMatrimonioPadreAbueloMaterno.value;
   this.padreAbueloMaterno.lugarMatrimonio = this.cuartoFormGroup.controls.lugarMatrimonioPadreAbueloMaterno.value

   //this.padreAbueloMaterno.fechaDefuncion = this.obtenerFormatoFecha(this.cuartoFormGroup.controls.fechaDefPadreAbueloMaterno.value);
   this.padreAbueloMaterno.fechaDefuncion = this.cuartoFormGroup.controls.fechaDefPadreAbueloMaterno.value;

   this.padreAbueloMaterno.lugarDefuncion = this.cuartoFormGroup.controls.lugarDefPadreAbueloMaterno.value
   this.padreAbueloMaterno.email = this.cuartoFormGroup.controls.emailPadreAbueloMaterno.value
   this.padreAbueloMaterno.calleNombre = this.cuartoFormGroup.controls.calleNombrePadreAbueloMaterno.value
   this.padreAbueloMaterno.calleNro = this.cuartoFormGroup.controls.calleNroPadreAbueloMaterno.value
   this.padreAbueloMaterno.cp = this.cuartoFormGroup.controls.cpPadreAbueloMaterno.value
   this.padreAbueloMaterno.localidad = this.cuartoFormGroup.controls.localidadPadreAbueloMaterno.value
   this.padreAbueloMaterno.provincia = this.cuartoFormGroup.controls.provinciaPadreAbueloMaterno.value
   this.padreAbueloMaterno.telefonoParticular = this.cuartoFormGroup.controls.telefonoParticularPadreAbueloMaterno.value
   this.padreAbueloMaterno.celularNro = this.cuartoFormGroup.controls.celularNroPadreAbueloMaterno.value
   this.padreAbueloMaterno.observacion = this.cuartoFormGroup.controls.comentarioPadreAbueloMaterno.value
   this.padreAbueloMaterno.persona = this.cliente;
   this.padreAbueloMaterno.tipoRelacion = this.tipoRelPadreAbueloMaterno;


   this.madreAbueloMaterno = new Contacto();
   this.madreAbueloMaterno.apellido = this.cuartoFormGroup.controls.apellidoMadreAbueloMaterno.value
   this.madreAbueloMaterno.nombre = this.cuartoFormGroup.controls.nombreMadreAbueloMaterno.value
   this.madreAbueloMaterno.dni = this.cuartoFormGroup.controls.dniMadreAbueloMaterno.value


   //this.madreAbueloMaterno.fechaNac = this.obtenerFormatoFecha(this.cuartoFormGroup.controls.fechaNacMadreAbueloMaterno.value);
   this.madreAbueloMaterno.fechaNac = this.cuartoFormGroup.controls.fechaNacMadreAbueloMaterno.value;
   this.madreAbueloMaterno.lugarNac = this.cuartoFormGroup.controls.lugarNacMadreAbueloMaterno.value

   this.madreAbueloMaterno.fechaMatrimonio = this.cuartoFormGroup.controls.fechaMatrimonioMadreAbueloMaterno.value
   this.madreAbueloMaterno.lugarMatrimonio = this.cuartoFormGroup.controls.lugarMatrimonioMadreAbueloMaterno.value

   this.madreAbueloMaterno.fechaDefuncion = this.cuartoFormGroup.controls.fechaDefMadreAbueloMaterno.value;
   this.madreAbueloMaterno.lugarDefuncion = this.cuartoFormGroup.controls.lugarDefMadreAbueloMaterno.value
   this.madreAbueloMaterno.email = this.cuartoFormGroup.controls.emailMadreAbueloMaterno.value
   this.madreAbueloMaterno.calleNombre = this.cuartoFormGroup.controls.calleNombreMadreAbueloMaterno.value
   this.madreAbueloMaterno.calleNro = this.cuartoFormGroup.controls.calleNroMadreAbueloMaterno.value
   this.madreAbueloMaterno.cp = this.cuartoFormGroup.controls.cpMadreAbueloMaterno.value
   this.madreAbueloMaterno.localidad = this.cuartoFormGroup.controls.localidadMadreAbueloMaterno.value
   this.madreAbueloMaterno.provincia = this.cuartoFormGroup.controls.provinciaMadreAbueloMaterno.value
   this.madreAbueloMaterno.telefonoParticular = this.cuartoFormGroup.controls.telefonoParticularMadreAbueloMaterno.value
   this.madreAbueloMaterno.celularNro = this.cuartoFormGroup.controls.celularNroMadreAbueloMaterno.value
   this.madreAbueloMaterno.observacion = this.cuartoFormGroup.controls.comentarioMadreAbueloMaterno.value
   this.madreAbueloMaterno.persona = this.cliente;
   this.madreAbueloMaterno.tipoRelacion = this.tipoRelMadreAbueloMaterno;


    //this.clienteService.upload()

    let error = false;
    this.clienteService.upload(this.selectedFiles1[0],
                            this.selectedFiles2[0],
                            this.cliente,
                            this.padre,
                            this.madre,
                            this.padreAbueloPaterno,
                            this.madreAbueloPaterno,
                            this.padreAbueloMaterno,
                            this.madreAbueloMaterno) .subscribe( (err) => {
                                                            error = true;
                                                            console.log('Error en el appComponent');
                                                            console.log('Error en el appComponent: '+err);
                                                            Swal.fire("Error enviado desde el Servidor", "Por favor verifique los datos cargados!", "error");
                                                            return;
                                      });

                            if (!error)
                            {

                                console.log( "NO DIO ERRROR" );
                                Swal.fire({
                                  title: 'Se han registrado correctamente todos los datos. Nos comunicaremos a la brevedad',
                                  icon:'success',
                                  didOpen: function () {
                                    Swal.showLoading()
                                    // AJAX request simulated with setTimeout
                                    setTimeout(function () {
                                      Swal.close()
                                    }, 3000)
                                  }
                                });


                            }



                             /** (res: HttpResponse<any>) => {
                                console.log(res.body);
                                this.clienteNuevo = res.body;
                                console.log(this.clienteNuevo.id);
                                Swal.fire('Se han registrado correctamente todos los datos. Nos comunicaremos a la brevedad', '', 'success');
                              },
                                (err: any) => {
                                  console.log(err);
                                  Swal.fire("Error enviado desde el Servidor", "Por favor verifique los datos cargados!", "error");
                                  return;

                                }
                              );**/
                              /**error =>
                              {

                                    console.log(error);
                                    console.log("STATUS: "+error.status);
                                    switch (error.status)
                                    {
                                          case 400: {
                                            error = true;
                                            break;
                                          }
                                          case 401: {
                                            error = true;

                                            break;
                                          }
                                          case 402:
                                          {
                                            error = true;
                                                    break;
                                          }
                                      case 404:
                                      {
                                        error = true;
                                        break;
                                      }
                                      case 405:
                                      {
                                        error = true;
                                        break;
                                      }

                                      case 500:
                                      {
                                        error = true;
                                        break;
                                      }
                                    }
                              });

                if (error)
                {
                      Swal.fire("Error enviado desde el Servidor", "Por favor verifique los datos cargados!", "error");
                      return;
                }
                else
                {
                      Swal.fire({
                        title: 'Se han registrado correctamente todos los datos. Nos comunicaremos a la brevedad',
                        icon:'success',
                        didOpen: function () {
                          Swal.showLoading()
                          // AJAX request simulated with setTimeout
                          setTimeout(function () {
                            Swal.close()
                          }, 3000)
                        }
                      })


                      console.log("debe enviar el swal***");
                  //this.reset();
                }**/










    }



    selectFiles1(event: any) {

      this.selectedFiles1=event.target.files;

    }

    selectFiles2(event: any) {
      this.selectedFiles2=event.target.files;

    }





   /**uploadFile()
    {
        this.cliente = new Persona();
        this.cliente.apellido = this.firstFormGroup.controls.apellido.value
        this.cliente.nombre = this.firstFormGroup.controls.nombre.value
        this.cliente.dni = this.firstFormGroup.controls.dni.value
        this.cliente.lugarNac = this.firstFormGroup.controls.lugarNac.value
        this.cliente.fechaNac = this.firstFormGroup.controls.fechaNac.value
        this.cliente.email = this.firstFormGroup.controls.email.value
        this.cliente.calleNombre = this.firstFormGroup.controls.calleNombre.value
        this.cliente.cp = this.firstFormGroup.controls.cp.value
        this.cliente.localidad = this.firstFormGroup.controls.localidad.value
        this.cliente.provincia = this.firstFormGroup.controls.provincia.value
        this.cliente.telefonoParticular = this.firstFormGroup.controls.telefonoParticular.value
        this.cliente.idfotoFrente = this.firstFormGroup.controls.idfotoFrente.value
        this.cliente.idfotoDorso = this.firstFormGroup.controls.idfotoDorso.value

        console.log("uploadFile");
        console.log("this.cliente: "+this.cliente);

        this.clienteService.upload(this.selectedFiles1[0],this.selectedFiles2[0],this.cliente).subscribe(data => {
        }, error => {
          console.log(error);
        });

    }**/




    reset()
    {
          //this.firstFormGroup.controls.fechaMatrimonio.setValue('');
          this.firstFormGroup.controls.apellido.setValue('');
          this.firstFormGroup.controls.nombre.setValue('');
          this.firstFormGroup.controls.dni.setValue('');
          this.firstFormGroup.controls.lugarNac.setValue('');
          this.firstFormGroup.controls.fechaNac.setValue('');
          this.firstFormGroup.controls.email.setValue('');
          this.firstFormGroup.controls.calleNombre.setValue('');
          this.firstFormGroup.controls.cp.setValue('');
          this.firstFormGroup.controls.localidad.setValue('');
          this.firstFormGroup.controls.provincia.setValue('');
          this.firstFormGroup.controls.telefonoParticular.setValue('');
          this.firstFormGroup.controls.idfotoFrente.setValue('');
          this.firstFormGroup.controls.idfotoDorso.setValue('');
          this.firstFormGroup.controls.estadocivil.setValue('');
          this.firstFormGroup.controls.fechaMatrimonio.setValue('');
          this.firstFormGroup.controls.lugarMatrimonio.setValue('');

          this.secondFormGroup.controls.apellidoPadre.setValue('');
          this.secondFormGroup.controls.nombrePadre.setValue('');
          this.secondFormGroup.controls.dniPadre.setValue('');
          this.secondFormGroup.controls.fechaNacPadre.setValue('');
          this.secondFormGroup.controls.lugarNacPadre.setValue('');
          this.secondFormGroup.controls.fechaDefPadre.setValue('');
          this.secondFormGroup.controls.lugarDefPadre.setValue('');

          this.secondFormGroup.controls.fechaMatrimonioPadre.setValue('');
          this.secondFormGroup.controls.lugarMatrimonioPadre.setValue('');


          this.secondFormGroup.controls.emailPadre.setValue('');
          this.secondFormGroup.controls.calleNombrePadre.setValue('');
          this.secondFormGroup.controls.calleNroPadre.setValue('');
          this.secondFormGroup.controls.cpPadre.setValue('');
          this.secondFormGroup.controls.localidadPadre.setValue('');
          this.secondFormGroup.controls.provinciaPadre.setValue('');
          this.secondFormGroup.controls.telefonoParticularPadre.setValue('');
          this.secondFormGroup.controls.celularNroPadre.setValue('');
          this.secondFormGroup.controls.comentarioPadre.setValue('');



          this.secondFormGroup.controls.apellidoMadre.setValue('');
          this.secondFormGroup.controls.nombreMadre.setValue('');
          this.secondFormGroup.controls.dniMadre.setValue('');
          this.secondFormGroup.controls.fechaNacMadre.setValue('');
          this.secondFormGroup.controls.lugarNacMadre.setValue('');

          this.secondFormGroup.controls.fechaMatrimonioMadre.setValue('');
          this.secondFormGroup.controls.lugarMatrimonioMadre.setValue('');

          this.secondFormGroup.controls.emailMadre.setValue('');
          this.secondFormGroup.controls.fechaDefMadre.setValue('');
          this.secondFormGroup.controls.lugarDefMadre.setValue('');
          this.secondFormGroup.controls.calleNombreMadre.setValue('');
          this.secondFormGroup.controls.calleNroMadre.setValue('');
          this.secondFormGroup.controls.cpMadre.setValue('');
          this.secondFormGroup.controls.localidadMadre.setValue('');
          this.secondFormGroup.controls.provinciaMadre.setValue('');
          this.secondFormGroup.controls.telefonoParticularMadre.setValue('');
          this.secondFormGroup.controls.celularNroMadre.setValue('');
          this.secondFormGroup.controls.observacionMadre.setValue('');




          this.tercerFormGroup.controls.apellidoPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.nombrePadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.dniPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.fechaNacPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.lugarNacPadreAbueloPaterno.setValue('');

          this.tercerFormGroup.controls.fechaMatrimonioPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.lugarMatrimonioPadreAbueloPaterno.setValue('');


          this.tercerFormGroup.controls.emailPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.fechaDefPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.lugarDefPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.calleNombrePadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.calleNroPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.cpPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.localidadPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.provinciaPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.telefonoParticularPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.celularNroPadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.comentarioPadreAbueloPaterno.setValue('');





          this.tercerFormGroup.controls.apellidoMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.nombreMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.dniMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.fechaNacMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.lugarNacMadreAbueloPaterno.setValue('');

          this.tercerFormGroup.controls.fechaMatrimonioMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.lugarMatrimonioMadreAbueloPaterno.setValue('');

          this.tercerFormGroup.controls.emailMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.fechaDefMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.lugarDefMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.calleNombreMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.calleNroMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.cpMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.localidadMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.provinciaMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.telefonoParticularMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.celularNroMadreAbueloPaterno.setValue('');
          this.tercerFormGroup.controls.comentarioMadreAbueloPaterno.setValue('');



          this.cuartoFormGroup.controls.apellidoPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.nombrePadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.dniPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.fechaNacPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.lugarNacPadreAbueloMaterno.setValue('');

          this.cuartoFormGroup.controls.fechaMatrimonioPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.lugarMatrimonioPadreAbueloMaterno.setValue('');


          this.cuartoFormGroup.controls.emailPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.fechaDefPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.lugarDefPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.calleNombrePadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.calleNroPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.cpPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.localidadPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.provinciaPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.telefonoParticularPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.celularNroPadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.comentarioPadreAbueloMaterno.setValue('');




          this.cuartoFormGroup.controls.apellidoMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.nombreMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.dniMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.fechaNacMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.lugarNacMadreAbueloMaterno.setValue('');

          this.cuartoFormGroup.controls.fechaMatrimonioMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.lugarMatrimonioMadreAbueloMaterno.setValue('');

          this.cuartoFormGroup.controls.emailMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.fechaDefMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.lugarDefMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.calleNombreMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.calleNroMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.cpMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.localidadMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.provinciaMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.telefonoParticularMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.celularNroMadreAbueloMaterno.setValue('');
          this.cuartoFormGroup.controls.comentarioMadreAbueloMaterno.setValue('');

          this.submitted = false;
          this.submitted2 = false;
          this.submitted3 = false;
          this.submitted4 = false;

    }






  onCheckboxChangeCopiarDomicilio(value:boolean, tipo:any)
  {
          console.log("NO CONOCE LOS DATOS DEL PADRE___"+value);

          switch (tipo)
          {
                case "padre":
                {
                      this.secondFormGroup.controls.calleNombreMadre.setValue('');
                      this.secondFormGroup.controls.calleNroMadre.setValue('');
                      this.secondFormGroup.controls.cpMadre.setValue('');
                      this.secondFormGroup.controls.localidadMadre.setValue('');
                      this.secondFormGroup.controls.provinciaMadre.setValue('');
                      if (value)
                      {
                          this.secondFormGroup.controls.calleNombreMadre.setValue(this.secondFormGroup.controls.calleNombrePadre.value);
                          this.secondFormGroup.controls.calleNroMadre.setValue(this.secondFormGroup.controls.calleNroPadre.value);
                          this.secondFormGroup.controls.cpMadre.setValue(this.secondFormGroup.controls.cpPadre.value);
                          this.secondFormGroup.controls.localidadMadre.setValue(this.secondFormGroup.controls.localidadPadre.value);
                          this.secondFormGroup.controls.provinciaMadre.setValue(this.secondFormGroup.controls.provinciaPadre.value);
                      }
                      break;
                }


                case "AbueloPaterno":
                {
                      this.tercerFormGroup.controls.calleNombreMadreAbueloPaterno.setValue('');
                      this.tercerFormGroup.controls.calleNroMadreAbueloPaterno.setValue('');
                      this.tercerFormGroup.controls.cpMadreAbueloPaterno.setValue('');
                      this.tercerFormGroup.controls.localidadMadreAbueloPaterno.setValue('');
                      this.tercerFormGroup.controls.provinciaMadreAbueloPaterno.setValue('');
                      if (value)
                      {
                          this.tercerFormGroup.controls.calleNombreMadreAbueloPaterno.setValue(this.tercerFormGroup.controls.calleNombrePadreAbueloPaterno.value);
                          this.tercerFormGroup.controls.calleNroMadreAbueloPaterno.setValue(this.tercerFormGroup.controls.calleNroPadreAbueloPaterno.value);
                          this.tercerFormGroup.controls.cpMadreAbueloPaterno.setValue(this.tercerFormGroup.controls.cpPadreAbueloPaterno.value);
                          this.tercerFormGroup.controls.localidadMadreAbueloPaterno.setValue(this.tercerFormGroup.controls.localidadPadreAbueloPaterno.value);
                          this.tercerFormGroup.controls.provinciaMadreAbueloPaterno.setValue(this.tercerFormGroup.controls.provinciaPadreAbueloPaterno.value);
                      }
                      break;
                }


                case "AbueloMaterno":
                {
                        this.cuartoFormGroup.controls.calleNombreMadreAbueloMaterno.setValue('');
                        this.cuartoFormGroup.controls.calleNroMadreAbueloMaterno.setValue('');
                        this.cuartoFormGroup.controls.cpMadreAbueloMaterno.setValue('');
                        this.cuartoFormGroup.controls.localidadMadreAbueloMaterno.setValue('');
                        this.cuartoFormGroup.controls.provinciaMadreAbueloMaterno.setValue('');
                        if (value)
                        {
                            this.cuartoFormGroup.controls.calleNombreMadreAbueloMaterno.setValue(this.cuartoFormGroup.controls.calleNombrePadreAbueloMaterno.value);
                            this.cuartoFormGroup.controls.calleNroMadreAbueloMaterno.setValue(this.cuartoFormGroup.controls.calleNroPadreAbueloMaterno.value);
                            this.cuartoFormGroup.controls.cpMadreAbueloMaterno.setValue(this.cuartoFormGroup.controls.cpPadreAbueloMaterno.value);
                            this.cuartoFormGroup.controls.localidadMadreAbueloMaterno.setValue(this.cuartoFormGroup.controls.localidadPadreAbueloMaterno.value);
                            this.cuartoFormGroup.controls.provinciaMadreAbueloMaterno.setValue(this.cuartoFormGroup.controls.provinciaPadreAbueloMaterno.value);
                        }
                        break;
                }


          }

  }



  alerta()
  {

          Swal.fire({
            title: 'Se han registrado correctamente todos los datos. Nos comunicaremos a la brevedad',
            icon:'success',
            didOpen: function () {
              Swal.showLoading()
              // AJAX request simulated with setTimeout
              setTimeout(function () {
                Swal.close()
              }, 3000)
            }
          })

          this.reset();
  }


}
