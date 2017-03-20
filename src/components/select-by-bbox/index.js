var html = require('./lib/html')
var ctrl = require('./lib/ctrl')
var save = require('../utils/save')
var process = require('../processing/select-by-bbox')
var Emitter = require('events').EventEmitter

module.exports = function(state) {
console.log(state)
	var evt = new Emitter()
	var config = new Config('root', evt, state.data)

	html.bbox(config, function() {
		ctrl.bbox(config)
	})

	evt.on('type-chosen', function() {
		html.processing(config, function() {
			process(config)
		})
	})

	evt.on('bbox-chosen', function() {
		html.choose(config, function() {
			ctrl.choose(config)
		})
	})

	evt.on('new-collection', function(col) {
		state.page = 'continue'
		state.newdata = col
		state.evt.emit('continue', state)
		save.json(config.type + '.json', col)
	})
}

function Config(divId, evt, data) {
	var o = this
	o.divId = divId
	o.evt = evt
	o.type = null
	o.bbox = null
	o.feats = data.features,
	o.progressId = 'progress'
}
