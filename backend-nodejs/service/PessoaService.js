const PessoaRepository = require('../repository/PessoaRepository');

/* Classe que faz a lógica de negócio, validações, etc. 
  Busca dados da Repository/Dao e devolve o resultado pra controller
  Banco de Dados < Repository < SERVICE < Controller < Frontend
  Banco de Dados > Repository > SERVICE > Controller > Frontend
*/
class PessoaService {

  // Busca todas as pessoas que estão cadastradas e devolve
  async obterTodas() {
    const listaPessoas = await PessoaRepository.find().exec();
    return listaPessoas;
  }

  // Busca uma pessoa pelo id e devolve
  async obterPorId(pessoaId) {
    const pessoa = await PessoaRepository.findById(pessoaId).exec();
    return pessoa;
  }

  // Valida e cria uma pessoa
  async criarPessoa(pessoa) {
    this.validarPessoa(pessoa);
		const pessoaCriada = await PessoaRepository.create(pessoa);
		return pessoaCriada;
  }

  // Valida e atualiza uma pessoa
  async atualizarPessoa(pessoaId, atualizacoes) {
    const pessoaCadastrada = this.obterPorId(pessoaId);
    if(!pessoaCadastrada) {
      throw 'Pessoa informada não encontrada no banco de dados';
    }
    this.validarPessoa(atualizacoes);
		const pessoaAtualizada = await PessoaRepository.updateOne({_id: pessoaId}, atualizacoes);
		return pessoaAtualizada
  }

  // deleta uma pessoa
  async deletarPessoa(pessoaId) {
    const pessoaCadastrada = this.obterPorId(pessoaId);
    if(!pessoaCadastrada) {
      throw 'Pessoa informada não encontrada no banco de dados';
    }
		await PessoaRepository.deleteOne({ _id: pessoaId })
  }

  // Valida os dados de uma pessoa
  validarPessoa(pessoa) {
    if(!pessoa.nome) {
      throw 'O nome da pessoa é obrigatório';
    }
    if(!pessoa.sobrenome){
      throw 'O sobrenome da pessoa é obrigatório';
    }
  }
	
}

module.exports = new PessoaService();