var L = require('leaflet')
var Collection = require('./Collection')

module.exports = function(divId, data, callback) {
	var map = L.map(divId)
	var col = new Collection(data)
	window.col = col
	col.group.addTo(map)
	map.fitBounds(col.getBounds())
	callback(map, col)
}


function keep(e) {
	if(e.target.options.color === '#5C8590') { e.target.setStyle({ color: '#E79D92' }) }
	else { e.target.setStyle({ color: '#5C8590' }) }
}



