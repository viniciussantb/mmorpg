module.exports.getCadastro = function(app, req, res){
    res.render('cadastro', {validation : {}, dadosForm : {}});
}

module.exports.saveCadastro = function(app, req, res){
    console.log(req)

    req.assert('nome', 'Nome não pode ser vazio').notEmpty();
    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazio').notEmpty();
    req.assert('casa', 'Casa não pode ser vazio').notEmpty();

    var errors = req.validationErrors();
    var dadosForm = req.body;

    if(errors){
        res.render('cadastro', {validation : errors, dadosForm : dadosForm});
        return;
    };

    res.send(req.body);
};