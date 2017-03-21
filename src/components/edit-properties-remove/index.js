var geo = require('../utils/geo')
var html = require('./lib/html')
var ctrl = require('./lib/ctrl')
var save = require('../utils/save')
var Emitter = require('events').EventEmitter
var process = require('./lib/process')

module.exports = function(state) {
	var divId = 'root'
	var data = state.data
	var evt = new Emitter()
	var props = geo.getAllProperties(data.features)

	html.init(divId, props, function() {
		ctrl.init(evt)
	})

	evt.on('props-to-keep', function(props) {
		process(data.features, props, function(feats) { 
			state.newdata = {type: 'FeatureCollection', features: feats}
			state.page = 'continue'
			state.evt.emit('continue', state)
			save.json('edited.json', state.newdata)
		})
	})

	evt.on('cancel', function() {
		state.page = 'cancel'
		state.evt.emit('cancel', state)
	})
}
