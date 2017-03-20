module.exports = function(ptFeat, bboxFeat) {
	var pt = ptFeat.geometry.coordinates
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	if(pt[0] >= xMin && pt[0] <= xMax && pt[1] >= yMin && pt[1] <= yMax) {
		return true
	} else {
		return false
	}
}
