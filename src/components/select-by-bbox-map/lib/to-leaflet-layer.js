module.exports = function(f, L) {
	var gt = f.geometry.type
	var c = f.geometry.coordinates
	if(gt === 'Point') {
		console.log([L.circleMarker([c[1], c[0]], { radius: 10 })])
	} else if(gt === 'MultiPoint') {
		var r = []
		c.forEach(function(pt) {
			var l = L.circleMarker([pt[1], pt[0]], { radius: 10 })
			r.push(l)
		})
		console.log(r)
	} else {
		console.log(L.GeoJSON(f))
	}
}

