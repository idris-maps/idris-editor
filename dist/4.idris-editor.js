webpackJsonp([4],{

/***/ 23:
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs=saveAs||function(e){"use strict";if(typeof e==="undefined"||typeof navigator!=="undefined"&&/MSIE [1-9]\./.test(navigator.userAgent)){return}var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,a=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},i=/constructor/i.test(e.HTMLElement)||e.safari,f=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},s="application/octet-stream",d=1e3*40,c=function(e){var t=function(){if(typeof e==="string"){n().revokeObjectURL(e)}else{e.remove()}};setTimeout(t,d)},l=function(e,t,n){t=[].concat(t);var r=t.length;while(r--){var o=e["on"+t[r]];if(typeof o==="function"){try{o.call(e,n||e)}catch(a){u(a)}}}},p=function(e){if(/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)){return new Blob([String.fromCharCode(65279),e],{type:e.type})}return e},v=function(t,u,d){if(!d){t=p(t)}var v=this,w=t.type,m=w===s,y,h=function(){l(v,"writestart progress write writeend".split(" "))},S=function(){if((f||m&&i)&&e.FileReader){var r=new FileReader;r.onloadend=function(){var t=f?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");var n=e.open(t,"_blank");if(!n)e.location.href=t;t=undefined;v.readyState=v.DONE;h()};r.readAsDataURL(t);v.readyState=v.INIT;return}if(!y){y=n().createObjectURL(t)}if(m){e.location.href=y}else{var o=e.open(y,"_blank");if(!o){e.location.href=y}}v.readyState=v.DONE;h();c(y)};v.readyState=v.INIT;if(o){y=n().createObjectURL(t);setTimeout(function(){r.href=y;r.download=u;a(r);h();c(y);v.readyState=v.DONE});return}S()},w=v.prototype,m=function(e,t,n){return new v(e,t||e.name||"download",n)};if(typeof navigator!=="undefined"&&navigator.msSaveOrOpenBlob){return function(e,t,n){t=t||e.name||"download";if(!n){e=p(e)}return navigator.msSaveOrOpenBlob(e,t)}}w.abort=function(){};w.readyState=w.INIT=0;w.WRITING=1;w.DONE=2;w.error=w.onwritestart=w.onprogress=w.onwrite=w.onabort=w.onerror=w.onwriteend=null;return m}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content);if(typeof module!=="undefined"&&module.exports){module.exports.saveAs=saveAs}else if("function"!=="undefined"&&__webpack_require__(23)!==null&&__webpack_require__(24)!==null){!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return saveAs}.call(exports, __webpack_require__, exports, module),
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

/***/ 26:
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

/***/ 27:
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

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var geo = __webpack_require__(33)
var html = __webpack_require__(57)
var ctrl = __webpack_require__(56)
var save = __webpack_require__(25)
var Emitter = __webpack_require__(1).EventEmitter
var process = __webpack_require__(58)

module.exports = function(state) {
	var divId = 'root'
	var data = state.data
	var evt = new Emitter()
	var props = geo.getAllProperties(data.features)

	html.init(divId, props, function() {
		ctrl.init(evt)
	})

	evt.on('props-to-keep', function(props) {
		process(data.features, props, function(feats) { 
			state.newdata = {type: 'FeatureCollection', features: feats}
			state.page = 'continue'
			state.evt.emit('continue', state)
			save.json('edited.json', state.newdata)
		})
	})

	evt.on('cancel', function() {
		state.page = 'cancel'
		state.evt.emit('cancel', state)
	})
}


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(27)

var getAllPoints = __webpack_require__(26)
exports.getAllPoints = function(data) {
	if(data.type === 'FeatureCollection') { return getAllPoints.fromFeatureCollection(data) }
	else if(data.type === 'Feature') { return getAllPoints.fromFeature(data) }
	else if(util.isGeom(data)) { return getAllPoints.fromGeometry(data) }
}

var getBbox = __webpack_require__(34)
exports.getBbox = function(data) {
	if(data.type === 'FeatureCollection') { return getBbox.fromFeatureCollection(data) }
	else if(data.type === 'Feature') { return getBbox.fromFeature(data) }
	else if(util.isGeom(data)) { return getBbox.fromGeometry(data) }
}

var properties = __webpack_require__(35)
exports.getAllProperties = function(feats) { return properties.getAll(feats) }
exports.getPropertyValues = function(feats, property) { return properties.getValues(feats, property) }
exports.getUniqPropertyValues = function(feats, property) { return properties.getUniqValues(feats, property) }
exports.numericValues = function(feats, property) { return properties.numericValues(feats, property) }
exports.propInfo = function(collection) { return properties.propInfo(collection.features) }




/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var getAllPoints = __webpack_require__(26)

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

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(27)

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




/***/ }),

/***/ 56:
/***/ (function(module, exports) {

exports.init = function(evt) {
	document.getElementById('rm-selected').onclick = function() {
		var vals = getChecked(false)
		evt.emit('props-to-keep', vals)
	}	
	document.getElementById('rm-unselected').onclick = function() {
		var vals = getChecked(true)
		evt.emit('props-to-keep', vals)
	}
	document.getElementById('cancel').onclick = function() {
		evt.emit('cancel')
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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var xml = __webpack_require__(0)

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


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports = function(feats, props, callback) {
	var newFeats = []
	feats.forEach(function(f) {
		var newProps = {}
		props.forEach(function(p) { newProps[p] = f.properties[p] })
		f.properties = newProps
		newFeats.push(f)
	})
	callback(newFeats)
}


/***/ })

});