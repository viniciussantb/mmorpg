module.exports = function(app){
	app.get('/', function(req, res){
		app.application.controllers.home.getIndex(app, req, res);
	});

	app.post('/authentication', (req, res)=>{
		app.application.controllers.home.authentication(app, req, res);
	});
}