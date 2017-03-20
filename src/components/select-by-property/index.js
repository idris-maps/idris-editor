var html = require('./lib/html')
var ctrl = require('./lib/ctrl')
var getBy = require('./lib/get-by')
var Emitter = require('events').EventEmitter
var geo = require('../utils/geo')
var save = require('../utils/save')


module.exports = function(state, callback) {
	var config = { divId: 'root', feats: state.data.features }
	var evt = new Emitter()
	config.props = geo.getAllProperties(config.feats)
	html.init(config, function() {
		ctrl.init(evt)
	})

	evt.on('property', function(prop) {
		config.prop = prop
		config.values = geo.getUniqPropertyValues(config.feats, prop)
		if(geo.numericValues(config.feats, prop)) {
			html.num(config, function() {
				ctrl.num(evt)
			})
		} else {
			html.notNum(config, function() {
				ctrl.notNum(evt)
			})
		}
	})

	evt.on('values', function(values) {
		config.values = values
		var col = getBy.values(config)
		state.page = 'continue'
		state.newdata = col
		state.evt.emit('continue', state)
		save.json('selected-by-property.json', col)
	})

	evt.on('rule', function(resp) {
		config.rule = resp 
		var col = getBy.rule(config)
		state.page = 'continue'
		state.newdata = col
		state.evt.emit('continue', state)
		save.json('selected-by-property.json', col)
	})
}
