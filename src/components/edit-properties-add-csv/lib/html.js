var xml = require('xml-string')

exports.parsing = function(divId, callback) {
	document.getElementById(divId).innerHTML = '<p>Parsing...</p>'
	callback()
}

exports.parseErrors = function(divId, errs, callback) {
	var div = xml.create('div')
	var p = div.c('p')
	p.c('span').d('Could not parse file')
	p.c('br')
	p.c('b').d('Errors:')
	p.c('br')
	errs.forEach(function(err) {
		var s = JSON.stringify(err)
		p.c('span').d(s)
		p.c('br')
	})
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(divId).innerHTML = div.inner()
	callback()
}

exports.header = function(divId, arr, callback) {
	var div = xml.create('div')
	div.c('p').d('This is the first line:')
	arr.forEach(function(col, i) {
		div.c('p').a({ 'class': 'fake-table-cell' }).d(col)
	})
	div.c('p').d('Are these the names of the columns?')
	div.c('button').a({ id: 'csv-header-yes' }).d('Yes')
	div.c('button').a({ id: 'csv-header-no' }).d('No')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(divId).innerHTML = div.inner()
	callback()
}

exports.setHead = function(divId, arr, callback) {
	var div = xml.create('div')
	div.c('p').d('Name the columns')
	var t = div.c('table')
	var tr0 = t.c('tr')
	tr0.c('th').d('First row')
	tr0.c('th').d('Column name')
	arr.forEach(function(c,i) {
		var tr = t.c('tr')
		tr.c('td').d(c)
		tr.c('td').c('input').a({ id: 'set-head-input-' + i })
	})
	div.c('p').a({ id: 'set-head-error' })
	div.c('button').a({ id: 'set-head-done' }).d('Done')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(divId).innerHTML = div.inner()
	callback()	
}

exports.joinProps = function(divId, geoProps, csvProps, callback) {
	var div = xml.create('div')
	div.c('p').d('Properties to use for join')
	div.c('p').c('b').d('in the GeoJSON file')
	var sel0 = div.c('select').a({ id: 'geo-props' })
	geoProps.forEach(function(gp) {
		sel0.c('option').a({ value: gp }).d(gp)
	})
	div.c('p').c('b').d('in the CSV file')
	var sel1 =  div.c('select').a({ id: 'csv-props' })
	csvProps.forEach(function(cp) {
		sel1.c('option').a({ value: cp }).d(cp)
	})
	div.c('button').a({ id: 'join-btn' }).d('OK')
	div.c('button').a({ id: 'cancel' }).d('Cancel')

	document.getElementById(divId).innerHTML = div.inner()
	callback()	
}

exports.joining = function(divId, callback) {
	var html = '<p><b>Joining...</b></p>'
	document.getElementById(divId).innerHTML = html
	callback()	
}

exports.done = function(divId, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Properties have been added')
	div.c('button').a({ id: 'save' }).d('Save collection')
	div.c('button').a({ id: 'continue' }).d('Continue editing')

	document.getElementById(divId).innerHTML = div.inner()
	callback()
}

