module.exports = function(app){
    app.get('/cadastro', (req, res)=>{
        app.application.controllers.cadastro.getCadastro(app, req, res);
    })

    app.post('/save_cadastro', (req, res) =>{
        app.application.controllers.cadastro.saveCadastro(app, req, res);
    });
}