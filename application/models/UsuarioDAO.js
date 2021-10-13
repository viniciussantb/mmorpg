var crypto = require('crypto');

function UsuarioDAO(client){
    this._client = client;
    this._client.connect();
    this._db = this._client.db('got');
};

UsuarioDAO.prototype.saveCadastro = function(usuario){
    const usuarios = this._db.collection('usuarios');

    usuario.senha = crypto.createHash("md5").update(usuario.senha).digest("hex");

    usuarios.insertOne(usuario,(err, result) => {
        if(err) throw err;
        console.log(result + 'Inserted into the collection usuarios.');
    });
};

UsuarioDAO.prototype.authentication = function(bodydata, req, res){
    var username = bodydata.usuario;
    var password = crypto.createHash("md5").update(bodydata.senha).digest("hex");;

    const usuarios = this._db.collection('usuarios');
    usuarios.find({
        "usuario": {$eq : username},
        "senha": {$eq : password}
    }).toArray(function(err, result){
        if(err) throw err;

        if(result[0] != undefined){
            req.session.authorized = true;
            
        }if(req.session.authorized){
            req.session.usuario = result[0].usuario;
            req.session.casa = result[0].casa;

            res.redirect('jogo');
        }else{
            res.render('index', {validationErrors : {}});
        }
    });


};

module.exports = function(){
    return UsuarioDAO;
};