var msg = require('./msg')
var verify = require('./verify-dropped')

module.exports = function(input, evt) {
	input.onchange = function(e) {
		verify(input.files[0], evt)
	}
}
