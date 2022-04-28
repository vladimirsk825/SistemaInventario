import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/componentes/error404/error404.component';
import { Error500Component } from './shared/componentes/error500/error500.component';
import { HomeComponent } from './shared/componentes/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'administracion',
    loadChildren: () => import('./modulos/administracion/administracion.module').then(m => m.AdministracionModule)
  },
  {
    path: 'catalogo-parametros',
    loadChildren: () => import('./modulos/catalogos-parametros/catalogos-parametros.module').then(m => m.CatalogosParametrosModule)
  },
  { path: '**', component: Error404Component },
  { path: 'error-sistema', component: Error500Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
