var html = require('./lib/html')
var ctrl = require('./lib/ctrl')
module.exports = function(state) {
	html(function() {
		ctrl(state)
	})
}
