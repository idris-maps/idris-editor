var verify = require('./verify-dropped')

module.exports = function(evt) {
	if(window.FileReader) {
		var dz = document.getElementById('drop-zone')
		rmDefault(dz)
		dz.ondrop = function(e) { whenDrop(e, evt) } 
	} else {
		document.getElementById('msg').innerHTML = 'Your browser does not support the HTML5 FileReader.'
	}
	document.getElementById('cancel').onclick = function() {
		evt.emit('cancel')
	}
}

function whenDrop(e, evt) {
	e.preventDefault()
	verify(e.dataTransfer.files[0], evt)
}

function rmDefault(el) {
	el.ondragover = function(e) {
		e.preventDefault()
		return false
	}
	el.ondragenter = function(e) {
		e.preventDefault()
		return false
	}
}

