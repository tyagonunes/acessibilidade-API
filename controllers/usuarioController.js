var Usuario = require('../models/usuario');

exports.save = function (nome, senha, callback) {
    Usuario.findOne({'nome':nome}, function(erro, usuario){
        if(erro) {
            callback('Deu erro');
        }else if (usuario){
            callback('Usuario já existe');
        }else {
            var novoUsuario = new Usuario;
            novoUsuario.nome = nome;
            novoUsuario.senha = novoUsuario.gerarSenha(senha);
            novoUsuario.token = novoUsuario.gerarToken(nome, senha);
            novoUsuario.criacao = new Date();
            novoUsuario.save(function(erro, usuario){
                if(erro) {
                    callback('Erro');
                }else {
                    callback(usuario);
                }
            })
        }
    })
}

exports.login = function(nome, senha, callback) {
    
    Usuario.findOne({'nome':nome}, function(erro, usuario) {
        if(erro) {
            callback('Deu erro')
        }else if (usuario) {
            if(usuario.validarSenha(senha)) {
                resp = {success: true, data:usuario.token, message:'Usuário encontrado'};
                callback(resp);    
            }else {
                callback('Senha incorreta')
            }
        }else{
            callback('Usuário inexistente')
        }
    });
}


exports.list = function(token, callback) {
    Usuario.findOne({'token': token}, function(erro, usuario){
        if(erro) {
            callback('Deu erro')
        }else if (usuario) {
            callback({'nome':usuario.nome});
        }else {
            callback('Usuário não encontrado');
        }
    });
}


exports.listAll = function (callback) {
	Usuario.find({}, function(error, usuarios){
		if(error) {
			callback({success: false, data:[] ,message: 'Não foi possivel salvar usuário'});
		}
		else {
			resp = {success: true, data:usuarios, message:'Lista de usuarios'};
			callback(resp)
		}
	});
}

exports.deleteUser = function (id, callback) {
    Usuario.findById(id, function(error, usuario){
        if(error) {
            //resp1 = {success: false, data:{}, message:'Não foi possivel excluir usuário'};
			callback({error:'Não foi possivel excluir usuário'});
		}else {
            usuario.remove(function(error){
				if (!error) {
					callback({success: true, data:{}, message:'Usuário excluido com sucesso'});
				}
			});
        }
    });
}