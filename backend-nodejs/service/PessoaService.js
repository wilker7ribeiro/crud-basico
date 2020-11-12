const PessoaRepository = require('../repository/PessoaRepository');

class PessoaService {
  async obterTodas() {
    const listaPessoas = await PessoaRepository.find().exec();
    return listaPessoas;
  }
  async obterPorId(pessoaId) {
    const pessoa = await PessoaRepository.findById(pessoaId).exec();
    return pessoa;
  }
  async criarPessoa(pessoa) {
    this.validarPessoa(pessoa);
		const pessoaCriada = await PessoaRepository.create(pessoa);
		return pessoaCriada;
  }
  async atualizarPessoa(pessoaId, atualizacoes) {
    const pessoaCadastrada = this.obterPorId(pessoaId);
    if(!pessoaCadastrada) {
      throw 'Pessoa informada não encontrada no banco de dados';
    }
    this.validarPessoa(atualizacoes);
		const pessoaAtualizada = await PessoaRepository.updateOne({_id: pessoaId}, atualizacoes);
		return pessoaAtualizada
  }
  async deletarPessoa(pessoaId) {
    const pessoaCadastrada = this.obterPorId(pessoaId);
    if(!pessoaCadastrada) {
      throw 'Pessoa informada não encontrada no banco de dados';
    }
		await PessoaRepository.deleteOne({ _id: pessoaId })
  }

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