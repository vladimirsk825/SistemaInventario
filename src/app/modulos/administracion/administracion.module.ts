import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialsModule } from './../../core/configuracion/materials.module';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { OficinaComponent } from './componentes/oficina/oficina.component';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { EmpresaDialogComponent } from './componentes/empresa-dialog/empresa-dialog.component';
import { OficinaDialogComponent } from './componentes/oficina-dialog/oficina-dialog.component';
import { AreaComponent } from './componentes/area/area.component';
import { AreaDialogComponent } from './componentes/area-dialog/area-dialog.component';


@NgModule({
  declarations: [
    OficinaComponent,
    EmpresaComponent,
    EmpresaDialogComponent,
    OficinaDialogComponent,
    AreaComponent,
    AreaDialogComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MaterialsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    OficinaComponent,
    EmpresaComponent
  ]
})
export class AdministracionModule { }
