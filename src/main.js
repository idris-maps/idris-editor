var drop = require('./components/drop-zone-geojson-simple')
var mainMenu = require('./components/main-menu')
var bboxMenu = require('./components/bbox-menu')
var continuePrompt = require('./components/continue-prompt')

var Emitter = require('events').EventEmitter
var evt = new Emitter()
var state = { evt: evt }

window.onload = function() {
	init(state)
}

state.evt.on('got-data', function(state) { mainMenu(state) })
state.evt.on('select-by-bbox', function(state) { bboxMenu(state) })
state.evt.on('select-by-prop', function(state) { console.log(state) })
state.evt.on('select-by-click', function(state) { console.log(state) })
state.evt.on('prop-add', function(state) { console.log(state) })
state.evt.on('prop-rem', function(state) { console.log(state) })
state.evt.on('bbox-draw', function(state) {
	require.ensure(['./components/select-by-bbox-map'], function(require) {
		var bboxDraw = require('./components/select-by-bbox-map') 
		bboxDraw(state)
	})
})
state.evt.on('bbox-vals', function(state) { console.log(state) })
state.evt.on('cancel', function(state) { mainMenu(state) })
state.evt.on('continue', function(state) { console.log('continue'); continuePrompt(state) })

function init(state) {
	drop('root', function(data) {
		state.page = 'geojson-loaded'
		state.data = data
		state.evt.emit('got-data', state)
	})
}
