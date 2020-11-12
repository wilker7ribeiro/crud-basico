import { Component } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pessoa-manter',
  templateUrl: './pessoa-manter.component.html',
  styleUrls: ['./pessoa-manter.component.scss']
})
export class PessoaManterComponent {
  pessoaId: string;
  formPessoa: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.formPessoa = this.formBuilder.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: [''],
      dataNascimento: ['']
    });

    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      filter(pessoaId => !!pessoaId),
      tap(pessoaId => this.pessoaId = pessoaId),
      switchMap(pessoaId => this.pessoaService.getById(pessoaId)),
    ).subscribe(pessoa => {
      this.formPessoa.patchValue(pessoa);
    });
  }

  salvar() {
    if (!this.formPessoa.valid) { return; }
    const formValue = this.formPessoa.getRawValue();
    const payload = { ...formValue, _id: this.pessoaId };
    if (this.pessoaId) {
      this.atualizarPessoa(payload);
    } else {
      this.criarPessoa(payload);
    }
  }


  private criarPessoa(payload: Pessoa) {
    this.pessoaService.create(payload).subscribe(() => {
      this.toastr.success('Pessoa criada com sucesso!', 'Sucesso');
      this.router.navigate(['../consultar-pessoa'], { relativeTo: this.route });
    });
  }

  private atualizarPessoa(payload: Pessoa) {
    this.pessoaService.update(this.pessoaId, payload).subscribe(() => {
      this.toastr.success('Pessoa alterada com sucesso!', 'Sucesso');
      this.router.navigate(['../../consultar-pessoa'], { relativeTo: this.route });
    });
  }
}
