var Local = require('../models/local');



exports.save = function (nome, latitude, longitude, tipo, descricao, acessos, callback) {

	new Local({
		'nome': nome,
		'latitude': latitude,
		'longitude': longitude,
		'tipo': tipo,
		'descricao': descricao,
		'criacao': new Date(),
		'acessos': acessos

	}).save(function(error, local) {

		if(error) {
			callback({error: 'Não foi possivel salvar local'});
		}
		else {
			resp = {success: true, data:[], message:'Local cadastrado com sucesso'};
			callback(resp);
		}
	});
}

exports.list = function (callback) {
	Local.find({}, function(error, locais){
		if(error) {
			callback({error: 'Não foi possivel salvar usuário'});
		}
		else {
			resp = {success: true, data:locais, message:'Lista de locais'};
			callback(resp)
		}
	});
}


exports.delete = function (id, callback) {
	Local.findById(id, function(error, local){
		if(error) {
			callback({error: 'Não foi possivel excluir local'});
		}
		else {
			local.remove(function(error){
				if (!error) {
					resp = {success: true, data:{}, message:'Local excluido com sucesso'};
					callback(resp);
				}
			})
		}
	});
}



exports.update = function (id, nome, latitude, longitude, tipo, descricao, acessos, callback) {

	Local.findById(id, function(error, local) {
		
		if (nome) { local.nome = nome; }

		if (latitude) { local.latitude = latitude; }

		if (longitude) { local.longitude = longitude; }

		if (tipo) { local.tipo = tipo; }

		if (descricao) { local.descricao = descricao; }

		if (acessos) { local.acessos = acessos; }

		local.save(function(error, local) {
			if(error) {
				callback({error: "Não foi possivel alterar o local"});
			} else {
				resp = {success: true, data:local, message:'Editado com sucesso'};
				callback(resp);
			}
		});

	});
}