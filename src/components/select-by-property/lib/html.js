var xml = require('xml-string')

exports.init = function(c, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Choose property')
	var select = div.c('select').a({ id: 'select-prop' })
	div.c('button').a({ id: 'btn-prop' }).d('OK')
	c.props.forEach(function(p) {
		select.c('option').a({ value: p }).d(p)
	})
	div.c('br')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(c.divId).innerHTML = div.inner()
	callback()
}

exports.notNum = function(c, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Select values')
	var scroll = div.c('div').a({ 'class': 'scroll-y' })
	div.c('button').a({ id: 'get-checked' }).d('Use selected values')
	div.c('button').a({ id: 'get-not-checked' }).d('Use unselected values')
	c.values.forEach(function(v) {
		var d = scroll.c('div').a({ 'class': 'checkbox-item' })
		d.c('input').a({ id: v, 'class': 'checkbox-input', type: 'checkbox' })
		d.c('span').d(short(v))
	})
	div.c('br')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(c.divId).innerHTML = div.inner()
	callback()
}

exports.num = function(c, callback) { 
	var div = xml.create('div')
	div.c('p').c('b').d('Get Features')
	div.c('p').d('where ' + c.prop)
	var s = div.c('select').a({ id: 'operator' })
		s.c('option').a({ value: '<' }).d('is less than')
		s.c('option').a({ value: '<=' }).d('is less or equal to')
		s.c('option').a({ value: '=' }).d('is equal to')
		s.c('option').a({ value: '>=' }).d('is greater or equal to')
		s.c('option').a({ value: '>' }).d('is greater than')
	div.c('input').a({ id: 'value', type: 'number', placeholder: 'value' })
	div.c('button').a({ id: 'by-rule-btn' }).d('OK')
	div.c('br')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(c.divId).innerHTML = div.inner()
	callback()
}

function short(n) {
	if(n.length > 20) {
		var str = ''
		for(i=0;i<18;i++) { str = str + n[i] }
		str = str + '...'
		return str
	} else {
		return n
	}
}
