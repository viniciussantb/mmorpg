module.exports.getJogo = function(app, req, res){
    if(req.session.authorized !== true){
        res.render('index', {validationErrors : {}});
        return
    }

    var client = app.config.dbConnection;
    var jogoDAO = new app.application.models.JogoDAO(client);

    jogoDAO.iniciaJogo(req.session.usuario, req.session.casa, req, res);
};

module.exports.sair = function(app, req, res){
    req.session.destroy(function(err){
        res.render('index', {validationErrors : {}});
    });
};