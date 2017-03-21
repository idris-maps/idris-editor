module.exports = function(f, i, group) {
	var gt = f.geometry.type
	var c = f.geometry.coordinates

	if(gt === 'Point') {
		var l = L.circleMarker([c[1], c[0]], { radius: 10 })
		group.addLayer(l)
		return [{
			layer: l,
			lId: l._leaflet_id,
			index: i
		}]
	} else if(gt === 'MultiPoint') {
		var r = []
		c.forEach(function(pt) {
			var l = L.circleMarker([pt[1], pt[0]], { radius: 10 })
			group.addLayer(l)
			r.push({
				layer: l,
				lId: l._leaflet_id,
				index: i			
			})
		})
		return r
	} else {
		var l = L.GeoJSON(f)
		group.addLayer(l)
		return [{
			layer: l,
			lId: l._leaflet_id,
			index: i
		}]
	}
}

