module.exports = function(app){
	app.get('/', function(req, res){
		res.send('Bem vindo a sua app NodeJS!');
	});
}