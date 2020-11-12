const PessoaService = require('../service/PessoaService');
const asyncHandler = require('express-async-handler')

/* Classe responsável por fazer a comunicação externa ao servidor. Geralmente expondo uma API Rest.
  Na grande maioria dos casos é comunicação com o frontend, mas pode ser outro servidor que esteja chamando
  Recebe dados da requisição, envia pra service e devolve o resultado:
  Banco de Dados < Repository < Service < CONTROLLER < Frontend
  Banco de Dados > Repository > Service > CONTROLLER > Frontend

 Utiliza requisições REST que é basicamente mapeamento de URLs e tipos de requisições, geralmente as seguintes:
   GET: buscar alguma informação
   POST: incluir alguma informação
   PUT: alterar alguma informação
   DELETE: excluir alguma informação
*/
function PessoaController(app){

  // Escuta requisições do tipo GET em /pessoas
  // Chama o serviço de listar todas as pessoas
  app.get('/pessoas', asyncHandler(async (req, res, next) => {
    res.json(await PessoaService.obterTodas())
  }))

  // Escuta requisições do tipo GET em /pessoa/<pessoaId>
  // Chama o serviço de buscar uma pessoa pelo id passado pela url (ex: /pessoa/2)
  app.get('/pessoa/:id', asyncHandler(async (req, res, next) => {
    res.json(await PessoaService.obterPorId(req.params.id))
  }))

  // Escuta requisições do tipo POST em /pessoas
  // Chama o serviço de criar uma pessoa que foi passado no corpo da requisição
  app.post('/pessoa', asyncHandler(async (req, res, next) => {
    res.json(await PessoaService.criarPessoa(req.body));
  }))

  // Escuta requisições do tipo PUT em /pessoas
  // Chama o serviço de alterar uma pessoa com os dados passados no corpo da requisição
  app.put('/pessoa/:id', asyncHandler(async (req, res, next) => {
    res.json(await PessoaService.atualizarPessoa(req.params.id, req.body));
  }))

  // Escuta requisições do tipo DELETE /pessoa/<pessoaId>
  // Chama o serviço de excluir uma pessoa pelo id passado pela url (ex: /pessoa/2)
  app.delete('/pessoa/:id', asyncHandler(async (req, res, next) => {
    res.json(await PessoaService.deletarPessoa(req.params.id));
  }))

}

module.exports = PessoaController;