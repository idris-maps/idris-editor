var xml = require('xml-string')

exports.init = function(divId, props, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Choose properties')
	var scroll = div.c('div').a({ 'class': 'scroll-y' })
	props.forEach(function(p) {
		var d = scroll.c('div').a({ 'class': 'checkbox-item' })
		d.c('input').a({ id: p, 'class': 'checkbox-input', type: 'checkbox'})
		d.c('span').d(p)
	})
	div.c('button').a({ id: 'rm-selected' }).d('Remove selected')
	div.c('button').a({ id: 'rm-unselected' }).d('Remove not selected')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(divId).innerHTML = div.inner()
	callback()
}
