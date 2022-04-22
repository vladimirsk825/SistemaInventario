import { Component, OnInit } from '@angular/core';
import { MultilevelNodes, Configuration, ExpandedRTL, ExpandedLTR } from 'ng-material-multilevel-menu';
import { COLORES } from 'src/app/core/configuracion/color-config';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    ExpandedLTR,
    ExpandedRTL,
  ]
})
export class MenuComponent implements OnInit {
  menuWithID: MultilevelNodes[] = null

  constructor(){ }
  
  appitems: MultilevelNodes[] = [
   {
      data:'',
      label:'Administración',
      link:'',
      icon:'settings',
      items:[
         {
            data:'',
            label:'Empresa',
            link:'',
            icon:'business',
            items:[
               {
                  data:'EmpresaComponent',
                  label:'Mantenimiento empresas',
                  link:'/administracion/empresa',
                  icon:'business_center'
               },
               {
                  data:'OficinaComponent',
                  label:'Mantenimiento oficinas',
                  link:'/administracion/oficina',
                  icon:'store'
               },
               {
                  data:'EstructuraComponent',
                  label:'Estructura organizacional',
                  link:'/administracion/estructura-organizacional',
                  icon:'lan'
               },
               {
                  data:'AreaComponent',
                  label:'Areas',
                  link:'/administracion/areas',
                  icon:'apartment'
               },
               {
                  data:'PeriodoFiscalComponent',
                  label:'Período Fiscal',
                  link:'/administracion/periodo-fiscal',
                  icon:'date_range'
               },
            ]
         },
         {
            data:'',
            label:'Plan de Cuentas',
            link:'',
            icon:'article',
            items:[
               {
                  data:'NivelCuenta',
                  label:'Niveles de cuentas',
                  link:'/contabilidad/nivel-cuenta',
                  icon:'account_tree'
               },
               {
                  data:'PlanCuenta',
                  label:'Plan de cuentas',
                  link:'/contabilidad/plan-cuenta',
                  icon:'view_list'
               }
            ]
         }
      ]
   }
];

  getClass(item: { icon: any; }) {
     return {
        [item.icon]: true
      }
  }

  menuIsReady(menus: MultilevelNodes[]) {
    this.menuWithID = menus;
  }

  ngOnInit(): void {
  }

  config = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    fontColor:COLORES.PrimaryColor_700,
    selectedListFontColor: COLORES.AccentColor_700,
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: false,
    rtlLayout: false,
    customTemplate: true
  };

  selectedItem($event: any) {
    console.log($event);
  }

  selectedLabel($event: any) {
    console.log($event);
  }
}