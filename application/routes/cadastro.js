module.exports = function(app){
    app.get('/cadastro', (req, res)=>{
        app.application.controllers.cadastro.getCadastro(app, req, res);
    })
}