const { suditos } = require("../controllers/jogo");

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

JogoDAO.prototype.acao = function(dadosForm, req, res){
    var error = false;
    this._collectionJogo.find({
        usuario : dadosForm.usuario
    }).toArray(function(err, result){
        if(err) throw err;

        console.log(result[0]);
        if(result[0].suditos < dadosForm.quantidade){
            error = true;
            res.redirect('/jogo?msg=D');
            return;
        }else if(result[0].moedas < dadosForm.gold){
            error = true;
            res.redirect('/jogo?msg=E');
            return;
        }
    });

    if(!error){
        this._collectionJogo.updateOne(
            {usuario : dadosForm.usuario},
            {$inc : {moedas: dadosForm.gold, suditos: (-dadosForm.quantidade)}}
        )
        this._collectionAcao.insertOne(dadosForm);
        res.redirect('/jogo?msg=B');
    };

};

JogoDAO.prototype.getPergaminhos = function(usuario, req, res){
    var date = new Date();
    var momento_atual = date.getTime();

    this._collectionAcao.find({
        usuario : usuario,
        tempo : {$gt: momento_atual}
    }).toArray(function(err, result){
        res.render('pergaminhos', {pergaminhos : result});
    });
};

module.exports = function(){
    return JogoDAO;
};
