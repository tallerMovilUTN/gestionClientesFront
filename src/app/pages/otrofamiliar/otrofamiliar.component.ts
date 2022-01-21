import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Contacto} from "../../model/contacto";
import {Tiporelacion} from "../../model/tiporelacion";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-otrofamiliar',
  templateUrl: './otrofamiliar.component.html'
})
export class OtrofamiliarComponent implements OnInit {

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





  tipoRelacionLista = [
    {valor:'0', muestraValor:''},
    {valor:'100', muestraValor:'Hermano1'},
    {valor:'101', muestraValor:'Hermano2'},
    {valor:'102', muestraValor:'Hermano3'},
    {valor:'103', muestraValor:'Hermano4'},
    {valor:'104', muestraValor:'Hermano5'},
    {valor:'105', muestraValor:'Hermano6'},
    {valor:'106', muestraValor:'Hermano7'},
    {valor:'107', muestraValor:'Hermano8'},

    {valor:'108', muestraValor:'Primo1'},
    {valor:'109', muestraValor:'Primo2'},
    {valor:'110', muestraValor:'Primo3'},
    {valor:'111', muestraValor:'Primo4'},
    {valor:'112', muestraValor:'Primo5'},
    {valor:'113', muestraValor:'Primo6'},
    {valor:'114', muestraValor:'Primo7'},
    {valor:'115', muestraValor:'Primo8'},

    {valor:'116', muestraValor:'Tio1'},
    {valor:'117', muestraValor:'Tio2'},
    {valor:'118', muestraValor:'Tio3'},
    {valor:'119', muestraValor:'Tio4'},
    {valor:'120', muestraValor:'Tio5'},
    {valor:'121', muestraValor:'Tio6'},
    {valor:'122', muestraValor:'Tio7'},
    {valor:'123', muestraValor:'Tio8'}


  ];

  seleccionTipoRel: string = this.tipoRelacionLista[0].valor;

  public tipoRelSeleccionado:any;

  onOptionsSelectedTipoRelacion(seleccionTipoRel: string){
    this.tipoRelSeleccionado=(seleccionTipoRel);


    console.log("estoy en onOptionsSelectedEstadoTramite=> "+this.tipoRelSeleccionado.muestraValor+"("+this.tipoRelSeleccionado.valor+")");
  }


  constructor(private activatedRoute: ActivatedRoute,private router: Router,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.secondFormGroup = this._formBuilder.group({
      apellidoContacto: ['', Validators.required],
      nombreContacto: ['', Validators.required],

      tipoRelacion: ['', Validators.required],



      apellidoNombrePadreContacto: [''],
      apellidoNombreMadreContacto: [''],

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
      nroTomoNacContacto: [''],
      ofRegCivilNacContacto: [''],
      ciudadRegCivilNacContacto: [''],
      ProvRegCivilNacContacto: [''],
      PaisRegCivilNacContacto: [''],


      actaMatContacto: [''],
      nroFolioMatContacto: [''],
      nroTomoMatContacto: [''],
      ofRegCivilMatContacto: [''],
      ciudadRegCivilMatContacto: [''],
      ProvRegCivilMatContacto: [''],
      PaisRegCivilMatContacto: [''],

      actaDefContacto: [''],
      nroFolioDefContacto: [''],
      nroTomoDefContacto: [''],
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
    this.router.navigateByUrl('Cliente');
  }




  guardar()
  {
    this.submitted2 = true;

    if (this.secondFormGroup.invalid) {
      return;
    }

    console.log("PRESIONO GUARDAR::: ");
    console.log("PRESIONO GUARDAR::: ");
    console.log("PRESIONO GUARDAR::: ");



    console.log(this.secondFormGroup.value);

    this.contacto = new Contacto();
    this.contacto.apellido = this.secondFormGroup.controls.apellidoContacto.value;
    this.contacto.nombre = this.secondFormGroup.controls.nombreContacto.value;
    this.contacto.dni = this.secondFormGroup.controls.dniContacto.value;
    this.contacto.tipoDoc = this.secondFormGroup.controls.tipoDocContacto.value;
    this.contacto.email = this.secondFormGroup.controls.emailContacto.value;
    this.contacto.fechaNac = this.secondFormGroup.controls.fechaNacContacto.value;
    this.contacto.lugarNac = this.secondFormGroup.controls.lugarNacContacto.value;

    this.contacto.apellidoNombrePadre = this.secondFormGroup.controls.apellidoNombrePadreContacto.value;
    this.contacto.apellidoNombreMadre = this.secondFormGroup.controls.apellidoNombreMadreContacto.value;

    this.contacto.fechaNacDesde = this.secondFormGroup.controls.fechaNacDesdeContacto.value;
    this.contacto.fechaNacHasta = this.secondFormGroup.controls.fechaNacHastaContacto.value;

    this.contacto.actaNac = this.secondFormGroup.controls.actaNacContacto.value;
    this.contacto.nroFolioNac = this.secondFormGroup.controls.nroFolioNacContacto.value;
    this.contacto.nroTomoNac = this.secondFormGroup.controls.nroTomoNacContacto.value;
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
    this.contacto.nroTomoMat = this.secondFormGroup.controls.nroTomoMatContacto.value;
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
    this.contacto.nroTomoDef = this.secondFormGroup.controls.nroTomoDefContacto.value;
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



    //this.tipoRelSeleccionado.muestraValor+"("+this.tipoRelSeleccionado.valor+")"
    ///m1.tipoRelacion = rel1;
    let tipoRel = new Tiporelacion();
    tipoRel.id = this.tipoRelSeleccionado.valor;
    tipoRel.descripcion = this.tipoRelSeleccionado.muestraValor;
    this.contacto.tipoRelacion = tipoRel;
    localStorage.setItem(tipoRel.descripcion, JSON.stringify(this.contacto));
    //this.router.navigate(['formulario'], {queryParams: {contacto: this.contacto}});
    this.router.navigateByUrl('Cliente');


  }





  cargarDatos(id: any)
  {
        console.log("ESTOY EN cargarDatos:: " + id);
        if (id != 'Nuevo')
        {
                let obj: any;
                let jsonObj: any;


                obj = localStorage.getItem(id);
                this.titulo = " - "+id;



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

                  console.log("TIPO RELACION: "+this.contacto.tipoRelacion.id+"- "+this.contacto.tipoRelacion.descripcion);

                  this.tipoRelSeleccionado = this.tipoRelacionLista[this.contacto.tipoRelacion.id];
                  //this.estadoSeleccionado=this.estadoGestionTramite[this.gestiontramite.estado];

                  //let tipoRelacionLista:any = [ {valor:this.contacto.tipoRelacion.id, muestraValor:this.contacto.tipoRelacion.descripcion}];
                  //this.onOptionsSelectedTipoRelacion(tipoRelacionLista);


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
                  this.secondFormGroup.controls.nroTomoNacContacto.setValue(this.contacto.nroTomoNac);
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
                  this.secondFormGroup.controls.nroTomoMatContacto.setValue(this.contacto.nroTomoMat);
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
                  this.secondFormGroup.controls.nroTomoDefContacto.setValue(this.contacto.nroTomoDef);
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

        } ////FIN DE CARGAR DATOS FAMILIAR






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


        this.router.navigateByUrl('Cliente');
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
