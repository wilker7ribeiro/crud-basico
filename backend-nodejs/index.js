const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PessoaController = require('./controller/PessoaController');

// Esse arquivo todo pode ignorar por enquanto
// o que ele faz é se conectar com o banco de dados e subir o servidor
// isso os frameworks geralmente vão faze isso automaticamente pra você

app.use(bodyParser.json());


// se cria conexão com o banco
const dbName = 'crud-pessoa';
const dbUser = 'sistema';
const dbPassword = 'admin123'
mongoose.connect(`mongodb://${dbUser}:${dbPassword}@ds243212.mlab.com:43212/${dbName}?retryWrites=false`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

  // Configura CORS (um negócio de segurança de requisições)
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
		next()
	})
	
  // Carrega o Pessoa Controller
  PessoaController(app);


	// Interceptador de error
	app.use((err, req, res, next) => {
		return res.status(500).json({
			status: 'error',
			message: err.message
		});
	});
	

  // Sobe o servidor na porta configurada (default 8000)
	let port = process.env.PORT || 8000;
  app.listen(port);

  console.log('Aplicação ouvindo na porta ' + port)
});