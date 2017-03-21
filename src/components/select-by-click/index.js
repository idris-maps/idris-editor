
var html = require('./lib/html')
var ctrl = require('./lib/ctrl')
var L_ctrl = require('./lib/leaflet-ctrl')
var initMap = require('./lib/init-map') 


module.exports = function(state, callback) {
	var mapView = true
	switchView('map')
	window.onresize = function() { if(mapView) { switchView('map') } }
	initMap('map', state.data, function(map, layer) {
		var menu = new L_ctrl(map)
		menu.setContent(html.init, ctrl.init(state), { 'text-align': 'center' })
		map.once('click', function() {
			menu.setContent(html.download, ctrl.download(layer, state), { 'text-align': 'center' })
		})
		state.evt.on('saved-select-by-click', function(newData) {
			state.page = 'continue'
			state.newdata = newData
			rmMap()
			state.evt.emit('continue', state)
		})
		state.evt.on('cancel-select-by-click', function() {
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
	})
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
