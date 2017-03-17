var xml = require('xml-string')

exports.init = function(id, callback) {
	var el = document.getElementById(id)
	var root = xml.create('div')
	root.c('button').a({ id: 'browse-btn' }).d('Browse file system')
	root.c('input').a({ id: 'file-input', type: 'file' })
	var dz = root.c('div').a({ id: 'drop-zone' })
	dz.c('div').a({ id: 'dz-txt' }).d('or drop a file')
	root.c('p').a({ id: 'msg' })
	el.innerHTML = root.inner()
	callback()
}

exports.browse = function(id, callback) {
	var el = document.getElementById(id)
	var root = xml.create('div')
	root.c('p').a({ id: 'msg' }).d('Load a GeoJSON file')
	root.c('input').a({ id: 'file-input' })
	el.innerHTML = root.inner()
	callback()
}
