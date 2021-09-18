module.exports = function(app){
    app.get('/jogo', (req, res)=>{
        res.render('../views/jogo');
    });
}