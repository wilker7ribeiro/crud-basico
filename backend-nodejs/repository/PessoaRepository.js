
const mongoose = require('mongoose');

const PessoaRepository = mongoose.model('Pessoa', { 
    nome: String,
    sobrenome: String,
    cpf: String,
    dataNascimento: Date
});

module.exports = PessoaRepository;