export class Persona {

    id: number=0;
    apellido: string="";
    nombre: string="";
    email: string="";
    fechaNac!: Date;
    lugarNac: string="";

    tipoDoc: string="";

    dni: number=0;
    calleNombre: string="";
    calleNro: number=0;
    cp: number=0;
    localidad: string="";
    provincia : string="";
    celularNro: number=0;
    telefonoParticular: number=0;
    estadocivil : string="";
    fechaMatrimonio!: Date;
    lugarMatrimonio : string="";
    idfotoFrente : string="";
    idfotoDorso : string="";
    fechaAlta: Date | undefined;
    estado: number=1;



    actaNac: number=0;
    nroFolioNac: number=0;
    cmbFolioNac: string="";
    nroTomoNac: number=0;
    cmbTomoNac: string="";
    ofRegCivilNac: string="";
    ciudadRegCivilNac: string="";
    provRegCivilNac: string="";
    paisRegCivilNac: string="";



}
