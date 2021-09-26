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

    var msg = req.query.msg;

    var client = app.config.dbConnection;
    var jogoDAO = new app.application.models.JogoDAO(client);

    jogoDAO.iniciaJogo(req.session.usuario, req.session.casa, msg,req, res);
};

module.exports.ordenar_acao_suditos = function(app, req, res){
    var dadosForm = req.body;
    var client = app.config.dbConnection;
    var jogoDAO = new app.application.models.JogoDAO(client);
    var tempo = 0;
    var date = new Date();

    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var validationErrors = req.validationErrors();

    if(validationErrors){
        res.redirect('/jogo?msg=A');
        return;
    }

    switch(dadosForm.acao){
        case '1': tempo = 1 * 60 * 60000;
        case '2': tempo = 2 * 60 * 60000;
        case '3': tempo = 5 * 60 * 60000;
        case '4': tempo = 5 * 60 * 60000;
        default: console.log('default...');
    };

    dadosForm.usuario = req.session.usuario;
    dadosForm.tempo = tempo + date.getTime();

    jogoDAO.acao(dadosForm);

    res.redirect('/jogo?msg=B');

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
