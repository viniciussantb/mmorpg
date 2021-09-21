module.exports = function(app){
    app.get('/jogo', (req, res)=>{
        app.application.controllers.jogo.getJogo(app, req, res);
    });

    app.get('/sair', (req, res)=>{
        app.application.controllers.jogo.sair(app, req, res);
    });
};