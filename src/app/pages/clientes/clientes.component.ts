import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Persona} from "../../model/persona";
import {Contacto} from "../../model/contacto";
import {Tiporelacion} from "../../model/tiporelacion";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClienteService} from "../../service/cliente.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {Table} from "primeng/table";
import {FamiliarComponent} from "../familiar/familiar.component";



declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent  {

  title = 'newMat';




  @ViewChild("fileUpload1", { static: false }) fileUpload1!: ElementRef;
  @ViewChild("fileUpload2", { static: false }) fileUpload2!: ElementRef;

  fotoFrente: any;
  fotoPerfil: any;
  imagenFotoFrente!: File;
  imagenFotoDorso!: File;

  selectedFiles1!: FileList;
  selectedFiles2!: FileList;

  files  = [];
  cols: any[]=[];




  selectedContacto: Contacto[]=[];
  nuevoContacto: Contacto=new Contacto();

  //selectedProducts: Producto[];


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


  tipoRelacionLista = ['Hermano1',    'Hermano2',    'Hermano3',    'Hermano4',    'Hermano5',    'Hermano6',    'Hermano7',    'Hermano8',
                      'Primo1',    'Primo2',    'Primo3',    'Primo4',    'Primo5',    'Primo6',    'Primo7',    'Primo8',
                      'Tio1',    'Tio2',    'Tio3',    'Tio4',    'Tio5',    'Tio6',    'Tio7',    'Tio8'];





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


  public familiar!: Contacto[];
  selectedFamiliar: Contacto[]=[];




  constructor(private router: Router,private activatedRoute: ActivatedRoute,private _formBuilder: FormBuilder, private clienteService: ClienteService ) {}

  ngOnInit() {

          /**this.loadScript('./assets/plugins/dropify/dist/js/dropify.min.js');
          const dragAndDrop = $('.dropify').dropify({
            messages: {
              'default': 'Drag and drop a CSV file here or click'
            }
          });
           **/


        this.cols = [
          //{ field: 'id', header: 'id' },
          { field: 'apellido', header: 'Apellido' },
          { field: 'nombre', header: 'Nombre' },
          { field: 'dni', header: 'Dni' },
          { field: 'tipoRel', header: 'Tipo Relacion' }
        ];


          console.log("estoy en init CLIENTE");



          this.firstFormGroup = this._formBuilder.group(
            {
                apellido: ['', Validators.required],
                nombre: ['', Validators.required],
                dni: ['', Validators.required],
                tipoDoc: ['', Validators.required],

                lugarNac: ['', Validators.required],
                fechaNac: ['', Validators.required],


                actaNac: [''],
                nroFolioNac: [''],
                cmbFolioNac:[''],
                nroTomoNac: [''],
                cmbTomoNac:[''],
                ofRegCivilNac: [''],

                ciudadRegCivilNac: [''],
                ProvRegCivilNac: [''],
                PaisRegCivilNac: [''],



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


          this.fotoFrente="./assets/images/no-pictures.png"
          this.fotoPerfil="./assets/images/no-pictures.png"
          ////AGREGO LOS DATOS DEL CLIENTE
          let obj: any;
          obj = localStorage.getItem("cliente");
          if (obj != null)
          {
            this.cargarCliente(obj);
          }



  }




  get f(): { [key: string]: AbstractControl } {
    return this.firstFormGroup.controls;
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





  submit()
  {

          this.submitted4 = true;

          /** if (this.cuartoFormGroup.invalid) {

            return;
          }**/
          console.log(this.firstFormGroup.value);
          console.log(this.secondFormGroup.value);
          console.log(this.tercerFormGroup.value);
          console.log(this.cuartoFormGroup.value);

          console.log("****************DATOS DEL CLIENTE****************");
          console.log("apellido: "+this.firstFormGroup.controls.apellido.value);
          console.log("nombre: "+this.firstFormGroup.controls.nombre.value);
          console.log("dni: "+this.firstFormGroup.controls.dni.value);
          console.log("tipoDoc: "+this.firstFormGroup.controls.tipoDoc.value);
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


          let dioError = false;
          this.clienteService.upload(this.selectedFiles1[0],
            this.selectedFiles2[0],
            this.cliente,
            this.padre,
            this.madre,
            this.padreAbueloPaterno,
            this.madreAbueloPaterno,
            this.padreAbueloMaterno,
            this.madreAbueloMaterno) .subscribe(
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
              this.reset();

            }

          );

  }



  selectFiles1(e: any) {

    const file = e.target.files[0];
    this.selectedFiles1=e.target.files;


    this.fileUpload1 =e.target.value;


    console.log("RUTA DE LA IMAGEN DE FRENTE: "+this.fileUpload1);
    localStorage.setItem("rutaImgFotoFrente",JSON.stringify(this.fileUpload1));



  }

  selectFiles2(e: any) {
    this.selectedFiles2=e.target.files;
    const file = e.target.files[0];

    /**const reader = new FileReader();
    reader.onload = e => this.fotoFrente = reader.result;
    reader.readAsDataURL(file);**/

    //localStorage.imageDorso(event.target.files[0]);

    this.fileUpload2 =e.target.value;

    console.log("GUARDO LA RUTA DE LA IMAGEN DE DORSO: "+this.fileUpload2);
    localStorage.setItem("rutaImgFotoDorso",JSON.stringify(this.fileUpload2))
    //localStorage.setItem("rutaImgFotoDorso",file);

  }









  reset()
  {
    //this.firstFormGroup.controls.fechaMatrimonio.setValue('');
    this.firstFormGroup.controls.apellido.setValue('');
    this.firstFormGroup.controls.nombre.setValue('');
    this.firstFormGroup.controls.dni.setValue('');
    this.firstFormGroup.controls.tipoDoc.setValue('');
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

    this.firstFormGroup.controls.fechaNacDesde.setValue('');
    this.firstFormGroup.controls.fechaNacHasta.setValue('');
    this.firstFormGroup.controls.actaNac.setValue('');
    this.firstFormGroup.controls.nroFolioNac.setValue('');
    this.firstFormGroup.controls.cmbFolioNac.setValue('');
    this.firstFormGroup.controls.nroTomoNac.setValue('');
    this.firstFormGroup.controls.cmbTomoNac.setValue('');
    this.firstFormGroup.controls.ofRegCivilNac.setValue('');
    this.firstFormGroup.controls.ciudadRegCivilNac.setValue('');
    this.firstFormGroup.controls.ProvRegCivilNac.setValue('');
    this.firstFormGroup.controls.ciudadRegCivilNac.setValue('');
    this.firstFormGroup.controls.PaisRegCivilNac.setValue('');








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


/**
  nuevoFamiliar()
  {


    this.cliente = new Persona();
    this.cliente.apellido = this.firstFormGroup.controls.apellido.value
    this.cliente.nombre = this.firstFormGroup.controls.nombre.value
    this.cliente.dni = this.firstFormGroup.controls.dni.value
    this.cliente.lugarNac = this.firstFormGroup.controls.lugarNac.value
    this.cliente.fechaNac = this.firstFormGroup.controls.fechaNac.value;


    this.cliente.actaNac = this.firstFormGroup.controls.actaNac.value;
    this.cliente.nroFolioNac = this.firstFormGroup.controls.nroFolioNac.value;
    this.cliente.nroTomoNac = this.firstFormGroup.controls.nroTomoNac.value;
    this.cliente.ofRegCivilNac = this.firstFormGroup.controls.ofRegCivilNac.value;
    this.cliente.ciudadRegCivilNac = this.firstFormGroup.controls.ciudadRegCivilNac.value;
    this.cliente.ProvRegCivilNac = this.firstFormGroup.controls.ProvRegCivilNac.value;
    this.cliente.PaisRegCivilNac = this.firstFormGroup.controls.PaisRegCivilNac.value;


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
    //this.cliente.fechaMatrimonio = this.obtenerFormatoFecha(this.clienteForm.controls.fechaMatrimonio.value);
    this.cliente.fechaMatrimonio = this.firstFormGroup.controls.fechaMatrimonio.value;

    this.cliente.lugarMatrimonio = this.firstFormGroup.controls.lugarMatrimonio.value


    localStorage.setItem("cliente", JSON.stringify(this.cliente));

    console.log("presiono nuevoFamiliar");
    localStorage.removeItem("nuevoContacto");
    this.router.navigateByUrl('familiar/nuevo');
  }

**/



  cargarCliente(obj:any)
  {
        let anio,mes,dia;
        let jsonObj: any;
        jsonObj = JSON.parse(obj); // string to generic object first
        this.cliente = (<Persona>jsonObj);
        console.log("%%%%%%%%%% CARGO LOS DATOS DEL TITULAR%%%%%%%%");


        console.log("apellidoooo clienteeeeeee "+this.cliente.apellido);

        this.firstFormGroup.controls.apellido.setValue(this.cliente.apellido);

        console.log("nombre: "+this.cliente.nombre);
        this.firstFormGroup.controls.nombre.setValue(this.cliente.nombre);

        console.log("tipoDoc: "+this.cliente.tipoDoc);
        this.firstFormGroup.controls.tipoDoc.setValue(this.cliente.tipoDoc);

        console.log("dni: "+this.cliente.dni);
        this.firstFormGroup.controls.dni.setValue(this.cliente.dni);

        console.log("email: "+this.cliente.email);
        this.firstFormGroup.controls.email.setValue(this.cliente.email);


        console.log('FECHA NAC: '+this.cliente.fechaNac);

        if (this.cliente.fechaNac != null)
        {
                anio = this.cliente.fechaNac.toString().substr(0,4);
                mes = this.cliente.fechaNac.toString().substr(5,2);

                dia  = this.cliente.fechaNac.toString().substr(8,2);

                console.log('ANIO: '+anio);
                console.log('MES: '+mes);
                console.log('DIA: '+dia);

                //new Date()
                this.firstFormGroup.controls.fechaNac.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
        }
         this.firstFormGroup.controls.lugarNac.setValue(this.cliente.lugarNac);

        this.firstFormGroup.controls.actaNac.setValue(this.cliente.actaNac);
        this.firstFormGroup.controls.nroFolioNac.setValue(this.cliente.nroFolioNac);
         this.firstFormGroup.controls.cmbFolioNac.setValue(this.cliente.cmbFolioNac);
        this.firstFormGroup.controls.nroTomoNac.setValue(this.cliente.nroTomoNac);
        this.firstFormGroup.controls.cmbTomoNac.setValue(this.cliente.cmbTomoNac);
        this.firstFormGroup.controls.ofRegCivilNac.setValue(this.cliente.ofRegCivilNac);
        this.firstFormGroup.controls.ciudadRegCivilNac.setValue(this.cliente.ciudadRegCivilNac);
        this.firstFormGroup.controls.ProvRegCivilNac.setValue(this.cliente.provRegCivilNac);
        this.firstFormGroup.controls.PaisRegCivilNac.setValue(this.cliente.paisRegCivilNac);

        this.firstFormGroup.controls.calleNombre.setValue(this.cliente.calleNombre);
        this.firstFormGroup.controls.calleNro.setValue(this.cliente.calleNro);
        this.firstFormGroup.controls.cp.setValue(this.cliente.cp);
        this.firstFormGroup.controls.localidad.setValue(this.cliente.localidad);
        this.firstFormGroup.controls.provincia.setValue(this.cliente.provincia);
        this.firstFormGroup.controls.telefonoParticular.setValue(this.cliente.telefonoParticular);
        this.firstFormGroup.controls.celularNro.setValue(this.cliente.celularNro);
        this.firstFormGroup.controls.estadocivil.setValue(this.cliente.estadocivil);

        console.log('FECHA MATRIMONIO: '+this.cliente.fechaMatrimonio);
        if (!this.isUndefinedOrNull(this.cliente.fechaMatrimonio))
        {
          this.mostrarCamposMatrimonio = true;
          anio = this.cliente.fechaNac.toString().substr(0,4);
          mes = this.cliente.fechaNac.toString().substr(5,2);
          dia  = this.cliente.fechaNac.toString().substr(8,2);
          this.firstFormGroup.controls.fechaMatrimonio.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
        }
        this.firstFormGroup.controls.lugarMatrimonio.setValue(this.cliente.lugarMatrimonio);



        if (localStorage.theImageFotoFrente != null)
        {
              var dataImage = localStorage.theImageFotoFrente;
              this.fotoFrente =dataImage;
        }



        if (localStorage.theImageFotoPerfil != null)
        {
              var dataImage = localStorage.theImageFotoPerfil;
              this.fotoPerfil =dataImage;
        }

        this.cargarTabla();


  }



   cargarTabla()
   {
         let obj: any;
         let jsonObj: any;
         this.familiar=[];

         console.log("ESTOY EN CARGAR TABLA");
         for (let i = 0; i < this.tipoRelacionLista.length; i++)
         {
                 console.log("RELACION: "+this.tipoRelacionLista[i]);
                 obj = localStorage.getItem(this.tipoRelacionLista[i]);
                 if (obj != null)
                 {
                        jsonObj = JSON.parse(obj); // string to generic object first
                        let contacto = (<Contacto>jsonObj);
                        this.familiar.push(contacto);
                 }
         }

   }



  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }



  // @ts-ignore
  isUndefinedOrNull(val:any):boolean | undefined
  {
    console.log("isUndefinedOrNull: "+val);
    if (val === "" || val == 'null' || val === null || val === "undefined") {
      console.log("entro");
      return true;
    }
  }



  guardar()
  {
        this.cliente = new Persona();
        this.cliente.apellido = this.firstFormGroup.controls.apellido.value
        this.cliente.nombre = this.firstFormGroup.controls.nombre.value
        this.cliente.tipoDoc = this.firstFormGroup.controls.tipoDoc.value
        this.cliente.dni = this.firstFormGroup.controls.dni.value
        this.cliente.lugarNac = this.firstFormGroup.controls.lugarNac.value
        //this.cliente.fechaNac = this.obtenerFormatoFecha(this.clienteForm.controls.fechaNac.value);
        this.cliente.fechaNac = this.firstFormGroup.controls.fechaNac.value;
        this.cliente.email = this.firstFormGroup.controls.email.value
        this.cliente.calleNombre = this.firstFormGroup.controls.calleNombre.value
        this.cliente.calleNro = this.firstFormGroup.controls.calleNro.value
        this.cliente.cp = this.firstFormGroup.controls.cp.value
        this.cliente.localidad = this.firstFormGroup.controls.localidad.value
        this.cliente.provincia = this.firstFormGroup.controls.provincia.value
        this.cliente.telefonoParticular = this.firstFormGroup.controls.telefonoParticular.value
        this.cliente.celularNro = this.firstFormGroup.controls.celularNro.value

        this.cliente.idfotoFrente = this.firstFormGroup.controls.idfotoFrente.value
        this.cliente.idfotoDorso = this.firstFormGroup.controls.idfotoDorso.value
        this.cliente.estadocivil = this.firstFormGroup.controls.estadocivil.value
        //this.cliente.fechaMatrimonio = this.obtenerFormatoFecha(this.clienteForm.controls.fechaMatrimonio.value);
        this.cliente.fechaMatrimonio = this.firstFormGroup.controls.fechaMatrimonio.value;
        this.cliente.lugarMatrimonio = this.firstFormGroup.controls.lugarMatrimonio.value

        this.cliente.actaNac = this.firstFormGroup.controls.actaNac.value
        this.cliente.nroFolioNac = this.firstFormGroup.controls.nroFolioNac.value
        this.cliente.cmbFolioNac = this.firstFormGroup.controls.cmbFolioNac.value
        this.cliente.nroTomoNac = this.firstFormGroup.controls.nroTomoNac.value
        this.cliente.cmbTomoNac = this.firstFormGroup.controls.cmbTomoNac.value
        this.cliente.ofRegCivilNac = this.firstFormGroup.controls.ofRegCivilNac.value
        this.cliente.ciudadRegCivilNac = this.firstFormGroup.controls.ciudadRegCivilNac.value
        this.cliente.provRegCivilNac = this.firstFormGroup.controls.ProvRegCivilNac.value
        this.cliente.paisRegCivilNac = this.firstFormGroup.controls.PaisRegCivilNac.value
        localStorage.setItem("cliente", JSON.stringify(this.cliente));


        var dataImageFrente = this.fotoFrente;
        localStorage.theImageFotoFrente = dataImageFrente;

        var dataImagePerfil = this.fotoPerfil;
        localStorage.theImageFotoPerfil = dataImagePerfil;


        this.router.navigateByUrl('Formulario');




    /**
     actaNac: number=0;
     nroFolioNac: number=0;
     nroTomoNac: number=0;

     ofRegCivilNac: string="";
     ciudadRegCivilNac: string="";
     ProvRegCivilNac: string="";
     PaisRegCivilNac: string="";
     */








  }





  regresar()
  {
    this.router.navigateByUrl('Formulario');
  }


  eliminar()
  {

    Swal.fire({
      title: '¿Borrar Datos del Cliente?',
      text: `Esta a punto de borrar todos los datos cargados`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        //localStorage.setItem("key_"+cont, JSON.stringify(this.nuevoContacto));
        localStorage.removeItem("cliente");
        localStorage.removeItem("theImageFotoFrente");
        localStorage.removeItem("theImageFotoPerfil");

        Swal.fire(
          'Cliente borrado',
          `Se eliminaron todos los datos cargados`,
          'success'
        );


        this.router.navigateByUrl('Formulario');
      }
    })
  }









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







  nuevoFamiliar()
  {
    this.router.navigateByUrl('OtroFamiliar/Nuevo');
  }

  editarFamiliar(familiar:Contacto)
  {
        this.router.navigateByUrl('OtroFamiliar/'+familiar.tipoRelacion.descripcion);
  }


  borrarFamiliar(familiar:Contacto)
  {
                let apellido= familiar.apellido+" "+familiar.nombre;
                console.log("estoy en borrar Contacto "+familiar.id);
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
                    localStorage.removeItem(familiar.tipoRelacion.descripcion);
                    this.cargarTabla();


                    Swal.fire(
                      'Familiar borrado',
                      `${ apellido } fue eliminado correctamente`,
                      'success'
                    );
                  }
                })
  }






}
