var crop = require('./lib/crop')
var intersect = require('./lib/intersect')
var within = require('./lib/within')

module.exports = function(config) {
	var msg = document.getElementById(config.progressId)
	var bbox = bbToFeat(config.bbox)
	if(config.type === 'crop') { 
		crop(0, config.feats, bbox, [], msg, function(toKeep) { done(config, toKeep, msg) }) 
	} else if(config.type === 'intersect') { 
		intersect(0, config.feats, bbox, [], msg, function(toKeep) { done(config, toKeep, msg) }) 
	} else {
		within(0, config.feats, bbox, [], msg, function(toKeep) { done(config, toKeep, msg) })
	}
}

function done(config, feats, msg) {
	msg.innerHTML = 'saving...'
	var n = config.type + '.json'
	config.evt.emit('new-collection', {type: 'FeatureCollection', features: feats}, n)
}

function bbToFeat(bb) {
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [[
				[bb[0], bb[1]],
				[bb[0], bb[3]],
				[bb[2], bb[3]],
				[bb[2], bb[1]],
				[bb[0], bb[1]]
			]]
		}
	}
}
/*
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

function intersectLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) { toKeep.push(f) }
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts) { toKeep.push(f)	}
		}
		var f = feats[i]
		var int = intersect(f,bbox)
		if(int) { toKeep.push(f) }
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				intersectLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			intersectLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	}
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



function isSame(c1, c2) {
	var s1 = JSON.stringify(c1)
	var s2 = JSON.stringify(c2)
	return s1 === s2
} 

function multiPointsInside(ptFeat, bboxFeat) {
	var fs = []
	var props = ptFeat.properties
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	var pts = ptFeat.geometry.coordinates
	pts.forEach(function(pt) {
		if(pt[0] > xMin && pt[0] < xMax && pt[1] > yMin && pt[1] < yMax) {
			fs.push({type: 'Feature', properties: props, geometry: {type: 'Point', coordinates: pt }})
		}
	})
	if(fs.length !== 0) { return fs }
	else { return false }
}

function pointIsInside(ptFeat, bboxFeat) {
	var pt = ptFeat.geometry.coordinates
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	if(pt[0] > xMin && pt[0] < xMax && pt[1] > yMin && pt[1] < yMax) {
		return true
	} else {
		return false
	}
}
*/
