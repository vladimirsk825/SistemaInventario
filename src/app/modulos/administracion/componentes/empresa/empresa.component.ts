import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';

import { EEmpresa } from '../../modelos/empresa';
import { EmpresaDialogComponent } from '../empresa-dialog/empresa-dialog.component';
import { ACCIONES } from 'src/app/core/configuracion/acciones-config';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements AfterViewInit {
  posDerecha: TooltipPosition  = 'right';
  porArriba: TooltipPosition  = 'above';
  columnasEmpresa: string[] = ['em_id', 'em_codigo_empresa', 'em_razon_social', 'em_descripcion', 'em_ruc', 'em_estado', 'edit'];
  dataSource: MatTableDataSource<EEmpresa>;
  public datosEmpresa: EEmpresa;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Agarrar acciones por rol de session local/////
  acciones: number[]= [10001, 10002, 10003, 10004]
  ////////////////////////////////////////////////

  lemp:boolean;
  cemp:boolean;
  aemp:boolean;
  eemp:boolean;

  constructor(public dialog: MatDialog) {
    this.datosEmpresa = new EEmpresa(0, '', '', '', '', '', '', '', '', false, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'V');
    const empresa = Array.from({length: 1}, (_, k) => obtieneEmpresas(1));
    this.dataSource = new MatTableDataSource(empresa);
    this.lemp = this.acciones.includes(ACCIONES.LEMP) ? true : false;
    this.cemp = this.acciones.includes(ACCIONES.CEMP) ? true : false;
    this.aemp = this.acciones.includes(ACCIONES.AEMP) ? true : false;
    this.eemp = this.acciones.includes(ACCIONES.EEMP) ? true : false;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEmpresa(){
    this.datosEmpresa = new EEmpresa(0, '', '', '', '', '', '', '', '', false, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'V');
    this.openDialog(this.datosEmpresa);
  }

  editEmpresa(par: EEmpresa){
    this.datosEmpresa.em_id =   par.em_id;
    this.datosEmpresa.em_codigo_empresa = par.em_codigo_empresa;
    this.datosEmpresa.em_moneda = par.em_moneda;
    this.datosEmpresa.em_tipo_contribuyente = par.em_tipo_contribuyente;
    this.datosEmpresa.em_razon_social = par.em_razon_social;
    this.datosEmpresa.em_fecha_constitucion = par.em_fecha_constitucion;
    this.datosEmpresa.em_descripcion = par.em_descripcion;
    this.datosEmpresa.em_direccion = par.em_direccion;
    this.datosEmpresa.em_ruc = par.em_ruc;
    this.datosEmpresa.em_genera_contabilidad = par.em_genera_contabilidad;
    this.datosEmpresa.em_tipo_industria = par.em_tipo_industria;
    this.datosEmpresa.em_tipo_empresa = par.em_tipo_empresa;
    this.datosEmpresa.em_representante = par.em_representante;
    this.datosEmpresa.em_logo = par.em_logo;
    this.datosEmpresa.em_telefono = par.em_telefono;
    this.datosEmpresa.em_fax = par.em_fax;
    this.datosEmpresa.em_correo = par.em_correo;
    this.datosEmpresa.em_dir_web = par.em_dir_web;
    this.datosEmpresa.em_pais = par.em_pais;
    this.datosEmpresa.em_provincia = par.em_provincia;
    this.datosEmpresa.em_ciudad = par.em_ciudad;
    this.datosEmpresa.em_codigo_zip = par.em_codigo_zip;
    this.datosEmpresa.em_usuario_ing = par.em_usuario_ing;
    this.datosEmpresa.em_fecha_ing = par.em_fecha_ing;
    this.datosEmpresa.em_usuario_act = par.em_usuario_act;
    this.datosEmpresa.em_fecha_act = par.em_fecha_act;
    this.datosEmpresa.em_estado = par.em_estado;
    this.openDialog(this.datosEmpresa);
  }
  deleteEmpresa(par: EEmpresa){
  }
  openDialog(req: any) {
    const dialogRef = this.dialog.open(EmpresaDialogComponent, {
      width: '60%',
      height: '90%',
      data: req });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result){        
        this.datosEmpresa.em_id = result.em_id;
        this.datosEmpresa.em_codigo_empresa = result.em_codigo_empresa;
        this.datosEmpresa.em_moneda = result.em_moneda;
        this.datosEmpresa.em_tipo_contribuyente = result.em_tipo_contribuyente;
        this.datosEmpresa.em_razon_social = result.em_razon_social;
        this.datosEmpresa.em_fecha_constitucion = result.em_fecha_constitucion;
        this.datosEmpresa.em_descripcion = result.em_descripcion;
        this.datosEmpresa.em_direccion = result.em_direccion;
        this.datosEmpresa.em_ruc = result.em_ruc;
        this.datosEmpresa.em_genera_contabilidad = result.em_genera_contabilidad;
        this.datosEmpresa.em_tipo_industria = result.em_tipo_industria;
        this.datosEmpresa.em_tipo_empresa = result.em_tipo_empresa;
        this.datosEmpresa.em_representante = result.em_representante;
        this.datosEmpresa.em_logo = result.em_logo;
        this.datosEmpresa.em_telefono = result.em_telefono;
        this.datosEmpresa.em_fax = result.em_fax;
        this.datosEmpresa.em_correo = result.em_correo;
        this.datosEmpresa.em_dir_web = result.em_dir_web;
        this.datosEmpresa.em_pais = result.em_pais;
        this.datosEmpresa.em_provincia = result.em_provincia;
        this.datosEmpresa.em_ciudad = result.em_ciudad;
        this.datosEmpresa.em_codigo_zip = result.em_codigo_zip;
        this.datosEmpresa.em_usuario_ing = result.em_usuario_ing;
        this.datosEmpresa.em_fecha_ing = result.em_fecha_ing;
        this.datosEmpresa.em_usuario_act = result.em_usuario_act;
        this.datosEmpresa.em_fecha_act = result.em_fecha_act;
        this.datosEmpresa.em_estado = result.em_estado;
        this.actualizarEmpresa( this.datosEmpresa);
      }
    });
  }

  actualizarEmpresa(param: EEmpresa){
    this.admPrmActualizerServicio(param);
  }

  admPrmActualizerServicio(param: EEmpresa){
    console.log('Ultimo');
  }
}

/** Builds and returns a new User. */
function obtieneEmpresas(id: number): EEmpresa {
  return {
    em_id: id,
    em_codigo_empresa: "00001",
    em_moneda: "1",
    em_tipo_contribuyente: "E",
    em_razon_social: "DEFAULT",
    em_fecha_constitucion: "",
    em_descripcion: "EMPRESA DEL SISTEMA",
    em_direccion: "N/A",
    em_ruc: "N/A",
    em_genera_contabilidad: true,
    em_tipo_industria: "AUT",
    em_tipo_empresa: "SA",
    em_representante: "",
    em_logo: "",
    em_telefono: "0961894896",
    em_fax: "",
    em_correo: "",
    em_dir_web: "",
    em_pais: "",
    em_provincia: "",
    em_ciudad: "",
    em_codigo_zip: "",
    em_usuario_ing: "",
    em_fecha_ing: "",
    em_usuario_act: "",
    em_fecha_act: "",
    em_estado: "V"
  };
}
