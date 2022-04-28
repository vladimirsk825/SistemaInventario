import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CatalogoComponent} from './catalogo/catalogo.component'
import { ParametrosComponent } from './parametros/parametros.component';

const routes: Routes = [
    { path: '',
      children: [
         { path: 'catalogo', component: CatalogoComponent},
         { path: 'parametros', component: ParametrosComponent},
         { path: '**', redirectTo: "/"},
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CatalogosParametrosRoutingModule { }