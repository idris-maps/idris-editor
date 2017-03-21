var L = require('leaflet')

module.exports = function(feat, index) {
	var o = this
	o.data = feat
	o.index = index
	o.keep = false
	o.leafletObjects = leafletObject(o.data)
	o.bounds = function() {
		var c = o.data.geometry.coordinates
		var t = o.data.geometry.type
		if(t === 'Point') { 
			var r = [c[0], c[1], c[0], c[1]]
			var southWest = L.latLng(r[1], r[0])
   var northEast = L.latLng(r[3], r[2])
			return L.latLngBounds(southWest, northEast)
		} else if(t === 'MultiPoint') {
			var r = [Infinity, Infinity, -Infinity, -Infinity]
			c.forEach(function(pt) {
				if(pt[0] < r[0]) { r[0] = pt[0] }
				if(pt[0] > r[2]) { r[2] = pt[0] }
				if(pt[1] < r[1]) { r[1] = pt[1] }
				if(pt[1] > r[3]) { r[3] = pt[1] }
			})
			var southWest = L.latLng(r[1], r[0])
   var northEast = L.latLng(r[3], r[2])
			return L.latLngBounds(southWest, northEast)
		} else  {
			return o.leafletObjects[0].getBounds()
		}
	}
	o.leafletObjects.forEach(function(lo) {
		lo.on('click', function(e) { o.toggle() })
	})
	o.toggle = function() {
		if(o.keep) { 
			o.keep = false
			o.leafletObjects.forEach(function(lo) { lo.setStyle({ color: '#5C8590' }) }) 
		} else {
			o.keep = true
			o.leafletObjects.forEach(function(lo) { lo.setStyle({ color: '#E79D92' }) }) 
		}
	}
}

function leafletObject(f) {
	var gt = f.geometry.type
	var c = f.geometry.coordinates
	if(gt === 'Point') {
		return [L.circleMarker([c[1], c[0]], { radius: 10, color: '#5C8590' })]
	} else if(gt === 'MultiPoint') {
		var r = []
		c.forEach(function(pt) {
			r.push(L.circleMarker([pt[1], pt[0]], { radius: 10, color:'#5C8590'  }))
		})	
		return r
	} else {
		return [L.geoJSON(f, { style: { color: '#5C8590' } })]
	}
}
