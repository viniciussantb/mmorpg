function JogoDAO(client){
    this._client = client;
    this._client.connect();
    this._db = this._client.db('got');
    this._collectionJogo = this._db.collection('jogo');
    this._collectionAcao = this._db.collection('acao');
};

JogoDAO.prototype.gerarParametros = function(usuario){

    this._collectionJogo.insertOne({
        usuario : usuario,
        moedas : 15,
        suditos : 10,
        temor : Math.floor(Math.random() * 1000),
        sabedoria : Math.floor(Math.random() * 1000),
        comercio : Math.floor(Math.random() * 1000),
        magia : Math.floor(Math.random() * 1000),

    });
};

JogoDAO.prototype.iniciaJogo = function(usuario, casa, msg, req, res){
    this._collectionJogo.find({
        "usuario" : {$eq : usuario}
    }).toArray(function(err, result){
        if(err) throw err;
        
        res.render('jogo', {
            casa: casa,
            jogo: result[0],
            msg : msg
        });
    });
};

JogoDAO.prototype.acao = function(dadosForm){
    this._collectionAcao.insertOne(dadosForm);
};

module.exports = function(){
    return JogoDAO;
};
