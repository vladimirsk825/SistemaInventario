export class EOficina {
    constructor(
        public of_id: number,
        public of_id_padre: number,
        public of_em_id: number,
        public of_codigo_oficina: string,
        public of_nombre: string,
        public of_direccion: string,
        public of_telefono: string,
        public of_contabiliza: boolean,
        public of_consolida: boolean,
        public of_usuario_ing: string,
        public of_fecha_ing: string,
        public of_usuario_act: string,
        public of_fecha_act: string,
        public of_estado: string
    ){}
}

export interface Oficina {
    nombre:string;
    id:number;
    superior:number;
    codigo:string;
    contabiliza:boolean;
    consolida:boolean;
    estado:string;
}