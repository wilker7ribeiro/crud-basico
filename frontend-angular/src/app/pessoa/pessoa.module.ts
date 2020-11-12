import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { PessoaConsultaComponent } from './pessoa-consulta/pessoa-consulta.component';
import { PessoaManterComponent } from './pessoa-manter/pessoa-manter.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { PessoaRoutingModule } from './pessoa-routing.module';

@NgModule({
  declarations: [
    PessoaConsultaComponent,
    PessoaManterComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    PessoaRoutingModule,
    NgxMaskModule.forChild()
  ],
  providers: []
})
export class PessoaModule { }
