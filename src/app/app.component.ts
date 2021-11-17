import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from './model/contacto';
import { Persona } from './model/persona';
import Swal from 'sweetalert2';
import { Tiporelacion } from './model/tiporelacion';
import { ClienteService } from './service/cliente.service';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter } from './utils/custom-adapter';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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





  constructor(private _formBuilder: FormBuilder, private clienteService: ClienteService) {}

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
      fechaNacPadre: ['', Validators.required],
      lugarNacPadre: ['', Validators.required],

      emailPadre: [''],

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

    console.log("****************DATOS DEL PADRE****************");
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
    let OK = false;
    this.clienteService.upload(this.selectedFiles1[0],
                            this.selectedFiles2[0],
                            this.cliente,
                            this.padre,
                            this.madre,
                            this.padreAbueloPaterno,
                            this.madreAbueloPaterno,
                            this.padreAbueloMaterno,
                            this.madreAbueloMaterno)
                            /**.subscribe(resp => {
                                console.log("NO DIO ERROR");
                                console.log("RESPUESTA SERVIDOR: "+resp);
                                Swal.fire('Se han registrado correctamente todos los datos', '', 'success');

                              },
                              error => {
                                    console.log(error);
                              });**/
                              .then(resp => {
                                console.log("NO DIO ERROR");
                                console.log("RESPUESTA SERVIDOR: "+resp);
                                OK = true;

                               },
                              error =>
                              {
                                OK = false;
                                console.log(error);
                                Swal.fire("Error enviado desde el Servidor", "Por favor verifique los datos cargados!", "error");
                              });



                if (OK)
                {
                    Swal.fire('Se han registrado correctamente todos los datos', '', 'success');
                }





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
          this.firstFormGroup.controls.apellido.value.setValue('');
          this.firstFormGroup.controls.nombre.value.setValue('');
          this.firstFormGroup.controls.dni.value.setValue('');
          this.firstFormGroup.controls.lugarNac.value.setValue('');
          this.firstFormGroup.controls.fechaNac.value.setValue('');
          this.firstFormGroup.controls.email.value.setValue('');
          this.firstFormGroup.controls.calleNombre.value.setValue('');
          this.firstFormGroup.controls.cp.value.setValue('');
          this.firstFormGroup.controls.localidad.value.setValue('');
          this.firstFormGroup.controls.provincia.value.setValue('');
          this.firstFormGroup.controls.telefonoParticular.value.setValue('');
          this.firstFormGroup.controls.idfotoFrente.value.setValue('');
          this.firstFormGroup.controls.idfotoDorso.value.setValue('');
          this.firstFormGroup.controls.estadocivil.value.setValue('');
          this.firstFormGroup.controls.fechaMatrimonio.value.setValue('');
          this.firstFormGroup.controls.lugarMatrimonio.value.setValue('');

          this.secondFormGroup.controls.apellidoPadre.value.setValue('');
          this.secondFormGroup.controls.nombrePadre.value.setValue('');
          this.secondFormGroup.controls.dniPadre.value.setValue('');
          this.secondFormGroup.controls.fechaNacPadre.value.setValue('');
          this.secondFormGroup.controls.lugarNacPadre.value.setValue('');
          this.secondFormGroup.controls.fechaDefPadre.value.setValue('');
          this.secondFormGroup.controls.lugarDefPadre.value.setValue('');

          this.secondFormGroup.controls.fechaMatrimonioPadre.value.setValue('');
          this.secondFormGroup.controls.lugarMatrimonioPadre.value.setValue('');


          this.secondFormGroup.controls.emailPadre.value.setValue('');
          this.secondFormGroup.controls.calleNombrePadre.value.setValue('');
          this.secondFormGroup.controls.calleNroPadre.value.setValue('');
          this.secondFormGroup.controls.cpPadre.value.setValue('');
          this.secondFormGroup.controls.localidadPadre.value.setValue('');
          this.secondFormGroup.controls.provinciaPadre.value.setValue('');
          this.secondFormGroup.controls.telefonoParticularPadre.value.setValue('');
          this.secondFormGroup.controls.celularNroPadre.value.setValue('');
          this.secondFormGroup.controls.comentarioPadre.value.setValue('');



          this.secondFormGroup.controls.apellidoMadre.value.setValue('');
          this.secondFormGroup.controls.nombreMadre.value.setValue('');
          this.secondFormGroup.controls.dniMadre.value.setValue('');
          this.secondFormGroup.controls.fechaNacMadre.value.setValue('');
          this.secondFormGroup.controls.lugarNacMadre.value.setValue('');

          this.secondFormGroup.controls.fechaMatrimonioMadre.value.setValue('');
          this.secondFormGroup.controls.lugarMatrimonioMadre.value.setValue('');

          this.secondFormGroup.controls.emailMadre.value.setValue('');
          this.secondFormGroup.controls.fechaDefMadre.value.setValue('');
          this.secondFormGroup.controls.lugarDefMadre.value.setValue('');
          this.secondFormGroup.controls.calleNombreMadre.value.setValue('');
          this.secondFormGroup.controls.calleNroMadre.value.setValue('');
          this.secondFormGroup.controls.cpMadre.value.setValue('');
          this.secondFormGroup.controls.localidadMadre.value.setValue('');
          this.secondFormGroup.controls.provinciaMadre.value.setValue('');
          this.secondFormGroup.controls.telefonoParticularMadre.value.setValue('');
          this.secondFormGroup.controls.celularNroMadre.value.setValue('');
          this.secondFormGroup.controls.observacionMadre.value.setValue('');




          this.tercerFormGroup.controls.apellidoPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.nombrePadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.dniPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.fechaNacPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.lugarNacPadreAbueloPaterno.value.setValue('');

          this.tercerFormGroup.controls.fechaMatrimonioPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.lugarMatrimonioPadreAbueloPaterno.value.setValue('');


          this.tercerFormGroup.controls.emailPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.fechaDefPadreAbueloPaterno.value    .setValue('');
          this.tercerFormGroup.controls.lugarDefPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.calleNombrePadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.calleNroPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.cpPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.localidadPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.provinciaPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.telefonoParticularPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.celularNroPadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.comentarioPadreAbueloPaterno.value.setValue('');





          this.tercerFormGroup.controls.apellidoMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.nombreMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.dniMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.fechaNacMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.lugarNacMadreAbueloPaterno.value.setValue('');

          this.tercerFormGroup.controls.fechaMatrimonioMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.lugarMatrimonioMadreAbueloPaterno.value.setValue('');

          this.tercerFormGroup.controls.emailMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.fechaDefMadreAbueloPaterno.value    .setValue('');
          this.tercerFormGroup.controls.lugarDefMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.calleNombreMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.calleNroMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.cpMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.localidadMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.provinciaMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.telefonoParticularMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.celularNroMadreAbueloPaterno.value.setValue('');
          this.tercerFormGroup.controls.comentarioMadreAbueloPaterno.value.setValue('');



          this.cuartoFormGroup.controls.apellidoPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.nombrePadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.dniPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.fechaNacPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.lugarNacPadreAbueloMaterno.value.setValue('');

          this.cuartoFormGroup.controls.fechaMatrimonioPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.lugarMatrimonioPadreAbueloMaterno.value.setValue('');


          this.cuartoFormGroup.controls.emailPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.fechaDefPadreAbueloMaterno.value    .setValue('');
          this.cuartoFormGroup.controls.lugarDefPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.calleNombrePadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.calleNroPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.cpPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.localidadPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.provinciaPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.telefonoParticularPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.celularNroPadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.comentarioPadreAbueloMaterno.value.setValue('');




          this.cuartoFormGroup.controls.apellidoMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.nombreMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.dniMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.fechaNacMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.lugarNacMadreAbueloMaterno.value.setValue('');

          this.cuartoFormGroup.controls.fechaMatrimonioMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.lugarMatrimonioMadreAbueloMaterno.value.setValue('');

          this.cuartoFormGroup.controls.emailMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.fechaDefMadreAbueloMaterno.value    .setValue('');
          this.cuartoFormGroup.controls.lugarDefMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.calleNombreMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.calleNroMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.cpMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.localidadMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.provinciaMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.telefonoParticularMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.celularNroMadreAbueloMaterno.value.setValue('');
          this.cuartoFormGroup.controls.comentarioMadreAbueloMaterno.value.setValue('');

          this.submitted = false;
          this.submitted2 = false;
          this.submitted3 = false;
          this.submitted4 = false;

    }




    /**obtenerFormatoFecha(value:string): any
    {

          console.log("obtenerFormatoFecha: "+value);
          const dateParts = value.trim().split('/');
          if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return "";
          } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return "";
          } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2]))
          {
              console.log("dateParts[0]: "+dateParts[0]);
              console.log("dateParts[1]: "+dateParts[1]);
              console.log("dateParts[2]: "+dateParts[2]);
              let day:any   = this.toInteger(dateParts[0]);
              let month:any = this.toInteger(dateParts[1]);
              const year  = this.toInteger(dateParts[2]);

              if (day.length==1)
              {
                 day="0"+day;
              }

              if (month.length==1)
              {
                month="0"+month;
              }
            return year+"-"+month+"-"+day
          };
    }


    isNumber(value: any): boolean
    {
        return !isNaN(this.toInteger(value));
    }

   toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

**/



}
