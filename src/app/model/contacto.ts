import { Persona } from "./persona";
import { Tiporelacion } from "./tiporelacion";

export class Contacto {

    id: number=0;
    apellido: string="";
    nombre: string="";
    email: string="";
    fechaNac!: Date;
    lugarNac: string="";
    fechaDefuncion!: Date;
    lugarDefuncion: string="";

    tipoDoc: string="";
    dni: number=0;
    calleNombre: string="";
    calleNro: number=0;
    cp: number=0;
    localidad: string="";
    provincia : string="";
    celularNro: number=0;
    telefonoParticular: number=0;
    fechaMatrimonio!: Date;
    lugarMatrimonio : string="";
    fechaAlta!: Date;
    estado: number=1;
    observacion : string="";
    persona: Persona = new Persona;
    tipoRelacion: Tiporelacion = new Tiporelacion;







  fechaNacDesde!: Date;
  fechaNacHasta!: Date;

  fechaMatDesde!: Date;
  fechaMatHasta!: Date;

  fechaDefDesde!: Date;
  fechaDefHasta!: Date;

  actaNac: number=0;
  nroFolioNac: number=0;
  cmbFolioNac: string="";
  nroTomoNac: number=0;
  cmbTomoNac: string="";

  ofRegCivilNac: string="";
  ciudadRegCivilNac: string="";
  provRegCivilNac: string="";
  paisRegCivilNac: string="";


  actaMat: number=0;
  nroFolioMat: number=0;
  cmbFolioMat:string="";
  nroTomoMat: number=0;
  cmbTomoMat:string="";
  ofRegCivilMat: string="";
  ciudadRegCivilMat: string="";
  provRegCivilMat: string="";
  paisRegCivilMat: string="";


  actaDef: number=0;
  nroFolioDef: number=0;
  cmbFolioDef:string="";
  nroTomoDef: number=0;
  cmbTomoDef:string="";
  ofRegCivilDef: string="";
  ciudadRegCivilDef: string="";
  provRegCivilDef: string="";
  paisRegCivilDef: string="";

  apellidoNombrePadre: string="";
  apellidoNombreMadre: string="";

}
