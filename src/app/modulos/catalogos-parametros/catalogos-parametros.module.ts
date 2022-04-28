import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { DetalleCatalogoComponent } from './detalle-catalogo/detalle-catalogo.component';
import { ParametrosComponent } from './parametros/parametros.component';
import { CatalogosParametrosRoutingModule} from './catalogos-parametros-routing.module';

@NgModule({
  declarations: [
    CatalogoComponent,
    DetalleCatalogoComponent,
    ParametrosComponent
  ],
  imports: [
    CommonModule,
    CatalogosParametrosRoutingModule
  ]
})
export class CatalogosParametrosModule { }
