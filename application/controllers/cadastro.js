module.exports.getCadastro = function(app, req, res){
    res.render('cadastro', {validation : {}, dadosForm : {}});
}

module.exports.saveCadastro = function(app, req, res){

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();

    var errors = req.validationErrors();
    var dadosForm = req.body;
    
    var connection = app.config.dbConnection;
    var usuarioDAO = new app.application.models.UsuarioDAO(connection);
    var jogoDAO = new app.application.models.JogoDAO(connection);

    usuarioDAO.saveCadastro(dadosForm);
    jogoDAO.gerarParametros(dadosForm.usuario);

    if(errors){
        res.render('cadastro', {validation : errors, dadosForm : dadosForm});
        return;
    };

    res.redirect('/');
};