var html = require('./lib/html')
var init = require('./lib/init')
var verify = require('./lib/verify-dropped')
var Emitter = require('events').EventEmitter

module.exports = function(divId, callback) {
	var evt = new Emitter()
	html.init(divId, function() {
		init(evt)
		var browseBtn = document.getElementById('browse-btn')
		var input = document.getElementById('file-input')
		input.onchange = function(e) {
			verify(input.files[0], evt)
		}
		browseBtn.onclick = function() {
			input.click()
		}
	})
	evt.on('geojson-parsed', function(data) { callback(data) })
}
