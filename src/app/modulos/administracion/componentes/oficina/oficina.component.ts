import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Node, Options, SearchableNode, TreeTableNode } from 'src/app/shared/modelos/models';
import { Oficina, EOficina } from '../../modelos/oficina';
import { flatMap, defaults } from 'lodash-es';
import { TooltipPosition } from '@angular/material/tooltip';
import { match } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/function'
import { Subject } from 'rxjs';
import { TreeService } from 'src/app/shared/servicios/tree/tree.service';
import { ValidatorService } from 'src/app/shared/servicios/validator/validator.service';
import { ConverterService } from 'src/app/shared/servicios/converter/converter.service';
import { opcionesDefecto } from 'src/app/shared/configuraciones/defecto-opciones-arbol';
import { ACCIONES } from 'src/app/core/configuracion/acciones-config';
import { OficinaDialogComponent } from '../oficina-dialog/oficina-dialog.component';

@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.scss']
})
export class OficinaComponent implements OnInit {
  posDerecha: TooltipPosition  = 'right';
  porArriba: TooltipPosition  = 'above';
  tree: Node<Oficina> | Node<Oficina>[];
  nodeClicked: Subject<TreeTableNode<Oficina>> = new Subject();
  opciones: Options<Oficina> = {};
  dataSource: MatTableDataSource<TreeTableNode<Oficina>>;
  displayedColumns: string[];
  private searchableTree: SearchableNode<Oficina>[];
  private treeTable: TreeTableNode<Oficina>[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  public filtroBusqueda = '';
  public datosOficina: EOficina;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  //Agarrar acciones por rol de session local/////
  acciones: number[]= [10001, 10002, 10003, 10004, 10005, 10006, 10007, 10008]
  ////////////////////////////////////////////////

  lofi:boolean;
  cofi:boolean;
  aofi:boolean;
  eofi:boolean;

  constructor(
    public dialog: MatDialog,
    private treeService: TreeService,
    private validatorService: ValidatorService,
    private converterService: ConverterService,
    elem: ElementRef) {
      this.getOficinas();
      this.lofi = this.acciones.includes(ACCIONES.LOFI) ? true : false;
      this.cofi = this.acciones.includes(ACCIONES.COFI) ? true : false;
      this.aofi = this.acciones.includes(ACCIONES.AOFI) ? true : false;
      this.eofi = this.acciones.includes(ACCIONES.EOFI) ? true : false;
      if (this.cofi || this.aofi || this.eofi)
        this.displayedColumns = ['nombre', 'codigo', 'estado', 'accion'];
      else
        this.displayedColumns = ['nombre', 'codigo', 'estado'];
  }

  getOficinas() {
    this.tree = [{
      value:{
         nombre:'EMPRESA',
         id:1,
         superior: null,
         codigo:'00001',
         contabiliza: null,
         consolida:null,
         estado:'VIGENTE'
      },
      children:[
         {
            value:{
              nombre:'SUCURSAL QUITO',
              id:1,
              superior:null,
              codigo:'001',
              contabiliza: true,
              consolida: true,
              estado:'VIGENTE'
            },
            children:[
               {
                  value:{
                    nombre:'OFICINA LA GASCA',
                    id:2,
                    superior:1,
                    codigo:'002',
                    contabiliza:true,
                    consolida:true,
                    estado:'VIGENTE'
                  },
                  children:[]
               }
            ]
         },
         {
            value:{
              nombre:'SUCURSAL GUAYAQUIL',
              id:3,
              superior:null,
              codigo:'003',
              contabiliza:true,
              consolida:true,
              estado:'VIGENTE'
            },
            children:[
               {
                  value:{
                    nombre:'OFICINA LOS CEIBOS',
                    id:4,
                    superior:3,
                    codigo:'004',
                    contabiliza:true,
                    consolida:true,
                    estado:'VIGENTE'
                  },
                  children:[]
               }
            ]
         }
      ]
    }];

    this.tree = Array.isArray(this.tree) ? this.tree : [this.tree];
    this.opciones = this.parseOptions(opcionesDefecto);
    const customOrderValidator = this.validatorService.validateCustomOrder(this.tree[0], this.opciones.customColumnOrder);
    if (this.opciones.customColumnOrder && !customOrderValidator.valid) {
      throw new Error(`
          Properties ${customOrderValidator.xor.map((x: any) => `'${x}'`).join(', ')} incorrect or missing in customColumnOrder`
      );
    }
    //this.displayedColumns = this.opciones.customColumnOrder
    //  ? this.opciones.customColumnOrder
    //  : this.extractNodeProps(this.tree[0]);
    this.searchableTree = this.tree.map(t => this.converterService.toSearchableTree(t));
    const treeTableTree = this.searchableTree.map(st => this.converterService.toTreeTableTree(st));
    this.treeTable = flatMap(treeTableTree, this.treeService.flatten);
    this.dataSource = this.generateDataSource();
    this.dataSource.paginator = this.paginator;
  }

  parseOptions(defaultOpts: Options<Oficina>): Options<Oficina> {
    return defaults(this.opciones, defaultOpts);
  }

  extractNodeProps(tree: Node<Oficina> & { value: { [k: string]: any } }): string[] {
    return Object.keys(tree.value).filter(x => typeof tree.value[x] !== 'object');
  }

  ngOnInit(): void {
  }

  generateDataSource(): MatTableDataSource<TreeTableNode<Oficina>> {
    return new MatTableDataSource(this.treeTable.filter(x => x.isVisible));
  }

  formatIndentation(node: TreeTableNode<Oficina>, step: number = 5): string {
    return '&nbsp;'.repeat(node.depth * step);
  }

  formatElevation(): string {
    return `mat-elevation-z${this.opciones.elevation}`;
  }

  onNodeClick(clickedNode: TreeTableNode<Oficina>): void {
    clickedNode.isExpanded = !clickedNode.isExpanded;
    this.treeTable.forEach(el => {
      el.isVisible = this.searchableTree.every(st => {
        return pipe(this.treeService.searchById(st, el.id), match(() => [], (n) => n.pathToRoot)).
               every(p=>this.treeTable.find(x => x.id === p.id).isExpanded);
      });
    });
    this.dataSource = this.generateDataSource();
    this.nodeClicked.next(clickedNode);
  }

  addOficina(){
    this.datosOficina = new EOficina(0, 0, 0, '', '', '', '', false, false, '', '', '', '', 'V');
    this.openDialog(this.datosOficina);
  }

  editOficina(par: EOficina){
    this.datosOficina.of_id =   par.of_id;
    this.datosOficina.of_id_padre = par.of_id_padre;
    this.datosOficina.of_em_id = par.of_em_id;
    this.datosOficina.of_codigo_oficina = par.of_codigo_oficina;
    this.datosOficina.of_nombre = par.of_nombre;
    this.datosOficina.of_direccion = par.of_direccion;
    this.datosOficina.of_telefono = par.of_telefono;
    this.datosOficina.of_contabiliza = par.of_contabiliza;
    this.datosOficina.of_consolida = par.of_consolida;
    this.datosOficina.of_usuario_ing = par.of_usuario_ing;
    this.datosOficina.of_fecha_ing = par.of_fecha_ing;
    this.datosOficina.of_usuario_act = par.of_usuario_act;
    this.datosOficina.of_fecha_act = par.of_fecha_act;
    this.datosOficina.of_estado = par.of_estado;
    this.openDialog(this.datosOficina);
  }

  deleteEmpresa(par: EOficina){
  }
  
  openDialog(req: any) {
    const dialogRef = this.dialog.open(OficinaDialogComponent, {
      width: '60%',
      height: '90%',
      data: req });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result){
        this.datosOficina.of_id = result.of_id;
        this.datosOficina.of_id_padre = result.of_id_padre;
        this.datosOficina.of_em_id = result.of_em_id;
        this.datosOficina.of_codigo_oficina = result.of_codigo_oficina;
        this.datosOficina.of_nombre = result.of_nombre;
        this.datosOficina.of_direccion = result.of_direccion;
        this.datosOficina.of_telefono = result.of_telefono;
        this.datosOficina.of_contabiliza = result.of_contabiliza;
        this.datosOficina.of_consolida = result.of_consolida;
        this.datosOficina.of_usuario_ing = result.of_usuario_ing;
        this.datosOficina.of_fecha_ing = result.of_fecha_ing;
        this.datosOficina.of_usuario_act = result.of_usuario_act;
        this.datosOficina.of_fecha_act = result.of_fecha_act;
        this.datosOficina.of_estado = result.of_estado;
        this.actualizarOficina( this.datosOficina);
      }
    });
  }

  actualizarOficina(param: EOficina){
    this.admPrmActualizerServicio(param);
  }

  admPrmActualizerServicio(param: EOficina){
    console.log('Ultimo');
  }

}
