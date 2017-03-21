var Feature = require('./Feature')
var L = require('leaflet')

module.exports = function(col) {
	var o = this
	o.group = L.layerGroup([])
	o.data = col
	o.feats = []
	o.layers = []
	o.ids = []
	o.bbox = [Infinity, Infinity, -Infinity, -Infinity]
	col.features.forEach(function(f, i) {
		var fo = new Feature(f, i)
		o.feats.push(fo)
		var b = fo.bounds()
		if(b._southWest.lng < o.bbox[0]) { o.bbox[0] = b._southWest.lng }
		if(b._southWest.lat < o.bbox[1]) { o.bbox[1] = b._southWest.lat }
		if(b._northEast.lng > o.bbox[2]) { o.bbox[2] = b._northEast.lng }
		if(b._northEast.lat > o.bbox[3]) { o.bbox[3] = b._northEast.lat }
		fo.leafletObjects.forEach(function(lo) {
			o.group.addLayer(lo)
			o.layers.push(lo)
			o.ids.push([fo.index, lo._leaflet_id])
		})
	})
	o.getIndex = function(lid) {
		var r = null
		o.ids.forEach(function(id) {
			if(id[1] === lid) { r = id[0] }
		})
		return r
	}
	o.getLeafletId = function(index) {
		var r = []
		o.ids.forEach(function(id) {
			if(id[0] === index) { r.push(id[1]) }
		})
		return r
	}
	o.getBounds = function() {
		var r = o.bbox
		var southWest = L.latLng(r[1], r[0])
  var northEast = L.latLng(r[3], r[2])
		return L.latLngBounds(southWest, northEast)
	}
}
