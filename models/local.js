var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var localSchema = new Schema({
	nome: String,
	latitude: Number,
	longitude: Number,
	tipo: String,
	descricao: String,
	criacao: Date,
	acessos: [{type: String}]

});

module.exports = mongoose.model('Local', localSchema);