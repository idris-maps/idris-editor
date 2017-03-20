var img = require('./bbox-img.json')
var xml = require('xml-string')

exports.choose = function(config, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('GetFeatures')
	var d0 = div.c('div').a({ 'class': 'bbox-img' })
	d0.c('img').a({ 
		src: 'data:image/png;base64,' + img.within,
		alt: 'Within bounding box' 
	})
	div.c('button').a({ id: 'within-bbox' }).d('Within bounding box')
	var d1 = div.c('div').a({ 'class': 'bbox-img' })
	d1.c('img').a({ 
		src: 'data:image/png;base64,' + img.crop,
		alt: 'Cropped to bounding box' 
	})
	div.c('button').a({ id: 'crop-bbox' }).d('Cropped to bounding box')
	var d1 = div.c('div').a({ 'class': 'bbox-img' })
	d1.c('img').a({ 
		src: 'data:image/png;base64,' + img.intersect,
		alt: 'Intersecting bounding box' 
	})
	div.c('button').a({ id: 'intersect-bbox' }).d('Intersecting bounding box')
	document.getElementById(config.divId).innerHTML = div.inner()
	callback()
}

exports.bbox = function(config, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Choose the bounding box')
	div.c('p').a({ id: 'err' })
	div.c('hr')
	div.c('p').c('b').d('Longitude')
	div.c('p').d('Minimum')
	div.c('input').a({ id: 'min-lon', placeholder: 'Min. Longitude', type: 'number' })
	div.c('p').d('Maximum')
	div.c('input').a({ id: 'max-lon', placeholder: 'Max. Longitude', type: 'number' })
	div.c('hr')
	div.c('p').c('b').d('Latitude')
	div.c('p').d('Minimum')
	div.c('input').a({ id: 'min-lat', placeholder: 'Min. Latitude', type: 'number' })
	div.c('p').d('Maximum')
	div.c('input').a({ id: 'max-lat', placeholder: 'Max. Latitude', type: 'number' })
	div.c('button').a({ id: 'bbox-btn' }).d('OK')

	document.getElementById(config.divId).innerHTML = div.inner()
	callback()
}

exports.processing = function(config, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Processing...')
	div.c('p').a({ id: 'progress' })

	document.getElementById(config.divId).innerHTML = div.inner()
	callback()
}
