module.exports = function(ptFeat, bboxFeat) {
	var fs = []
	var props = ptFeat.properties
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	var pts = ptFeat.geometry.coordinates
	pts.forEach(function(pt) {
		if(pt[0] >= xMin && pt[0] <= xMax && pt[1] >= yMin && pt[1] <= yMax) {
			fs.push({type: 'Feature', properties: props, geometry: {type: 'Point', coordinates: pt }})
		}
	})
	if(fs.length !== 0) { return fs }
	else { return false }
}
