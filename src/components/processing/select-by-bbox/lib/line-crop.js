var inter = require('idris-line-intersect')

module.exports = function(lineCoords, bboxLine, bb) {
	var lineParts = []
	lineCoords.forEach(function(pt, i) {
		if(i !== 0) {
			var prev = lineCoords[i-1]
			var ptIn = isIn(pt, bb)
			var prevIn = isIn(prev, bb)
			if(ptIn && prevIn) { lineParts.push([prev, pt]) }
			else if(ptIn) {
				inter.coordinates([prev, pt], bboxLine.geometry.coordinates, function(pts) {
					lineParts.push([pts[0], pt])
				})
			} else if(prevIn) {
				inter.coordinates([prev, pt], bboxLine.geometry.coordinates, function(pts) {
					lineParts.push([prev, pts[0]])
				})
			} else {
				inter.coordinates([prev, pt], bboxLine.geometry.coordinates, function(pts) {
					if(pts) { lineParts.push([pts[0], pts[1]]) }
				})
			}
		}
	})
	var currLine = []
	var lines = []
	lineParts.forEach(function(l,i) {
		if(i === 0) { currLine = [l[0], l[1]] }
		else {
			if(equal(currLine[currLine.length-1], l[0])) {
				currLine.push(l[1])
			} else {
				lines.push(currLine)
				currLine = [l[0], l[1]]
			}
		}
	})
	if(currLine.length !== 0) { lines.push(currLine) }
	return lines
}

function equal(pt1, pt2) {
	if(pt1[0] === pt2[0] && pt1[1] === pt2[1]) {
		return true
	} else {
		return false
	}
}

function isIn(pt, bb) {
	if(pt[0] >= bb.x.min && pt[0] <= bb.x.max && pt[1] >= bb.y.min && pt[1] <= bb.y.max) {
		return true
	} else {
		return false
	}
}
