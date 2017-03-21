var L = require('leaflet')
var L_Ctrl = require('./lib/leaflet-ctrl')
var ctrl = require('./lib/ctrl')
var html = require('./lib/html')
var process = require('../processing/select-by-bbox')
var Emitter = require('events').EventEmitter
var save = require('../utils/save')

module.exports = function(state, callback) {
	var evt = new Emitter()
	var map = L.map('map')
	switchView('map')
	var mapView = true
	window.onresize = function() { if(mapView) { switchView('map') } }
	var data = state.data
	var dataLayer = L.geoJSON(data, {color: '#437380'}).addTo(map)
	map.fitBounds(dataLayer.getBounds())

	var menu = new L_Ctrl(map)
	menu.setContent(html.draw, ctrl.draw(evt, map), {'text-align': 'center'})

	var rect
	evt.on('rect', function(bb, layer) {
		rect = layer
		menu.setContent(html.type, ctrl.type(evt, bb))
	})

	evt.on('type', function(bb, type) {
		var config = {
			progressId: 'progress',
			bbox: bb,
			type: type,
			feats: data.features,
			evt: evt
		}
		menu.setContent(html.process, null, {'text-align': 'center'})
		process(config)
	})

	evt.on('new-collection', function(col, name) {
		state.page = 'continue'
		state.newdata = col
		rmMap()
		state.evt.emit('continue', state)
		save.json(name, col)
	})
	
	evt.on('redraw', function() {
		map.removeLayer(rect)
		menu.setContent(html.draw, ctrl.draw(evt, map), {'text-align': 'center'})
	})
	
	evt.on('cancel', function() {
		state.page = 'cancel'
		rmMap()
		state.evt.emit('cancel', state) 
	})
	function rmMap() {
			switchView('root')
			mapView = false
			//map.remove()
			var el = document.getElementById('map')
			el.parentNode.removeChild(el)
			var newEl = document.createElement('div')
			newEl.id = 'map'
			document.body.appendChild(newEl)
	}
}

function switchView(id) {
	var m = document.getElementById('map')
	var r = document.getElementById('root')
	var h = window.innerHeight
	if(id === 'map') {
		m.style.display = 'block'
		r.style.display = 'none'
		m.style.height = (h - 80) + 'px'
	} else {
		r.style.display = 'block'
		m.style.display = 'none'
	}
}



