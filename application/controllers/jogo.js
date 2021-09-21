module.exports.getJogo = function(app, req, res){
    if(req.session.authorized){
        res.render('jogo');
    }else{
        res.render('index', {validationErrors : {}});
    }
};

module.exports.sair = function(app, req, res){
    req.session.destroy(function(err){
        res.render('index', {validationErrors : {}});
    });
};