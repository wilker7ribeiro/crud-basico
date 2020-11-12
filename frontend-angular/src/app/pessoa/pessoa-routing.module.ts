import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';
import { PessoaManterComponent } from './pessoa-manter/pessoa-manter.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'consultar-pessoa', pathMatch: 'full' },
  { path: 'consultar-pessoa', component: PessoaConsultaComponent },
  { path: 'cadastrar-pessoa', component: PessoaManterComponent },
  { path: 'alterar-pessoa/:id', component: PessoaManterComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes) ],
  exports: [ RouterModule ]
})
export class PessoaRoutingModule { }
