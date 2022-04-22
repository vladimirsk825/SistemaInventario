import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './componentes/empresa/empresa.component';
import { OficinaComponent } from './componentes/oficina/oficina.component';

const routes: Routes = [
  { path: '',
    children: [
       { path: 'empresa', component: EmpresaComponent},
       { path: 'oficina', component: OficinaComponent},
       { path: '**', redirectTo: "/"},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
