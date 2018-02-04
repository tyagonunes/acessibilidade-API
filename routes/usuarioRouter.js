var express = require('express');
var router = express.Router();
var usuarioCotroller = require('../controllers/usuarioController');


function pegarToken(req, res, next) {
    var header = req.headers['authorization'];

    if(typeof header != 'undefined') {
        req.token = header;
        next();
    }else {
        res.sendStatus(403);
    }
}

router.post('/cadastrar', function(req, res){
    var nome = req.body.nome;
    var senha = req.body.senha;

    usuarioCotroller.save(nome, senha, function(resp){
        res.json(resp);
    });
});

router.post('/login', function(req, res){
    var nome = req.body.nome;
    var senha = req.body.senha;

    usuarioCotroller.login(nome,senha, function(resp){
        res.json(resp);
    })
});

router.get('/listar',pegarToken, function(req, res){
    var token = req.token;
    usuarioCotroller.list(token, function(resp) {
        res.json(resp);
    });
});


router.get('/listarAll', function(req, res){
    usuarioCotroller.listAll(function(resp) {
        res.json(resp);
    });
});

router.delete('/deleteUser/:id', function(req, res){
    var id = req.params['id'];

    usuarioCotroller.deleteUser(function(id, resp) {
        res.json(resp);
    });
});

module.exports = router;