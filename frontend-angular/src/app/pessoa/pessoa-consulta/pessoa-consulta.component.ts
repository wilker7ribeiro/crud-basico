import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pessoa } from '../pessoa';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pessoa-consulta',
  templateUrl: './pessoa-consulta.component.html',
  styleUrls: ['./pessoa-consulta.component.scss']
})
export class PessoaConsultaComponent implements OnInit {

  displayedColumns = ['nome', 'sobrenome', 'cpf', 'dataNascimento' , 'acoes'];
  dataSource = [];

  constructor(
    private pessoaService: PessoaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) {

  }

  ngOnInit() {
    this.pessoaService.getAll().subscribe(data => this.dataSource = data);
  }


  editarPessoa(pessoa: Pessoa) {
    this.router.navigate(['../alterar-pessoa/' + pessoa._id], {relativeTo: this.route});
  }

  removerPessoa(pessoa: Pessoa, index) {
    this.pessoaService.delete(pessoa._id).subscribe(() => {
      this.toastr.success('Pessoa excluída com sucesso!', 'Sucesso');
      this.dataSource.splice(index, 1);
      this.dataSource = this.dataSource.slice();
    });
  }
}
