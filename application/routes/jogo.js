module.exports = function(app){
    app.get('/jogo', (req, res)=>{
        app.application.controllers.jogo.getJogo(app, req, res);
    });

    app.get('/sair', (req, res)=>{
        app.application.controllers.jogo.sair(app, req, res);
    });

    app.get('/suditos', (req, res)=>{
        app.application.controllers.jogo.suditos(app, req, res);
    });

    app.get('/pergaminhos', (req, res)=>{
        app.application.controllers.jogo.pergaminhos(app, req, res);
    });

    app.post('/ordenar_acao_suditos', (req, res)=>{
        app.application.controllers.jogo.ordenar_acao_suditos(app, req, res);
    });
};