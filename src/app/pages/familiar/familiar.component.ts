import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Contacto} from "../../model/contacto";
import {Tiporelacion} from "../../model/tiporelacion";
import {Persona} from "../../model/persona";
import Swal from "sweetalert2";

@Component({
  selector: 'app-familiar',
  templateUrl: './familiar.component.html'
})
export class FamiliarComponent implements OnInit {

  secondFormGroup!: FormGroup;
  submitted2 = false;
  contacto!: Contacto;

  titulo:string="";

  tipoRelacion!: Tiporelacion;


  estadoCivil = [
    {valor:'Soltero', muestraValor:'Soltero'},
    {valor:'Casado', muestraValor:'Casado'},
    {valor:'Divorciado', muestraValor:'Divorciado'},
    {valor:'Viudo', muestraValor:'Viudo'}
  ];
  seleccionada: string = this.estadoCivil[0].valor;






  constructor(private activatedRoute: ActivatedRoute,private router: Router,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
          apellidoContacto: ['', Validators.required],
          nombreContacto: ['', Validators.required],
          tipoDocContacto: [''],
          dniContacto: [''],
          emailContacto: [''],

          fechaNacContacto: [''],

          fechaNacDesdeContacto: [''],
          fechaNacHastaContacto: [''],

          lugarNacContacto: [''],



          fechaMatrimonioContacto: [''],
          fechaMatDesdeContacto: [''],
          fechaMatHastaContacto: [''],
          lugarMatrimonioContacto: [''],

          fechaDefContacto: [''],
          fechaDefDesdeContacto: [''],
          fechaDefHastaContacto: [''],
          lugarDefContacto: [''],

          calleNombreContacto: [''],
          calleNroContacto: [''],
          cpContacto: [''],
          localidadContacto: [''],
          provinciaContacto: [''],

          telefonoParticularContacto: [''],
          celularNroContacto: [''],
          comentarioContacto: [''],


          actaNacContacto: [''],
          nroFolioNacContacto: [''],
          cmbFolioNacContacto: [''],
          nroTomoNacContacto: [''],
          cmbTomoNacContacto: [''],
          ofRegCivilNacContacto: [''],
          ciudadRegCivilNacContacto: [''],
          ProvRegCivilNacContacto: [''],
          PaisRegCivilNacContacto: [''],


          actaMatContacto: [''],
          nroFolioMatContacto: [''],
          cmbFolioMatContacto: [''],
          nroTomoMatContacto: [''],
          cmbTomoMatContacto: [''],
          ofRegCivilMatContacto: [''],
          ciudadRegCivilMatContacto: [''],
          ProvRegCivilMatContacto: [''],
          PaisRegCivilMatContacto: [''],

          actaDefContacto: [''],
          nroFolioDefContacto: [''],
          cmbFolioDefContacto: [''],
          nroTomoDefContacto: [''],
          cmbTomoDefContacto: [''],
          ofRegCivilDefContacto: [''],
          ciudadRegCivilDefContacto: [''],
          ProvRegCivilDefContacto: [''],
          PaisRegCivilDefContacto: [''],



        });


      this.activatedRoute.params.subscribe( ({ id }) => this.cargarDatos( id ) );

  }



  get f(): { [key: string]: AbstractControl } {
    return this.secondFormGroup.controls;
  }



  regresar()
  {
        this.router.navigateByUrl('Formulario');
  }




  guardar()
  {
        this.submitted2 = true;

        if (this.secondFormGroup.invalid) {
          return;
        }

        console.log(this.secondFormGroup.value);

        /**console.log("****************DATOS DEL CLIENTE****************");
        console.log("apellido: " + this.secondFormGroup.controls.apellidoContacto.value);
        console.log("nombre: " + this.secondFormGroup.controls.nombreContacto.value);
        console.log("dni: " + this.secondFormGroup.controls.dniContacto.value);
        console.log("Email: " + this.secondFormGroup.controls.emailContacto.value);

        console.log("fechaNacContacto: " + this.secondFormGroup.controls.fechaNacContacto.value);

        console.log("lugarNacContacto: " + this.secondFormGroup.controls.lugarNacContacto.value);
        console.log("fechaMatrimonioContacto: " + this.secondFormGroup.controls.fechaMatrimonioContacto.value);
        console.log("lugarMatrimonioContacto: " + this.secondFormGroup.controls.lugarMatrimonioContacto.value);
        console.log("fechaDefContacto: " + this.secondFormGroup.controls.fechaDefContacto.value);
        console.log("lugarDefContacto: " + this.secondFormGroup.controls.lugarDefContacto.value);

        console.log("calleNombreContacto: " + this.secondFormGroup.controls.calleNombreContacto.value);
        console.log("calleNroContacto: " + this.secondFormGroup.controls.calleNroContacto.value);
        console.log("cpContacto: " + this.secondFormGroup.controls.cpContacto.value);
        console.log("localidadContacto: " + this.secondFormGroup.controls.localidadContacto.value);

        console.log("localidadContacto: " + this.secondFormGroup.controls.localidadContacto.value);
        console.log("provinciaContacto: " + this.secondFormGroup.controls.provinciaContacto.value);
        console.log("telefonoParticularContacto: " + this.secondFormGroup.controls.telefonoParticularContacto.value);
        console.log("celularNroContacto: " + this.secondFormGroup.controls.celularNroContacto.value);
        console.log("comentarioContacto: " + this.secondFormGroup.controls.comentarioContacto.value);**/
        this.contacto = new Contacto();
        this.contacto.apellido = this.secondFormGroup.controls.apellidoContacto.value;
        this.contacto.nombre = this.secondFormGroup.controls.nombreContacto.value;
        this.contacto.dni = this.secondFormGroup.controls.dniContacto.value;
        this.contacto.tipoDoc = this.secondFormGroup.controls.tipoDocContacto.value;
        this.contacto.email = this.secondFormGroup.controls.emailContacto.value;
        this.contacto.fechaNac = this.secondFormGroup.controls.fechaNacContacto.value;
        this.contacto.lugarNac = this.secondFormGroup.controls.lugarNacContacto.value;

        this.contacto.fechaNacDesde = this.secondFormGroup.controls.fechaNacDesdeContacto.value;
        this.contacto.fechaNacHasta = this.secondFormGroup.controls.fechaNacHastaContacto.value;

        this.contacto.actaNac = this.secondFormGroup.controls.actaNacContacto.value;
        this.contacto.nroFolioNac = this.secondFormGroup.controls.nroFolioNacContacto.value;
         this.contacto.cmbFolioNac = this.secondFormGroup.controls.cmbFolioNacContacto.value;
        this.contacto.nroTomoNac = this.secondFormGroup.controls.nroTomoNacContacto.value;
    this.contacto.cmbTomoNac = this.secondFormGroup.controls.cmbTomoNacContacto.value;
        this.contacto.ofRegCivilNac = this.secondFormGroup.controls.ofRegCivilNacContacto.value;
        this.contacto.ciudadRegCivilNac = this.secondFormGroup.controls.ciudadRegCivilNacContacto.value;
        this.contacto.provRegCivilNac = this.secondFormGroup.controls.ProvRegCivilNacContacto.value;
        this.contacto.paisRegCivilNac = this.secondFormGroup.controls.PaisRegCivilNacContacto.value;



        this.contacto.fechaMatrimonio = this.secondFormGroup.controls.fechaMatrimonioContacto.value;
        this.contacto.lugarMatrimonio = this.secondFormGroup.controls.lugarMatrimonioContacto.value;
        this.contacto.fechaMatDesde = this.secondFormGroup.controls.fechaMatDesdeContacto.value;
        this.contacto.fechaMatHasta = this.secondFormGroup.controls.fechaMatHastaContacto.value;
        this.contacto.actaMat = this.secondFormGroup.controls.actaMatContacto.value;
        this.contacto.nroFolioMat = this.secondFormGroup.controls.nroFolioMatContacto.value;
        this.contacto.cmbFolioMat = this.secondFormGroup.controls.cmbFolioMatContacto.value;
        this.contacto.nroTomoMat = this.secondFormGroup.controls.nroTomoMatContacto.value;
    this.contacto.cmbTomoMat = this.secondFormGroup.controls.cmbTomoMatContacto.value;
        this.contacto.ofRegCivilMat = this.secondFormGroup.controls.ofRegCivilMatContacto.value;
        this.contacto.ciudadRegCivilMat = this.secondFormGroup.controls.ciudadRegCivilMatContacto.value;
        this.contacto.provRegCivilMat = this.secondFormGroup.controls.ProvRegCivilMatContacto.value;
        this.contacto.paisRegCivilMat = this.secondFormGroup.controls.PaisRegCivilMatContacto.value;







        this.contacto.fechaDefuncion = this.secondFormGroup.controls.fechaDefContacto.value;
        this.contacto.lugarDefuncion = this.secondFormGroup.controls.lugarDefContacto.value;
        this.contacto.fechaDefDesde = this.secondFormGroup.controls.fechaDefDesdeContacto.value;
        this.contacto.fechaDefHasta = this.secondFormGroup.controls.fechaDefHastaContacto.value;
        this.contacto.actaDef = this.secondFormGroup.controls.actaDefContacto.value;
        this.contacto.nroFolioDef = this.secondFormGroup.controls.nroFolioDefContacto.value;
        this.contacto.cmbFolioDef = this.secondFormGroup.controls.cmbFolioDefContacto.value;
        this.contacto.nroTomoDef = this.secondFormGroup.controls.nroTomoDefContacto.value;
    this.contacto.cmbTomoDef = this.secondFormGroup.controls.cmbTomoDefContacto.value;
        this.contacto.ofRegCivilDef = this.secondFormGroup.controls.ofRegCivilDefContacto.value;
        this.contacto.ciudadRegCivilDef = this.secondFormGroup.controls.ciudadRegCivilDefContacto.value;
        this.contacto.provRegCivilDef = this.secondFormGroup.controls.ProvRegCivilDefContacto.value;
        this.contacto.paisRegCivilDef = this.secondFormGroup.controls.PaisRegCivilDefContacto.value;



        this.contacto.calleNombre = this.secondFormGroup.controls.calleNombreContacto.value;
        this.contacto.calleNro = this.secondFormGroup.controls.calleNroContacto.value;
        this.contacto.cp = this.secondFormGroup.controls.cpContacto.value;
        this.contacto.localidad = this.secondFormGroup.controls.localidadContacto.value;
        this.contacto.provincia = this.secondFormGroup.controls.provinciaContacto.value;
        this.contacto.telefonoParticular = this.secondFormGroup.controls.telefonoParticularContacto.value;
        this.contacto.celularNro = this.secondFormGroup.controls.celularNroContacto.value;
        this.contacto.observacion = this.secondFormGroup.controls.comentarioContacto.value;




        ///m1.tipoRelacion = rel1;
        this.contacto.tipoRelacion = this.tipoRelacion;
        localStorage.setItem(this.tipoRelacion.descripcion, JSON.stringify(this.contacto));
        //this.router.navigate(['formulario'], {queryParams: {contacto: this.contacto}});
        this.router.navigateByUrl('Formulario');
  }





  cargarDatos(id: any) {
    console.log("ESTOY EN cargarDatos:: " + id);
    let obj: any;
    let jsonObj: any;
    switch (id)
    {
          case "Padre":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 1;
                        this.tipoRelacion.descripcion = "Padre";
                        this.titulo = " - Padre";
                        obj = localStorage.getItem("Padre");
                        break;

          case "Madre":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 2;
                        this.tipoRelacion.descripcion = "Madre";
                        this.titulo = " - Madre";

                        obj = localStorage.getItem("Madre");
                        break;

      case  "AbueloPaterno":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 3;
                        this.tipoRelacion.descripcion = "AbueloPaterno";
                        obj = localStorage.getItem("AbueloPaterno");
                        this.titulo = " - AbueloPaterno";
                        break;


      case  "AbuelaPaterna":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 4;
                        this.tipoRelacion.descripcion = "AbuelaPaterna";
                        obj = localStorage.getItem("AbuelaPaterna");
                        this.titulo = " - AbuelaPaterna";
                        break;



      case  "AbueloMaterna":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id =5;
                        this.tipoRelacion.descripcion = "AbueloMaterna";
                        obj = localStorage.getItem("AbueloMaterna");
                        this.titulo = " - AbueloMaterna";
                        break;


      case  "AbuelaMaterna":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 6;
                        this.tipoRelacion.descripcion = "AbuelaMaterna";
                        obj = localStorage.getItem("AbuelaMaterna");
                        this.titulo = " - AbuelaMaterna";
                        break;

      case  "BisabueloPat1":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 7;
                        this.tipoRelacion.descripcion = "BisabueloPat1";
                        obj = localStorage.getItem("BisabueloPat1");
                        this.titulo = " - BisabueloPat1";
                        break;


      case  "BisabueloPat2":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 8;
                        this.tipoRelacion.descripcion = "BisabueloPat2";
                        obj = localStorage.getItem("BisabueloPat2");
                        this.titulo = " - BisabueloPat2";
                        break;

      case  "BisabueloPat3":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 9;
                        this.tipoRelacion.descripcion = "BisabueloPat3";
                        obj = localStorage.getItem("BisabueloPat4");
                        this.titulo = " - BisabueloPat3";
                        break;

      case  "BisabueloPat4":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 10;
                        this.tipoRelacion.descripcion = "BisabueloPat4";
                        obj = localStorage.getItem("BisabueloPat4");
                        this.titulo = " - BisabueloPat4";
                        break;



      case  "BisabueloMat1":
                          this.tipoRelacion = new Tiporelacion();
                          this.tipoRelacion.id = 11;
                          this.tipoRelacion.descripcion = "BisabueloMat1";
                          obj = localStorage.getItem("BisabueloMat1");
                          this.titulo = " - BisabueloMat1";
                          break;


      case  "BisabueloMat2":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 12;
                        this.tipoRelacion.descripcion = "BisabueloMat2";
                        obj = localStorage.getItem("BisabueloMat2");
                        this.titulo = " - BisabueloMat2";
                        break;

      case  "BisabueloMat3":
                        this.tipoRelacion = new Tiporelacion();
                        this.tipoRelacion.id = 13;
                        this.tipoRelacion.descripcion = "BisabueloMat3";
                        obj = localStorage.getItem("BisabueloMat3");
                        this.titulo = " - BisabueloMat3";
                        break;

      case  "BisabueloMat4":
                      this.tipoRelacion = new Tiporelacion();
                      this.tipoRelacion.id = 14;
                      this.tipoRelacion.descripcion = "BisabueloMat4";
                      obj = localStorage.getItem("BisabueloMat4");
                      this.titulo = " - BisabueloMat4";
                      break;

      case  "TatarabueloPat1":
                      this.tipoRelacion = new Tiporelacion();
                      this.tipoRelacion.id = 15;
                      this.tipoRelacion.descripcion = "TatarabueloPat1";
                      obj = localStorage.getItem("TatarabueloPat1");
                      this.titulo = " - TatarabueloPat1";
                      break;

      case  "TatarabueloPat2":
                      this.tipoRelacion = new Tiporelacion();
                      this.tipoRelacion.id = 16;
                      this.tipoRelacion.descripcion = "TatarabueloPat2";
                      obj = localStorage.getItem("TatarabueloPat2");
                      this.titulo = " - TatarabueloPat2";
                      break;

      case  "TatarabueloPat3":
                      this.tipoRelacion = new Tiporelacion();
                      this.tipoRelacion.id = 17;
                      this.tipoRelacion.descripcion = "TatarabueloPat3";
                      obj = localStorage.getItem("TatarabueloPat3");
                      this.titulo = " - TatarabueloPat3";
                      break;

      case  "TatarabueloPat4":
                      this.tipoRelacion = new Tiporelacion();
                      this.tipoRelacion.id = 18;
                      this.tipoRelacion.descripcion = "TatarabueloPat4";
                      obj = localStorage.getItem("TatarabueloPat4");
                      this.titulo = " - TatarabueloPat4";
                      break;

      case  "TatarabueloPat5":
                      this.tipoRelacion = new Tiporelacion();
                      this.tipoRelacion.id = 19;
                      this.tipoRelacion.descripcion = "TatarabueloPat5";
                      obj = localStorage.getItem("TatarabueloPat5");
                      this.titulo = " - TatarabueloPat5";
                      break;

      case  "TatarabueloPat6":
                    this.tipoRelacion = new Tiporelacion();
                    this.tipoRelacion.id = 20;
                    this.tipoRelacion.descripcion = "TatarabueloPat6";
                    obj = localStorage.getItem("TatarabueloPat6");
                    this.titulo = " - TatarabueloPat6";
                    break;

      case  "TatarabueloPat7":
                    this.tipoRelacion = new Tiporelacion();
                    this.tipoRelacion.id = 21;
                    this.tipoRelacion.descripcion = "TatarabueloPat7";
                    obj = localStorage.getItem("TatarabueloPat7");
                    this.titulo = " - TatarabueloPat7";
                    break;

      case  "TatarabueloPat8":
                    this.tipoRelacion = new Tiporelacion();
                    this.tipoRelacion.id = 22;
                    this.tipoRelacion.descripcion = "TatarabueloPat8";
                    obj = localStorage.getItem("TatarabueloPat8");
                    this.titulo = " - TatarabueloPat8";
                    break;

      ////////////////////////TARABUELAMAT1
          case  "TatarabueloMat1":
            this.tipoRelacion = new Tiporelacion();
            this.tipoRelacion.id = 23;
            this.tipoRelacion.descripcion = "TatarabueloMat1";
            obj = localStorage.getItem("TatarabueloMat1");
            this.titulo = " - TatarabueloMat1";
            break;

      case  "TatarabueloMat2":
            this.tipoRelacion = new Tiporelacion();
            this.tipoRelacion.id = 24;
            this.tipoRelacion.descripcion = "TatarabueloMat2";
            obj = localStorage.getItem("TatarabueloMat2");
            this.titulo = " - TatarabueloMat2";
            break;

      case  "TatarabueloMat3":
            this.tipoRelacion = new Tiporelacion();
            this.tipoRelacion.id = 25;
            this.tipoRelacion.descripcion = "TatarabueloMat3";
            obj = localStorage.getItem("TatarabueloMat3");
            this.titulo = " - TatarabueloMat3";
            break;

      case  "TatarabueloMat4":
            this.tipoRelacion = new Tiporelacion();
            this.tipoRelacion.id = 26;
            this.tipoRelacion.descripcion = "TatarabueloMat4";
            obj = localStorage.getItem("TatarabueloMat4");
            this.titulo = " - TatarabueloMat4";
            break;

      case  "TatarabueloMat5":
            this.tipoRelacion = new Tiporelacion();
            this.tipoRelacion.id = 27;
            this.tipoRelacion.descripcion = "TatarabueloMat5";
            obj = localStorage.getItem("TatarabueloMat5");
            this.titulo = " - TatarabueloMat5";
            break;

      case  "TatarabueloMat6":
            this.tipoRelacion = new Tiporelacion();
            this.tipoRelacion.id = 28;
            this.tipoRelacion.descripcion = "TatarabueloMat6";
            obj = localStorage.getItem("TatarabueloMat6");
            this.titulo = " - TatarabueloMat6";
            break;

      case  "TatarabueloMat7":
              this.tipoRelacion = new Tiporelacion();
              this.tipoRelacion.id = 29;
              this.tipoRelacion.descripcion = "TatarabueloMat7";
              obj = localStorage.getItem("TatarabueloMat7");
              this.titulo = " - TatarabueloMat7";
              break;

      case  "TatarabueloMat8":
              this.tipoRelacion = new Tiporelacion();
              this.tipoRelacion.id = 30;
              this.tipoRelacion.descripcion = "TatarabueloMat8";
              obj = localStorage.getItem("TatarabueloMat8");
              this.titulo = " - TatarabueloMat8";
              break;

    }

    let anio,mes,dia;
    if (obj != null)
    {
            jsonObj = JSON.parse(obj); // string to generic object first
            this.contacto = (<Contacto>jsonObj);
            console.log("%%%%%%%%%% CARGO LOS DATOS DEL CONTACTO%%%%%%%%");
            console.log(jsonObj);
            this.secondFormGroup.controls.apellidoContacto.setValue(this.contacto.apellido);
            this.secondFormGroup.controls.nombreContacto.setValue(this.contacto.nombre);

            this.secondFormGroup.controls.tipoDocContacto.setValue(this.contacto.tipoDoc);
            this.secondFormGroup.controls.dniContacto.setValue(this.contacto.dni);
            this.secondFormGroup.controls.emailContacto.setValue(this.contacto.email);
            this.secondFormGroup.controls.lugarNacContacto.setValue(this.contacto.lugarNac);


            console.log('FECHA NAC: '+this.contacto.fechaNac);
            //if (this.contacto.fechaNac != null)
            if (!this.isUndefinedOrNull(this.contacto.fechaNac))
            {
              anio = this.contacto.fechaNac.toString().substr(0,4);
              mes = this.contacto.fechaNac.toString().substr(5,2);
              dia  = this.contacto.fechaNac.toString().substr(8,2);
              console.log('ANIO: '+anio);
              console.log('MES: '+mes);
              console.log('DIA: '+dia);
              this.secondFormGroup.controls.fechaNacContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }

            console.log('FECHA NAC DESDE: '+this.contacto.fechaNacDesde);
            //if ((this.contacto.fechaNacDesde.toString().length > 0) && (this.contacto.fechaNacDesde != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaNacDesde))
            {
                  anio = this.contacto.fechaNacDesde.toString().substr(0,4);
                  mes = this.contacto.fechaNacDesde.toString().substr(5,2);
                  dia  = this.contacto.fechaNacDesde.toString().substr(8,2);
                  console.log('ANIO: '+anio);
                  console.log('MES: '+mes);
                  console.log('DIA: '+dia);
                  this.secondFormGroup.controls.fechaNacDesdeContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }

            console.log('FECHA NAC HASTA: '+this.contacto.fechaNacHasta);
            //if ((this.contacto.fechaNacHasta.toString().length > 0) && (this.contacto.fechaNacHasta != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaNacHasta))
            {
                  anio = this.contacto.fechaNacHasta.toString().substr(0,4);
                  mes = this.contacto.fechaNacHasta.toString().substr(5,2);
                  dia  = this.contacto.fechaNacHasta.toString().substr(8,2);
                  console.log('ANIO: '+anio);
                  console.log('MES: '+mes);
                  console.log('DIA: '+dia);
                  this.secondFormGroup.controls.fechaNacHastaContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }
            this.secondFormGroup.controls.actaNacContacto.setValue(this.contacto.actaNac);
            this.secondFormGroup.controls.nroFolioNacContacto.setValue(this.contacto.nroFolioNac);
            this.secondFormGroup.controls.cmbFolioNacContacto.setValue(this.contacto.cmbFolioNac);
            this.secondFormGroup.controls.nroTomoNacContacto.setValue(this.contacto.nroTomoNac);
      this.secondFormGroup.controls.cmbTomoNacContacto.setValue(this.contacto.cmbTomoNac);
            this.secondFormGroup.controls.ofRegCivilNacContacto.setValue(this.contacto.ofRegCivilNac);
            this.secondFormGroup.controls.ciudadRegCivilNacContacto.setValue(this.contacto.ciudadRegCivilNac);
            this.secondFormGroup.controls.ProvRegCivilNacContacto.setValue(this.contacto.provRegCivilNac);
            this.secondFormGroup.controls.PaisRegCivilNacContacto.setValue(this.contacto.paisRegCivilNac);



            //if ((this.contacto.fechaMatrimonio.toString().length > 0) && (this.contacto.fechaMatrimonio != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaMatrimonio))
            {
                  anio = this.contacto.fechaMatrimonio.toString().substr(0,4);
                  mes = this.contacto.fechaMatrimonio.toString().substr(5,2);
                  dia  = this.contacto.fechaMatrimonio.toString().substr(8,2);
                  console.log('ANIO: '+anio);
                  console.log('MES: '+mes);
                  console.log('DIA: '+dia);
                  console.log('fechaMatrimonio: '+dia+"/"+mes+"/"+anio);
                  this.secondFormGroup.controls.fechaMatrimonioContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
                  this.secondFormGroup.controls.lugarMatrimonioContacto.setValue(this.contacto.lugarMatrimonio);
            }

            console.log('FECHA NAC DESDE: '+this.contacto.fechaMatDesde);
            //if ((this.contacto.fechaMatDesde.toString().length > 0) && (this.contacto.fechaMatDesde != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaMatDesde))
            {
              anio = this.contacto.fechaMatDesde.toString().substr(0,4);
              mes = this.contacto.fechaMatDesde.toString().substr(5,2);
              dia  = this.contacto.fechaMatDesde.toString().substr(8,2);
              console.log('ANIO: '+anio);
              console.log('MES: '+mes);
              console.log('DIA: '+dia);
              this.secondFormGroup.controls.fechaMatDesdeContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }

            console.log('FECHA NAC HASTA: '+this.contacto.fechaMatHasta);
            //if ((this.contacto.fechaMatHasta.toString().length > 0) && (this.contacto.fechaMatHasta != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaMatHasta))
            {
              anio = this.contacto.fechaMatHasta.toString().substr(0,4);
              mes = this.contacto.fechaMatHasta.toString().substr(5,2);
              dia  = this.contacto.fechaMatHasta.toString().substr(8,2);
              console.log('ANIO: '+anio);
              console.log('MES: '+mes);
              console.log('DIA: '+dia);
              this.secondFormGroup.controls.fechaMatHastaContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }
            this.secondFormGroup.controls.actaMatContacto.setValue(this.contacto.actaMat);
            this.secondFormGroup.controls.nroFolioMatContacto.setValue(this.contacto.nroFolioMat);
            this.secondFormGroup.controls.cmbFolioMatContacto.setValue(this.contacto.cmbFolioMat);
            this.secondFormGroup.controls.nroTomoMatContacto.setValue(this.contacto.nroTomoMat);
      this.secondFormGroup.controls.cmbTomoMatContacto.setValue(this.contacto.cmbTomoMat);
            this.secondFormGroup.controls.ofRegCivilMatContacto.setValue(this.contacto.ofRegCivilMat);
            this.secondFormGroup.controls.ciudadRegCivilMatContacto.setValue(this.contacto.ciudadRegCivilMat);
            this.secondFormGroup.controls.ProvRegCivilMatContacto.setValue(this.contacto.provRegCivilMat);
            this.secondFormGroup.controls.PaisRegCivilMatContacto.setValue(this.contacto.paisRegCivilMat);



            //if ((this.contacto.fechaDefuncion.toString().length > 0) && (this.contacto.fechaDefuncion != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaDefuncion))
            {
                  anio = this.contacto.fechaDefuncion.toString().substr(0,4);
                  mes = this.contacto.fechaDefuncion.toString().substr(5,2);
                  dia  = this.contacto.fechaDefuncion.toString().substr(8,2);

                  console.log('ANIO: '+anio);
                  console.log('MES: '+mes);
                  console.log('DIA: '+dia);
                  console.log('DEFUNCION: '+dia+"/"+mes+"/"+anio);
                  this.secondFormGroup.controls.fechaDefContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
                  this.secondFormGroup.controls.lugarDefContacto.setValue(this.contacto.lugarDefuncion);
            }


            console.log('FECHA DEFUNCION DESDE: '+this.contacto.fechaDefDesde);
            //if ((this.contacto.fechaDefDesde.toString().length > 0) && (this.contacto.fechaDefDesde != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaDefDesde))
            {
              anio = this.contacto.fechaDefDesde.toString().substr(0,4);
              mes = this.contacto.fechaDefDesde.toString().substr(5,2);
              dia  = this.contacto.fechaDefDesde.toString().substr(8,2);
              console.log('ANIO: '+anio);
              console.log('MES: '+mes);
              console.log('DIA: '+dia);
              this.secondFormGroup.controls.fechaDefDesdeContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }

            console.log('FECHA DEFUNCION HASTA: '+this.contacto.fechaDefHasta);
            //if ((this.contacto.fechaDefHasta.toString().length > 0) && (this.contacto.fechaDefHasta != null))
            if (!this.isUndefinedOrNull(this.contacto.fechaDefHasta))
            {
              anio = this.contacto.fechaDefHasta.toString().substr(0,4);
              mes = this.contacto.fechaDefHasta.toString().substr(5,2);
              dia  = this.contacto.fechaDefHasta.toString().substr(8,2);
              console.log('ANIO: '+anio);
              console.log('MES: '+mes);
              console.log('DIA: '+dia);
              this.secondFormGroup.controls.fechaDefHastaContacto.setValue(new Date(Number(anio),Number(mes)-1, Number(dia)));
            }

            this.secondFormGroup.controls.actaDefContacto.setValue(this.contacto.actaDef);
            this.secondFormGroup.controls.nroFolioDefContacto.setValue(this.contacto.nroFolioDef);
            this.secondFormGroup.controls.cmbFolioDefContacto.setValue(this.contacto.cmbFolioDef);
            this.secondFormGroup.controls.nroTomoDefContacto.setValue(this.contacto.nroTomoDef);
            this.secondFormGroup.controls.cmbTomoDefContacto.setValue(this.contacto.cmbTomoDef);
            this.secondFormGroup.controls.ofRegCivilDefContacto.setValue(this.contacto.ofRegCivilDef);
            this.secondFormGroup.controls.ciudadRegCivilDefContacto.setValue(this.contacto.ciudadRegCivilDef);
            this.secondFormGroup.controls.ProvRegCivilDefContacto.setValue(this.contacto.provRegCivilDef);
            this.secondFormGroup.controls.PaisRegCivilDefContacto.setValue(this.contacto.paisRegCivilDef);
            console.log("llego aqui");

            this.secondFormGroup.controls.calleNombreContacto.setValue(this.contacto.calleNombre);
            this.secondFormGroup.controls.calleNroContacto.setValue(this.contacto.calleNro);
            this.secondFormGroup.controls.cpContacto.setValue(this.contacto.cp);
            this.secondFormGroup.controls.localidadContacto.setValue(this.contacto.localidad);
            this.secondFormGroup.controls.provinciaContacto.setValue(this.contacto.provincia);

            console.log("llego aqui");
            this.secondFormGroup.controls.telefonoParticularContacto.setValue(this.contacto.telefonoParticular);
            this.secondFormGroup.controls.celularNroContacto.setValue(this.contacto.celularNro);
            this.secondFormGroup.controls.comentarioContacto.setValue(this.contacto.observacion);
      console.log("FIN CARGA DATOS");
    }


  }



  eliminar()
  {

    Swal.fire({
      title: '¿Borrar Datos del Familiar?',
      text: `Esta a punto de borrar todos los datos cargados`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        //localStorage.setItem("key_"+cont, JSON.stringify(this.nuevoContacto));
        localStorage.removeItem(this.tipoRelacion.descripcion);



        Swal.fire(
          'Familiar borrado',
          `Se eliminaron todos los datos cargados`,
          'success'
        );


        this.router.navigateByUrl('Formulario');
      }
    })
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



}
