webpackJsonp([2],{

/***/ 22:
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if("function"!=="undefined"&&__webpack_require__(22)!==null&&__webpack_require__(23)!==null){!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return saveAs}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}

exports.json = function(fileName, data) {
	var blob = new Blob([JSON.stringify(data)], {type: 'application/json;charset=utf-8'})
	saveAs(blob, fileName)
}

exports.text = function(fileName, string) {
	var blob = new Blob([string], {type: 'text/plain;charset=utf-8'})
	saveAs(blob, fileName)
}

exports.svg = function(fileName, string) {
	var blob = new Blob([string], {type: 'image/svg+xml;charset=utf-8'})
	saveAs(blob, fileName)
}

exports.blob = function(fileName, blob) {
	saveAs(blob, fileName)
}



/***/ }),

/***/ 38:
/***/ (function(module, exports) {

exports.fromFeature = function(feature) {
	return getPoints(feature.geometry)
}

exports.fromGeometry = function(geometry) {
	return getPoints(geometry)
}

exports.fromFeatureCollection = function(col) {
	var pts = []
	col.features.forEach(function(f) {
		var fPts = getPoints(f.geometry)
		fPts.forEach(function(pt) { pts.push(pt) })
	})
	return pts
}

function getPoints(geometry) {
	var g = geometry
	if(g.type === 'Point') { return [g.coordinates] }
	else if(g.type === 'LineString' || g.type === 'MultiPoint') { return g.coordinates }
	else if(g.type === 'Polygon' || g.type === 'MultiLineString') {
		var pts = []
		g.coordinates.forEach(function(part) {
			part.forEach(function(pt) { pts.push(pt) })
		})
		return pts
	} else if(g.type === 'MultiPolygon') {
		var pts = []
		g.coordinates.forEach(function(poly) {
			poly.forEach(function(part) {
				part.forEach(function(pt) {
					pts.push(pt)
				})
			})
		})
		return pts
	} else {
		console.log('point-array ERROR: \"' + g.type + '\" is not a valid geometry type')
	}
}


/***/ }),

/***/ 39:
/***/ (function(module, exports) {

exports.isGeom = function(geometry) {
	var r = false
	var types = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon']
	types.forEach(function(t) {
		if(geometry.type === t) { r = true }
	})
	return r
}

exports.uniq = function(arr) {
	var uniq = []
	var isNum = true
	arr.forEach(function(val) {
		if(isNaN(val)) { isNum = false } 
		var exist = false
		uniq.forEach(function(uVal) {
			if(val === uVal) { exist = true }
		})
		if(!exist) { uniq.push(val) }
	})
	if(isNum) {
		uniq = uniq.map(function(v) { return +v })
	}
	uniq.sort(function(a, b) {
		if(a > b) { return 1 }
		else { return -1 }
	})
	return uniq
}



/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

var html = __webpack_require__(56)
var ctrl = __webpack_require__(54)
var getBy = __webpack_require__(55)
var Emitter = __webpack_require__(1).EventEmitter
var geo = __webpack_require__(57)
var save = __webpack_require__(27)


module.exports = function(state, callback) {
	var config = { divId: 'root', feats: state.data.features }
	var evt = new Emitter()
	config.props = geo.getAllProperties(config.feats)
	html.init(config, function() {
		ctrl.init(evt)
	})

	evt.on('property', function(prop) {
		config.prop = prop
		config.values = geo.getUniqPropertyValues(config.feats, prop)
		if(geo.numericValues(config.feats, prop)) {
			html.num(config, function() {
				ctrl.num(evt)
			})
		} else {
			html.notNum(config, function() {
				ctrl.notNum(evt)
			})
		}
	})

	evt.on('values', function(values) {
		config.values = values
		var col = getBy.values(config)
		state.page = 'continue'
		state.newdata = col
		state.evt.emit('continue', state)
		save.json('selected-by-property.json', col)
	})

	evt.on('rule', function(resp) {
		config.rule = resp 
		var col = getBy.rule(config)
		state.page = 'continue'
		state.newdata = col
		state.evt.emit('continue', state)
		save.json('selected-by-property.json', col)
	})
}


/***/ }),

/***/ 54:
/***/ (function(module, exports) {

exports.init = function(evt) {
	document.getElementById('btn-prop').onclick = function() {
		evt.emit('property', document.getElementById('select-prop').value)
	}
} 

exports.notNum = function(evt) {
	document.getElementById('get-checked').onclick = function() {
		var vals = getChecked(true)
		evt.emit('values', vals)
	}	
	document.getElementById('get-not-checked').onclick = function() {
		var vals = getChecked(false)
		evt.emit('values', vals)
	}
}

exports.num = function(evt) {
	document.getElementById('by-rule-btn').onclick = function() {
		var operator = document.getElementById('operator').value
		var value = document.getElementById('value').value
		if(value) {
			evt.emit('rule', { operator: operator, value: +value })
		}
	}
}

function getChecked(bool) {
	var cbs = document.getElementsByClassName('checkbox-input')
	var checked = []
	var notChecked = []
	for(i=0;i<cbs.length;i++) {
		if(cbs[i].checked) { checked.push(cbs[i].id) } else { notChecked.push(cbs[i].id) }
	}
	if(bool) { return checked }
	else { return notChecked }
}


/***/ }),

/***/ 55:
/***/ (function(module, exports) {

exports.values = function(c) {
	var toKeep = []
	c.feats.forEach(function(f) {
		var v = f.properties[c.prop]
		if(isIn(v, c.values)) {
			toKeep.push(f)
		}
	})
	return col(toKeep)
}

exports.rule = function(c) {
	var toKeep = []
	c.feats.forEach(function(f) {
		var v = f.properties[c.prop]
		if(c.rule.operator === '<') { if(v < c.rule.value) { toKeep.push(f) } }
		else if(c.rule.operator === '<=') { if(v <= c.rule.value) { toKeep.push(f) } }
		else if(c.rule.operator === '=') { if(v === c.rule.value) { toKeep.push(f) } }
		else if(c.rule.operator === '>=') { if(v >= c.rule.value) { toKeep.push(f) } }
		else if(c.rule.operator === '>') { if(v > c.rule.value) { toKeep.push(f) } }
	})
	return col(toKeep)
}

function isIn(val, vals) {
	var r = false 
	vals.forEach(function(v) {
		if(v === val) { r = true }	
	})
	return r
}


function col(feats) {
	return {type: 'FeatureCollection', features: feats}
}


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var xml = __webpack_require__(0)

exports.init = function(c, callback) {
	var div = xml.create('div')
	div.c('p').c('b').d('Choose property')
	var select = div.c('select').a({ id: 'select-prop' })
	div.c('button').a({ id: 'btn-prop' }).d('OK')
	c.props.forEach(function(p) {
		select.c('option').a({ value: p }).d(p)
	})
	
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


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(39)

var getAllPoints = __webpack_require__(38)
exports.getAllPoints = function(data) {
	if(data.type === 'FeatureCollection') { return getAllPoints.fromFeatureCollection(data) }
	else if(data.type === 'Feature') { return getAllPoints.fromFeature(data) }
	else if(util.isGeom(data)) { return getAllPoints.fromGeometry(data) }
}

var getBbox = __webpack_require__(58)
exports.getBbox = function(data) {
	if(data.type === 'FeatureCollection') { return getBbox.fromFeatureCollection(data) }
	else if(data.type === 'Feature') { return getBbox.fromFeature(data) }
	else if(util.isGeom(data)) { return getBbox.fromGeometry(data) }
}

var properties = __webpack_require__(59)
exports.getAllProperties = function(feats) { return properties.getAll(feats) }
exports.getPropertyValues = function(feats, property) { return properties.getValues(feats, property) }
exports.getUniqPropertyValues = function(feats, property) { return properties.getUniqValues(feats, property) }
exports.numericValues = function(feats, property) { return properties.numericValues(feats, property) }
exports.propInfo = function(collection) { return properties.propInfo(collection.features) }




/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var getAllPoints = __webpack_require__(38)

exports.fromFeature = function(feat) {
	return getBbox(getAllPoints.fromFeature(feat))
}

exports.fromFeatureCollection = function(col) {
	return getBbox(getAllPoints.fromFeatureCollection(col))
}

exports.fromGeometry = function(geom) {
	return getBbox(getAllPoints.fromGeometry(geom))
}

function getBbox(points) {
	var x = { min: Infinity, max: -Infinity }
	var y = { min: Infinity, max: -Infinity }
	points.forEach(function(pt) {
		if(pt[0] > x.max) { x.max = pt[0] }
		if(pt[0] < x.min) { x.min = pt[0] }
		if(pt[1] > y.max) { y.max = pt[1] }
		if(pt[1] < y.min) { y.min = pt[1] }
	})
	return [x.min, y.min, x.max, y.max]
}


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(39)

exports.getAll = function(feats) { return getAll(feats) }

function getAll(feats) {
	var props = []
	for(k in feats[0].properties) { props.push(k) }
	return props
}

exports.getValues = function(feats, property) { return getValues(feats, property) }

function getValues(feats, property) {
	var vals = []
	feats.forEach(function(f) {
		vals.push(f.properties[property])
	})
	return vals.sort(function(a,b) {return a - b })
}

exports.getUniqValues = function(feats, property) { return getUniqValues(feats, property) }

function getUniqValues(feats, property) {
	var vals = []
	feats.forEach(function(f) {
		vals.push(f.properties[property])
	})
	return util.uniq(vals)
}

exports.numericValues = function(feats, property) { return numericValues(feats, property) }

function numericValues(feats, property) {
	var r = true
	feats.forEach(function(f) {
		if(f.properties[property]) {
			if(isNaN(f.properties[property])) { r = false }
		}
	})
	return r
}

exports.propInfo = function(feats) {
	var properties = []
	var props = geo.getAllProperties(o.feats)
	props.forEach(function(prop) {
		var obj = {
			key: prop,
			uniqValues: getUniqValues(o.feats, prop),
			isNum: numericValues(o.feats, prop)
		}
		obj.maxValue = obj.uniqValues[0]
		obj.minValue = obj.uniqValues[obj.uniqValues.length - 1]
		obj.nbUniqValues = obj.uniqValues.length

		properties.push(obj)
	})
	return properties
}




/***/ })

});