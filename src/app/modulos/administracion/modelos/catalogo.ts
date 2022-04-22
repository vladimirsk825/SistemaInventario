export class ECatalogo {
    constructor(
        public ca_id: number,
        public ca_ta_id: number,
        public ca_codigo: string,
        public ca_valor: string,
        public ca_descripcion: string,
        public ca_valor_aux_1: string,
        public ca_valor_aux_2: string,
        public ca_valor_aux_3: string,
        public ca_usuario_act: string,
        public ca_fecha_act: string,
        public ca_estado: string
    ){}
}