function UsuarioDAO(client){
    this._client = client;
    this._client.connect();
    this._db = this._client.db('got');
};

UsuarioDAO.prototype.saveCadastro = function(usuario){
    const usuarios = this._db.collection('usuarios');

    usuarios.insert(usuario,(err, result) => {
        if(err) throw err;

        console.log('Inserted into the collection usuarios.')
        this._client.close();
    });
};

module.exports = function(){
    return UsuarioDAO;
};