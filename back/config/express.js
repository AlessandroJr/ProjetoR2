
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const consign = require('consign');

module.exports = () => {
	const app = express();

	// SETANDO VARIÁVEIS DA APLICAÇÃO
	app.set('port', process.env.PORT || config.get('server.port'));

	// MIDDLEWARES
	app.use(bodyParser.json());

	app.all('/*', function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		next();
	});

	app.use(cors());
	app.options('*', cors());

	// ENDPOINTS
	consign({ cwd: 'api' })
		.then('data')
		.then('controllers')
		.then('routes')
		.then('util')
		.into(app);

	return app;
};
