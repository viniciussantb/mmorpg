module.exports.getIndex = function(app, req, res){
    res.render('index', {validationErrors : {}});
};

module.exports.authentication = (app, req, res)=>{
    var bodydata = req.body;

    req.assert('usuario', 'Username cant be empty!').notEmpty();
    req.assert('senha', 'Password cant be empty!').notEmpty();

    var validationErrors = req.validationErrors();

    if(validationErrors){
        res.render('index', {validationErrors : validationErrors});
        return;
    }

    res.send('authentication method...');
};