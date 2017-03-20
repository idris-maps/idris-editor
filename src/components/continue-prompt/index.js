var xml = require('xml-string')

module.exports = function(state) {
	html(state.newdata.features.length, function() {
		ctrl(state)
	})
}

function html(n, callback) {
	var root = xml.create('div')
	root.c('p').d('The new version has ' + n + ' features.')
	var p = root.c('p')
	p.c('b').d('Continue editing')
	root.c('button').a({ id: 'continue-same' }).d('The original file')
	root.c('button').a({ id: 'continue-new' }).d('The edited file')
	root.c('button').a({ id: 'new-file' }).d('Edit a new file')
	document.getElementById('root').innerHTML = root.inner()
	callback()
}

function ctrl(state) {
	document.getElementById('continue-same').onclick = function() {
		state.newdata = undefined
		state.page = 'cancel'
		state.evt.emit('cancel', state)
	}
	document.getElementById('continue-new').onclick = function() {
		var nd = state.newdata
		state.data = nd
		state.newdata = undefined
		state.page = 'cancel'	
		state.evt.emit('cancel', state)	
	}
	document.getElementById('new-file').onclick = function() {
		state.page = 'restart'
		state.evt.emit('restart', state)
	}
}
