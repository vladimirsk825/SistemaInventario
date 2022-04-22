import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './componente/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './index/index.component';

import { SharedModule } from './shared/shared.module';
import { AdministracionModule } from './modulos/administracion/administracion.module';

import { MultilevelMenuService } from 'ng-material-multilevel-menu';
import { MaterialsModule } from './core/configuracion/materials.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdministracionModule,
    SharedModule,
    MaterialsModule
  ],
  providers: [MultilevelMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
