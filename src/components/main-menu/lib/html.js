var xml = require('xml-string')

module.exports = function(callback) {
	var root = xml.create('div')
	root.c('p').a({'class': 'title'}).d('Select features by:')
	root.c('button').a({ id: 'select-by-bbox' }).d('Bounding box')
	root.c('button').a({ id: 'select-by-prop' }).d('Property')
	root.c('button').a({ id: 'select-by-click' }).d('Clicking')
	root.c('br')
	root.c('br')
	root.c('p').a({'class': 'title'}).d('Edit properties')
	root.c('button').a({ id: 'prop-add' }).d('Add from CSV')
	root.c('button').a({ id: 'prop-rem' }).d('Remove')
	document.getElementById('root').innerHTML = root.inner()
	callback()
}
