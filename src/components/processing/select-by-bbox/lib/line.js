var lineCrop = require('./line-crop')

exports.within = function(feat, bboxFeat) {
	var bb = bbox(bboxFeat)
	if(feat.geometry.type === 'LineString') {
		var pts = feat.geometry.coordinates
		return all(pts, bb)
	} else if(feat.geometry.type === 'MultiLineString') {
		var pts = []
		var c = feat.geometry.coordinates
		c.forEach(function(part) {
			part.forEach(function(pt) { pts.push(pt) })
		})
		return all(pts, bb)
	}
}

exports.intersect = function(feat, bboxFeat) {
	var bb = bbox(bboxFeat)
	if(feat.geometry.type === 'LineString') {
		var pts = feat.geometry.coordinates
		return one(pts, bb)
	} else if(feat.geometry.type === 'MultiLineString') {
		var pts = []
		var c = feat.geometry.coordinates
		c.forEach(function(part) {
			part.forEach(function(pt) { pts.push(pt) })
		})
		return one(pts, bb)
	}
}

exports.crop = function(feat, bboxFeat) {
	var bbLine = bboxLine(bboxFeat)
	var bb = bbox(bboxFeat)
	var props = feat.properties
	if(feat.geometry.type === 'LineString') {
		var lines = lineCrop(feat.geometry.coordinates, bbLine, bb)
		if(lines.length === 1) { 
			var geo = { type: 'LineString', coordinates: lines[0] }
		} else if(lines.length > 1) {
			var geo = { type: 'MultiLineString', coordinates: lines[0] }
		} else { var geo = false }
	} else {
		var endLines = []
		var parts = feat.geometry.coordinates
		parts.forEach(function(c) {
			var lines = lineCrop(c, bbLine, bb)
			lines.forEach(function(l) { endLines.push(l) })
		})
		if(endLines.length === 1) { 
			var geo = { type: 'LineString', coordinates: endLines[0] }
		} else if(endLines.length > 1) {
			var geo = { type: 'MultiLineString', coordinates: endLines }
		} else { var geo = false }
	}	
	if(geo) { return { type: 'Feature', properties: props, geometry: geo } }
	else { return null }
}

function all(pts, bb) {
	var r = true
	for(i=0;i<pts.length;i++) {
		if(!ptIsIn(pts[i], bb)) { r = false; break }
	}
	return r
}

function one(pts, bb) {
	var r = false
	for(i=0;i<pts.length;i++) {
		if(ptIsIn(pts[i], bb)) { r = true; break }
	}
	return r
}

function bbox(f) {
	var bboxC = f.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	return {
		x: { min: xMin, max: xMax },
		y: { min: yMin, max: yMax }
	}
}

function bboxLine(f) {
	var bboxC = f.geometry.coordinates
	var c = bboxC[0]
	return {
		type: 'Feature', properties: {},
		geometry: {
			type: 'LineString', coordinates: c			
		}

	}
}

function ptIsIn(pt, bb) {
	if(pt[0] > bb.x.min && pt[0] < bb.x.max && pt[1] > bb.y.min && pt[1] < bb.y.max) {
		return true
	} else {
		return false
	}
}
