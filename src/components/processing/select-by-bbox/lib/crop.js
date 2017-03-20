var intersect = require('turf-intersect')
var pointIsInside = require('./point-is-inside')
var multiPointsInside = require('./multipoint-is-inside')
var line = require('./line')

module.exports = function(i, feats, bbox, toKeep, msg, callback) {
	cropLoop(i, feats, bbox, toKeep, msg, function(r) { callback(r) })
}

function cropLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) { int.properties = f.properties; toKeep.push(int) }
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts) {
				pts.forEach(function(pt) { toKeep.push(pt) })
			}
		} else if(gt === 'LineString' || gt === 'MultiLineString') {
			var newF = line.crop(f, bbox)
			if(newF) { toKeep.push(newF) }
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				cropLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			cropLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	} 
} 
