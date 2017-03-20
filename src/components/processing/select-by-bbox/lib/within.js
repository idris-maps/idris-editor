var intersect = require('turf-intersect')
var pointIsInside = require('./point-is-inside')
var multiPointIsInside = require('./multipoint-is-inside')
var line = require('./line')

module.exports = function(i, feats, bbox, toKeep, msg, callback) {
	withinLoop(i, feats, bbox, toKeep, msg, function(r) { callback(r) })
}

function withinLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) {
				var same = isSame(int.geometry, f.geometry)
				if(same) { toKeep.push(f) }
			}
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts.length === f.geometry.coordinates.length) { toKeep.push(f) }
		} else if(gt === 'LineString' || gt === 'MultiLineString') {
			if(line.within(f,bbox)) { toKeep.push(f) }
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				withinLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			withinLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	}
}

function isSame(c1, c2) {
	var s1 = JSON.stringify(c1)
	var s2 = JSON.stringify(c2)
	return s1 === s2
} 
