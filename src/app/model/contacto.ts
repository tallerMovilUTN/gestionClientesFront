import { Persona } from "./persona";
import { Tiporelacion } from "./tiporelacion";

export class Contacto {

    id: number=0;
    apellido: string="";
    nombre: string="";
    email: string="";
    fechaNac: Date | undefined;
    lugarNac: string="";
    fechaDefuncion: Date | undefined;
    lugarDefuncion: string="";

    dni: number=0;
    calleNombre: string="";
    calleNro: number=0;
    cp: number=0;
    localidad: string="";
    provincia : string="";

    
    celularNro: number=0;
    telefonoParticular: number=0;

    fechaMatrimonio: Date | undefined;
    lugarMatrimonio : string="";

    fechaAlta: Date | undefined;
    estado: number=1;

    observacion : string="";
    persona: Persona = new Persona;
    tipoRelacion: Tiporelacion = new Tiporelacion;

}
