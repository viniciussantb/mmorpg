var authorization = function(app, req, res){
    if(req.session.authorized !== true){
        res.render('index', {validationErrors : {}});
        return
    }
}

module.exports.getJogo = function(app, req, res){
    if(req.session.authorized !== true){
        res.render('index', {validationErrors : {}});
        return
    }

    var comando_invalido = "N";

    if(req.query.comando_invalido == "S"){
        comando_invalido = "S";
    }

    var client = app.config.dbConnection;
    var jogoDAO = new app.application.models.JogoDAO(client);

    jogoDAO.iniciaJogo(req.session.usuario, req.session.casa, comando_invalido,req, res);
};

module.exports.ordenar_acao_suditos = function(app, req, res){
    var dadosForm = req.body;

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var validationErrors = req.validationErrors();

    if(validationErrors){
        res.redirect('/jogo?comando_invalido=S');
        return;
    }

    res.redirect('/jogo');

};

module.exports.sair = function(app, req, res){
    req.session.destroy(function(err){
        res.render('index', {validationErrors : {}});
    });
};

module.exports.suditos = function(app, req, res){
    if(req.session.authorized !== true){
        res.render('index', {validationErrors : {}});
        return
    }

    res.render('aldeoes');
};

module.exports.pergaminhos = function(app, req, res){
    if(req.session.authorized !== true){
        res.render('index', {validationErrors : {}});
        return
    }

    res.render('pergaminhos');
};
