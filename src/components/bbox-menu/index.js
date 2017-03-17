var xml = require('xml-string')

module.exports = function(state) {
	html(function() {
		ctrl(state)
	})
}

function html(callback) {
	var root = xml.create('div')
	root.c('button').a({ id: 'bbox-draw' }).d('Draw bounding box')
	root.c('button').a({ id: 'bbox-vals' }).d('Enter values')
	document.getElementById('root').innerHTML = root.inner()
	callback()
}

function ctrl(state) {
	addClick('bbox-draw', state)
	addClick('bbox-vals', state)
}

function addClick(id, state) {
	var el = document.getElementById(id)
	el.onclick = function() { 
		state.page = id
		state.evt.emit(id, state)
	}
}
