import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MaterialsModule } from './../core/configuracion/materials.module';

import { SharedRoutingModule } from './shared-routing.module';
import { MenuComponent } from './componentes/menu/menu.component';
import { HomeComponent } from './componentes/home/home.component';
import { Error404Component } from './componentes/error404/error404.component';
import { Error500Component } from './componentes/error500/error500.component';

@NgModule({
  declarations: [
    MenuComponent,
    HomeComponent,
    Error404Component,
    Error500Component
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    NgMaterialMultilevelMenuModule,
    SharedRoutingModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
