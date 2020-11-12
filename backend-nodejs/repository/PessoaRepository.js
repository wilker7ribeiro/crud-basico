
const mongoose = require('mongoose');


/* Classe que faz a as operações com o banco de dados. 
  Geralmente os frameworks já entregam alguma coisa pronta, que é o caso do mongoose, ele já entrega métodos para salvar, editar, buscar.
  Por isso que não tem nada além do modelo definido.
  Busca dados do banco de dados e devove pra service:
  Banco de Dados < REPOSITORY < Service < Controller < Frontend
  Banco de Dados > REPOSITORY > Service > Controller > Frontend
*/

// Modelo Pessoa (mapeamento do banco de dados)
const PessoaModel = { 
    nome: String,
    sobrenome: String,
    cpf: String,
    dataNascimento: Date
}

// Repository Pessoa
const PessoaRepository = mongoose.model('Pessoa', PessoaModel);

module.exports = PessoaRepository;