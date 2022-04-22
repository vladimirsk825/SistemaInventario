import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EEmpresa } from '../../modelos/empresa';
import { ECatalogo } from '../../modelos/catalogo';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-empresa-dialog',
  templateUrl: './empresa-dialog.component.html',
  styleUrls: ['./empresa-dialog.component.scss'],
  providers:[{ provide: STEPPER_GLOBAL_OPTIONS, useValue:{showError:true}}]
})
export class EmpresaDialogComponent implements OnInit {

   catalogoTC : ECatalogo[] = [
    {
       ca_id:6,
       ca_ta_id:3,
       ca_codigo:'E',
       ca_valor:'ESPECIAL',
       ca_descripcion:'Contribuyente especial',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:7,
       ca_ta_id:3,
       ca_codigo:'N',
       ca_valor:'NORMAL',
       ca_descripcion:'Contribuyente normal',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    }
   ];

   catalogoTI : ECatalogo[] = [
    {
       ca_id:8,
       ca_ta_id:4,
       ca_codigo:'MAN',
       ca_valor:'Industria Manufacturera',
       ca_descripcion:'Ensambladora, tecnología',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:9,
       ca_ta_id:4,
       ca_codigo:'ALI',
       ca_valor:'Industria Alimenticia',
       ca_descripcion:'Alimentos, bebidas',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:10,
       ca_ta_id:4,
       ca_codigo:'AUT',
       ca_valor:'Industria Automotriz',
       ca_descripcion:'Partes de autos',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:11,
       ca_ta_id:4,
       ca_codigo:'TEX',
       ca_valor:'Industria Textil',
       ca_descripcion:'Ropa',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:12,
       ca_ta_id:4,
       ca_codigo:'FAR',
       ca_valor:'Industria Farmaceutica',
       ca_descripcion:'Medicinas',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:13,
       ca_ta_id:4,
       ca_codigo:'HTL',
       ca_valor:'Industria Hotelera',
       ca_descripcion:'Turismo, hotel',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    }
   ];

   catalogoTE : ECatalogo[] = [
    {
       ca_id:14,
       ca_ta_id:5,
       ca_codigo:'CNC',
       ca_valor:'Compañía en nombre colectivo',
       ca_descripcion:'Compañía en nombre colectivo',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:15,
       ca_ta_id:5,
       ca_codigo:'CSA',
       ca_valor:'Compañía en comandita simple y dividida por acciones',
       ca_descripcion:'Compañía en comandita simple y dividida por acciones',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:16,
       ca_ta_id:5,
       ca_codigo:'CRL',
       ca_valor:'Compañía de responsabilidad limitada Cía. Ltda.',
       ca_descripcion:'Compañía de responsabilidad limitada Cía. Ltda.',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:17,
       ca_ta_id:5,
       ca_codigo:'SA',
       ca_valor:'Sociedad anónima  S.A.',
       ca_descripcion:'Sociedad anónima  S.A.',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    },
    {
       ca_id:18,
       ca_ta_id:5,
       ca_codigo:'CEM',
       ca_valor:'Compañía de economía mixta',
       ca_descripcion:'Compañía de economía mixta',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    }
   ];

   catalogoMN : ECatalogo[] = [
    {
       ca_id:1,
       ca_ta_id:1,
       ca_codigo:'1',
       ca_valor:'USD',
       ca_descripcion:'MONEDA DOLAR',
       ca_valor_aux_1:'',
       ca_valor_aux_2:'',
       ca_valor_aux_3:'',
       ca_usuario_act:'',
       ca_fecha_act:'',
       ca_estado:'V'
    }
   ];

   catalogoEG : ECatalogo[] = [
   {
      ca_id:2,
      ca_ta_id:2,
      ca_codigo:'V',
      ca_valor:'VIGENTE',
      ca_descripcion:'ESTADO HABILITADO',
      ca_valor_aux_1:'',
      ca_valor_aux_2:'',
      ca_valor_aux_3:'',
      ca_usuario_act:'',
      ca_fecha_act:'',
      ca_estado:'V'
   },
   {
      ca_id:3,
      ca_ta_id:2,
      ca_codigo:'N',
      ca_valor:'NO VIGENTE',
      ca_descripcion:'ESTADO DESHABILITADO',
      ca_valor_aux_1:'',
      ca_valor_aux_2:'',
      ca_valor_aux_3:'',
      ca_usuario_act:'',
      ca_fecha_act:'',
      ca_estado:'V'
   },
   {
      ca_id:4,
      ca_ta_id:2,
      ca_codigo:'B',
      ca_valor:'BLOQUEADO',
      ca_descripcion:'ESTADO BLOQUEADO',
      ca_valor_aux_1:'',
      ca_valor_aux_2:'',
      ca_valor_aux_3:'',
      ca_usuario_act:'',
      ca_fecha_act:'',
      ca_estado:'V'
   },
   {
      ca_id:5,
      ca_ta_id:2,
      ca_codigo:'P',
      ca_valor:'PENDIENTE',
      ca_descripcion:'ESTADO PENDIENTE',
      ca_valor_aux_1:'', 
      ca_valor_aux_2:'',
      ca_valor_aux_3:'',
      ca_usuario_act:'',
      ca_fecha_act:'',
      ca_estado:'V'
   }
   ];

   empresa: EEmpresa;
   isEditable = true;
   
   gpInfGen = new FormGroup({
      nombre: new FormControl('', Validators.required),
      ruc: new FormControl('', Validators.required),
      tipoContribuyente: new FormControl('', Validators.required),
      tipoIndustria: new FormControl(''),
      tipoEmpresa: new FormControl(''),
      codigo: new FormControl('', Validators.required),
      moneda: new FormControl('', Validators.required)
   });

   gpInfCon = new FormGroup({
      razonSocial: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required)
   });

   gpInfAdi= new FormGroup({
      fechaConstitucion: new FormControl('', Validators.required),
      estadoEmpresa: new FormControl('', Validators.required)
   });
   
   constructor(private _formBuilder: FormBuilder, 
               public dialogRef: MatDialogRef<EmpresaDialogComponent>, 
               @Inject(MAT_DIALOG_DATA) public datosEmpresa: EEmpresa){
      this.empresa = datosEmpresa;

      this.gpInfGen.setValue({
         nombre: this.empresa.em_descripcion,
         ruc: this.empresa.em_ruc,
         tipoContribuyente: this.empresa.em_tipo_contribuyente,
         tipoIndustria: this.empresa.em_tipo_industria,
         tipoEmpresa: this.empresa.em_tipo_empresa,
         codigo: this.datosEmpresa.em_codigo_empresa,
         moneda: this.empresa.em_moneda
      });
              
      this.gpInfCon.setValue({
         razonSocial: this.empresa.em_razon_social,
         direccion: this.empresa.em_direccion
      });
                
      this.gpInfAdi.setValue({
         fechaConstitucion: this.empresa.em_fecha_constitucion,
         estadoEmpresa: this.empresa.em_estado
      });
   }

   ngOnInit() {
   }
  
   onNoClick(): void {
      this.dialogRef.close();
   }

   setValues(){
      this.empresa.em_descripcion = this.gpInfGen.get('nombre').value;
      this.empresa.em_codigo_empresa = this.gpInfGen.get('codigo').value;
      this.empresa.em_ruc = this.gpInfGen.get('ruc').value;
      this.empresa.em_tipo_contribuyente = this.gpInfGen.get('tipoContribuyente').value;
      this.empresa.em_tipo_industria = this.gpInfGen.get('tipoIndustria').value;
      this.empresa.em_tipo_empresa = this.gpInfGen.get('tipoEmpresa').value;
      this.empresa.em_moneda = this.gpInfGen.get('moneda').value;
      this.empresa.em_razon_social = this.gpInfCon.get('razonSocial').value;
      this.empresa.em_direccion = this.gpInfCon.get('direccion').value;
      this.empresa.em_fecha_constitucion = this.gpInfAdi.get('fechaConstitucion').value;
      this.empresa.em_estado  = this.gpInfAdi.get('estadoEmpresa').value;
   }
}