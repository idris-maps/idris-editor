webpackJsonp([6],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var L = __webpack_require__(28)
var L_Ctrl = __webpack_require__(43)
var ctrl = __webpack_require__(40)
var html = __webpack_require__(41)
var process = __webpack_require__(32)
var Emitter = __webpack_require__(1).EventEmitter
var save = __webpack_require__(27)

module.exports = function(state, callback) {
	var evt = new Emitter()
	var map = L.map('map')
	switchView('map')
	var mapView = true
	window.onresize = function() { if(mapView) { switchView('map') } }
	var data = state.data
	var dataLayer = L.geoJSON(data, {color: '#437380'}).addTo(map)
	map.fitBounds(dataLayer.getBounds())

	var menu = new L_Ctrl(map)
	menu.setContent(html.draw, ctrl.draw(evt, map), {'text-align': 'center'})

	var rect
	evt.on('rect', function(bb, layer) {
		rect = layer
		menu.setContent(html.type, ctrl.type(evt, bb))
	})

	evt.on('type', function(bb, type) {
		var config = {
			progressId: 'progress',
			bbox: bb,
			type: type,
			feats: data.features,
			evt: evt
		}
		menu.setContent(html.process, null, {'text-align': 'center'})
		process(config)
	})

	evt.on('new-collection', function(col, name) {
		state.page = 'continue'
		state.newdata = col
		rmMap()
		state.evt.emit('continue', state)
		save.json(name, col)
	})
	
	evt.on('redraw', function() {
		map.removeLayer(rect)
		menu.setContent(html.draw, ctrl.draw(evt, map), {'text-align': 'center'})
	})
	
	evt.on('cancel', function() {
		state.page = 'cancel'
		rmMap()
		state.evt.emit('cancel', state) 
	})
	function rmMap() {
			switchView('root')
			mapView = false
			//map.remove()
			var el = document.getElementById('map')
			el.parentNode.removeChild(el)
			var newEl = document.createElement('div')
			newEl.id = 'map'
			document.body.appendChild(newEl)
	}
}

function switchView(id) {
	var m = document.getElementById('map')
	var r = document.getElementById('root')
	var h = window.innerHeight
	if(id === 'map') {
		m.style.display = 'block'
		r.style.display = 'none'
		m.style.height = (h - 80) + 'px'
	} else {
		r.style.display = 'block'
		m.style.display = 'none'
	}
}





/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = __webpack_require__(31);

/**
 * Takes two {@link Polygon|polygons} and finds their intersection. If they share a border, returns the border; if they don't intersect, returns undefined.
 *
 * @name intersect
 * @param {Feature<Polygon>} poly1 the first polygon
 * @param {Feature<Polygon>} poly2 the second polygon
 * @return {(Feature<Polygon>|undefined|Feature<MultiLineString>)} if `poly1` and `poly2` overlap, returns a Polygon feature representing the area they overlap; if `poly1` and `poly2` do not overlap, returns `undefined`; if `poly1` and `poly2` share a border, a MultiLineString of the locations where their borders are shared
 * @example
 * var poly1 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#0f0"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.801742, 45.48565],
 *       [-122.801742, 45.60491],
 *       [-122.584762, 45.60491],
 *       [-122.584762, 45.48565],
 *       [-122.801742, 45.48565]
 *     ]]
 *   }
 * }
 * var poly2 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#00f"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.520217, 45.535693],
 *       [-122.64038, 45.553967],
 *       [-122.720031, 45.526554],
 *       [-122.669906, 45.507309],
 *       [-122.723464, 45.446643],
 *       [-122.532577, 45.408574],
 *       [-122.487258, 45.477466],
 *       [-122.520217, 45.535693]
 *     ]]
 *   }
 * }
 *
 * var polygons = {
 *   "type": "FeatureCollection",
 *   "features": [poly1, poly2]
 * };
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 * //=polygons
 *
 * //=intersection
 */
module.exports = function intersect(poly1, poly2) {
    var geom1, geom2;
    if (poly1.type === 'Feature') geom1 = poly1.geometry;
    else geom1 = poly1;
    if (poly2.type === 'Feature') geom2 = poly2.geometry;
    else geom2 = poly2;
    var reader = new jsts.io.GeoJSONReader();
    var a = reader.read(JSON.stringify(geom1));
    var b = reader.read(JSON.stringify(geom2));
    var intersection = a.intersection(b);

    if (intersection.isEmpty()) {
        return undefined;
    }

    var writer = new jsts.io.GeoJSONWriter();

    var geojsonGeometry = writer.write(intersection);
    return {
        type: 'Feature',
        properties: {},
        geometry: geojsonGeometry
    };
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var lineCrop = __webpack_require__(35)

exports.within = function(feat, bboxFeat) {
	var bb = bbox(bboxFeat)
	if(feat.geometry.type === 'LineString') {
		var pts = feat.geometry.coordinates
		return all(pts, bb)
	} else if(feat.geometry.type === 'MultiLineString') {
		var pts = []
		var c = feat.geometry.coordinates
		c.forEach(function(part) {
			part.forEach(function(pt) { pts.push(pt) })
		})
		return all(pts, bb)
	}
}

exports.intersect = function(feat, bboxFeat) {
	var bb = bbox(bboxFeat)
	if(feat.geometry.type === 'LineString') {
		var pts = feat.geometry.coordinates
		return one(pts, bb)
	} else if(feat.geometry.type === 'MultiLineString') {
		var pts = []
		var c = feat.geometry.coordinates
		c.forEach(function(part) {
			part.forEach(function(pt) { pts.push(pt) })
		})
		return one(pts, bb)
	}
}

exports.crop = function(feat, bboxFeat) {
	var bbLine = bboxLine(bboxFeat)
	var bb = bbox(bboxFeat)
	var props = feat.properties
	if(feat.geometry.type === 'LineString') {
		var lines = lineCrop(feat.geometry.coordinates, bbLine, bb)
		if(lines.length === 1) { 
			var geo = { type: 'LineString', coordinates: lines[0] }
		} else if(lines.length > 1) {
			var geo = { type: 'MultiLineString', coordinates: lines[0] }
		} else { var geo = false }
	} else {
		var endLines = []
		var parts = feat.geometry.coordinates
		parts.forEach(function(c) {
			var lines = lineCrop(c, bbLine, bb)
			lines.forEach(function(l) { endLines.push(l) })
		})
		if(endLines.length === 1) { 
			var geo = { type: 'LineString', coordinates: endLines[0] }
		} else if(endLines.length > 1) {
			var geo = { type: 'MultiLineString', coordinates: endLines }
		} else { var geo = false }
	}	
	if(geo) { return { type: 'Feature', properties: props, geometry: geo } }
	else { return null }
}

function all(pts, bb) {
	var r = true
	for(i=0;i<pts.length;i++) {
		if(!ptIsIn(pts[i], bb)) { r = false; break }
	}
	return r
}

function one(pts, bb) {
	var r = false
	for(i=0;i<pts.length;i++) {
		if(ptIsIn(pts[i], bb)) { r = true; break }
	}
	return r
}

function bbox(f) {
	var bboxC = f.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	return {
		x: { min: xMin, max: xMax },
		y: { min: yMin, max: yMax }
	}
}

function bboxLine(f) {
	var bboxC = f.geometry.coordinates
	var c = bboxC[0]
	return {
		type: 'Feature', properties: {},
		geometry: {
			type: 'LineString', coordinates: c			
		}

	}
}

function ptIsIn(pt, bb) {
	if(pt[0] > bb.x.min && pt[0] < bb.x.max && pt[1] > bb.y.min && pt[1] < bb.y.max) {
		return true
	} else {
		return false
	}
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function(ptFeat, bboxFeat) {
	var fs = []
	var props = ptFeat.properties
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	var pts = ptFeat.geometry.coordinates
	pts.forEach(function(pt) {
		if(pt[0] >= xMin && pt[0] <= xMax && pt[1] >= yMin && pt[1] <= yMax) {
			fs.push({type: 'Feature', properties: props, geometry: {type: 'Point', coordinates: pt }})
		}
	})
	if(fs.length !== 0) { return fs }
	else { return false }
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(ptFeat, bboxFeat) {
	var pt = ptFeat.geometry.coordinates
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	if(pt[0] >= xMin && pt[0] <= xMax && pt[1] >= yMin && pt[1] <= yMax) {
		return true
	} else {
		return false
	}
}


/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Leaflet 1.0.3, a JS library for interactive maps. http://leafletjs.com
 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
*/
(function (window, document, undefined) {
var L = {
	version: "1.0.3"
};

function expose() {
	var oldL = window.L;

	L.noConflict = function () {
		window.L = oldL;
		return this;
	};

	window.L = L;
}

// define Leaflet for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = L;

// define Leaflet as an AMD module
} else if (true) {
	!(__WEBPACK_AMD_DEFINE_FACTORY__ = (L),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

// define Leaflet as a global L variable, saving the original L to restore later if needed
if (typeof window !== 'undefined') {
	expose();
}



/*
 * @namespace Util
 *
 * Various utility functions, used by Leaflet internally.
 */

L.Util = {

	// @function extend(dest: Object, src?: Object): Object
	// Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
	extend: function (dest) {
		var i, j, len, src;

		for (j = 1, len = arguments.length; j < len; j++) {
			src = arguments[j];
			for (i in src) {
				dest[i] = src[i];
			}
		}
		return dest;
	},

	// @function create(proto: Object, properties?: Object): Object
	// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
	create: Object.create || (function () {
		function F() {}
		return function (proto) {
			F.prototype = proto;
			return new F();
		};
	})(),

	// @function bind(fn: Function, …): Function
	// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
	// Has a `L.bind()` shortcut.
	bind: function (fn, obj) {
		var slice = Array.prototype.slice;

		if (fn.bind) {
			return fn.bind.apply(fn, slice.call(arguments, 1));
		}

		var args = slice.call(arguments, 2);

		return function () {
			return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
		};
	},

	// @function stamp(obj: Object): Number
	// Returns the unique ID of an object, assiging it one if it doesn't have it.
	stamp: function (obj) {
		/*eslint-disable */
		obj._leaflet_id = obj._leaflet_id || ++L.Util.lastId;
		return obj._leaflet_id;
		/*eslint-enable */
	},

	// @property lastId: Number
	// Last unique ID used by [`stamp()`](#util-stamp)
	lastId: 0,

	// @function throttle(fn: Function, time: Number, context: Object): Function
	// Returns a function which executes function `fn` with the given scope `context`
	// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
	// `fn` will be called no more than one time per given amount of `time`. The arguments
	// received by the bound function will be any arguments passed when binding the
	// function, followed by any arguments passed when invoking the bound function.
	// Has an `L.bind` shortcut.
	throttle: function (fn, time, context) {
		var lock, args, wrapperFn, later;

		later = function () {
			// reset lock and call if queued
			lock = false;
			if (args) {
				wrapperFn.apply(context, args);
				args = false;
			}
		};

		wrapperFn = function () {
			if (lock) {
				// called too soon, queue to call later
				args = arguments;

			} else {
				// call and lock until later
				fn.apply(context, arguments);
				setTimeout(later, time);
				lock = true;
			}
		};

		return wrapperFn;
	},

	// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
	// Returns the number `num` modulo `range` in such a way so it lies within
	// `range[0]` and `range[1]`. The returned value will be always smaller than
	// `range[1]` unless `includeMax` is set to `true`.
	wrapNum: function (x, range, includeMax) {
		var max = range[1],
		    min = range[0],
		    d = max - min;
		return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
	},

	// @function falseFn(): Function
	// Returns a function which always returns `false`.
	falseFn: function () { return false; },

	// @function formatNum(num: Number, digits?: Number): Number
	// Returns the number `num` rounded to `digits` decimals, or to 5 decimals by default.
	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	// @function trim(str: String): String
	// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
	trim: function (str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},

	// @function splitWords(str: String): String[]
	// Trims and splits the string on whitespace and returns the array of parts.
	splitWords: function (str) {
		return L.Util.trim(str).split(/\s+/);
	},

	// @function setOptions(obj: Object, options: Object): Object
	// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
	setOptions: function (obj, options) {
		if (!obj.hasOwnProperty('options')) {
			obj.options = obj.options ? L.Util.create(obj.options) : {};
		}
		for (var i in options) {
			obj.options[i] = options[i];
		}
		return obj.options;
	},

	// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
	// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
	// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
	// be appended at the end. If `uppercase` is `true`, the parameter names will
	// be uppercased (e.g. `'?A=foo&B=bar'`)
	getParamString: function (obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	},

	// @function template(str: String, data: Object): String
	// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
	// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
	// `('Hello foo, bar')`. You can also specify functions instead of strings for
	// data values — they will be evaluated passing `data` as an argument.
	template: function (str, data) {
		return str.replace(L.Util.templateRe, function (str, key) {
			var value = data[key];

			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);

			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	},

	templateRe: /\{ *([\w_\-]+) *\}/g,

	// @function isArray(obj): Boolean
	// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
	isArray: Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	},

	// @function indexOf(array: Array, el: Object): Number
	// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
	indexOf: function (array, el) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] === el) { return i; }
		}
		return -1;
	},

	// @property emptyImageUrl: String
	// Data URI string containing a base64-encoded empty GIF image.
	// Used as a hack to free memory from unused images on WebKit-powered
	// mobile devices (by setting image `src` to this string).
	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};

(function () {
	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		return window['webkit' + name] || window['moz' + name] || window['ms' + name];
	}

	var lastTime = 0;

	// fallback for IE 7-8
	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer,
	    cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
	               getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };


	// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
	// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
	// `context` if given. When `immediate` is set, `fn` is called immediately if
	// the browser doesn't have native support for
	// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
	// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
	L.Util.requestAnimFrame = function (fn, context, immediate) {
		if (immediate && requestFn === timeoutDefer) {
			fn.call(context);
		} else {
			return requestFn.call(window, L.bind(fn, context));
		}
	};

	// @function cancelAnimFrame(id: Number): undefined
	// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
	L.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};
})();

// shortcuts for most used utility functions
L.extend = L.Util.extend;
L.bind = L.Util.bind;
L.stamp = L.Util.stamp;
L.setOptions = L.Util.setOptions;




// @class Class
// @aka L.Class

// @section
// @uninheritable

// Thanks to John Resig and Dean Edwards for inspiration!

L.Class = function () {};

L.Class.extend = function (props) {

	// @function extend(props: Object): Function
	// [Extends the current class](#class-inheritance) given the properties to be included.
	// Returns a Javascript function that is a class constructor (to be called with `new`).
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		this.callInitHooks();
	};

	var parentProto = NewClass.__super__ = this.prototype;

	var proto = L.Util.create(parentProto);
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	// inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (proto.options) {
		props.options = L.Util.extend(L.Util.create(proto.options), props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	proto._initHooks = [];

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parentProto.callInitHooks) {
			parentProto.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// @function include(properties: Object): this
// [Includes a mixin](#class-includes) into the current class.
L.Class.include = function (props) {
	L.extend(this.prototype, props);
	return this;
};

// @function mergeOptions(options: Object): this
// [Merges `options`](#class-options) into the defaults of the class.
L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
	return this;
};

// @function addInitHook(fn: Function): this
// Adds a [constructor hook](#class-constructor-hooks) to the class.
L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
	return this;
};



/*
 * @class Evented
 * @aka L.Evented
 * @inherits Class
 *
 * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
 *
 * @example
 *
 * ```js
 * map.on('click', function(e) {
 * 	alert(e.latlng);
 * } );
 * ```
 *
 * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
 *
 * ```js
 * function onClick(e) { ... }
 *
 * map.on('click', onClick);
 * map.off('click', onClick);
 * ```
 */


L.Evented = L.Class.extend({

	/* @method on(type: String, fn: Function, context?: Object): this
	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
	 *
	 * @alternative
	 * @method on(eventMap: Object): this
	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	 */
	on: function (types, fn, context) {

		// types can be a map of types/handlers
		if (typeof types === 'object') {
			for (var type in types) {
				// we don't process space-separated events here for performance;
				// it's a hot path since Layer uses the on(obj) syntax
				this._on(type, types[type], fn);
			}

		} else {
			// types can be a string of space-separated words
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(types[i], fn, context);
			}
		}

		return this;
	},

	/* @method off(type: String, fn?: Function, context?: Object): this
	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
	 *
	 * @alternative
	 * @method off(eventMap: Object): this
	 * Removes a set of type/listener pairs.
	 *
	 * @alternative
	 * @method off: this
	 * Removes all listeners to all events on the object.
	 */
	off: function (types, fn, context) {

		if (!types) {
			// clear all listeners if called without arguments
			delete this._events;

		} else if (typeof types === 'object') {
			for (var type in types) {
				this._off(type, types[type], fn);
			}

		} else {
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(types[i], fn, context);
			}
		}

		return this;
	},

	// attach listener (without syntactic sugar now)
	_on: function (type, fn, context) {
		this._events = this._events || {};

		/* get/init listeners for type */
		var typeListeners = this._events[type];
		if (!typeListeners) {
			typeListeners = [];
			this._events[type] = typeListeners;
		}

		if (context === this) {
			// Less memory footprint.
			context = undefined;
		}
		var newListener = {fn: fn, ctx: context},
		    listeners = typeListeners;

		// check if fn already there
		for (var i = 0, len = listeners.length; i < len; i++) {
			if (listeners[i].fn === fn && listeners[i].ctx === context) {
				return;
			}
		}

		listeners.push(newListener);
	},

	_off: function (type, fn, context) {
		var listeners,
		    i,
		    len;

		if (!this._events) { return; }

		listeners = this._events[type];

		if (!listeners) {
			return;
		}

		if (!fn) {
			// Set all removed listeners to noop so they are not called if remove happens in fire
			for (i = 0, len = listeners.length; i < len; i++) {
				listeners[i].fn = L.Util.falseFn;
			}
			// clear all listeners for a type if function isn't specified
			delete this._events[type];
			return;
		}

		if (context === this) {
			context = undefined;
		}

		if (listeners) {

			// find fn and remove it
			for (i = 0, len = listeners.length; i < len; i++) {
				var l = listeners[i];
				if (l.ctx !== context) { continue; }
				if (l.fn === fn) {

					// set the removed listener to noop so that's not called if remove happens in fire
					l.fn = L.Util.falseFn;

					if (this._firingCount) {
						/* copy array in case events are being fired */
						this._events[type] = listeners = listeners.slice();
					}
					listeners.splice(i, 1);

					return;
				}
			}
		}
	},

	// @method fire(type: String, data?: Object, propagate?: Boolean): this
	// Fires an event of the specified type. You can optionally provide an data
	// object — the first argument of the listener function will contain its
	// properties. The event can optionally be propagated to event parents.
	fire: function (type, data, propagate) {
		if (!this.listens(type, propagate)) { return this; }

		var event = L.Util.extend({}, data, {type: type, target: this});

		if (this._events) {
			var listeners = this._events[type];

			if (listeners) {
				this._firingCount = (this._firingCount + 1) || 1;
				for (var i = 0, len = listeners.length; i < len; i++) {
					var l = listeners[i];
					l.fn.call(l.ctx || this, event);
				}

				this._firingCount--;
			}
		}

		if (propagate) {
			// propagate the event to parents (set with addEventParent)
			this._propagateEvent(event);
		}

		return this;
	},

	// @method listens(type: String): Boolean
	// Returns `true` if a particular event type has any listeners attached to it.
	listens: function (type, propagate) {
		var listeners = this._events && this._events[type];
		if (listeners && listeners.length) { return true; }

		if (propagate) {
			// also check parents for listeners if event propagates
			for (var id in this._eventParents) {
				if (this._eventParents[id].listens(type, propagate)) { return true; }
			}
		}
		return false;
	},

	// @method once(…): this
	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
	once: function (types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this.once(type, types[type], fn);
			}
			return this;
		}

		var handler = L.bind(function () {
			this
			    .off(types, fn, context)
			    .off(types, handler, context);
		}, this);

		// add a listener that's executed once and removed after that
		return this
		    .on(types, fn, context)
		    .on(types, handler, context);
	},

	// @method addEventParent(obj: Evented): this
	// Adds an event parent - an `Evented` that will receive propagated events
	addEventParent: function (obj) {
		this._eventParents = this._eventParents || {};
		this._eventParents[L.stamp(obj)] = obj;
		return this;
	},

	// @method removeEventParent(obj: Evented): this
	// Removes an event parent, so it will stop receiving propagated events
	removeEventParent: function (obj) {
		if (this._eventParents) {
			delete this._eventParents[L.stamp(obj)];
		}
		return this;
	},

	_propagateEvent: function (e) {
		for (var id in this._eventParents) {
			this._eventParents[id].fire(e.type, L.extend({layer: e.target}, e), true);
		}
	}
});

var proto = L.Evented.prototype;

// aliases; we should ditch those eventually

// @method addEventListener(…): this
// Alias to [`on(…)`](#evented-on)
proto.addEventListener = proto.on;

// @method removeEventListener(…): this
// Alias to [`off(…)`](#evented-off)

// @method clearAllEventListeners(…): this
// Alias to [`off()`](#evented-off)
proto.removeEventListener = proto.clearAllEventListeners = proto.off;

// @method addOneTimeEventListener(…): this
// Alias to [`once(…)`](#evented-once)
proto.addOneTimeEventListener = proto.once;

// @method fireEvent(…): this
// Alias to [`fire(…)`](#evented-fire)
proto.fireEvent = proto.fire;

// @method hasEventListeners(…): Boolean
// Alias to [`listens(…)`](#evented-listens)
proto.hasEventListeners = proto.listens;

L.Mixin = {Events: proto};



/*
 * @namespace Browser
 * @aka L.Browser
 *
 * A namespace with static properties for browser/feature detection used by Leaflet internally.
 *
 * @example
 *
 * ```js
 * if (L.Browser.ielt9) {
 *   alert('Upgrade your browser, dude!');
 * }
 * ```
 */

(function () {

	var ua = navigator.userAgent.toLowerCase(),
	    doc = document.documentElement,

	    ie = 'ActiveXObject' in window,

	    webkit    = ua.indexOf('webkit') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android23 = ua.search('android [23]') !== -1,
	    chrome    = ua.indexOf('chrome') !== -1,
	    gecko     = ua.indexOf('gecko') !== -1  && !webkit && !window.opera && !ie,

	    win = navigator.platform.indexOf('Win') === 0,

	    mobile = typeof orientation !== 'undefined' || ua.indexOf('mobile') !== -1,
	    msPointer = !window.PointerEvent && window.MSPointerEvent,
	    pointer = window.PointerEvent || msPointer,

	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera12 = 'OTransition' in doc.style;


	var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
			(window.DocumentTouch && document instanceof window.DocumentTouch));

	L.Browser = {

		// @property ie: Boolean
		// `true` for all Internet Explorer versions (not Edge).
		ie: ie,

		// @property ielt9: Boolean
		// `true` for Internet Explorer versions less than 9.
		ielt9: ie && !document.addEventListener,

		// @property edge: Boolean
		// `true` for the Edge web browser.
		edge: 'msLaunchUri' in navigator && !('documentMode' in document),

		// @property webkit: Boolean
		// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
		webkit: webkit,

		// @property gecko: Boolean
		// `true` for gecko-based browsers like Firefox.
		gecko: gecko,

		// @property android: Boolean
		// `true` for any browser running on an Android platform.
		android: ua.indexOf('android') !== -1,

		// @property android23: Boolean
		// `true` for browsers running on Android 2 or Android 3.
		android23: android23,

		// @property chrome: Boolean
		// `true` for the Chrome browser.
		chrome: chrome,

		// @property safari: Boolean
		// `true` for the Safari browser.
		safari: !chrome && ua.indexOf('safari') !== -1,


		// @property win: Boolean
		// `true` when the browser is running in a Windows platform
		win: win,


		// @property ie3d: Boolean
		// `true` for all Internet Explorer versions supporting CSS transforms.
		ie3d: ie3d,

		// @property webkit3d: Boolean
		// `true` for webkit-based browsers supporting CSS transforms.
		webkit3d: webkit3d,

		// @property gecko3d: Boolean
		// `true` for gecko-based browsers supporting CSS transforms.
		gecko3d: gecko3d,

		// @property opera12: Boolean
		// `true` for the Opera browser supporting CSS transforms (version 12 or later).
		opera12: opera12,

		// @property any3d: Boolean
		// `true` for all browsers supporting CSS transforms.
		any3d: !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantomjs,


		// @property mobile: Boolean
		// `true` for all browsers running in a mobile device.
		mobile: mobile,

		// @property mobileWebkit: Boolean
		// `true` for all webkit-based browsers in a mobile device.
		mobileWebkit: mobile && webkit,

		// @property mobileWebkit3d: Boolean
		// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
		mobileWebkit3d: mobile && webkit3d,

		// @property mobileOpera: Boolean
		// `true` for the Opera browser in a mobile device.
		mobileOpera: mobile && window.opera,

		// @property mobileGecko: Boolean
		// `true` for gecko-based browsers running in a mobile device.
		mobileGecko: mobile && gecko,


		// @property touch: Boolean
		// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
		// This does not necessarily mean that the browser is running in a computer with
		// a touchscreen, it only means that the browser is capable of understanding
		// touch events.
		touch: !!touch,

		// @property msPointer: Boolean
		// `true` for browsers implementing the Microsoft touch events model (notably IE10).
		msPointer: !!msPointer,

		// @property pointer: Boolean
		// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
		pointer: !!pointer,


		// @property retina: Boolean
		// `true` for browsers on a high-resolution "retina" screen.
		retina: (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1
	};

}());



/*
 * @class Point
 * @aka L.Point
 *
 * Represents a point with `x` and `y` coordinates in pixels.
 *
 * @example
 *
 * ```js
 * var point = L.point(200, 300);
 * ```
 *
 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
 *
 * ```js
 * map.panBy([200, 300]);
 * map.panBy(L.point(200, 300));
 * ```
 */

L.Point = function (x, y, round) {
	// @property x: Number; The `x` coordinate of the point
	this.x = (round ? Math.round(x) : x);
	// @property y: Number; The `y` coordinate of the point
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {

	// @method clone(): Point
	// Returns a copy of the current point.
	clone: function () {
		return new L.Point(this.x, this.y);
	},

	// @method add(otherPoint: Point): Point
	// Returns the result of addition of the current and the given points.
	add: function (point) {
		// non-destructive, returns a new point
		return this.clone()._add(L.point(point));
	},

	_add: function (point) {
		// destructive, used directly for performance in situations where it's safe to modify existing point
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	// @method subtract(otherPoint: Point): Point
	// Returns the result of subtraction of the given point from the current.
	subtract: function (point) {
		return this.clone()._subtract(L.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	// @method divideBy(num: Number): Point
	// Returns the result of division of the current point by the given number.
	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	// @method multiplyBy(num: Number): Point
	// Returns the result of multiplication of the current point by the given number.
	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	// @method scaleBy(scale: Point): Point
	// Multiply each coordinate of the current point by each coordinate of
	// `scale`. In linear algebra terms, multiply the point by the
	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
	// defined by `scale`.
	scaleBy: function (point) {
		return new L.Point(this.x * point.x, this.y * point.y);
	},

	// @method unscaleBy(scale: Point): Point
	// Inverse of `scaleBy`. Divide each coordinate of the current point by
	// each coordinate of `scale`.
	unscaleBy: function (point) {
		return new L.Point(this.x / point.x, this.y / point.y);
	},

	// @method round(): Point
	// Returns a copy of the current point with rounded coordinates.
	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	// @method floor(): Point
	// Returns a copy of the current point with floored coordinates (rounded down).
	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	// @method ceil(): Point
	// Returns a copy of the current point with ceiled coordinates (rounded up).
	ceil: function () {
		return this.clone()._ceil();
	},

	_ceil: function () {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	},

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	distanceTo: function (point) {
		point = L.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	equals: function (point) {
		point = L.point(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	contains: function (point) {
		point = L.point(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	toString: function () {
		return 'Point(' +
		        L.Util.formatNum(this.x) + ', ' +
		        L.Util.formatNum(this.y) + ')';
	}
};

// @factory L.point(x: Number, y: Number, round?: Boolean)
// Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

// @alternative
// @factory L.point(coords: Number[])
// Expects an array of the form `[x, y]` instead.

// @alternative
// @factory L.point(coords: Object)
// Expects a plain object of the form `{x: Number, y: Number}` instead.
L.point = function (x, y, round) {
	if (x instanceof L.Point) {
		return x;
	}
	if (L.Util.isArray(x)) {
		return new L.Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	if (typeof x === 'object' && 'x' in x && 'y' in x) {
		return new L.Point(x.x, x.y);
	}
	return new L.Point(x, y, round);
};



/*
 * @class Bounds
 * @aka L.Bounds
 *
 * Represents a rectangular area in pixel coordinates.
 *
 * @example
 *
 * ```js
 * var p1 = L.point(10, 10),
 * p2 = L.point(40, 60),
 * bounds = L.bounds(p1, p2);
 * ```
 *
 * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * otherBounds.intersects([[10, 10], [40, 60]]);
 * ```
 */

L.Bounds = function (a, b) {
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
};

L.Bounds.prototype = {
	// @method extend(point: Point): this
	// Extends the bounds to contain the given point.
	extend: function (point) { // (Point)
		point = L.point(point);

		// @property min: Point
		// The top left corner of the rectangle.
		// @property max: Point
		// The bottom right corner of the rectangle.
		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	getCenter: function (round) {
		return new L.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	getBottomLeft: function () {
		return new L.Point(this.min.x, this.max.y);
	},

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
	getTopRight: function () { // -> Point
		return new L.Point(this.max.x, this.min.y);
	},

	// @method getSize(): Point
	// Returns the size of the given bounds
	getSize: function () {
		return this.max.subtract(this.min);
	},

	// @method contains(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle contains the given one.
	// @alternative
	// @method contains(point: Point): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains: function (obj) {
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof L.Point) {
			obj = L.point(obj);
		} else {
			obj = L.bounds(obj);
		}

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	// @method intersects(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds
	// intersect if they have at least one point in common.
	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
	// overlap if their intersection is an area.
	overlaps: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

		return xOverlaps && yOverlaps;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};


// @factory L.bounds(topLeft: Point, bottomRight: Point)
// Creates a Bounds object from two coordinates (usually top-left and bottom-right corners).
// @alternative
// @factory L.bounds(points: Point[])
// Creates a Bounds object from the points it contains
L.bounds = function (a, b) {
	if (!a || a instanceof L.Bounds) {
		return a;
	}
	return new L.Bounds(a, b);
};



/*
 * @class Transformation
 * @aka L.Transformation
 *
 * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
 * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
 * the reverse. Used by Leaflet in its projections code.
 *
 * @example
 *
 * ```js
 * var transformation = new L.Transformation(2, 5, -1, 10),
 * 	p = L.point(1, 2),
 * 	p2 = transformation.transform(p), //  L.point(7, 8)
 * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
 * ```
 */


// factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
// Creates a `Transformation` object with the given coefficients.
L.Transformation = function (a, b, c, d) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
};

L.Transformation.prototype = {
	// @method transform(point: Point, scale?: Number): Point
	// Returns a transformed point, optionally multiplied by the given scale.
	// Only accepts actual `L.Point` instances, not arrays.
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	// @method untransform(point: Point, scale?: Number): Point
	// Returns the reverse transformation of the given point, optionally divided
	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
	untransform: function (point, scale) {
		scale = scale || 1;
		return new L.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};



/*
 * @namespace DomUtil
 *
 * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
 * tree, used by Leaflet internally.
 *
 * Most functions expecting or returning a `HTMLElement` also work for
 * SVG elements. The only difference is that classes refer to CSS classes
 * in HTML and SVG classes in SVG.
 */

L.DomUtil = {

	// @function get(id: String|HTMLElement): HTMLElement
	// Returns an element given its DOM id, or returns the element itself
	// if it was passed directly.
	get: function (id) {
		return typeof id === 'string' ? document.getElementById(id) : id;
	},

	// @function getStyle(el: HTMLElement, styleAttrib: String): String
	// Returns the value for a certain style attribute on an element,
	// including computed values or values set through CSS.
	getStyle: function (el, style) {

		var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	// @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
	// Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className || '';

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	// @function remove(el: HTMLElement)
	// Removes `el` from its parent element
	remove: function (el) {
		var parent = el.parentNode;
		if (parent) {
			parent.removeChild(el);
		}
	},

	// @function empty(el: HTMLElement)
	// Removes all of `el`'s children elements from `el`
	empty: function (el) {
		while (el.firstChild) {
			el.removeChild(el.firstChild);
		}
	},

	// @function toFront(el: HTMLElement)
	// Makes `el` the last children of its parent, so it renders in front of the other children.
	toFront: function (el) {
		el.parentNode.appendChild(el);
	},

	// @function toBack(el: HTMLElement)
	// Makes `el` the first children of its parent, so it renders back from the other children.
	toBack: function (el) {
		var parent = el.parentNode;
		parent.insertBefore(el, parent.firstChild);
	},

	// @function hasClass(el: HTMLElement, name: String): Boolean
	// Returns `true` if the element's class attribute contains `name`.
	hasClass: function (el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = L.DomUtil.getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	},

	// @function addClass(el: HTMLElement, name: String)
	// Adds `name` to the element's class attribute.
	addClass: function (el, name) {
		if (el.classList !== undefined) {
			var classes = L.Util.splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!L.DomUtil.hasClass(el, name)) {
			var className = L.DomUtil.getClass(el);
			L.DomUtil.setClass(el, (className ? className + ' ' : '') + name);
		}
	},

	// @function removeClass(el: HTMLElement, name: String)
	// Removes `name` from the element's class attribute.
	removeClass: function (el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			L.DomUtil.setClass(el, L.Util.trim((' ' + L.DomUtil.getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	},

	// @function setClass(el: HTMLElement, name: String)
	// Sets the element's class.
	setClass: function (el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	},

	// @function getClass(el: HTMLElement): String
	// Returns the element's class.
	getClass: function (el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	},

	// @function setOpacity(el: HTMLElement, opacity: Number)
	// Set the opacity of an element (including old IE support).
	// `opacity` must be a number from `0` to `1`.
	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {
			L.DomUtil._setOpacityIE(el, value);
		}
	},

	_setOpacityIE: function (el, value) {
		var filter = false,
		    filterName = 'DXImageTransform.Microsoft.Alpha';

		// filters collection throws an error if we try to retrieve a filter that doesn't exist
		try {
			filter = el.filters.item(filterName);
		} catch (e) {
			// don't set opacity to 1 if we haven't already set an opacity,
			// it isn't needed and breaks transparent pngs.
			if (value === 1) { return; }
		}

		value = Math.round(value * 100);

		if (filter) {
			filter.Enabled = (value !== 100);
			filter.Opacity = value;
		} else {
			el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
		}
	},

	// @function testProp(props: String[]): String|false
	// Goes through the array of style names and returns the first name
	// that is a valid style name for an element. If no such name is found,
	// it returns false. Useful for vendor-prefixed styles like `transform`.
	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	// @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
	// Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
	// and optionally scaled by `scale`. Does not have an effect if the
	// browser doesn't support 3D CSS transforms.
	setTransform: function (el, offset, scale) {
		var pos = offset || new L.Point(0, 0);

		el.style[L.DomUtil.TRANSFORM] =
			(L.Browser.ie3d ?
				'translate(' + pos.x + 'px,' + pos.y + 'px)' :
				'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
			(scale ? ' scale(' + scale + ')' : '');
	},

	// @function setPosition(el: HTMLElement, position: Point)
	// Sets the position of `el` to coordinates specified by `position`,
	// using CSS translate or top/left positioning depending on the browser
	// (used by Leaflet internally to position its layers).
	setPosition: function (el, point) { // (HTMLElement, Point[, Boolean])

		/*eslint-disable */
		el._leaflet_pos = point;
		/*eslint-enable */

		if (L.Browser.any3d) {
			L.DomUtil.setTransform(el, point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	// @function getPosition(el: HTMLElement): Point
	// Returns the coordinates of an element previously positioned with setPosition.
	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance

		return el._leaflet_pos || new L.Point(0, 0);
	}
};


(function () {
	// prefix style property names

	// @property TRANSFORM: String
	// Vendor-prefixed fransform style name (e.g. `'webkitTransform'` for WebKit).
	L.DomUtil.TRANSFORM = L.DomUtil.testProp(
			['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);


	// webkitTransition comes first because some browser versions that drop vendor prefix don't do
	// the same for the transitionend event, in particular the Android 4.1 stock browser

	// @property TRANSITION: String
	// Vendor-prefixed transform style name.
	var transition = L.DomUtil.TRANSITION = L.DomUtil.testProp(
			['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

	L.DomUtil.TRANSITION_END =
			transition === 'webkitTransition' || transition === 'OTransition' ? transition + 'End' : 'transitionend';

	// @function disableTextSelection()
	// Prevents the user from generating `selectstart` DOM events, usually generated
	// when the user drags the mouse through a page with text. Used internally
	// by Leaflet to override the behaviour of any click-and-drag interaction on
	// the map. Affects drag interactions on the whole document.

	// @function enableTextSelection()
	// Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
	if ('onselectstart' in document) {
		L.DomUtil.disableTextSelection = function () {
			L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
		};
		L.DomUtil.enableTextSelection = function () {
			L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
		};

	} else {
		var userSelectProperty = L.DomUtil.testProp(
			['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

		L.DomUtil.disableTextSelection = function () {
			if (userSelectProperty) {
				var style = document.documentElement.style;
				this._userSelect = style[userSelectProperty];
				style[userSelectProperty] = 'none';
			}
		};
		L.DomUtil.enableTextSelection = function () {
			if (userSelectProperty) {
				document.documentElement.style[userSelectProperty] = this._userSelect;
				delete this._userSelect;
			}
		};
	}

	// @function disableImageDrag()
	// As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
	// for `dragstart` DOM events, usually generated when the user drags an image.
	L.DomUtil.disableImageDrag = function () {
		L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
	};

	// @function enableImageDrag()
	// Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
	L.DomUtil.enableImageDrag = function () {
		L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
	};

	// @function preventOutline(el: HTMLElement)
	// Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
	// of the element `el` invisible. Used internally by Leaflet to prevent
	// focusable elements from displaying an outline when the user performs a
	// drag interaction on them.
	L.DomUtil.preventOutline = function (element) {
		while (element.tabIndex === -1) {
			element = element.parentNode;
		}
		if (!element || !element.style) { return; }
		L.DomUtil.restoreOutline();
		this._outlineElement = element;
		this._outlineStyle = element.style.outline;
		element.style.outline = 'none';
		L.DomEvent.on(window, 'keydown', L.DomUtil.restoreOutline, this);
	};

	// @function restoreOutline()
	// Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
	L.DomUtil.restoreOutline = function () {
		if (!this._outlineElement) { return; }
		this._outlineElement.style.outline = this._outlineStyle;
		delete this._outlineElement;
		delete this._outlineStyle;
		L.DomEvent.off(window, 'keydown', L.DomUtil.restoreOutline, this);
	};
})();



/* @class LatLng
 * @aka L.LatLng
 *
 * Represents a geographical point with a certain latitude and longitude.
 *
 * @example
 *
 * ```
 * var latlng = L.latLng(50.5, 30.5);
 * ```
 *
 * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
 *
 * ```
 * map.panTo([50, 30]);
 * map.panTo({lon: 30, lat: 50});
 * map.panTo({lat: 50, lng: 30});
 * map.panTo(L.latLng(50, 30));
 * ```
 */

L.LatLng = function (lat, lng, alt) {
	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	// @property lat: Number
	// Latitude in degrees
	this.lat = +lat;

	// @property lng: Number
	// Longitude in degrees
	this.lng = +lng;

	// @property alt: Number
	// Altitude in meters (optional)
	if (alt !== undefined) {
		this.alt = +alt;
	}
};

L.LatLng.prototype = {
	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overriden by setting `maxMargin` to a small number.
	equals: function (obj, maxMargin) {
		if (!obj) { return false; }

		obj = L.latLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	},

	// @method toString(): String
	// Returns a string representation of the point (for debugging purposes).
	toString: function (precision) {
		return 'LatLng(' +
		        L.Util.formatNum(this.lat, precision) + ', ' +
		        L.Util.formatNum(this.lng, precision) + ')';
	},

	// @method distanceTo(otherLatLng: LatLng): Number
	// Returns the distance (in meters) to the given `LatLng` calculated using the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula).
	distanceTo: function (other) {
		return L.CRS.Earth.distance(this, L.latLng(other));
	},

	// @method wrap(): LatLng
	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	wrap: function () {
		return L.CRS.Earth.wrapLatLng(this);
	},

	// @method toBounds(sizeInMeters: Number): LatLngBounds
	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	toBounds: function (sizeInMeters) {
		var latAccuracy = 180 * sizeInMeters / 40075017,
		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

		return L.latLngBounds(
		        [this.lat - latAccuracy, this.lng - lngAccuracy],
		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
	},

	clone: function () {
		return new L.LatLng(this.lat, this.lng, this.alt);
	}
};



// @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
// Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

// @alternative
// @factory L.latLng(coords: Array): LatLng
// Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

// @alternative
// @factory L.latLng(coords: Object): LatLng
// Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

L.latLng = function (a, b, c) {
	if (a instanceof L.LatLng) {
		return a;
	}
	if (L.Util.isArray(a) && typeof a[0] !== 'object') {
		if (a.length === 3) {
			return new L.LatLng(a[0], a[1], a[2]);
		}
		if (a.length === 2) {
			return new L.LatLng(a[0], a[1]);
		}
		return null;
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	}
	if (b === undefined) {
		return null;
	}
	return new L.LatLng(a, b, c);
};



/*
 * @class LatLngBounds
 * @aka L.LatLngBounds
 *
 * Represents a rectangular geographical area on a map.
 *
 * @example
 *
 * ```js
 * var corner1 = L.latLng(40.712, -74.227),
 * corner2 = L.latLng(40.774, -74.125),
 * bounds = L.latLngBounds(corner1, corner2);
 * ```
 *
 * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * map.fitBounds([
 * 	[40.712, -74.227],
 * 	[40.774, -74.125]
 * ]);
 * ```
 *
 * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
 */

L.LatLngBounds = function (corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
	if (!corner1) { return; }

	var latlngs = corner2 ? [corner1, corner2] : corner1;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
};

L.LatLngBounds.prototype = {

	// @method extend(latlng: LatLng): this
	// Extend the bounds to contain the given point

	// @alternative
	// @method extend(otherBounds: LatLngBounds): this
	// Extend the bounds to contain the given bounds
	extend: function (obj) {
		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLng) {
			sw2 = obj;
			ne2 = obj;

		} else if (obj instanceof L.LatLngBounds) {
			sw2 = obj._southWest;
			ne2 = obj._northEast;

			if (!sw2 || !ne2) { return this; }

		} else {
			return obj ? this.extend(L.latLng(obj) || L.latLngBounds(obj)) : this;
		}

		if (!sw && !ne) {
			this._southWest = new L.LatLng(sw2.lat, sw2.lng);
			this._northEast = new L.LatLng(ne2.lat, ne2.lng);
		} else {
			sw.lat = Math.min(sw2.lat, sw.lat);
			sw.lng = Math.min(sw2.lng, sw.lng);
			ne.lat = Math.max(ne2.lat, ne.lat);
			ne.lng = Math.max(ne2.lng, ne.lng);
		}

		return this;
	},

	// @method pad(bufferRatio: Number): LatLngBounds
	// Returns bigger bounds created by extending the current bounds by a given percentage in each direction.
	pad: function (bufferRatio) {
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new L.LatLngBounds(
		        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	// @method getCenter(): LatLng
	// Returns the center point of the bounds.
	getCenter: function () {
		return new L.LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	// @method getSouthWest(): LatLng
	// Returns the south-west point of the bounds.
	getSouthWest: function () {
		return this._southWest;
	},

	// @method getNorthEast(): LatLng
	// Returns the north-east point of the bounds.
	getNorthEast: function () {
		return this._northEast;
	},

	// @method getNorthWest(): LatLng
	// Returns the north-west point of the bounds.
	getNorthWest: function () {
		return new L.LatLng(this.getNorth(), this.getWest());
	},

	// @method getSouthEast(): LatLng
	// Returns the south-east point of the bounds.
	getSouthEast: function () {
		return new L.LatLng(this.getSouth(), this.getEast());
	},

	// @method getWest(): Number
	// Returns the west longitude of the bounds
	getWest: function () {
		return this._southWest.lng;
	},

	// @method getSouth(): Number
	// Returns the south latitude of the bounds
	getSouth: function () {
		return this._southWest.lat;
	},

	// @method getEast(): Number
	// Returns the east longitude of the bounds
	getEast: function () {
		return this._northEast.lng;
	},

	// @method getNorth(): Number
	// Returns the north latitude of the bounds
	getNorth: function () {
		return this._northEast.lat;
	},

	// @method contains(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle contains the given one.

	// @alternative
	// @method contains (latlng: LatLng): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng || 'lat' in obj) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	// @method intersects(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
	intersects: function (bounds) {
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
	overlaps: function (bounds) {
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

		return latOverlaps && lngOverlaps;
	},

	// @method toBBoxString(): String
	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	// @method equals(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds.
	equals: function (bounds) {
		if (!bounds) { return false; }

		bounds = L.latLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
	},

	// @method isValid(): Boolean
	// Returns `true` if the bounds are properly initialized.
	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

// TODO International date line?

// @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
// Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

// @alternative
// @factory L.latLngBounds(latlngs: LatLng[])
// Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
L.latLngBounds = function (a, b) {
	if (a instanceof L.LatLngBounds) {
		return a;
	}
	return new L.LatLngBounds(a, b);
};



/*
 * @namespace Projection
 * @section
 * Leaflet comes with a set of already defined Projections out of the box:
 *
 * @projection L.Projection.LonLat
 *
 * Equirectangular, or Plate Carree projection — the most simple projection,
 * mostly used by GIS enthusiasts. Directly maps `x` as longitude, and `y` as
 * latitude. Also suitable for flat worlds, e.g. game maps. Used by the
 * `EPSG:3395` and `Simple` CRS.
 */

L.Projection = {};

L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point) {
		return new L.LatLng(point.y, point.x);
	},

	bounds: L.bounds([-180, -90], [180, 90])
};



/*
 * @namespace Projection
 * @projection L.Projection.SphericalMercator
 *
 * Spherical Mercator projection — the most common projection for online maps,
 * used by almost all free and commercial tile providers. Assumes that Earth is
 * a sphere. Used by the `EPSG:3857` CRS.
 */

L.Projection.SphericalMercator = {

	R: 6378137,
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) {
		var d = Math.PI / 180,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    sin = Math.sin(lat * d);

		return new L.Point(
				this.R * latlng.lng * d,
				this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	},

	unproject: function (point) {
		var d = 180 / Math.PI;

		return new L.LatLng(
			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
			point.x * d / this.R);
	},

	bounds: (function () {
		var d = 6378137 * Math.PI;
		return L.bounds([-d, -d], [d, d]);
	})()
};



/*
 * @class CRS
 * @aka L.CRS
 * Abstract class that defines coordinate reference systems for projecting
 * geographical points into pixel (screen) coordinates and back (and to
 * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
 * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
 *
 * Leaflet defines the most usual CRSs by default. If you want to use a
 * CRS not defined by default, take a look at the
 * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
 */

L.CRS = {
	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
	// Projects geographical coordinates into pixel coordinates for a given zoom.
	latLngToPoint: function (latlng, zoom) {
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	// @method pointToLatLng(point: Point, zoom: Number): LatLng
	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
	// zoom into geographical coordinates.
	pointToLatLng: function (point, zoom) {
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	// @method project(latlng: LatLng): Point
	// Projects geographical coordinates into coordinates in units accepted for
	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
	project: function (latlng) {
		return this.projection.project(latlng);
	},

	// @method unproject(point: Point): LatLng
	// Given a projected coordinate returns the corresponding LatLng.
	// The inverse of `project`.
	unproject: function (point) {
		return this.projection.unproject(point);
	},

	// @method scale(zoom: Number): Number
	// Returns the scale used when transforming projected coordinates into
	// pixel coordinates for a particular zoom. For example, it returns
	// `256 * 2^zoom` for Mercator-based CRS.
	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	// @method zoom(scale: Number): Number
	// Inverse of `scale()`, returns the zoom level corresponding to a scale
	// factor of `scale`.
	zoom: function (scale) {
		return Math.log(scale / 256) / Math.LN2;
	},

	// @method getProjectedBounds(zoom: Number): Bounds
	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
	getProjectedBounds: function (zoom) {
		if (this.infinite) { return null; }

		var b = this.projection.bounds,
		    s = this.scale(zoom),
		    min = this.transformation.transform(b.min, s),
		    max = this.transformation.transform(b.max, s);

		return L.bounds(min, max);
	},

	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	// Returns the distance between two geographical coordinates.

	// @property code: String
	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
	//
	// @property wrapLng: Number[]
	// An array of two numbers defining whether the longitude (horizontal) coordinate
	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
	//
	// @property wrapLat: Number[]
	// Like `wrapLng`, but for the latitude (vertical) axis.

	// wrapLng: [min, max],
	// wrapLat: [min, max],

	// @property infinite: Boolean
	// If true, the coordinate space will be unbounded (infinite in both axes)
	infinite: false,

	// @method wrapLatLng(latlng: LatLng): LatLng
	// Returns a `LatLng` where lat and lng has been wrapped according to the
	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
	// Only accepts actual `L.LatLng` instances, not arrays.
	wrapLatLng: function (latlng) {
		var lng = this.wrapLng ? L.Util.wrapNum(latlng.lng, this.wrapLng, true) : latlng.lng,
		    lat = this.wrapLat ? L.Util.wrapNum(latlng.lat, this.wrapLat, true) : latlng.lat,
		    alt = latlng.alt;

		return L.latLng(lat, lng, alt);
	},

	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	// Returns a `LatLngBounds` with the same size as the given one, ensuring
	// that its center is within the CRS's bounds.
	// Only accepts actual `L.LatLngBounds` instances, not arrays.
	wrapLatLngBounds: function (bounds) {
		var center = bounds.getCenter(),
		    newCenter = this.wrapLatLng(center),
		    latShift = center.lat - newCenter.lat,
		    lngShift = center.lng - newCenter.lng;

		if (latShift === 0 && lngShift === 0) {
			return bounds;
		}

		var sw = bounds.getSouthWest(),
		    ne = bounds.getNorthEast(),
		    newSw = L.latLng({lat: sw.lat - latShift, lng: sw.lng - lngShift}),
		    newNe = L.latLng({lat: ne.lat - latShift, lng: ne.lng - lngShift});

		return new L.LatLngBounds(newSw, newNe);
	}
};



/*
 * @namespace CRS
 * @crs L.CRS.Simple
 *
 * A simple CRS that maps longitude and latitude into `x` and `y` directly.
 * May be used for maps of flat surfaces (e.g. game maps). Note that the `y`
 * axis should still be inverted (going from bottom to top). `distance()` returns
 * simple euclidean distance.
 */

L.CRS.Simple = L.extend({}, L.CRS, {
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1, 0, -1, 0),

	scale: function (zoom) {
		return Math.pow(2, zoom);
	},

	zoom: function (scale) {
		return Math.log(scale) / Math.LN2;
	},

	distance: function (latlng1, latlng2) {
		var dx = latlng2.lng - latlng1.lng,
		    dy = latlng2.lat - latlng1.lat;

		return Math.sqrt(dx * dx + dy * dy);
	},

	infinite: true
});



/*
 * @namespace CRS
 * @crs L.CRS.Earth
 *
 * Serves as the base for CRS that are global such that they cover the earth.
 * Can only be used as the base for other CRS and cannot be used directly,
 * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
 * meters.
 */

L.CRS.Earth = L.extend({}, L.CRS, {
	wrapLng: [-180, 180],

	// Mean Earth Radius, as recommended for use by
	// the International Union of Geodesy and Geophysics,
	// see http://rosettacode.org/wiki/Haversine_formula
	R: 6371000,

	// distance between two geographical points using spherical law of cosines approximation
	distance: function (latlng1, latlng2) {
		var rad = Math.PI / 180,
		    lat1 = latlng1.lat * rad,
		    lat2 = latlng2.lat * rad,
		    a = Math.sin(lat1) * Math.sin(lat2) +
		        Math.cos(lat1) * Math.cos(lat2) * Math.cos((latlng2.lng - latlng1.lng) * rad);

		return this.R * Math.acos(Math.min(a, 1));
	}
});



/*
 * @namespace CRS
 * @crs L.CRS.EPSG3857
 *
 * The most common CRS for online maps, used by almost all free and commercial
 * tile providers. Uses Spherical Mercator projection. Set in by default in
 * Map's `crs` option.
 */

L.CRS.EPSG3857 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:3857',
	projection: L.Projection.SphericalMercator,

	transformation: (function () {
		var scale = 0.5 / (Math.PI * L.Projection.SphericalMercator.R);
		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});

L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});



/*
 * @namespace CRS
 * @crs L.CRS.EPSG4326
 *
 * A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.
 *
 * Leaflet 1.0.x complies with the [TMS coordinate scheme for EPSG:4326](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification#global-geodetic),
 * which is a breaking change from 0.7.x behaviour.  If you are using a `TileLayer`
 * with this CRS, ensure that there are two 256x256 pixel tiles covering the
 * whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90),
 * or (-180,-90) for `TileLayer`s with [the `tms` option](#tilelayer-tms) set.
 */

L.CRS.EPSG4326 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:4326',
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 180, 1, -1 / 180, 0.5)
});



/*
 * @class Map
 * @aka L.Map
 * @inherits Evented
 *
 * The central class of the API — it is used to create a map on a page and manipulate it.
 *
 * @example
 *
 * ```js
 * // initialize the map on the "map" div with a given center and zoom
 * var map = L.map('map', {
 * 	center: [51.505, -0.09],
 * 	zoom: 13
 * });
 * ```
 *
 */

L.Map = L.Evented.extend({

	options: {
		// @section Map State Options
		// @option crs: CRS = L.CRS.EPSG3857
		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
		// sure what it means.
		crs: L.CRS.EPSG3857,

		// @option center: LatLng = undefined
		// Initial geographic center of the map
		center: undefined,

		// @option zoom: Number = undefined
		// Initial map zoom level
		zoom: undefined,

		// @option minZoom: Number = undefined
		// Minimum zoom level of the map. Overrides any `minZoom` option set on map layers.
		minZoom: undefined,

		// @option maxZoom: Number = undefined
		// Maximum zoom level of the map. Overrides any `maxZoom` option set on map layers.
		maxZoom: undefined,

		// @option layers: Layer[] = []
		// Array of layers that will be added to the map initially
		layers: [],

		// @option maxBounds: LatLngBounds = null
		// When this option is set, the map restricts the view to the given
		// geographical bounds, bouncing the user back if the user tries to pan
		// outside the view. To set the restriction dynamically, use
		// [`setMaxBounds`](#map-setmaxbounds) method.
		maxBounds: undefined,

		// @option renderer: Renderer = *
		// The default method for drawing vector layers on the map. `L.SVG`
		// or `L.Canvas` by default depending on browser support.
		renderer: undefined,


		// @section Animation Options
		// @option zoomAnimation: Boolean = true
		// Whether the map zoom animation is enabled. By default it's enabled
		// in all browsers that support CSS3 Transitions except Android.
		zoomAnimation: true,

		// @option zoomAnimationThreshold: Number = 4
		// Won't animate zoom if the zoom difference exceeds this value.
		zoomAnimationThreshold: 4,

		// @option fadeAnimation: Boolean = true
		// Whether the tile fade animation is enabled. By default it's enabled
		// in all browsers that support CSS3 Transitions except Android.
		fadeAnimation: true,

		// @option markerZoomAnimation: Boolean = true
		// Whether markers animate their zoom with the zoom animation, if disabled
		// they will disappear for the length of the animation. By default it's
		// enabled in all browsers that support CSS3 Transitions except Android.
		markerZoomAnimation: true,

		// @option transform3DLimit: Number = 2^23
		// Defines the maximum size of a CSS translation transform. The default
		// value should not be changed unless a web browser positions layers in
		// the wrong place after doing a large `panBy`.
		transform3DLimit: 8388608, // Precision limit of a 32-bit float

		// @section Interaction Options
		// @option zoomSnap: Number = 1
		// Forces the map's zoom level to always be a multiple of this, particularly
		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
		// By default, the zoom level snaps to the nearest integer; lower values
		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
		zoomSnap: 1,

		// @option zoomDelta: Number = 1
		// Controls how much the map's zoom level will change after a
		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
		zoomDelta: 1,

		// @option trackResize: Boolean = true
		// Whether the map automatically handles browser window resize to update itself.
		trackResize: true
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = L.setOptions(this, options);

		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = L.bind(this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.zoom !== undefined) {
			this._zoom = this._limitZoom(options.zoom);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(L.latLng(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];
		this._layers = {};
		this._zoomBoundLayers = {};
		this._sizeChanged = true;

		this.callInitHooks();

		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = L.DomUtil.TRANSITION && L.Browser.any3d && !L.Browser.mobileOpera &&
				this.options.zoomAnimation;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {
			this._createAnimProxy();
			L.DomEvent.on(this._proxy, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
		}

		this._addLayers(this.options.layers);
	},


	// @section Methods for modifying map state

	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
	// Sets the view of the map (geographical center and zoom) with the given
	// animation options.
	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
		options = options || {};

		this._stop();

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = L.extend({animate: options.animate}, options.zoom);
				options.pan = L.extend({animate: options.animate, duration: options.duration}, options.pan);
			}

			// try animating pan or zoom
			var moved = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (moved) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	// @method setZoom(zoom: Number, options: Zoom/pan options): this
	// Sets the zoom of the map.
	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = zoom;
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	// @method zoomIn(delta?: Number, options?: Zoom options): this
	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	zoomIn: function (delta, options) {
		delta = delta || (L.Browser.any3d ? this.options.zoomDelta : 1);
		return this.setZoom(this._zoom + delta, options);
	},

	// @method zoomOut(delta?: Number, options?: Zoom options): this
	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	zoomOut: function (delta, options) {
		delta = delta || (L.Browser.any3d ? this.options.zoomDelta : 1);
		return this.setZoom(this._zoom - delta, options);
	},

	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
	// Zooms the map while keeping a specified geographical point on the map
	// stationary (e.g. used internally for scroll zoom and double-click zoom).
	// @alternative
	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
	setZoomAround: function (latlng, zoom, options) {
		var scale = this.getZoomScale(zoom),
		    viewHalf = this.getSize().divideBy(2),
		    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),

		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	_getBoundsCenterZoom: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);

		var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
		    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),

		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

		    swPoint = this.project(bounds.getSouthWest(), zoom),
		    nePoint = this.project(bounds.getNorthEast(), zoom),
		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		return {
			center: center,
			zoom: zoom
		};
	},

	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
	// Sets a map view that contains the given geographical bounds with the
	// maximum zoom level possible.
	fitBounds: function (bounds, options) {

		bounds = L.latLngBounds(bounds);

		if (!bounds.isValid()) {
			throw new Error('Bounds are not valid.');
		}

		var target = this._getBoundsCenterZoom(bounds, options);
		return this.setView(target.center, target.zoom, options);
	},

	// @method fitWorld(options?: fitBounds options): this
	// Sets a map view that mostly contains the whole world with the maximum
	// zoom level possible.
	fitWorld: function (options) {
		return this.fitBounds([[-90, -180], [90, 180]], options);
	},

	// @method panTo(latlng: LatLng, options?: Pan options): this
	// Pans the map to a given center.
	panTo: function (center, options) { // (LatLng)
		return this.setView(center, this._zoom, {pan: options});
	},

	// @method panBy(offset: Point): this
	// Pans the map by a given number of pixels (animated).
	panBy: function (offset, options) {
		offset = L.point(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this.fire('moveend');
		}
		// If we pan too far, Chrome gets issues with tiles
		// and makes them disappear or appear in the wrong place (slightly offset) #2602
		if (options.animate !== true && !this.getSize().contains(offset)) {
			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset).round();
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
	// Sets the view of the map (geographical center and zoom) performing a smooth
	// pan-zoom animation.
	flyTo: function (targetCenter, targetZoom, options) {

		options = options || {};
		if (options.animate === false || !L.Browser.any3d) {
			return this.setView(targetCenter, targetZoom, options);
		}

		this._stop();

		var from = this.project(this.getCenter()),
		    to = this.project(targetCenter),
		    size = this.getSize(),
		    startZoom = this._zoom;

		targetCenter = L.latLng(targetCenter);
		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

		var w0 = Math.max(size.x, size.y),
		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
		    u1 = (to.distanceTo(from)) || 1,
		    rho = 1.42,
		    rho2 = rho * rho;

		function r(i) {
			var s1 = i ? -1 : 1,
			    s2 = i ? w1 : w0,
			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
			    b1 = 2 * s2 * rho2 * u1,
			    b = t1 / b1,
			    sq = Math.sqrt(b * b + 1) - b;

			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
			    // thus triggering an infinite loop in flyTo
			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

			return log;
		}

		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
		function tanh(n) { return sinh(n) / cosh(n); }

		var r0 = r(0);

		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

		var start = Date.now(),
		    S = (r(1) - r0) / rho,
		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

		function frame() {
			var t = (Date.now() - start) / duration,
			    s = easeOut(t) * S;

			if (t <= 1) {
				this._flyToFrame = L.Util.requestAnimFrame(frame, this);

				this._move(
					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
					this.getScaleZoom(w0 / w(s), startZoom),
					{flyTo: true});

			} else {
				this
					._move(targetCenter, targetZoom)
					._moveEnd(true);
			}
		}

		this._moveStart(true);

		frame.call(this);
		return this;
	},

	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
	flyToBounds: function (bounds, options) {
		var target = this._getBoundsCenterZoom(bounds, options);
		return this.flyTo(target.center, target.zoom, options);
	},

	// @method setMaxBounds(bounds: Bounds): this
	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
	setMaxBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		if (!bounds.isValid()) {
			this.options.maxBounds = null;
			return this.off('moveend', this._panInsideMaxBounds);
		} else if (this.options.maxBounds) {
			this.off('moveend', this._panInsideMaxBounds);
		}

		this.options.maxBounds = bounds;

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds);
	},

	// @method setMinZoom(zoom: Number): this
	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
	setMinZoom: function (zoom) {
		this.options.minZoom = zoom;

		if (this._loaded && this.getZoom() < this.options.minZoom) {
			return this.setZoom(zoom);
		}

		return this;
	},

	// @method setMaxZoom(zoom: Number): this
	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
	setMaxZoom: function (zoom) {
		this.options.maxZoom = zoom;

		if (this._loaded && (this.getZoom() > this.options.maxZoom)) {
			return this.setZoom(zoom);
		}

		return this;
	},

	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
	panInsideBounds: function (bounds, options) {
		this._enforcingBounds = true;
		var center = this.getCenter(),
		    newCenter = this._limitCenter(center, this._zoom, L.latLngBounds(bounds));

		if (!center.equals(newCenter)) {
			this.panTo(newCenter, options);
		}

		this._enforcingBounds = false;
		return this;
	},

	// @method invalidateSize(options: Zoom/Pan options): this
	// Checks if the map container size changed and updates the map if so —
	// call it after you've changed the map size dynamically, also animating
	// pan by default. If `options.pan` is `false`, panning will not occur.
	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
	// that it doesn't happen often even if the method is called many
	// times in a row.

	// @alternative
	// @method invalidateSize(animate: Boolean): this
	// Checks if the map container size changed and updates the map if so —
	// call it after you've changed the map size dynamically, also animating
	// pan by default.
	invalidateSize: function (options) {
		if (!this._loaded) { return this; }

		options = L.extend({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._lastCenter = null;

		var newSize = this.getSize(),
		    oldCenter = oldSize.divideBy(2).round(),
		    newCenter = newSize.divideBy(2).round(),
		    offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) { return this; }

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		// @section Map state change events
		// @event resize: ResizeEvent
		// Fired when the map is resized.
		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	// @section Methods for modifying map state
	// @method stop(): this
	// Stops the currently running `panTo` or `flyTo` animation, if any.
	stop: function () {
		this.setZoom(this._limitZoom(this._zoom));
		if (!this.options.zoomSnap) {
			this.fire('viewreset');
		}
		return this._stop();
	},

	// @section Geolocation methods
	// @method locate(options?: Locate options): this
	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
	// and optionally sets the map view to the user's location with respect to
	// detection accuracy (or to the world view if geolocation failed).
	// Note that, if your page doesn't use HTTPS, this method will fail in
	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
	// See `Locate options` for more details.
	locate: function (options) {

		options = this._locateOptions = L.extend({
			timeout: 10000,
			watch: false
			// setView: false
			// maxZoom: <Number>
			// maximumAge: 0
			// enableHighAccuracy: false
		}, options);

		if (!('geolocation' in navigator)) {
			this._handleGeolocationError({
				code: 0,
				message: 'Geolocation not supported.'
			});
			return this;
		}

		var onResponse = L.bind(this._handleGeolocationResponse, this),
		    onError = L.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	// @method stopLocate(): this
	// Stops watching location previously initiated by `map.locate({watch: true})`
	// and aborts resetting the map view if map.locate was called with
	// `{setView: true}`.
	stopLocate: function () {
		if (navigator.geolocation && navigator.geolocation.clearWatch) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		if (this._locateOptions) {
			this._locateOptions.setView = false;
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? 'permission denied' :
		            (c === 2 ? 'position unavailable' : 'timeout'));

		if (this._locateOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		// @section Location events
		// @event locationerror: ErrorEvent
		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
		this.fire('locationerror', {
			code: c,
			message: 'Geolocation error: ' + message + '.'
		});
	},

	_handleGeolocationResponse: function (pos) {
		var lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new L.LatLng(lat, lng),
		    bounds = latlng.toBounds(pos.coords.accuracy),
		    options = this._locateOptions;

		if (options.setView) {
			var zoom = this.getBoundsZoom(bounds);
			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
		}

		var data = {
			latlng: latlng,
			bounds: bounds,
			timestamp: pos.timestamp
		};

		for (var i in pos.coords) {
			if (typeof pos.coords[i] === 'number') {
				data[i] = pos.coords[i];
			}
		}

		// @event locationfound: LocationEvent
		// Fired when geolocation (using the [`locate`](#map-locate) method)
		// went successfully.
		this.fire('locationfound', data);
	},

	// TODO handler.addTo
	// TODO Appropiate docs section?
	// @section Other Methods
	// @method addHandler(name: String, HandlerClass: Function): this
	// Adds a new `Handler` to the map, given its name and constructor function.
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return this; }

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	// @method remove(): this
	// Destroys the map and clears all related event listeners.
	remove: function () {

		this._initEvents(true);

		if (this._containerId !== this._container._leaflet_id) {
			throw new Error('Map container is being reused by another instance');
		}

		try {
			// throws error in IE6-8
			delete this._container._leaflet_id;
			delete this._containerId;
		} catch (e) {
			/*eslint-disable */
			this._container._leaflet_id = undefined;
			/*eslint-enable */
			this._containerId = undefined;
		}

		L.DomUtil.remove(this._mapPane);

		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		if (this._loaded) {
			// @section Map state change events
			// @event unload: Event
			// Fired when the map is destroyed with [remove](#map-remove) method.
			this.fire('unload');
		}

		for (var i in this._layers) {
			this._layers[i].remove();
		}

		return this;
	},

	// @section Other Methods
	// @method createPane(name: String, container?: HTMLElement): HTMLElement
	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
	// then returns it. The pane is created as a children of `container`, or
	// as a children of the main map pane if not set.
	createPane: function (name, container) {
		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
		    pane = L.DomUtil.create('div', className, container || this._mapPane);

		if (name) {
			this._panes[name] = pane;
		}
		return pane;
	},

	// @section Methods for Getting Map State

	// @method getCenter(): LatLng
	// Returns the geographical center of the map view
	getCenter: function () {
		this._checkIfLoaded();

		if (this._lastCenter && !this._moved()) {
			return this._lastCenter;
		}
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	// @method getZoom(): Number
	// Returns the current zoom level of the map view
	getZoom: function () {
		return this._zoom;
	},

	// @method getBounds(): LatLngBounds
	// Returns the geographical bounds visible in the current map view
	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new L.LatLngBounds(sw, ne);
	},

	// @method getMinZoom(): Number
	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
	getMinZoom: function () {
		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
	},

	// @method getMaxZoom(): Number
	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean): Number
	// Returns the maximum zoom level on which the given bounds fit to the map
	// view in its entirety. If `inside` (optional) is set to `true`, the method
	// instead returns the minimum zoom level on which the map view fits into
	// the given bounds in its entirety.
	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
		bounds = L.latLngBounds(bounds);
		padding = L.point(padding || [0, 0]);

		var zoom = this.getZoom() || 0,
		    min = this.getMinZoom(),
		    max = this.getMaxZoom(),
		    nw = bounds.getNorthWest(),
		    se = bounds.getSouthEast(),
		    size = this.getSize().subtract(padding),
		    boundsSize = L.bounds(this.project(se, zoom), this.project(nw, zoom)).getSize(),
		    snap = L.Browser.any3d ? this.options.zoomSnap : 1;

		var scale = Math.min(size.x / boundsSize.x, size.y / boundsSize.y);
		zoom = this.getScaleZoom(scale, zoom);

		if (snap) {
			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
		}

		return Math.max(min, Math.min(max, zoom));
	},

	// @method getSize(): Point
	// Returns the current size of the map container (in pixels).
	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(
				this._container.clientWidth || 0,
				this._container.clientHeight || 0);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	// @method getPixelBounds(): Bounds
	// Returns the bounds of the current map view in projected pixel
	// coordinates (sometimes useful in layer and overlay implementations).
	getPixelBounds: function (center, zoom) {
		var topLeftPoint = this._getTopLeftPoint(center, zoom);
		return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
	// the map pane? "left point of the map layer" can be confusing, specially
	// since there can be negative offsets.
	// @method getPixelOrigin(): Point
	// Returns the projected pixel coordinates of the top left point of
	// the map layer (useful in custom layer and overlay implementations).
	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._pixelOrigin;
	},

	// @method getPixelWorldBounds(zoom?: Number): Bounds
	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
	// If `zoom` is omitted, the map's current zoom level is used.
	getPixelWorldBounds: function (zoom) {
		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
	},

	// @section Other Methods

	// @method getPane(pane: String|HTMLElement): HTMLElement
	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
	getPane: function (pane) {
		return typeof pane === 'string' ? this._panes[pane] : pane;
	},

	// @method getPanes(): Object
	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
	// the panes as values.
	getPanes: function () {
		return this._panes;
	},

	// @method getContainer: HTMLElement
	// Returns the HTML element that contains the map.
	getContainer: function () {
		return this._container;
	},


	// @section Conversion Methods

	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
	// Returns the scale factor to be applied to a map transition from zoom level
	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
	getZoomScale: function (toZoom, fromZoom) {
		// TODO replace with universal implementation after refactoring projections
		var crs = this.options.crs;
		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
		return crs.scale(toZoom) / crs.scale(fromZoom);
	},

	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
	// level and everything is scaled by a factor of `scale`. Inverse of
	// [`getZoomScale`](#map-getZoomScale).
	getScaleZoom: function (scale, fromZoom) {
		var crs = this.options.crs;
		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
		var zoom = crs.zoom(scale * crs.scale(fromZoom));
		return isNaN(zoom) ? Infinity : zoom;
	},

	// @method project(latlng: LatLng, zoom: Number): Point
	// Projects a geographical coordinate `LatLng` according to the projection
	// of the map's CRS, then scales it according to `zoom` and the CRS's
	// `Transformation`. The result is pixel coordinate relative to
	// the CRS origin.
	project: function (latlng, zoom) {
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
	},

	// @method unproject(point: Point, zoom: Number): LatLng
	// Inverse of [`project`](#map-project).
	unproject: function (point, zoom) {
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(L.point(point), zoom);
	},

	// @method layerPointToLatLng(point: Point): LatLng
	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	// returns the corresponding geographical coordinate (for the current zoom level).
	layerPointToLatLng: function (point) {
		var projectedPoint = L.point(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	// @method latLngToLayerPoint(latlng: LatLng): Point
	// Given a geographical coordinate, returns the corresponding pixel coordinate
	// relative to the [origin pixel](#map-getpixelorigin).
	latLngToLayerPoint: function (latlng) {
		var projectedPoint = this.project(L.latLng(latlng))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	// @method wrapLatLng(latlng: LatLng): LatLng
	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
	// CRS's bounds.
	// By default this means longitude is wrapped around the dateline so its
	// value is between -180 and +180 degrees.
	wrapLatLng: function (latlng) {
		return this.options.crs.wrapLatLng(L.latLng(latlng));
	},

	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
	// its center is within the CRS's bounds.
	// By default this means the center longitude is wrapped around the dateline so its
	// value is between -180 and +180 degrees, and the majority of the bounds
	// overlaps the CRS's bounds.
	wrapLatLngBounds: function (latlng) {
		return this.options.crs.wrapLatLngBounds(L.latLngBounds(latlng));
	},

	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	// Returns the distance between two geographical coordinates according to
	// the map's CRS. By default this measures distance in meters.
	distance: function (latlng1, latlng2) {
		return this.options.crs.distance(L.latLng(latlng1), L.latLng(latlng2));
	},

	// @method containerPointToLayerPoint(point: Point): Point
	// Given a pixel coordinate relative to the map container, returns the corresponding
	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
	containerPointToLayerPoint: function (point) { // (Point)
		return L.point(point).subtract(this._getMapPanePos());
	},

	// @method layerPointToContainerPoint(point: Point): Point
	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	// returns the corresponding pixel coordinate relative to the map container.
	layerPointToContainerPoint: function (point) { // (Point)
		return L.point(point).add(this._getMapPanePos());
	},

	// @method containerPointToLatLng(point: Point): LatLng
	// Given a pixel coordinate relative to the map container, returns
	// the corresponding geographical coordinate (for the current zoom level).
	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(L.point(point));
		return this.layerPointToLatLng(layerPoint);
	},

	// @method latLngToContainerPoint(latlng: LatLng): Point
	// Given a geographical coordinate, returns the corresponding pixel coordinate
	// relative to the map container.
	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
	},

	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
	// Given a MouseEvent object, returns the pixel coordinate relative to the
	// map container where the event took place.
	mouseEventToContainerPoint: function (e) {
		return L.DomEvent.getMousePosition(e, this._container);
	},

	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
	// Given a MouseEvent object, returns the pixel coordinate relative to
	// the [origin pixel](#map-getpixelorigin) where the event took place.
	mouseEventToLayerPoint: function (e) {
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
	// Given a MouseEvent object, returns geographical coordinate where the
	// event took place.
	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = L.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._leaflet_id) {
			throw new Error('Map container is already initialized.');
		}

		L.DomEvent.addListener(container, 'scroll', this._onScroll, this);
		this._containerId = L.Util.stamp(container);
	},

	_initLayout: function () {
		var container = this._container;

		this._fadeAnimated = this.options.fadeAnimation && L.Browser.any3d;

		L.DomUtil.addClass(container, 'leaflet-container' +
			(L.Browser.touch ? ' leaflet-touch' : '') +
			(L.Browser.retina ? ' leaflet-retina' : '') +
			(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
			(L.Browser.safari ? ' leaflet-safari' : '') +
			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

		var position = L.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};
		this._paneRenderers = {};

		// @section
		//
		// Panes are DOM elements used to control the ordering of layers on the map. You
		// can access panes with [`map.getPane`](#map-getpane) or
		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
		// [`map.createPane`](#map-createpane) method.
		//
		// Every map has the following default panes that differ only in zIndex.
		//
		// @pane mapPane: HTMLElement = 'auto'
		// Pane that contains all other map panes

		this._mapPane = this.createPane('mapPane', this._container);
		L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));

		// @pane tilePane: HTMLElement = 200
		// Pane for `GridLayer`s and `TileLayer`s
		this.createPane('tilePane');
		// @pane overlayPane: HTMLElement = 400
		// Pane for vector overlays (`Path`s), like `Polyline`s and `Polygon`s
		this.createPane('shadowPane');
		// @pane shadowPane: HTMLElement = 500
		// Pane for overlay shadows (e.g. `Marker` shadows)
		this.createPane('overlayPane');
		// @pane markerPane: HTMLElement = 600
		// Pane for `Icon`s of `Marker`s
		this.createPane('markerPane');
		// @pane tooltipPane: HTMLElement = 650
		// Pane for tooltip.
		this.createPane('tooltipPane');
		// @pane popupPane: HTMLElement = 700
		// Pane for `Popup`s.
		this.createPane('popupPane');

		if (!this.options.markerZoomAnimation) {
			L.DomUtil.addClass(panes.markerPane, 'leaflet-zoom-hide');
			L.DomUtil.addClass(panes.shadowPane, 'leaflet-zoom-hide');
		}
	},


	// private methods that modify map state

	// @section Map state change events
	_resetView: function (center, zoom) {
		L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));

		var loading = !this._loaded;
		this._loaded = true;
		zoom = this._limitZoom(zoom);

		this.fire('viewprereset');

		var zoomChanged = this._zoom !== zoom;
		this
			._moveStart(zoomChanged)
			._move(center, zoom)
			._moveEnd(zoomChanged);

		// @event viewreset: Event
		// Fired when the map needs to redraw its content (this usually happens
		// on map zoom or load). Very useful for creating custom overlays.
		this.fire('viewreset');

		// @event load: Event
		// Fired when the map is initialized (when its center and zoom are set
		// for the first time).
		if (loading) {
			this.fire('load');
		}
	},

	_moveStart: function (zoomChanged) {
		// @event zoomstart: Event
		// Fired when the map zoom is about to change (e.g. before zoom animation).
		// @event movestart: Event
		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
		if (zoomChanged) {
			this.fire('zoomstart');
		}
		return this.fire('movestart');
	},

	_move: function (center, zoom, data) {
		if (zoom === undefined) {
			zoom = this._zoom;
		}
		var zoomChanged = this._zoom !== zoom;

		this._zoom = zoom;
		this._lastCenter = center;
		this._pixelOrigin = this._getNewPixelOrigin(center);

		// @event zoom: Event
		// Fired repeatedly during any change in zoom level, including zoom
		// and fly animations.
		if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
			this.fire('zoom', data);
		}

		// @event move: Event
		// Fired repeatedly during any movement of the map, including pan and
		// fly animations.
		return this.fire('move', data);
	},

	_moveEnd: function (zoomChanged) {
		// @event zoomend: Event
		// Fired when the map has changed, after any animations.
		if (zoomChanged) {
			this.fire('zoomend');
		}

		// @event moveend: Event
		// Fired when the center of the map stops changing (e.g. user stopped
		// dragging the map).
		return this.fire('moveend');
	},

	_stop: function () {
		L.Util.cancelAnimFrame(this._flyToFrame);
		if (this._panAnim) {
			this._panAnim.stop();
		}
		return this;
	},

	_rawPanBy: function (offset) {
		L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_panInsideMaxBounds: function () {
		if (!this._enforcingBounds) {
			this.panInsideBounds(this.options.maxBounds);
		}
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// DOM event handling

	// @section Interaction events
	_initEvents: function (remove) {
		if (!L.DomEvent) { return; }

		this._targets = {};
		this._targets[L.stamp(this._container)] = this;

		var onOff = remove ? 'off' : 'on';

		// @event click: MouseEvent
		// Fired when the user clicks (or taps) the map.
		// @event dblclick: MouseEvent
		// Fired when the user double-clicks (or double-taps) the map.
		// @event mousedown: MouseEvent
		// Fired when the user pushes the mouse button on the map.
		// @event mouseup: MouseEvent
		// Fired when the user releases the mouse button on the map.
		// @event mouseover: MouseEvent
		// Fired when the mouse enters the map.
		// @event mouseout: MouseEvent
		// Fired when the mouse leaves the map.
		// @event mousemove: MouseEvent
		// Fired while the mouse moves over the map.
		// @event contextmenu: MouseEvent
		// Fired when the user pushes the right mouse button on the map, prevents
		// default browser context menu from showing if there are listeners on
		// this event. Also fired on mobile when the user holds a single touch
		// for a second (also called long press).
		// @event keypress: KeyboardEvent
		// Fired when the user presses a key from the keyboard while the map is focused.
		L.DomEvent[onOff](this._container, 'click dblclick mousedown mouseup ' +
			'mouseover mouseout mousemove contextmenu keypress', this._handleDOMEvent, this);

		if (this.options.trackResize) {
			L.DomEvent[onOff](window, 'resize', this._onResize, this);
		}

		if (L.Browser.any3d && this.options.transform3DLimit) {
			this[onOff]('moveend', this._onMoveEnd);
		}
	},

	_onResize: function () {
		L.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = L.Util.requestAnimFrame(
		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
	},

	_onScroll: function () {
		this._container.scrollTop  = 0;
		this._container.scrollLeft = 0;
	},

	_onMoveEnd: function () {
		var pos = this._getMapPanePos();
		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
			// a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
			this._resetView(this.getCenter(), this.getZoom());
		}
	},

	_findEventTargets: function (e, type) {
		var targets = [],
		    target,
		    isHover = type === 'mouseout' || type === 'mouseover',
		    src = e.target || e.srcElement,
		    dragging = false;

		while (src) {
			target = this._targets[L.stamp(src)];
			if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
				// Prevent firing click after you just dragged an object.
				dragging = true;
				break;
			}
			if (target && target.listens(type, true)) {
				if (isHover && !L.DomEvent._isExternalTarget(src, e)) { break; }
				targets.push(target);
				if (isHover) { break; }
			}
			if (src === this._container) { break; }
			src = src.parentNode;
		}
		if (!targets.length && !dragging && !isHover && L.DomEvent._isExternalTarget(src, e)) {
			targets = [this];
		}
		return targets;
	},

	_handleDOMEvent: function (e) {
		if (!this._loaded || L.DomEvent._skipped(e)) { return; }

		var type = e.type === 'keypress' && e.keyCode === 13 ? 'click' : e.type;

		if (type === 'mousedown') {
			// prevents outline when clicking on keyboard-focusable element
			L.DomUtil.preventOutline(e.target || e.srcElement);
		}

		this._fireDOMEvent(e, type);
	},

	_fireDOMEvent: function (e, type, targets) {

		if (e.type === 'click') {
			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
			// @event preclick: MouseEvent
			// Fired before mouse click on the map (sometimes useful when you
			// want something to happen on click before any existing click
			// handlers start running).
			var synth = L.Util.extend({}, e);
			synth.type = 'preclick';
			this._fireDOMEvent(synth, synth.type, targets);
		}

		if (e._stopped) { return; }

		// Find the layer the event is propagating from and its parents.
		targets = (targets || []).concat(this._findEventTargets(e, type));

		if (!targets.length) { return; }

		var target = targets[0];
		if (type === 'contextmenu' && target.listens(type, true)) {
			L.DomEvent.preventDefault(e);
		}

		var data = {
			originalEvent: e
		};

		if (e.type !== 'keypress') {
			var isMarker = target instanceof L.Marker;
			data.containerPoint = isMarker ?
					this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
		}

		for (var i = 0; i < targets.length; i++) {
			targets[i].fire(type, data, true);
			if (data.originalEvent._stopped ||
				(targets[i].options.nonBubblingEvents && L.Util.indexOf(targets[i].options.nonBubblingEvents, type) !== -1)) { return; }
		}
	},

	_draggableMoved: function (obj) {
		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
	},

	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	// @section Other Methods

	// @method whenReady(fn: Function, context?: Object): this
	// Runs the given function `fn` when the map gets initialized with
	// a view (center and zoom) and at least one layer, or immediately
	// if it's already initialized, optionally passing a function context.
	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, {target: this});
		} else {
			this.on('load', callback, context);
		}
		return this;
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return L.DomUtil.getPosition(this._mapPane) || new L.Point(0, 0);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function (center, zoom) {
		var pixelOrigin = center && zoom !== undefined ?
			this._getNewPixelOrigin(center, zoom) :
			this.getPixelOrigin();
		return pixelOrigin.subtract(this._getMapPanePos());
	},

	_getNewPixelOrigin: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
	},

	_latLngToNewLayerPoint: function (latlng, zoom, center) {
		var topLeft = this._getNewPixelOrigin(center, zoom);
		return this.project(latlng, zoom)._subtract(topLeft);
	},

	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
		var topLeft = this._getNewPixelOrigin(center, zoom);
		return L.bounds([
			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
		]);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (latlng) {
		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) { return center; }

		var centerPoint = this.project(center, zoom),
		    viewHalf = this.getSize().divideBy(2),
		    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		// If offset is less than a pixel, ignore.
		// This prevents unstable projections from getting into
		// an infinite loop of tiny offsets.
		if (offset.round().equals([0, 0])) {
			return center;
		}

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	_limitOffset: function (offset, bounds) {
		if (!bounds) { return offset; }

		var viewBounds = this.getPixelBounds(),
		    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var projectedMaxBounds = L.bounds(
		        this.project(maxBounds.getNorthEast(), zoom),
		        this.project(maxBounds.getSouthWest(), zoom)
		    ),
		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

		    dx = this._rebound(minOffset.x, -maxOffset.x),
		    dy = this._rebound(minOffset.y, -maxOffset.y);

		return new L.Point(dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom(),
		    snap = L.Browser.any3d ? this.options.zoomSnap : 1;
		if (snap) {
			zoom = Math.round(zoom / snap) * snap;
		}
		return Math.max(min, Math.min(max, zoom));
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	},

	_createAnimProxy: function () {

		var proxy = this._proxy = L.DomUtil.create('div', 'leaflet-proxy leaflet-zoom-animated');
		this._panes.mapPane.appendChild(proxy);

		this.on('zoomanim', function (e) {
			var prop = L.DomUtil.TRANSFORM,
			    transform = proxy.style[prop];

			L.DomUtil.setTransform(proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

			// workaround for case when transform is the same and so transitionend event is not fired
			if (transform === proxy.style[prop] && this._animatingZoom) {
				this._onZoomTransitionEnd();
			}
		}, this);

		this.on('load moveend', function () {
			var c = this.getCenter(),
			    z = this.getZoom();
			L.DomUtil.setTransform(proxy, this.project(c, z), this.getZoomScale(z, 1));
		}, this);
	},

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		L.Util.requestAnimFrame(function () {
			this
			    ._moveStart(true)
			    ._animateZoom(center, zoom, true);
		}, this);

		return true;
	},

	_animateZoom: function (center, zoom, startAnim, noUpdate) {
		if (startAnim) {
			this._animatingZoom = true;

			// remember what center/zoom to set after animation
			this._animateToCenter = center;
			this._animateToZoom = zoom;

			L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');
		}

		// @event zoomanim: ZoomAnimEvent
		// Fired on every frame of a zoom animation
		this.fire('zoomanim', {
			center: center,
			zoom: zoom,
			noUpdate: noUpdate
		});

		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
		setTimeout(L.bind(this._onZoomTransitionEnd, this), 250);
	},

	_onZoomTransitionEnd: function () {
		if (!this._animatingZoom) { return; }

		L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');

		this._animatingZoom = false;

		this._move(this._animateToCenter, this._animateToZoom);

		// This anim frame should prevent an obscure iOS webkit tile loading race condition.
		L.Util.requestAnimFrame(function () {
			this._moveEnd(true);
		}, this);
	}
});

// @section

// @factory L.map(id: String, options?: Map options)
// Instantiates a map object given the DOM ID of a `<div>` element
// and optionally an object literal with `Map options`.
//
// @alternative
// @factory L.map(el: HTMLElement, options?: Map options)
// Instantiates a map object given an instance of a `<div>` HTML element
// and optionally an object literal with `Map options`.
L.map = function (id, options) {
	return new L.Map(id, options);
};




/*
 * @class Layer
 * @inherits Evented
 * @aka L.Layer
 * @aka ILayer
 *
 * A set of methods from the Layer base class that all Leaflet layers use.
 * Inherits all methods, options and events from `L.Evented`.
 *
 * @example
 *
 * ```js
 * var layer = L.Marker(latlng).addTo(map);
 * layer.addTo(map);
 * layer.remove();
 * ```
 *
 * @event add: Event
 * Fired after the layer is added to a map
 *
 * @event remove: Event
 * Fired after the layer is removed from a map
 */


L.Layer = L.Evented.extend({

	// Classes extending `L.Layer` will inherit the following options:
	options: {
		// @option pane: String = 'overlayPane'
		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
		pane: 'overlayPane',
		nonBubblingEvents: [],  // Array of events that should not be bubbled to DOM parents (like the map),

		// @option attribution: String = null
		// String to be shown in the attribution control, describes the layer data, e.g. "© Mapbox".
		attribution: null
	},

	/* @section
	 * Classes extending `L.Layer` will inherit the following methods:
	 *
	 * @method addTo(map: Map): this
	 * Adds the layer to the given map
	 */
	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	// @method remove: this
	// Removes the layer from the map it is currently active on.
	remove: function () {
		return this.removeFrom(this._map || this._mapToAdd);
	},

	// @method removeFrom(map: Map): this
	// Removes the layer from the given map
	removeFrom: function (obj) {
		if (obj) {
			obj.removeLayer(this);
		}
		return this;
	},

	// @method getPane(name? : String): HTMLElement
	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
	getPane: function (name) {
		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	},

	addInteractiveTarget: function (targetEl) {
		this._map._targets[L.stamp(targetEl)] = this;
		return this;
	},

	removeInteractiveTarget: function (targetEl) {
		delete this._map._targets[L.stamp(targetEl)];
		return this;
	},

	// @method getAttribution: String
	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
	getAttribution: function () {
		return this.options.attribution;
	},

	_layerAdd: function (e) {
		var map = e.target;

		// check in case layer gets added and then removed before the map is ready
		if (!map.hasLayer(this)) { return; }

		this._map = map;
		this._zoomAnimated = map._zoomAnimated;

		if (this.getEvents) {
			var events = this.getEvents();
			map.on(events, this);
			this.once('remove', function () {
				map.off(events, this);
			}, this);
		}

		this.onAdd(map);

		if (this.getAttribution && map.attributionControl) {
			map.attributionControl.addAttribution(this.getAttribution());
		}

		this.fire('add');
		map.fire('layeradd', {layer: this});
	}
});

/* @section Extension methods
 * @uninheritable
 *
 * Every layer should extend from `L.Layer` and (re-)implement the following methods.
 *
 * @method onAdd(map: Map): this
 * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
 *
 * @method onRemove(map: Map): this
 * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
 *
 * @method getEvents(): Object
 * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
 *
 * @method getAttribution(): String
 * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
 *
 * @method beforeAdd(map: Map): this
 * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
 */


/* @namespace Map
 * @section Layer events
 *
 * @event layeradd: LayerEvent
 * Fired when a new layer is added to the map.
 *
 * @event layerremove: LayerEvent
 * Fired when some layer is removed from the map
 *
 * @section Methods for Layers and Controls
 */
L.Map.include({
	// @method addLayer(layer: Layer): this
	// Adds the given layer to the map
	addLayer: function (layer) {
		var id = L.stamp(layer);
		if (this._layers[id]) { return this; }
		this._layers[id] = layer;

		layer._mapToAdd = this;

		if (layer.beforeAdd) {
			layer.beforeAdd(this);
		}

		this.whenReady(layer._layerAdd, layer);

		return this;
	},

	// @method removeLayer(layer: Layer): this
	// Removes the given layer from the map.
	removeLayer: function (layer) {
		var id = L.stamp(layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		if (layer.getAttribution && this.attributionControl) {
			this.attributionControl.removeAttribution(layer.getAttribution());
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
			layer.fire('remove');
		}

		layer._map = layer._mapToAdd = null;

		return this;
	},

	// @method hasLayer(layer: Layer): Boolean
	// Returns `true` if the given layer is currently added to the map
	hasLayer: function (layer) {
		return !!layer && (L.stamp(layer) in this._layers);
	},

	/* @method eachLayer(fn: Function, context?: Object): this
	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
	 * ```
	 * map.eachLayer(function(layer){
	 *     layer.bindPopup('Hello');
	 * });
	 * ```
	 */
	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	_addLayers: function (layers) {
		layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},

	_addZoomLimit: function (layer) {
		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
			this._zoomBoundLayers[L.stamp(layer)] = layer;
			this._updateZoomLevels();
		}
	},

	_removeZoomLimit: function (layer) {
		var id = L.stamp(layer);

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}
	},

	_updateZoomLevels: function () {
		var minZoom = Infinity,
		    maxZoom = -Infinity,
		    oldZoomSpan = this._getZoomSpan();

		for (var i in this._zoomBoundLayers) {
			var options = this._zoomBoundLayers[i].options;

			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
		}

		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

		// @section Map state change events
		// @event zoomlevelschange: Event
		// Fired when the number of zoomlevels on the map is changed due
		// to adding or removing a layer.
		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}

		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
			this.setZoom(this._layersMaxZoom);
		}
		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
			this.setZoom(this._layersMinZoom);
		}
	}
});



/*
 * @namespace DomEvent
 * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
 */

// Inspired by John Resig, Dean Edwards and YUI addEvent implementations.



var eventsKey = '_leaflet_events';

L.DomEvent = {

	// @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
	// Adds a listener function (`fn`) to a particular DOM event type of the
	// element `el`. You can optionally specify the context of the listener
	// (object the `this` keyword will point to). You can also pass several
	// space-separated types (e.g. `'click dblclick'`).

	// @alternative
	// @function on(el: HTMLElement, eventMap: Object, context?: Object): this
	// Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	on: function (obj, types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this._on(obj, type, types[type], fn);
			}
		} else {
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(obj, types[i], fn, context);
			}
		}

		return this;
	},

	// @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
	// Removes a previously added listener function. If no function is specified,
	// it will remove all the listeners of that particular DOM event from the element.
	// Note that if you passed a custom context to on, you must pass the same
	// context to `off` in order to remove the listener.

	// @alternative
	// @function off(el: HTMLElement, eventMap: Object, context?: Object): this
	// Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	off: function (obj, types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this._off(obj, type, types[type], fn);
			}
		} else {
			types = L.Util.splitWords(types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(obj, types[i], fn, context);
			}
		}

		return this;
	},

	_on: function (obj, type, fn, context) {
		var id = type + L.stamp(fn) + (context ? '_' + L.stamp(context) : '');

		if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

		var handler = function (e) {
			return fn.call(context || obj, e || window.event);
		};

		var originalHandler = handler;

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.addPointerListener(obj, type, handler, id);

		} else if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener &&
		           !(L.Browser.pointer && L.Browser.chrome)) {
			// Chrome >55 does not need the synthetic dblclicks from addDoubleTapListener
			// See #5180
			this.addDoubleTapListener(obj, handler, id);

		} else if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				handler = function (e) {
					e = e || window.event;
					if (L.DomEvent._isExternalTarget(obj, e)) {
						originalHandler(e);
					}
				};
				obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);

			} else {
				if (type === 'click' && L.Browser.android) {
					handler = function (e) {
						return L.DomEvent._filterClick(e, originalHandler);
					};
				}
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}

		obj[eventsKey] = obj[eventsKey] || {};
		obj[eventsKey][id] = handler;

		return this;
	},

	_off: function (obj, type, fn, context) {

		var id = type + L.stamp(fn) + (context ? '_' + L.stamp(context) : ''),
		    handler = obj[eventsKey] && obj[eventsKey][id];

		if (!handler) { return this; }

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.removePointerListener(obj, type, id);

		} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);

			} else {
				obj.removeEventListener(
					type === 'mouseenter' ? 'mouseover' :
					type === 'mouseleave' ? 'mouseout' : type, handler, false);
			}

		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}

		obj[eventsKey][id] = null;

		return this;
	},

	// @function stopPropagation(ev: DOMEvent): this
	// Stop the given event from propagation to parent elements. Used inside the listener functions:
	// ```js
	// L.DomEvent.on(div, 'click', function (ev) {
	// 	L.DomEvent.stopPropagation(ev);
	// });
	// ```
	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else if (e.originalEvent) {  // In case of Leaflet event.
			e.originalEvent._stopped = true;
		} else {
			e.cancelBubble = true;
		}
		L.DomEvent._skipped(e);

		return this;
	},

	// @function disableScrollPropagation(el: HTMLElement): this
	// Adds `stopPropagation` to the element's `'mousewheel'` events (plus browser variants).
	disableScrollPropagation: function (el) {
		return L.DomEvent.on(el, 'mousewheel', L.DomEvent.stopPropagation);
	},

	// @function disableClickPropagation(el: HTMLElement): this
	// Adds `stopPropagation` to the element's `'click'`, `'doubleclick'`,
	// `'mousedown'` and `'touchstart'` events (plus browser variants).
	disableClickPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		L.DomEvent.on(el, L.Draggable.START.join(' '), stop);

		return L.DomEvent.on(el, {
			click: L.DomEvent._fakeStop,
			dblclick: stop
		});
	},

	// @function preventDefault(ev: DOMEvent): this
	// Prevents the default action of the DOM Event `ev` from happening (such as
	// following a link in the href of the a element, or doing a POST request
	// with page reload when a `<form>` is submitted).
	// Use it inside listener functions.
	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	// @function stop(ev): this
	// Does `stopPropagation` and `preventDefault` at the same time.
	stop: function (e) {
		return L.DomEvent
			.preventDefault(e)
			.stopPropagation(e);
	},

	// @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
	// Gets normalized mouse position from a DOM event relative to the
	// `container` or to the whole page if not specified.
	getMousePosition: function (e, container) {
		if (!container) {
			return new L.Point(e.clientX, e.clientY);
		}

		var rect = container.getBoundingClientRect();

		return new L.Point(
			e.clientX - rect.left - container.clientLeft,
			e.clientY - rect.top - container.clientTop);
	},

	// Chrome on Win scrolls double the pixels as in other platforms (see #4538),
	// and Firefox scrolls device pixels, not CSS pixels
	_wheelPxFactor: (L.Browser.win && L.Browser.chrome) ? 2 :
	                L.Browser.gecko ? window.devicePixelRatio :
	                1,

	// @function getWheelDelta(ev: DOMEvent): Number
	// Gets normalized wheel delta from a mousewheel DOM event, in vertical
	// pixels scrolled (negative if scrolling down).
	// Events from pointing devices without precise scrolling are mapped to
	// a best guess of 60 pixels.
	getWheelDelta: function (e) {
		return (L.Browser.edge) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
		       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / L.DomEvent._wheelPxFactor : // Pixels
		       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
		       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
		       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
		       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
		       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
		       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
		       0;
	},

	_skipEvents: {},

	_fakeStop: function (e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
		L.DomEvent._skipEvents[e.type] = true;
	},

	_skipped: function (e) {
		var skipped = this._skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		this._skipEvents[e.type] = false;
		return skipped;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_isExternalTarget: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	_filterClick: function (e, handler) {
		var timeStamp = (e.timeStamp || (e.originalEvent && e.originalEvent.timeStamp)),
		    elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events

		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return;
		}
		L.DomEvent._lastClick = timeStamp;

		handler(e);
	}
};

// @function addListener(…): this
// Alias to [`L.DomEvent.on`](#domevent-on)
L.DomEvent.addListener = L.DomEvent.on;

// @function removeListener(…): this
// Alias to [`L.DomEvent.off`](#domevent-off)
L.DomEvent.removeListener = L.DomEvent.off;



/*
 * @class PosAnimation
 * @aka L.PosAnimation
 * @inherits Evented
 * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
 *
 * @example
 * ```js
 * var fx = new L.PosAnimation();
 * fx.run(el, [300, 500], 0.5);
 * ```
 *
 * @constructor L.PosAnimation()
 * Creates a `PosAnimation` object.
 *
 */

L.PosAnimation = L.Evented.extend({

	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
	// Run an animation of a given element to a new position, optionally setting
	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
	// argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
	// `0.5` by default).
	run: function (el, newPos, duration, easeLinearity) {
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = L.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		// @event start: Event
		// Fired when the animation starts
		this.fire('start');

		this._animate();
	},

	// @method stop()
	// Stops the animation (if currently running).
	stop: function () {
		if (!this._inProgress) { return; }

		this._step(true);
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = L.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function (round) {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration), round);
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress, round) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		if (round) {
			pos._round();
		}
		L.DomUtil.setPosition(this._el, pos);

		// @event step: Event
		// Fired continuously during the animation.
		this.fire('step');
	},

	_complete: function () {
		L.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		// @event end: Event
		// Fired when the animation ends.
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});



/*
 * @namespace Projection
 * @projection L.Projection.Mercator
 *
 * Elliptical Mercator projection — more complex than Spherical Mercator. Takes into account that Earth is a geoid, not a perfect sphere. Used by the EPSG:3395 CRS.
 */

L.Projection.Mercator = {
	R: 6378137,
	R_MINOR: 6356752.314245179,

	bounds: L.bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),

	project: function (latlng) {
		var d = Math.PI / 180,
		    r = this.R,
		    y = latlng.lat * d,
		    tmp = this.R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    con = e * Math.sin(y);

		var ts = Math.tan(Math.PI / 4 - y / 2) / Math.pow((1 - con) / (1 + con), e / 2);
		y = -r * Math.log(Math.max(ts, 1E-10));

		return new L.Point(latlng.lng * d * r, y);
	},

	unproject: function (point) {
		var d = 180 / Math.PI,
		    r = this.R,
		    tmp = this.R_MINOR / r,
		    e = Math.sqrt(1 - tmp * tmp),
		    ts = Math.exp(-point.y / r),
		    phi = Math.PI / 2 - 2 * Math.atan(ts);

		for (var i = 0, dphi = 0.1, con; i < 15 && Math.abs(dphi) > 1e-7; i++) {
			con = e * Math.sin(phi);
			con = Math.pow((1 - con) / (1 + con), e / 2);
			dphi = Math.PI / 2 - 2 * Math.atan(ts * con) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, point.x * d / r);
	}
};



/*
 * @namespace CRS
 * @crs L.CRS.EPSG3395
 *
 * Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.
 */

L.CRS.EPSG3395 = L.extend({}, L.CRS.Earth, {
	code: 'EPSG:3395',
	projection: L.Projection.Mercator,

	transformation: (function () {
		var scale = 0.5 / (Math.PI * L.Projection.Mercator.R);
		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});



/*
 * @class GridLayer
 * @inherits Layer
 * @aka L.GridLayer
 *
 * Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces `TileLayer.Canvas`.
 * GridLayer can be extended to create a tiled grid of HTML elements like `<canvas>`, `<img>` or `<div>`. GridLayer will handle creating and animating these DOM elements for you.
 *
 *
 * @section Synchronous usage
 * @example
 *
 * To create a custom layer, extend GridLayer and implement the `createTile()` method, which will be passed a `Point` object with the `x`, `y`, and `z` (zoom level) coordinates to draw your tile.
 *
 * ```js
 * var CanvasLayer = L.GridLayer.extend({
 *     createTile: function(coords){
 *         // create a <canvas> element for drawing
 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
 *
 *         // setup tile width and height according to the options
 *         var size = this.getTileSize();
 *         tile.width = size.x;
 *         tile.height = size.y;
 *
 *         // get a canvas context and draw something on it using coords.x, coords.y and coords.z
 *         var ctx = tile.getContext('2d');
 *
 *         // return the tile so it can be rendered on screen
 *         return tile;
 *     }
 * });
 * ```
 *
 * @section Asynchronous usage
 * @example
 *
 * Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the `done()` callback.
 *
 * ```js
 * var CanvasLayer = L.GridLayer.extend({
 *     createTile: function(coords, done){
 *         var error;
 *
 *         // create a <canvas> element for drawing
 *         var tile = L.DomUtil.create('canvas', 'leaflet-tile');
 *
 *         // setup tile width and height according to the options
 *         var size = this.getTileSize();
 *         tile.width = size.x;
 *         tile.height = size.y;
 *
 *         // draw something asynchronously and pass the tile to the done() callback
 *         setTimeout(function() {
 *             done(error, tile);
 *         }, 1000);
 *
 *         return tile;
 *     }
 * });
 * ```
 *
 * @section
 */


L.GridLayer = L.Layer.extend({

	// @section
	// @aka GridLayer options
	options: {
		// @option tileSize: Number|Point = 256
		// Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
		tileSize: 256,

		// @option opacity: Number = 1.0
		// Opacity of the tiles. Can be used in the `createTile()` function.
		opacity: 1,

		// @option updateWhenIdle: Boolean = depends
		// If `false`, new tiles are loaded during panning, otherwise only after it (for better performance). `true` by default on mobile browsers, otherwise `false`.
		updateWhenIdle: L.Browser.mobile,

		// @option updateWhenZooming: Boolean = true
		// By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
		updateWhenZooming: true,

		// @option updateInterval: Number = 200
		// Tiles will not update more than once every `updateInterval` milliseconds when panning.
		updateInterval: 200,

		// @option zIndex: Number = 1
		// The explicit zIndex of the tile layer.
		zIndex: 1,

		// @option bounds: LatLngBounds = undefined
		// If set, tiles will only be loaded inside the set `LatLngBounds`.
		bounds: null,

		// @option minZoom: Number = 0
		// The minimum zoom level that tiles will be loaded at. By default the entire map.
		minZoom: 0,

		// @option maxZoom: Number = undefined
		// The maximum zoom level that tiles will be loaded at.
		maxZoom: undefined,

		// @option noWrap: Boolean = false
		// Whether the layer is wrapped around the antimeridian. If `true`, the
		// GridLayer will only be displayed once at low zoom levels. Has no
		// effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
		// in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
		// tiles outside the CRS limits.
		noWrap: false,

		// @option pane: String = 'tilePane'
		// `Map pane` where the grid layer will be added.
		pane: 'tilePane',

		// @option className: String = ''
		// A custom class name to assign to the tile layer. Empty by default.
		className: '',

		// @option keepBuffer: Number = 2
		// When panning the map, keep this many rows and columns of tiles before unloading them.
		keepBuffer: 2
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	onAdd: function () {
		this._initContainer();

		this._levels = {};
		this._tiles = {};

		this._resetView();
		this._update();
	},

	beforeAdd: function (map) {
		map._addZoomLimit(this);
	},

	onRemove: function (map) {
		this._removeAllTiles();
		L.DomUtil.remove(this._container);
		map._removeZoomLimit(this);
		this._container = null;
		this._tileZoom = null;
	},

	// @method bringToFront: this
	// Brings the tile layer to the top of all tile layers.
	bringToFront: function () {
		if (this._map) {
			L.DomUtil.toFront(this._container);
			this._setAutoZIndex(Math.max);
		}
		return this;
	},

	// @method bringToBack: this
	// Brings the tile layer to the bottom of all tile layers.
	bringToBack: function () {
		if (this._map) {
			L.DomUtil.toBack(this._container);
			this._setAutoZIndex(Math.min);
		}
		return this;
	},

	// @method getContainer: HTMLElement
	// Returns the HTML element that contains the tiles for this layer.
	getContainer: function () {
		return this._container;
	},

	// @method setOpacity(opacity: Number): this
	// Changes the [opacity](#gridlayer-opacity) of the grid layer.
	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
		return this;
	},

	// @method setZIndex(zIndex: Number): this
	// Changes the [zIndex](#gridlayer-zindex) of the grid layer.
	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	// @method isLoading: Boolean
	// Returns `true` if any tile in the grid layer has not finished loading.
	isLoading: function () {
		return this._loading;
	},

	// @method redraw: this
	// Causes the layer to clear all the tiles and request them again.
	redraw: function () {
		if (this._map) {
			this._removeAllTiles();
			this._update();
		}
		return this;
	},

	getEvents: function () {
		var events = {
			viewprereset: this._invalidateAll,
			viewreset: this._resetView,
			zoom: this._resetView,
			moveend: this._onMoveEnd
		};

		if (!this.options.updateWhenIdle) {
			// update tiles on move, but not more often than once per given interval
			if (!this._onMove) {
				this._onMove = L.Util.throttle(this._onMoveEnd, this.options.updateInterval, this);
			}

			events.move = this._onMove;
		}

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	// @section Extension methods
	// Layers extending `GridLayer` shall reimplement the following method.
	// @method createTile(coords: Object, done?: Function): HTMLElement
	// Called only internally, must be overriden by classes extending `GridLayer`.
	// Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
	// is specified, it must be called when the tile has finished loading and drawing.
	createTile: function () {
		return document.createElement('div');
	},

	// @section
	// @method getTileSize: Point
	// Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
	getTileSize: function () {
		var s = this.options.tileSize;
		return s instanceof L.Point ? s : new L.Point(s, s);
	},

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined && this.options.zIndex !== null) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	_setAutoZIndex: function (compare) {
		// go through all other layers of the same pane, set zIndex to max + 1 (front) or min - 1 (back)

		var layers = this.getPane().children,
		    edgeZIndex = -compare(-Infinity, Infinity); // -Infinity for max, Infinity for min

		for (var i = 0, len = layers.length, zIndex; i < len; i++) {

			zIndex = layers[i].style.zIndex;

			if (layers[i] !== this._container && zIndex) {
				edgeZIndex = compare(edgeZIndex, +zIndex);
			}
		}

		if (isFinite(edgeZIndex)) {
			this.options.zIndex = edgeZIndex + compare(-1, 1);
			this._updateZIndex();
		}
	},

	_updateOpacity: function () {
		if (!this._map) { return; }

		// IE doesn't inherit filter opacity properly, so we're forced to set it on tiles
		if (L.Browser.ielt9) { return; }

		L.DomUtil.setOpacity(this._container, this.options.opacity);

		var now = +new Date(),
		    nextFrame = false,
		    willPrune = false;

		for (var key in this._tiles) {
			var tile = this._tiles[key];
			if (!tile.current || !tile.loaded) { continue; }

			var fade = Math.min(1, (now - tile.loaded) / 200);

			L.DomUtil.setOpacity(tile.el, fade);
			if (fade < 1) {
				nextFrame = true;
			} else {
				if (tile.active) { willPrune = true; }
				tile.active = true;
			}
		}

		if (willPrune && !this._noPrune) { this._pruneTiles(); }

		if (nextFrame) {
			L.Util.cancelAnimFrame(this._fadeFrame);
			this._fadeFrame = L.Util.requestAnimFrame(this._updateOpacity, this);
		}
	},

	_initContainer: function () {
		if (this._container) { return; }

		this._container = L.DomUtil.create('div', 'leaflet-layer ' + (this.options.className || ''));
		this._updateZIndex();

		if (this.options.opacity < 1) {
			this._updateOpacity();
		}

		this.getPane().appendChild(this._container);
	},

	_updateLevels: function () {

		var zoom = this._tileZoom,
		    maxZoom = this.options.maxZoom;

		if (zoom === undefined) { return undefined; }

		for (var z in this._levels) {
			if (this._levels[z].el.children.length || z === zoom) {
				this._levels[z].el.style.zIndex = maxZoom - Math.abs(zoom - z);
			} else {
				L.DomUtil.remove(this._levels[z].el);
				this._removeTilesAtZoom(z);
				delete this._levels[z];
			}
		}

		var level = this._levels[zoom],
		    map = this._map;

		if (!level) {
			level = this._levels[zoom] = {};

			level.el = L.DomUtil.create('div', 'leaflet-tile-container leaflet-zoom-animated', this._container);
			level.el.style.zIndex = maxZoom;

			level.origin = map.project(map.unproject(map.getPixelOrigin()), zoom).round();
			level.zoom = zoom;

			this._setZoomTransform(level, map.getCenter(), map.getZoom());

			// force the browser to consider the newly added element for transition
			L.Util.falseFn(level.el.offsetWidth);
		}

		this._level = level;

		return level;
	},

	_pruneTiles: function () {
		if (!this._map) {
			return;
		}

		var key, tile;

		var zoom = this._map.getZoom();
		if (zoom > this.options.maxZoom ||
			zoom < this.options.minZoom) {
			this._removeAllTiles();
			return;
		}

		for (key in this._tiles) {
			tile = this._tiles[key];
			tile.retain = tile.current;
		}

		for (key in this._tiles) {
			tile = this._tiles[key];
			if (tile.current && !tile.active) {
				var coords = tile.coords;
				if (!this._retainParent(coords.x, coords.y, coords.z, coords.z - 5)) {
					this._retainChildren(coords.x, coords.y, coords.z, coords.z + 2);
				}
			}
		}

		for (key in this._tiles) {
			if (!this._tiles[key].retain) {
				this._removeTile(key);
			}
		}
	},

	_removeTilesAtZoom: function (zoom) {
		for (var key in this._tiles) {
			if (this._tiles[key].coords.z !== zoom) {
				continue;
			}
			this._removeTile(key);
		}
	},

	_removeAllTiles: function () {
		for (var key in this._tiles) {
			this._removeTile(key);
		}
	},

	_invalidateAll: function () {
		for (var z in this._levels) {
			L.DomUtil.remove(this._levels[z].el);
			delete this._levels[z];
		}
		this._removeAllTiles();

		this._tileZoom = null;
	},

	_retainParent: function (x, y, z, minZoom) {
		var x2 = Math.floor(x / 2),
		    y2 = Math.floor(y / 2),
		    z2 = z - 1,
		    coords2 = new L.Point(+x2, +y2);
		coords2.z = +z2;

		var key = this._tileCoordsToKey(coords2),
		    tile = this._tiles[key];

		if (tile && tile.active) {
			tile.retain = true;
			return true;

		} else if (tile && tile.loaded) {
			tile.retain = true;
		}

		if (z2 > minZoom) {
			return this._retainParent(x2, y2, z2, minZoom);
		}

		return false;
	},

	_retainChildren: function (x, y, z, maxZoom) {

		for (var i = 2 * x; i < 2 * x + 2; i++) {
			for (var j = 2 * y; j < 2 * y + 2; j++) {

				var coords = new L.Point(i, j);
				coords.z = z + 1;

				var key = this._tileCoordsToKey(coords),
				    tile = this._tiles[key];

				if (tile && tile.active) {
					tile.retain = true;
					continue;

				} else if (tile && tile.loaded) {
					tile.retain = true;
				}

				if (z + 1 < maxZoom) {
					this._retainChildren(i, j, z + 1, maxZoom);
				}
			}
		}
	},

	_resetView: function (e) {
		var animating = e && (e.pinch || e.flyTo);
		this._setView(this._map.getCenter(), this._map.getZoom(), animating, animating);
	},

	_animateZoom: function (e) {
		this._setView(e.center, e.zoom, true, e.noUpdate);
	},

	_setView: function (center, zoom, noPrune, noUpdate) {
		var tileZoom = Math.round(zoom);
		if ((this.options.maxZoom !== undefined && tileZoom > this.options.maxZoom) ||
		    (this.options.minZoom !== undefined && tileZoom < this.options.minZoom)) {
			tileZoom = undefined;
		}

		var tileZoomChanged = this.options.updateWhenZooming && (tileZoom !== this._tileZoom);

		if (!noUpdate || tileZoomChanged) {

			this._tileZoom = tileZoom;

			if (this._abortLoading) {
				this._abortLoading();
			}

			this._updateLevels();
			this._resetGrid();

			if (tileZoom !== undefined) {
				this._update(center);
			}

			if (!noPrune) {
				this._pruneTiles();
			}

			// Flag to prevent _updateOpacity from pruning tiles during
			// a zoom anim or a pinch gesture
			this._noPrune = !!noPrune;
		}

		this._setZoomTransforms(center, zoom);
	},

	_setZoomTransforms: function (center, zoom) {
		for (var i in this._levels) {
			this._setZoomTransform(this._levels[i], center, zoom);
		}
	},

	_setZoomTransform: function (level, center, zoom) {
		var scale = this._map.getZoomScale(zoom, level.zoom),
		    translate = level.origin.multiplyBy(scale)
		        .subtract(this._map._getNewPixelOrigin(center, zoom)).round();

		if (L.Browser.any3d) {
			L.DomUtil.setTransform(level.el, translate, scale);
		} else {
			L.DomUtil.setPosition(level.el, translate);
		}
	},

	_resetGrid: function () {
		var map = this._map,
		    crs = map.options.crs,
		    tileSize = this._tileSize = this.getTileSize(),
		    tileZoom = this._tileZoom;

		var bounds = this._map.getPixelWorldBounds(this._tileZoom);
		if (bounds) {
			this._globalTileRange = this._pxBoundsToTileRange(bounds);
		}

		this._wrapX = crs.wrapLng && !this.options.noWrap && [
			Math.floor(map.project([0, crs.wrapLng[0]], tileZoom).x / tileSize.x),
			Math.ceil(map.project([0, crs.wrapLng[1]], tileZoom).x / tileSize.y)
		];
		this._wrapY = crs.wrapLat && !this.options.noWrap && [
			Math.floor(map.project([crs.wrapLat[0], 0], tileZoom).y / tileSize.x),
			Math.ceil(map.project([crs.wrapLat[1], 0], tileZoom).y / tileSize.y)
		];
	},

	_onMoveEnd: function () {
		if (!this._map || this._map._animatingZoom) { return; }

		this._update();
	},

	_getTiledPixelBounds: function (center) {
		var map = this._map,
		    mapZoom = map._animatingZoom ? Math.max(map._animateToZoom, map.getZoom()) : map.getZoom(),
		    scale = map.getZoomScale(mapZoom, this._tileZoom),
		    pixelCenter = map.project(center, this._tileZoom).floor(),
		    halfSize = map.getSize().divideBy(scale * 2);

		return new L.Bounds(pixelCenter.subtract(halfSize), pixelCenter.add(halfSize));
	},

	// Private method to load tiles in the grid's active zoom level according to map bounds
	_update: function (center) {
		var map = this._map;
		if (!map) { return; }
		var zoom = map.getZoom();

		if (center === undefined) { center = map.getCenter(); }
		if (this._tileZoom === undefined) { return; }	// if out of minzoom/maxzoom

		var pixelBounds = this._getTiledPixelBounds(center),
		    tileRange = this._pxBoundsToTileRange(pixelBounds),
		    tileCenter = tileRange.getCenter(),
		    queue = [],
		    margin = this.options.keepBuffer,
		    noPruneRange = new L.Bounds(tileRange.getBottomLeft().subtract([margin, -margin]),
		                              tileRange.getTopRight().add([margin, -margin]));

		for (var key in this._tiles) {
			var c = this._tiles[key].coords;
			if (c.z !== this._tileZoom || !noPruneRange.contains(L.point(c.x, c.y))) {
				this._tiles[key].current = false;
			}
		}

		// _update just loads more tiles. If the tile zoom level differs too much
		// from the map's, let _setView reset levels and prune old tiles.
		if (Math.abs(zoom - this._tileZoom) > 1) { this._setView(center, zoom); return; }

		// create a queue of coordinates to load tiles from
		for (var j = tileRange.min.y; j <= tileRange.max.y; j++) {
			for (var i = tileRange.min.x; i <= tileRange.max.x; i++) {
				var coords = new L.Point(i, j);
				coords.z = this._tileZoom;

				if (!this._isValidTile(coords)) { continue; }

				var tile = this._tiles[this._tileCoordsToKey(coords)];
				if (tile) {
					tile.current = true;
				} else {
					queue.push(coords);
				}
			}
		}

		// sort tile queue to load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(tileCenter) - b.distanceTo(tileCenter);
		});

		if (queue.length !== 0) {
			// if it's the first batch of tiles to load
			if (!this._loading) {
				this._loading = true;
				// @event loading: Event
				// Fired when the grid layer starts loading tiles.
				this.fire('loading');
			}

			// create DOM fragment to append tiles in one batch
			var fragment = document.createDocumentFragment();

			for (i = 0; i < queue.length; i++) {
				this._addTile(queue[i], fragment);
			}

			this._level.el.appendChild(fragment);
		}
	},

	_isValidTile: function (coords) {
		var crs = this._map.options.crs;

		if (!crs.infinite) {
			// don't load tile if it's out of bounds and not wrapped
			var bounds = this._globalTileRange;
			if ((!crs.wrapLng && (coords.x < bounds.min.x || coords.x > bounds.max.x)) ||
			    (!crs.wrapLat && (coords.y < bounds.min.y || coords.y > bounds.max.y))) { return false; }
		}

		if (!this.options.bounds) { return true; }

		// don't load tile if it doesn't intersect the bounds in options
		var tileBounds = this._tileCoordsToBounds(coords);
		return L.latLngBounds(this.options.bounds).overlaps(tileBounds);
	},

	_keyToBounds: function (key) {
		return this._tileCoordsToBounds(this._keyToTileCoords(key));
	},

	// converts tile coordinates to its geographical bounds
	_tileCoordsToBounds: function (coords) {

		var map = this._map,
		    tileSize = this.getTileSize(),

		    nwPoint = coords.scaleBy(tileSize),
		    sePoint = nwPoint.add(tileSize),

		    nw = map.unproject(nwPoint, coords.z),
		    se = map.unproject(sePoint, coords.z),
		    bounds = new L.LatLngBounds(nw, se);

		if (!this.options.noWrap) {
			map.wrapLatLngBounds(bounds);
		}

		return bounds;
	},

	// converts tile coordinates to key for the tile cache
	_tileCoordsToKey: function (coords) {
		return coords.x + ':' + coords.y + ':' + coords.z;
	},

	// converts tile cache key to coordinates
	_keyToTileCoords: function (key) {
		var k = key.split(':'),
		    coords = new L.Point(+k[0], +k[1]);
		coords.z = +k[2];
		return coords;
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];
		if (!tile) { return; }

		L.DomUtil.remove(tile.el);

		delete this._tiles[key];

		// @event tileunload: TileEvent
		// Fired when a tile is removed (e.g. when a tile goes off the screen).
		this.fire('tileunload', {
			tile: tile.el,
			coords: this._keyToTileCoords(key)
		});
	},

	_initTile: function (tile) {
		L.DomUtil.addClass(tile, 'leaflet-tile');

		var tileSize = this.getTileSize();
		tile.style.width = tileSize.x + 'px';
		tile.style.height = tileSize.y + 'px';

		tile.onselectstart = L.Util.falseFn;
		tile.onmousemove = L.Util.falseFn;

		// update opacity on tiles in IE7-8 because of filter inheritance problems
		if (L.Browser.ielt9 && this.options.opacity < 1) {
			L.DomUtil.setOpacity(tile, this.options.opacity);
		}

		// without this hack, tiles disappear after zoom on Chrome for Android
		// https://github.com/Leaflet/Leaflet/issues/2078
		if (L.Browser.android && !L.Browser.android23) {
			tile.style.WebkitBackfaceVisibility = 'hidden';
		}
	},

	_addTile: function (coords, container) {
		var tilePos = this._getTilePos(coords),
		    key = this._tileCoordsToKey(coords);

		var tile = this.createTile(this._wrapCoords(coords), L.bind(this._tileReady, this, coords));

		this._initTile(tile);

		// if createTile is defined with a second argument ("done" callback),
		// we know that tile is async and will be ready later; otherwise
		if (this.createTile.length < 2) {
			// mark tile as ready, but delay one frame for opacity animation to happen
			L.Util.requestAnimFrame(L.bind(this._tileReady, this, coords, null, tile));
		}

		L.DomUtil.setPosition(tile, tilePos);

		// save tile in cache
		this._tiles[key] = {
			el: tile,
			coords: coords,
			current: true
		};

		container.appendChild(tile);
		// @event tileloadstart: TileEvent
		// Fired when a tile is requested and starts loading.
		this.fire('tileloadstart', {
			tile: tile,
			coords: coords
		});
	},

	_tileReady: function (coords, err, tile) {
		if (!this._map) { return; }

		if (err) {
			// @event tileerror: TileErrorEvent
			// Fired when there is an error loading a tile.
			this.fire('tileerror', {
				error: err,
				tile: tile,
				coords: coords
			});
		}

		var key = this._tileCoordsToKey(coords);

		tile = this._tiles[key];
		if (!tile) { return; }

		tile.loaded = +new Date();
		if (this._map._fadeAnimated) {
			L.DomUtil.setOpacity(tile.el, 0);
			L.Util.cancelAnimFrame(this._fadeFrame);
			this._fadeFrame = L.Util.requestAnimFrame(this._updateOpacity, this);
		} else {
			tile.active = true;
			this._pruneTiles();
		}

		if (!err) {
			L.DomUtil.addClass(tile.el, 'leaflet-tile-loaded');

			// @event tileload: TileEvent
			// Fired when a tile loads.
			this.fire('tileload', {
				tile: tile.el,
				coords: coords
			});
		}

		if (this._noTilesToLoad()) {
			this._loading = false;
			// @event load: Event
			// Fired when the grid layer loaded all visible tiles.
			this.fire('load');

			if (L.Browser.ielt9 || !this._map._fadeAnimated) {
				L.Util.requestAnimFrame(this._pruneTiles, this);
			} else {
				// Wait a bit more than 0.2 secs (the duration of the tile fade-in)
				// to trigger a pruning.
				setTimeout(L.bind(this._pruneTiles, this), 250);
			}
		}
	},

	_getTilePos: function (coords) {
		return coords.scaleBy(this.getTileSize()).subtract(this._level.origin);
	},

	_wrapCoords: function (coords) {
		var newCoords = new L.Point(
			this._wrapX ? L.Util.wrapNum(coords.x, this._wrapX) : coords.x,
			this._wrapY ? L.Util.wrapNum(coords.y, this._wrapY) : coords.y);
		newCoords.z = coords.z;
		return newCoords;
	},

	_pxBoundsToTileRange: function (bounds) {
		var tileSize = this.getTileSize();
		return new L.Bounds(
			bounds.min.unscaleBy(tileSize).floor(),
			bounds.max.unscaleBy(tileSize).ceil().subtract([1, 1]));
	},

	_noTilesToLoad: function () {
		for (var key in this._tiles) {
			if (!this._tiles[key].loaded) { return false; }
		}
		return true;
	}
});

// @factory L.gridLayer(options?: GridLayer options)
// Creates a new instance of GridLayer with the supplied options.
L.gridLayer = function (options) {
	return new L.GridLayer(options);
};



/*
 * @class TileLayer
 * @inherits GridLayer
 * @aka L.TileLayer
 * Used to load and display tile layers on the map. Extends `GridLayer`.
 *
 * @example
 *
 * ```js
 * L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar'}).addTo(map);
 * ```
 *
 * @section URL template
 * @example
 *
 * A string of the following form:
 *
 * ```
 * 'http://{s}.somedomain.com/blabla/{z}/{x}/{y}{r}.png'
 * ```
 *
 * `{s}` means one of the available subdomains (used sequentially to help with browser parallel requests per domain limitation; subdomain values are specified in options; `a`, `b` or `c` by default, can be omitted), `{z}` — zoom level, `{x}` and `{y}` — tile coordinates. `{r}` can be used to add @2x to the URL to load retina tiles.
 *
 * You can use custom keys in the template, which will be [evaluated](#util-template) from TileLayer options, like this:
 *
 * ```
 * L.tileLayer('http://{s}.somedomain.com/{foo}/{z}/{x}/{y}.png', {foo: 'bar'});
 * ```
 */


L.TileLayer = L.GridLayer.extend({

	// @section
	// @aka TileLayer options
	options: {
		// @option minZoom: Number = 0
		// Minimum zoom number.
		minZoom: 0,

		// @option maxZoom: Number = 18
		// Maximum zoom number.
		maxZoom: 18,

		// @option maxNativeZoom: Number = null
		// Maximum zoom number the tile source has available. If it is specified,
		// the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
		// from `maxNativeZoom` level and auto-scaled.
		maxNativeZoom: null,

		// @option minNativeZoom: Number = null
		// Minimum zoom number the tile source has available. If it is specified,
		// the tiles on all zoom levels lower than `minNativeZoom` will be loaded
		// from `minNativeZoom` level and auto-scaled.
		minNativeZoom: null,

		// @option subdomains: String|String[] = 'abc'
		// Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
		subdomains: 'abc',

		// @option errorTileUrl: String = ''
		// URL to the tile image to show in place of the tile that failed to load.
		errorTileUrl: '',

		// @option zoomOffset: Number = 0
		// The zoom number used in tile URLs will be offset with this value.
		zoomOffset: 0,

		// @option tms: Boolean = false
		// If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
		tms: false,

		// @option zoomReverse: Boolean = false
		// If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
		zoomReverse: false,

		// @option detectRetina: Boolean = false
		// If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
		detectRetina: false,

		// @option crossOrigin: Boolean = false
		// If true, all tiles will have their crossOrigin attribute set to ''. This is needed if you want to access tile pixel data.
		crossOrigin: false
	},

	initialize: function (url, options) {

		this._url = url;

		options = L.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);

			if (!options.zoomReverse) {
				options.zoomOffset++;
				options.maxZoom--;
			} else {
				options.zoomOffset--;
				options.minZoom++;
			}

			options.minZoom = Math.max(0, options.minZoom);
		}

		if (typeof options.subdomains === 'string') {
			options.subdomains = options.subdomains.split('');
		}

		// for https://github.com/Leaflet/Leaflet/issues/137
		if (!L.Browser.android) {
			this.on('tileunload', this._onTileRemove);
		}
	},

	// @method setUrl(url: String, noRedraw?: Boolean): this
	// Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}
		return this;
	},

	// @method createTile(coords: Object, done?: Function): HTMLElement
	// Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
	// to return an `<img>` HTML element with the appropiate image URL given `coords`. The `done`
	// callback is called when the tile has been loaded.
	createTile: function (coords, done) {
		var tile = document.createElement('img');

		L.DomEvent.on(tile, 'load', L.bind(this._tileOnLoad, this, done, tile));
		L.DomEvent.on(tile, 'error', L.bind(this._tileOnError, this, done, tile));

		if (this.options.crossOrigin) {
			tile.crossOrigin = '';
		}

		/*
		 Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
		 http://www.w3.org/TR/WCAG20-TECHS/H67
		*/
		tile.alt = '';

		/*
		 Set role="presentation" to force screen readers to ignore this
		 https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
		*/
		tile.setAttribute('role', 'presentation');

		tile.src = this.getTileUrl(coords);

		return tile;
	},

	// @section Extension methods
	// @uninheritable
	// Layers extending `TileLayer` might reimplement the following method.
	// @method getTileUrl(coords: Object): String
	// Called only internally, returns the URL for a tile given its coordinates.
	// Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
	getTileUrl: function (coords) {
		var data = {
			r: L.Browser.retina ? '@2x' : '',
			s: this._getSubdomain(coords),
			x: coords.x,
			y: coords.y,
			z: this._getZoomForUrl()
		};
		if (this._map && !this._map.options.crs.infinite) {
			var invertedY = this._globalTileRange.max.y - coords.y;
			if (this.options.tms) {
				data['y'] = invertedY;
			}
			data['-y'] = invertedY;
		}

		return L.Util.template(this._url, L.extend(data, this.options));
	},

	_tileOnLoad: function (done, tile) {
		// For https://github.com/Leaflet/Leaflet/issues/3332
		if (L.Browser.ielt9) {
			setTimeout(L.bind(done, this, null, tile), 0);
		} else {
			done(null, tile);
		}
	},

	_tileOnError: function (done, tile, e) {
		var errorUrl = this.options.errorTileUrl;
		if (errorUrl && tile.src !== errorUrl) {
			tile.src = errorUrl;
		}
		done(e, tile);
	},

	getTileSize: function () {
		var map = this._map,
		tileSize = L.GridLayer.prototype.getTileSize.call(this),
		zoom = this._tileZoom + this.options.zoomOffset,
		minNativeZoom = this.options.minNativeZoom,
		maxNativeZoom = this.options.maxNativeZoom;

		// decrease tile size when scaling below minNativeZoom
		if (minNativeZoom !== null && zoom < minNativeZoom) {
			return tileSize.divideBy(map.getZoomScale(minNativeZoom, zoom)).round();
		}

		// increase tile size when scaling above maxNativeZoom
		if (maxNativeZoom !== null && zoom > maxNativeZoom) {
			return tileSize.divideBy(map.getZoomScale(maxNativeZoom, zoom)).round();
		}

		return tileSize;
	},

	_onTileRemove: function (e) {
		e.tile.onload = null;
	},

	_getZoomForUrl: function () {
		var zoom = this._tileZoom,
		maxZoom = this.options.maxZoom,
		zoomReverse = this.options.zoomReverse,
		zoomOffset = this.options.zoomOffset,
		minNativeZoom = this.options.minNativeZoom,
		maxNativeZoom = this.options.maxNativeZoom;

		if (zoomReverse) {
			zoom = maxZoom - zoom;
		}

		zoom += zoomOffset;

		if (minNativeZoom !== null && zoom < minNativeZoom) {
			return minNativeZoom;
		}

		if (maxNativeZoom !== null && zoom > maxNativeZoom) {
			return maxNativeZoom;
		}

		return zoom;
	},

	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	// stops loading all tiles in the background layer
	_abortLoading: function () {
		var i, tile;
		for (i in this._tiles) {
			if (this._tiles[i].coords.z !== this._tileZoom) {
				tile = this._tiles[i].el;

				tile.onload = L.Util.falseFn;
				tile.onerror = L.Util.falseFn;

				if (!tile.complete) {
					tile.src = L.Util.emptyImageUrl;
					L.DomUtil.remove(tile);
				}
			}
		}
	}
});


// @factory L.tilelayer(urlTemplate: String, options?: TileLayer options)
// Instantiates a tile layer object given a `URL template` and optionally an options object.

L.tileLayer = function (url, options) {
	return new L.TileLayer(url, options);
};



/*
 * @class TileLayer.WMS
 * @inherits TileLayer
 * @aka L.TileLayer.WMS
 * Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends `TileLayer`.
 *
 * @example
 *
 * ```js
 * var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
 * 	layers: 'nexrad-n0r-900913',
 * 	format: 'image/png',
 * 	transparent: true,
 * 	attribution: "Weather data © 2012 IEM Nexrad"
 * });
 * ```
 */

L.TileLayer.WMS = L.TileLayer.extend({

	// @section
	// @aka TileLayer.WMS options
	// If any custom options not documented here are used, they will be sent to the
	// WMS server as extra parameters in each request URL. This can be useful for
	// [non-standard vendor WMS parameters](http://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',

		// @option layers: String = ''
		// **(required)** Comma-separated list of WMS layers to show.
		layers: '',

		// @option styles: String = ''
		// Comma-separated list of WMS styles.
		styles: '',

		// @option format: String = 'image/jpeg'
		// WMS image format (use `'image/png'` for layers with transparency).
		format: 'image/jpeg',

		// @option transparent: Boolean = false
		// If `true`, the WMS service will return images with transparency.
		transparent: false,

		// @option version: String = '1.1.1'
		// Version of the WMS service to use
		version: '1.1.1'
	},

	options: {
		// @option crs: CRS = null
		// Coordinate Reference System to use for the WMS requests, defaults to
		// map CRS. Don't change this if you're not sure what it means.
		crs: null,

		// @option uppercase: Boolean = false
		// If `true`, WMS request parameter keys will be uppercase.
		uppercase: false
	},

	initialize: function (url, options) {

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams);

		// all keys that are not TileLayer options go to WMS params
		for (var i in options) {
			if (!(i in this.options)) {
				wmsParams[i] = options[i];
			}
		}

		options = L.setOptions(this, options);

		wmsParams.width = wmsParams.height = options.tileSize * (options.detectRetina && L.Browser.retina ? 2 : 1);

		this.wmsParams = wmsParams;
	},

	onAdd: function (map) {

		this._crs = this.options.crs || map.options.crs;
		this._wmsVersion = parseFloat(this.wmsParams.version);

		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
		this.wmsParams[projectionKey] = this._crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (coords) {

		var tileBounds = this._tileCoordsToBounds(coords),
		    nw = this._crs.project(tileBounds.getNorthWest()),
		    se = this._crs.project(tileBounds.getSouthEast()),

		    bbox = (this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
			    [se.y, nw.x, nw.y, se.x] :
			    [nw.x, se.y, se.x, nw.y]).join(','),

		    url = L.TileLayer.prototype.getTileUrl.call(this, coords);

		return url +
			L.Util.getParamString(this.wmsParams, url, this.options.uppercase) +
			(this.options.uppercase ? '&BBOX=' : '&bbox=') + bbox;
	},

	// @method setParams(params: Object, noRedraw?: Boolean): this
	// Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
	setParams: function (params, noRedraw) {

		L.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});


// @factory L.tileLayer.wms(baseUrl: String, options: TileLayer.WMS options)
// Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object.
L.tileLayer.wms = function (url, options) {
	return new L.TileLayer.WMS(url, options);
};



/*
 * @class ImageOverlay
 * @aka L.ImageOverlay
 * @inherits Interactive layer
 *
 * Used to load and display a single image over specific bounds of the map. Extends `Layer`.
 *
 * @example
 *
 * ```js
 * var imageUrl = 'http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
 * 	imageBounds = [[40.712216, -74.22655], [40.773941, -74.12544]];
 * L.imageOverlay(imageUrl, imageBounds).addTo(map);
 * ```
 */

L.ImageOverlay = L.Layer.extend({

	// @section
	// @aka ImageOverlay options
	options: {
		// @option opacity: Number = 1.0
		// The opacity of the image overlay.
		opacity: 1,

		// @option alt: String = ''
		// Text for the `alt` attribute of the image (useful for accessibility).
		alt: '',

		// @option interactive: Boolean = false
		// If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
		interactive: false,

		// @option crossOrigin: Boolean = false
		// If true, the image will have its crossOrigin attribute set to ''. This is needed if you want to access image pixel data.
		crossOrigin: false
	},

	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
		this._url = url;
		this._bounds = L.latLngBounds(bounds);

		L.setOptions(this, options);
	},

	onAdd: function () {
		if (!this._image) {
			this._initImage();

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
		}

		if (this.options.interactive) {
			L.DomUtil.addClass(this._image, 'leaflet-interactive');
			this.addInteractiveTarget(this._image);
		}

		this.getPane().appendChild(this._image);
		this._reset();
	},

	onRemove: function () {
		L.DomUtil.remove(this._image);
		if (this.options.interactive) {
			this.removeInteractiveTarget(this._image);
		}
	},

	// @method setOpacity(opacity: Number): this
	// Sets the opacity of the overlay.
	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._image) {
			this._updateOpacity();
		}
		return this;
	},

	setStyle: function (styleOpts) {
		if (styleOpts.opacity) {
			this.setOpacity(styleOpts.opacity);
		}
		return this;
	},

	// @method bringToFront(): this
	// Brings the layer to the top of all overlays.
	bringToFront: function () {
		if (this._map) {
			L.DomUtil.toFront(this._image);
		}
		return this;
	},

	// @method bringToBack(): this
	// Brings the layer to the bottom of all overlays.
	bringToBack: function () {
		if (this._map) {
			L.DomUtil.toBack(this._image);
		}
		return this;
	},

	// @method setUrl(url: String): this
	// Changes the URL of the image.
	setUrl: function (url) {
		this._url = url;

		if (this._image) {
			this._image.src = url;
		}
		return this;
	},

	// @method setBounds(bounds: LatLngBounds): this
	// Update the bounds that this ImageOverlay covers
	setBounds: function (bounds) {
		this._bounds = bounds;

		if (this._map) {
			this._reset();
		}
		return this;
	},

	getEvents: function () {
		var events = {
			zoom: this._reset,
			viewreset: this._reset
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}

		return events;
	},

	// @method getBounds(): LatLngBounds
	// Get the bounds that this ImageOverlay covers
	getBounds: function () {
		return this._bounds;
	},

	// @method getElement(): HTMLElement
	// Get the img element that represents the ImageOverlay on the map
	getElement: function () {
		return this._image;
	},

	_initImage: function () {
		var img = this._image = L.DomUtil.create('img',
				'leaflet-image-layer ' + (this._zoomAnimated ? 'leaflet-zoom-animated' : ''));

		img.onselectstart = L.Util.falseFn;
		img.onmousemove = L.Util.falseFn;

		img.onload = L.bind(this.fire, this, 'load');

		if (this.options.crossOrigin) {
			img.crossOrigin = '';
		}

		img.src = this._url;
		img.alt = this.options.alt;
	},

	_animateZoom: function (e) {
		var scale = this._map.getZoomScale(e.zoom),
		    offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

		L.DomUtil.setTransform(this._image, offset, scale);
	},

	_reset: function () {
		var image = this._image,
		    bounds = new L.Bounds(
		        this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		        this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
		    size = bounds.getSize();

		L.DomUtil.setPosition(image, bounds.min);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

// @factory L.imageOverlay(imageUrl: String, bounds: LatLngBounds, options?: ImageOverlay options)
// Instantiates an image overlay object given the URL of the image and the
// geographical bounds it is tied to.
L.imageOverlay = function (url, bounds, options) {
	return new L.ImageOverlay(url, bounds, options);
};



/*
 * @class Icon
 * @aka L.Icon
 * @inherits Layer
 *
 * Represents an icon to provide when creating a marker.
 *
 * @example
 *
 * ```js
 * var myIcon = L.icon({
 *     iconUrl: 'my-icon.png',
 *     iconRetinaUrl: 'my-icon@2x.png',
 *     iconSize: [38, 95],
 *     iconAnchor: [22, 94],
 *     popupAnchor: [-3, -76],
 *     shadowUrl: 'my-icon-shadow.png',
 *     shadowRetinaUrl: 'my-icon-shadow@2x.png',
 *     shadowSize: [68, 95],
 *     shadowAnchor: [22, 94]
 * });
 *
 * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
 * ```
 *
 * `L.Icon.Default` extends `L.Icon` and is the blue icon Leaflet uses for markers by default.
 *
 */

L.Icon = L.Class.extend({

	/* @section
	 * @aka Icon options
	 *
	 * @option iconUrl: String = null
	 * **(required)** The URL to the icon image (absolute or relative to your script path).
	 *
	 * @option iconRetinaUrl: String = null
	 * The URL to a retina sized version of the icon image (absolute or relative to your
	 * script path). Used for Retina screen devices.
	 *
	 * @option iconSize: Point = null
	 * Size of the icon image in pixels.
	 *
	 * @option iconAnchor: Point = null
	 * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
	 * will be aligned so that this point is at the marker's geographical location. Centered
	 * by default if size is specified, also can be set in CSS with negative margins.
	 *
	 * @option popupAnchor: Point = null
	 * The coordinates of the point from which popups will "open", relative to the icon anchor.
	 *
	 * @option shadowUrl: String = null
	 * The URL to the icon shadow image. If not specified, no shadow image will be created.
	 *
	 * @option shadowRetinaUrl: String = null
	 *
	 * @option shadowSize: Point = null
	 * Size of the shadow image in pixels.
	 *
	 * @option shadowAnchor: Point = null
	 * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
	 * as iconAnchor if not specified).
	 *
	 * @option className: String = ''
	 * A custom class name to assign to both icon and shadow images. Empty by default.
	 */

	initialize: function (options) {
		L.setOptions(this, options);
	},

	// @method createIcon(oldIcon?: HTMLElement): HTMLElement
	// Called internally when the icon has to be shown, returns a `<img>` HTML element
	// styled according to the options.
	createIcon: function (oldIcon) {
		return this._createIcon('icon', oldIcon);
	},

	// @method createShadow(oldIcon?: HTMLElement): HTMLElement
	// As `createIcon`, but for the shadow beneath it.
	createShadow: function (oldIcon) {
		return this._createIcon('shadow', oldIcon);
	},

	_createIcon: function (name, oldIcon) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error('iconUrl not set in Icon options (see the docs).');
			}
			return null;
		}

		var img = this._createImg(src, oldIcon && oldIcon.tagName === 'IMG' ? oldIcon : null);
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options;
		var sizeOption = options[name + 'Size'];

		if (typeof sizeOption === 'number') {
			sizeOption = [sizeOption, sizeOption];
		}

		var size = L.point(sizeOption),
		    anchor = L.point(name === 'shadow' && options.shadowAnchor || options.iconAnchor ||
		            size && size.divideBy(2, true));

		img.className = 'leaflet-marker-' + name + ' ' + (options.className || '');

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src, el) {
		el = el || document.createElement('img');
		el.src = src;
		return el;
	},

	_getIconUrl: function (name) {
		return L.Browser.retina && this.options[name + 'RetinaUrl'] || this.options[name + 'Url'];
	}
});


// @factory L.icon(options: Icon options)
// Creates an icon instance with the given options.
L.icon = function (options) {
	return new L.Icon(options);
};



/*
 * @miniclass Icon.Default (Icon)
 * @aka L.Icon.Default
 * @section
 *
 * A trivial subclass of `Icon`, represents the icon to use in `Marker`s when
 * no icon is specified. Points to the blue marker image distributed with Leaflet
 * releases.
 *
 * In order to customize the default icon, just change the properties of `L.Icon.Default.prototype.options`
 * (which is a set of `Icon options`).
 *
 * If you want to _completely_ replace the default icon, override the
 * `L.Marker.prototype.options.icon` with your own icon instead.
 */

L.Icon.Default = L.Icon.extend({

	options: {
		iconUrl:       'marker-icon.png',
		iconRetinaUrl: 'marker-icon-2x.png',
		shadowUrl:     'marker-shadow.png',
		iconSize:    [25, 41],
		iconAnchor:  [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize:  [41, 41]
	},

	_getIconUrl: function (name) {
		if (!L.Icon.Default.imagePath) {	// Deprecated, backwards-compatibility only
			L.Icon.Default.imagePath = this._detectIconPath();
		}

		// @option imagePath: String
		// `L.Icon.Default` will try to auto-detect the absolute location of the
		// blue icon images. If you are placing these images in a non-standard
		// way, set this option to point to the right absolute path.
		return (this.options.imagePath || L.Icon.Default.imagePath) + L.Icon.prototype._getIconUrl.call(this, name);
	},

	_detectIconPath: function () {
		var el = L.DomUtil.create('div',  'leaflet-default-icon-path', document.body);
		var path = L.DomUtil.getStyle(el, 'background-image') ||
		           L.DomUtil.getStyle(el, 'backgroundImage');	// IE8

		document.body.removeChild(el);

		return path.indexOf('url') === 0 ?
			path.replace(/^url\([\"\']?/, '').replace(/marker-icon\.png[\"\']?\)$/, '') : '';
	}
});



/*
 * @class Marker
 * @inherits Interactive layer
 * @aka L.Marker
 * L.Marker is used to display clickable/draggable icons on the map. Extends `Layer`.
 *
 * @example
 *
 * ```js
 * L.marker([50.5, 30.5]).addTo(map);
 * ```
 */

L.Marker = L.Layer.extend({

	// @section
	// @aka Marker options
	options: {
		// @option icon: Icon = *
		// Icon class to use for rendering the marker. See [Icon documentation](#L.Icon) for details on how to customize the marker icon. If not specified, a new `L.Icon.Default` is used.
		icon: new L.Icon.Default(),

		// Option inherited from "Interactive layer" abstract class
		interactive: true,

		// @option draggable: Boolean = false
		// Whether the marker is draggable with mouse/touch or not.
		draggable: false,

		// @option keyboard: Boolean = true
		// Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
		keyboard: true,

		// @option title: String = ''
		// Text for the browser tooltip that appear on marker hover (no tooltip by default).
		title: '',

		// @option alt: String = ''
		// Text for the `alt` attribute of the icon image (useful for accessibility).
		alt: '',

		// @option zIndexOffset: Number = 0
		// By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
		zIndexOffset: 0,

		// @option opacity: Number = 1.0
		// The opacity of the marker.
		opacity: 1,

		// @option riseOnHover: Boolean = false
		// If `true`, the marker will get on top of others when you hover the mouse over it.
		riseOnHover: false,

		// @option riseOffset: Number = 250
		// The z-index offset used for the `riseOnHover` feature.
		riseOffset: 250,

		// @option pane: String = 'markerPane'
		// `Map pane` where the markers icon will be added.
		pane: 'markerPane',

		// FIXME: shadowPane is no longer a valid option
		nonBubblingEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu']
	},

	/* @section
	 *
	 * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
	 */

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},

	onAdd: function (map) {
		this._zoomAnimated = this._zoomAnimated && map.options.markerZoomAnimation;

		if (this._zoomAnimated) {
			map.on('zoomanim', this._animateZoom, this);
		}

		this._initIcon();
		this.update();
	},

	onRemove: function (map) {
		if (this.dragging && this.dragging.enabled()) {
			this.options.draggable = true;
			this.dragging.removeHooks();
		}

		if (this._zoomAnimated) {
			map.off('zoomanim', this._animateZoom, this);
		}

		this._removeIcon();
		this._removeShadow();
	},

	getEvents: function () {
		return {
			zoom: this.update,
			viewreset: this.update
		};
	},

	// @method getLatLng: LatLng
	// Returns the current geographical position of the marker.
	getLatLng: function () {
		return this._latlng;
	},

	// @method setLatLng(latlng: LatLng): this
	// Changes the marker position to the given point.
	setLatLng: function (latlng) {
		var oldLatLng = this._latlng;
		this._latlng = L.latLng(latlng);
		this.update();

		// @event move: Event
		// Fired when the marker is moved via [`setLatLng`](#marker-setlatlng) or by [dragging](#marker-dragging). Old and new coordinates are included in event arguments as `oldLatLng`, `latlng`.
		return this.fire('move', {oldLatLng: oldLatLng, latlng: this._latlng});
	},

	// @method setZIndexOffset(offset: Number): this
	// Changes the [zIndex offset](#marker-zindexoffset) of the marker.
	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		return this.update();
	},

	// @method setIcon(icon: Icon): this
	// Changes the marker icon.
	setIcon: function (icon) {

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}

		if (this._popup) {
			this.bindPopup(this._popup, this._popup.options);
		}

		return this;
	},

	getElement: function () {
		return this._icon;
	},

	update: function () {

		if (this._icon) {
			var pos = this._map.latLngToLayerPoint(this._latlng).round();
			this._setPos(pos);
		}

		return this;
	},

	_initIcon: function () {
		var options = this.options,
		    classToAdd = 'leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

		var icon = options.icon.createIcon(this._icon),
		    addIcon = false;

		// if we're not reusing the icon, remove the old one and init new one
		if (icon !== this._icon) {
			if (this._icon) {
				this._removeIcon();
			}
			addIcon = true;

			if (options.title) {
				icon.title = options.title;
			}
			if (options.alt) {
				icon.alt = options.alt;
			}
		}

		L.DomUtil.addClass(icon, classToAdd);

		if (options.keyboard) {
			icon.tabIndex = '0';
		}

		this._icon = icon;

		if (options.riseOnHover) {
			this.on({
				mouseover: this._bringToFront,
				mouseout: this._resetZIndex
			});
		}

		var newShadow = options.icon.createShadow(this._shadow),
		    addShadow = false;

		if (newShadow !== this._shadow) {
			this._removeShadow();
			addShadow = true;
		}

		if (newShadow) {
			L.DomUtil.addClass(newShadow, classToAdd);
			newShadow.alt = '';
		}
		this._shadow = newShadow;


		if (options.opacity < 1) {
			this._updateOpacity();
		}


		if (addIcon) {
			this.getPane().appendChild(this._icon);
		}
		this._initInteraction();
		if (newShadow && addShadow) {
			this.getPane('shadowPane').appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		if (this.options.riseOnHover) {
			this.off({
				mouseover: this._bringToFront,
				mouseout: this._resetZIndex
			});
		}

		L.DomUtil.remove(this._icon);
		this.removeInteractiveTarget(this._icon);

		this._icon = null;
	},

	_removeShadow: function () {
		if (this._shadow) {
			L.DomUtil.remove(this._shadow);
		}
		this._shadow = null;
	},

	_setPos: function (pos) {
		L.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

		this._setPos(pos);
	},

	_initInteraction: function () {

		if (!this.options.interactive) { return; }

		L.DomUtil.addClass(this._icon, 'leaflet-interactive');

		this.addInteractiveTarget(this._icon);

		if (L.Handler.MarkerDrag) {
			var draggable = this.options.draggable;
			if (this.dragging) {
				draggable = this.dragging.enabled();
				this.dragging.disable();
			}

			this.dragging = new L.Handler.MarkerDrag(this);

			if (draggable) {
				this.dragging.enable();
			}
		}
	},

	// @method setOpacity(opacity: Number): this
	// Changes the opacity of the marker.
	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	_updateOpacity: function () {
		var opacity = this.options.opacity;

		L.DomUtil.setOpacity(this._icon, opacity);

		if (this._shadow) {
			L.DomUtil.setOpacity(this._shadow, opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	},

	_getPopupAnchor: function () {
		return this.options.icon.options.popupAnchor || [0, 0];
	},

	_getTooltipAnchor: function () {
		return this.options.icon.options.tooltipAnchor || [0, 0];
	}
});


// factory L.marker(latlng: LatLng, options? : Marker options)

// @factory L.marker(latlng: LatLng, options? : Marker options)
// Instantiates a Marker object given a geographical point and optionally an options object.
L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};



/*
 * @class DivIcon
 * @aka L.DivIcon
 * @inherits Icon
 *
 * Represents a lightweight icon for markers that uses a simple `<div>`
 * element instead of an image. Inherits from `Icon` but ignores the `iconUrl` and shadow options.
 *
 * @example
 * ```js
 * var myIcon = L.divIcon({className: 'my-div-icon'});
 * // you can set .my-div-icon styles in CSS
 *
 * L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
 * ```
 *
 * By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.
 */

L.DivIcon = L.Icon.extend({
	options: {
		// @section
		// @aka DivIcon options
		iconSize: [12, 12], // also can be set through CSS

		// iconAnchor: (Point),
		// popupAnchor: (Point),

		// @option html: String = ''
		// Custom HTML code to put inside the div element, empty by default.
		html: false,

		// @option bgPos: Point = [0, 0]
		// Optional relative position of the background, in pixels
		bgPos: null,

		className: 'leaflet-div-icon'
	},

	createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;

		div.innerHTML = options.html !== false ? options.html : '';

		if (options.bgPos) {
			var bgPos = L.point(options.bgPos);
			div.style.backgroundPosition = (-bgPos.x) + 'px ' + (-bgPos.y) + 'px';
		}
		this._setIconStyles(div, 'icon');

		return div;
	},

	createShadow: function () {
		return null;
	}
});

// @factory L.divIcon(options: DivIcon options)
// Creates a `DivIcon` instance with the given options.
L.divIcon = function (options) {
	return new L.DivIcon(options);
};



/*
 * @class DivOverlay
 * @inherits Layer
 * @aka L.DivOverlay
 * Base model for L.Popup and L.Tooltip. Inherit from it for custom popup like plugins.
 */

// @namespace DivOverlay
L.DivOverlay = L.Layer.extend({

	// @section
	// @aka DivOverlay options
	options: {
		// @option offset: Point = Point(0, 7)
		// The offset of the popup position. Useful to control the anchor
		// of the popup when opening it on some overlays.
		offset: [0, 7],

		// @option className: String = ''
		// A custom CSS class name to assign to the popup.
		className: '',

		// @option pane: String = 'popupPane'
		// `Map pane` where the popup will be added.
		pane: 'popupPane'
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._source = source;
	},

	onAdd: function (map) {
		this._zoomAnimated = map._zoomAnimated;

		if (!this._container) {
			this._initLayout();
		}

		if (map._fadeAnimated) {
			L.DomUtil.setOpacity(this._container, 0);
		}

		clearTimeout(this._removeTimeout);
		this.getPane().appendChild(this._container);
		this.update();

		if (map._fadeAnimated) {
			L.DomUtil.setOpacity(this._container, 1);
		}

		this.bringToFront();
	},

	onRemove: function (map) {
		if (map._fadeAnimated) {
			L.DomUtil.setOpacity(this._container, 0);
			this._removeTimeout = setTimeout(L.bind(L.DomUtil.remove, L.DomUtil, this._container), 200);
		} else {
			L.DomUtil.remove(this._container);
		}
	},

	// @namespace Popup
	// @method getLatLng: LatLng
	// Returns the geographical point of popup.
	getLatLng: function () {
		return this._latlng;
	},

	// @method setLatLng(latlng: LatLng): this
	// Sets the geographical point where the popup will open.
	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		if (this._map) {
			this._updatePosition();
			this._adjustPan();
		}
		return this;
	},

	// @method getContent: String|HTMLElement
	// Returns the content of the popup.
	getContent: function () {
		return this._content;
	},

	// @method setContent(htmlContent: String|HTMLElement|Function): this
	// Sets the HTML content of the popup. If a function is passed the source layer will be passed to the function. The function should return a `String` or `HTMLElement` to be used in the popup.
	setContent: function (content) {
		this._content = content;
		this.update();
		return this;
	},

	// @method getElement: String|HTMLElement
	// Alias for [getContent()](#popup-getcontent)
	getElement: function () {
		return this._container;
	},

	// @method update: null
	// Updates the popup content, layout and position. Useful for updating the popup after something inside changed, e.g. image loaded.
	update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	getEvents: function () {
		var events = {
			zoom: this._updatePosition,
			viewreset: this._updatePosition
		};

		if (this._zoomAnimated) {
			events.zoomanim = this._animateZoom;
		}
		return events;
	},

	// @method isOpen: Boolean
	// Returns `true` when the popup is visible on the map.
	isOpen: function () {
		return !!this._map && this._map.hasLayer(this);
	},

	// @method bringToFront: this
	// Brings this popup in front of other popups (in the same map pane).
	bringToFront: function () {
		if (this._map) {
			L.DomUtil.toFront(this._container);
		}
		return this;
	},

	// @method bringToBack: this
	// Brings this popup to the back of other popups (in the same map pane).
	bringToBack: function () {
		if (this._map) {
			L.DomUtil.toBack(this._container);
		}
		return this;
	},

	_updateContent: function () {
		if (!this._content) { return; }

		var node = this._contentNode;
		var content = (typeof this._content === 'function') ? this._content(this._source || this) : this._content;

		if (typeof content === 'string') {
			node.innerHTML = content;
		} else {
			while (node.hasChildNodes()) {
				node.removeChild(node.firstChild);
			}
			node.appendChild(content);
		}
		this.fire('contentupdate');
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng),
		    offset = L.point(this.options.offset),
		    anchor = this._getAnchor();

		if (this._zoomAnimated) {
			L.DomUtil.setPosition(this._container, pos.add(anchor));
		} else {
			offset = offset.add(pos).add(anchor);
		}

		var bottom = this._containerBottom = -offset.y,
		    left = this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x;

		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = bottom + 'px';
		this._container.style.left = left + 'px';
	},

	_getAnchor: function () {
		return [0, 0];
	}

});



/*
 * @class Popup
 * @inherits DivOverlay
 * @aka L.Popup
 * Used to open popups in certain places of the map. Use [Map.openPopup](#map-openpopup) to
 * open popups while making sure that only one popup is open at one time
 * (recommended for usability), or use [Map.addLayer](#map-addlayer) to open as many as you want.
 *
 * @example
 *
 * If you want to just bind a popup to marker click and then open it, it's really easy:
 *
 * ```js
 * marker.bindPopup(popupContent).openPopup();
 * ```
 * Path overlays like polylines also have a `bindPopup` method.
 * Here's a more complicated way to open a popup on a map:
 *
 * ```js
 * var popup = L.popup()
 * 	.setLatLng(latlng)
 * 	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
 * 	.openOn(map);
 * ```
 */


// @namespace Popup
L.Popup = L.DivOverlay.extend({

	// @section
	// @aka Popup options
	options: {
		// @option maxWidth: Number = 300
		// Max width of the popup, in pixels.
		maxWidth: 300,

		// @option minWidth: Number = 50
		// Min width of the popup, in pixels.
		minWidth: 50,

		// @option maxHeight: Number = null
		// If set, creates a scrollable container of the given height
		// inside a popup if its content exceeds it.
		maxHeight: null,

		// @option autoPan: Boolean = true
		// Set it to `false` if you don't want the map to do panning animation
		// to fit the opened popup.
		autoPan: true,

		// @option autoPanPaddingTopLeft: Point = null
		// The margin between the popup and the top left corner of the map
		// view after autopanning was performed.
		autoPanPaddingTopLeft: null,

		// @option autoPanPaddingBottomRight: Point = null
		// The margin between the popup and the bottom right corner of the map
		// view after autopanning was performed.
		autoPanPaddingBottomRight: null,

		// @option autoPanPadding: Point = Point(5, 5)
		// Equivalent of setting both top left and bottom right autopan padding to the same value.
		autoPanPadding: [5, 5],

		// @option keepInView: Boolean = false
		// Set it to `true` if you want to prevent users from panning the popup
		// off of the screen while it is open.
		keepInView: false,

		// @option closeButton: Boolean = true
		// Controls the presence of a close button in the popup.
		closeButton: true,

		// @option autoClose: Boolean = true
		// Set it to `false` if you want to override the default behavior of
		// the popup closing when user clicks the map (set globally by
		// the Map's [closePopupOnClick](#map-closepopuponclick) option).
		autoClose: true,

		// @option className: String = ''
		// A custom CSS class name to assign to the popup.
		className: ''
	},

	// @namespace Popup
	// @method openOn(map: Map): this
	// Adds the popup to the map and closes the previous one. The same as `map.openPopup(popup)`.
	openOn: function (map) {
		map.openPopup(this);
		return this;
	},

	onAdd: function (map) {
		L.DivOverlay.prototype.onAdd.call(this, map);

		// @namespace Map
		// @section Popup events
		// @event popupopen: PopupEvent
		// Fired when a popup is opened in the map
		map.fire('popupopen', {popup: this});

		if (this._source) {
			// @namespace Layer
			// @section Popup events
			// @event popupopen: PopupEvent
			// Fired when a popup bound to this layer is opened
			this._source.fire('popupopen', {popup: this}, true);
			// For non-path layers, we toggle the popup when clicking
			// again the layer, so prevent the map to reopen it.
			if (!(this._source instanceof L.Path)) {
				this._source.on('preclick', L.DomEvent.stopPropagation);
			}
		}
	},

	onRemove: function (map) {
		L.DivOverlay.prototype.onRemove.call(this, map);

		// @namespace Map
		// @section Popup events
		// @event popupclose: PopupEvent
		// Fired when a popup in the map is closed
		map.fire('popupclose', {popup: this});

		if (this._source) {
			// @namespace Layer
			// @section Popup events
			// @event popupclose: PopupEvent
			// Fired when a popup bound to this layer is closed
			this._source.fire('popupclose', {popup: this}, true);
			if (!(this._source instanceof L.Path)) {
				this._source.off('preclick', L.DomEvent.stopPropagation);
			}
		}
	},

	getEvents: function () {
		var events = L.DivOverlay.prototype.getEvents.call(this);

		if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
			events.preclick = this._close;
		}

		if (this.options.keepInView) {
			events.moveend = this._adjustPan;
		}

		return events;
	},

	_close: function () {
		if (this._map) {
			this._map.closePopup(this);
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-popup',
		    container = this._container = L.DomUtil.create('div',
			prefix + ' ' + (this.options.className || '') +
			' leaflet-zoom-animated');

		if (this.options.closeButton) {
			var closeButton = this._closeButton = L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper = L.DomUtil.create('div', prefix + '-content-wrapper', container);
		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent
			.disableClickPropagation(wrapper)
			.disableScrollPropagation(this._contentNode)
			.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'leaflet-popup-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			L.DomUtil.addClass(container, scrolledClass);
		} else {
			L.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_animateZoom: function (e) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
		    anchor = this._getAnchor();
		L.DomUtil.setPosition(this._container, pos.add(anchor));
	},

	_adjustPan: function () {
		if (!this.options.autoPan || (this._map._panAnim && this._map._panAnim._inProgress)) { return; }

		var map = this._map,
		    marginBottom = parseInt(L.DomUtil.getStyle(this._container, 'marginBottom'), 10) || 0,
		    containerHeight = this._container.offsetHeight + marginBottom,
		    containerWidth = this._containerWidth,
		    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

		layerPos._add(L.DomUtil.getPosition(this._container));

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
		}
		if (containerPos.x - dx - paddingTL.x < 0) { // left
			dx = containerPos.x - paddingTL.x;
		}
		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
		}
		if (containerPos.y - dy - paddingTL.y < 0) { // top
			dy = containerPos.y - paddingTL.y;
		}

		// @namespace Map
		// @section Popup events
		// @event autopanstart: Event
		// Fired when the map starts autopanning when opening a popup.
		if (dx || dy) {
			map
			    .fire('autopanstart')
			    .panBy([dx, dy]);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	},

	_getAnchor: function () {
		// Where should we anchor the popup on the source layer?
		return L.point(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
	}

});

// @namespace Popup
// @factory L.popup(options?: Popup options, source?: Layer)
// Instantiates a `Popup` object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the popup with a reference to the Layer to which it refers.
L.popup = function (options, source) {
	return new L.Popup(options, source);
};


/* @namespace Map
 * @section Interaction Options
 * @option closePopupOnClick: Boolean = true
 * Set it to `false` if you don't want popups to close when user clicks the map.
 */
L.Map.mergeOptions({
	closePopupOnClick: true
});


// @namespace Map
// @section Methods for Layers and Controls
L.Map.include({
	// @method openPopup(popup: Popup): this
	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
	// @alternative
	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
	// Creates a popup with the specified content and options and opens it in the given point on a map.
	openPopup: function (popup, latlng, options) {
		if (!(popup instanceof L.Popup)) {
			popup = new L.Popup(options).setContent(popup);
		}

		if (latlng) {
			popup.setLatLng(latlng);
		}

		if (this.hasLayer(popup)) {
			return this;
		}

		if (this._popup && this._popup.options.autoClose) {
			this.closePopup();
		}

		this._popup = popup;
		return this.addLayer(popup);
	},

	// @method closePopup(popup?: Popup): this
	// Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
	closePopup: function (popup) {
		if (!popup || popup === this._popup) {
			popup = this._popup;
			this._popup = null;
		}
		if (popup) {
			this.removeLayer(popup);
		}
		return this;
	}
});

/*
 * @namespace Layer
 * @section Popup methods example
 *
 * All layers share a set of methods convenient for binding popups to it.
 *
 * ```js
 * var layer = L.Polygon(latlngs).bindPopup('Hi There!').addTo(map);
 * layer.openPopup();
 * layer.closePopup();
 * ```
 *
 * Popups will also be automatically opened when the layer is clicked on and closed when the layer is removed from the map or another popup is opened.
 */

// @section Popup methods
L.Layer.include({

	// @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
	// Binds a popup to the layer with the passed `content` and sets up the
	// neccessary event listeners. If a `Function` is passed it will receive
	// the layer as the first argument and should return a `String` or `HTMLElement`.
	bindPopup: function (content, options) {

		if (content instanceof L.Popup) {
			L.setOptions(content, options);
			this._popup = content;
			content._source = this;
		} else {
			if (!this._popup || options) {
				this._popup = new L.Popup(options, this);
			}
			this._popup.setContent(content);
		}

		if (!this._popupHandlersAdded) {
			this.on({
				click: this._openPopup,
				remove: this.closePopup,
				move: this._movePopup
			});
			this._popupHandlersAdded = true;
		}

		return this;
	},

	// @method unbindPopup(): this
	// Removes the popup previously bound with `bindPopup`.
	unbindPopup: function () {
		if (this._popup) {
			this.off({
				click: this._openPopup,
				remove: this.closePopup,
				move: this._movePopup
			});
			this._popupHandlersAdded = false;
			this._popup = null;
		}
		return this;
	},

	// @method openPopup(latlng?: LatLng): this
	// Opens the bound popup at the specificed `latlng` or at the default popup anchor if no `latlng` is passed.
	openPopup: function (layer, latlng) {
		if (!(layer instanceof L.Layer)) {
			latlng = layer;
			layer = this;
		}

		if (layer instanceof L.FeatureGroup) {
			for (var id in this._layers) {
				layer = this._layers[id];
				break;
			}
		}

		if (!latlng) {
			latlng = layer.getCenter ? layer.getCenter() : layer.getLatLng();
		}

		if (this._popup && this._map) {
			// set popup source to this layer
			this._popup._source = layer;

			// update the popup (content, layout, ect...)
			this._popup.update();

			// open the popup on the map
			this._map.openPopup(this._popup, latlng);
		}

		return this;
	},

	// @method closePopup(): this
	// Closes the popup bound to this layer if it is open.
	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	// @method togglePopup(): this
	// Opens or closes the popup bound to this layer depending on its current state.
	togglePopup: function (target) {
		if (this._popup) {
			if (this._popup._map) {
				this.closePopup();
			} else {
				this.openPopup(target);
			}
		}
		return this;
	},

	// @method isPopupOpen(): boolean
	// Returns `true` if the popup bound to this layer is currently open.
	isPopupOpen: function () {
		return (this._popup ? this._popup.isOpen() : false);
	},

	// @method setPopupContent(content: String|HTMLElement|Popup): this
	// Sets the content of the popup bound to this layer.
	setPopupContent: function (content) {
		if (this._popup) {
			this._popup.setContent(content);
		}
		return this;
	},

	// @method getPopup(): Popup
	// Returns the popup bound to this layer.
	getPopup: function () {
		return this._popup;
	},

	_openPopup: function (e) {
		var layer = e.layer || e.target;

		if (!this._popup) {
			return;
		}

		if (!this._map) {
			return;
		}

		// prevent map click
		L.DomEvent.stop(e);

		// if this inherits from Path its a vector and we can just
		// open the popup at the new location
		if (layer instanceof L.Path) {
			this.openPopup(e.layer || e.target, e.latlng);
			return;
		}

		// otherwise treat it like a marker and figure out
		// if we should toggle it open/closed
		if (this._map.hasLayer(this._popup) && this._popup._source === layer) {
			this.closePopup();
		} else {
			this.openPopup(layer, e.latlng);
		}
	},

	_movePopup: function (e) {
		this._popup.setLatLng(e.latlng);
	}
});



/*
 * @class Tooltip
 * @inherits DivOverlay
 * @aka L.Tooltip
 * Used to display small texts on top of map layers.
 *
 * @example
 *
 * ```js
 * marker.bindTooltip("my tooltip text").openTooltip();
 * ```
 * Note about tooltip offset. Leaflet takes two options in consideration
 * for computing tooltip offseting:
 * - the `offset` Tooltip option: it defaults to [0, 0], and it's specific to one tooltip.
 *   Add a positive x offset to move the tooltip to the right, and a positive y offset to
 *   move it to the bottom. Negatives will move to the left and top.
 * - the `tooltipAnchor` Icon option: this will only be considered for Marker. You
 *   should adapt this value if you use a custom icon.
 */


// @namespace Tooltip
L.Tooltip = L.DivOverlay.extend({

	// @section
	// @aka Tooltip options
	options: {
		// @option pane: String = 'tooltipPane'
		// `Map pane` where the tooltip will be added.
		pane: 'tooltipPane',

		// @option offset: Point = Point(0, 0)
		// Optional offset of the tooltip position.
		offset: [0, 0],

		// @option direction: String = 'auto'
		// Direction where to open the tooltip. Possible values are: `right`, `left`,
		// `top`, `bottom`, `center`, `auto`.
		// `auto` will dynamicaly switch between `right` and `left` according to the tooltip
		// position on the map.
		direction: 'auto',

		// @option permanent: Boolean = false
		// Whether to open the tooltip permanently or only on mouseover.
		permanent: false,

		// @option sticky: Boolean = false
		// If true, the tooltip will follow the mouse instead of being fixed at the feature center.
		sticky: false,

		// @option interactive: Boolean = false
		// If true, the tooltip will listen to the feature events.
		interactive: false,

		// @option opacity: Number = 0.9
		// Tooltip container opacity.
		opacity: 0.9
	},

	onAdd: function (map) {
		L.DivOverlay.prototype.onAdd.call(this, map);
		this.setOpacity(this.options.opacity);

		// @namespace Map
		// @section Tooltip events
		// @event tooltipopen: TooltipEvent
		// Fired when a tooltip is opened in the map.
		map.fire('tooltipopen', {tooltip: this});

		if (this._source) {
			// @namespace Layer
			// @section Tooltip events
			// @event tooltipopen: TooltipEvent
			// Fired when a tooltip bound to this layer is opened.
			this._source.fire('tooltipopen', {tooltip: this}, true);
		}
	},

	onRemove: function (map) {
		L.DivOverlay.prototype.onRemove.call(this, map);

		// @namespace Map
		// @section Tooltip events
		// @event tooltipclose: TooltipEvent
		// Fired when a tooltip in the map is closed.
		map.fire('tooltipclose', {tooltip: this});

		if (this._source) {
			// @namespace Layer
			// @section Tooltip events
			// @event tooltipclose: TooltipEvent
			// Fired when a tooltip bound to this layer is closed.
			this._source.fire('tooltipclose', {tooltip: this}, true);
		}
	},

	getEvents: function () {
		var events = L.DivOverlay.prototype.getEvents.call(this);

		if (L.Browser.touch && !this.options.permanent) {
			events.preclick = this._close;
		}

		return events;
	},

	_close: function () {
		if (this._map) {
			this._map.closeTooltip(this);
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-tooltip',
		    className = prefix + ' ' + (this.options.className || '') + ' leaflet-zoom-' + (this._zoomAnimated ? 'animated' : 'hide');

		this._contentNode = this._container = L.DomUtil.create('div', className);
	},

	_updateLayout: function () {},

	_adjustPan: function () {},

	_setPosition: function (pos) {
		var map = this._map,
		    container = this._container,
		    centerPoint = map.latLngToContainerPoint(map.getCenter()),
		    tooltipPoint = map.layerPointToContainerPoint(pos),
		    direction = this.options.direction,
		    tooltipWidth = container.offsetWidth,
		    tooltipHeight = container.offsetHeight,
		    offset = L.point(this.options.offset),
		    anchor = this._getAnchor();

		if (direction === 'top') {
			pos = pos.add(L.point(-tooltipWidth / 2 + offset.x, -tooltipHeight + offset.y + anchor.y, true));
		} else if (direction === 'bottom') {
			pos = pos.subtract(L.point(tooltipWidth / 2 - offset.x, -offset.y, true));
		} else if (direction === 'center') {
			pos = pos.subtract(L.point(tooltipWidth / 2 + offset.x, tooltipHeight / 2 - anchor.y + offset.y, true));
		} else if (direction === 'right' || direction === 'auto' && tooltipPoint.x < centerPoint.x) {
			direction = 'right';
			pos = pos.add(L.point(offset.x + anchor.x, anchor.y - tooltipHeight / 2 + offset.y, true));
		} else {
			direction = 'left';
			pos = pos.subtract(L.point(tooltipWidth + anchor.x - offset.x, tooltipHeight / 2 - anchor.y - offset.y, true));
		}

		L.DomUtil.removeClass(container, 'leaflet-tooltip-right');
		L.DomUtil.removeClass(container, 'leaflet-tooltip-left');
		L.DomUtil.removeClass(container, 'leaflet-tooltip-top');
		L.DomUtil.removeClass(container, 'leaflet-tooltip-bottom');
		L.DomUtil.addClass(container, 'leaflet-tooltip-' + direction);
		L.DomUtil.setPosition(container, pos);
	},

	_updatePosition: function () {
		var pos = this._map.latLngToLayerPoint(this._latlng);
		this._setPosition(pos);
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._container) {
			L.DomUtil.setOpacity(this._container, opacity);
		}
	},

	_animateZoom: function (e) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center);
		this._setPosition(pos);
	},

	_getAnchor: function () {
		// Where should we anchor the tooltip on the source layer?
		return L.point(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
	}

});

// @namespace Tooltip
// @factory L.tooltip(options?: Tooltip options, source?: Layer)
// Instantiates a Tooltip object given an optional `options` object that describes its appearance and location and an optional `source` object that is used to tag the tooltip with a reference to the Layer to which it refers.
L.tooltip = function (options, source) {
	return new L.Tooltip(options, source);
};

// @namespace Map
// @section Methods for Layers and Controls
L.Map.include({

	// @method openTooltip(tooltip: Tooltip): this
	// Opens the specified tooltip.
	// @alternative
	// @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
	// Creates a tooltip with the specified content and options and open it.
	openTooltip: function (tooltip, latlng, options) {
		if (!(tooltip instanceof L.Tooltip)) {
			tooltip = new L.Tooltip(options).setContent(tooltip);
		}

		if (latlng) {
			tooltip.setLatLng(latlng);
		}

		if (this.hasLayer(tooltip)) {
			return this;
		}

		return this.addLayer(tooltip);
	},

	// @method closeTooltip(tooltip?: Tooltip): this
	// Closes the tooltip given as parameter.
	closeTooltip: function (tooltip) {
		if (tooltip) {
			this.removeLayer(tooltip);
		}
		return this;
	}

});

/*
 * @namespace Layer
 * @section Tooltip methods example
 *
 * All layers share a set of methods convenient for binding tooltips to it.
 *
 * ```js
 * var layer = L.Polygon(latlngs).bindTooltip('Hi There!').addTo(map);
 * layer.openTooltip();
 * layer.closeTooltip();
 * ```
 */

// @section Tooltip methods
L.Layer.include({

	// @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
	// Binds a tooltip to the layer with the passed `content` and sets up the
	// neccessary event listeners. If a `Function` is passed it will receive
	// the layer as the first argument and should return a `String` or `HTMLElement`.
	bindTooltip: function (content, options) {

		if (content instanceof L.Tooltip) {
			L.setOptions(content, options);
			this._tooltip = content;
			content._source = this;
		} else {
			if (!this._tooltip || options) {
				this._tooltip = L.tooltip(options, this);
			}
			this._tooltip.setContent(content);

		}

		this._initTooltipInteractions();

		if (this._tooltip.options.permanent && this._map && this._map.hasLayer(this)) {
			this.openTooltip();
		}

		return this;
	},

	// @method unbindTooltip(): this
	// Removes the tooltip previously bound with `bindTooltip`.
	unbindTooltip: function () {
		if (this._tooltip) {
			this._initTooltipInteractions(true);
			this.closeTooltip();
			this._tooltip = null;
		}
		return this;
	},

	_initTooltipInteractions: function (remove) {
		if (!remove && this._tooltipHandlersAdded) { return; }
		var onOff = remove ? 'off' : 'on',
		    events = {
			remove: this.closeTooltip,
			move: this._moveTooltip
		    };
		if (!this._tooltip.options.permanent) {
			events.mouseover = this._openTooltip;
			events.mouseout = this.closeTooltip;
			if (this._tooltip.options.sticky) {
				events.mousemove = this._moveTooltip;
			}
			if (L.Browser.touch) {
				events.click = this._openTooltip;
			}
		} else {
			events.add = this._openTooltip;
		}
		this[onOff](events);
		this._tooltipHandlersAdded = !remove;
	},

	// @method openTooltip(latlng?: LatLng): this
	// Opens the bound tooltip at the specificed `latlng` or at the default tooltip anchor if no `latlng` is passed.
	openTooltip: function (layer, latlng) {
		if (!(layer instanceof L.Layer)) {
			latlng = layer;
			layer = this;
		}

		if (layer instanceof L.FeatureGroup) {
			for (var id in this._layers) {
				layer = this._layers[id];
				break;
			}
		}

		if (!latlng) {
			latlng = layer.getCenter ? layer.getCenter() : layer.getLatLng();
		}

		if (this._tooltip && this._map) {

			// set tooltip source to this layer
			this._tooltip._source = layer;

			// update the tooltip (content, layout, ect...)
			this._tooltip.update();

			// open the tooltip on the map
			this._map.openTooltip(this._tooltip, latlng);

			// Tooltip container may not be defined if not permanent and never
			// opened.
			if (this._tooltip.options.interactive && this._tooltip._container) {
				L.DomUtil.addClass(this._tooltip._container, 'leaflet-clickable');
				this.addInteractiveTarget(this._tooltip._container);
			}
		}

		return this;
	},

	// @method closeTooltip(): this
	// Closes the tooltip bound to this layer if it is open.
	closeTooltip: function () {
		if (this._tooltip) {
			this._tooltip._close();
			if (this._tooltip.options.interactive && this._tooltip._container) {
				L.DomUtil.removeClass(this._tooltip._container, 'leaflet-clickable');
				this.removeInteractiveTarget(this._tooltip._container);
			}
		}
		return this;
	},

	// @method toggleTooltip(): this
	// Opens or closes the tooltip bound to this layer depending on its current state.
	toggleTooltip: function (target) {
		if (this._tooltip) {
			if (this._tooltip._map) {
				this.closeTooltip();
			} else {
				this.openTooltip(target);
			}
		}
		return this;
	},

	// @method isTooltipOpen(): boolean
	// Returns `true` if the tooltip bound to this layer is currently open.
	isTooltipOpen: function () {
		return this._tooltip.isOpen();
	},

	// @method setTooltipContent(content: String|HTMLElement|Tooltip): this
	// Sets the content of the tooltip bound to this layer.
	setTooltipContent: function (content) {
		if (this._tooltip) {
			this._tooltip.setContent(content);
		}
		return this;
	},

	// @method getTooltip(): Tooltip
	// Returns the tooltip bound to this layer.
	getTooltip: function () {
		return this._tooltip;
	},

	_openTooltip: function (e) {
		var layer = e.layer || e.target;

		if (!this._tooltip || !this._map) {
			return;
		}
		this.openTooltip(layer, this._tooltip.options.sticky ? e.latlng : undefined);
	},

	_moveTooltip: function (e) {
		var latlng = e.latlng, containerPoint, layerPoint;
		if (this._tooltip.options.sticky && e.originalEvent) {
			containerPoint = this._map.mouseEventToContainerPoint(e.originalEvent);
			layerPoint = this._map.containerPointToLayerPoint(containerPoint);
			latlng = this._map.layerPointToLatLng(layerPoint);
		}
		this._tooltip.setLatLng(latlng);
	}
});



/*
 * @class LayerGroup
 * @aka L.LayerGroup
 * @inherits Layer
 *
 * Used to group several layers and handle them as one. If you add it to the map,
 * any layers added or removed from the group will be added/removed on the map as
 * well. Extends `Layer`.
 *
 * @example
 *
 * ```js
 * L.layerGroup([marker1, marker2])
 * 	.addLayer(polyline)
 * 	.addTo(map);
 * ```
 */

L.LayerGroup = L.Layer.extend({

	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	// @method addLayer(layer: Layer): this
	// Adds the given layer to the group.
	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	// @method removeLayer(layer: Layer): this
	// Removes the given layer from the group.
	// @alternative
	// @method removeLayer(id: Number): this
	// Removes the layer with the given internal ID from the group.
	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	// @method hasLayer(layer: Layer): Boolean
	// Returns `true` if the given layer is currently added to the group.
	hasLayer: function (layer) {
		return !!layer && (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	// @method clearLayers(): this
	// Removes all the layers from the group.
	clearLayers: function () {
		for (var i in this._layers) {
			this.removeLayer(this._layers[i]);
		}
		return this;
	},

	// @method invoke(methodName: String, …): this
	// Calls `methodName` on every layer contained in this group, passing any
	// additional parameters. Has no effect if the layers contained do not
	// implement `methodName`.
	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		for (var i in this._layers) {
			map.addLayer(this._layers[i]);
		}
	},

	onRemove: function (map) {
		for (var i in this._layers) {
			map.removeLayer(this._layers[i]);
		}
	},

	// @method eachLayer(fn: Function, context?: Object): this
	// Iterates over the layers of the group, optionally specifying context of the iterator function.
	// ```js
	// group.eachLayer(function (layer) {
	// 	layer.bindPopup('Hello');
	// });
	// ```
	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	// @method getLayer(id: Number): Layer
	// Returns the layer with the given internal ID.
	getLayer: function (id) {
		return this._layers[id];
	},

	// @method getLayers(): Layer[]
	// Returns an array of all the layers added to the group.
	getLayers: function () {
		var layers = [];

		for (var i in this._layers) {
			layers.push(this._layers[i]);
		}
		return layers;
	},

	// @method setZIndex(zIndex: Number): this
	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	// @method getLayerId(layer: Layer): Number
	// Returns the internal ID for a layer
	getLayerId: function (layer) {
		return L.stamp(layer);
	}
});


// @factory L.layerGroup(layers: Layer[])
// Create a layer group, optionally given an initial set of layers.
L.layerGroup = function (layers) {
	return new L.LayerGroup(layers);
};



/*
 * @class FeatureGroup
 * @aka L.FeatureGroup
 * @inherits LayerGroup
 *
 * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
 *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
 *  * Events are propagated to the `FeatureGroup`, so if the group has an event
 * handler, it will handle events from any of the layers. This includes mouse events
 * and custom events.
 *  * Has `layeradd` and `layerremove` events
 *
 * @example
 *
 * ```js
 * L.featureGroup([marker1, marker2, polyline])
 * 	.bindPopup('Hello world!')
 * 	.on('click', function() { alert('Clicked on a member of the group!'); })
 * 	.addTo(map);
 * ```
 */

L.FeatureGroup = L.LayerGroup.extend({

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		layer.addEventParent(this);

		L.LayerGroup.prototype.addLayer.call(this, layer);

		// @event layeradd: LayerEvent
		// Fired when a layer is added to this `FeatureGroup`
		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		layer.removeEventParent(this);

		L.LayerGroup.prototype.removeLayer.call(this, layer);

		// @event layerremove: LayerEvent
		// Fired when a layer is removed from this `FeatureGroup`
		return this.fire('layerremove', {layer: layer});
	},

	// @method setStyle(style: Path options): this
	// Sets the given path options to each layer of the group that has a `setStyle` method.
	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	// @method bringToFront(): this
	// Brings the layer group to the top of all other layers
	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	// @method bringToBack(): this
	// Brings the layer group to the top of all other layers
	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	// @method getBounds(): LatLngBounds
	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
	getBounds: function () {
		var bounds = new L.LatLngBounds();

		for (var id in this._layers) {
			var layer = this._layers[id];
			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
		}
		return bounds;
	}
});

// @factory L.featureGroup(layers: Layer[])
// Create a feature group, optionally given an initial set of layers.
L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};



/*
 * @class Renderer
 * @inherits Layer
 * @aka L.Renderer
 *
 * Base class for vector renderer implementations (`SVG`, `Canvas`). Handles the
 * DOM container of the renderer, its bounds, and its zoom animation.
 *
 * A `Renderer` works as an implicit layer group for all `Path`s - the renderer
 * itself can be added or removed to the map. All paths use a renderer, which can
 * be implicit (the map will decide the type of renderer and use it automatically)
 * or explicit (using the [`renderer`](#path-renderer) option of the path).
 *
 * Do not use this class directly, use `SVG` and `Canvas` instead.
 *
 * @event update: Event
 * Fired when the renderer updates its bounds, center and zoom, for example when
 * its map has moved
 */

L.Renderer = L.Layer.extend({

	// @section
	// @aka Renderer options
	options: {
		// @option padding: Number = 0.1
		// How much to extend the clip area around the map view (relative to its size)
		// e.g. 0.1 would be 10% of map view in each direction
		padding: 0.1
	},

	initialize: function (options) {
		L.setOptions(this, options);
		L.stamp(this);
		this._layers = this._layers || {};
	},

	onAdd: function () {
		if (!this._container) {
			this._initContainer(); // defined by renderer implementations

			if (this._zoomAnimated) {
				L.DomUtil.addClass(this._container, 'leaflet-zoom-animated');
			}
		}

		this.getPane().appendChild(this._container);
		this._update();
		this.on('update', this._updatePaths, this);
	},

	onRemove: function () {
		L.DomUtil.remove(this._container);
		this.off('update', this._updatePaths, this);
	},

	getEvents: function () {
		var events = {
			viewreset: this._reset,
			zoom: this._onZoom,
			moveend: this._update,
			zoomend: this._onZoomEnd
		};
		if (this._zoomAnimated) {
			events.zoomanim = this._onAnimZoom;
		}
		return events;
	},

	_onAnimZoom: function (ev) {
		this._updateTransform(ev.center, ev.zoom);
	},

	_onZoom: function () {
		this._updateTransform(this._map.getCenter(), this._map.getZoom());
	},

	_updateTransform: function (center, zoom) {
		var scale = this._map.getZoomScale(zoom, this._zoom),
		    position = L.DomUtil.getPosition(this._container),
		    viewHalf = this._map.getSize().multiplyBy(0.5 + this.options.padding),
		    currentCenterPoint = this._map.project(this._center, zoom),
		    destCenterPoint = this._map.project(center, zoom),
		    centerOffset = destCenterPoint.subtract(currentCenterPoint),

		    topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset);

		if (L.Browser.any3d) {
			L.DomUtil.setTransform(this._container, topLeftOffset, scale);
		} else {
			L.DomUtil.setPosition(this._container, topLeftOffset);
		}
	},

	_reset: function () {
		this._update();
		this._updateTransform(this._center, this._zoom);

		for (var id in this._layers) {
			this._layers[id]._reset();
		}
	},

	_onZoomEnd: function () {
		for (var id in this._layers) {
			this._layers[id]._project();
		}
	},

	_updatePaths: function () {
		for (var id in this._layers) {
			this._layers[id]._update();
		}
	},

	_update: function () {
		// Update pixel bounds of renderer container (for positioning/sizing/clipping later)
		// Subclasses are responsible of firing the 'update' event.
		var p = this.options.padding,
		    size = this._map.getSize(),
		    min = this._map.containerPointToLayerPoint(size.multiplyBy(-p)).round();

		this._bounds = new L.Bounds(min, min.add(size.multiplyBy(1 + p * 2)).round());

		this._center = this._map.getCenter();
		this._zoom = this._map.getZoom();
	}
});


L.Map.include({
	// @namespace Map; @method getRenderer(layer: Path): Renderer
	// Returns the instance of `Renderer` that should be used to render the given
	// `Path`. It will ensure that the `renderer` options of the map and paths
	// are respected, and that the renderers do exist on the map.
	getRenderer: function (layer) {
		// @namespace Path; @option renderer: Renderer
		// Use this specific instance of `Renderer` for this path. Takes
		// precedence over the map's [default renderer](#map-renderer).
		var renderer = layer.options.renderer || this._getPaneRenderer(layer.options.pane) || this.options.renderer || this._renderer;

		if (!renderer) {
			// @namespace Map; @option preferCanvas: Boolean = false
			// Whether `Path`s should be rendered on a `Canvas` renderer.
			// By default, all `Path`s are rendered in a `SVG` renderer.
			renderer = this._renderer = (this.options.preferCanvas && L.canvas()) || L.svg();
		}

		if (!this.hasLayer(renderer)) {
			this.addLayer(renderer);
		}
		return renderer;
	},

	_getPaneRenderer: function (name) {
		if (name === 'overlayPane' || name === undefined) {
			return false;
		}

		var renderer = this._paneRenderers[name];
		if (renderer === undefined) {
			renderer = (L.SVG && L.svg({pane: name})) || (L.Canvas && L.canvas({pane: name}));
			this._paneRenderers[name] = renderer;
		}
		return renderer;
	}
});



/*
 * @class Path
 * @aka L.Path
 * @inherits Interactive layer
 *
 * An abstract class that contains options and constants shared between vector
 * overlays (Polygon, Polyline, Circle). Do not use it directly. Extends `Layer`.
 */

L.Path = L.Layer.extend({

	// @section
	// @aka Path options
	options: {
		// @option stroke: Boolean = true
		// Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
		stroke: true,

		// @option color: String = '#3388ff'
		// Stroke color
		color: '#3388ff',

		// @option weight: Number = 3
		// Stroke width in pixels
		weight: 3,

		// @option opacity: Number = 1.0
		// Stroke opacity
		opacity: 1,

		// @option lineCap: String= 'round'
		// A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
		lineCap: 'round',

		// @option lineJoin: String = 'round'
		// A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
		lineJoin: 'round',

		// @option dashArray: String = null
		// A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
		dashArray: null,

		// @option dashOffset: String = null
		// A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
		dashOffset: null,

		// @option fill: Boolean = depends
		// Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
		fill: false,

		// @option fillColor: String = *
		// Fill color. Defaults to the value of the [`color`](#path-color) option
		fillColor: null,

		// @option fillOpacity: Number = 0.2
		// Fill opacity.
		fillOpacity: 0.2,

		// @option fillRule: String = 'evenodd'
		// A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
		fillRule: 'evenodd',

		// className: '',

		// Option inherited from "Interactive layer" abstract class
		interactive: true
	},

	beforeAdd: function (map) {
		// Renderer is set here because we need to call renderer.getEvents
		// before this.getEvents.
		this._renderer = map.getRenderer(this);
	},

	onAdd: function () {
		this._renderer._initPath(this);
		this._reset();
		this._renderer._addPath(this);
	},

	onRemove: function () {
		this._renderer._removePath(this);
	},

	// @method redraw(): this
	// Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
	redraw: function () {
		if (this._map) {
			this._renderer._updatePath(this);
		}
		return this;
	},

	// @method setStyle(style: Path options): this
	// Changes the appearance of a Path based on the options in the `Path options` object.
	setStyle: function (style) {
		L.setOptions(this, style);
		if (this._renderer) {
			this._renderer._updateStyle(this);
		}
		return this;
	},

	// @method bringToFront(): this
	// Brings the layer to the top of all path layers.
	bringToFront: function () {
		if (this._renderer) {
			this._renderer._bringToFront(this);
		}
		return this;
	},

	// @method bringToBack(): this
	// Brings the layer to the bottom of all path layers.
	bringToBack: function () {
		if (this._renderer) {
			this._renderer._bringToBack(this);
		}
		return this;
	},

	getElement: function () {
		return this._path;
	},

	_reset: function () {
		// defined in children classes
		this._project();
		this._update();
	},

	_clickTolerance: function () {
		// used when doing hit detection for Canvas layers
		return (this.options.stroke ? this.options.weight / 2 : 0) + (L.Browser.touch ? 10 : 0);
	}
});



/*
 * @namespace LineUtil
 *
 * Various utility functions for polyine points processing, used by Leaflet internally to make polylines lightning-fast.
 */

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	// @function simplify(points: Point[], tolerance: Number): Point[]
	// Dramatically reduces the number of points in a polyline while retaining
	// its shape and returns a new array of simplified points, using the
	// [Douglas-Peucker algorithm](http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm).
	// Used for a huge performance boost when processing/displaying Leaflet polylines for
	// each zoom level and also reducing visual noise. tolerance affects the amount of
	// simplification (lesser value means higher quality but slower and with more points).
	// Also released as a separated micro-library [Simplify.js](http://mourner.github.com/simplify-js/).
	simplify: function (points, tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// @function pointToSegmentDistance(p: Point, p1: Point, p2: Point): Number
	// Returns the distance between point `p` and segment `p1` to `p2`.
	pointToSegmentDistance:  function (p, p1, p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	// @function closestPointOnSegment(p: Point, p1: Point, p2: Point): Number
	// Returns the closest point from a point `p` on a segment `p1` to `p2`.
	closestPointOnSegment: function (p, p1, p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},


	// @function clipSegment(a: Point, b: Point, bounds: Bounds, useLastCode?: Boolean, round?: Boolean): Point[]|Boolean
	// Clips the segment a to b by rectangular bounds with the
	// [Cohen-Sutherland algorithm](https://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm)
	// (modifying the segment points directly!). Used by Leaflet to only show polyline
	// points that are on the screen or near, increasing performance.
	clipSegment: function (a, b, bounds, useLastCode, round) {
		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			}

			// if a,b is outside the clip window (trivial reject)
			if (codeA & codeB) {
				return false;
			}

			// other cases
			codeOut = codeA || codeB;
			p = this._getEdgeIntersection(a, b, codeOut, bounds, round);
			newCode = this._getBitCode(p, bounds);

			if (codeOut === codeA) {
				a = p;
				codeA = newCode;
			} else {
				b = p;
				codeB = newCode;
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds, round) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max,
		    x, y;

		if (code & 8) { // top
			x = a.x + dx * (max.y - a.y) / dy;
			y = max.y;

		} else if (code & 4) { // bottom
			x = a.x + dx * (min.y - a.y) / dy;
			y = min.y;

		} else if (code & 2) { // right
			x = max.x;
			y = a.y + dy * (max.x - a.x) / dx;

		} else if (code & 1) { // left
			x = min.x;
			y = a.y + dy * (min.x - a.x) / dx;
		}

		return new L.Point(x, y, round);
	},

	_getBitCode: function (p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}

		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};



/*
 * @class Polyline
 * @aka L.Polyline
 * @inherits Path
 *
 * A class for drawing polyline overlays on a map. Extends `Path`.
 *
 * @example
 *
 * ```js
 * // create a red polyline from an array of LatLng points
 * var latlngs = [
 * 	[45.51, -122.68],
 * 	[37.77, -122.43],
 * 	[34.04, -118.2]
 * ];
 *
 * var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
 *
 * // zoom the map to the polyline
 * map.fitBounds(polyline.getBounds());
 * ```
 *
 * You can also pass a multi-dimensional array to represent a `MultiPolyline` shape:
 *
 * ```js
 * // create a red polyline from an array of arrays of LatLng points
 * var latlngs = [
 * 	[[45.51, -122.68],
 * 	 [37.77, -122.43],
 * 	 [34.04, -118.2]],
 * 	[[40.78, -73.91],
 * 	 [41.83, -87.62],
 * 	 [32.76, -96.72]]
 * ];
 * ```
 */

L.Polyline = L.Path.extend({

	// @section
	// @aka Polyline options
	options: {
		// @option smoothFactor: Number = 1.0
		// How much to simplify the polyline on each zoom level. More means
		// better performance and smoother look, and less means more accurate representation.
		smoothFactor: 1.0,

		// @option noClip: Boolean = false
		// Disable polyline clipping.
		noClip: false
	},

	initialize: function (latlngs, options) {
		L.setOptions(this, options);
		this._setLatLngs(latlngs);
	},

	// @method getLatLngs(): LatLng[]
	// Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
	getLatLngs: function () {
		return this._latlngs;
	},

	// @method setLatLngs(latlngs: LatLng[]): this
	// Replaces all the points in the polyline with the given array of geographical points.
	setLatLngs: function (latlngs) {
		this._setLatLngs(latlngs);
		return this.redraw();
	},

	// @method isEmpty(): Boolean
	// Returns `true` if the Polyline has no LatLngs.
	isEmpty: function () {
		return !this._latlngs.length;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity,
		    minPoint = null,
		    closest = L.LineUtil._sqClosestPointOnSegment,
		    p1, p2;

		for (var j = 0, jLen = this._parts.length; j < jLen; j++) {
			var points = this._parts[j];

			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];

				var sqDist = closest(p, p1, p2, true);

				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = closest(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	// @method getCenter(): LatLng
	// Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the polyline.
	getCenter: function () {
		// throws error when not yet added to map as this center calculation requires projected coordinates
		if (!this._map) {
			throw new Error('Must add layer to map before using getCenter()');
		}

		var i, halfDist, segDist, dist, p1, p2, ratio,
		    points = this._rings[0],
		    len = points.length;

		if (!len) { return null; }

		// polyline centroid algorithm; only uses the first ring if there are multiple

		for (i = 0, halfDist = 0; i < len - 1; i++) {
			halfDist += points[i].distanceTo(points[i + 1]) / 2;
		}

		// The line is so small in the current view that all points are on the same pixel.
		if (halfDist === 0) {
			return this._map.layerPointToLatLng(points[0]);
		}

		for (i = 0, dist = 0; i < len - 1; i++) {
			p1 = points[i];
			p2 = points[i + 1];
			segDist = p1.distanceTo(p2);
			dist += segDist;

			if (dist > halfDist) {
				ratio = (dist - halfDist) / segDist;
				return this._map.layerPointToLatLng([
					p2.x - ratio * (p2.x - p1.x),
					p2.y - ratio * (p2.y - p1.y)
				]);
			}
		}
	},

	// @method getBounds(): LatLngBounds
	// Returns the `LatLngBounds` of the path.
	getBounds: function () {
		return this._bounds;
	},

	// @method addLatLng(latlng: LatLng, latlngs? LatLng[]): this
	// Adds a given point to the polyline. By default, adds to the first ring of
	// the polyline in case of a multi-polyline, but can be overridden by passing
	// a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
	addLatLng: function (latlng, latlngs) {
		latlngs = latlngs || this._defaultShape();
		latlng = L.latLng(latlng);
		latlngs.push(latlng);
		this._bounds.extend(latlng);
		return this.redraw();
	},

	_setLatLngs: function (latlngs) {
		this._bounds = new L.LatLngBounds();
		this._latlngs = this._convertLatLngs(latlngs);
	},

	_defaultShape: function () {
		return L.Polyline._flat(this._latlngs) ? this._latlngs : this._latlngs[0];
	},

	// recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
	_convertLatLngs: function (latlngs) {
		var result = [],
		    flat = L.Polyline._flat(latlngs);

		for (var i = 0, len = latlngs.length; i < len; i++) {
			if (flat) {
				result[i] = L.latLng(latlngs[i]);
				this._bounds.extend(result[i]);
			} else {
				result[i] = this._convertLatLngs(latlngs[i]);
			}
		}

		return result;
	},

	_project: function () {
		var pxBounds = new L.Bounds();
		this._rings = [];
		this._projectLatlngs(this._latlngs, this._rings, pxBounds);

		var w = this._clickTolerance(),
		    p = new L.Point(w, w);

		if (this._bounds.isValid() && pxBounds.isValid()) {
			pxBounds.min._subtract(p);
			pxBounds.max._add(p);
			this._pxBounds = pxBounds;
		}
	},

	// recursively turns latlngs into a set of rings with projected coordinates
	_projectLatlngs: function (latlngs, result, projectedBounds) {
		var flat = latlngs[0] instanceof L.LatLng,
		    len = latlngs.length,
		    i, ring;

		if (flat) {
			ring = [];
			for (i = 0; i < len; i++) {
				ring[i] = this._map.latLngToLayerPoint(latlngs[i]);
				projectedBounds.extend(ring[i]);
			}
			result.push(ring);
		} else {
			for (i = 0; i < len; i++) {
				this._projectLatlngs(latlngs[i], result, projectedBounds);
			}
		}
	},

	// clip polyline by renderer bounds so that we have less to render for performance
	_clipPoints: function () {
		var bounds = this._renderer._bounds;

		this._parts = [];
		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
			return;
		}

		if (this.options.noClip) {
			this._parts = this._rings;
			return;
		}

		var parts = this._parts,
		    i, j, k, len, len2, segment, points;

		for (i = 0, k = 0, len = this._rings.length; i < len; i++) {
			points = this._rings[i];

			for (j = 0, len2 = points.length; j < len2 - 1; j++) {
				segment = L.LineUtil.clipSegment(points[j], points[j + 1], bounds, j, true);

				if (!segment) { continue; }

				parts[k] = parts[k] || [];
				parts[k].push(segment[0]);

				// if segment goes out of screen, or it's the last one, it's the end of the line part
				if ((segment[1] !== points[j + 1]) || (j === len2 - 2)) {
					parts[k].push(segment[1]);
					k++;
				}
			}
		}
	},

	// simplify each clipped part of the polyline for performance
	_simplifyPoints: function () {
		var parts = this._parts,
		    tolerance = this.options.smoothFactor;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = L.LineUtil.simplify(parts[i], tolerance);
		}
	},

	_update: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();
		this._updatePath();
	},

	_updatePath: function () {
		this._renderer._updatePoly(this);
	}
});

// @factory L.polyline(latlngs: LatLng[], options?: Polyline options)
// Instantiates a polyline object given an array of geographical points and
// optionally an options object. You can create a `Polyline` object with
// multiple separate lines (`MultiPolyline`) by passing an array of arrays
// of geographic points.
L.polyline = function (latlngs, options) {
	return new L.Polyline(latlngs, options);
};

L.Polyline._flat = function (latlngs) {
	// true if it's a flat array of latlngs; false if nested
	return !L.Util.isArray(latlngs[0]) || (typeof latlngs[0][0] !== 'object' && typeof latlngs[0][0] !== 'undefined');
};



/*
 * @namespace PolyUtil
 * Various utility functions for polygon geometries.
 */

L.PolyUtil = {};

/* @function clipPolygon(points: Point[], bounds: Bounds, round?: Boolean): Point[]
 * Clips the polygon geometry defined by the given `points` by the given bounds (using the [Sutherland-Hodgeman algorithm](https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm)).
 * Used by Leaflet to only show polygon points that are on the screen or near, increasing
 * performance. Note that polygon points needs different algorithm for clipping
 * than polyline, so there's a seperate method for it.
 */
L.PolyUtil.clipPolygon = function (points, bounds, round) {
	var clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds, round);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds, round);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};



/*
 * @class Polygon
 * @aka L.Polygon
 * @inherits Polyline
 *
 * A class for drawing polygon overlays on a map. Extends `Polyline`.
 *
 * Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.
 *
 *
 * @example
 *
 * ```js
 * // create a red polygon from an array of LatLng points
 * var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
 *
 * var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
 *
 * // zoom the map to the polygon
 * map.fitBounds(polygon.getBounds());
 * ```
 *
 * You can also pass an array of arrays of latlngs, with the first array representing the outer shape and the other arrays representing holes in the outer shape:
 *
 * ```js
 * var latlngs = [
 *   [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
 *   [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
 * ];
 * ```
 *
 * Additionally, you can pass a multi-dimensional array to represent a MultiPolygon shape.
 *
 * ```js
 * var latlngs = [
 *   [ // first polygon
 *     [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]], // outer ring
 *     [[37.29, -108.58],[40.71, -108.58],[40.71, -102.50],[37.29, -102.50]] // hole
 *   ],
 *   [ // second polygon
 *     [[41, -111.03],[45, -111.04],[45, -104.05],[41, -104.05]]
 *   ]
 * ];
 * ```
 */

L.Polygon = L.Polyline.extend({

	options: {
		fill: true
	},

	isEmpty: function () {
		return !this._latlngs.length || !this._latlngs[0].length;
	},

	getCenter: function () {
		// throws error when not yet added to map as this center calculation requires projected coordinates
		if (!this._map) {
			throw new Error('Must add layer to map before using getCenter()');
		}

		var i, j, p1, p2, f, area, x, y, center,
		    points = this._rings[0],
		    len = points.length;

		if (!len) { return null; }

		// polygon centroid algorithm; only uses the first ring if there are multiple

		area = x = y = 0;

		for (i = 0, j = len - 1; i < len; j = i++) {
			p1 = points[i];
			p2 = points[j];

			f = p1.y * p2.x - p2.y * p1.x;
			x += (p1.x + p2.x) * f;
			y += (p1.y + p2.y) * f;
			area += f * 3;
		}

		if (area === 0) {
			// Polygon is so small that all points are on same pixel.
			center = points[0];
		} else {
			center = [x / area, y / area];
		}
		return this._map.layerPointToLatLng(center);
	},

	_convertLatLngs: function (latlngs) {
		var result = L.Polyline.prototype._convertLatLngs.call(this, latlngs),
		    len = result.length;

		// remove last point if it equals first one
		if (len >= 2 && result[0] instanceof L.LatLng && result[0].equals(result[len - 1])) {
			result.pop();
		}
		return result;
	},

	_setLatLngs: function (latlngs) {
		L.Polyline.prototype._setLatLngs.call(this, latlngs);
		if (L.Polyline._flat(this._latlngs)) {
			this._latlngs = [this._latlngs];
		}
	},

	_defaultShape: function () {
		return L.Polyline._flat(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
	},

	_clipPoints: function () {
		// polygons need a different clipping algorithm so we redefine that

		var bounds = this._renderer._bounds,
		    w = this.options.weight,
		    p = new L.Point(w, w);

		// increase clip padding by stroke width to avoid stroke on clip edges
		bounds = new L.Bounds(bounds.min.subtract(p), bounds.max.add(p));

		this._parts = [];
		if (!this._pxBounds || !this._pxBounds.intersects(bounds)) {
			return;
		}

		if (this.options.noClip) {
			this._parts = this._rings;
			return;
		}

		for (var i = 0, len = this._rings.length, clipped; i < len; i++) {
			clipped = L.PolyUtil.clipPolygon(this._rings[i], bounds, true);
			if (clipped.length) {
				this._parts.push(clipped);
			}
		}
	},

	_updatePath: function () {
		this._renderer._updatePoly(this, true);
	}
});


// @factory L.polygon(latlngs: LatLng[], options?: Polyline options)
L.polygon = function (latlngs, options) {
	return new L.Polygon(latlngs, options);
};



/*
 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
 */

/*
 * @class Rectangle
 * @aka L.Retangle
 * @inherits Polygon
 *
 * A class for drawing rectangle overlays on a map. Extends `Polygon`.
 *
 * @example
 *
 * ```js
 * // define rectangle geographical bounds
 * var bounds = [[54.559322, -5.767822], [56.1210604, -3.021240]];
 *
 * // create an orange rectangle
 * L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
 *
 * // zoom the map to the rectangle bounds
 * map.fitBounds(bounds);
 * ```
 *
 */


L.Rectangle = L.Polygon.extend({
	initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	},

	// @method setBounds(latLngBounds: LatLngBounds): this
	// Redraws the rectangle with the passed bounds.
	setBounds: function (latLngBounds) {
		return this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	},

	_boundsToLatLngs: function (latLngBounds) {
		latLngBounds = L.latLngBounds(latLngBounds);
		return [
			latLngBounds.getSouthWest(),
			latLngBounds.getNorthWest(),
			latLngBounds.getNorthEast(),
			latLngBounds.getSouthEast()
		];
	}
});


// @factory L.rectangle(latLngBounds: LatLngBounds, options?: Polyline options)
L.rectangle = function (latLngBounds, options) {
	return new L.Rectangle(latLngBounds, options);
};



/*
 * @class CircleMarker
 * @aka L.CircleMarker
 * @inherits Path
 *
 * A circle of a fixed size with radius specified in pixels. Extends `Path`.
 */

L.CircleMarker = L.Path.extend({

	// @section
	// @aka CircleMarker options
	options: {
		fill: true,

		// @option radius: Number = 10
		// Radius of the circle marker, in pixels
		radius: 10
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
		this._radius = this.options.radius;
	},

	// @method setLatLng(latLng: LatLng): this
	// Sets the position of a circle marker to a new location.
	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		this.redraw();
		return this.fire('move', {latlng: this._latlng});
	},

	// @method getLatLng(): LatLng
	// Returns the current geographical position of the circle marker
	getLatLng: function () {
		return this._latlng;
	},

	// @method setRadius(radius: Number): this
	// Sets the radius of a circle marker. Units are in pixels.
	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	// @method getRadius(): Number
	// Returns the current radius of the circle
	getRadius: function () {
		return this._radius;
	},

	setStyle : function (options) {
		var radius = options && options.radius || this._radius;
		L.Path.prototype.setStyle.call(this, options);
		this.setRadius(radius);
		return this;
	},

	_project: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	_updateBounds: function () {
		var r = this._radius,
		    r2 = this._radiusY || r,
		    w = this._clickTolerance(),
		    p = [r + w, r2 + w];
		this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
	},

	_update: function () {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath: function () {
		this._renderer._updateCircle(this);
	},

	_empty: function () {
		return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
	}
});


// @factory L.circleMarker(latlng: LatLng, options?: CircleMarker options)
// Instantiates a circle marker object given a geographical point, and an optional options object.
L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};



/*
 * @class Circle
 * @aka L.Circle
 * @inherits CircleMarker
 *
 * A class for drawing circle overlays on a map. Extends `CircleMarker`.
 *
 * It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).
 *
 * @example
 *
 * ```js
 * L.circle([50.5, 30.5], {radius: 200}).addTo(map);
 * ```
 */

L.Circle = L.CircleMarker.extend({

	initialize: function (latlng, options, legacyOptions) {
		if (typeof options === 'number') {
			// Backwards compatibility with 0.7.x factory (latlng, radius, options?)
			options = L.extend({}, legacyOptions, {radius: options});
		}
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);

		if (isNaN(this.options.radius)) { throw new Error('Circle radius cannot be NaN'); }

		// @section
		// @aka Circle options
		// @option radius: Number; Radius of the circle, in meters.
		this._mRadius = this.options.radius;
	},

	// @method setRadius(radius: Number): this
	// Sets the radius of a circle. Units are in meters.
	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	// @method getRadius(): Number
	// Returns the current radius of a circle. Units are in meters.
	getRadius: function () {
		return this._mRadius;
	},

	// @method getBounds(): LatLngBounds
	// Returns the `LatLngBounds` of the path.
	getBounds: function () {
		var half = [this._radius, this._radiusY || this._radius];

		return new L.LatLngBounds(
			this._map.layerPointToLatLng(this._point.subtract(half)),
			this._map.layerPointToLatLng(this._point.add(half)));
	},

	setStyle: L.Path.prototype.setStyle,

	_project: function () {

		var lng = this._latlng.lng,
		    lat = this._latlng.lat,
		    map = this._map,
		    crs = map.options.crs;

		if (crs.distance === L.CRS.Earth.distance) {
			var d = Math.PI / 180,
			    latR = (this._mRadius / L.CRS.Earth.R) / d,
			    top = map.project([lat + latR, lng]),
			    bottom = map.project([lat - latR, lng]),
			    p = top.add(bottom).divideBy(2),
			    lat2 = map.unproject(p).lat,
			    lngR = Math.acos((Math.cos(latR * d) - Math.sin(lat * d) * Math.sin(lat2 * d)) /
			            (Math.cos(lat * d) * Math.cos(lat2 * d))) / d;

			if (isNaN(lngR) || lngR === 0) {
				lngR = latR / Math.cos(Math.PI / 180 * lat); // Fallback for edge case, #2425
			}

			this._point = p.subtract(map.getPixelOrigin());
			this._radius = isNaN(lngR) ? 0 : Math.max(Math.round(p.x - map.project([lat2, lng - lngR]).x), 1);
			this._radiusY = Math.max(Math.round(p.y - top.y), 1);

		} else {
			var latlng2 = crs.unproject(crs.project(this._latlng).subtract([this._mRadius, 0]));

			this._point = map.latLngToLayerPoint(this._latlng);
			this._radius = this._point.x - map.latLngToLayerPoint(latlng2).x;
		}

		this._updateBounds();
	}
});

// @factory L.circle(latlng: LatLng, options?: Circle options)
// Instantiates a circle object given a geographical point, and an options object
// which contains the circle radius.
// @alternative
// @factory L.circle(latlng: LatLng, radius: Number, options?: Circle options)
// Obsolete way of instantiating a circle, for compatibility with 0.7.x code.
// Do not use in new applications or plugins.
L.circle = function (latlng, options, legacyOptions) {
	return new L.Circle(latlng, options, legacyOptions);
};



/*
 * @class SVG
 * @inherits Renderer
 * @aka L.SVG
 *
 * Allows vector layers to be displayed with [SVG](https://developer.mozilla.org/docs/Web/SVG).
 * Inherits `Renderer`.
 *
 * Due to [technical limitations](http://caniuse.com/#search=svg), SVG is not
 * available in all web browsers, notably Android 2.x and 3.x.
 *
 * Although SVG is not available on IE7 and IE8, these browsers support
 * [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language)
 * (a now deprecated technology), and the SVG renderer will fall back to VML in
 * this case.
 *
 * @example
 *
 * Use SVG by default for all paths in the map:
 *
 * ```js
 * var map = L.map('map', {
 * 	renderer: L.svg()
 * });
 * ```
 *
 * Use a SVG renderer with extra padding for specific vector geometries:
 *
 * ```js
 * var map = L.map('map');
 * var myRenderer = L.svg({ padding: 0.5 });
 * var line = L.polyline( coordinates, { renderer: myRenderer } );
 * var circle = L.circle( center, { renderer: myRenderer } );
 * ```
 */

L.SVG = L.Renderer.extend({

	getEvents: function () {
		var events = L.Renderer.prototype.getEvents.call(this);
		events.zoomstart = this._onZoomStart;
		return events;
	},

	_initContainer: function () {
		this._container = L.SVG.create('svg');

		// makes it possible to click through svg root; we'll reset it back in individual paths
		this._container.setAttribute('pointer-events', 'none');

		this._rootGroup = L.SVG.create('g');
		this._container.appendChild(this._rootGroup);
	},

	_onZoomStart: function () {
		// Drag-then-pinch interactions might mess up the center and zoom.
		// In this case, the easiest way to prevent this is re-do the renderer
		//   bounds and padding when the zooming starts.
		this._update();
	},

	_update: function () {
		if (this._map._animatingZoom && this._bounds) { return; }

		L.Renderer.prototype._update.call(this);

		var b = this._bounds,
		    size = b.getSize(),
		    container = this._container;

		// set size of svg-container if changed
		if (!this._svgSize || !this._svgSize.equals(size)) {
			this._svgSize = size;
			container.setAttribute('width', size.x);
			container.setAttribute('height', size.y);
		}

		// movement: update container viewBox so that we don't have to change coordinates of individual layers
		L.DomUtil.setPosition(container, b.min);
		container.setAttribute('viewBox', [b.min.x, b.min.y, size.x, size.y].join(' '));

		this.fire('update');
	},

	// methods below are called by vector layers implementations

	_initPath: function (layer) {
		var path = layer._path = L.SVG.create('path');

		// @namespace Path
		// @option className: String = null
		// Custom class name set on an element. Only for SVG renderer.
		if (layer.options.className) {
			L.DomUtil.addClass(path, layer.options.className);
		}

		if (layer.options.interactive) {
			L.DomUtil.addClass(path, 'leaflet-interactive');
		}

		this._updateStyle(layer);
		this._layers[L.stamp(layer)] = layer;
	},

	_addPath: function (layer) {
		this._rootGroup.appendChild(layer._path);
		layer.addInteractiveTarget(layer._path);
	},

	_removePath: function (layer) {
		L.DomUtil.remove(layer._path);
		layer.removeInteractiveTarget(layer._path);
		delete this._layers[L.stamp(layer)];
	},

	_updatePath: function (layer) {
		layer._project();
		layer._update();
	},

	_updateStyle: function (layer) {
		var path = layer._path,
		    options = layer.options;

		if (!path) { return; }

		if (options.stroke) {
			path.setAttribute('stroke', options.color);
			path.setAttribute('stroke-opacity', options.opacity);
			path.setAttribute('stroke-width', options.weight);
			path.setAttribute('stroke-linecap', options.lineCap);
			path.setAttribute('stroke-linejoin', options.lineJoin);

			if (options.dashArray) {
				path.setAttribute('stroke-dasharray', options.dashArray);
			} else {
				path.removeAttribute('stroke-dasharray');
			}

			if (options.dashOffset) {
				path.setAttribute('stroke-dashoffset', options.dashOffset);
			} else {
				path.removeAttribute('stroke-dashoffset');
			}
		} else {
			path.setAttribute('stroke', 'none');
		}

		if (options.fill) {
			path.setAttribute('fill', options.fillColor || options.color);
			path.setAttribute('fill-opacity', options.fillOpacity);
			path.setAttribute('fill-rule', options.fillRule || 'evenodd');
		} else {
			path.setAttribute('fill', 'none');
		}
	},

	_updatePoly: function (layer, closed) {
		this._setPath(layer, L.SVG.pointsToPath(layer._parts, closed));
	},

	_updateCircle: function (layer) {
		var p = layer._point,
		    r = layer._radius,
		    r2 = layer._radiusY || r,
		    arc = 'a' + r + ',' + r2 + ' 0 1,0 ';

		// drawing a circle with two half-arcs
		var d = layer._empty() ? 'M0 0' :
				'M' + (p.x - r) + ',' + p.y +
				arc + (r * 2) + ',0 ' +
				arc + (-r * 2) + ',0 ';

		this._setPath(layer, d);
	},

	_setPath: function (layer, path) {
		layer._path.setAttribute('d', path);
	},

	// SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
	_bringToFront: function (layer) {
		L.DomUtil.toFront(layer._path);
	},

	_bringToBack: function (layer) {
		L.DomUtil.toBack(layer._path);
	}
});


// @namespace SVG; @section
// There are several static functions which can be called without instantiating L.SVG:
L.extend(L.SVG, {
	// @function create(name: String): SVGElement
	// Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
	// corresponding to the class name passed. For example, using 'line' will return
	// an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
	create: function (name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	},

	// @function pointsToPath(rings: Point[], closed: Boolean): String
	// Generates a SVG path string for multiple rings, with each ring turning
	// into "M..L..L.." instructions
	pointsToPath: function (rings, closed) {
		var str = '',
		    i, j, len, len2, points, p;

		for (i = 0, len = rings.length; i < len; i++) {
			points = rings[i];

			for (j = 0, len2 = points.length; j < len2; j++) {
				p = points[j];
				str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
			}

			// closes the ring for polygons; "x" is VML syntax
			str += closed ? (L.Browser.svg ? 'z' : 'x') : '';
		}

		// SVG complains about empty path strings
		return str || 'M0 0';
	}
});

// @namespace Browser; @property svg: Boolean
// `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
L.Browser.svg = !!(document.createElementNS && L.SVG.create('svg').createSVGRect);


// @namespace SVG
// @factory L.svg(options?: Renderer options)
// Creates a SVG renderer with the given options.
L.svg = function (options) {
	return L.Browser.svg || L.Browser.vml ? new L.SVG(options) : null;
};



/*
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

/*
 * @class SVG
 *
 * Although SVG is not available on IE7 and IE8, these browsers support [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language), and the SVG renderer will fall back to VML in this case.
 *
 * VML was deprecated in 2012, which means VML functionality exists only for backwards compatibility
 * with old versions of Internet Explorer.
 */

// @namespace Browser; @property vml: Boolean
// `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
L.Browser.vml = !L.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

// redefine some SVG methods to handle VML syntax which is similar but with some differences
L.SVG.include(!L.Browser.vml ? {} : {

	_initContainer: function () {
		this._container = L.DomUtil.create('div', 'leaflet-vml-container');
	},

	_update: function () {
		if (this._map._animatingZoom) { return; }
		L.Renderer.prototype._update.call(this);
		this.fire('update');
	},

	_initPath: function (layer) {
		var container = layer._container = L.SVG.create('shape');

		L.DomUtil.addClass(container, 'leaflet-vml-shape ' + (this.options.className || ''));

		container.coordsize = '1 1';

		layer._path = L.SVG.create('path');
		container.appendChild(layer._path);

		this._updateStyle(layer);
		this._layers[L.stamp(layer)] = layer;
	},

	_addPath: function (layer) {
		var container = layer._container;
		this._container.appendChild(container);

		if (layer.options.interactive) {
			layer.addInteractiveTarget(container);
		}
	},

	_removePath: function (layer) {
		var container = layer._container;
		L.DomUtil.remove(container);
		layer.removeInteractiveTarget(container);
		delete this._layers[L.stamp(layer)];
	},

	_updateStyle: function (layer) {
		var stroke = layer._stroke,
		    fill = layer._fill,
		    options = layer.options,
		    container = layer._container;

		container.stroked = !!options.stroke;
		container.filled = !!options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = layer._stroke = L.SVG.create('stroke');
			}
			container.appendChild(stroke);
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;

			if (options.dashArray) {
				stroke.dashStyle = L.Util.isArray(options.dashArray) ?
				    options.dashArray.join(' ') :
				    options.dashArray.replace(/( *, *)/g, ' ');
			} else {
				stroke.dashStyle = '';
			}
			stroke.endcap = options.lineCap.replace('butt', 'flat');
			stroke.joinstyle = options.lineJoin;

		} else if (stroke) {
			container.removeChild(stroke);
			layer._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = layer._fill = L.SVG.create('fill');
			}
			container.appendChild(fill);
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;

		} else if (fill) {
			container.removeChild(fill);
			layer._fill = null;
		}
	},

	_updateCircle: function (layer) {
		var p = layer._point.round(),
		    r = Math.round(layer._radius),
		    r2 = Math.round(layer._radiusY || r);

		this._setPath(layer, layer._empty() ? 'M0 0' :
				'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r2 + ' 0,' + (65535 * 360));
	},

	_setPath: function (layer, path) {
		layer._path.v = path;
	},

	_bringToFront: function (layer) {
		L.DomUtil.toFront(layer._container);
	},

	_bringToBack: function (layer) {
		L.DomUtil.toBack(layer._container);
	}
});

if (L.Browser.vml) {
	L.SVG.create = (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement('<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	})();
}



/*
 * @class Canvas
 * @inherits Renderer
 * @aka L.Canvas
 *
 * Allows vector layers to be displayed with [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
 * Inherits `Renderer`.
 *
 * Due to [technical limitations](http://caniuse.com/#search=canvas), Canvas is not
 * available in all web browsers, notably IE8, and overlapping geometries might
 * not display properly in some edge cases.
 *
 * @example
 *
 * Use Canvas by default for all paths in the map:
 *
 * ```js
 * var map = L.map('map', {
 * 	renderer: L.canvas()
 * });
 * ```
 *
 * Use a Canvas renderer with extra padding for specific vector geometries:
 *
 * ```js
 * var map = L.map('map');
 * var myRenderer = L.canvas({ padding: 0.5 });
 * var line = L.polyline( coordinates, { renderer: myRenderer } );
 * var circle = L.circle( center, { renderer: myRenderer } );
 * ```
 */

L.Canvas = L.Renderer.extend({
	getEvents: function () {
		var events = L.Renderer.prototype.getEvents.call(this);
		events.viewprereset = this._onViewPreReset;
		return events;
	},

	_onViewPreReset: function () {
		// Set a flag so that a viewprereset+moveend+viewreset only updates&redraws once
		this._postponeUpdatePaths = true;
	},

	onAdd: function () {
		L.Renderer.prototype.onAdd.call(this);

		// Redraw vectors since canvas is cleared upon removal,
		// in case of removing the renderer itself from the map.
		this._draw();
	},

	_initContainer: function () {
		var container = this._container = document.createElement('canvas');

		L.DomEvent
			.on(container, 'mousemove', L.Util.throttle(this._onMouseMove, 32, this), this)
			.on(container, 'click dblclick mousedown mouseup contextmenu', this._onClick, this)
			.on(container, 'mouseout', this._handleMouseOut, this);

		this._ctx = container.getContext('2d');
	},

	_updatePaths: function () {
		if (this._postponeUpdatePaths) { return; }

		var layer;
		this._redrawBounds = null;
		for (var id in this._layers) {
			layer = this._layers[id];
			layer._update();
		}
		this._redraw();
	},

	_update: function () {
		if (this._map._animatingZoom && this._bounds) { return; }

		this._drawnLayers = {};

		L.Renderer.prototype._update.call(this);

		var b = this._bounds,
		    container = this._container,
		    size = b.getSize(),
		    m = L.Browser.retina ? 2 : 1;

		L.DomUtil.setPosition(container, b.min);

		// set canvas size (also clearing it); use double size on retina
		container.width = m * size.x;
		container.height = m * size.y;
		container.style.width = size.x + 'px';
		container.style.height = size.y + 'px';

		if (L.Browser.retina) {
			this._ctx.scale(2, 2);
		}

		// translate so we use the same path coordinates after canvas element moves
		this._ctx.translate(-b.min.x, -b.min.y);

		// Tell paths to redraw themselves
		this.fire('update');
	},

	_reset: function () {
		L.Renderer.prototype._reset.call(this);

		if (this._postponeUpdatePaths) {
			this._postponeUpdatePaths = false;
			this._updatePaths();
		}
	},

	_initPath: function (layer) {
		this._updateDashArray(layer);
		this._layers[L.stamp(layer)] = layer;

		var order = layer._order = {
			layer: layer,
			prev: this._drawLast,
			next: null
		};
		if (this._drawLast) { this._drawLast.next = order; }
		this._drawLast = order;
		this._drawFirst = this._drawFirst || this._drawLast;
	},

	_addPath: function (layer) {
		this._requestRedraw(layer);
	},

	_removePath: function (layer) {
		var order = layer._order;
		var next = order.next;
		var prev = order.prev;

		if (next) {
			next.prev = prev;
		} else {
			this._drawLast = prev;
		}
		if (prev) {
			prev.next = next;
		} else {
			this._drawFirst = next;
		}

		delete layer._order;

		delete this._layers[L.stamp(layer)];

		this._requestRedraw(layer);
	},

	_updatePath: function (layer) {
		// Redraw the union of the layer's old pixel
		// bounds and the new pixel bounds.
		this._extendRedrawBounds(layer);
		layer._project();
		layer._update();
		// The redraw will extend the redraw bounds
		// with the new pixel bounds.
		this._requestRedraw(layer);
	},

	_updateStyle: function (layer) {
		this._updateDashArray(layer);
		this._requestRedraw(layer);
	},

	_updateDashArray: function (layer) {
		if (layer.options.dashArray) {
			var parts = layer.options.dashArray.split(','),
			    dashArray = [],
			    i;
			for (i = 0; i < parts.length; i++) {
				dashArray.push(Number(parts[i]));
			}
			layer.options._dashArray = dashArray;
		}
	},

	_requestRedraw: function (layer) {
		if (!this._map) { return; }

		this._extendRedrawBounds(layer);
		this._redrawRequest = this._redrawRequest || L.Util.requestAnimFrame(this._redraw, this);
	},

	_extendRedrawBounds: function (layer) {
		var padding = (layer.options.weight || 0) + 1;
		this._redrawBounds = this._redrawBounds || new L.Bounds();
		this._redrawBounds.extend(layer._pxBounds.min.subtract([padding, padding]));
		this._redrawBounds.extend(layer._pxBounds.max.add([padding, padding]));
	},

	_redraw: function () {
		this._redrawRequest = null;

		if (this._redrawBounds) {
			this._redrawBounds.min._floor();
			this._redrawBounds.max._ceil();
		}

		this._clear(); // clear layers in redraw bounds
		this._draw(); // draw layers

		this._redrawBounds = null;
	},

	_clear: function () {
		var bounds = this._redrawBounds;
		if (bounds) {
			var size = bounds.getSize();
			this._ctx.clearRect(bounds.min.x, bounds.min.y, size.x, size.y);
		} else {
			this._ctx.clearRect(0, 0, this._container.width, this._container.height);
		}
	},

	_draw: function () {
		var layer, bounds = this._redrawBounds;
		this._ctx.save();
		if (bounds) {
			var size = bounds.getSize();
			this._ctx.beginPath();
			this._ctx.rect(bounds.min.x, bounds.min.y, size.x, size.y);
			this._ctx.clip();
		}

		this._drawing = true;

		for (var order = this._drawFirst; order; order = order.next) {
			layer = order.layer;
			if (!bounds || (layer._pxBounds && layer._pxBounds.intersects(bounds))) {
				layer._updatePath();
			}
		}

		this._drawing = false;

		this._ctx.restore();  // Restore state before clipping.
	},

	_updatePoly: function (layer, closed) {
		if (!this._drawing) { return; }

		var i, j, len2, p,
		    parts = layer._parts,
		    len = parts.length,
		    ctx = this._ctx;

		if (!len) { return; }

		this._drawnLayers[layer._leaflet_id] = layer;

		ctx.beginPath();

		if (ctx.setLineDash) {
			ctx.setLineDash(layer.options && layer.options._dashArray || []);
		}

		for (i = 0; i < len; i++) {
			for (j = 0, len2 = parts[i].length; j < len2; j++) {
				p = parts[i][j];
				ctx[j ? 'lineTo' : 'moveTo'](p.x, p.y);
			}
			if (closed) {
				ctx.closePath();
			}
		}

		this._fillStroke(ctx, layer);

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_updateCircle: function (layer) {

		if (!this._drawing || layer._empty()) { return; }

		var p = layer._point,
		    ctx = this._ctx,
		    r = layer._radius,
		    s = (layer._radiusY || r) / r;

		this._drawnLayers[layer._leaflet_id] = layer;

		if (s !== 1) {
			ctx.save();
			ctx.scale(1, s);
		}

		ctx.beginPath();
		ctx.arc(p.x, p.y / s, r, 0, Math.PI * 2, false);

		if (s !== 1) {
			ctx.restore();
		}

		this._fillStroke(ctx, layer);
	},

	_fillStroke: function (ctx, layer) {
		var options = layer.options;

		if (options.fill) {
			ctx.globalAlpha = options.fillOpacity;
			ctx.fillStyle = options.fillColor || options.color;
			ctx.fill(options.fillRule || 'evenodd');
		}

		if (options.stroke && options.weight !== 0) {
			ctx.globalAlpha = options.opacity;
			ctx.lineWidth = options.weight;
			ctx.strokeStyle = options.color;
			ctx.lineCap = options.lineCap;
			ctx.lineJoin = options.lineJoin;
			ctx.stroke();
		}
	},

	// Canvas obviously doesn't have mouse events for individual drawn objects,
	// so we emulate that by calculating what's under the mouse on mousemove/click manually

	_onClick: function (e) {
		var point = this._map.mouseEventToLayerPoint(e), layer, clickedLayer;

		for (var order = this._drawFirst; order; order = order.next) {
			layer = order.layer;
			if (layer.options.interactive && layer._containsPoint(point) && !this._map._draggableMoved(layer)) {
				clickedLayer = layer;
			}
		}
		if (clickedLayer)  {
			L.DomEvent._fakeStop(e);
			this._fireEvent([clickedLayer], e);
		}
	},

	_onMouseMove: function (e) {
		if (!this._map || this._map.dragging.moving() || this._map._animatingZoom) { return; }

		var point = this._map.mouseEventToLayerPoint(e);
		this._handleMouseHover(e, point);
	},


	_handleMouseOut: function (e) {
		var layer = this._hoveredLayer;
		if (layer) {
			// if we're leaving the layer, fire mouseout
			L.DomUtil.removeClass(this._container, 'leaflet-interactive');
			this._fireEvent([layer], e, 'mouseout');
			this._hoveredLayer = null;
		}
	},

	_handleMouseHover: function (e, point) {
		var layer, candidateHoveredLayer;

		for (var order = this._drawFirst; order; order = order.next) {
			layer = order.layer;
			if (layer.options.interactive && layer._containsPoint(point)) {
				candidateHoveredLayer = layer;
			}
		}

		if (candidateHoveredLayer !== this._hoveredLayer) {
			this._handleMouseOut(e);

			if (candidateHoveredLayer) {
				L.DomUtil.addClass(this._container, 'leaflet-interactive'); // change cursor
				this._fireEvent([candidateHoveredLayer], e, 'mouseover');
				this._hoveredLayer = candidateHoveredLayer;
			}
		}

		if (this._hoveredLayer) {
			this._fireEvent([this._hoveredLayer], e);
		}
	},

	_fireEvent: function (layers, e, type) {
		this._map._fireDOMEvent(e, type || e.type, layers);
	},

	_bringToFront: function (layer) {
		var order = layer._order;
		var next = order.next;
		var prev = order.prev;

		if (next) {
			next.prev = prev;
		} else {
			// Already last
			return;
		}
		if (prev) {
			prev.next = next;
		} else if (next) {
			// Update first entry unless this is the
			// signle entry
			this._drawFirst = next;
		}

		order.prev = this._drawLast;
		this._drawLast.next = order;

		order.next = null;
		this._drawLast = order;

		this._requestRedraw(layer);
	},

	_bringToBack: function (layer) {
		var order = layer._order;
		var next = order.next;
		var prev = order.prev;

		if (prev) {
			prev.next = next;
		} else {
			// Already first
			return;
		}
		if (next) {
			next.prev = prev;
		} else if (prev) {
			// Update last entry unless this is the
			// signle entry
			this._drawLast = prev;
		}

		order.prev = null;

		order.next = this._drawFirst;
		this._drawFirst.prev = order;
		this._drawFirst = order;

		this._requestRedraw(layer);
	}
});

// @namespace Browser; @property canvas: Boolean
// `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

// @namespace Canvas
// @factory L.canvas(options?: Renderer options)
// Creates a Canvas renderer with the given options.
L.canvas = function (options) {
	return L.Browser.canvas ? new L.Canvas(options) : null;
};

L.Polyline.prototype._containsPoint = function (p, closed) {
	var i, j, k, len, len2, part,
	    w = this._clickTolerance();

	if (!this._pxBounds.contains(p)) { return false; }

	// hit detection for polylines
	for (i = 0, len = this._parts.length; i < len; i++) {
		part = this._parts[i];

		for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
			if (!closed && (j === 0)) { continue; }

			if (L.LineUtil.pointToSegmentDistance(p, part[k], part[j]) <= w) {
				return true;
			}
		}
	}
	return false;
};

L.Polygon.prototype._containsPoint = function (p) {
	var inside = false,
	    part, p1, p2, i, j, k, len, len2;

	if (!this._pxBounds.contains(p)) { return false; }

	// ray casting algorithm for detecting if point is in polygon
	for (i = 0, len = this._parts.length; i < len; i++) {
		part = this._parts[i];

		for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
			p1 = part[j];
			p2 = part[k];

			if (((p1.y > p.y) !== (p2.y > p.y)) && (p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
				inside = !inside;
			}
		}
	}

	// also check if it's on polygon stroke
	return inside || L.Polyline.prototype._containsPoint.call(this, p, true);
};

L.CircleMarker.prototype._containsPoint = function (p) {
	return p.distanceTo(this._point) <= this._radius + this._clickTolerance();
};



/*
 * @class GeoJSON
 * @aka L.GeoJSON
 * @inherits FeatureGroup
 *
 * Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse
 * GeoJSON data and display it on the map. Extends `FeatureGroup`.
 *
 * @example
 *
 * ```js
 * L.geoJSON(data, {
 * 	style: function (feature) {
 * 		return {color: feature.properties.color};
 * 	}
 * }).bindPopup(function (layer) {
 * 	return layer.feature.properties.description;
 * }).addTo(map);
 * ```
 */

L.GeoJSON = L.FeatureGroup.extend({

	/* @section
	 * @aka GeoJSON options
	 *
	 * @option pointToLayer: Function = *
	 * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
	 * called when data is added, passing the GeoJSON point feature and its `LatLng`.
	 * The default is to spawn a default `Marker`:
	 * ```js
	 * function(geoJsonPoint, latlng) {
	 * 	return L.marker(latlng);
	 * }
	 * ```
	 *
	 * @option style: Function = *
	 * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
	 * called internally when data is added.
	 * The default value is to not override any defaults:
	 * ```js
	 * function (geoJsonFeature) {
	 * 	return {}
	 * }
	 * ```
	 *
	 * @option onEachFeature: Function = *
	 * A `Function` that will be called once for each created `Feature`, after it has
	 * been created and styled. Useful for attaching events and popups to features.
	 * The default is to do nothing with the newly created layers:
	 * ```js
	 * function (feature, layer) {}
	 * ```
	 *
	 * @option filter: Function = *
	 * A `Function` that will be used to decide whether to include a feature or not.
	 * The default is to include all features:
	 * ```js
	 * function (geoJsonFeature) {
	 * 	return true;
	 * }
	 * ```
	 * Note: dynamically changing the `filter` option will have effect only on newly
	 * added data. It will _not_ re-evaluate already included features.
	 *
	 * @option coordsToLatLng: Function = *
	 * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
	 * The default is the `coordsToLatLng` static method.
	 */

	initialize: function (geojson, options) {
		L.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	// @method addData( <GeoJSON> data ): this
	// Adds a GeoJSON object to the layer.
	addData: function (geojson) {
		var features = L.Util.isArray(geojson) ? geojson : geojson.features,
		    i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(feature);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return this; }

		var layer = L.GeoJSON.geometryToLayer(geojson, options);
		if (!layer) {
			return this;
		}
		layer.feature = L.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	// @method resetStyle( <Path> layer ): this
	// Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
	resetStyle: function (layer) {
		// reset any custom styles
		layer.options = L.Util.extend({}, layer.defaultOptions);
		this._setLayerStyle(layer, this.options.style);
		return this;
	},

	// @method setStyle( <Function> style ): this
	// Changes styles of GeoJSON vector layers with the given style function.
	setStyle: function (style) {
		return this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

// @section
// There are several static functions which can be called without instantiating L.GeoJSON:
L.extend(L.GeoJSON, {
	// @function geometryToLayer(featureData: Object, options?: GeoJSON options): Layer
	// Creates a `Layer` from a given GeoJSON feature. Can use a custom
	// [`pointToLayer`](#geojson-pointtolayer) and/or [`coordsToLatLng`](#geojson-coordstolatlng)
	// functions if provided as options.
	geometryToLayer: function (geojson, options) {

		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry ? geometry.coordinates : null,
		    layers = [],
		    pointToLayer = options && options.pointToLayer,
		    coordsToLatLng = options && options.coordsToLatLng || this.coordsToLatLng,
		    latlng, latlngs, i, len;

		if (!coords && !geometry) {
			return null;
		}

		switch (geometry.type) {
		case 'Point':
			latlng = coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = coordsToLatLng(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, geometry.type === 'LineString' ? 0 : 1, coordsToLatLng);
			return new L.Polyline(latlngs, options);

		case 'Polygon':
		case 'MultiPolygon':
			latlngs = this.coordsToLatLngs(coords, geometry.type === 'Polygon' ? 1 : 2, coordsToLatLng);
			return new L.Polygon(latlngs, options);

		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {
				var layer = this.geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, options);

				if (layer) {
					layers.push(layer);
				}
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	// @function coordsToLatLng(coords: Array): LatLng
	// Creates a `LatLng` object from an array of 2 numbers (longitude, latitude)
	// or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.
	coordsToLatLng: function (coords) {
		return new L.LatLng(coords[1], coords[0], coords[2]);
	},

	// @function coordsToLatLngs(coords: Array, levelsDeep?: Number, coordsToLatLng?: Function): Array
	// Creates a multidimensional array of `LatLng`s from a GeoJSON coordinates array.
	// `levelsDeep` specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default).
	// Can use a custom [`coordsToLatLng`](#geojson-coordstolatlng) function.
	coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) {
		var latlngs = [];

		for (var i = 0, len = coords.length, latlng; i < len; i++) {
			latlng = levelsDeep ?
			        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
			        (coordsToLatLng || this.coordsToLatLng)(coords[i]);

			latlngs.push(latlng);
		}

		return latlngs;
	},

	// @function latLngToCoords(latlng: LatLng): Array
	// Reverse of [`coordsToLatLng`](#geojson-coordstolatlng)
	latLngToCoords: function (latlng) {
		return latlng.alt !== undefined ?
				[latlng.lng, latlng.lat, latlng.alt] :
				[latlng.lng, latlng.lat];
	},

	// @function latLngsToCoords(latlngs: Array, levelsDeep?: Number, closed?: Boolean): Array
	// Reverse of [`coordsToLatLngs`](#geojson-coordstolatlngs)
	// `closed` determines whether the first point should be appended to the end of the array to close the feature, only used when `levelsDeep` is 0. False by default.
	latLngsToCoords: function (latlngs, levelsDeep, closed) {
		var coords = [];

		for (var i = 0, len = latlngs.length; i < len; i++) {
			coords.push(levelsDeep ?
				L.GeoJSON.latLngsToCoords(latlngs[i], levelsDeep - 1, closed) :
				L.GeoJSON.latLngToCoords(latlngs[i]));
		}

		if (!levelsDeep && closed) {
			coords.push(coords[0]);
		}

		return coords;
	},

	getFeature: function (layer, newGeometry) {
		return layer.feature ?
				L.extend({}, layer.feature, {geometry: newGeometry}) :
				L.GeoJSON.asFeature(newGeometry);
	},

	// @function asFeature(geojson: Object): Object
	// Normalize GeoJSON geometries/features into GeoJSON features.
	asFeature: function (geojson) {
		if (geojson.type === 'Feature' || geojson.type === 'FeatureCollection') {
			return geojson;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: geojson
		};
	}
});

var PointToGeoJSON = {
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	}
};

// @namespace Marker
// @method toGeoJSON(): Object
// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the marker (as a GeoJSON `Point` Feature).
L.Marker.include(PointToGeoJSON);

// @namespace CircleMarker
// @method toGeoJSON(): Object
// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the circle marker (as a GeoJSON `Point` Feature).
L.Circle.include(PointToGeoJSON);
L.CircleMarker.include(PointToGeoJSON);


// @namespace Polyline
// @method toGeoJSON(): Object
// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polyline (as a GeoJSON `LineString` or `MultiLineString` Feature).
L.Polyline.prototype.toGeoJSON = function () {
	var multi = !L.Polyline._flat(this._latlngs);

	var coords = L.GeoJSON.latLngsToCoords(this._latlngs, multi ? 1 : 0);

	return L.GeoJSON.getFeature(this, {
		type: (multi ? 'Multi' : '') + 'LineString',
		coordinates: coords
	});
};

// @namespace Polygon
// @method toGeoJSON(): Object
// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the polygon (as a GeoJSON `Polygon` or `MultiPolygon` Feature).
L.Polygon.prototype.toGeoJSON = function () {
	var holes = !L.Polyline._flat(this._latlngs),
	    multi = holes && !L.Polyline._flat(this._latlngs[0]);

	var coords = L.GeoJSON.latLngsToCoords(this._latlngs, multi ? 2 : holes ? 1 : 0, true);

	if (!holes) {
		coords = [coords];
	}

	return L.GeoJSON.getFeature(this, {
		type: (multi ? 'Multi' : '') + 'Polygon',
		coordinates: coords
	});
};


// @namespace LayerGroup
L.LayerGroup.include({
	toMultiPoint: function () {
		var coords = [];

		this.eachLayer(function (layer) {
			coords.push(layer.toGeoJSON().geometry.coordinates);
		});

		return L.GeoJSON.getFeature(this, {
			type: 'MultiPoint',
			coordinates: coords
		});
	},

	// @method toGeoJSON(): Object
	// Returns a [`GeoJSON`](http://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `GeometryCollection`).
	toGeoJSON: function () {

		var type = this.feature && this.feature.geometry && this.feature.geometry.type;

		if (type === 'MultiPoint') {
			return this.toMultiPoint();
		}

		var isGeometryCollection = type === 'GeometryCollection',
		    jsons = [];

		this.eachLayer(function (layer) {
			if (layer.toGeoJSON) {
				var json = layer.toGeoJSON();
				jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
			}
		});

		if (isGeometryCollection) {
			return L.GeoJSON.getFeature(this, {
				geometries: jsons,
				type: 'GeometryCollection'
			});
		}

		return {
			type: 'FeatureCollection',
			features: jsons
		};
	}
});

// @namespace GeoJSON
// @factory L.geoJSON(geojson?: Object, options?: GeoJSON options)
// Creates a GeoJSON layer. Optionally accepts an object in
// [GeoJSON format](http://geojson.org/geojson-spec.html) to display on the map
// (you can alternatively add it later with `addData` method) and an `options` object.
L.geoJSON = function (geojson, options) {
	return new L.GeoJSON(geojson, options);
};
// Backward compatibility.
L.geoJson = L.geoJSON;



/*
 * @class Draggable
 * @aka L.Draggable
 * @inherits Evented
 *
 * A class for making DOM elements draggable (including touch support).
 * Used internally for map and marker dragging. Only works for elements
 * that were positioned with [`L.DomUtil.setPosition`](#domutil-setposition).
 *
 * @example
 * ```js
 * var draggable = new L.Draggable(elementToDrag);
 * draggable.enable();
 * ```
 */

L.Draggable = L.Evented.extend({

	options: {
		// @option clickTolerance: Number = 3
		// The max number of pixels a user can shift the mouse pointer during a click
		// for it to be considered a valid click (as opposed to a mouse drag).
		clickTolerance: 3
	},

	statics: {
		START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
		END: {
			mousedown: 'mouseup',
			touchstart: 'touchend',
			pointerdown: 'touchend',
			MSPointerDown: 'touchend'
		},
		MOVE: {
			mousedown: 'mousemove',
			touchstart: 'touchmove',
			pointerdown: 'touchmove',
			MSPointerDown: 'touchmove'
		}
	},

	// @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline: Boolean)
	// Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
	initialize: function (element, dragStartTarget, preventOutline) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
		this._preventOutline = preventOutline;
	},

	// @method enable()
	// Enables the dragging ability
	enable: function () {
		if (this._enabled) { return; }

		L.DomEvent.on(this._dragStartTarget, L.Draggable.START.join(' '), this._onDown, this);

		this._enabled = true;
	},

	// @method disable()
	// Disables the dragging ability
	disable: function () {
		if (!this._enabled) { return; }

		// If we're currently dragging this draggable,
		// disabling it counts as first ending the drag.
		if (L.Draggable._dragging === this) {
			this.finishDrag();
		}

		L.DomEvent.off(this._dragStartTarget, L.Draggable.START.join(' '), this._onDown, this);

		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		// Ignore simulated events, since we handle both touch and
		// mouse explicitly; otherwise we risk getting duplicates of
		// touch events, see #4315.
		// Also ignore the event if disabled; this happens in IE11
		// under some circumstances, see #3666.
		if (e._simulated || !this._enabled) { return; }

		this._moved = false;

		if (L.DomUtil.hasClass(this._element, 'leaflet-zoom-anim')) { return; }

		if (L.Draggable._dragging || e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }
		L.Draggable._dragging = this;  // Prevent dragging multiple objects at once.

		if (this._preventOutline) {
			L.DomUtil.preventOutline(this._element);
		}

		L.DomUtil.disableImageDrag();
		L.DomUtil.disableTextSelection();

		if (this._moving) { return; }

		// @event down: Event
		// Fired when a drag is about to start.
		this.fire('down');

		var first = e.touches ? e.touches[0] : e;

		this._startPoint = new L.Point(first.clientX, first.clientY);

		L.DomEvent
			.on(document, L.Draggable.MOVE[e.type], this._onMove, this)
			.on(document, L.Draggable.END[e.type], this._onUp, this);
	},

	_onMove: function (e) {
		// Ignore simulated events, since we handle both touch and
		// mouse explicitly; otherwise we risk getting duplicates of
		// touch events, see #4315.
		// Also ignore the event if disabled; this happens in IE11
		// under some circumstances, see #3666.
		if (e._simulated || !this._enabled) { return; }

		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    newPoint = new L.Point(first.clientX, first.clientY),
		    offset = newPoint.subtract(this._startPoint);

		if (!offset.x && !offset.y) { return; }
		if (Math.abs(offset.x) + Math.abs(offset.y) < this.options.clickTolerance) { return; }

		L.DomEvent.preventDefault(e);

		if (!this._moved) {
			// @event dragstart: Event
			// Fired when a drag starts
			this.fire('dragstart');

			this._moved = true;
			this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

			L.DomUtil.addClass(document.body, 'leaflet-dragging');

			this._lastTarget = e.target || e.srcElement;
			// IE and Edge do not give the <use> element, so fetch it
			// if necessary
			if ((window.SVGElementInstance) && (this._lastTarget instanceof SVGElementInstance)) {
				this._lastTarget = this._lastTarget.correspondingUseElement;
			}
			L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		L.Util.cancelAnimFrame(this._animRequest);
		this._lastEvent = e;
		this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true);
	},

	_updatePosition: function () {
		var e = {originalEvent: this._lastEvent};

		// @event predrag: Event
		// Fired continuously during dragging *before* each corresponding
		// update of the element's position.
		this.fire('predrag', e);
		L.DomUtil.setPosition(this._element, this._newPos);

		// @event drag: Event
		// Fired continuously during dragging.
		this.fire('drag', e);
	},

	_onUp: function (e) {
		// Ignore simulated events, since we handle both touch and
		// mouse explicitly; otherwise we risk getting duplicates of
		// touch events, see #4315.
		// Also ignore the event if disabled; this happens in IE11
		// under some circumstances, see #3666.
		if (e._simulated || !this._enabled) { return; }
		this.finishDrag();
	},

	finishDrag: function () {
		L.DomUtil.removeClass(document.body, 'leaflet-dragging');

		if (this._lastTarget) {
			L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
			this._lastTarget = null;
		}

		for (var i in L.Draggable.MOVE) {
			L.DomEvent
				.off(document, L.Draggable.MOVE[i], this._onMove, this)
				.off(document, L.Draggable.END[i], this._onUp, this);
		}

		L.DomUtil.enableImageDrag();
		L.DomUtil.enableTextSelection();

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			L.Util.cancelAnimFrame(this._animRequest);

			// @event dragend: DragEndEvent
			// Fired when the drag ends.
			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}

		this._moving = false;
		L.Draggable._dragging = false;
	}

});



/*
	L.Handler is a base class for handler classes that are used internally to inject
	interaction features like dragging to classes like Map and Marker.
*/

// @class Handler
// @aka L.Handler
// Abstract class for map interaction handlers

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	// @method enable(): this
	// Enables the handler
	enable: function () {
		if (this._enabled) { return this; }

		this._enabled = true;
		this.addHooks();
		return this;
	},

	// @method disable(): this
	// Disables the handler
	disable: function () {
		if (!this._enabled) { return this; }

		this._enabled = false;
		this.removeHooks();
		return this;
	},

	// @method enabled(): Boolean
	// Returns `true` if the handler is enabled
	enabled: function () {
		return !!this._enabled;
	}

	// @section Extension methods
	// Classes inheriting from `Handler` must implement the two following methods:
	// @method addHooks()
	// Called when the handler is enabled, should add event hooks.
	// @method removeHooks()
	// Called when the handler is disabled, should remove the event hooks added previously.
});



/*
 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
 */

// @namespace Map
// @section Interaction Options
L.Map.mergeOptions({
	// @option dragging: Boolean = true
	// Whether the map be draggable with mouse/touch or not.
	dragging: true,

	// @section Panning Inertia Options
	// @option inertia: Boolean = *
	// If enabled, panning of the map will have an inertia effect where
	// the map builds momentum while dragging and continues moving in
	// the same direction for some time. Feels especially nice on touch
	// devices. Enabled by default unless running on old Android devices.
	inertia: !L.Browser.android23,

	// @option inertiaDeceleration: Number = 3000
	// The rate with which the inertial movement slows down, in pixels/second².
	inertiaDeceleration: 3400, // px/s^2

	// @option inertiaMaxSpeed: Number = Infinity
	// Max speed of the inertial movement, in pixels/second.
	inertiaMaxSpeed: Infinity, // px/s

	// @option easeLinearity: Number = 0.2
	easeLinearity: 0.2,

	// TODO refactor, move to CRS
	// @option worldCopyJump: Boolean = false
	// With this option enabled, the map tracks when you pan to another "copy"
	// of the world and seamlessly jumps to the original one so that all overlays
	// like markers and vector layers are still visible.
	worldCopyJump: false,

	// @option maxBoundsViscosity: Number = 0.0
	// If `maxBounds` is set, this option will control how solid the bounds
	// are when dragging the map around. The default value of `0.0` allows the
	// user to drag outside the bounds at normal speed, higher values will
	// slow down map dragging outside bounds, and `1.0` makes the bounds fully
	// solid, preventing the user from dragging outside the bounds.
	maxBoundsViscosity: 0.0
});

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new L.Draggable(map._mapPane, map._container);

			this._draggable.on({
				down: this._onDown,
				dragstart: this._onDragStart,
				drag: this._onDrag,
				dragend: this._onDragEnd
			}, this);

			this._draggable.on('predrag', this._onPreDragLimit, this);
			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDragWrap, this);
				map.on('zoomend', this._onZoomEnd, this);

				map.whenReady(this._onZoomEnd, this);
			}
		}
		L.DomUtil.addClass(this._map._container, 'leaflet-grab leaflet-touch-drag');
		this._draggable.enable();
		this._positions = [];
		this._times = [];
	},

	removeHooks: function () {
		L.DomUtil.removeClass(this._map._container, 'leaflet-grab');
		L.DomUtil.removeClass(this._map._container, 'leaflet-touch-drag');
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	moving: function () {
		return this._draggable && this._draggable._moving;
	},

	_onDown: function () {
		this._map._stop();
	},

	_onDragStart: function () {
		var map = this._map;

		if (this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
			var bounds = L.latLngBounds(this._map.options.maxBounds);

			this._offsetLimit = L.bounds(
				this._map.latLngToContainerPoint(bounds.getNorthWest()).multiplyBy(-1),
				this._map.latLngToContainerPoint(bounds.getSouthEast()).multiplyBy(-1)
					.add(this._map.getSize()));

			this._viscosity = Math.min(1.0, Math.max(0.0, this._map.options.maxBoundsViscosity));
		} else {
			this._offsetLimit = null;
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function (e) {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._absPos || this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 50) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move', e)
		    .fire('drag', e);
	},

	_onZoomEnd: function () {
		var pxCenter = this._map.getSize().divideBy(2),
		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
	},

	_viscousLimit: function (value, threshold) {
		return value - (value - threshold) * this._viscosity;
	},

	_onPreDragLimit: function () {
		if (!this._viscosity || !this._offsetLimit) { return; }

		var offset = this._draggable._newPos.subtract(this._draggable._startPos);

		var limit = this._offsetLimit;
		if (offset.x < limit.min.x) { offset.x = this._viscousLimit(offset.x, limit.min.x); }
		if (offset.y < limit.min.y) { offset.y = this._viscousLimit(offset.y, limit.min.y); }
		if (offset.x > limit.max.x) { offset.x = this._viscousLimit(offset.x, limit.max.x); }
		if (offset.y > limit.max.y) { offset.y = this._viscousLimit(offset.y, limit.max.y); }

		this._draggable._newPos = this._draggable._startPos.add(offset);
	},

	_onPreDragWrap: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._absPos = this._draggable._newPos.clone();
		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function (e) {
		var map = this._map,
		    options = map.options,

		    noInertia = !options.inertia || this._times.length < 2;

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo([0, 0]),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			if (!offset.x && !offset.y) {
				map.fire('moveend');

			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				L.Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true,
						animate: true
					});
				});
			}
		}
	}
});

// @section Handlers
// @property dragging: Handler
// Map dragging handler (by both mouse and touch).
L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);



/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

// @namespace Map
// @section Interaction Options

L.Map.mergeOptions({
	// @option doubleClickZoom: Boolean|String = true
	// Whether the map can be zoomed in by double clicking on it and
	// zoomed out by double clicking while holding shift. If passed
	// `'center'`, double-click zoom will zoom to the center of the
	//  view regardless of where the mouse was.
	doubleClickZoom: true
});

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick, this);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick, this);
	},

	_onDoubleClick: function (e) {
		var map = this._map,
		    oldZoom = map.getZoom(),
		    delta = map.options.zoomDelta,
		    zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPoint, zoom);
		}
	}
});

// @section Handlers
//
// Map properties include interaction handlers that allow you to control
// interaction behavior in runtime, enabling or disabling certain features such
// as dragging or touch zoom (see `Handler` methods). For example:
//
// ```js
// map.doubleClickZoom.disable();
// ```
//
// @property doubleClickZoom: Handler
// Double click zoom handler.
L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);



/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

// @namespace Map
// @section Interaction Options
L.Map.mergeOptions({
	// @section Mousewheel options
	// @option scrollWheelZoom: Boolean|String = true
	// Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
	// it will zoom to the center of the view regardless of where the mouse was.
	scrollWheelZoom: true,

	// @option wheelDebounceTime: Number = 40
	// Limits the rate at which a wheel can fire (in milliseconds). By default
	// user can't zoom via wheel more often than once per 40 ms.
	wheelDebounceTime: 40,

	// @option wheelPxPerZoomLevel: Number = 60
	// How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
	// mean a change of one full zoom level. Smaller values will make wheel-zooming
	// faster (and vice versa).
	wheelPxPerZoomLevel: 60
});

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);

		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll, this);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);

		var debounce = this._map.options.wheelDebounceTime;

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(debounce - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.bind(this._performZoom, this), left);

		L.DomEvent.stop(e);
	},

	_performZoom: function () {
		var map = this._map,
		    zoom = map.getZoom(),
		    snap = this._map.options.zoomSnap || 0;

		map._stop(); // stop panning and fly animations if any

		// map the delta with a sigmoid function to -4..4 range leaning on -1..1
		var d2 = this._delta / (this._map.options.wheelPxPerZoomLevel * 4),
		    d3 = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(d2)))) / Math.LN2,
		    d4 = snap ? Math.ceil(d3 / snap) * snap : d3,
		    delta = map._limitZoom(zoom + (this._delta > 0 ? d4 : -d4)) - zoom;

		this._delta = 0;
		this._startTime = null;

		if (!delta) { return; }

		if (map.options.scrollWheelZoom === 'center') {
			map.setZoom(zoom + delta);
		} else {
			map.setZoomAround(this._lastMousePos, zoom + delta);
		}
	}
});

// @section Handlers
// @property scrollWheelZoom: Handler
// Scroll wheel zoom handler.
L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);



/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

L.extend(L.DomEvent, {

	_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
	_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last, touch,
		    doubleTap = false,
		    delay = 250;

		function onTouchStart(e) {
			var count;

			if (L.Browser.pointer) {
				if ((!L.Browser.edge) || e.pointerType === 'mouse') { return; }
				count = L.DomEvent._pointersCount;
			} else {
				count = e.touches.length;
			}

			if (count > 1) { return; }

			var now = Date.now(),
			    delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd(e) {
			if (doubleTap && !touch.cancelBubble) {
				if (L.Browser.pointer) {
					if ((!L.Browser.edge) || e.pointerType === 'mouse') { return; }

					// work around .type being readonly with MSPointer* events
					var newTouch = {},
					    prop, i;

					for (i in touch) {
						prop = touch[i];
						newTouch[i] = prop && prop.bind ? prop.bind(touch) : prop;
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}

		var pre = '_leaflet_',
		    touchstart = this._touchstart,
		    touchend = this._touchend;

		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;
		obj[pre + 'dblclick' + id] = handler;

		obj.addEventListener(touchstart, onTouchStart, false);
		obj.addEventListener(touchend, onTouchEnd, false);

		// On some platforms (notably, chrome<55 on win10 + touchscreen + mouse),
		// the browser doesn't fire touchend/pointerup events but does fire
		// native dblclicks. See #4127.
		// Edge 14 also fires native dblclicks, but only for pointerType mouse, see #5180.
		obj.addEventListener('dblclick', handler, false);

		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_',
		    touchstart = obj[pre + this._touchstart + id],
		    touchend = obj[pre + this._touchend + id],
		    dblclick = obj[pre + 'dblclick' + id];

		obj.removeEventListener(this._touchstart, touchstart, false);
		obj.removeEventListener(this._touchend, touchend, false);
		if (!L.Browser.edge) {
			obj.removeEventListener('dblclick', dblclick, false);
		}

		return this;
	}
});



/*
 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */

L.extend(L.DomEvent, {

	POINTER_DOWN:   L.Browser.msPointer ? 'MSPointerDown'   : 'pointerdown',
	POINTER_MOVE:   L.Browser.msPointer ? 'MSPointerMove'   : 'pointermove',
	POINTER_UP:     L.Browser.msPointer ? 'MSPointerUp'     : 'pointerup',
	POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',
	TAG_WHITE_LIST: ['INPUT', 'SELECT', 'OPTION'],

	_pointers: {},
	_pointersCount: 0,

	// Provides a touch events wrapper for (ms)pointer events.
	// ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	addPointerListener: function (obj, type, handler, id) {

		if (type === 'touchstart') {
			this._addPointerStart(obj, handler, id);

		} else if (type === 'touchmove') {
			this._addPointerMove(obj, handler, id);

		} else if (type === 'touchend') {
			this._addPointerEnd(obj, handler, id);
		}

		return this;
	},

	removePointerListener: function (obj, type, id) {
		var handler = obj['_leaflet_' + type + id];

		if (type === 'touchstart') {
			obj.removeEventListener(this.POINTER_DOWN, handler, false);

		} else if (type === 'touchmove') {
			obj.removeEventListener(this.POINTER_MOVE, handler, false);

		} else if (type === 'touchend') {
			obj.removeEventListener(this.POINTER_UP, handler, false);
			obj.removeEventListener(this.POINTER_CANCEL, handler, false);
		}

		return this;
	},

	_addPointerStart: function (obj, handler, id) {
		var onDown = L.bind(function (e) {
			if (e.pointerType !== 'mouse' && e.MSPOINTER_TYPE_MOUSE && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
				// In IE11, some touch events needs to fire for form controls, or
				// the controls will stop working. We keep a whitelist of tag names that
				// need these events. For other target tags, we prevent default on the event.
				if (this.TAG_WHITE_LIST.indexOf(e.target.tagName) < 0) {
					L.DomEvent.preventDefault(e);
				} else {
					return;
				}
			}

			this._handlePointer(e, handler);
		}, this);

		obj['_leaflet_touchstart' + id] = onDown;
		obj.addEventListener(this.POINTER_DOWN, onDown, false);

		// need to keep track of what pointers and how many are active to provide e.touches emulation
		if (!this._pointerDocListener) {
			var pointerUp = L.bind(this._globalPointerUp, this);

			// we listen documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(this.POINTER_DOWN, L.bind(this._globalPointerDown, this), true);
			document.documentElement.addEventListener(this.POINTER_MOVE, L.bind(this._globalPointerMove, this), true);
			document.documentElement.addEventListener(this.POINTER_UP, pointerUp, true);
			document.documentElement.addEventListener(this.POINTER_CANCEL, pointerUp, true);

			this._pointerDocListener = true;
		}
	},

	_globalPointerDown: function (e) {
		this._pointers[e.pointerId] = e;
		this._pointersCount++;
	},

	_globalPointerMove: function (e) {
		if (this._pointers[e.pointerId]) {
			this._pointers[e.pointerId] = e;
		}
	},

	_globalPointerUp: function (e) {
		delete this._pointers[e.pointerId];
		this._pointersCount--;
	},

	_handlePointer: function (e, handler) {
		e.touches = [];
		for (var i in this._pointers) {
			e.touches.push(this._pointers[i]);
		}
		e.changedTouches = [e];

		handler(e);
	},

	_addPointerMove: function (obj, handler, id) {
		var onMove = L.bind(function (e) {
			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

			this._handlePointer(e, handler);
		}, this);

		obj['_leaflet_touchmove' + id] = onMove;
		obj.addEventListener(this.POINTER_MOVE, onMove, false);
	},

	_addPointerEnd: function (obj, handler, id) {
		var onUp = L.bind(function (e) {
			this._handlePointer(e, handler);
		}, this);

		obj['_leaflet_touchend' + id] = onUp;
		obj.addEventListener(this.POINTER_UP, onUp, false);
		obj.addEventListener(this.POINTER_CANCEL, onUp, false);
	}
});



/*
 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
 */

// @namespace Map
// @section Interaction Options
L.Map.mergeOptions({
	// @section Touch interaction options
	// @option touchZoom: Boolean|String = *
	// Whether the map can be zoomed by touch-dragging with two fingers. If
	// passed `'center'`, it will zoom to the center of the view regardless of
	// where the touch events (fingers) were. Enabled for touch-capable web
	// browsers except for old Androids.
	touchZoom: L.Browser.touch && !L.Browser.android23,

	// @option bounceAtZoomLimits: Boolean = true
	// Set it to false if you don't want the map to zoom beyond min/max zoom
	// and then bounce back when pinch-zooming.
	bounceAtZoomLimits: true
});

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomUtil.addClass(this._map._container, 'leaflet-touch-zoom');
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomUtil.removeClass(this._map._container, 'leaflet-touch-zoom');
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;
		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToContainerPoint(e.touches[0]),
		    p2 = map.mouseEventToContainerPoint(e.touches[1]);

		this._centerPoint = map.getSize()._divideBy(2);
		this._startLatLng = map.containerPointToLatLng(this._centerPoint);
		if (map.options.touchZoom !== 'center') {
			this._pinchStartLatLng = map.containerPointToLatLng(p1.add(p2)._divideBy(2));
		}

		this._startDist = p1.distanceTo(p2);
		this._startZoom = map.getZoom();

		this._moved = false;
		this._zooming = true;

		map._stop();

		L.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

		var map = this._map,
		    p1 = map.mouseEventToContainerPoint(e.touches[0]),
		    p2 = map.mouseEventToContainerPoint(e.touches[1]),
		    scale = p1.distanceTo(p2) / this._startDist;


		this._zoom = map.getScaleZoom(scale, this._startZoom);

		if (!map.options.bounceAtZoomLimits && (
			(this._zoom < map.getMinZoom() && scale < 1) ||
			(this._zoom > map.getMaxZoom() && scale > 1))) {
			this._zoom = map._limitZoom(this._zoom);
		}

		if (map.options.touchZoom === 'center') {
			this._center = this._startLatLng;
			if (scale === 1) { return; }
		} else {
			// Get delta from pinch to center, so centerLatLng is delta applied to initial pinchLatLng
			var delta = p1._add(p2)._divideBy(2)._subtract(this._centerPoint);
			if (scale === 1 && delta.x === 0 && delta.y === 0) { return; }
			this._center = map.unproject(map.project(this._pinchStartLatLng, this._zoom).subtract(delta), this._zoom);
		}

		if (!this._moved) {
			map._moveStart(true);
			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);

		var moveFn = L.bind(map._move, map, this._center, this._zoom, {pinch: true, round: false});
		this._animRequest = L.Util.requestAnimFrame(moveFn, this, true);

		L.DomEvent.preventDefault(e);
	},

	_onTouchEnd: function () {
		if (!this._moved || !this._zooming) {
			this._zooming = false;
			return;
		}

		this._zooming = false;
		L.Util.cancelAnimFrame(this._animRequest);

		L.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		// Pinch updates GridLayers' levels only when zoomSnap is off, so zoomSnap becomes noUpdate.
		if (this._map.options.zoomAnimation) {
			this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), true, this._map.options.zoomSnap);
		} else {
			this._map._resetView(this._center, this._map._limitZoom(this._zoom));
		}
	}
});

// @section Handlers
// @property touchZoom: Handler
// Touch zoom handler.
L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);



/*
 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
 */

// @namespace Map
// @section Interaction Options
L.Map.mergeOptions({
	// @section Touch interaction options
	// @option tap: Boolean = true
	// Enables mobile hacks for supporting instant taps (fixing 200ms click
	// delay on iOS/Android) and touch holds (fired as `contextmenu` events).
	tap: true,

	// @option tapTolerance: Number = 15
	// The max number of pixels a user can shift his finger during touch
	// for it to be considered a valid tap.
	tapTolerance: 15
});

L.Map.Tap = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
	},

	_onDown: function (e) {
		if (!e.touches) { return; }

		L.DomEvent.preventDefault(e);

		this._fireClick = true;

		// don't simulate click or track longpress if more than 1 touch
		if (e.touches.length > 1) {
			this._fireClick = false;
			clearTimeout(this._holdTimeout);
			return;
		}

		var first = e.touches[0],
		    el = first.target;

		this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);

		// if touching a link, highlight it
		if (el.tagName && el.tagName.toLowerCase() === 'a') {
			L.DomUtil.addClass(el, 'leaflet-active');
		}

		// simulate long hold but setting a timeout
		this._holdTimeout = setTimeout(L.bind(function () {
			if (this._isTapValid()) {
				this._fireClick = false;
				this._onUp();
				this._simulateEvent('contextmenu', first);
			}
		}, this), 1000);

		this._simulateEvent('mousedown', first);

		L.DomEvent.on(document, {
			touchmove: this._onMove,
			touchend: this._onUp
		}, this);
	},

	_onUp: function (e) {
		clearTimeout(this._holdTimeout);

		L.DomEvent.off(document, {
			touchmove: this._onMove,
			touchend: this._onUp
		}, this);

		if (this._fireClick && e && e.changedTouches) {

			var first = e.changedTouches[0],
			    el = first.target;

			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.removeClass(el, 'leaflet-active');
			}

			this._simulateEvent('mouseup', first);

			// simulate click if the touch didn't move too much
			if (this._isTapValid()) {
				this._simulateEvent('click', first);
			}
		}
	},

	_isTapValid: function () {
		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	},

	_onMove: function (e) {
		var first = e.touches[0];
		this._newPos = new L.Point(first.clientX, first.clientY);
		this._simulateEvent('mousemove', first);
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent._simulated = true;
		e.target._simulatedClick = true;

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});

// @section Handlers
// @property tap: Handler
// Mobile touch hacks (quick tap and touch hold) handler.
if (L.Browser.touch && !L.Browser.pointer) {
	L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
}



/*
 * L.Handler.BoxZoom is used to add shift-drag zoom interaction to the map
 * (zoom to a selected bounding box), enabled by default.
 */

// @namespace Map
// @section Interaction Options
L.Map.mergeOptions({
	// @option boxZoom: Boolean = true
	// Whether the map can be zoomed to a rectangular area specified by
	// dragging the mouse while pressing the shift key.
	boxZoom: true
});

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'mousedown', this._onMouseDown, this);
	},

	moved: function () {
		return this._moved;
	},

	_resetState: function () {
		this._moved = false;
	},

	_onMouseDown: function (e) {
		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		this._resetState();

		L.DomUtil.disableTextSelection();
		L.DomUtil.disableImageDrag();

		this._startPoint = this._map.mouseEventToContainerPoint(e);

		L.DomEvent.on(document, {
			contextmenu: L.DomEvent.stop,
			mousemove: this._onMouseMove,
			mouseup: this._onMouseUp,
			keydown: this._onKeyDown
		}, this);
	},

	_onMouseMove: function (e) {
		if (!this._moved) {
			this._moved = true;

			this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._container);
			L.DomUtil.addClass(this._container, 'leaflet-crosshair');

			this._map.fire('boxzoomstart');
		}

		this._point = this._map.mouseEventToContainerPoint(e);

		var bounds = new L.Bounds(this._point, this._startPoint),
		    size = bounds.getSize();

		L.DomUtil.setPosition(this._box, bounds.min);

		this._box.style.width  = size.x + 'px';
		this._box.style.height = size.y + 'px';
	},

	_finish: function () {
		if (this._moved) {
			L.DomUtil.remove(this._box);
			L.DomUtil.removeClass(this._container, 'leaflet-crosshair');
		}

		L.DomUtil.enableTextSelection();
		L.DomUtil.enableImageDrag();

		L.DomEvent.off(document, {
			contextmenu: L.DomEvent.stop,
			mousemove: this._onMouseMove,
			mouseup: this._onMouseUp,
			keydown: this._onKeyDown
		}, this);
	},

	_onMouseUp: function (e) {
		if ((e.which !== 1) && (e.button !== 1)) { return; }

		this._finish();

		if (!this._moved) { return; }
		// Postpone to next JS tick so internal click event handling
		// still see it as "moved".
		setTimeout(L.bind(this._resetState, this), 0);

		var bounds = new L.LatLngBounds(
		        this._map.containerPointToLatLng(this._startPoint),
		        this._map.containerPointToLatLng(this._point));

		this._map
			.fitBounds(bounds)
			.fire('boxzoomend', {boxZoomBounds: bounds});
	},

	_onKeyDown: function (e) {
		if (e.keyCode === 27) {
			this._finish();
		}
	}
});

// @section Handlers
// @property boxZoom: Handler
// Box (shift-drag with mouse) zoom handler.
L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);



/*
 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
 */

// @namespace Map
// @section Keyboard Navigation Options
L.Map.mergeOptions({
	// @option keyboard: Boolean = true
	// Makes the map focusable and allows users to navigate the map with keyboard
	// arrows and `+`/`-` keys.
	keyboard: true,

	// @option keyboardPanDelta: Number = 80
	// Amount of pixels to pan when pressing an arrow key.
	keyboardPanDelta: 80
});

L.Map.Keyboard = L.Handler.extend({

	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61, 171],
		zoomOut: [189, 109, 54, 173]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanDelta(map.options.keyboardPanDelta);
		this._setZoomDelta(map.options.zoomDelta);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex <= 0) {
			container.tabIndex = '0';
		}

		L.DomEvent.on(container, {
			focus: this._onFocus,
			blur: this._onBlur,
			mousedown: this._onMouseDown
		}, this);

		this._map.on({
			focus: this._addHooks,
			blur: this._removeHooks
		}, this);
	},

	removeHooks: function () {
		this._removeHooks();

		L.DomEvent.off(this._map._container, {
			focus: this._onFocus,
			blur: this._onBlur,
			mousedown: this._onMouseDown
		}, this);

		this._map.off({
			focus: this._addHooks,
			blur: this._removeHooks
		}, this);
	},

	_onMouseDown: function () {
		if (this._focused) { return; }

		var body = document.body,
		    docEl = document.documentElement,
		    top = body.scrollTop || docEl.scrollTop,
		    left = body.scrollLeft || docEl.scrollLeft;

		this._map._container.focus();

		window.scrollTo(left, top);
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanDelta: function (panDelta) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * panDelta, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [panDelta, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, panDelta];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * panDelta];
		}
	},

	_setZoomDelta: function (zoomDelta) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoomDelta;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoomDelta;
		}
	},

	_addHooks: function () {
		L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		if (e.altKey || e.ctrlKey || e.metaKey) { return; }

		var key = e.keyCode,
		    map = this._map,
		    offset;

		if (key in this._panKeys) {

			if (map._panAnim && map._panAnim._inProgress) { return; }

			offset = this._panKeys[key];
			if (e.shiftKey) {
				offset = L.point(offset).multiplyBy(3);
			}

			map.panBy(offset);

			if (map.options.maxBounds) {
				map.panInsideBounds(map.options.maxBounds);
			}

		} else if (key in this._zoomKeys) {
			map.setZoom(map.getZoom() + (e.shiftKey ? 3 : 1) * this._zoomKeys[key]);

		} else if (key === 27) {
			map.closePopup();

		} else {
			return;
		}

		L.DomEvent.stop(e);
	}
});

// @section Handlers
// @section Handlers
// @property keyboard: Handler
// Keyboard navigation handler.
L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);



/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */


/* @namespace Marker
 * @section Interaction handlers
 *
 * Interaction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see `Handler` methods). Example:
 *
 * ```js
 * marker.dragging.disable();
 * ```
 *
 * @property dragging: Handler
 * Marker dragging handler (by both mouse and touch).
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;

		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon, true);
		}

		this._draggable.on({
			dragstart: this._onDragStart,
			drag: this._onDrag,
			dragend: this._onDragEnd
		}, this).enable();

		L.DomUtil.addClass(icon, 'leaflet-marker-draggable');
	},

	removeHooks: function () {
		this._draggable.off({
			dragstart: this._onDragStart,
			drag: this._onDrag,
			dragend: this._onDragEnd
		}, this).disable();

		if (this._marker._icon) {
			L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
		}
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		// @section Dragging events
		// @event dragstart: Event
		// Fired when the user starts dragging the marker.

		// @event movestart: Event
		// Fired when the marker starts moving (because of dragging).

		this._oldLatLng = this._marker.getLatLng();
		this._marker
		    .closePopup()
		    .fire('movestart')
		    .fire('dragstart');
	},

	_onDrag: function (e) {
		var marker = this._marker,
		    shadow = marker._shadow,
		    iconPos = L.DomUtil.getPosition(marker._icon),
		    latlng = marker._map.layerPointToLatLng(iconPos);

		// update shadow position
		if (shadow) {
			L.DomUtil.setPosition(shadow, iconPos);
		}

		marker._latlng = latlng;
		e.latlng = latlng;
		e.oldLatLng = this._oldLatLng;

		// @event drag: Event
		// Fired repeatedly while the user drags the marker.
		marker
		    .fire('move', e)
		    .fire('drag', e);
	},

	_onDragEnd: function (e) {
		// @event dragend: DragEndEvent
		// Fired when the user stops dragging the marker.

		// @event moveend: Event
		// Fired when the marker stops moving (because of dragging).
		delete this._oldLatLng;
		this._marker
		    .fire('moveend')
		    .fire('dragend', e);
	}
});



/*
 * @class Control
 * @aka L.Control
 * @inherits Class
 *
 * L.Control is a base class for implementing map controls. Handles positioning.
 * All other controls extend from this class.
 */

L.Control = L.Class.extend({
	// @section
	// @aka Control options
	options: {
		// @option position: String = 'topright'
		// The position of the control (one of the map corners). Possible values are `'topleft'`,
		// `'topright'`, `'bottomleft'` or `'bottomright'`
		position: 'topright'
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	/* @section
	 * Classes extending L.Control will inherit the following methods:
	 *
	 * @method getPosition: string
	 * Returns the position of the control.
	 */
	getPosition: function () {
		return this.options.position;
	},

	// @method setPosition(position: string): this
	// Sets the position of the control.
	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	// @method getContainer: HTMLElement
	// Returns the HTMLElement that contains the control.
	getContainer: function () {
		return this._container;
	},

	// @method addTo(map: Map): this
	// Adds the control to the given map.
	addTo: function (map) {
		this.remove();
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	// @method remove: this
	// Removes the control from the map it is currently active on.
	remove: function () {
		if (!this._map) {
			return this;
		}

		L.DomUtil.remove(this._container);

		if (this.onRemove) {
			this.onRemove(this._map);
		}

		this._map = null;

		return this;
	},

	_refocusOnMap: function (e) {
		// if map exists and event is not a keyboard event
		if (this._map && e && e.screenX > 0 && e.screenY > 0) {
			this._map.getContainer().focus();
		}
	}
});

L.control = function (options) {
	return new L.Control(options);
};

/* @section Extension methods
 * @uninheritable
 *
 * Every control should extend from `L.Control` and (re-)implement the following methods.
 *
 * @method onAdd(map: Map): HTMLElement
 * Should return the container DOM element for the control and add listeners on relevant map events. Called on [`control.addTo(map)`](#control-addTo).
 *
 * @method onRemove(map: Map)
 * Optional method. Should contain all clean up code that removes the listeners previously added in [`onAdd`](#control-onadd). Called on [`control.remove()`](#control-remove).
 */

/* @namespace Map
 * @section Methods for Layers and Controls
 */
L.Map.include({
	// @method addControl(control: Control): this
	// Adds the given control to the map
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	// @method removeControl(control: Control): this
	// Removes the given control from the map
	removeControl: function (control) {
		control.remove();
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'leaflet-',
		    container = this._controlContainer =
		            L.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = L.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	},

	_clearControlPos: function () {
		L.DomUtil.remove(this._controlContainer);
	}
});



/*
 * @class Control.Zoom
 * @aka L.Control.Zoom
 * @inherits Control
 *
 * A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [`zoomControl` option](#map-zoomcontrol) to `false`. Extends `Control`.
 */

L.Control.Zoom = L.Control.extend({
	// @section
	// @aka Control.Zoom options
	options: {
		position: 'topleft',

		// @option zoomInText: String = '+'
		// The text set on the 'zoom in' button.
		zoomInText: '+',

		// @option zoomInTitle: String = 'Zoom in'
		// The title set on the 'zoom in' button.
		zoomInTitle: 'Zoom in',

		// @option zoomOutText: String = '-'
		// The text set on the 'zoom out' button.
		zoomOutText: '-',

		// @option zoomOutTitle: String = 'Zoom out'
		// The title set on the 'zoom out' button.
		zoomOutTitle: 'Zoom out'
	},

	onAdd: function (map) {
		var zoomName = 'leaflet-control-zoom',
		    container = L.DomUtil.create('div', zoomName + ' leaflet-bar'),
		    options = this.options;

		this._zoomInButton  = this._createButton(options.zoomInText, options.zoomInTitle,
		        zoomName + '-in',  container, this._zoomIn);
		this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
		        zoomName + '-out', container, this._zoomOut);

		this._updateDisabled();
		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

		return container;
	},

	onRemove: function (map) {
		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	},

	disable: function () {
		this._disabled = true;
		this._updateDisabled();
		return this;
	},

	enable: function () {
		this._disabled = false;
		this._updateDisabled();
		return this;
	},

	_zoomIn: function (e) {
		if (!this._disabled && this._map._zoom < this._map.getMaxZoom()) {
			this._map.zoomIn(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
		}
	},

	_zoomOut: function (e) {
		if (!this._disabled && this._map._zoom > this._map.getMinZoom()) {
			this._map.zoomOut(this._map.options.zoomDelta * (e.shiftKey ? 3 : 1));
		}
	},

	_createButton: function (html, title, className, container, fn) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		/*
		 * Will force screen readers like VoiceOver to read this as "Zoom in - button"
		 */
		link.setAttribute('role', 'button');
		link.setAttribute('aria-label', title);

		L.DomEvent
		    .on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
		    .on(link, 'click', L.DomEvent.stop)
		    .on(link, 'click', fn, this)
		    .on(link, 'click', this._refocusOnMap, this);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
		    className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (this._disabled || map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (this._disabled || map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});

// @namespace Map
// @section Control options
// @option zoomControl: Boolean = true
// Whether a [zoom control](#control-zoom) is added to the map by default.
L.Map.mergeOptions({
	zoomControl: true
});

L.Map.addInitHook(function () {
	if (this.options.zoomControl) {
		this.zoomControl = new L.Control.Zoom();
		this.addControl(this.zoomControl);
	}
});

// @namespace Control.Zoom
// @factory L.control.zoom(options: Control.Zoom options)
// Creates a zoom control
L.control.zoom = function (options) {
	return new L.Control.Zoom(options);
};



/*
 * @class Control.Attribution
 * @aka L.Control.Attribution
 * @inherits Control
 *
 * The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [`attributionControl` option](#map-attributioncontrol) to `false`, and it fetches attribution texts from layers with the [`getAttribution` method](#layer-getattribution) automatically. Extends Control.
 */

L.Control.Attribution = L.Control.extend({
	// @section
	// @aka Control.Attribution options
	options: {
		position: 'bottomright',

		// @option prefix: String = 'Leaflet'
		// The HTML text shown before the attributions. Pass `false` to disable.
		prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
	},

	initialize: function (options) {
		L.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		map.attributionControl = this;
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		if (L.DomEvent) {
			L.DomEvent.disableClickPropagation(this._container);
		}

		// TODO ugly, refactor
		for (var i in map._layers) {
			if (map._layers[i].getAttribution) {
				this.addAttribution(map._layers[i].getAttribution());
			}
		}

		this._update();

		return this._container;
	},

	// @method setPrefix(prefix: String): this
	// Sets the text before the attributions.
	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	// @method addAttribution(text: String): this
	// Adds an attribution text (e.g. `'Vector data &copy; Mapbox'`).
	addAttribution: function (text) {
		if (!text) { return this; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	// @method removeAttribution(text: String): this
	// Removes an attribution text.
	removeAttribution: function (text) {
		if (!text) { return this; }

		if (this._attributions[text]) {
			this._attributions[text]--;
			this._update();
		}

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' | ');
	}
});

// @namespace Map
// @section Control options
// @option attributionControl: Boolean = true
// Whether a [attribution control](#control-attribution) is added to the map by default.
L.Map.mergeOptions({
	attributionControl: true
});

L.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		new L.Control.Attribution().addTo(this);
	}
});

// @namespace Control.Attribution
// @factory L.control.attribution(options: Control.Attribution options)
// Creates an attribution control.
L.control.attribution = function (options) {
	return new L.Control.Attribution(options);
};



/*
 * @class Control.Scale
 * @aka L.Control.Scale
 * @inherits Control
 *
 * A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends `Control`.
 *
 * @example
 *
 * ```js
 * L.control.scale().addTo(map);
 * ```
 */

L.Control.Scale = L.Control.extend({
	// @section
	// @aka Control.Scale options
	options: {
		position: 'bottomleft',

		// @option maxWidth: Number = 100
		// Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
		maxWidth: 100,

		// @option metric: Boolean = True
		// Whether to show the metric scale line (m/km).
		metric: true,

		// @option imperial: Boolean = True
		// Whether to show the imperial scale line (mi/ft).
		imperial: true

		// @option updateWhenIdle: Boolean = false
		// If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
	},

	onAdd: function (map) {
		var className = 'leaflet-control-scale',
		    container = L.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className + '-line', container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		if (options.metric) {
			this._mScale = L.DomUtil.create('div', className, container);
		}
		if (options.imperial) {
			this._iScale = L.DomUtil.create('div', className, container);
		}
	},

	_update: function () {
		var map = this._map,
		    y = map.getSize().y / 2;

		var maxMeters = map.distance(
				map.containerPointToLatLng([0, y]),
				map.containerPointToLatLng([this.options.maxWidth, y]));

		this._updateScales(maxMeters);
	},

	_updateScales: function (maxMeters) {
		if (this.options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}
		if (this.options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var meters = this._getRoundNum(maxMeters),
		    label = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';

		this._updateScale(this._mScale, label, meters / maxMeters);
	},

	_updateImperial: function (maxMeters) {
		var maxFeet = maxMeters * 3.2808399,
		    maxMiles, miles, feet;

		if (maxFeet > 5280) {
			maxMiles = maxFeet / 5280;
			miles = this._getRoundNum(maxMiles);
			this._updateScale(this._iScale, miles + ' mi', miles / maxMiles);

		} else {
			feet = this._getRoundNum(maxFeet);
			this._updateScale(this._iScale, feet + ' ft', feet / maxFeet);
		}
	},

	_updateScale: function (scale, text, ratio) {
		scale.style.width = Math.round(this.options.maxWidth * ratio) + 'px';
		scale.innerHTML = text;
	},

	_getRoundNum: function (num) {
		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
		    d = num / pow10;

		d = d >= 10 ? 10 :
		    d >= 5 ? 5 :
		    d >= 3 ? 3 :
		    d >= 2 ? 2 : 1;

		return pow10 * d;
	}
});


// @factory L.control.scale(options?: Control.Scale options)
// Creates an scale control with the given options.
L.control.scale = function (options) {
	return new L.Control.Scale(options);
};



/*
 * @class Control.Layers
 * @aka L.Control.Layers
 * @inherits Control
 *
 * The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out the [detailed example](http://leafletjs.com/examples/layers-control.html)). Extends `Control`.
 *
 * @example
 *
 * ```js
 * var baseLayers = {
 * 	"Mapbox": mapbox,
 * 	"OpenStreetMap": osm
 * };
 *
 * var overlays = {
 * 	"Marker": marker,
 * 	"Roads": roadsLayer
 * };
 *
 * L.control.layers(baseLayers, overlays).addTo(map);
 * ```
 *
 * The `baseLayers` and `overlays` parameters are object literals with layer names as keys and `Layer` objects as values:
 *
 * ```js
 * {
 *     "<someName1>": layer1,
 *     "<someName2>": layer2
 * }
 * ```
 *
 * The layer names can contain HTML, which allows you to add additional styling to the items:
 *
 * ```js
 * {"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}
 * ```
 */


L.Control.Layers = L.Control.extend({
	// @section
	// @aka Control.Layers options
	options: {
		// @option collapsed: Boolean = true
		// If `true`, the control will be collapsed into an icon and expanded on mouse hover or touch.
		collapsed: true,
		position: 'topright',

		// @option autoZIndex: Boolean = true
		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
		autoZIndex: true,

		// @option hideSingleBase: Boolean = false
		// If `true`, the base layers in the control will be hidden when there is only one.
		hideSingleBase: false,

		// @option sortLayers: Boolean = false
		// Whether to sort the layers. When `false`, layers will keep the order
		// in which they were added to the control.
		sortLayers: false,

		// @option sortFunction: Function = *
		// A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
		// that will be used for sorting the layers, when `sortLayers` is `true`.
		// The function receives both the `L.Layer` instances and their names, as in
		// `sortFunction(layerA, layerB, nameA, nameB)`.
		// By default, it sorts layers alphabetically by their name.
		sortFunction: function (layerA, layerB, nameA, nameB) {
			return nameA < nameB ? -1 : (nameB < nameA ? 1 : 0);
		}
	},

	initialize: function (baseLayers, overlays, options) {
		L.setOptions(this, options);

		this._layers = [];
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (var i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (i in overlays) {
			this._addLayer(overlays[i], i, true);
		}
	},

	onAdd: function (map) {
		this._initLayout();
		this._update();

		this._map = map;
		map.on('zoomend', this._checkDisabledLayers, this);

		return this._container;
	},

	onRemove: function () {
		this._map.off('zoomend', this._checkDisabledLayers, this);

		for (var i = 0; i < this._layers.length; i++) {
			this._layers[i].layer.off('add remove', this._onLayerChange, this);
		}
	},

	// @method addBaseLayer(layer: Layer, name: String): this
	// Adds a base layer (radio button entry) with the given name to the control.
	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		return (this._map) ? this._update() : this;
	},

	// @method addOverlay(layer: Layer, name: String): this
	// Adds an overlay (checkbox entry) with the given name to the control.
	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		return (this._map) ? this._update() : this;
	},

	// @method removeLayer(layer: Layer): this
	// Remove the given layer from the control.
	removeLayer: function (layer) {
		layer.off('add remove', this._onLayerChange, this);

		var obj = this._getLayer(L.stamp(layer));
		if (obj) {
			this._layers.splice(this._layers.indexOf(obj), 1);
		}
		return (this._map) ? this._update() : this;
	},

	// @method expand(): this
	// Expand the control container if collapsed.
	expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
		this._form.style.height = null;
		var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
		if (acceptableHeight < this._form.clientHeight) {
			L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
			this._form.style.height = acceptableHeight + 'px';
		} else {
			L.DomUtil.removeClass(this._form, 'leaflet-control-layers-scrollbar');
		}
		this._checkDisabledLayers();
		return this;
	},

	// @method collapse(): this
	// Collapse the control container if expanded.
	collapse: function () {
		L.DomUtil.removeClass(this._container, 'leaflet-control-layers-expanded');
		return this;
	},

	_initLayout: function () {
		var className = 'leaflet-control-layers',
		    container = this._container = L.DomUtil.create('div', className),
		    collapsed = this.options.collapsed;

		// makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		L.DomEvent.disableClickPropagation(container);
		if (!L.Browser.touch) {
			L.DomEvent.disableScrollPropagation(container);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (collapsed) {
			this._map.on('click', this.collapse, this);

			if (!L.Browser.android) {
				L.DomEvent.on(container, {
					mouseenter: this.expand,
					mouseleave: this.collapse
				}, this);
			}
		}

		var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
		link.href = '#';
		link.title = 'Layers';

		if (L.Browser.touch) {
			L.DomEvent
			    .on(link, 'click', L.DomEvent.stop)
			    .on(link, 'click', this.expand, this);
		} else {
			L.DomEvent.on(link, 'focus', this.expand, this);
		}

		// work around for Firefox Android issue https://github.com/Leaflet/Leaflet/issues/2033
		L.DomEvent.on(form, 'click', function () {
			setTimeout(L.bind(this._onInputClick, this), 0);
		}, this);

		// TODO keyboard accessibility

		if (!collapsed) {
			this.expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_getLayer: function (id) {
		for (var i = 0; i < this._layers.length; i++) {

			if (this._layers[i] && L.stamp(this._layers[i].layer) === id) {
				return this._layers[i];
			}
		}
	},

	_addLayer: function (layer, name, overlay) {
		layer.on('add remove', this._onLayerChange, this);

		this._layers.push({
			layer: layer,
			name: name,
			overlay: overlay
		});

		if (this.options.sortLayers) {
			this._layers.sort(L.bind(function (a, b) {
				return this.options.sortFunction(a.layer, b.layer, a.name, b.name);
			}, this));
		}

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) { return this; }

		L.DomUtil.empty(this._baseLayersList);
		L.DomUtil.empty(this._overlaysList);

		var baseLayersPresent, overlaysPresent, i, obj, baseLayersCount = 0;

		for (i = 0; i < this._layers.length; i++) {
			obj = this._layers[i];
			this._addItem(obj);
			overlaysPresent = overlaysPresent || obj.overlay;
			baseLayersPresent = baseLayersPresent || !obj.overlay;
			baseLayersCount += !obj.overlay ? 1 : 0;
		}

		// Hide base layers section if there's only one layer.
		if (this.options.hideSingleBase) {
			baseLayersPresent = baseLayersPresent && baseLayersCount > 1;
			this._baseLayersList.style.display = baseLayersPresent ? '' : 'none';
		}

		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';

		return this;
	},

	_onLayerChange: function (e) {
		if (!this._handlingClick) {
			this._update();
		}

		var obj = this._getLayer(L.stamp(e.target));

		// @namespace Map
		// @section Layer events
		// @event baselayerchange: LayersControlEvent
		// Fired when the base layer is changed through the [layer control](#control-layers).
		// @event overlayadd: LayersControlEvent
		// Fired when an overlay is selected through the [layer control](#control-layers).
		// @event overlayremove: LayersControlEvent
		// Fired when an overlay is deselected through the [layer control](#control-layers).
		// @namespace Control.Layers
		var type = obj.overlay ?
			(e.type === 'add' ? 'overlayadd' : 'overlayremove') :
			(e.type === 'add' ? 'baselayerchange' : null);

		if (type) {
			this._map.fire(type, obj);
		}
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' +
				name + '"' + (checked ? ' checked="checked"' : '') + '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    checked = this._map.hasLayer(obj.layer),
		    input;

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}

		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		// Helps from preventing layer control flicker when checkboxes are disabled
		// https://github.com/Leaflet/Leaflet/issues/2771
		var holder = document.createElement('div');

		label.appendChild(holder);
		holder.appendChild(input);
		holder.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		this._checkDisabledLayers();
		return label;
	},

	_onInputClick: function () {
		var inputs = this._form.getElementsByTagName('input'),
		    input, layer, hasLayer;
		var addedLayers = [],
		    removedLayers = [];

		this._handlingClick = true;

		for (var i = inputs.length - 1; i >= 0; i--) {
			input = inputs[i];
			layer = this._getLayer(input.layerId).layer;
			hasLayer = this._map.hasLayer(layer);

			if (input.checked && !hasLayer) {
				addedLayers.push(layer);

			} else if (!input.checked && hasLayer) {
				removedLayers.push(layer);
			}
		}

		// Bugfix issue 2318: Should remove all old layers before readding new ones
		for (i = 0; i < removedLayers.length; i++) {
			this._map.removeLayer(removedLayers[i]);
		}
		for (i = 0; i < addedLayers.length; i++) {
			this._map.addLayer(addedLayers[i]);
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_checkDisabledLayers: function () {
		var inputs = this._form.getElementsByTagName('input'),
		    input,
		    layer,
		    zoom = this._map.getZoom();

		for (var i = inputs.length - 1; i >= 0; i--) {
			input = inputs[i];
			layer = this._getLayer(input.layerId).layer;
			input.disabled = (layer.options.minZoom !== undefined && zoom < layer.options.minZoom) ||
			                 (layer.options.maxZoom !== undefined && zoom > layer.options.maxZoom);

		}
	},

	_expand: function () {
		// Backward compatibility, remove me in 1.1.
		return this.expand();
	},

	_collapse: function () {
		// Backward compatibility, remove me in 1.1.
		return this.collapse();
	}

});


// @factory L.control.layers(baselayers?: Object, overlays?: Object, options?: Control.Layers options)
// Creates an attribution control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation.
L.control.layers = function (baseLayers, overlays, options) {
	return new L.Control.Layers(baseLayers, overlays, options);
};



}(window, document));
//# sourceMappingURL=leaflet-src.map

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var lineInt = __webpack_require__(30)

exports.features = function(obj1, obj2, callback) {
	var coords1 = obj1.geometry.coordinates
	var coords2 = obj2.geometry.coordinates
	lineInt.all(coords1, coords2, function(r) {
		if(r === false) { callback(false) }
		else {
			var points = []
			for(i=0;i<r.length;i++) {
				var f = {type:'Feature', properties: {}, geometry: {type:'Point', coordinates: r[i]}}
				points.push(f)
			}
			callback(points)
		}
	})
}
exports.coordinates = function(obj1, obj2, callback) {
	lineInt.all(obj1, obj2, function(r) { callback(r)})
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

exports.one = function(line1, line2, callback) {
	callback(intersection(line1,line2))
}

exports.oneSync = function(line1, line2, callback) {
	return intersection(line1,line2)
}

exports.all = function(lineCoordinates1, lineCoordinates2, callback) {
	var allLines1 = []
	for(i=0;i<lineCoordinates1.length;i++) {
		if(i !== 0) {
			var pt = lineCoordinates1[i]
			var prevPt = lineCoordinates1[i - 1]
			allLines1.push([prevPt, pt])
		}
	}
	var allLines2 = []
	for(i=0;i<lineCoordinates2.length;i++) {
		if(i !== 0) {
			var pt = lineCoordinates2[i]
			var prevPt = lineCoordinates2[i - 1]
			allLines2.push([prevPt, pt])
		}
	}
	var results = []
	for(i=0;i<allLines1.length;i++) {
		var line1 = allLines1[i]
		for(j=0;j<allLines2.length;j++) {
			var line2 = allLines2[j]
			results.push(intersection(line1,line2))
		}
	}
	var answer = []
	for(i=0;i<results.length;i++) {
		if(results[i].x !== undefined && results[i].y !== undefined) {
			answer.push([results[i].x, results[i].y])
		}
	}
	if(answer.length === 0) {
		callback(false)
	} else {
		callback(answer)
	}
}

function intersection(line1, line2) {
	var p0 = {x: line1[0][0], y: line1[0][1]}
	var p1 = {x: line1[1][0], y: line1[1][1]}
	var p2 = {x: line2[0][0], y: line2[0][1]}
	var p3 = {x: line2[1][0], y: line2[1][1]}
	return getCollisionPt(p0, p1, p2, p3)
}
/*
http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
*/

function getCollisionPt(p0, p1, p2, p3) {
    var s1, s2;
    s1 = {x: p1.x - p0.x, y: p1.y - p0.y};
    s2 = {x: p3.x - p2.x, y: p3.y - p2.y};

    var s10_x = p1.x - p0.x;
    var s10_y = p1.y - p0.y;
    var s32_x = p3.x - p2.x;
    var s32_y = p3.y - p2.y;

    var denom = s10_x * s32_y - s32_x * s10_y;

    if(denom == 0) {
        return false;
    }

    var denom_positive = denom > 0;

    var s02_x = p0.x - p2.x;
    var s02_y = p0.y - p2.y;

    var s_numer = s10_x * s02_y - s10_y * s02_x;

    if((s_numer < 0) == denom_positive) {
        return false;
    }

    var t_numer = s32_x * s02_y - s32_y * s02_x;

    if((t_numer < 0) == denom_positive) {
        return false;
    }

    if((s_numer > denom) == denom_positive || (t_numer > denom) == denom_positive) {
        return false;
    }

    var t = t_numer / denom;

    var p = {x: p0.x + (t * s10_x), y: p0.y + (t * s10_y)};
    return p;
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// JSTS. See https://github.com/bjornharrtell/jsts
// Licenses:
// https://github.com/bjornharrtell/jsts/blob/master/LICENSE_EDLv1.txt
// https://github.com/bjornharrtell/jsts/blob/master/LICENSE_EPLv1.txt
// https://github.com/bjornharrtell/jsts/blob/master/LICENSE_LICENSE_ES6_COLLECTIONS.txt
!function(t,e){ true?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.jsts=t.jsts||{})}(this,function(t){"use strict";function e(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}function n(){}function i(){}function r(){}function s(){}function o(){}function a(){}function u(){}function l(t){this.message=t}function h(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t}function c(){if(0===arguments.length)l.call(this);else if(1===arguments.length){var t=arguments[0];l.call(this,t)}}function f(){}function g(){if(this.x=null,this.y=null,this.z=null,0===arguments.length)g.call(this,0,0);else if(1===arguments.length){var t=arguments[0];g.call(this,t.x,t.y,t.z)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];g.call(this,e,n,g.NULL_ORDINATE)}else if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];this.x=i,this.y=r,this.z=s}}function d(){if(this.dimensionsToTest=2,0===arguments.length)d.call(this,2);else if(1===arguments.length){var t=arguments[0];if(2!==t&&3!==t)throw new i("only 2 or 3 dimensions may be specified");this.dimensionsToTest=t}}function p(){}function v(){}function m(t){this.message=t||""}function y(){}function x(t){this.message=t||""}function E(t){this.message=t||""}function I(){this.array_=[],arguments[0]instanceof v&&this.addAll(arguments[0])}function N(){if(I.apply(this),0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.ensureCapacity(t.length),this.add(t,!0)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.ensureCapacity(e.length),this.add(e,n)}}function C(){if(this.minx=null,this.maxx=null,this.miny=null,this.maxy=null,0===arguments.length)this.init();else if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];this.init(t.x,t.x,t.y,t.y)}else if(arguments[0]instanceof C){var e=arguments[0];this.init(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.init(n.x,i.x,n.y,i.y)}else if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3];this.init(r,s,o,a)}}function S(){}function w(){S.call(this,"Projective point not representable on the Cartesian plane.")}function L(){}function R(t,e){return t.interfaces_&&t.interfaces_().indexOf(e)>-1}function T(){}function P(t){this.str=t}function b(t){this.value=t}function O(){}function _(){if(this.hi=0,this.lo=0,0===arguments.length)this.init(0);else if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];this.init(t)}else if(arguments[0]instanceof _){var e=arguments[0];this.init(e)}else if("string"==typeof arguments[0]){var n=arguments[0];_.call(this,_.parse(n))}}else if(2===arguments.length){var i=arguments[0],r=arguments[1];this.init(i,r)}}function M(){}function D(){}function A(){}function F(){if(this.x=null,this.y=null,this.w=null,0===arguments.length)this.x=0,this.y=0,this.w=1;else if(1===arguments.length){var t=arguments[0];this.x=t.x,this.y=t.y,this.w=1}else if(2===arguments.length){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var e=arguments[0],n=arguments[1];this.x=e,this.y=n,this.w=1}else if(arguments[0]instanceof F&&arguments[1]instanceof F){var i=arguments[0],r=arguments[1];this.x=i.y*r.w-r.y*i.w,this.y=r.x*i.w-i.x*r.w,this.w=i.x*r.y-r.x*i.y}else if(arguments[0]instanceof g&&arguments[1]instanceof g){var s=arguments[0],o=arguments[1];this.x=s.y-o.y,this.y=o.x-s.x,this.w=s.x*o.y-o.x*s.y}}else if(3===arguments.length){var a=arguments[0],u=arguments[1],l=arguments[2];this.x=a,this.y=u,this.w=l}else if(4===arguments.length){var h=arguments[0],c=arguments[1],f=arguments[2],d=arguments[3],p=h.y-c.y,v=c.x-h.x,m=h.x*c.y-c.x*h.y,y=f.y-d.y,x=d.x-f.x,E=f.x*d.y-d.x*f.y;this.x=v*E-x*m,this.y=y*m-p*E,this.w=p*x-y*v}}function G(){}function q(){}function B(){this.envelope=null,this.factory=null,this.SRID=null,this.userData=null;var t=arguments[0];this.factory=t,this.SRID=t.getSRID()}function z(){}function V(){}function k(){}function Y(){}function U(){}function X(){}function H(){}function W(){}function j(){}function K(){}function Z(){}function Q(){}function J(){this.array_=[],arguments[0]instanceof v&&this.addAll(arguments[0])}function $(t){return null==t?$s:t.color}function tt(t){return null==t?null:t.parent}function et(t,e){null!==t&&(t.color=e)}function nt(t){return null==t?null:t.left}function it(t){return null==t?null:t.right}function rt(){this.root_=null,this.size_=0}function st(){}function ot(){}function at(){this.array_=[],arguments[0]instanceof v&&this.addAll(arguments[0])}function ut(){}function lt(){}function ht(){}function ct(){}function ft(){this.geometries=null;var t=arguments[0],e=arguments[1];if(B.call(this,e),null===t&&(t=[]),B.hasNullElements(t))throw new i("geometries must not contain null elements");this.geometries=t}function gt(){var t=arguments[0],e=arguments[1];ft.call(this,t,e)}function dt(){if(this.geom=null,this.geomFact=null,this.bnRule=null,this.endpointMap=null,1===arguments.length){var t=arguments[0];dt.call(this,t,V.MOD2_BOUNDARY_RULE)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.geom=e,this.geomFact=e.getFactory(),this.bnRule=n}}function pt(){this.count=null}function vt(){}function mt(){}function yt(){}function xt(){}function Et(){}function It(){}function Nt(){}function Ct(){}function St(){this.points=null;var t=arguments[0],e=arguments[1];B.call(this,e),this.init(t)}function wt(){}function Lt(){this.coordinates=null;var t=arguments[0],e=arguments[1];B.call(this,e),this.init(t)}function Rt(){}function Tt(){this.shell=null,this.holes=null;var t=arguments[0],e=arguments[1],n=arguments[2];if(B.call(this,n),null===t&&(t=this.getFactory().createLinearRing()),null===e&&(e=[]),B.hasNullElements(e))throw new i("holes must not contain null elements");if(t.isEmpty()&&B.hasNonEmptyElements(e))throw new i("shell is empty but holes are not");this.shell=t,this.holes=e}function Pt(){var t=arguments[0],e=arguments[1];ft.call(this,t,e)}function bt(){if(arguments[0]instanceof g&&arguments[1]instanceof ie){var t=arguments[0],e=arguments[1];bt.call(this,e.getCoordinateSequenceFactory().create(t),e)}else if(R(arguments[0],D)&&arguments[1]instanceof ie){var n=arguments[0],i=arguments[1];St.call(this,n,i),this.validateConstruction()}}function Ot(){var t=arguments[0],e=arguments[1];ft.call(this,t,e)}function _t(){if(this.factory=null,this.isUserDataCopied=!1,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.factory=t}}function Mt(){}function Dt(){}function At(){}function Ft(){}function Gt(){if(this.dimension=3,this.coordinates=null,1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];Gt.call(this,t,3)}else if(Number.isInteger(arguments[0])){var e=arguments[0];this.coordinates=new Array(e).fill(null);for(var n=0;e>n;n++)this.coordinates[n]=new g}else if(R(arguments[0],D)){var i=arguments[0];if(null===i)return this.coordinates=new Array(0).fill(null),null;this.dimension=i.getDimension(),this.coordinates=new Array(i.size()).fill(null);for(var n=0;n<this.coordinates.length;n++)this.coordinates[n]=i.getCoordinateCopy(n)}}else if(2===arguments.length)if(arguments[0]instanceof Array&&Number.isInteger(arguments[1])){var r=arguments[0],s=arguments[1];this.coordinates=r,this.dimension=s,null===r&&(this.coordinates=new Array(0).fill(null))}else if(Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var o=arguments[0],a=arguments[1];this.coordinates=new Array(o).fill(null),this.dimension=a;for(var n=0;o>n;n++)this.coordinates[n]=new g}}function qt(){}function Bt(t,e){return t===e||t!==t&&e!==e}function zt(t,e){function n(t){return this&&this.constructor===n?(this._keys=[],this._values=[],this._itp=[],this.objectOnly=e,void(t&&Vt.call(this,t))):new n(t)}return e||io(t,"size",{get:Jt}),t.constructor=n,n.prototype=t,n}function Vt(t){this.add?t.forEach(this.add,this):t.forEach(function(t){this.set(t[0],t[1])},this)}function kt(t){return this.has(t)&&(this._keys.splice(no,1),this._values.splice(no,1),this._itp.forEach(function(t){no<t[0]&&t[0]--})),no>-1}function Yt(t){return this.has(t)?this._values[no]:void 0}function Ut(t,e){if(this.objectOnly&&e!==Object(e))throw new TypeError("Invalid value used as weak collection key");if(e!==e||0===e)for(no=t.length;no--&&!Bt(t[no],e););else no=t.indexOf(e);return no>-1}function Xt(t){return Ut.call(this,this._keys,t)}function Ht(t,e){return this.has(t)?this._values[no]=e:this._values[this._keys.push(t)-1]=e,this}function Wt(){(this._keys||0).length=this._values.length=0}function jt(){return Qt(this._itp,this._keys)}function Kt(){return Qt(this._itp,this._values)}function Zt(){return Qt(this._itp,this._keys,this._values)}function Qt(t,e,n){var i=[0],r=!1;return t.push(i),{next:function(){var s,o=i[0];return!r&&o<e.length?(s=n?[e[o],n[o]]:e[o],i[0]++):(r=!0,t.splice(t.indexOf(i),1)),{done:r,value:s}}}}function Jt(){return this._values.length}function $t(t,e){for(var n=this.entries();;){var i=n.next();if(i.done)break;t.call(e,i.value[1],i.value[0],this)}}function te(){this.map_=new so}function ee(){if(this.modelType=null,this.scale=null,0===arguments.length)this.modelType=ee.FLOATING;else if(1===arguments.length)if(arguments[0]instanceof ne){var t=arguments[0];this.modelType=t,t===ee.FIXED&&this.setScale(1)}else if("number"==typeof arguments[0]){var e=arguments[0];this.modelType=ee.FIXED,this.setScale(e)}else if(arguments[0]instanceof ee){var n=arguments[0];this.modelType=n.modelType,this.scale=n.scale}}function ne(){this.name=null;var t=arguments[0];this.name=t,ne.nameToTypeMap.put(t,this)}function ie(){if(this.precisionModel=null,this.coordinateSequenceFactory=null,this.SRID=null,0===arguments.length)ie.call(this,new ee,0);else if(1===arguments.length){if(R(arguments[0],G)){var t=arguments[0];ie.call(this,new ee,0,t)}else if(arguments[0]instanceof ee){var e=arguments[0];ie.call(this,e,0,ie.getDefaultCoordinateSequenceFactory())}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];ie.call(this,n,i,ie.getDefaultCoordinateSequenceFactory())}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.precisionModel=r,this.coordinateSequenceFactory=o,this.SRID=s}}function re(t){this.geometryFactory=t||new ie}function se(t){this.parser=new re(t)}function oe(){this.result=null,this.inputLines=Array(2).fill().map(function(){return Array(2)}),this.intPt=new Array(2).fill(null),this.intLineIndex=null,this._isProper=null,this.pa=null,this.pb=null,this.precisionModel=null,this.intPt[0]=new g,this.intPt[1]=new g,this.pa=this.intPt[0],this.pb=this.intPt[1],this.result=0}function ae(){oe.apply(this)}function ue(){}function le(){this.p=null,this.crossingCount=0,this.isPointOnSegment=!1;var t=arguments[0];this.p=t}function he(){}function ce(){if(this.p0=null,this.p1=null,0===arguments.length)ce.call(this,new g,new g);else if(1===arguments.length){var t=arguments[0];ce.call(this,t.p0,t.p1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p0=e,this.p1=n}else if(4===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3];ce.call(this,new g(i,r),new g(s,o))}}function fe(){if(this.matrix=null,0===arguments.length)this.matrix=Array(3).fill().map(function(){return Array(3)}),this.setAll(lt.FALSE);else if(1===arguments.length)if("string"==typeof arguments[0]){var t=arguments[0];fe.call(this),this.set(t)}else if(arguments[0]instanceof fe){var e=arguments[0];fe.call(this),this.matrix[L.INTERIOR][L.INTERIOR]=e.matrix[L.INTERIOR][L.INTERIOR],this.matrix[L.INTERIOR][L.BOUNDARY]=e.matrix[L.INTERIOR][L.BOUNDARY],this.matrix[L.INTERIOR][L.EXTERIOR]=e.matrix[L.INTERIOR][L.EXTERIOR],this.matrix[L.BOUNDARY][L.INTERIOR]=e.matrix[L.BOUNDARY][L.INTERIOR],this.matrix[L.BOUNDARY][L.BOUNDARY]=e.matrix[L.BOUNDARY][L.BOUNDARY],this.matrix[L.BOUNDARY][L.EXTERIOR]=e.matrix[L.BOUNDARY][L.EXTERIOR],this.matrix[L.EXTERIOR][L.INTERIOR]=e.matrix[L.EXTERIOR][L.INTERIOR],this.matrix[L.EXTERIOR][L.BOUNDARY]=e.matrix[L.EXTERIOR][L.BOUNDARY],this.matrix[L.EXTERIOR][L.EXTERIOR]=e.matrix[L.EXTERIOR][L.EXTERIOR]}}function ge(){this.areaBasePt=null,this.triangleCent3=new g,this.areasum2=0,this.cg3=new g,this.lineCentSum=new g,this.totalLength=0,this.ptCount=0,this.ptCentSum=new g;var t=arguments[0];this.areaBasePt=null,this.add(t)}function de(t){this.message=t||""}function pe(){this.array_=[]}function ve(){this.treeSet=new at,this.list=new I}function me(){if(this.geomFactory=null,this.inputPts=null,1===arguments.length){var t=arguments[0];me.call(this,me.extractCoordinates(t),t.getFactory())}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.inputPts=ve.filterCoordinates(e),this.geomFactory=n}}function ye(){this.origin=null;var t=arguments[0];this.origin=t}function xe(){this.inputGeom=null,this.factory=null,this.pruneEmptyGeometry=!0,this.preserveGeometryCollectionType=!0,this.preserveCollections=!1,this.preserveType=!1}function Ee(){if(this.snapTolerance=0,this.srcPts=null,this.seg=new ce,this.allowSnappingToSourceVertices=!1,this._isClosed=!1,arguments[0]instanceof St&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1];Ee.call(this,t.getCoordinates(),e)}else if(arguments[0]instanceof Array&&"number"==typeof arguments[1]){var n=arguments[0],i=arguments[1];this.srcPts=n,this._isClosed=Ee.isClosed(n),this.snapTolerance=i}}function Ie(){this.srcGeom=null;var t=arguments[0];this.srcGeom=t}function Ne(){if(xe.apply(this),this.snapTolerance=null,this.snapPts=null,this.isSelfSnap=!1,2===arguments.length){var t=arguments[0],e=arguments[1];this.snapTolerance=t,this.snapPts=e}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.snapTolerance=n,this.snapPts=i,this.isSelfSnap=r}}function Ce(){this.isFirst=!0,this.commonMantissaBitsCount=53,this.commonBits=0,this.commonSignExp=null}function Se(){this.commonCoord=null,this.ccFilter=new we}function we(){this.commonBitsX=new Ce,this.commonBitsY=new Ce}function Le(){this.trans=null;var t=arguments[0];this.trans=t}function Re(){this.parent=null,this.atStart=null,this.max=null,this.index=null,this.subcollectionIterator=null;var t=arguments[0];this.parent=t,this.atStart=!0,this.index=0,this.max=t.getNumGeometries()}function Te(){if(this.boundaryRule=V.OGC_SFS_BOUNDARY_RULE,this.isIn=null,this.numBoundaries=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];if(null===t)throw new i("Rule must be non-null");this.boundaryRule=t}}function Pe(){}function be(){}function Oe(){this.pts=null,this.data=null;var t=arguments[0],e=arguments[1];this.pts=t,this.data=e}function _e(){}function Me(){this.bounds=null,this.item=null;var t=arguments[0],e=arguments[1];this.bounds=t,this.item=e}function De(){this._size=null,this.items=null,this._size=0,this.items=new I,this.items.add(null)}function Ae(){}function Fe(){}function Ge(){if(this.childBoundables=new I,this.bounds=null,this.level=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.level=t}}function qe(){this.boundable1=null,this.boundable2=null,this._distance=null,this.itemDistance=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.boundable1=t,this.boundable2=e,this.itemDistance=n,this._distance=this.distance()}function Be(){if(this.root=null,this.built=!1,this.itemBoundables=new I,this.nodeCapacity=null,0===arguments.length)Be.call(this,Be.DEFAULT_NODE_CAPACITY);else if(1===arguments.length){var t=arguments[0];f.isTrue(t>1,"Node capacity must be greater than 1"),this.nodeCapacity=t}}function ze(){}function Ve(){}function ke(){if(0===arguments.length)ke.call(this,ke.DEFAULT_NODE_CAPACITY);else if(1===arguments.length){var t=arguments[0];Be.call(this,t)}}function Ye(){var t=arguments[0];Ge.call(this,t)}function Ue(){}function Xe(){this.segString=null,this.coord=null,this.segmentIndex=null,this.segmentOctant=null,this._isInterior=null;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.segString=t,this.coord=new g(e),this.segmentIndex=n,this.segmentOctant=i,this._isInterior=!e.equals2D(t.getCoordinate(n))}function He(){this.nodeMap=new rt,this.edge=null;var t=arguments[0];this.edge=t}function We(){this.nodeList=null,this.edge=null,this.nodeIt=null,this.currNode=null,this.nextNode=null,this.currSegIndex=0;var t=arguments[0];this.nodeList=t,this.edge=t.getEdge(),this.nodeIt=t.iterator(),this.readNextNode()}function je(){}function Ke(){this.nodeList=new He(this),this.pts=null,this.data=null;var t=arguments[0],e=arguments[1];this.pts=t,this.data=e}function Ze(){this.tempEnv1=new C,this.tempEnv2=new C,this.overlapSeg1=new ce,this.overlapSeg2=new ce}function Qe(){this.pts=null,this.start=null,this.end=null,this.env=null,this.context=null,this.id=null;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.pts=t,this.start=e,this.end=n,this.context=i}function Je(){}function $e(){}function tn(){}function en(){if(this.segInt=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.setSegmentIntersector(t)}}function nn(){if(this.monoChains=new I,this.index=new ke,this.idCounter=0,this.nodedSegStrings=null,this.nOverlaps=0,0===arguments.length);else if(1===arguments.length){var t=arguments[0];en.call(this,t)}}function rn(){Ze.apply(this),this.si=null;var t=arguments[0];this.si=t}function sn(){if(this.pt=null,1===arguments.length){var t=arguments[0];l.call(this,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];l.call(this,sn.msgWithCoord(e,n)),this.pt=new g(n)}}function on(){}function an(){this.findAllIntersections=!1,this.isCheckEndSegmentsOnly=!1,this.li=null,this.interiorIntersection=null,this.intSegments=null,this.intersections=new I,this.intersectionCount=0,this.keepIntersections=!0;var t=arguments[0];this.li=t,this.interiorIntersection=null}function un(){this.li=new ae,this.segStrings=null,this.findAllIntersections=!1,this.segInt=null,this._isValid=!0;var t=arguments[0];this.segStrings=t}function ln(){this.nv=null;var t=arguments[0];this.nv=new un(ln.toSegmentStrings(t))}function hn(){this.mapOp=null;var t=arguments[0];this.mapOp=t}function cn(){}function fn(){if(this.location=null,1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];this.init(t.length)}else if(Number.isInteger(arguments[0])){var e=arguments[0];this.init(1),this.location[cn.ON]=e}else if(arguments[0]instanceof fn){var n=arguments[0];if(this.init(n.location.length),null!==n)for(var i=0;i<this.location.length;i++)this.location[i]=n.location[i]}}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.init(3),this.location[cn.ON]=r,this.location[cn.LEFT]=s,this.location[cn.RIGHT]=o}}function gn(){if(this.elt=new Array(2).fill(null),1===arguments.length){if(Number.isInteger(arguments[0])){var t=arguments[0];this.elt[0]=new fn(t),this.elt[1]=new fn(t)}else if(arguments[0]instanceof gn){var e=arguments[0];this.elt[0]=new fn(e.elt[0]),this.elt[1]=new fn(e.elt[1])}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.elt[0]=new fn(L.NONE),this.elt[1]=new fn(L.NONE),this.elt[n].setLocation(i)}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.elt[0]=new fn(r,s,o),this.elt[1]=new fn(r,s,o)}else if(4===arguments.length){var a=arguments[0],u=arguments[1],l=arguments[2],h=arguments[3];this.elt[0]=new fn(L.NONE,L.NONE,L.NONE),this.elt[1]=new fn(L.NONE,L.NONE,L.NONE),this.elt[a].setLocations(u,l,h)}}function dn(){this.startDe=null,this.maxNodeDegree=-1,this.edges=new I,this.pts=new I,this.label=new gn(L.NONE),this.ring=null,this._isHole=null,this.shell=null,this.holes=new I,this.geometryFactory=null;var t=arguments[0],e=arguments[1];this.geometryFactory=e,this.computePoints(t),this.computeRing()}function pn(){var t=arguments[0],e=arguments[1];dn.call(this,t,e)}function vn(){var t=arguments[0],e=arguments[1];dn.call(this,t,e)}function mn(){if(this.label=null,this._isInResult=!1,this._isCovered=!1,this._isCoveredSet=!1,this._isVisited=!1,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.label=t}}function yn(){mn.apply(this),this.coord=null,this.edges=null;var t=arguments[0],e=arguments[1];this.coord=t,this.edges=e,this.label=new gn(0,L.NONE)}function xn(){this.nodeMap=new rt,this.nodeFact=null;var t=arguments[0];this.nodeFact=t}function En(){if(this.edge=null,this.label=null,this.node=null,this.p0=null,this.p1=null,this.dx=null,this.dy=null,this.quadrant=null,1===arguments.length){var t=arguments[0];this.edge=t}else if(3===arguments.length){var e=arguments[0],n=arguments[1],i=arguments[2];En.call(this,e,n,i,null)}else if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3];En.call(this,r),this.init(s,o),this.label=a}}function In(){this._isForward=null,this._isInResult=!1,this._isVisited=!1,this.sym=null,this.next=null,this.nextMin=null,this.edgeRing=null,this.minEdgeRing=null,this.depth=[0,-999,-999];var t=arguments[0],e=arguments[1];if(En.call(this,t),this._isForward=e,e)this.init(t.getCoordinate(0),t.getCoordinate(1));else{var n=t.getNumPoints()-1;this.init(t.getCoordinate(n),t.getCoordinate(n-1))}this.computeDirectedLabel()}function Nn(){}function Cn(){if(this.edges=new I,this.nodes=null,this.edgeEndList=new I,0===arguments.length)this.nodes=new xn(new Nn);else if(1===arguments.length){var t=arguments[0];this.nodes=new xn(t)}}function Sn(){this.geometryFactory=null,this.shellList=new I;var t=arguments[0];this.geometryFactory=t}function wn(){this.op=null,this.geometryFactory=null,this.ptLocator=null,this.lineEdgesList=new I,this.resultLineList=new I;var t=arguments[0],e=arguments[1],n=arguments[2];this.op=t,this.geometryFactory=e,this.ptLocator=n}function Ln(){this.op=null,this.geometryFactory=null,this.resultPointList=new I;var t=arguments[0],e=arguments[1];arguments[2];this.op=t,this.geometryFactory=e}function Rn(){}function Tn(){this.geom=null;var t=arguments[0];this.geom=t}function Pn(){this.edgeMap=new rt,this.edgeList=null,this.ptInAreaLocation=[L.NONE,L.NONE]}function bn(){Pn.apply(this),this.resultAreaEdgeList=null,this.label=null,this.SCANNING_FOR_INCOMING=1,this.LINKING_TO_OUTGOING=2}function On(){Nn.apply(this)}function _n(){this.mce=null,this.chainIndex=null;var t=arguments[0],e=arguments[1];this.mce=t,this.chainIndex=e}function Mn(){if(this.label=null,this.xValue=null,this.eventType=null,this.insertEvent=null,this.deleteEventIndex=null,this.obj=null,2===arguments.length){var t=arguments[0],e=arguments[1];this.eventType=Mn.DELETE,this.xValue=t,this.insertEvent=e}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.eventType=Mn.INSERT,this.label=n,this.xValue=i,this.obj=r}}function Dn(){}function An(){this._hasIntersection=!1,this.hasProper=!1,this.hasProperInterior=!1,this.properIntersectionPoint=null,this.li=null,this.includeProper=null,this.recordIsolated=null,this.isSelfIntersection=null,this.numIntersections=0,this.numTests=0,this.bdyNodes=null,this._isDone=!1,this.isDoneWhenProperInt=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this.li=t,this.includeProper=e,this.recordIsolated=n}function Fn(){Dn.apply(this),this.events=new I,this.nOverlaps=null}function Gn(){this.min=r.POSITIVE_INFINITY,this.max=r.NEGATIVE_INFINITY}function qn(){}function Bn(){Gn.apply(this),this.item=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.min=t,this.max=e,this.item=n}function zn(){Gn.apply(this),this.node1=null,this.node2=null;var t=arguments[0],e=arguments[1];this.node1=t,this.node2=e,this.buildExtent(this.node1,this.node2)}function Vn(){this.leaves=new I,this.root=null,this.level=0}function kn(){if(this.lines=null,this.isForcedToLineString=!1,1===arguments.length){var t=arguments[0];this.lines=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.lines=e,this.isForcedToLineString=n}}function Yn(){this.items=new I}function Un(){this.index=null;var t=arguments[0];if(!R(t,Rt))throw new i("Argument must be Polygonal");this.index=new Hn(t)}function Xn(){this.counter=null;var t=arguments[0];this.counter=t}function Hn(){this.index=new Vn;var t=arguments[0];this.init(t)}function Wn(){this.coord=null,this.segmentIndex=null,this.dist=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.coord=new g(t),this.segmentIndex=e,this.dist=n}function jn(){this.nodeMap=new rt,this.edge=null;var t=arguments[0];this.edge=t}function Kn(){}function Zn(){this.e=null,this.pts=null,this.startIndex=null,this.env1=new C,this.env2=new C;var t=arguments[0];this.e=t,this.pts=t.getCoordinates();var e=new Kn;this.startIndex=e.getChainStartIndices(this.pts)}function Qn(){this.depth=Array(2).fill().map(function(){return Array(3)});for(var t=0;2>t;t++)for(var e=0;3>e;e++)this.depth[t][e]=Qn.NULL_VALUE}function Jn(){if(mn.apply(this),this.pts=null,this.env=null,this.eiList=new jn(this),this.name=null,this.mce=null,this._isIsolated=!0,this.depth=new Qn,this.depthDelta=0,1===arguments.length){var t=arguments[0];Jn.call(this,t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.pts=e,this.label=n}}function $n(){if(Cn.apply(this),this.parentGeom=null,this.lineEdgeMap=new te,this.boundaryNodeRule=null,this.useBoundaryDeterminationRule=!0,this.argIndex=null,this.boundaryNodes=null,this._hasTooFewPoints=!1,this.invalidPoint=null,this.areaPtLocator=null,this.ptLocator=new Te,2===arguments.length){var t=arguments[0],e=arguments[1];$n.call(this,t,e,V.OGC_SFS_BOUNDARY_RULE)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.argIndex=n,this.parentGeom=i,this.boundaryNodeRule=r,null!==i&&this.add(i)}}function ti(){if(this.li=new ae,this.resultPrecisionModel=null,this.arg=null,1===arguments.length){var t=arguments[0];this.setComputationPrecision(t.getPrecisionModel()),this.arg=new Array(1).fill(null),this.arg[0]=new $n(0,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];ti.call(this,e,n,V.OGC_SFS_BOUNDARY_RULE)}else if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];i.getPrecisionModel().compareTo(r.getPrecisionModel())>=0?this.setComputationPrecision(i.getPrecisionModel()):this.setComputationPrecision(r.getPrecisionModel()),this.arg=new Array(2).fill(null),this.arg[0]=new $n(0,i,s),this.arg[1]=new $n(1,r,s)}}function ei(){this.pts=null,this._orientation=null;var t=arguments[0];this.pts=t,this._orientation=ei.orientation(t)}function ni(){this.edges=new I,this.ocaMap=new rt}function ii(){this.ptLocator=new Te,this.geomFact=null,this.resultGeom=null,this.graph=null,this.edgeList=new ni,this.resultPolyList=new I,this.resultLineList=new I,this.resultPointList=new I;var t=arguments[0],e=arguments[1];ti.call(this,t,e),this.graph=new Cn(new On),this.geomFact=t.getFactory()}function ri(){this.geom=new Array(2).fill(null),this.snapTolerance=null,this.cbr=null;var t=arguments[0],e=arguments[1];this.geom[0]=t,this.geom[1]=e,this.computeSnapTolerance()}function si(){this.geom=new Array(2).fill(null);var t=arguments[0],e=arguments[1];this.geom[0]=t,this.geom[1]=e}function oi(){this.factory=null,this.interiorPoint=null,this.maxWidth=0;var t=arguments[0];this.factory=t.getFactory(),this.add(t)}function ai(){this.poly=null,this.centreY=null,this.hiY=r.MAX_VALUE,this.loY=-r.MAX_VALUE;var t=arguments[0];this.poly=t,this.hiY=t.getEnvelopeInternal().getMaxY(),this.loY=t.getEnvelopeInternal().getMinY(),this.centreY=oi.avg(this.loY,this.hiY)}function ui(){this.centroid=null,this.minDistance=r.MAX_VALUE,this.interiorPoint=null;var t=arguments[0];this.centroid=t.getCentroid().getCoordinate(),this.addInterior(t),null===this.interiorPoint&&this.addEndpoints(t)}function li(){this.centroid=null,this.minDistance=r.MAX_VALUE,this.interiorPoint=null;var t=arguments[0];this.centroid=t.getCentroid().getCoordinate(),this.add(t)}function hi(){}function ci(){this.p0=null,this.p1=null,this.p2=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.p0=t,this.p1=e,this.p2=n}function fi(){this.input=null,this.extremalPts=null,this.centre=null,this.radius=0;var t=arguments[0];this.input=t}function gi(){if(this.inputGeom=null,this.isConvex=null,this.convexHullPts=null,this.minBaseSeg=new ce,this.minWidthPt=null,this.minPtIndex=null,this.minWidth=0,1===arguments.length){var t=arguments[0];gi.call(this,t,!1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.inputGeom=e,this.isConvex=n}}function di(){this.inputGeom=null,this.distanceTolerance=null;var t=arguments[0];this.inputGeom=t}function pi(){xe.apply(this),this.distanceTolerance=null;var t=arguments[0];this.distanceTolerance=t}function vi(){this._orig=null,this._sym=null,this._next=null;var t=arguments[0];this._orig=t}function mi(){this._isMarked=!1;var t=arguments[0];vi.call(this,t)}function yi(){this.vertexMap=new te}function xi(){this._isStart=!1;var t=arguments[0];mi.call(this,t)}function Ei(){yi.apply(this)}function Ii(){this.result=null,this.factory=null,this.graph=null,this.lines=new I,this.nodeEdgeStack=new pe,this.ringStartEdge=null,this.graph=new Ei}function Ni(){this.items=new I,this.subnode=new Array(4).fill(null)}function Ci(){}function Si(t,e){var n,i,r,s,o={32:{d:127,c:128,b:0,a:0},64:{d:32752,c:0,b:0,a:0}},a={32:8,64:11}[t];if(s||(n=0>e||0>1/e,isFinite(e)||(s=o[t],n&&(s.d+=1<<t/4-1),i=Math.pow(2,a)-1,r=0)),!s){for(i={32:127,64:1023}[t],r=Math.abs(e);r>=2;)i++,r/=2;for(;1>r&&i>0;)i--,r*=2;0>=i&&(r/=2),32===t&&i>254&&(s={d:n?255:127,c:128,b:0,a:0},i=Math.pow(2,a)-1,r=0)}return i}function wi(){this.pt=new g,this.level=0,this.env=null;var t=arguments[0];this.computeKey(t)}function Li(){Ni.apply(this),this.env=null,this.centrex=null,this.centrey=null,this.level=null;var t=arguments[0],e=arguments[1];this.env=t,this.level=e,this.centrex=(t.getMinX()+t.getMaxX())/2,this.centrey=(t.getMinY()+t.getMaxY())/2}function Ri(){}function Ti(){Ni.apply(this)}function Pi(){this.root=null,this.minExtent=1,this.root=new Ti}function bi(t){this.geometryFactory=t||new ie}function Oi(t){this.geometryFactory=t||new ie,this.precisionModel=this.geometryFactory.getPrecisionModel(),this.parser=new bi(this.geometryFactory)}function _i(){this.parser=new bi(this.geometryFactory)}function Mi(t){this.geometryFactory=t||new ie,this.precisionModel=this.geometryFactory.getPrecisionModel(),this.parser=new re(this.geometryFactory)}function Di(t){return[t.x,t.y]}function Ai(t){this.geometryFactory=t||new ie}function Fi(){if(this.noder=null,this.scaleFactor=null,this.offsetX=null,this.offsetY=null,this.isScaled=!1,2===arguments.length){var t=arguments[0],e=arguments[1];Fi.call(this,t,e,0,0)}else if(4===arguments.length){var n=arguments[0],i=arguments[1];arguments[2],arguments[3];this.noder=n,this.scaleFactor=i,this.isScaled=!this.isIntegerPrecision()}}function Gi(){if(this.inputGeom=null,this.isClosedEndpointsInInterior=!0,this.nonSimpleLocation=null,1===arguments.length){var t=arguments[0];this.inputGeom=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.inputGeom=e,this.isClosedEndpointsInInterior=!n.isInBoundary(2)}}function qi(){this.pt=null,this.isClosed=null,this.degree=null;var t=arguments[0];this.pt=t,this.isClosed=!1,this.degree=0}function Bi(){if(this.quadrantSegments=Bi.DEFAULT_QUADRANT_SEGMENTS,this.endCapStyle=Bi.CAP_ROUND,this.joinStyle=Bi.JOIN_ROUND,this.mitreLimit=Bi.DEFAULT_MITRE_LIMIT,this._isSingleSided=!1,this.simplifyFactor=Bi.DEFAULT_SIMPLIFY_FACTOR,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.setQuadrantSegments(t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.setQuadrantSegments(e),this.setEndCapStyle(n)}else if(4===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3];this.setQuadrantSegments(i),this.setEndCapStyle(r),this.setJoinStyle(s),this.setMitreLimit(o)}}function zi(){this.minIndex=-1,this.minCoord=null,this.minDe=null,this.orientedDe=null}function Vi(){this.array_=[]}function ki(){this.finder=null,this.dirEdgeList=new I,this.nodes=new I,this.rightMostCoord=null,this.env=null,this.finder=new zi}function Yi(){this.inputLine=null,
this.distanceTol=null,this.isDeleted=null,this.angleOrientation=he.COUNTERCLOCKWISE;var t=arguments[0];this.inputLine=t}function Ui(){this.ptList=null,this.precisionModel=null,this.minimimVertexDistance=0,this.ptList=new I}function Xi(){this.maxCurveSegmentError=0,this.filletAngleQuantum=null,this.closingSegLengthFactor=1,this.segList=null,this.distance=0,this.precisionModel=null,this.bufParams=null,this.li=null,this.s0=null,this.s1=null,this.s2=null,this.seg0=new ce,this.seg1=new ce,this.offset0=new ce,this.offset1=new ce,this.side=0,this._hasNarrowConcaveAngle=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this.precisionModel=t,this.bufParams=e,this.li=new ae,this.filletAngleQuantum=Math.PI/2/e.getQuadrantSegments(),e.getQuadrantSegments()>=8&&e.getJoinStyle()===Bi.JOIN_ROUND&&(this.closingSegLengthFactor=Xi.MAX_CLOSING_SEG_LEN_FACTOR),this.init(n)}function Hi(){this.distance=0,this.precisionModel=null,this.bufParams=null;var t=arguments[0],e=arguments[1];this.precisionModel=t,this.bufParams=e}function Wi(){this.subgraphs=null,this.seg=new ce,this.cga=new he;var t=arguments[0];this.subgraphs=t}function ji(){this.upwardSeg=null,this.leftDepth=null;var t=arguments[0],e=arguments[1];this.upwardSeg=new ce(t),this.leftDepth=e}function Ki(){this.inputGeom=null,this.distance=null,this.curveBuilder=null,this.curveList=new I;var t=arguments[0],e=arguments[1],n=arguments[2];this.inputGeom=t,this.distance=e,this.curveBuilder=n}function Zi(){this._hasIntersection=!1,this.hasProper=!1,this.hasProperInterior=!1,this.hasInterior=!1,this.properIntersectionPoint=null,this.li=null,this.isSelfIntersection=null,this.numIntersections=0,this.numInteriorIntersections=0,this.numProperIntersections=0,this.numTests=0;var t=arguments[0];this.li=t}function Qi(){this.bufParams=null,this.workingPrecisionModel=null,this.workingNoder=null,this.geomFact=null,this.graph=null,this.edgeList=new ni;var t=arguments[0];this.bufParams=t}function Ji(){this.li=new ae,this.segStrings=null;var t=arguments[0];this.segStrings=t}function $i(){this.li=null,this.pt=null,this.originalPt=null,this.ptScaled=null,this.p0Scaled=null,this.p1Scaled=null,this.scaleFactor=null,this.minx=null,this.maxx=null,this.miny=null,this.maxy=null,this.corner=new Array(4).fill(null),this.safeEnv=null;var t=arguments[0],e=arguments[1],n=arguments[2];if(this.originalPt=t,this.pt=t,this.scaleFactor=e,this.li=n,0>=e)throw new i("Scale factor must be non-zero");1!==e&&(this.pt=new g(this.scale(t.x),this.scale(t.y)),this.p0Scaled=new g,this.p1Scaled=new g),this.initCorners(this.pt)}function tr(){this.tempEnv1=new C,this.selectedSegment=new ce}function er(){this.index=null;var t=arguments[0];this.index=t}function nr(){tr.apply(this),this.hotPixel=null,this.parentEdge=null,this.hotPixelVertexIndex=null,this._isNodeAdded=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this.hotPixel=t,this.parentEdge=e,this.hotPixelVertexIndex=n}function ir(){this.li=null,this.interiorIntersections=null;var t=arguments[0];this.li=t,this.interiorIntersections=new I}function rr(){this.pm=null,this.li=null,this.scaleFactor=null,this.noder=null,this.pointSnapper=null,this.nodedSegStrings=null;var t=arguments[0];this.pm=t,this.li=new ae,this.li.setPrecisionModel(t),this.scaleFactor=t.getScale()}function sr(){if(this.argGeom=null,this.distance=null,this.bufParams=new Bi,this.resultGeometry=null,this.saveException=null,1===arguments.length){var t=arguments[0];this.argGeom=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.argGeom=e,this.bufParams=n}}function or(){this.comps=null;var t=arguments[0];this.comps=t}function ar(){if(this.component=null,this.segIndex=null,this.pt=null,2===arguments.length){var t=arguments[0],e=arguments[1];ar.call(this,t,ar.INSIDE_AREA,e)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.component=n,this.segIndex=i,this.pt=r}}function ur(){this.pts=null;var t=arguments[0];this.pts=t}function lr(){this.locations=null;var t=arguments[0];this.locations=t}function hr(){if(this.geom=null,this.terminateDistance=0,this.ptLocator=new Te,this.minDistanceLocation=null,this.minDistance=r.MAX_VALUE,2===arguments.length){var t=arguments[0],e=arguments[1];hr.call(this,t,e,0)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],s=arguments[2];this.geom=new Array(2).fill(null),this.geom[0]=n,this.geom[1]=i,this.terminateDistance=s}}function cr(){this.factory=null,this.directedEdges=new I,this.coordinates=null;var t=arguments[0];this.factory=t}function fr(){this._isMarked=!1,this._isVisited=!1,this.data=null}function gr(){fr.apply(this),this.parentEdge=null,this.from=null,this.to=null,this.p0=null,this.p1=null,this.sym=null,this.edgeDirection=null,this.quadrant=null,this.angle=null;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.from=t,this.to=e,this.edgeDirection=i,this.p0=t.getCoordinate(),this.p1=n;var r=this.p1.x-this.p0.x,s=this.p1.y-this.p0.y;this.quadrant=Je.quadrant(r,s),this.angle=Math.atan2(s,r)}function dr(){var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];gr.call(this,t,e,n,i)}function pr(){if(fr.apply(this),this.dirEdge=null,0===arguments.length);else if(2===arguments.length){var t=arguments[0],e=arguments[1];this.setDirectedEdges(t,e)}}function vr(){this.outEdges=new I,this.sorted=!1}function mr(){if(fr.apply(this),this.pt=null,this.deStar=null,1===arguments.length){var t=arguments[0];mr.call(this,t,new vr)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.pt=e,this.deStar=n}}function yr(){pr.apply(this),this.line=null;var t=arguments[0];this.line=t}function xr(){this.nodeMap=new rt}function Er(){this.edges=new J,this.dirEdges=new J,this.nodeMap=new xr}function Ir(){Er.apply(this)}function Nr(){this.graph=new Ir,this.mergedLineStrings=null,this.factory=null,this.edgeStrings=null}function Cr(){this.edgeRing=null,this.next=null,this.label=-1;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];gr.call(this,t,e,n,i)}function Sr(){pr.apply(this),this.line=null;var t=arguments[0];this.line=t}function wr(){this.factory=null,this.deList=new I,this.lowestEdge=null,this.ring=null,this.ringPts=null,this.holes=null,this.shell=null,this._isHole=null,this._isProcessed=!1,this._isIncludedSet=!1,this._isIncluded=!1;var t=arguments[0];this.factory=t}function Lr(){}function Rr(){Er.apply(this),this.factory=null;var t=arguments[0];this.factory=t}function Tr(){if(this.lineStringAdder=new Pr(this),this.graph=null,this.dangles=new I,this.cutEdges=new I,this.invalidRingLines=new I,this.holeList=null,this.shellList=null,this.polyList=null,this.isCheckingRingsValid=!0,this.extractOnlyPolygonal=null,this.geomFactory=null,0===arguments.length)Tr.call(this,!1);else if(1===arguments.length){var t=arguments[0];this.extractOnlyPolygonal=t}}function Pr(){this.p=null;var t=arguments[0];this.p=t}function br(){}function Or(){if(this.edgeEnds=new I,1===arguments.length){var t=arguments[0];Or.call(this,null,t)}else if(2===arguments.length){var e=(arguments[0],arguments[1]);En.call(this,e.getEdge(),e.getCoordinate(),e.getDirectedCoordinate(),new gn(e.getLabel())),this.insert(e)}}function _r(){Pn.apply(this)}function Mr(){var t=arguments[0],e=arguments[1];yn.call(this,t,e)}function Dr(){Nn.apply(this)}function Ar(){this.li=new ae,this.ptLocator=new Te,this.arg=null,this.nodes=new xn(new Dr),this.im=null,this.isolatedEdges=new I,this.invalidPoint=null;var t=arguments[0];this.arg=t}function Fr(){this.rectEnv=null;var t=arguments[0];this.rectEnv=t.getEnvelopeInternal()}function Gr(){this.li=new ae,this.rectEnv=null,this.diagUp0=null,this.diagUp1=null,this.diagDown0=null,this.diagDown1=null;var t=arguments[0];this.rectEnv=t,this.diagUp0=new g(t.getMinX(),t.getMinY()),this.diagUp1=new g(t.getMaxX(),t.getMaxY()),this.diagDown0=new g(t.getMinX(),t.getMaxY()),this.diagDown1=new g(t.getMaxX(),t.getMinY())}function qr(){this._isDone=!1}function Br(){this.rectangle=null,this.rectEnv=null;var t=arguments[0];this.rectangle=t,this.rectEnv=t.getEnvelopeInternal()}function zr(){qr.apply(this),this.rectEnv=null,this._intersects=!1;var t=arguments[0];this.rectEnv=t}function Vr(){qr.apply(this),this.rectSeq=null,this.rectEnv=null,this._containsPoint=!1;var t=arguments[0];this.rectSeq=t.getExteriorRing().getCoordinateSequence(),this.rectEnv=t.getEnvelopeInternal()}function kr(){qr.apply(this),this.rectEnv=null,this.rectIntersector=null,this.hasIntersection=!1,this.p0=new g,this.p1=new g;var t=arguments[0];this.rectEnv=t.getEnvelopeInternal(),this.rectIntersector=new Gr(this.rectEnv)}function Yr(){if(this._relate=null,2===arguments.length){var t=arguments[0],e=arguments[1];ti.call(this,t,e),this._relate=new Ar(this.arg)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];ti.call(this,n,i,r),this._relate=new Ar(this.arg)}}function Ur(){this.geomFactory=null,this.skipEmpty=!1,this.inputGeoms=null;var t=arguments[0];this.geomFactory=Ur.extractFactory(t),this.inputGeoms=t}function Xr(){this.pointGeom=null,this.otherGeom=null,this.geomFact=null;var t=arguments[0],e=arguments[1];this.pointGeom=t,this.otherGeom=e,this.geomFact=e.getFactory()}function Hr(){this.sortIndex=-1,this.comps=null;var t=arguments[0],e=arguments[1];this.sortIndex=t,this.comps=e}function Wr(){this.inputPolys=null,this.geomFactory=null;var t=arguments[0];this.inputPolys=t,null===this.inputPolys&&(this.inputPolys=new I)}function jr(){if(this.polygons=new I,this.lines=new I,this.points=new I,this.geomFact=null,1===arguments.length){if(R(arguments[0],v)){var t=arguments[0];this.extract(t)}else if(arguments[0]instanceof B){var e=arguments[0];this.extract(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.geomFact=i,this.extract(n)}}function Kr(){this.geometryFactory=new ie,this.geomGraph=null,this.disconnectedRingcoord=null;var t=arguments[0];this.geomGraph=t}function Zr(){this.items=new I,this.subnode=[null,null]}function Qr(){if(this.min=null,this.max=null,0===arguments.length)this.min=0,this.max=0;else if(1===arguments.length){var t=arguments[0];this.init(t.min,t.max)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.init(e,n)}}function Jr(){this.pt=0,this.level=0,this.interval=null;var t=arguments[0];this.computeKey(t)}function $r(){Zr.apply(this),this.interval=null,this.centre=null,this.level=null;var t=arguments[0],e=arguments[1];this.interval=t,this.level=e,this.centre=(t.getMin()+t.getMax())/2}function ts(){Zr.apply(this)}function es(){this.root=null,this.minExtent=1,this.root=new ts}function ns(){}function is(){this.ring=null,this.tree=null,this.crossings=0,this.interval=new Qr;var t=arguments[0];this.ring=t,this.buildIndex()}function rs(){tr.apply(this),this.mcp=null,this.p=null;var t=arguments[0],e=arguments[1];this.mcp=t,this.p=e}function ss(){this.nodes=new xn(new Dr)}function os(){this.li=new ae,this.geomGraph=null,this.nodeGraph=new ss,this.invalidPoint=null;var t=arguments[0];this.geomGraph=t}function as(){this.graph=null,this.rings=new I,this.totalEnv=new C,this.index=null,this.nestedPt=null;var t=arguments[0];this.graph=t}function us(){if(this.errorType=null,this.pt=null,1===arguments.length){var t=arguments[0];us.call(this,t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.errorType=e,null!==n&&(this.pt=n.copy())}}function ls(){this.parentGeometry=null,this.isSelfTouchingRingFormingHoleValid=!1,this.validErr=null;var t=arguments[0];this.parentGeometry=t}function hs(){_t.CoordinateOperation.apply(this),this.targetPM=null,this.removeCollapsed=!0;var t=arguments[0],e=arguments[1];this.targetPM=t,this.removeCollapsed=e}function cs(){this.targetPM=null,this.removeCollapsed=!0,this.changePrecisionModel=!1,this.isPointwise=!1;var t=arguments[0];this.targetPM=t}function fs(){this.pts=null,this.usePt=null,this.distanceTolerance=null,this.seg=new ce;var t=arguments[0];this.pts=t}function gs(){this.inputGeom=null,this.distanceTolerance=null,this.isEnsureValidTopology=!0;var t=arguments[0];this.inputGeom=t}function ds(){xe.apply(this),this.isEnsureValidTopology=!0,this.distanceTolerance=null;var t=arguments[0],e=arguments[1];this.isEnsureValidTopology=t,this.distanceTolerance=e}function ps(){if(this.parent=null,this.index=null,2===arguments.length){var t=arguments[0],e=arguments[1];ps.call(this,t,e,null,-1)}else if(4===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2],s=arguments[3];ce.call(this,n,i),this.parent=r,this.index=s}}function vs(){if(this.parentLine=null,this.segs=null,this.resultSegs=new I,this.minimumSize=null,1===arguments.length){var t=arguments[0];vs.call(this,t,2)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.parentLine=e,this.minimumSize=n,this.init()}}function ms(){this.index=new Pi}function ys(){this.querySeg=null,this.items=new I;var t=arguments[0];this.querySeg=t}function xs(){this.li=new ae,this.inputIndex=new ms,this.outputIndex=new ms,this.line=null,this.linePts=null,this.distanceTolerance=0;var t=arguments[0],e=arguments[1];this.inputIndex=t,this.outputIndex=e}function Es(){this.inputIndex=new ms,this.outputIndex=new ms,this.distanceTolerance=0}function Is(){this.inputGeom=null,this.lineSimplifier=new Es,this.linestringMap=null;var t=arguments[0];this.inputGeom=t}function Ns(){xe.apply(this),this.linestringMap=null;var t=arguments[0];this.linestringMap=t}function Cs(){this.tps=null;var t=arguments[0];this.tps=t}function Ss(){this.seg=null,this.segLen=null,this.splitPt=null,this.minimumLen=0;var t=arguments[0];this.seg=t,this.segLen=t.getLength()}function ws(){}function Ls(){}function Rs(){}function Ts(){if(this.p=null,1===arguments.length){var t=arguments[0];this.p=new g(t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p=new g(e,n)}else if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];this.p=new g(i,r,s)}}function Ps(){this._isOnConstraint=null,this.constraint=null;var t=arguments[0];Ts.call(this,t)}function bs(){this._rot=null,this.vertex=null,this.next=null,this.data=null}function Os(){this.subdiv=null,this.isUsingTolerance=!1;var t=arguments[0];this.subdiv=t,this.isUsingTolerance=t.getTolerance()>0}function _s(){}function Ms(){this.subdiv=null,this.lastEdge=null;var t=arguments[0];this.subdiv=t,this.init()}function Ds(){if(this.seg=null,1===arguments.length){if("string"==typeof arguments[0]){var t=arguments[0];l.call(this,t)}else if(arguments[0]instanceof ce){var e=arguments[0];l.call(this,"Locate failed to converge (at edge: "+e+").  Possible causes include invalid Subdivision topology or very close sites"),this.seg=new ce(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];l.call(this,Ds.msgWithSpatial(n,i)),this.seg=new ce(i)}}function As(){}function Fs(){this.visitedKey=0,this.quadEdges=new I,this.startingEdge=null,this.tolerance=null,this.edgeCoincidenceTolerance=null,this.frameVertex=new Array(3).fill(null),this.frameEnv=null,this.locator=null,this.seg=new ce,this.triEdges=new Array(3).fill(null);var t=arguments[0],e=arguments[1];this.tolerance=e,this.edgeCoincidenceTolerance=e/Fs.EDGE_COINCIDENCE_TOL_FACTOR,this.createFrame(t),this.startingEdge=this.initSubdiv(),this.locator=new Ms(this)}function Gs(){}function qs(){this.triList=new I}function Bs(){this.triList=new I}function zs(){this.coordList=new N,this.triCoords=new I}function Vs(){if(this.ls=null,this.data=null,2===arguments.length){var t=arguments[0],e=arguments[1];this.ls=new ce(t,e)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.ls=new ce(n,i),this.data=r}else if(6===arguments.length){var s=arguments[0],o=arguments[1],a=arguments[2],u=arguments[3],l=arguments[4],h=arguments[5];Vs.call(this,new g(s,o,a),new g(u,l,h))}else if(7===arguments.length){var c=arguments[0],f=arguments[1],d=arguments[2],p=arguments[3],v=arguments[4],m=arguments[5],y=arguments[6];Vs.call(this,new g(c,f,d),new g(p,v,m),y)}}function ks(){}function Ys(){if(this.p=null,this.data=null,this.left=null,this.right=null,this.count=null,2===arguments.length){var t=arguments[0],e=arguments[1];this.p=new g(t),this.left=null,this.right=null,this.count=1,this.data=e}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.p=new g(n,i),this.left=null,this.right=null,this.count=1,this.data=r}}function Us(){if(this.root=null,this.numberOfNodes=null,this.tolerance=null,0===arguments.length)Us.call(this,0);else if(1===arguments.length){var t=arguments[0];this.tolerance=t}}function Xs(){this.tolerance=null,this.matchNode=null,this.matchDist=0,this.p=null;var t=arguments[0],e=arguments[1];this.p=t,this.tolerance=e}function Hs(){this.initialVertices=null,this.segVertices=null,this.segments=new I,this.subdiv=null,this.incDel=null,this.convexHull=null,this.splitFinder=new Ls,this.kdt=null,this.vertexFactory=null,this.computeAreaEnv=null,this.splitPt=null,this.tolerance=null;var t=arguments[0],e=arguments[1];this.initialVertices=new I(t),this.tolerance=e,this.kdt=new Us(e)}function Ws(){this.siteCoords=null,this.tolerance=0,this.subdiv=null}function js(){this.siteCoords=null,this.constraintLines=null,this.tolerance=0,this.subdiv=null,this.constraintVertexMap=new rt}function Ks(){this.siteCoords=null,this.tolerance=0,this.subdiv=null,this.clipEnv=null,this.diagramEnv=null}function Zs(){}Array.prototype.fill||(Array.prototype.fill=function(t){for(var e=Object(this),n=parseInt(e.length,10),i=arguments[1],r=parseInt(i,10)||0,s=0>r?Math.max(n+r,0):Math.min(r,n),o=arguments[2],a=void 0===o?n:parseInt(o,10)||0,u=0>a?Math.max(n+a,0):Math.min(a,n);u>s;s++)e[s]=t;return e}),Number.isFinite=Number.isFinite||function(t){return"number"==typeof t&&isFinite(t)},Number.isInteger=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t},Number.parseFloat=Number.parseFloat||parseFloat,Number.isNaN=Number.isNaN||function(t){return t!==t},Math.trunc=Math.trunc||function(t){return 0>t?Math.ceil(t):Math.floor(t)},e(n.prototype,{interfaces_:function(){return[]},getClass:function(){return n}}),n.equalsWithTolerance=function(t,e,n){return Math.abs(t-e)<=n},r.isNaN=function(t){return Number.isNaN(t)},r.doubleToLongBits=function(t){return t},r.longBitsToDouble=function(t){return t},r.isInfinite=function(t){return!Number.isFinite(t)},r.MAX_VALUE=Number.MAX_VALUE,h(c,l),e(c.prototype,{interfaces_:function(){return[]},getClass:function(){return c}}),e(f.prototype,{interfaces_:function(){return[]},getClass:function(){return f}}),f.shouldNeverReachHere=function(){if(0===arguments.length)f.shouldNeverReachHere(null);else if(1===arguments.length){var t=arguments[0];throw new c("Should never reach here"+(null!==t?": "+t:""))}},f.isTrue=function(){if(1===arguments.length){var t=arguments[0];f.isTrue(t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(!e)throw null===n?new c:new c(n)}},f.equals=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];f.equals(t,e,null)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];if(!i.equals(n))throw new c("Expected "+n+" but encountered "+i+(null!==r?": "+r:""))}},e(g.prototype,{setOrdinate:function(t,e){switch(t){case g.X:this.x=e;break;case g.Y:this.y=e;break;case g.Z:this.z=e;break;default:throw new i("Invalid ordinate index: "+t)}},equals2D:function(){if(1===arguments.length){var t=arguments[0];return this.x!==t.x?!1:this.y===t.y}if(2===arguments.length){var e=arguments[0],i=arguments[1];return n.equalsWithTolerance(this.x,e.x,i)?!!n.equalsWithTolerance(this.y,e.y,i):!1}},getOrdinate:function(t){switch(t){case g.X:return this.x;case g.Y:return this.y;case g.Z:return this.z}throw new i("Invalid ordinate index: "+t)},equals3D:function(t){return this.x===t.x&&this.y===t.y&&(this.z===t.z||r.isNaN(this.z)&&r.isNaN(t.z))},equals:function(t){return t instanceof g?this.equals2D(t):!1},equalInZ:function(t,e){return n.equalsWithTolerance(this.z,t.z,e)},compareTo:function(t){var e=t;return this.x<e.x?-1:this.x>e.x?1:this.y<e.y?-1:this.y>e.y?1:0},clone:function(){try{var t=null;return t}catch(t){if(t instanceof CloneNotSupportedException)return f.shouldNeverReachHere("this shouldn't happen because this class is Cloneable"),null;throw t}finally{}},copy:function(){return new g(this)},toString:function(){return"("+this.x+", "+this.y+", "+this.z+")"},distance3D:function(t){var e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return Math.sqrt(e*e+n*n+i*i)},distance:function(t){var e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e*e+n*n)},hashCode:function(){var t=17;return t=37*t+g.hashCode(this.x),t=37*t+g.hashCode(this.y)},setCoordinate:function(t){this.x=t.x,this.y=t.y,this.z=t.z},interfaces_:function(){return[s,o,u]},getClass:function(){return g}}),g.hashCode=function(){if(1===arguments.length){var t=arguments[0],e=r.doubleToLongBits(t);return Math.trunc(e^e>>>32)}},e(d.prototype,{compare:function(t,e){var n=t,i=e,r=d.compare(n.x,i.x);if(0!==r)return r;var s=d.compare(n.y,i.y);if(0!==s)return s;if(this.dimensionsToTest<=2)return 0;var o=d.compare(n.z,i.z);return o},interfaces_:function(){return[a]},getClass:function(){return d}}),d.compare=function(t,e){return e>t?-1:t>e?1:r.isNaN(t)?r.isNaN(e)?0:-1:r.isNaN(e)?1:0},g.DimensionalComparator=d,g.serialVersionUID=0x5cbf2c235c7e5800,g.NULL_ORDINATE=r.NaN,g.X=0,g.Y=1,g.Z=2,p.prototype.hasNext=function(){},p.prototype.next=function(){},p.prototype.remove=function(){},v.prototype.add=function(){},v.prototype.addAll=function(){},v.prototype.isEmpty=function(){},v.prototype.iterator=function(){},v.prototype.size=function(){},v.prototype.toArray=function(){},v.prototype.remove=function(){},m.prototype=new Error,m.prototype.name="IndexOutOfBoundsException",y.prototype=Object.create(v.prototype),y.prototype.constructor=y,y.prototype.get=function(){},y.prototype.set=function(){},y.prototype.isEmpty=function(){},x.prototype=new Error,x.prototype.name="NoSuchElementException",E.prototype=new Error,E.prototype.name="OperationNotSupported",I.prototype=Object.create(y.prototype),I.prototype.constructor=I,I.prototype.ensureCapacity=function(){},I.prototype.interfaces_=function(){return[y,v]},I.prototype.add=function(t){return this.array_.push(t),!0},I.prototype.clear=function(){this.array_=[]},I.prototype.addAll=function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next());return!0},I.prototype.set=function(t,e){var n=this.array_[t];return this.array_[t]=e,n},I.prototype.iterator=function(){return new Qs(this)},I.prototype.get=function(t){if(0>t||t>=this.size())throw new m;return this.array_[t]},I.prototype.isEmpty=function(){return 0===this.array_.length},I.prototype.size=function(){return this.array_.length},I.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},I.prototype.remove=function(t){for(var e=!1,n=0,i=this.array_.length;i>n;n++)if(this.array_[n]===t){this.array_.splice(n,1),e=!0;break}return e};var Qs=function(t){this.arrayList_=t,this.position_=0};Qs.prototype.next=function(){if(this.position_===this.arrayList_.size())throw new x;return this.arrayList_.get(this.position_++)},Qs.prototype.hasNext=function(){return this.position_<this.arrayList_.size()},Qs.prototype.set=function(t){return this.arrayList_.set(this.position_-1,t)},Qs.prototype.remove=function(){throw new E},h(N,I),e(N.prototype,{getCoordinate:function(t){return this.get(t)},addAll:function(){if(2===arguments.length){for(var t=arguments[0],e=arguments[1],n=!1,i=t.iterator();i.hasNext();)this.add(i.next(),e),n=!0;return n}return I.prototype.addAll.apply(this,arguments)},clone:function t(){for(var t=I.prototype.clone.call(this),e=0;e<this.size();e++)t.add(e,this.get(e).copy());return t},toCoordinateArray:function(){return this.toArray(N.coordArrayType)},add:function(){if(1===arguments.length){var t=arguments[0];I.prototype.add.call(this,t)}else if(2===arguments.length){if(arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var e=arguments[0],n=arguments[1];return this.add(e,n,!0),!0}if(arguments[0]instanceof g&&"boolean"==typeof arguments[1]){var i=arguments[0],r=arguments[1];if(!r&&this.size()>=1){var s=this.get(this.size()-1);if(s.equals2D(i))return null}I.prototype.add.call(this,i)}else if(arguments[0]instanceof Object&&"boolean"==typeof arguments[1]){var o=arguments[0],a=arguments[1];return this.add(o,a),!0}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var u=arguments[0],l=arguments[1],h=arguments[2];if(h)for(var c=0;c<u.length;c++)this.add(u[c],l);else for(var c=u.length-1;c>=0;c--)this.add(u[c],l);return!0}if("boolean"==typeof arguments[2]&&Number.isInteger(arguments[0])&&arguments[1]instanceof g){var f=arguments[0],d=arguments[1],p=arguments[2];if(!p){var v=this.size();if(v>0){if(f>0){var m=this.get(f-1);if(m.equals2D(d))return null}if(v>f){var y=this.get(f);if(y.equals2D(d))return null}}}I.prototype.add.call(this,f,d)}}else if(4===arguments.length){var x=arguments[0],E=arguments[1],N=arguments[2],C=arguments[3],S=1;N>C&&(S=-1);for(var c=N;c!==C;c+=S)this.add(x[c],E);return!0}},closeRing:function(){this.size()>0&&this.add(new g(this.get(0)),!1)},interfaces_:function(){return[]},getClass:function(){return N}}),N.coordArrayType=new Array(0).fill(null),e(C.prototype,{getArea:function(){return this.getWidth()*this.getHeight()},equals:function(t){if(!(t instanceof C))return!1;var e=t;return this.isNull()?e.isNull():this.maxx===e.getMaxX()&&this.maxy===e.getMaxY()&&this.minx===e.getMinX()&&this.miny===e.getMinY()},intersection:function(t){if(this.isNull()||t.isNull()||!this.intersects(t))return new C;var e=this.minx>t.minx?this.minx:t.minx,n=this.miny>t.miny?this.miny:t.miny,i=this.maxx<t.maxx?this.maxx:t.maxx,r=this.maxy<t.maxy?this.maxy:t.maxy;return new C(e,i,n,r)},isNull:function(){return this.maxx<this.minx},getMaxX:function(){return this.maxx},covers:function(){if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];return this.covers(t.x,t.y)}if(arguments[0]instanceof C){var e=arguments[0];return this.isNull()||e.isNull()?!1:e.getMinX()>=this.minx&&e.getMaxX()<=this.maxx&&e.getMinY()>=this.miny&&e.getMaxY()<=this.maxy}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return this.isNull()?!1:n>=this.minx&&n<=this.maxx&&i>=this.miny&&i<=this.maxy}},intersects:function(){if(1===arguments.length){if(arguments[0]instanceof C){var t=arguments[0];return this.isNull()||t.isNull()?!1:!(t.minx>this.maxx||t.maxx<this.minx||t.miny>this.maxy||t.maxy<this.miny)}if(arguments[0]instanceof g){var e=arguments[0];return this.intersects(e.x,e.y)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return this.isNull()?!1:!(n>this.maxx||n<this.minx||i>this.maxy||i<this.miny)}},getMinY:function(){return this.miny},getMinX:function(){return this.minx},expandToInclude:function(){if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];this.expandToInclude(t.x,t.y)}else if(arguments[0]instanceof C){var e=arguments[0];if(e.isNull())return null;this.isNull()?(this.minx=e.getMinX(),this.maxx=e.getMaxX(),this.miny=e.getMinY(),this.maxy=e.getMaxY()):(e.minx<this.minx&&(this.minx=e.minx),e.maxx>this.maxx&&(this.maxx=e.maxx),e.miny<this.miny&&(this.miny=e.miny),e.maxy>this.maxy&&(this.maxy=e.maxy))}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.isNull()?(this.minx=n,this.maxx=n,this.miny=i,this.maxy=i):(n<this.minx&&(this.minx=n),n>this.maxx&&(this.maxx=n),i<this.miny&&(this.miny=i),i>this.maxy&&(this.maxy=i))}},minExtent:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return e>t?t:e},getWidth:function(){return this.isNull()?0:this.maxx-this.minx},compareTo:function(t){var e=t;return this.isNull()?e.isNull()?0:-1:e.isNull()?1:this.minx<e.minx?-1:this.minx>e.minx?1:this.miny<e.miny?-1:this.miny>e.miny?1:this.maxx<e.maxx?-1:this.maxx>e.maxx?1:this.maxy<e.maxy?-1:this.maxy>e.maxy?1:0},translate:function(t,e){return this.isNull()?null:void this.init(this.getMinX()+t,this.getMaxX()+t,this.getMinY()+e,this.getMaxY()+e)},toString:function(){return"Env["+this.minx+" : "+this.maxx+", "+this.miny+" : "+this.maxy+"]"},setToNull:function(){this.minx=0,this.maxx=-1,this.miny=0,this.maxy=-1},getHeight:function(){return this.isNull()?0:this.maxy-this.miny},maxExtent:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return t>e?t:e},expandBy:function(){if(1===arguments.length){var t=arguments[0];this.expandBy(t,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(this.isNull())return null;this.minx-=e,this.maxx+=e,this.miny-=n,this.maxy+=n,(this.minx>this.maxx||this.miny>this.maxy)&&this.setToNull()}},contains:function(){if(1===arguments.length){if(arguments[0]instanceof C){var t=arguments[0];return this.covers(t)}if(arguments[0]instanceof g){var e=arguments[0];return this.covers(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return this.covers(n,i)}},centre:function(){return this.isNull()?null:new g((this.getMinX()+this.getMaxX())/2,(this.getMinY()+this.getMaxY())/2)},init:function(){if(0===arguments.length)this.setToNull();else if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];this.init(t.x,t.x,t.y,t.y)}else if(arguments[0]instanceof C){var e=arguments[0];this.minx=e.minx,this.maxx=e.maxx,this.miny=e.miny,this.maxy=e.maxy}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.init(n.x,i.x,n.y,i.y)}else if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3];s>r?(this.minx=r,this.maxx=s):(this.minx=s,this.maxx=r),a>o?(this.miny=o,this.maxy=a):(this.miny=a,this.maxy=o)}},getMaxY:function(){return this.maxy},distance:function(t){if(this.intersects(t))return 0;var e=0;this.maxx<t.minx?e=t.minx-this.maxx:this.minx>t.maxx&&(e=this.minx-t.maxx);var n=0;return this.maxy<t.miny?n=t.miny-this.maxy:this.miny>t.maxy&&(n=this.miny-t.maxy),0===e?n:0===n?e:Math.sqrt(e*e+n*n)},hashCode:function(){var t=17;return t=37*t+g.hashCode(this.minx),t=37*t+g.hashCode(this.maxx),t=37*t+g.hashCode(this.miny),t=37*t+g.hashCode(this.maxy)},interfaces_:function(){return[s,u]},getClass:function(){return C}}),C.intersects=function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2];return n.x>=(t.x<e.x?t.x:e.x)&&n.x<=(t.x>e.x?t.x:e.x)&&n.y>=(t.y<e.y?t.y:e.y)&&n.y<=(t.y>e.y?t.y:e.y)}if(4===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3],a=Math.min(s.x,o.x),u=Math.max(s.x,o.x),l=Math.min(i.x,r.x),h=Math.max(i.x,r.x);return l>u?!1:a>h?!1:(a=Math.min(s.y,o.y),u=Math.max(s.y,o.y),l=Math.min(i.y,r.y),h=Math.max(i.y,r.y),l>u?!1:!(a>h))}},C.serialVersionUID=0x51845cd552189800,h(w,S),e(w.prototype,{interfaces_:function(){return[]},getClass:function(){return w}}),e(L.prototype,{interfaces_:function(){return[]},getClass:function(){return L}}),L.toLocationSymbol=function(t){switch(t){case L.EXTERIOR:return"e";case L.BOUNDARY:return"b";case L.INTERIOR:return"i";case L.NONE:return"-"}throw new i("Unknown location value: "+t)},L.INTERIOR=0,L.BOUNDARY=1,L.EXTERIOR=2,L.NONE=-1,e(T.prototype,{interfaces_:function(){return[]},getClass:function(){return T}}),T.log10=function(t){var e=Math.log(t);return r.isInfinite(e)?e:r.isNaN(e)?e:e/T.LOG_10},T.min=function(t,e,n,i){var r=t;return r>e&&(r=e),r>n&&(r=n),r>i&&(r=i),r},T.clamp=function(){if("number"==typeof arguments[2]&&"number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1],n=arguments[2];return e>t?e:t>n?n:t}if(Number.isInteger(arguments[2])&&Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var i=arguments[0],r=arguments[1],s=arguments[2];return r>i?r:i>s?s:i}},T.wrap=function(t,e){return 0>t?e- -t%e:t%e},T.max=function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=t;return e>i&&(i=e),n>i&&(i=n),i}if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3],i=r;return s>i&&(i=s),o>i&&(i=o),a>i&&(i=a),i}},T.average=function(t,e){
return(t+e)/2},T.LOG_10=Math.log(10),P.prototype.append=function(t){this.str+=t},P.prototype.setCharAt=function(t,e){return this.str.substr(0,t)+e+this.str.substr(t+1)},P.prototype.toString=function(t){return this.str},b.prototype.intValue=function(){return this.value},b.prototype.compareTo=function(t){return this.value<t?-1:this.value>t?1:0},b.isNaN=function(t){return Number.isNaN(t)},O.isWhitespace=function(t){return 32>=t&&t>=0||127==t},O.toUpperCase=function(t){return t.toUpperCase()},e(_.prototype,{le:function(t){return this.hi<t.hi||this.hi===t.hi&&this.lo<=t.lo},extractSignificantDigits:function(t,e){var n=this.abs(),i=_.magnitude(n.hi),r=_.TEN.pow(i);n=n.divide(r),n.gt(_.TEN)?(n=n.divide(_.TEN),i+=1):n.lt(_.ONE)&&(n=n.multiply(_.TEN),i-=1);for(var s=i+1,o=new P,a=_.MAX_PRINT_DIGITS-1,u=0;a>=u;u++){t&&u===s&&o.append(".");var l=Math.trunc(n.hi);if(0>l)break;var h=!1,c=0;l>9?(h=!0,c="9"):c="0"+l,o.append(c),n=n.subtract(_.valueOf(l)).multiply(_.TEN),h&&n.selfAdd(_.TEN);var f=!0,g=_.magnitude(n.hi);if(0>g&&Math.abs(g)>=a-u&&(f=!1),!f)break}return e[0]=i,o.toString()},sqr:function(){return this.multiply(this)},doubleValue:function(){return this.hi+this.lo},subtract:function(){if(arguments[0]instanceof _){var t=arguments[0];return this.add(t.negate())}if("number"==typeof arguments[0]){var e=arguments[0];return this.add(-e)}},equals:function(){if(1===arguments.length){var t=arguments[0];return this.hi===t.hi&&this.lo===t.lo}},isZero:function(){return 0===this.hi&&0===this.lo},selfSubtract:function(){if(arguments[0]instanceof _){var t=arguments[0];return this.isNaN()?this:this.selfAdd(-t.hi,-t.lo)}if("number"==typeof arguments[0]){var e=arguments[0];return this.isNaN()?this:this.selfAdd(-e,0)}},getSpecialNumberString:function(){return this.isZero()?"0.0":this.isNaN()?"NaN ":null},min:function(t){return this.le(t)?this:t},selfDivide:function(){if(1===arguments.length){if(arguments[0]instanceof _){var t=arguments[0];return this.selfDivide(t.hi,t.lo)}if("number"==typeof arguments[0]){var e=arguments[0];return this.selfDivide(e,0)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=null,s=null,o=null,a=null,u=null,l=null,h=null,c=null;return u=this.hi/n,l=_.SPLIT*u,r=l-u,c=_.SPLIT*n,r=l-r,s=u-r,o=c-n,h=u*n,o=c-o,a=n-o,c=r*o-h+r*a+s*o+s*a,l=(this.hi-h-c+this.lo-u*i)/n,c=u+l,this.hi=c,this.lo=u-c+l,this}},dump:function(){return"DD<"+this.hi+", "+this.lo+">"},divide:function(){if(arguments[0]instanceof _){var t=arguments[0],e=null,n=null,i=null,s=null,o=null,a=null,u=null,l=null;o=this.hi/t.hi,a=_.SPLIT*o,e=a-o,l=_.SPLIT*t.hi,e=a-e,n=o-e,i=l-t.hi,u=o*t.hi,i=l-i,s=t.hi-i,l=e*i-u+e*s+n*i+n*s,a=(this.hi-u-l+this.lo-o*t.lo)/t.hi,l=o+a;var h=l,c=o-l+a;return new _(h,c)}if("number"==typeof arguments[0]){var f=arguments[0];return r.isNaN(f)?_.createNaN():_.copy(this).selfDivide(f,0)}},ge:function(t){return this.hi>t.hi||this.hi===t.hi&&this.lo>=t.lo},pow:function(t){if(0===t)return _.valueOf(1);var e=new _(this),n=_.valueOf(1),i=Math.abs(t);if(i>1)for(;i>0;)i%2===1&&n.selfMultiply(e),i/=2,i>0&&(e=e.sqr());else n=e;return 0>t?n.reciprocal():n},ceil:function(){if(this.isNaN())return _.NaN;var t=Math.ceil(this.hi),e=0;return t===this.hi&&(e=Math.ceil(this.lo)),new _(t,e)},compareTo:function(t){var e=t;return this.hi<e.hi?-1:this.hi>e.hi?1:this.lo<e.lo?-1:this.lo>e.lo?1:0},rint:function(){if(this.isNaN())return this;var t=this.add(.5);return t.floor()},setValue:function(){if(arguments[0]instanceof _){var t=arguments[0];return this.init(t),this}if("number"==typeof arguments[0]){var e=arguments[0];return this.init(e),this}},max:function(t){return this.ge(t)?this:t},sqrt:function(){if(this.isZero())return _.valueOf(0);if(this.isNegative())return _.NaN;var t=1/Math.sqrt(this.hi),e=this.hi*t,n=_.valueOf(e),i=this.subtract(n.sqr()),r=i.hi*(.5*t);return n.add(r)},selfAdd:function(){if(1===arguments.length){if(arguments[0]instanceof _){var t=arguments[0];return this.selfAdd(t.hi,t.lo)}if("number"==typeof arguments[0]){var e=arguments[0],n=null,i=null,r=null,s=null,o=null,a=null;return r=this.hi+e,o=r-this.hi,s=r-o,s=e-o+(this.hi-s),a=s+this.lo,n=r+a,i=a+(r-n),this.hi=n+i,this.lo=i+(n-this.hi),this}}else if(2===arguments.length){var u=arguments[0],l=arguments[1],n=null,i=null,h=null,c=null,r=null,s=null,o=null,a=null;r=this.hi+u,h=this.lo+l,o=r-this.hi,a=h-this.lo,s=r-o,c=h-a,s=u-o+(this.hi-s),c=l-a+(this.lo-c),o=s+h,n=r+o,i=o+(r-n),o=c+i;var f=n+o,g=o+(n-f);return this.hi=f,this.lo=g,this}},selfMultiply:function(){if(1===arguments.length){if(arguments[0]instanceof _){var t=arguments[0];return this.selfMultiply(t.hi,t.lo)}if("number"==typeof arguments[0]){var e=arguments[0];return this.selfMultiply(e,0)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=null,s=null,o=null,a=null,u=null,l=null;u=_.SPLIT*this.hi,r=u-this.hi,l=_.SPLIT*n,r=u-r,s=this.hi-r,o=l-n,u=this.hi*n,o=l-o,a=n-o,l=r*o-u+r*a+s*o+s*a+(this.hi*i+this.lo*n);var h=u+l;r=u-h;var c=l+r;return this.hi=h,this.lo=c,this}},selfSqr:function(){return this.selfMultiply(this)},floor:function(){if(this.isNaN())return _.NaN;var t=Math.floor(this.hi),e=0;return t===this.hi&&(e=Math.floor(this.lo)),new _(t,e)},negate:function(){return this.isNaN()?this:new _(-this.hi,-this.lo)},clone:function(){try{return null}catch(t){if(t instanceof CloneNotSupportedException)return null;throw t}finally{}},multiply:function(){if(arguments[0]instanceof _){var t=arguments[0];return t.isNaN()?_.createNaN():_.copy(this).selfMultiply(t)}if("number"==typeof arguments[0]){var e=arguments[0];return r.isNaN(e)?_.createNaN():_.copy(this).selfMultiply(e,0)}},isNaN:function(){return r.isNaN(this.hi)},intValue:function(){return Math.trunc(this.hi)},toString:function(){var t=_.magnitude(this.hi);return t>=-3&&20>=t?this.toStandardNotation():this.toSciNotation()},toStandardNotation:function(){var t=this.getSpecialNumberString();if(null!==t)return t;var e=new Array(1).fill(null),n=this.extractSignificantDigits(!0,e),i=e[0]+1,r=n;if("."===n.charAt(0))r="0"+n;else if(0>i)r="0."+_.stringOfChar("0",-i)+n;else if(-1===n.indexOf(".")){var s=i-n.length,o=_.stringOfChar("0",s);r=n+o+".0"}return this.isNegative()?"-"+r:r},reciprocal:function(){var t=null,e=null,n=null,i=null,r=null,s=null,o=null,a=null;r=1/this.hi,s=_.SPLIT*r,t=s-r,a=_.SPLIT*this.hi,t=s-t,e=r-t,n=a-this.hi,o=r*this.hi,n=a-n,i=this.hi-n,a=t*n-o+t*i+e*n+e*i,s=(1-o-a-r*this.lo)/this.hi;var u=r+s,l=r-u+s;return new _(u,l)},toSciNotation:function(){if(this.isZero())return _.SCI_NOT_ZERO;var t=this.getSpecialNumberString();if(null!==t)return t;var e=new Array(1).fill(null),n=this.extractSignificantDigits(!1,e),i=_.SCI_NOT_EXPONENT_CHAR+e[0];if("0"===n.charAt(0))throw new IllegalStateException("Found leading zero: "+n);var r="";n.length>1&&(r=n.substring(1));var s=n.charAt(0)+"."+r;return this.isNegative()?"-"+s+i:s+i},abs:function(){return this.isNaN()?_.NaN:this.isNegative()?this.negate():new _(this)},isPositive:function(){return this.hi>0||0===this.hi&&this.lo>0},lt:function(t){return this.hi<t.hi||this.hi===t.hi&&this.lo<t.lo},add:function(){if(arguments[0]instanceof _){var t=arguments[0];return _.copy(this).selfAdd(t)}if("number"==typeof arguments[0]){var e=arguments[0];return _.copy(this).selfAdd(e)}},init:function(){if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];this.hi=t,this.lo=0}else if(arguments[0]instanceof _){var e=arguments[0];this.hi=e.hi,this.lo=e.lo}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.hi=n,this.lo=i}},gt:function(t){return this.hi>t.hi||this.hi===t.hi&&this.lo>t.lo},isNegative:function(){return this.hi<0||0===this.hi&&this.lo<0},trunc:function(){return this.isNaN()?_.NaN:this.isPositive()?this.floor():this.ceil()},signum:function(){return this.hi>0?1:this.hi<0?-1:this.lo>0?1:this.lo<0?-1:0},interfaces_:function(){return[u,s,o]},getClass:function(){return _}}),_.sqr=function(t){return _.valueOf(t).selfMultiply(t)},_.valueOf=function(){if("string"==typeof arguments[0]){var t=arguments[0];return _.parse(t)}if("number"==typeof arguments[0]){var e=arguments[0];return new _(e)}},_.sqrt=function(t){return _.valueOf(t).sqrt()},_.parse=function(t){for(var e=0,n=t.length;O.isWhitespace(t.charAt(e));)e++;var i=!1;if(n>e){var r=t.charAt(e);"-"!==r&&"+"!==r||(e++,"-"===r&&(i=!0))}for(var s=new _,o=0,a=0,u=0;;){if(e>=n)break;var l=t.charAt(e);if(e++,O.isDigit(l)){var h=l-"0";s.selfMultiply(_.TEN),s.selfAdd(h),o++}else{if("."!==l){if("e"===l||"E"===l){var c=t.substring(e);try{u=b.parseInt(c)}catch(e){throw e instanceof NumberFormatException?new NumberFormatException("Invalid exponent "+c+" in string "+t):e}finally{}break}throw new NumberFormatException("Unexpected character '"+l+"' at position "+e+" in string "+t)}a=o}}var f=s,g=o-a-u;if(0===g)f=s;else if(g>0){var d=_.TEN.pow(g);f=s.divide(d)}else if(0>g){var d=_.TEN.pow(-g);f=s.multiply(d)}return i?f.negate():f},_.createNaN=function(){return new _(r.NaN,r.NaN)},_.copy=function(t){return new _(t)},_.magnitude=function(t){var e=Math.abs(t),n=Math.log(e)/Math.log(10),i=Math.trunc(Math.floor(n)),r=Math.pow(10,i);return e>=10*r&&(i+=1),i},_.stringOfChar=function(t,e){for(var n=new P,i=0;e>i;i++)n.append(t);return n.toString()},_.PI=new _(3.141592653589793,1.2246467991473532e-16),_.TWO_PI=new _(6.283185307179586,2.4492935982947064e-16),_.PI_2=new _(1.5707963267948966,6.123233995736766e-17),_.E=new _(2.718281828459045,1.4456468917292502e-16),_.NaN=new _(r.NaN,r.NaN),_.EPS=1.23259516440783e-32,_.SPLIT=134217729,_.MAX_PRINT_DIGITS=32,_.TEN=_.valueOf(10),_.ONE=_.valueOf(1),_.SCI_NOT_EXPONENT_CHAR="E",_.SCI_NOT_ZERO="0.0E0",e(M.prototype,{interfaces_:function(){return[]},getClass:function(){return M}}),M.orientationIndex=function(t,e,n){var i=M.orientationIndexFilter(t,e,n);if(1>=i)return i;var r=_.valueOf(e.x).selfAdd(-t.x),s=_.valueOf(e.y).selfAdd(-t.y),o=_.valueOf(n.x).selfAdd(-e.x),a=_.valueOf(n.y).selfAdd(-e.y);return r.selfMultiply(a).selfSubtract(s.selfMultiply(o)).signum()},M.signOfDet2x2=function(t,e,n,i){var r=t.multiply(i).selfSubtract(e.multiply(n));return r.signum()},M.intersection=function(t,e,n,i){var r=_.valueOf(i.y).selfSubtract(n.y).selfMultiply(_.valueOf(e.x).selfSubtract(t.x)),s=_.valueOf(i.x).selfSubtract(n.x).selfMultiply(_.valueOf(e.y).selfSubtract(t.y)),o=r.subtract(s),a=_.valueOf(i.x).selfSubtract(n.x).selfMultiply(_.valueOf(t.y).selfSubtract(n.y)),u=_.valueOf(i.y).selfSubtract(n.y).selfMultiply(_.valueOf(t.x).selfSubtract(n.x)),l=a.subtract(u),h=l.selfDivide(o).doubleValue(),c=_.valueOf(t.x).selfAdd(_.valueOf(e.x).selfSubtract(t.x).selfMultiply(h)).doubleValue(),f=_.valueOf(e.x).selfSubtract(t.x).selfMultiply(_.valueOf(t.y).selfSubtract(n.y)),d=_.valueOf(e.y).selfSubtract(t.y).selfMultiply(_.valueOf(t.x).selfSubtract(n.x)),p=f.subtract(d),v=p.selfDivide(o).doubleValue(),m=_.valueOf(n.y).selfAdd(_.valueOf(i.y).selfSubtract(n.y).selfMultiply(v)).doubleValue();return new g(c,m)},M.orientationIndexFilter=function(t,e,n){var i=null,r=(t.x-n.x)*(e.y-n.y),s=(t.y-n.y)*(e.x-n.x),o=r-s;if(r>0){if(0>=s)return M.signum(o);i=r+s}else{if(!(0>r))return M.signum(o);if(s>=0)return M.signum(o);i=-r-s}var a=M.DP_SAFE_EPSILON*i;return o>=a||-o>=a?M.signum(o):2},M.signum=function(t){return t>0?1:0>t?-1:0},M.DP_SAFE_EPSILON=1e-15,e(D.prototype,{setOrdinate:function(t,e,n){},size:function(){},getOrdinate:function(t,e){},getCoordinate:function(){if(1===arguments.length){arguments[0]}else if(2===arguments.length){arguments[0],arguments[1]}},getCoordinateCopy:function(t){},getDimension:function(){},getX:function(t){},clone:function(){},expandEnvelope:function(t){},copy:function(){},getY:function(t){},toCoordinateArray:function(){},interfaces_:function(){return[o]},getClass:function(){return D}}),D.X=0,D.Y=1,D.Z=2,D.M=3,A.arraycopy=function(t,e,n,i,r){for(var s=0,o=e;e+r>o;o++)n[i+s]=t[o],s++},A.getProperty=function(t){return{"line.separator":"\n"}[t]},e(F.prototype,{getY:function(){var t=this.y/this.w;if(r.isNaN(t)||r.isInfinite(t))throw new w;return t},getX:function(){var t=this.x/this.w;if(r.isNaN(t)||r.isInfinite(t))throw new w;return t},getCoordinate:function(){var t=new g;return t.x=this.getX(),t.y=this.getY(),t},interfaces_:function(){return[]},getClass:function(){return F}}),F.intersection=function(t,e,n,i){var s=t.y-e.y,o=e.x-t.x,a=t.x*e.y-e.x*t.y,u=n.y-i.y,l=i.x-n.x,h=n.x*i.y-i.x*n.y,c=o*h-l*a,f=u*a-s*h,d=s*l-u*o,p=c/d,v=f/d;if(r.isNaN(p)||r.isInfinite(p)||r.isNaN(v)||r.isInfinite(v))throw new w;return new g(p,v)},e(G.prototype,{create:function(){if(1===arguments.length){if(arguments[0]instanceof Array){arguments[0]}else if(R(arguments[0],D)){arguments[0]}}else if(2===arguments.length){arguments[0],arguments[1]}},interfaces_:function(){return[]},getClass:function(){return G}}),e(q.prototype,{filter:function(t){},interfaces_:function(){return[]},getClass:function(){return q}}),e(B.prototype,{isGeometryCollection:function(){return this.getSortIndex()===B.SORTINDEX_GEOMETRYCOLLECTION},getFactory:function(){return this.factory},getGeometryN:function(t){return this},getArea:function(){return 0},isRectangle:function(){return!1},equals:function(){if(1===arguments.length){if(arguments[0]instanceof B){var t=arguments[0];return null===t?!1:this.equalsTopo(t)}if(arguments[0]instanceof Object){var e=arguments[0];if(!(e instanceof B))return!1;var n=e;return this.equalsExact(n)}}},equalsExact:function(t){return this===t||this.equalsExact(t,0)},geometryChanged:function(){this.apply(B.geometryChangedFilter)},geometryChangedAction:function(){this.envelope=null},equalsNorm:function(t){return null===t?!1:this.norm().equalsExact(t.norm())},getLength:function(){return 0},getNumGeometries:function(){return 1},compareTo:function(){if(1===arguments.length){var t=arguments[0],e=t;return this.getSortIndex()!==e.getSortIndex()?this.getSortIndex()-e.getSortIndex():this.isEmpty()&&e.isEmpty()?0:this.isEmpty()?-1:e.isEmpty()?1:this.compareToSameClass(t)}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=n;return this.getSortIndex()!==e.getSortIndex()?this.getSortIndex()-e.getSortIndex():this.isEmpty()&&e.isEmpty()?0:this.isEmpty()?-1:e.isEmpty()?1:this.compareToSameClass(n,i)}},getUserData:function(){return this.userData},getSRID:function(){return this.SRID},getEnvelope:function(){return this.getFactory().toGeometry(this.getEnvelopeInternal())},checkNotGeometryCollection:function(t){if(t.getSortIndex()===B.SORTINDEX_GEOMETRYCOLLECTION)throw new i("This method does not support GeometryCollection arguments")},equal:function(t,e,n){return 0===n?t.equals(e):t.distance(e)<=n},norm:function(){var t=this.copy();return t.normalize(),t},getPrecisionModel:function(){return this.factory.getPrecisionModel()},getEnvelopeInternal:function(){return null===this.envelope&&(this.envelope=this.computeEnvelopeInternal()),new C(this.envelope)},setSRID:function(t){this.SRID=t},setUserData:function(t){this.userData=t},compare:function(t,e){for(var n=t.iterator(),i=e.iterator();n.hasNext()&&i.hasNext();){var r=n.next(),s=i.next(),o=r.compareTo(s);if(0!==o)return o}return n.hasNext()?1:i.hasNext()?-1:0},hashCode:function(){return this.getEnvelopeInternal().hashCode()},isGeometryCollectionOrDerived:function(){return this.getSortIndex()===B.SORTINDEX_GEOMETRYCOLLECTION||this.getSortIndex()===B.SORTINDEX_MULTIPOINT||this.getSortIndex()===B.SORTINDEX_MULTILINESTRING||this.getSortIndex()===B.SORTINDEX_MULTIPOLYGON},interfaces_:function(){return[o,s,u]},getClass:function(){return B}}),B.hasNonEmptyElements=function(t){for(var e=0;e<t.length;e++)if(!t[e].isEmpty())return!0;return!1},B.hasNullElements=function(t){for(var e=0;e<t.length;e++)if(null===t[e])return!0;return!1},B.serialVersionUID=0x799ea46522854c00,B.SORTINDEX_POINT=0,B.SORTINDEX_MULTIPOINT=1,B.SORTINDEX_LINESTRING=2,B.SORTINDEX_LINEARRING=3,B.SORTINDEX_MULTILINESTRING=4,B.SORTINDEX_POLYGON=5,B.SORTINDEX_MULTIPOLYGON=6,B.SORTINDEX_GEOMETRYCOLLECTION=7,B.geometryChangedFilter={interfaces_:function(){return[q]},filter:function(t){t.geometryChangedAction()}},e(z.prototype,{filter:function(t){},interfaces_:function(){return[]},getClass:function(){return z}}),e(V.prototype,{isInBoundary:function(t){},interfaces_:function(){return[]},getClass:function(){return V}}),e(k.prototype,{isInBoundary:function(t){return t%2===1},interfaces_:function(){return[V]},getClass:function(){return k}}),e(Y.prototype,{isInBoundary:function(t){return t>0},interfaces_:function(){return[V]},getClass:function(){return Y}}),e(U.prototype,{isInBoundary:function(t){return t>1},interfaces_:function(){return[V]},getClass:function(){return U}}),e(X.prototype,{isInBoundary:function(t){return 1===t},interfaces_:function(){return[V]},getClass:function(){return X}}),V.Mod2BoundaryNodeRule=k,V.EndPointBoundaryNodeRule=Y,V.MultiValentEndPointBoundaryNodeRule=U,V.MonoValentEndPointBoundaryNodeRule=X,V.MOD2_BOUNDARY_RULE=new k,V.ENDPOINT_BOUNDARY_RULE=new Y,V.MULTIVALENT_ENDPOINT_BOUNDARY_RULE=new U,V.MONOVALENT_ENDPOINT_BOUNDARY_RULE=new X,V.OGC_SFS_BOUNDARY_RULE=V.MOD2_BOUNDARY_RULE,e(H.prototype,{interfaces_:function(){return[]},getClass:function(){return H}}),H.isRing=function(t){return t.length<4?!1:!!t[0].equals2D(t[t.length-1])},H.ptNotInList=function(t,e){for(var n=0;n<t.length;n++){var i=t[n];if(H.indexOf(i,e)<0)return i}return null},H.scroll=function(t,e){var n=H.indexOf(e,t);if(0>n)return null;var i=new Array(t.length).fill(null);A.arraycopy(t,n,i,0,t.length-n),A.arraycopy(t,0,i,t.length-n,n),A.arraycopy(i,0,t,0,t.length)},H.equals=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(t===e)return!0;if(null===t||null===e)return!1;if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(!t[n].equals(e[n]))return!1;return!0}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];if(i===r)return!0;if(null===i||null===r)return!1;if(i.length!==r.length)return!1;for(var n=0;n<i.length;n++)if(0!==s.compare(i[n],r[n]))return!1;return!0}},H.intersection=function(t,e){for(var n=new N,i=0;i<t.length;i++)e.intersects(t[i])&&n.add(t[i],!0);return n.toCoordinateArray()},H.hasRepeatedPoints=function(t){for(var e=1;e<t.length;e++)if(t[e-1].equals(t[e]))return!0;return!1},H.removeRepeatedPoints=function(t){if(!H.hasRepeatedPoints(t))return t;var e=new N(t,!1);return e.toCoordinateArray()},H.reverse=function(t){for(var e=t.length-1,n=Math.trunc(e/2),i=0;n>=i;i++){var r=t[i];t[i]=t[e-i],t[e-i]=r}},H.removeNull=function(t){for(var e=0,n=0;n<t.length;n++)null!==t[n]&&e++;var i=new Array(e).fill(null);if(0===e)return i;for(var r=0,n=0;n<t.length;n++)null!==t[n]&&(i[r++]=t[n]);return i},H.copyDeep=function(){if(1===arguments.length){for(var t=arguments[0],e=new Array(t.length).fill(null),n=0;n<t.length;n++)e[n]=new g(t[n]);return e}if(5===arguments.length)for(var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3],a=arguments[4],n=0;a>n;n++)s[o+n]=new g(i[r+n])},H.isEqualReversed=function(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=e[t.length-n-1];if(0!==i.compareTo(r))return!1}return!0},H.envelope=function(t){for(var e=new C,n=0;n<t.length;n++)e.expandToInclude(t[n]);return e},H.toCoordinateArray=function(t){return t.toArray(H.coordArrayType)},H.atLeastNCoordinatesOrNothing=function(t,e){return e.length>=t?e:[]},H.indexOf=function(t,e){for(var n=0;n<e.length;n++)if(t.equals(e[n]))return n;return-1},H.increasingDirection=function(t){for(var e=0;e<Math.trunc(t.length/2);e++){var n=t.length-1-e,i=t[e].compareTo(t[n]);if(0!==i)return i}return 1},H.compare=function(t,e){for(var n=0;n<t.length&&n<e.length;){var i=t[n].compareTo(e[n]);if(0!==i)return i;n++}return n<e.length?-1:n<t.length?1:0},H.minCoordinate=function(t){for(var e=null,n=0;n<t.length;n++)(null===e||e.compareTo(t[n])>0)&&(e=t[n]);return e},H.extract=function(t,e,n){e=T.clamp(e,0,t.length),n=T.clamp(n,-1,t.length);var i=n-e+1;0>n&&(i=0),e>=t.length&&(i=0),e>n&&(i=0);var r=new Array(i).fill(null);if(0===i)return r;for(var s=0,o=e;n>=o;o++)r[s++]=t[o];return r},e(W.prototype,{compare:function(t,e){var n=t,i=e;return H.compare(n,i)},interfaces_:function(){return[a]},getClass:function(){return W}}),e(j.prototype,{compare:function(t,e){var n=t,i=e;if(n.length<i.length)return-1;if(n.length>i.length)return 1;if(0===n.length)return 0;var r=H.compare(n,i),s=H.isEqualReversed(n,i);return s?0:r},OLDcompare:function(t,e){var n=t,i=e;if(n.length<i.length)return-1;if(n.length>i.length)return 1;if(0===n.length)return 0;for(var r=H.increasingDirection(n),s=H.increasingDirection(i),o=r>0?0:n.length-1,a=s>0?0:n.length-1,u=0;u<n.length;u++){var l=n[o].compareTo(i[a]);if(0!==l)return l;o+=r,a+=s}return 0},interfaces_:function(){return[a]},getClass:function(){return j}}),H.ForwardComparator=W,H.BidirectionalComparator=j,H.coordArrayType=new Array(0).fill(null),K.prototype.get=function(){},K.prototype.put=function(){},K.prototype.size=function(){},K.prototype.values=function(){},K.prototype.entrySet=function(){},Z.prototype=new K,Q.prototype=new v,Q.prototype.contains=function(){},J.prototype=new Q,J.prototype.contains=function(t){for(var e=0,n=this.array_.length;n>e;e++){var i=this.array_[e];if(i===t)return!0}return!1},J.prototype.add=function(t){return this.contains(t)?!1:(this.array_.push(t),!0)},J.prototype.addAll=function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next());return!0},J.prototype.remove=function(t){throw new javascript.util.OperationNotSupported},J.prototype.size=function(){return this.array_.length},J.prototype.isEmpty=function(){return 0===this.array_.length},J.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},J.prototype.iterator=function(){return new Js(this)};var Js=function(t){this.hashSet_=t,this.position_=0};Js.prototype.next=function(){if(this.position_===this.hashSet_.size())throw new x;return this.hashSet_.array_[this.position_++]},Js.prototype.hasNext=function(){return this.position_<this.hashSet_.size()},Js.prototype.remove=function(){throw new E};var $s=0,to=1;rt.prototype=new Z,rt.prototype.get=function(t){for(var e=this.root_;null!==e;){var n=t.compareTo(e.key);if(0>n)e=e.left;else{if(!(n>0))return e.value;e=e.right}}return null},rt.prototype.put=function(t,e){if(null===this.root_)return this.root_={key:t,value:e,left:null,right:null,parent:null,color:$s,getValue:function(){return this.value},getKey:function(){return this.key}},this.size_=1,null;var n,i,r=this.root_;do if(n=r,i=t.compareTo(r.key),0>i)r=r.left;else{if(!(i>0)){var s=r.value;return r.value=e,s}r=r.right}while(null!==r);var o={key:t,left:null,right:null,value:e,parent:n,color:$s,getValue:function(){return this.value},getKey:function(){return this.key}};return 0>i?n.left=o:n.right=o,this.fixAfterInsertion(o),this.size_++,null},rt.prototype.fixAfterInsertion=function(t){for(t.color=to;null!=t&&t!=this.root_&&t.parent.color==to;)if(tt(t)==nt(tt(tt(t)))){var e=it(tt(tt(t)));$(e)==to?(et(tt(t),$s),et(e,$s),et(tt(tt(t)),to),t=tt(tt(t))):(t==it(tt(t))&&(t=tt(t),this.rotateLeft(t)),et(tt(t),$s),et(tt(tt(t)),to),this.rotateRight(tt(tt(t))))}else{var e=nt(tt(tt(t)));$(e)==to?(et(tt(t),$s),et(e,$s),et(tt(tt(t)),to),t=tt(tt(t))):(t==nt(tt(t))&&(t=tt(t),this.rotateRight(t)),et(tt(t),$s),et(tt(tt(t)),to),this.rotateLeft(tt(tt(t))))}this.root_.color=$s},rt.prototype.values=function(){var t=new I,e=this.getFirstEntry();if(null!==e)for(t.add(e.value);null!==(e=rt.successor(e));)t.add(e.value);return t},rt.prototype.entrySet=function(){var t=new J,e=this.getFirstEntry();if(null!==e)for(t.add(e);null!==(e=rt.successor(e));)t.add(e);return t},rt.prototype.rotateLeft=function(t){if(null!=t){var e=t.right;t.right=e.left,null!=e.left&&(e.left.parent=t),e.parent=t.parent,null==t.parent?this.root_=e:t.parent.left==t?t.parent.left=e:t.parent.right=e,e.left=t,t.parent=e}},rt.prototype.rotateRight=function(t){if(null!=t){var e=t.left;t.left=e.right,null!=e.right&&(e.right.parent=t),e.parent=t.parent,null==t.parent?this.root_=e:t.parent.right==t?t.parent.right=e:t.parent.left=e,e.right=t,t.parent=e}},rt.prototype.getFirstEntry=function(){var t=this.root_;if(null!=t)for(;null!=t.left;)t=t.left;return t},rt.successor=function(t){if(null===t)return null;if(null!==t.right){for(var e=t.right;null!==e.left;)e=e.left;return e}for(var e=t.parent,n=t;null!==e&&n===e.right;)n=e,e=e.parent;return e},rt.prototype.size=function(){return this.size_},e(st.prototype,{interfaces_:function(){return[]},getClass:function(){return st}}),ot.prototype=new Q,at.prototype=new ot,at.prototype.contains=function(t){for(var e=0,n=this.array_.length;n>e;e++){var i=this.array_[e];if(0===i.compareTo(t))return!0}return!1},at.prototype.add=function(t){if(this.contains(t))return!1;for(var e=0,n=this.array_.length;n>e;e++){var i=this.array_[e];if(1===i.compareTo(t))return this.array_.splice(e,0,t),!0}return this.array_.push(t),!0},at.prototype.addAll=function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next());return!0},at.prototype.remove=function(t){throw new E},at.prototype.size=function(){return this.array_.length},at.prototype.isEmpty=function(){return 0===this.array_.length},at.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},at.prototype.iterator=function(){return new eo(this)};var eo=function(t){this.treeSet_=t,this.position_=0};eo.prototype.next=function(){if(this.position_===this.treeSet_.size())throw new x;return this.treeSet_.array_[this.position_++]},eo.prototype.hasNext=function(){return this.position_<this.treeSet_.size()},eo.prototype.remove=function(){throw new E},ut.sort=function(){var t,e,n,i,r=arguments[0];if(1===arguments.length)return i=function(t,e){return t.compareTo(e)},void r.sort(i);if(2===arguments.length)n=arguments[1],i=function(t,e){return n.compare(t,e)},r.sort(i);else{if(3===arguments.length){e=r.slice(arguments[1],arguments[2]),e.sort();var s=r.slice(0,arguments[1]).concat(e,r.slice(arguments[2],r.length));for(r.splice(0,r.length),t=0;t<s.length;t++)r.push(s[t]);return}if(4===arguments.length){for(e=r.slice(arguments[1],arguments[2]),n=arguments[3],i=function(t,e){return n.compare(t,e)},e.sort(i),s=r.slice(0,arguments[1]).concat(e,r.slice(arguments[2],r.length)),r.splice(0,r.length),t=0;t<s.length;t++)r.push(s[t]);return}}},ut.asList=function(t){for(var e=new I,n=0,i=t.length;i>n;n++)e.add(t[n]);return e},e(lt.prototype,{interfaces_:function(){return[]},getClass:function(){return lt}}),lt.toDimensionSymbol=function(t){switch(t){case lt.FALSE:return lt.SYM_FALSE;case lt.TRUE:return lt.SYM_TRUE;case lt.DONTCARE:return lt.SYM_DONTCARE;case lt.P:return lt.SYM_P;case lt.L:return lt.SYM_L;case lt.A:return lt.SYM_A}throw new i("Unknown dimension value: "+t)},lt.toDimensionValue=function(t){switch(O.toUpperCase(t)){case lt.SYM_FALSE:return lt.FALSE;case lt.SYM_TRUE:return lt.TRUE;case lt.SYM_DONTCARE:return lt.DONTCARE;case lt.SYM_P:return lt.P;case lt.SYM_L:return lt.L;case lt.SYM_A:return lt.A}throw new i("Unknown dimension symbol: "+t)},lt.P=0,lt.L=1,lt.A=2,lt.FALSE=-1,lt.TRUE=-2,lt.DONTCARE=-3,lt.SYM_FALSE="F",lt.SYM_TRUE="T",lt.SYM_DONTCARE="*",lt.SYM_P="0",lt.SYM_L="1",lt.SYM_A="2",e(ht.prototype,{filter:function(t){},interfaces_:function(){return[]},getClass:function(){return ht}}),e(ct.prototype,{filter:function(t,e){},isDone:function(){},isGeometryChanged:function(){},interfaces_:function(){return[]},getClass:function(){return ct}}),h(ft,B),e(ft.prototype,{computeEnvelopeInternal:function(){for(var t=new C,e=0;e<this.geometries.length;e++)t.expandToInclude(this.geometries[e].getEnvelopeInternal());return t},getGeometryN:function(t){return this.geometries[t]},getSortIndex:function(){return B.SORTINDEX_GEOMETRYCOLLECTION},getCoordinates:function(){for(var t=new Array(this.getNumPoints()).fill(null),e=-1,n=0;n<this.geometries.length;n++)for(var i=this.geometries[n].getCoordinates(),r=0;r<i.length;r++)e++,t[e]=i[r];return t},getArea:function(){for(var t=0,e=0;e<this.geometries.length;e++)t+=this.geometries[e].getArea();return t},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t;if(this.geometries.length!==n.geometries.length)return!1;for(var i=0;i<this.geometries.length;i++)if(!this.geometries[i].equalsExact(n.geometries[i],e))return!1;return!0}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){for(var t=0;t<this.geometries.length;t++)this.geometries[t].normalize();ut.sort(this.geometries)},getCoordinate:function(){return this.isEmpty()?null:this.geometries[0].getCoordinate()},getBoundaryDimension:function(){for(var t=lt.FALSE,e=0;e<this.geometries.length;e++)t=Math.max(t,this.geometries[e].getBoundaryDimension());return t},getDimension:function(){for(var t=lt.FALSE,e=0;e<this.geometries.length;e++)t=Math.max(t,this.geometries[e].getDimension());return t},getLength:function(){for(var t=0,e=0;e<this.geometries.length;e++)t+=this.geometries[e].getLength();return t},getNumPoints:function(){for(var t=0,e=0;e<this.geometries.length;e++)t+=this.geometries[e].getNumPoints();return t},getNumGeometries:function(){return this.geometries.length},reverse:function(){for(var t=this.geometries.length,e=new Array(t).fill(null),n=0;n<this.geometries.length;n++)e[n]=this.geometries[n].reverse();return this.getFactory().createGeometryCollection(e)},compareToSameClass:function(){if(1===arguments.length){var t=arguments[0],e=new at(ut.asList(this.geometries)),n=new at(ut.asList(t.geometries));return this.compare(e,n)}if(2===arguments.length){for(var i=arguments[0],r=arguments[1],s=i,o=this.getNumGeometries(),a=s.getNumGeometries(),u=0;o>u&&a>u;){var l=this.getGeometryN(u),h=s.getGeometryN(u),c=l.compareToSameClass(h,r);if(0!==c)return c;u++}return o>u?1:a>u?-1:0}},apply:function(){if(R(arguments[0],z))for(var t=arguments[0],e=0;e<this.geometries.length;e++)this.geometries[e].apply(t);else if(R(arguments[0],ct)){var n=arguments[0];if(0===this.geometries.length)return null;for(var e=0;e<this.geometries.length&&(this.geometries[e].apply(n),!n.isDone());e++);n.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var i=arguments[0];i.filter(this);for(var e=0;e<this.geometries.length;e++)this.geometries[e].apply(i)}else if(R(arguments[0],q)){var r=arguments[0];r.filter(this);for(var e=0;e<this.geometries.length;e++)this.geometries[e].apply(r)}},getBoundary:function(){return this.checkNotGeometryCollection(this),f.shouldNeverReachHere(),null},clone:function(){var t=B.prototype.clone.call(this);t.geometries=new Array(this.geometries.length).fill(null);for(var e=0;e<this.geometries.length;e++)t.geometries[e]=this.geometries[e].clone();return t},getGeometryType:function(){return"GeometryCollection"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new ft(t,this.factory)},isEmpty:function(){for(var t=0;t<this.geometries.length;t++)if(!this.geometries[t].isEmpty())return!1;return!0},interfaces_:function(){return[]},getClass:function(){return ft}}),ft.serialVersionUID=-0x4f07bcb1f857d800,h(gt,ft),e(gt.prototype,{getSortIndex:function(){return B.SORTINDEX_MULTILINESTRING},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?ft.prototype.equalsExact.call(this,t,e):!1}return ft.prototype.equalsExact.apply(this,arguments)},getBoundaryDimension:function(){return this.isClosed()?lt.FALSE:0},isClosed:function(){if(this.isEmpty())return!1;for(var t=0;t<this.geometries.length;t++)if(!this.geometries[t].isClosed())return!1;return!0},getDimension:function(){return 1},reverse:function(){for(var t=this.geometries.length,e=new Array(t).fill(null),n=0;n<this.geometries.length;n++)e[t-1-n]=this.geometries[n].reverse();return this.getFactory().createMultiLineString(e)},getBoundary:function(){return new dt(this).getBoundary()},getGeometryType:function(){return"MultiLineString"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new gt(t,this.factory)},interfaces_:function(){
return[st]},getClass:function(){return gt}}),gt.serialVersionUID=0x7155d2ab4afa8000,e(dt.prototype,{boundaryMultiLineString:function(t){if(this.geom.isEmpty())return this.getEmptyMultiPoint();var e=this.computeBoundaryCoordinates(t);return 1===e.length?this.geomFact.createPoint(e[0]):this.geomFact.createMultiPointFromCoords(e)},getBoundary:function(){return this.geom instanceof St?this.boundaryLineString(this.geom):this.geom instanceof gt?this.boundaryMultiLineString(this.geom):this.geom.getBoundary()},boundaryLineString:function(t){if(this.geom.isEmpty())return this.getEmptyMultiPoint();if(t.isClosed()){var e=this.bnRule.isInBoundary(2);return e?t.getStartPoint():this.geomFact.createMultiPoint()}return this.geomFact.createMultiPoint([t.getStartPoint(),t.getEndPoint()])},getEmptyMultiPoint:function(){return this.geomFact.createMultiPoint()},computeBoundaryCoordinates:function(t){var e=new I;this.endpointMap=new rt;for(var n=0;n<t.getNumGeometries();n++){var i=t.getGeometryN(n);0!==i.getNumPoints()&&(this.addEndpoint(i.getCoordinateN(0)),this.addEndpoint(i.getCoordinateN(i.getNumPoints()-1)))}for(var r=this.endpointMap.entrySet().iterator();r.hasNext();){var s=r.next(),o=s.getValue(),a=o.count;this.bnRule.isInBoundary(a)&&e.add(s.getKey())}return H.toCoordinateArray(e)},addEndpoint:function(t){var e=this.endpointMap.get(t);null===e&&(e=new pt,this.endpointMap.put(t,e)),e.count++},interfaces_:function(){return[]},getClass:function(){return dt}}),dt.getBoundary=function(){if(1===arguments.length){var t=arguments[0],e=new dt(t);return e.getBoundary()}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=new dt(n,i);return e.getBoundary()}},e(pt.prototype,{interfaces_:function(){return[]},getClass:function(){return pt}}),e(Nt.prototype,{interfaces_:function(){return[]},getClass:function(){return Nt}}),Nt.chars=function(t,e){for(var n=new Array(e).fill(null),i=0;e>i;i++)n[i]=t;return new String(n)},Nt.getStackTrace=function(){if(1===arguments.length){var t=arguments[0],e=new xt,n=new vt(e);return t.printStackTrace(n),e.toString()}if(2===arguments.length){for(var i=arguments[0],r=arguments[1],s="",o=new mt(Nt.getStackTrace(i)),a=new It(o),u=0;r>u;u++)try{s+=a.readLine()+Nt.NEWLINE}catch(t){if(!(t instanceof Et))throw t;f.shouldNeverReachHere()}finally{}return s}},Nt.split=function(t,e){for(var n=e.length,i=new I,r=""+t,s=r.indexOf(e);s>=0;){var o=r.substring(0,s);i.add(o),r=r.substring(s+n),s=r.indexOf(e)}r.length>0&&i.add(r);for(var a=new Array(i.size()).fill(null),u=0;u<a.length;u++)a[u]=i.get(u);return a},Nt.toString=function(){if(1===arguments.length){var t=arguments[0];return Nt.SIMPLE_ORDINATE_FORMAT.format(t)}},Nt.spaces=function(t){return Nt.chars(" ",t)},Nt.NEWLINE=A.getProperty("line.separator"),Nt.SIMPLE_ORDINATE_FORMAT=new yt("0.#"),e(Ct.prototype,{interfaces_:function(){return[]},getClass:function(){return Ct}}),Ct.copyCoord=function(t,e,n,i){for(var r=Math.min(t.getDimension(),n.getDimension()),s=0;r>s;s++)n.setOrdinate(i,s,t.getOrdinate(e,s))},Ct.isRing=function(t){var e=t.size();return 0===e?!0:3>=e?!1:t.getOrdinate(0,D.X)===t.getOrdinate(e-1,D.X)&&t.getOrdinate(0,D.Y)===t.getOrdinate(e-1,D.Y)},Ct.isEqual=function(t,e){var n=t.size(),i=e.size();if(n!==i)return!1;for(var s=Math.min(t.getDimension(),e.getDimension()),o=0;n>o;o++)for(var a=0;s>a;a++){var u=t.getOrdinate(o,a),l=e.getOrdinate(o,a);if(!(t.getOrdinate(o,a)===e.getOrdinate(o,a)||r.isNaN(u)&&r.isNaN(l)))return!1}return!0},Ct.extend=function(t,e,n){var i=t.create(n,e.getDimension()),r=e.size();if(Ct.copy(e,0,i,0,r),r>0)for(var s=r;n>s;s++)Ct.copy(e,r-1,i,s,1);return i},Ct.reverse=function(t){for(var e=t.size()-1,n=Math.trunc(e/2),i=0;n>=i;i++)Ct.swap(t,i,e-i)},Ct.swap=function(t,e,n){if(e===n)return null;for(var i=0;i<t.getDimension();i++){var r=t.getOrdinate(e,i);t.setOrdinate(e,i,t.getOrdinate(n,i)),t.setOrdinate(n,i,r)}},Ct.copy=function(t,e,n,i,r){for(var s=0;r>s;s++)Ct.copyCoord(t,e+s,n,i+s)},Ct.toString=function(){if(1===arguments.length){var t=arguments[0],e=t.size();if(0===e)return"()";var n=t.getDimension(),i=new P;i.append("(");for(var r=0;e>r;r++){r>0&&i.append(" ");for(var s=0;n>s;s++)s>0&&i.append(","),i.append(Nt.toString(t.getOrdinate(r,s)))}return i.append(")"),i.toString()}},Ct.ensureValidRing=function(t,e){var n=e.size();if(0===n)return e;if(3>=n)return Ct.createClosedRing(t,e,4);var i=e.getOrdinate(0,D.X)===e.getOrdinate(n-1,D.X)&&e.getOrdinate(0,D.Y)===e.getOrdinate(n-1,D.Y);return i?e:Ct.createClosedRing(t,e,n+1)},Ct.createClosedRing=function(t,e,n){var i=t.create(n,e.getDimension()),r=e.size();Ct.copy(e,0,i,0,r);for(var s=r;n>s;s++)Ct.copy(e,0,i,s,1);return i},h(St,B),e(St.prototype,{computeEnvelopeInternal:function(){return this.isEmpty()?new C:this.points.expandEnvelope(new C)},isRing:function(){return this.isClosed()&&this.isSimple()},getSortIndex:function(){return B.SORTINDEX_LINESTRING},getCoordinates:function(){return this.points.toCoordinateArray()},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t;if(this.points.size()!==n.points.size())return!1;for(var i=0;i<this.points.size();i++)if(!this.equal(this.points.getCoordinate(i),n.points.getCoordinate(i),e))return!1;return!0}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){for(var t=0;t<Math.trunc(this.points.size()/2);t++){var e=this.points.size()-1-t;if(!this.points.getCoordinate(t).equals(this.points.getCoordinate(e)))return this.points.getCoordinate(t).compareTo(this.points.getCoordinate(e))>0&&Ct.reverse(this.points),null}},getCoordinate:function(){return this.isEmpty()?null:this.points.getCoordinate(0)},getBoundaryDimension:function(){return this.isClosed()?lt.FALSE:0},isClosed:function(){return this.isEmpty()?!1:this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints()-1))},getEndPoint:function(){return this.isEmpty()?null:this.getPointN(this.getNumPoints()-1)},getDimension:function(){return 1},getLength:function(){return he.computeLength(this.points)},getNumPoints:function(){return this.points.size()},reverse:function(){var t=this.points.copy();Ct.reverse(t);var e=this.getFactory().createLineString(t);return e},compareToSameClass:function(){if(1===arguments.length){for(var t=arguments[0],e=t,n=0,i=0;n<this.points.size()&&i<e.points.size();){var r=this.points.getCoordinate(n).compareTo(e.points.getCoordinate(i));if(0!==r)return r;n++,i++}return n<this.points.size()?1:i<e.points.size()?-1:0}if(2===arguments.length){var s=arguments[0],o=arguments[1],e=s;return o.compare(this.points,e.points)}},apply:function(){if(R(arguments[0],z))for(var t=arguments[0],e=0;e<this.points.size();e++)t.filter(this.points.getCoordinate(e));else if(R(arguments[0],ct)){var n=arguments[0];if(0===this.points.size())return null;for(var e=0;e<this.points.size()&&(n.filter(this.points,e),!n.isDone());e++);n.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var i=arguments[0];i.filter(this)}else if(R(arguments[0],q)){var r=arguments[0];r.filter(this)}},getBoundary:function(){return new dt(this).getBoundary()},isEquivalentClass:function(t){return t instanceof St},clone:function(){var t=B.prototype.clone.call(this);return t.points=this.points.clone(),t},getCoordinateN:function(t){return this.points.getCoordinate(t)},getGeometryType:function(){return"LineString"},copy:function(){return new St(this.points.copy(),this.factory)},getCoordinateSequence:function(){return this.points},isEmpty:function(){return 0===this.points.size()},init:function(t){if(null===t&&(t=this.getFactory().getCoordinateSequenceFactory().create([])),1===t.size())throw new i("Invalid number of points in LineString (found "+t.size()+" - must be 0 or >= 2)");this.points=t},isCoordinate:function(t){for(var e=0;e<this.points.size();e++)if(this.points.getCoordinate(e).equals(t))return!0;return!1},getStartPoint:function(){return this.isEmpty()?null:this.getPointN(0)},getPointN:function(t){return this.getFactory().createPoint(this.points.getCoordinate(t))},interfaces_:function(){return[st]},getClass:function(){return St}}),St.serialVersionUID=0x2b2b51ba435c8e00,e(wt.prototype,{interfaces_:function(){return[]},getClass:function(){return wt}}),h(Lt,B),e(Lt.prototype,{computeEnvelopeInternal:function(){if(this.isEmpty())return new C;var t=new C;return t.expandToInclude(this.coordinates.getX(0),this.coordinates.getY(0)),t},getSortIndex:function(){return B.SORTINDEX_POINT},getCoordinates:function(){return this.isEmpty()?[]:[this.getCoordinate()]},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?this.isEmpty()&&t.isEmpty()?!0:this.isEmpty()!==t.isEmpty()?!1:this.equal(t.getCoordinate(),this.getCoordinate(),e):!1}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){},getCoordinate:function(){return 0!==this.coordinates.size()?this.coordinates.getCoordinate(0):null},getBoundaryDimension:function(){return lt.FALSE},getDimension:function(){return 0},getNumPoints:function(){return this.isEmpty()?0:1},reverse:function(){return this.copy()},getX:function(){if(null===this.getCoordinate())throw new IllegalStateException("getX called on empty Point");return this.getCoordinate().x},compareToSameClass:function(){if(1===arguments.length){var t=arguments[0],e=t;return this.getCoordinate().compareTo(e.getCoordinate())}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=n;return i.compare(this.coordinates,e.coordinates)}},apply:function(){if(R(arguments[0],z)){var t=arguments[0];if(this.isEmpty())return null;t.filter(this.getCoordinate())}else if(R(arguments[0],ct)){var e=arguments[0];if(this.isEmpty())return null;e.filter(this.coordinates,0),e.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var n=arguments[0];n.filter(this)}else if(R(arguments[0],q)){var i=arguments[0];i.filter(this)}},getBoundary:function(){return this.getFactory().createGeometryCollection(null)},clone:function(){var t=B.prototype.clone.call(this);return t.coordinates=this.coordinates.clone(),t},getGeometryType:function(){return"Point"},copy:function(){return new Lt(this.coordinates.copy(),this.factory)},getCoordinateSequence:function(){return this.coordinates},getY:function(){if(null===this.getCoordinate())throw new IllegalStateException("getY called on empty Point");return this.getCoordinate().y},isEmpty:function(){return 0===this.coordinates.size()},init:function(t){null===t&&(t=this.getFactory().getCoordinateSequenceFactory().create([])),f.isTrue(t.size()<=1),this.coordinates=t},isSimple:function(){return!0},interfaces_:function(){return[wt]},getClass:function(){return Lt}}),Lt.serialVersionUID=0x44077bad161cbc00,e(Rt.prototype,{interfaces_:function(){return[]},getClass:function(){return Rt}}),h(Tt,B),e(Tt.prototype,{computeEnvelopeInternal:function(){return this.shell.getEnvelopeInternal()},getSortIndex:function(){return B.SORTINDEX_POLYGON},getCoordinates:function(){if(this.isEmpty())return[];for(var t=new Array(this.getNumPoints()).fill(null),e=-1,n=this.shell.getCoordinates(),i=0;i<n.length;i++)e++,t[e]=n[i];for(var r=0;r<this.holes.length;r++)for(var s=this.holes[r].getCoordinates(),o=0;o<s.length;o++)e++,t[e]=s[o];return t},getArea:function(){var t=0;t+=Math.abs(he.signedArea(this.shell.getCoordinateSequence()));for(var e=0;e<this.holes.length;e++)t-=Math.abs(he.signedArea(this.holes[e].getCoordinateSequence()));return t},isRectangle:function(){if(0!==this.getNumInteriorRing())return!1;if(null===this.shell)return!1;if(5!==this.shell.getNumPoints())return!1;for(var t=this.shell.getCoordinateSequence(),e=this.getEnvelopeInternal(),n=0;5>n;n++){var i=t.getX(n);if(i!==e.getMinX()&&i!==e.getMaxX())return!1;var r=t.getY(n);if(r!==e.getMinY()&&r!==e.getMaxY())return!1}for(var s=t.getX(0),o=t.getY(0),n=1;4>=n;n++){var i=t.getX(n),r=t.getY(n),a=i!==s,u=r!==o;if(a===u)return!1;s=i,o=r}return!0},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t,i=this.shell,r=n.shell;if(!i.equalsExact(r,e))return!1;if(this.holes.length!==n.holes.length)return!1;for(var s=0;s<this.holes.length;s++)if(!this.holes[s].equalsExact(n.holes[s],e))return!1;return!0}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){if(0===arguments.length){this.normalize(this.shell,!0);for(var t=0;t<this.holes.length;t++)this.normalize(this.holes[t],!1);ut.sort(this.holes)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(e.isEmpty())return null;var i=new Array(e.getCoordinates().length-1).fill(null);A.arraycopy(e.getCoordinates(),0,i,0,i.length);var r=H.minCoordinate(e.getCoordinates());H.scroll(i,r),A.arraycopy(i,0,e.getCoordinates(),0,i.length),e.getCoordinates()[i.length]=i[0],he.isCCW(e.getCoordinates())===n&&H.reverse(e.getCoordinates())}},getCoordinate:function(){return this.shell.getCoordinate()},getNumInteriorRing:function(){return this.holes.length},getBoundaryDimension:function(){return 1},getDimension:function(){return 2},getLength:function(){var t=0;t+=this.shell.getLength();for(var e=0;e<this.holes.length;e++)t+=this.holes[e].getLength();return t},getNumPoints:function(){for(var t=this.shell.getNumPoints(),e=0;e<this.holes.length;e++)t+=this.holes[e].getNumPoints();return t},reverse:function(){var t=this.copy();t.shell=this.shell.copy().reverse(),t.holes=new Array(this.holes.length).fill(null);for(var e=0;e<this.holes.length;e++)t.holes[e]=this.holes[e].copy().reverse();return t},convexHull:function(){return this.getExteriorRing().convexHull()},compareToSameClass:function(){if(1===arguments.length){var t=arguments[0],e=this.shell,n=t.shell;return e.compareToSameClass(n)}if(2===arguments.length){var i=arguments[0],r=arguments[1],s=i,e=this.shell,n=s.shell,o=e.compareToSameClass(n,r);if(0!==o)return o;for(var a=this.getNumInteriorRing(),u=s.getNumInteriorRing(),l=0;a>l&&u>l;){var h=this.getInteriorRingN(l),c=s.getInteriorRingN(l),f=h.compareToSameClass(c,r);if(0!==f)return f;l++}return a>l?1:u>l?-1:0}},apply:function(){if(R(arguments[0],z)){var t=arguments[0];this.shell.apply(t);for(var e=0;e<this.holes.length;e++)this.holes[e].apply(t)}else if(R(arguments[0],ct)){var n=arguments[0];if(this.shell.apply(n),!n.isDone())for(var e=0;e<this.holes.length&&(this.holes[e].apply(n),!n.isDone());e++);n.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var i=arguments[0];i.filter(this)}else if(R(arguments[0],q)){var r=arguments[0];r.filter(this),this.shell.apply(r);for(var e=0;e<this.holes.length;e++)this.holes[e].apply(r)}},getBoundary:function(){if(this.isEmpty())return this.getFactory().createMultiLineString();var t=new Array(this.holes.length+1).fill(null);t[0]=this.shell;for(var e=0;e<this.holes.length;e++)t[e+1]=this.holes[e];return t.length<=1?this.getFactory().createLinearRing(t[0].getCoordinateSequence()):this.getFactory().createMultiLineString(t)},clone:function(){var t=B.prototype.clone.call(this);t.shell=this.shell.clone(),t.holes=new Array(this.holes.length).fill(null);for(var e=0;e<this.holes.length;e++)t.holes[e]=this.holes[e].clone();return t},getGeometryType:function(){return"Polygon"},copy:function(){for(var t=this.shell.copy(),e=new Array(this.holes.length).fill(null),n=0;n<e.length;n++)e[n]=this.holes[n].copy();return new Tt(t,e,this.factory)},getExteriorRing:function(){return this.shell},isEmpty:function(){return this.shell.isEmpty()},getInteriorRingN:function(t){return this.holes[t]},interfaces_:function(){return[Rt]},getClass:function(){return Tt}}),Tt.serialVersionUID=-0x307ffefd8dc97200,h(Pt,ft),e(Pt.prototype,{getSortIndex:function(){return B.SORTINDEX_MULTIPOINT},isValid:function(){return!0},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?ft.prototype.equalsExact.call(this,t,e):!1}return ft.prototype.equalsExact.apply(this,arguments)},getCoordinate:function(){if(1===arguments.length){var t=arguments[0];return this.geometries[t].getCoordinate()}return ft.prototype.getCoordinate.apply(this,arguments)},getBoundaryDimension:function(){return lt.FALSE},getDimension:function(){return 0},getBoundary:function(){return this.getFactory().createGeometryCollection(null)},getGeometryType:function(){return"MultiPoint"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new Pt(t,this.factory)},interfaces_:function(){return[wt]},getClass:function(){return Pt}}),Pt.serialVersionUID=-0x6fb1ed4162e0fc00,h(bt,St),e(bt.prototype,{getSortIndex:function(){return B.SORTINDEX_LINEARRING},getBoundaryDimension:function(){return lt.FALSE},isClosed:function(){return this.isEmpty()?!0:St.prototype.isClosed.call(this)},reverse:function(){var t=this.points.copy();Ct.reverse(t);var e=this.getFactory().createLinearRing(t);return e},validateConstruction:function(){if(!this.isEmpty()&&!St.prototype.isClosed.call(this))throw new i("Points of LinearRing do not form a closed linestring");if(this.getCoordinateSequence().size()>=1&&this.getCoordinateSequence().size()<bt.MINIMUM_VALID_SIZE)throw new i("Invalid number of points in LinearRing (found "+this.getCoordinateSequence().size()+" - must be 0 or >= 4)")},getGeometryType:function(){return"LinearRing"},copy:function(){return new bt(this.points.copy(),this.factory)},interfaces_:function(){return[]},getClass:function(){return bt}}),bt.MINIMUM_VALID_SIZE=4,bt.serialVersionUID=-0x3b229e262367a600,h(Ot,ft),e(Ot.prototype,{getSortIndex:function(){return B.SORTINDEX_MULTIPOLYGON},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?ft.prototype.equalsExact.call(this,t,e):!1}return ft.prototype.equalsExact.apply(this,arguments)},getBoundaryDimension:function(){return 1},getDimension:function(){return 2},reverse:function(){for(var t=this.geometries.length,e=new Array(t).fill(null),n=0;n<this.geometries.length;n++)e[n]=this.geometries[n].reverse();return this.getFactory().createMultiPolygon(e)},getBoundary:function(){if(this.isEmpty())return this.getFactory().createMultiLineString();for(var t=new I,e=0;e<this.geometries.length;e++)for(var n=this.geometries[e],i=n.getBoundary(),r=0;r<i.getNumGeometries();r++)t.add(i.getGeometryN(r));var s=new Array(t.size()).fill(null);return this.getFactory().createMultiLineString(t.toArray(s))},getGeometryType:function(){return"MultiPolygon"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new Ot(t,this.factory)},interfaces_:function(){return[Rt]},getClass:function(){return Ot}}),Ot.serialVersionUID=-0x7a5aa1369171980,e(_t.prototype,{setCopyUserData:function(t){this.isUserDataCopied=t},edit:function(t,e){if(null===t)return null;var n=this.editInternal(t,e);return this.isUserDataCopied&&n.setUserData(t.getUserData()),n},editInternal:function(t,e){return null===this.factory&&(this.factory=t.getFactory()),t instanceof ft?this.editGeometryCollection(t,e):t instanceof Tt?this.editPolygon(t,e):t instanceof Lt?e.edit(t,this.factory):t instanceof St?e.edit(t,this.factory):(f.shouldNeverReachHere("Unsupported Geometry class: "+t.getClass().getName()),null)},editGeometryCollection:function(t,e){for(var n=e.edit(t,this.factory),i=new I,r=0;r<n.getNumGeometries();r++){var s=this.edit(n.getGeometryN(r),e);null===s||s.isEmpty()||i.add(s)}return n.getClass()===Pt?this.factory.createMultiPoint(i.toArray([])):n.getClass()===gt?this.factory.createMultiLineString(i.toArray([])):n.getClass()===Ot?this.factory.createMultiPolygon(i.toArray([])):this.factory.createGeometryCollection(i.toArray([]))},editPolygon:function(t,e){var n=e.edit(t,this.factory);if(null===n&&(n=this.factory.createPolygon(null)),n.isEmpty())return n;var i=this.edit(n.getExteriorRing(),e);if(null===i||i.isEmpty())return this.factory.createPolygon();for(var r=new I,s=0;s<n.getNumInteriorRing();s++){var o=this.edit(n.getInteriorRingN(s),e);null===o||o.isEmpty()||r.add(o)}return this.factory.createPolygon(i,r.toArray([]))},interfaces_:function(){return[]},getClass:function(){return _t}}),_t.GeometryEditorOperation=Mt,e(Dt.prototype,{edit:function(t,e){return t},interfaces_:function(){return[Mt]},getClass:function(){return Dt}}),e(At.prototype,{edit:function(t,e){if(t instanceof bt)return e.createLinearRing(this.editCoordinates(t.getCoordinates(),t));if(t instanceof St)return e.createLineString(this.editCoordinates(t.getCoordinates(),t));if(t instanceof Lt){var n=this.editCoordinates(t.getCoordinates(),t);return n.length>0?e.createPoint(n[0]):e.createPoint()}return t},interfaces_:function(){return[Mt]},getClass:function(){return At}}),e(Ft.prototype,{edit:function(t,e){return t instanceof bt?e.createLinearRing(this.edit(t.getCoordinateSequence(),t)):t instanceof St?e.createLineString(this.edit(t.getCoordinateSequence(),t)):t instanceof Lt?e.createPoint(this.edit(t.getCoordinateSequence(),t)):t},interfaces_:function(){return[Mt]},getClass:function(){return Ft}}),_t.NoOpGeometryOperation=Dt,_t.CoordinateOperation=At,_t.CoordinateSequenceOperation=Ft,e(Gt.prototype,{setOrdinate:function(t,e,n){switch(e){case D.X:this.coordinates[t].x=n;break;case D.Y:this.coordinates[t].y=n;break;case D.Z:this.coordinates[t].z=n;break;default:throw new i("invalid ordinateIndex")}},size:function(){return this.coordinates.length},getOrdinate:function(t,e){switch(e){case D.X:return this.coordinates[t].x;case D.Y:return this.coordinates[t].y;case D.Z:return this.coordinates[t].z}return r.NaN},getCoordinate:function(){if(1===arguments.length){var t=arguments[0];return this.coordinates[t]}if(2===arguments.length){var e=arguments[0],n=arguments[1];n.x=this.coordinates[e].x,n.y=this.coordinates[e].y,n.z=this.coordinates[e].z}},getCoordinateCopy:function(t){return new g(this.coordinates[t])},getDimension:function(){return this.dimension},getX:function(t){return this.coordinates[t].x},clone:function(){for(var t=new Array(this.size()).fill(null),e=0;e<this.coordinates.length;e++)t[e]=this.coordinates[e].clone();return new Gt(t,this.dimension)},expandEnvelope:function(t){for(var e=0;e<this.coordinates.length;e++)t.expandToInclude(this.coordinates[e]);return t},copy:function(){for(var t=new Array(this.size()).fill(null),e=0;e<this.coordinates.length;e++)t[e]=this.coordinates[e].copy();return new Gt(t,this.dimension)},toString:function(){if(this.coordinates.length>0){var t=new P(17*this.coordinates.length);t.append("("),t.append(this.coordinates[0]);for(var e=1;e<this.coordinates.length;e++)t.append(", "),t.append(this.coordinates[e]);return t.append(")"),t.toString()}return"()"},getY:function(t){return this.coordinates[t].y},toCoordinateArray:function(){return this.coordinates},interfaces_:function(){return[D,u]},getClass:function(){return Gt}}),Gt.serialVersionUID=-0xcb44a778db18e00,e(qt.prototype,{readResolve:function(){return qt.instance()},create:function(){if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return new Gt(t)}if(R(arguments[0],D)){var e=arguments[0];return new Gt(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return i>3&&(i=3),2>i?new Gt(n):new Gt(n,i)}},interfaces_:function(){return[G,u]},getClass:function(){return qt}}),qt.instance=function(){return qt.instanceObject},qt.serialVersionUID=-0x38e49fa6cf6f2e00,qt.instanceObject=new qt;var no,io=Object.defineProperty,ro=zt({delete:kt,has:Xt,get:Yt,set:Ht,keys:jt,values:Kt,entries:Zt,forEach:$t,clear:Wt}),so="undefined"!=typeof Map&&Map.prototype.values?Map:ro;te.prototype=new K,te.prototype.get=function(t){return this.map_.get(t)||null},te.prototype.put=function(t,e){return this.map_.set(t,e),e},te.prototype.values=function(){for(var t=new I,e=this.map_.values(),n=e.next();!n.done;)t.add(n.value),n=e.next();return t},te.prototype.entrySet=function(){var t=new J;return this.map_.entries().forEach(function(e){return t.add(e)}),t},te.prototype.size=function(){return this.map_.size()},e(ee.prototype,{equals:function(t){if(!(t instanceof ee))return!1;var e=t;return this.modelType===e.modelType&&this.scale===e.scale},compareTo:function(t){var e=t,n=this.getMaximumSignificantDigits(),i=e.getMaximumSignificantDigits();return new b(n).compareTo(new b(i))},getScale:function(){return this.scale},isFloating:function(){return this.modelType===ee.FLOATING||this.modelType===ee.FLOATING_SINGLE},getType:function(){return this.modelType},toString:function(){var t="UNKNOWN";return this.modelType===ee.FLOATING?t="Floating":this.modelType===ee.FLOATING_SINGLE?t="Floating-Single":this.modelType===ee.FIXED&&(t="Fixed (Scale="+this.getScale()+")"),t},makePrecise:function(){if("number"==typeof arguments[0]){var t=arguments[0];if(r.isNaN(t))return t;if(this.modelType===ee.FLOATING_SINGLE){var e=t;return e}return this.modelType===ee.FIXED?Math.round(t*this.scale)/this.scale:t}if(arguments[0]instanceof g){var n=arguments[0];if(this.modelType===ee.FLOATING)return null;n.x=this.makePrecise(n.x),n.y=this.makePrecise(n.y)}},getMaximumSignificantDigits:function(){var t=16;return this.modelType===ee.FLOATING?t=16:this.modelType===ee.FLOATING_SINGLE?t=6:this.modelType===ee.FIXED&&(t=1+Math.trunc(Math.ceil(Math.log(this.getScale())/Math.log(10)))),t},setScale:function(t){this.scale=Math.abs(t)},interfaces_:function(){return[u,s]},getClass:function(){return ee}}),ee.mostPrecise=function(t,e){return t.compareTo(e)>=0?t:e},e(ne.prototype,{readResolve:function(){return ne.nameToTypeMap.get(this.name)},toString:function(){return this.name},interfaces_:function(){return[u]},getClass:function(){return ne}}),ne.serialVersionUID=-552860263173159e4,ne.nameToTypeMap=new te,ee.Type=ne,ee.serialVersionUID=0x6bee6404e9a25c00,ee.FIXED=new ne("FIXED"),ee.FLOATING=new ne("FLOATING"),ee.FLOATING_SINGLE=new ne("FLOATING SINGLE"),ee.maximumPreciseValue=9007199254740992,e(ie.prototype,{toGeometry:function(t){return t.isNull()?this.createPoint(null):t.getMinX()===t.getMaxX()&&t.getMinY()===t.getMaxY()?this.createPoint(new g(t.getMinX(),t.getMinY())):t.getMinX()===t.getMaxX()||t.getMinY()===t.getMaxY()?this.createLineString([new g(t.getMinX(),t.getMinY()),new g(t.getMaxX(),t.getMaxY())]):this.createPolygon(this.createLinearRing([new g(t.getMinX(),t.getMinY()),new g(t.getMinX(),t.getMaxY()),new g(t.getMaxX(),t.getMaxY()),new g(t.getMaxX(),t.getMinY()),new g(t.getMinX(),t.getMinY())]),null)},createLineString:function(){if(0===arguments.length)return this.createLineString(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return this.createLineString(null!==t?this.getCoordinateSequenceFactory().create(t):null)}if(R(arguments[0],D)){var e=arguments[0];return new St(e,this)}}},createMultiLineString:function(){if(0===arguments.length)return new gt(null,this);if(1===arguments.length){var t=arguments[0];return new gt(t,this)}},buildGeometry:function(t){for(var e=null,n=!1,i=!1,r=t.iterator();r.hasNext();){var s=r.next(),o=s.getClass();null===e&&(e=o),o!==e&&(n=!0),s.isGeometryCollectionOrDerived()&&(i=!0)}if(null===e)return this.createGeometryCollection();if(n||i)return this.createGeometryCollection(ie.toGeometryArray(t));var a=t.iterator().next(),u=t.size()>1;if(u){if(a instanceof Tt)return this.createMultiPolygon(ie.toPolygonArray(t));if(a instanceof St)return this.createMultiLineString(ie.toLineStringArray(t));if(a instanceof Lt)return this.createMultiPoint(ie.toPointArray(t));f.shouldNeverReachHere("Unhandled class: "+a.getClass().getName())}return a},createMultiPointFromCoords:function(t){return this.createMultiPoint(null!==t?this.getCoordinateSequenceFactory().create(t):null)},createPoint:function(){if(0===arguments.length)return this.createPoint(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];return this.createPoint(null!==t?this.getCoordinateSequenceFactory().create([t]):null)}if(R(arguments[0],D)){var e=arguments[0];return new Lt(e,this)}}},getCoordinateSequenceFactory:function(){return this.coordinateSequenceFactory},createPolygon:function(){if(0===arguments.length)return new Tt(null,null,this);if(1===arguments.length){if(R(arguments[0],D)){var t=arguments[0];return this.createPolygon(this.createLinearRing(t))}if(arguments[0]instanceof Array){var e=arguments[0];return this.createPolygon(this.createLinearRing(e))}if(arguments[0]instanceof bt){var n=arguments[0];return this.createPolygon(n,null)}}else if(2===arguments.length){var i=arguments[0],r=arguments[1];return new Tt(i,r,this)}},getSRID:function(){return this.SRID},createGeometryCollection:function(){if(0===arguments.length)return new ft(null,this);if(1===arguments.length){var t=arguments[0];return new ft(t,this)}},createGeometry:function(t){var e=new _t(this);return e.edit(t,{edit:function(){if(2===arguments.length){var t=arguments[0];arguments[1];return this.coordinateSequenceFactory.create(t)}}})},getPrecisionModel:function(){return this.precisionModel},createLinearRing:function(){if(0===arguments.length)return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return this.createLinearRing(null!==t?this.getCoordinateSequenceFactory().create(t):null)}if(R(arguments[0],D)){var e=arguments[0];return new bt(e,this)}}},createMultiPolygon:function(){if(0===arguments.length)return new Ot(null,this);if(1===arguments.length){var t=arguments[0];return new Ot(t,this)}},createMultiPoint:function(){if(0===arguments.length)return new Pt(null,this);if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return new Pt(t,this)}if(arguments[0]instanceof Array){var e=arguments[0];return this.createMultiPoint(null!==e?this.getCoordinateSequenceFactory().create(e):null)}if(R(arguments[0],D)){var n=arguments[0];if(null===n)return this.createMultiPoint(new Array(0).fill(null));for(var i=new Array(n.size()).fill(null),r=0;r<n.size();r++){var s=this.getCoordinateSequenceFactory().create(1,n.getDimension());Ct.copy(n,r,s,0,1),i[r]=this.createPoint(s)}return this.createMultiPoint(i)}}},interfaces_:function(){return[u]},getClass:function(){return ie}}),ie.toMultiPolygonArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toGeometryArray=function(t){if(null===t)return null;var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.getDefaultCoordinateSequenceFactory=function(){return qt.instance()},ie.toMultiLineStringArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toLineStringArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toMultiPointArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toLinearRingArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toPointArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toPolygonArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.createPointFromInternalCoord=function(t,e){return e.getPrecisionModel().makePrecise(t),e.getFactory().createPoint(t)},ie.serialVersionUID=-0x5ea75f2051eeb400;var oo={typeStr:/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,emptyTypeStr:/^\s*(\w+)\s*EMPTY\s*$/,spaces:/\s+/,parenComma:/\)\s*,\s*\(/,doubleParenComma:/\)\s*\)\s*,\s*\(\s*\(/,trimParens:/^\s*\(?(.*?)\)?\s*$/};e(re.prototype,{read:function(t){var e,n,i;t=t.replace(/[\n\r]/g," ");var r=oo.typeStr.exec(t);if(-1!==t.search("EMPTY")&&(r=oo.emptyTypeStr.exec(t),r[2]=void 0),r&&(n=r[1].toLowerCase(),i=r[2],uo[n]&&(e=uo[n].apply(this,[i]))),void 0===e)throw new Error("Could not parse WKT "+t);return e},write:function(t){return this.extractGeometry(t)},extractGeometry:function(t){var e=t.getGeometryType().toLowerCase();if(!ao[e])return null;var n,i=e.toUpperCase();return n=t.isEmpty()?i+" EMPTY":i+"("+ao[e].apply(this,[t])+")"}});var ao={coordinate:function(t){return t.x+" "+t.y},point:function(t){
return ao.coordinate.call(this,t.coordinates.coordinates[0])},multipoint:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push("("+ao.point.apply(this,[t.geometries[n]])+")");return e.join(",")},linestring:function(t){for(var e=[],n=0,i=t.points.coordinates.length;i>n;++n)e.push(ao.coordinate.apply(this,[t.points.coordinates[n]]));return e.join(",")},linearring:function(t){for(var e=[],n=0,i=t.points.coordinates.length;i>n;++n)e.push(ao.coordinate.apply(this,[t.points.coordinates[n]]));return e.join(",")},multilinestring:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push("("+ao.linestring.apply(this,[t.geometries[n]])+")");return e.join(",")},polygon:function(t){var e=[];e.push("("+ao.linestring.apply(this,[t.shell])+")");for(var n=0,i=t.holes.length;i>n;++n)e.push("("+ao.linestring.apply(this,[t.holes[n]])+")");return e.join(",")},multipolygon:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push("("+ao.polygon.apply(this,[t.geometries[n]])+")");return e.join(",")},geometrycollection:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push(this.extractGeometry(t.geometries[n]));return e.join(",")}},uo={point:function(t){if(void 0===t)return this.geometryFactory.createPoint();var e=t.trim().split(oo.spaces);return this.geometryFactory.createPoint(new g(Number.parseFloat(e[0]),Number.parseFloat(e[1])))},multipoint:function(t){if(void 0===t)return this.geometryFactory.createMultiPoint();for(var e,n=t.trim().split(","),i=[],r=0,s=n.length;s>r;++r)e=n[r].replace(oo.trimParens,"$1"),i.push(uo.point.apply(this,[e]));return this.geometryFactory.createMultiPoint(i)},linestring:function(t){if(void 0===t)return this.geometryFactory.createLineString();for(var e,n=t.trim().split(","),i=[],r=0,s=n.length;s>r;++r)e=n[r].trim().split(oo.spaces),i.push(new g(Number.parseFloat(e[0]),Number.parseFloat(e[1])));return this.geometryFactory.createLineString(i)},linearring:function(t){if(void 0===t)return this.geometryFactory.createLinearRing();for(var e,n=t.trim().split(","),i=[],r=0,s=n.length;s>r;++r)e=n[r].trim().split(oo.spaces),i.push(new g(Number.parseFloat(e[0]),Number.parseFloat(e[1])));return this.geometryFactory.createLinearRing(i)},multilinestring:function(t){if(void 0===t)return this.geometryFactory.createMultiLineString();for(var e,n=t.trim().split(oo.parenComma),i=[],r=0,s=n.length;s>r;++r)e=n[r].replace(oo.trimParens,"$1"),i.push(uo.linestring.apply(this,[e]));return this.geometryFactory.createMultiLineString(i)},polygon:function(t){if(void 0===t)return this.geometryFactory.createPolygon();for(var e,n,i,r,s=t.trim().split(oo.parenComma),o=[],a=0,u=s.length;u>a;++a)e=s[a].replace(oo.trimParens,"$1"),n=uo.linestring.apply(this,[e]),i=this.geometryFactory.createLinearRing(n.points),0===a?r=i:o.push(i);return this.geometryFactory.createPolygon(r,o)},multipolygon:function(t){if(void 0===t)return this.geometryFactory.createMultiPolygon();for(var e,n=t.trim().split(oo.doubleParenComma),i=[],r=0,s=n.length;s>r;++r)e=n[r].replace(oo.trimParens,"$1"),i.push(uo.polygon.apply(this,[e]));return this.geometryFactory.createMultiPolygon(i)},geometrycollection:function(t){if(void 0===t)return this.geometryFactory.createGeometryCollection();t=t.replace(/,\s*([A-Za-z])/g,"|$1");for(var e=t.trim().split("|"),n=[],i=0,r=e.length;r>i;++i)n.push(this.read(e[i]));return this.geometryFactory.createGeometryCollection(n)}};e(se.prototype,{write:function(t){return this.parser.write(t)}}),e(se,{toLineString:function(t,e){if(2!==arguments.length)throw new Error("Not implemented");return"LINESTRING ( "+t.x+" "+t.y+", "+e.x+" "+e.y+" )"}}),e(oe.prototype,{getIndexAlongSegment:function(t,e){return this.computeIntLineIndex(),this.intLineIndex[t][e]},getTopologySummary:function(){var t=new P;return this.isEndPoint()&&t.append(" endpoint"),this._isProper&&t.append(" proper"),this.isCollinear()&&t.append(" collinear"),t.toString()},computeIntersection:function(t,e,n,i){this.inputLines[0][0]=t,this.inputLines[0][1]=e,this.inputLines[1][0]=n,this.inputLines[1][1]=i,this.result=this.computeIntersect(t,e,n,i)},getIntersectionNum:function(){return this.result},computeIntLineIndex:function(){if(0===arguments.length)null===this.intLineIndex&&(this.intLineIndex=Array(2).fill().map(function(){return Array(2)}),this.computeIntLineIndex(0),this.computeIntLineIndex(1));else if(1===arguments.length){var t=arguments[0],e=this.getEdgeDistance(t,0),n=this.getEdgeDistance(t,1);e>n?(this.intLineIndex[t][0]=0,this.intLineIndex[t][1]=1):(this.intLineIndex[t][0]=1,this.intLineIndex[t][1]=0)}},isProper:function(){return this.hasIntersection()&&this._isProper},setPrecisionModel:function(t){this.precisionModel=t},isInteriorIntersection:function(){if(0===arguments.length)return this.isInteriorIntersection(0)?!0:!!this.isInteriorIntersection(1);if(1===arguments.length){for(var t=arguments[0],e=0;e<this.result;e++)if(!this.intPt[e].equals2D(this.inputLines[t][0])&&!this.intPt[e].equals2D(this.inputLines[t][1]))return!0;return!1}},getIntersection:function(t){return this.intPt[t]},isEndPoint:function(){return this.hasIntersection()&&!this._isProper},hasIntersection:function(){return this.result!==oe.NO_INTERSECTION},getEdgeDistance:function(t,e){var n=oe.computeEdgeDistance(this.intPt[e],this.inputLines[t][0],this.inputLines[t][1]);return n},isCollinear:function(){return this.result===oe.COLLINEAR_INTERSECTION},toString:function(){return se.toLineString(this.inputLines[0][0],this.inputLines[0][1])+" - "+se.toLineString(this.inputLines[1][0],this.inputLines[1][1])+this.getTopologySummary()},getEndpoint:function(t,e){return this.inputLines[t][e]},isIntersection:function(t){for(var e=0;e<this.result;e++)if(this.intPt[e].equals2D(t))return!0;return!1},getIntersectionAlongSegment:function(t,e){return this.computeIntLineIndex(),this.intPt[this.intLineIndex[t][e]]},interfaces_:function(){return[]},getClass:function(){return oe}}),oe.computeEdgeDistance=function(t,e,n){var i=Math.abs(n.x-e.x),r=Math.abs(n.y-e.y),s=-1;if(t.equals(e))s=0;else if(t.equals(n))s=i>r?i:r;else{var o=Math.abs(t.x-e.x),a=Math.abs(t.y-e.y);s=i>r?o:a,0!==s||t.equals(e)||(s=Math.max(o,a))}return f.isTrue(!(0===s&&!t.equals(e)),"Bad distance calculation"),s},oe.nonRobustComputeEdgeDistance=function(t,e,n){var i=t.x-e.x,r=t.y-e.y,s=Math.sqrt(i*i+r*r);return f.isTrue(!(0===s&&!t.equals(e)),"Invalid distance calculation"),s},oe.DONT_INTERSECT=0,oe.DO_INTERSECT=1,oe.COLLINEAR=2,oe.NO_INTERSECTION=0,oe.POINT_INTERSECTION=1,oe.COLLINEAR_INTERSECTION=2,h(ae,oe),e(ae.prototype,{isInSegmentEnvelopes:function(t){var e=new C(this.inputLines[0][0],this.inputLines[0][1]),n=new C(this.inputLines[1][0],this.inputLines[1][1]);return e.contains(t)&&n.contains(t)},computeIntersection:function(){if(3!==arguments.length)return oe.prototype.computeIntersection.apply(this,arguments);var t=arguments[0],e=arguments[1],n=arguments[2];return this._isProper=!1,C.intersects(e,n,t)&&0===he.orientationIndex(e,n,t)&&0===he.orientationIndex(n,e,t)?(this._isProper=!0,(t.equals(e)||t.equals(n))&&(this._isProper=!1),this.result=oe.POINT_INTERSECTION,null):void(this.result=oe.NO_INTERSECTION)},normalizeToMinimum:function(t,e,n,i,r){r.x=this.smallestInAbsValue(t.x,e.x,n.x,i.x),r.y=this.smallestInAbsValue(t.y,e.y,n.y,i.y),t.x-=r.x,t.y-=r.y,e.x-=r.x,e.y-=r.y,n.x-=r.x,n.y-=r.y,i.x-=r.x,i.y-=r.y},safeHCoordinateIntersection:function(t,e,n,i){var r=null;try{r=F.intersection(t,e,n,i)}catch(s){if(!(s instanceof w))throw s;r=ae.nearestEndpoint(t,e,n,i)}finally{}return r},intersection:function(t,e,n,i){var r=this.intersectionWithNormalization(t,e,n,i);return this.isInSegmentEnvelopes(r)||(r=new g(ae.nearestEndpoint(t,e,n,i))),null!==this.precisionModel&&this.precisionModel.makePrecise(r),r},smallestInAbsValue:function(t,e,n,i){var r=t,s=Math.abs(r);return Math.abs(e)<s&&(r=e,s=Math.abs(e)),Math.abs(n)<s&&(r=n,s=Math.abs(n)),Math.abs(i)<s&&(r=i),r},checkDD:function(t,e,n,i,r){var s=M.intersection(t,e,n,i),o=this.isInSegmentEnvelopes(s);A.out.println("DD in env = "+o+"  --------------------- "+s),r.distance(s)>1e-4&&A.out.println("Distance = "+r.distance(s))},intersectionWithNormalization:function(t,e,n,i){var r=new g(t),s=new g(e),o=new g(n),a=new g(i),u=new g;this.normalizeToEnvCentre(r,s,o,a,u);var l=this.safeHCoordinateIntersection(r,s,o,a);return l.x+=u.x,l.y+=u.y,l},computeCollinearIntersection:function(t,e,n,i){var r=C.intersects(t,e,n),s=C.intersects(t,e,i),o=C.intersects(n,i,t),a=C.intersects(n,i,e);return r&&s?(this.intPt[0]=n,this.intPt[1]=i,oe.COLLINEAR_INTERSECTION):o&&a?(this.intPt[0]=t,this.intPt[1]=e,oe.COLLINEAR_INTERSECTION):r&&o?(this.intPt[0]=n,this.intPt[1]=t,!n.equals(t)||s||a?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):r&&a?(this.intPt[0]=n,this.intPt[1]=e,!n.equals(e)||s||o?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):s&&o?(this.intPt[0]=i,this.intPt[1]=t,!i.equals(t)||r||a?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):s&&a?(this.intPt[0]=i,this.intPt[1]=e,!i.equals(e)||r||o?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):oe.NO_INTERSECTION},normalizeToEnvCentre:function(t,e,n,i,r){var s=t.x<e.x?t.x:e.x,o=t.y<e.y?t.y:e.y,a=t.x>e.x?t.x:e.x,u=t.y>e.y?t.y:e.y,l=n.x<i.x?n.x:i.x,h=n.y<i.y?n.y:i.y,c=n.x>i.x?n.x:i.x,f=n.y>i.y?n.y:i.y,g=s>l?s:l,d=c>a?a:c,p=o>h?o:h,v=f>u?u:f,m=(g+d)/2,y=(p+v)/2;r.x=m,r.y=y,t.x-=r.x,t.y-=r.y,e.x-=r.x,e.y-=r.y,n.x-=r.x,n.y-=r.y,i.x-=r.x,i.y-=r.y},computeIntersect:function(t,e,n,i){if(this._isProper=!1,!C.intersects(t,e,n,i))return oe.NO_INTERSECTION;var r=he.orientationIndex(t,e,n),s=he.orientationIndex(t,e,i);if(r>0&&s>0||0>r&&0>s)return oe.NO_INTERSECTION;var o=he.orientationIndex(n,i,t),a=he.orientationIndex(n,i,e);if(o>0&&a>0||0>o&&0>a)return oe.NO_INTERSECTION;var u=0===r&&0===s&&0===o&&0===a;return u?this.computeCollinearIntersection(t,e,n,i):(0===r||0===s||0===o||0===a?(this._isProper=!1,t.equals2D(n)||t.equals2D(i)?this.intPt[0]=t:e.equals2D(n)||e.equals2D(i)?this.intPt[0]=e:0===r?this.intPt[0]=new g(n):0===s?this.intPt[0]=new g(i):0===o?this.intPt[0]=new g(t):0===a&&(this.intPt[0]=new g(e))):(this._isProper=!0,this.intPt[0]=this.intersection(t,e,n,i)),oe.POINT_INTERSECTION)},interfaces_:function(){return[]},getClass:function(){return ae}}),ae.nearestEndpoint=function(t,e,n,i){var r=t,s=he.distancePointLine(t,n,i),o=he.distancePointLine(e,n,i);return s>o&&(s=o,r=e),o=he.distancePointLine(n,t,e),s>o&&(s=o,r=n),o=he.distancePointLine(i,t,e),s>o&&(s=o,r=i),r},e(ue.prototype,{interfaces_:function(){return[]},getClass:function(){return ue}}),ue.orientationIndex=function(t,e,n){var i=e.x-t.x,r=e.y-t.y,s=n.x-e.x,o=n.y-e.y;return ue.signOfDet2x2(i,r,s,o)},ue.signOfDet2x2=function(t,e,n,i){var r=null,s=null,o=null,a=0;if(r=1,0===t||0===i)return 0===e||0===n?0:e>0?n>0?-r:r:n>0?r:-r;if(0===e||0===n)return i>0?t>0?r:-r:t>0?-r:r;if(e>0?i>0?i>=e||(r=-r,s=t,t=n,n=s,s=e,e=i,i=s):-i>=e?(r=-r,n=-n,i=-i):(s=t,t=-n,n=s,s=e,e=-i,i=s):i>0?i>=-e?(r=-r,t=-t,e=-e):(s=-t,t=n,n=s,s=-e,e=i,i=s):e>=i?(t=-t,e=-e,n=-n,i=-i):(r=-r,s=-t,t=-n,n=s,s=-e,e=-i,i=s),t>0){if(!(n>0))return r;if(!(n>=t))return r}else{if(n>0)return-r;if(!(t>=n))return-r;r=-r,t=-t,n=-n}for(;;){if(a+=1,o=Math.floor(n/t),n-=o*t,i-=o*e,0>i)return-r;if(i>e)return r;if(t>n+n){if(i+i>e)return r}else{if(e>i+i)return-r;n=t-n,i=e-i,r=-r}if(0===i)return 0===n?0:-r;if(0===n)return r;if(o=Math.floor(t/n),t-=o*n,e-=o*i,0>e)return r;if(e>i)return-r;if(n>t+t){if(e+e>i)return-r}else{if(i>e+e)return r;t=n-t,e=i-e,r=-r}if(0===e)return 0===t?0:r;if(0===t)return-r}},e(le.prototype,{countSegment:function(t,e){if(t.x<this.p.x&&e.x<this.p.x)return null;if(this.p.x===e.x&&this.p.y===e.y)return this.isPointOnSegment=!0,null;if(t.y===this.p.y&&e.y===this.p.y){var n=t.x,i=e.x;return n>i&&(n=e.x,i=t.x),this.p.x>=n&&this.p.x<=i&&(this.isPointOnSegment=!0),null}if(t.y>this.p.y&&e.y<=this.p.y||e.y>this.p.y&&t.y<=this.p.y){var r=t.x-this.p.x,s=t.y-this.p.y,o=e.x-this.p.x,a=e.y-this.p.y,u=ue.signOfDet2x2(r,s,o,a);if(0===u)return this.isPointOnSegment=!0,null;s>a&&(u=-u),u>0&&this.crossingCount++}},isPointInPolygon:function(){return this.getLocation()!==L.EXTERIOR},getLocation:function(){return this.isPointOnSegment?L.BOUNDARY:this.crossingCount%2===1?L.INTERIOR:L.EXTERIOR},isOnSegment:function(){return this.isPointOnSegment},interfaces_:function(){return[]},getClass:function(){return le}}),le.locatePointInRing=function(){if(arguments[0]instanceof g&&R(arguments[1],D)){for(var t=arguments[0],e=arguments[1],n=new le(t),i=new g,r=new g,s=1;s<e.size();s++)if(e.getCoordinate(s,i),e.getCoordinate(s-1,r),n.countSegment(i,r),n.isOnSegment())return n.getLocation();return n.getLocation()}if(arguments[0]instanceof g&&arguments[1]instanceof Array){for(var o=arguments[0],a=arguments[1],n=new le(o),s=1;s<a.length;s++){var i=a[s],r=a[s-1];if(n.countSegment(i,r),n.isOnSegment())return n.getLocation()}return n.getLocation()}},e(he.prototype,{interfaces_:function(){return[]},getClass:function(){return he}}),he.orientationIndex=function(t,e,n){return M.orientationIndex(t,e,n)},he.signedArea=function(){if(arguments[0]instanceof Array){var t=arguments[0];if(t.length<3)return 0;for(var e=0,n=t[0].x,i=1;i<t.length-1;i++){var r=t[i].x-n,s=t[i+1].y,o=t[i-1].y;e+=r*(o-s)}return e/2}if(R(arguments[0],D)){var a=arguments[0],u=a.size();if(3>u)return 0;var l=new g,h=new g,c=new g;a.getCoordinate(0,h),a.getCoordinate(1,c);var n=h.x;c.x-=n;for(var e=0,i=1;u-1>i;i++)l.y=h.y,h.x=c.x,h.y=c.y,a.getCoordinate(i+1,c),c.x-=n,e+=h.x*(l.y-c.y);return e/2}},he.distanceLineLine=function(t,e,n,i){if(t.equals(e))return he.distancePointLine(t,n,i);if(n.equals(i))return he.distancePointLine(i,t,e);var r=!1;if(C.intersects(t,e,n,i)){var s=(e.x-t.x)*(i.y-n.y)-(e.y-t.y)*(i.x-n.x);if(0===s)r=!0;else{var o=(t.y-n.y)*(i.x-n.x)-(t.x-n.x)*(i.y-n.y),a=(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y),u=a/s,l=o/s;(0>l||l>1||0>u||u>1)&&(r=!0)}}else r=!0;return r?T.min(he.distancePointLine(t,n,i),he.distancePointLine(e,n,i),he.distancePointLine(n,t,e),he.distancePointLine(i,t,e)):0},he.isPointInRing=function(t,e){return he.locatePointInRing(t,e)!==L.EXTERIOR},he.computeLength=function(t){var e=t.size();if(1>=e)return 0;var n=0,i=new g;t.getCoordinate(0,i);for(var r=i.x,s=i.y,o=1;e>o;o++){t.getCoordinate(o,i);var a=i.x,u=i.y,l=a-r,h=u-s;n+=Math.sqrt(l*l+h*h),r=a,s=u}return n},he.isCCW=function(t){var e=t.length-1;if(3>e)throw new i("Ring has fewer than 4 points, so orientation cannot be determined");for(var n=t[0],r=0,s=1;e>=s;s++){var o=t[s];o.y>n.y&&(n=o,r=s)}var a=r;do a-=1,0>a&&(a=e);while(t[a].equals2D(n)&&a!==r);var u=r;do u=(u+1)%e;while(t[u].equals2D(n)&&u!==r);var l=t[a],h=t[u];if(l.equals2D(n)||h.equals2D(n)||l.equals2D(h))return!1;var c=he.computeOrientation(l,n,h),f=!1;return f=0===c?l.x>h.x:c>0},he.locatePointInRing=function(t,e){return le.locatePointInRing(t,e)},he.distancePointLinePerpendicular=function(t,e,n){var i=(n.x-e.x)*(n.x-e.x)+(n.y-e.y)*(n.y-e.y),r=((e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y))/i;return Math.abs(r)*Math.sqrt(i)},he.computeOrientation=function(t,e,n){return he.orientationIndex(t,e,n)},he.distancePointLine=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(0===e.length)throw new i("Line array must contain at least one vertex");for(var n=t.distance(e[0]),r=0;r<e.length-1;r++){var s=he.distancePointLine(t,e[r],e[r+1]);n>s&&(n=s)}return n}if(3===arguments.length){var o=arguments[0],a=arguments[1],u=arguments[2];if(a.x===u.x&&a.y===u.y)return o.distance(a);var l=(u.x-a.x)*(u.x-a.x)+(u.y-a.y)*(u.y-a.y),h=((o.x-a.x)*(u.x-a.x)+(o.y-a.y)*(u.y-a.y))/l;if(0>=h)return o.distance(a);if(h>=1)return o.distance(u);var c=((a.y-o.y)*(u.x-a.x)-(a.x-o.x)*(u.y-a.y))/l;return Math.abs(c)*Math.sqrt(l)}},he.isOnLine=function(t,e){for(var n=new ae,i=1;i<e.length;i++){var r=e[i-1],s=e[i];if(n.computeIntersection(t,r,s),n.hasIntersection())return!0}return!1},he.CLOCKWISE=-1,he.RIGHT=he.CLOCKWISE,he.COUNTERCLOCKWISE=1,he.LEFT=he.COUNTERCLOCKWISE,he.COLLINEAR=0,he.STRAIGHT=he.COLLINEAR,e(ce.prototype,{minX:function(){return Math.min(this.p0.x,this.p1.x)},orientationIndex:function(){if(arguments[0]instanceof ce){var t=arguments[0],e=he.orientationIndex(this.p0,this.p1,t.p0),n=he.orientationIndex(this.p0,this.p1,t.p1);return e>=0&&n>=0?Math.max(e,n):0>=e&&0>=n?Math.max(e,n):0}if(arguments[0]instanceof g){var i=arguments[0];return he.orientationIndex(this.p0,this.p1,i)}},toGeometry:function(t){return t.createLineString([this.p0,this.p1])},isVertical:function(){return this.p0.x===this.p1.x},equals:function(t){if(!(t instanceof ce))return!1;var e=t;return this.p0.equals(e.p0)&&this.p1.equals(e.p1)},intersection:function(t){var e=new ae;return e.computeIntersection(this.p0,this.p1,t.p0,t.p1),e.hasIntersection()?e.getIntersection(0):null},project:function(){if(arguments[0]instanceof g){var t=arguments[0];if(t.equals(this.p0)||t.equals(this.p1))return new g(t);var e=this.projectionFactor(t),n=new g;return n.x=this.p0.x+e*(this.p1.x-this.p0.x),n.y=this.p0.y+e*(this.p1.y-this.p0.y),n}if(arguments[0]instanceof ce){var i=arguments[0],r=this.projectionFactor(i.p0),s=this.projectionFactor(i.p1);if(r>=1&&s>=1)return null;if(0>=r&&0>=s)return null;var o=this.project(i.p0);0>r&&(o=this.p0),r>1&&(o=this.p1);var a=this.project(i.p1);return 0>s&&(a=this.p0),s>1&&(a=this.p1),new ce(o,a)}},normalize:function(){this.p1.compareTo(this.p0)<0&&this.reverse()},angle:function(){return Math.atan2(this.p1.y-this.p0.y,this.p1.x-this.p0.x)},getCoordinate:function(t){return 0===t?this.p0:this.p1},distancePerpendicular:function(t){return he.distancePointLinePerpendicular(t,this.p0,this.p1)},minY:function(){return Math.min(this.p0.y,this.p1.y)},midPoint:function(){return ce.midPoint(this.p0,this.p1)},projectionFactor:function(t){if(t.equals(this.p0))return 0;if(t.equals(this.p1))return 1;var e=this.p1.x-this.p0.x,n=this.p1.y-this.p0.y,i=e*e+n*n;if(0>=i)return r.NaN;var s=((t.x-this.p0.x)*e+(t.y-this.p0.y)*n)/i;return s},closestPoints:function(t){var e=this.intersection(t);if(null!==e)return[e,e];var n=new Array(2).fill(null),i=r.MAX_VALUE,s=null,o=this.closestPoint(t.p0);i=o.distance(t.p0),n[0]=o,n[1]=t.p0;var a=this.closestPoint(t.p1);s=a.distance(t.p1),i>s&&(i=s,n[0]=a,n[1]=t.p1);var u=t.closestPoint(this.p0);s=u.distance(this.p0),i>s&&(i=s,n[0]=this.p0,n[1]=u);var l=t.closestPoint(this.p1);return s=l.distance(this.p1),i>s&&(i=s,n[0]=this.p1,n[1]=l),n},closestPoint:function(t){var e=this.projectionFactor(t);if(e>0&&1>e)return this.project(t);var n=this.p0.distance(t),i=this.p1.distance(t);return i>n?this.p0:this.p1},maxX:function(){return Math.max(this.p0.x,this.p1.x)},getLength:function(){return this.p0.distance(this.p1)},compareTo:function(t){var e=t,n=this.p0.compareTo(e.p0);return 0!==n?n:this.p1.compareTo(e.p1)},reverse:function(){var t=this.p0;this.p0=this.p1,this.p1=t},equalsTopo:function(t){return this.p0.equals(t.p0)&&this.p1.equals(t.p1)||this.p0.equals(t.p1)&&this.p1.equals(t.p0)},lineIntersection:function(t){try{var e=F.intersection(this.p0,this.p1,t.p0,t.p1);return e}catch(t){if(!(t instanceof w))throw t}finally{}return null},maxY:function(){return Math.max(this.p0.y,this.p1.y)},pointAlongOffset:function(t,e){var n=this.p0.x+t*(this.p1.x-this.p0.x),i=this.p0.y+t*(this.p1.y-this.p0.y),r=this.p1.x-this.p0.x,s=this.p1.y-this.p0.y,o=Math.sqrt(r*r+s*s),a=0,u=0;if(0!==e){if(0>=o)throw new IllegalStateException("Cannot compute offset from zero-length line segment");a=e*r/o,u=e*s/o}var l=n-u,h=i+a,c=new g(l,h);return c},setCoordinates:function(){if(1===arguments.length){var t=arguments[0];this.setCoordinates(t.p0,t.p1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p0.x=e.x,this.p0.y=e.y,this.p1.x=n.x,this.p1.y=n.y}},segmentFraction:function(t){var e=this.projectionFactor(t);return 0>e?e=0:(e>1||r.isNaN(e))&&(e=1),e},toString:function(){return"LINESTRING( "+this.p0.x+" "+this.p0.y+", "+this.p1.x+" "+this.p1.y+")"},isHorizontal:function(){return this.p0.y===this.p1.y},distance:function(){if(arguments[0]instanceof ce){var t=arguments[0];return he.distanceLineLine(this.p0,this.p1,t.p0,t.p1)}if(arguments[0]instanceof g){var e=arguments[0];return he.distancePointLine(e,this.p0,this.p1)}},pointAlong:function(t){var e=new g;return e.x=this.p0.x+t*(this.p1.x-this.p0.x),e.y=this.p0.y+t*(this.p1.y-this.p0.y),e},hashCode:function(){var t=java.lang.Double.doubleToLongBits(this.p0.x);t^=31*java.lang.Double.doubleToLongBits(this.p0.y);var e=Math.trunc(t)^Math.trunc(t>>32),n=java.lang.Double.doubleToLongBits(this.p1.x);n^=31*java.lang.Double.doubleToLongBits(this.p1.y);var i=Math.trunc(n)^Math.trunc(n>>32);return e^i},interfaces_:function(){return[s,u]},getClass:function(){return ce}}),ce.midPoint=function(t,e){return new g((t.x+e.x)/2,(t.y+e.y)/2)},ce.serialVersionUID=0x2d2172135f411c00,e(fe.prototype,{isIntersects:function(){return!this.isDisjoint()},isCovers:function(){var t=fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])||fe.isTrue(this.matrix[L.INTERIOR][L.BOUNDARY])||fe.isTrue(this.matrix[L.BOUNDARY][L.INTERIOR])||fe.isTrue(this.matrix[L.BOUNDARY][L.BOUNDARY]);return t&&this.matrix[L.EXTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.BOUNDARY]===lt.FALSE},isCoveredBy:function(){var t=fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])||fe.isTrue(this.matrix[L.INTERIOR][L.BOUNDARY])||fe.isTrue(this.matrix[L.BOUNDARY][L.INTERIOR])||fe.isTrue(this.matrix[L.BOUNDARY][L.BOUNDARY]);return t&&this.matrix[L.INTERIOR][L.EXTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.EXTERIOR]===lt.FALSE},set:function(){if(1===arguments.length)for(var t=arguments[0],e=0;e<t.length;e++){var n=Math.trunc(e/3),i=e%3;this.matrix[n][i]=lt.toDimensionValue(t.charAt(e))}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.matrix[r][s]=o}},isContains:function(){return fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&this.matrix[L.EXTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.BOUNDARY]===lt.FALSE},setAtLeast:function(){if(1===arguments.length)for(var t=arguments[0],e=0;e<t.length;e++){var n=Math.trunc(e/3),i=e%3;this.setAtLeast(n,i,lt.toDimensionValue(t.charAt(e)))}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.matrix[r][s]<o&&(this.matrix[r][s]=o)}},setAtLeastIfValid:function(t,e,n){t>=0&&e>=0&&this.setAtLeast(t,e,n)},isWithin:function(){return fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&this.matrix[L.INTERIOR][L.EXTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.EXTERIOR]===lt.FALSE},isTouches:function(t,e){return t>e?this.isTouches(e,t):t===lt.A&&e===lt.A||t===lt.L&&e===lt.L||t===lt.L&&e===lt.A||t===lt.P&&e===lt.A||t===lt.P&&e===lt.L?this.matrix[L.INTERIOR][L.INTERIOR]===lt.FALSE&&(fe.isTrue(this.matrix[L.INTERIOR][L.BOUNDARY])||fe.isTrue(this.matrix[L.BOUNDARY][L.INTERIOR])||fe.isTrue(this.matrix[L.BOUNDARY][L.BOUNDARY])):!1},isOverlaps:function(t,e){return t===lt.P&&e===lt.P||t===lt.A&&e===lt.A?fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&fe.isTrue(this.matrix[L.INTERIOR][L.EXTERIOR])&&fe.isTrue(this.matrix[L.EXTERIOR][L.INTERIOR]):t===lt.L&&e===lt.L?1===this.matrix[L.INTERIOR][L.INTERIOR]&&fe.isTrue(this.matrix[L.INTERIOR][L.EXTERIOR])&&fe.isTrue(this.matrix[L.EXTERIOR][L.INTERIOR]):!1},isEquals:function(t,e){return t!==e?!1:fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&this.matrix[L.INTERIOR][L.EXTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.EXTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.BOUNDARY]===lt.FALSE},toString:function(){for(var t=new P("123456789"),e=0;3>e;e++)for(var n=0;3>n;n++)t.setCharAt(3*e+n,lt.toDimensionSymbol(this.matrix[e][n]));return t.toString()},setAll:function(t){for(var e=0;3>e;e++)for(var n=0;3>n;n++)this.matrix[e][n]=t},get:function(t,e){return this.matrix[t][e]},transpose:function(){var t=this.matrix[1][0];return this.matrix[1][0]=this.matrix[0][1],this.matrix[0][1]=t,t=this.matrix[2][0],this.matrix[2][0]=this.matrix[0][2],this.matrix[0][2]=t,t=this.matrix[2][1],this.matrix[2][1]=this.matrix[1][2],this.matrix[1][2]=t,this},matches:function(t){if(9!==t.length)throw new i("Should be length 9: "+t);for(var e=0;3>e;e++)for(var n=0;3>n;n++)if(!fe.matches(this.matrix[e][n],t.charAt(3*e+n)))return!1;return!0},add:function(t){for(var e=0;3>e;e++)for(var n=0;3>n;n++)this.setAtLeast(e,n,t.get(e,n))},isDisjoint:function(){return this.matrix[L.INTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.INTERIOR][L.BOUNDARY]===lt.FALSE&&this.matrix[L.BOUNDARY][L.INTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.BOUNDARY]===lt.FALSE},isCrosses:function(t,e){return t===lt.P&&e===lt.L||t===lt.P&&e===lt.A||t===lt.L&&e===lt.A?fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&fe.isTrue(this.matrix[L.INTERIOR][L.EXTERIOR]):t===lt.L&&e===lt.P||t===lt.A&&e===lt.P||t===lt.A&&e===lt.L?fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&fe.isTrue(this.matrix[L.EXTERIOR][L.INTERIOR]):t===lt.L&&e===lt.L?0===this.matrix[L.INTERIOR][L.INTERIOR]:!1},interfaces_:function(){return[o]},getClass:function(){return fe}}),fe.matches=function(){if(Number.isInteger(arguments[0])&&"string"==typeof arguments[1]){var t=arguments[0],e=arguments[1];return e===lt.SYM_DONTCARE?!0:e===lt.SYM_TRUE&&(t>=0||t===lt.TRUE)?!0:e===lt.SYM_FALSE&&t===lt.FALSE?!0:e===lt.SYM_P&&t===lt.P?!0:e===lt.SYM_L&&t===lt.L?!0:e===lt.SYM_A&&t===lt.A}if("string"==typeof arguments[0]&&"string"==typeof arguments[1]){var n=arguments[0],i=arguments[1],r=new fe(n);return r.matches(i)}},fe.isTrue=function(t){return t>=0||t===lt.TRUE};var lo=Object.freeze({Coordinate:g,CoordinateList:N,Envelope:C,LineSegment:ce,GeometryFactory:ie,Geometry:B,Point:Lt,LineString:St,LinearRing:bt,Polygon:Tt,GeometryCollection:ft,MultiPoint:Pt,MultiLineString:gt,MultiPolygon:Ot,Dimension:lt,IntersectionMatrix:fe});e(ge.prototype,{addPoint:function(t){this.ptCount+=1,this.ptCentSum.x+=t.x,this.ptCentSum.y+=t.y},setBasePoint:function(t){null===this.areaBasePt&&(this.areaBasePt=t)},addLineSegments:function(t){for(var e=0,n=0;n<t.length-1;n++){var i=t[n].distance(t[n+1]);if(0!==i){e+=i;var r=(t[n].x+t[n+1].x)/2;this.lineCentSum.x+=i*r;var s=(t[n].y+t[n+1].y)/2;this.lineCentSum.y+=i*s}}this.totalLength+=e,0===e&&t.length>0&&this.addPoint(t[0])},addHole:function(t){for(var e=he.isCCW(t),n=0;n<t.length-1;n++)this.addTriangle(this.areaBasePt,t[n],t[n+1],e);this.addLineSegments(t)},getCentroid:function(){var t=new g;if(Math.abs(this.areasum2)>0)t.x=this.cg3.x/3/this.areasum2,t.y=this.cg3.y/3/this.areasum2;else if(this.totalLength>0)t.x=this.lineCentSum.x/this.totalLength,t.y=this.lineCentSum.y/this.totalLength;else{if(!(this.ptCount>0))return null;t.x=this.ptCentSum.x/this.ptCount,t.y=this.ptCentSum.y/this.ptCount}return t},addShell:function(t){t.length>0&&this.setBasePoint(t[0]);for(var e=!he.isCCW(t),n=0;n<t.length-1;n++)this.addTriangle(this.areaBasePt,t[n],t[n+1],e);this.addLineSegments(t)},addTriangle:function(t,e,n,i){var r=i?1:-1;ge.centroid3(t,e,n,this.triangleCent3);var s=ge.area2(t,e,n);this.cg3.x+=r*s*this.triangleCent3.x,this.cg3.y+=r*s*this.triangleCent3.y,this.areasum2+=r*s},add:function(){if(arguments[0]instanceof Tt){var t=arguments[0];this.addShell(t.getExteriorRing().getCoordinates());for(var e=0;e<t.getNumInteriorRing();e++)this.addHole(t.getInteriorRingN(e).getCoordinates())}else if(arguments[0]instanceof B){var n=arguments[0];if(n.isEmpty())return null;if(n instanceof Lt)this.addPoint(n.getCoordinate());else if(n instanceof St)this.addLineSegments(n.getCoordinates());else if(n instanceof Tt){var i=n;this.add(i)}else if(n instanceof ft)for(var r=n,e=0;e<r.getNumGeometries();e++)this.add(r.getGeometryN(e))}},interfaces_:function(){return[]},getClass:function(){return ge}}),ge.area2=function(t,e,n){return(e.x-t.x)*(n.y-t.y)-(n.x-t.x)*(e.y-t.y)},ge.centroid3=function(t,e,n,i){return i.x=t.x+e.x+n.x,i.y=t.y+e.y+n.y,null},ge.getCentroid=function(t){var e=new ge(t);return e.getCentroid()},de.prototype=new Error,de.prototype.name="EmptyStackException",pe.prototype=new y,pe.prototype.add=function(t){return this.array_.push(t),!0},pe.prototype.get=function(t){if(0>t||t>=this.size())throw new IndexOutOfBoundsException;return this.array_[t]},pe.prototype.push=function(t){return this.array_.push(t),t},pe.prototype.pop=function(t){if(0===this.array_.length)throw new de;return this.array_.pop()},pe.prototype.peek=function(){if(0===this.array_.length)throw new de;return this.array_[this.array_.length-1]},pe.prototype.empty=function(){return 0===this.array_.length},pe.prototype.isEmpty=function(){return this.empty()},pe.prototype.search=function(t){return this.array_.indexOf(t)},pe.prototype.size=function(){return this.array_.length},pe.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},e(ve.prototype,{filter:function(t){this.treeSet.contains(t)||(this.list.add(t),this.treeSet.add(t))},getCoordinates:function(){var t=new Array(this.list.size()).fill(null);return this.list.toArray(t)},interfaces_:function(){return[z]},getClass:function(){return ve}}),ve.filterCoordinates=function(t){for(var e=new ve,n=0;n<t.length;n++)e.filter(t[n]);return e.getCoordinates()},e(me.prototype,{preSort:function(t){for(var e=null,n=1;n<t.length;n++)(t[n].y<t[0].y||t[n].y===t[0].y&&t[n].x<t[0].x)&&(e=t[0],t[0]=t[n],t[n]=e);return ut.sort(t,1,t.length,new ye(t[0])),t},computeOctRing:function(t){var e=this.computeOctPts(t),n=new N;return n.add(e,!1),n.size()<3?null:(n.closeRing(),n.toCoordinateArray())},lineOrPolygon:function(t){if(t=this.cleanRing(t),3===t.length)return this.geomFactory.createLineString([t[0],t[1]]);var e=this.geomFactory.createLinearRing(t);return this.geomFactory.createPolygon(e,null)},cleanRing:function(t){f.equals(t[0],t[t.length-1]);for(var e=new I,n=null,i=0;i<=t.length-2;i++){var r=t[i],s=t[i+1];r.equals(s)||null!==n&&this.isBetween(n,r,s)||(e.add(r),n=r)}e.add(t[t.length-1]);var o=new Array(e.size()).fill(null);return e.toArray(o)},isBetween:function(t,e,n){if(0!==he.computeOrientation(t,e,n))return!1;if(t.x!==n.x){if(t.x<=e.x&&e.x<=n.x)return!0;if(n.x<=e.x&&e.x<=t.x)return!0}if(t.y!==n.y){if(t.y<=e.y&&e.y<=n.y)return!0;if(n.y<=e.y&&e.y<=t.y)return!0}return!1},reduce:function(t){var e=this.computeOctRing(t);if(null===e)return t;for(var n=new at,i=0;i<e.length;i++)n.add(e[i]);for(var i=0;i<t.length;i++)he.isPointInRing(t[i],e)||n.add(t[i]);var r=H.toCoordinateArray(n);return r.length<3?this.padArray3(r):r},getConvexHull:function(){if(0===this.inputPts.length)return this.geomFactory.createGeometryCollection(null);if(1===this.inputPts.length)return this.geomFactory.createPoint(this.inputPts[0]);if(2===this.inputPts.length)return this.geomFactory.createLineString(this.inputPts);var t=this.inputPts;this.inputPts.length>50&&(t=this.reduce(this.inputPts));var e=this.preSort(t),n=this.grahamScan(e),i=this.toCoordinateArray(n);return this.lineOrPolygon(i)},padArray3:function(t){for(var e=new Array(3).fill(null),n=0;n<e.length;n++)n<t.length?e[n]=t[n]:e[n]=t[0];return e},computeOctPts:function(t){for(var e=new Array(8).fill(null),n=0;n<e.length;n++)e[n]=t[0];for(var i=1;i<t.length;i++)t[i].x<e[0].x&&(e[0]=t[i]),t[i].x-t[i].y<e[1].x-e[1].y&&(e[1]=t[i]),t[i].y>e[2].y&&(e[2]=t[i]),t[i].x+t[i].y>e[3].x+e[3].y&&(e[3]=t[i]),t[i].x>e[4].x&&(e[4]=t[i]),t[i].x-t[i].y>e[5].x-e[5].y&&(e[5]=t[i]),t[i].y<e[6].y&&(e[6]=t[i]),t[i].x+t[i].y<e[7].x+e[7].y&&(e[7]=t[i]);return e},toCoordinateArray:function(t){for(var e=new Array(t.size()).fill(null),n=0;n<t.size();n++){var i=t.get(n);e[n]=i}return e},grahamScan:function(t){var e=null,n=new pe;e=n.push(t[0]),e=n.push(t[1]),e=n.push(t[2]);for(var i=3;i<t.length;i++){for(e=n.pop();!n.empty()&&he.computeOrientation(n.peek(),e,t[i])>0;)e=n.pop();e=n.push(e),e=n.push(t[i])}return e=n.push(t[0]),n},interfaces_:function(){return[]},getClass:function(){return me}}),me.extractCoordinates=function(t){var e=new ve;return t.apply(e),e.getCoordinates()},e(ye.prototype,{compare:function(t,e){var n=t,i=e;return ye.polarCompare(this.origin,n,i)},interfaces_:function(){return[a]},getClass:function(){return ye}}),ye.polarCompare=function(t,e,n){var i=e.x-t.x,r=e.y-t.y,s=n.x-t.x,o=n.y-t.y,a=he.computeOrientation(t,e,n);
if(a===he.COUNTERCLOCKWISE)return 1;if(a===he.CLOCKWISE)return-1;var u=i*i+r*r,l=s*s+o*o;return l>u?-1:u>l?1:0},me.RadialComparator=ye,e(xe.prototype,{transformPoint:function(t,e){return this.factory.createPoint(this.transformCoordinates(t.getCoordinateSequence(),t))},transformPolygon:function(t,e){var n=!0,i=this.transformLinearRing(t.getExteriorRing(),t);null!==i&&i instanceof bt&&!i.isEmpty()||(n=!1);for(var r=new I,s=0;s<t.getNumInteriorRing();s++){var o=this.transformLinearRing(t.getInteriorRingN(s),t);null===o||o.isEmpty()||(o instanceof bt||(n=!1),r.add(o))}if(n)return this.factory.createPolygon(i,r.toArray([]));var a=new I;return null!==i&&a.add(i),a.addAll(r),this.factory.buildGeometry(a)},createCoordinateSequence:function(t){return this.factory.getCoordinateSequenceFactory().create(t)},getInputGeometry:function(){return this.inputGeom},transformMultiLineString:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transformLineString(t.getGeometryN(i),t);null!==r&&(r.isEmpty()||n.add(r))}return this.factory.buildGeometry(n)},transformCoordinates:function(t,e){return this.copy(t)},transformLineString:function(t,e){return this.factory.createLineString(this.transformCoordinates(t.getCoordinateSequence(),t))},transformMultiPoint:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transformPoint(t.getGeometryN(i),t);null!==r&&(r.isEmpty()||n.add(r))}return this.factory.buildGeometry(n)},transformMultiPolygon:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transformPolygon(t.getGeometryN(i),t);null!==r&&(r.isEmpty()||n.add(r))}return this.factory.buildGeometry(n)},copy:function(t){return t.copy()},transformGeometryCollection:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transform(t.getGeometryN(i));null!==r&&(this.pruneEmptyGeometry&&r.isEmpty()||n.add(r))}return this.preserveGeometryCollectionType?this.factory.createGeometryCollection(ie.toGeometryArray(n)):this.factory.buildGeometry(n)},transform:function(t){if(this.inputGeom=t,this.factory=t.getFactory(),t instanceof Lt)return this.transformPoint(t,null);if(t instanceof Pt)return this.transformMultiPoint(t,null);if(t instanceof bt)return this.transformLinearRing(t,null);if(t instanceof St)return this.transformLineString(t,null);if(t instanceof gt)return this.transformMultiLineString(t,null);if(t instanceof Tt)return this.transformPolygon(t,null);if(t instanceof Ot)return this.transformMultiPolygon(t,null);if(t instanceof ft)return this.transformGeometryCollection(t,null);throw new i("Unknown Geometry subtype: "+t.getClass().getName())},transformLinearRing:function(t,e){var n=this.transformCoordinates(t.getCoordinateSequence(),t);if(null===n)return this.factory.createLinearRing(null);var i=n.size();return i>0&&4>i&&!this.preserveType?this.factory.createLineString(n):this.factory.createLinearRing(n)},interfaces_:function(){return[]},getClass:function(){return xe}}),e(Ee.prototype,{snapVertices:function(t,e){for(var n=this._isClosed?t.size()-1:t.size(),i=0;n>i;i++){var r=t.get(i),s=this.findSnapForVertex(r,e);null!==s&&(t.set(i,new g(s)),0===i&&this._isClosed&&t.set(t.size()-1,new g(s)))}},findSnapForVertex:function(t,e){for(var n=0;n<e.length;n++){if(t.equals2D(e[n]))return null;if(t.distance(e[n])<this.snapTolerance)return e[n]}return null},snapTo:function(t){var e=new N(this.srcPts);this.snapVertices(e,t),this.snapSegments(e,t);var n=e.toCoordinateArray();return n},snapSegments:function(t,e){if(0===e.length)return null;var n=e.length;e[0].equals2D(e[e.length-1])&&(n=e.length-1);for(var i=0;n>i;i++){var r=e[i],s=this.findSegmentIndexToSnap(r,t);s>=0&&t.add(s+1,new g(r),!1)}},findSegmentIndexToSnap:function(t,e){for(var n=r.MAX_VALUE,i=-1,s=0;s<e.size()-1;s++){if(this.seg.p0=e.get(s),this.seg.p1=e.get(s+1),this.seg.p0.equals2D(t)||this.seg.p1.equals2D(t)){if(this.allowSnappingToSourceVertices)continue;return-1}var o=this.seg.distance(t);o<this.snapTolerance&&n>o&&(n=o,i=s)}return i},setAllowSnappingToSourceVertices:function(t){this.allowSnappingToSourceVertices=t},interfaces_:function(){return[]},getClass:function(){return Ee}}),Ee.isClosed=function(t){return t.length<=1?!1:t[0].equals2D(t[t.length-1])},e(Ie.prototype,{snapTo:function(t,e){var n=this.extractTargetCoordinates(t),i=new Ne(e,n);return i.transform(this.srcGeom)},snapToSelf:function(t,e){var n=this.extractTargetCoordinates(this.srcGeom),i=new Ne(t,n,!0),r=i.transform(this.srcGeom),s=r;return e&&R(s,Rt)&&(s=r.buffer(0)),s},computeSnapTolerance:function(t){var e=this.computeMinimumSegmentLength(t),n=e/10;return n},extractTargetCoordinates:function(t){for(var e=new at,n=t.getCoordinates(),i=0;i<n.length;i++)e.add(n[i]);return e.toArray(new Array(0).fill(null))},computeMinimumSegmentLength:function(t){for(var e=r.MAX_VALUE,n=0;n<t.length-1;n++){var i=t[n].distance(t[n+1]);e>i&&(e=i)}return e},interfaces_:function(){return[]},getClass:function(){return Ie}}),Ie.snap=function(t,e,n){var i=new Array(2).fill(null),r=new Ie(t);i[0]=r.snapTo(e,n);var s=new Ie(e);return i[1]=s.snapTo(i[0],n),i},Ie.computeOverlaySnapTolerance=function(){if(1===arguments.length){var t=arguments[0],e=Ie.computeSizeBasedSnapTolerance(t),n=t.getPrecisionModel();if(n.getType()===ee.FIXED){var i=1/n.getScale()*2/1.415;i>e&&(e=i)}return e}if(2===arguments.length){var r=arguments[0],s=arguments[1];return Math.min(Ie.computeOverlaySnapTolerance(r),Ie.computeOverlaySnapTolerance(s))}},Ie.computeSizeBasedSnapTolerance=function(t){var e=t.getEnvelopeInternal(),n=Math.min(e.getHeight(),e.getWidth()),i=n*Ie.SNAP_PRECISION_FACTOR;return i},Ie.snapToSelf=function(t,e,n){var i=new Ie(t);return i.snapToSelf(e,n)},Ie.SNAP_PRECISION_FACTOR=1e-9,h(Ne,xe),e(Ne.prototype,{snapLine:function(t,e){var n=new Ee(t,this.snapTolerance);return n.setAllowSnappingToSourceVertices(this.isSelfSnap),n.snapTo(e)},transformCoordinates:function(t,e){var n=t.toCoordinateArray(),i=this.snapLine(n,this.snapPts);return this.factory.getCoordinateSequenceFactory().create(i)},interfaces_:function(){return[]},getClass:function(){return Ne}}),e(Ce.prototype,{getCommon:function(){return r.longBitsToDouble(this.commonBits)},add:function(t){var e=r.doubleToLongBits(t);if(this.isFirst)return this.commonBits=e,this.commonSignExp=Ce.signExpBits(this.commonBits),this.isFirst=!1,null;var n=Ce.signExpBits(e);return n!==this.commonSignExp?(this.commonBits=0,null):(this.commonMantissaBitsCount=Ce.numCommonMostSigMantissaBits(this.commonBits,e),void(this.commonBits=Ce.zeroLowerBits(this.commonBits,64-(12+this.commonMantissaBitsCount))))},toString:function(){if(1===arguments.length){var t=arguments[0],e=r.longBitsToDouble(t),n=Long.toBinaryString(t),i="0000000000000000000000000000000000000000000000000000000000000000"+n,s=i.substring(i.length-64),o=s.substring(0,1)+"  "+s.substring(1,12)+"(exp) "+s.substring(12)+" [ "+e+" ]";return o}},interfaces_:function(){return[]},getClass:function(){return Ce}}),Ce.getBit=function(t,e){var n=1<<e;return 0!==(t&n)?1:0},Ce.signExpBits=function(t){return t>>52},Ce.zeroLowerBits=function(t,e){var n=(1<<e)-1,i=~n,r=t&i;return r},Ce.numCommonMostSigMantissaBits=function(t,e){for(var n=0,i=52;i>=0;i--){if(Ce.getBit(t,i)!==Ce.getBit(e,i))return n;n++}return 52},e(Se.prototype,{addCommonBits:function(t){var e=new Le(this.commonCoord);t.apply(e),t.geometryChanged()},removeCommonBits:function(t){if(0===this.commonCoord.x&&0===this.commonCoord.y)return t;var e=new g(this.commonCoord);e.x=-e.x,e.y=-e.y;var n=new Le(e);return t.apply(n),t.geometryChanged(),t},getCommonCoordinate:function(){return this.commonCoord},add:function(t){t.apply(this.ccFilter),this.commonCoord=this.ccFilter.getCommonCoordinate()},interfaces_:function(){return[]},getClass:function(){return Se}}),e(we.prototype,{filter:function(t){this.commonBitsX.add(t.x),this.commonBitsY.add(t.y)},getCommonCoordinate:function(){return new g(this.commonBitsX.getCommon(),this.commonBitsY.getCommon())},interfaces_:function(){return[z]},getClass:function(){return we}}),e(Le.prototype,{filter:function(t,e){var n=t.getOrdinate(e,0)+this.trans.x,i=t.getOrdinate(e,1)+this.trans.y;t.setOrdinate(e,0,n),t.setOrdinate(e,1,i)},isDone:function(){return!1},isGeometryChanged:function(){return!0},interfaces_:function(){return[ct]},getClass:function(){return Le}}),Se.CommonCoordinateFilter=we,Se.Translater=Le,e(Re.prototype,{next:function(){if(this.atStart)return this.atStart=!1,Re.isAtomic(this.parent)&&this.index++,this.parent;if(null!==this.subcollectionIterator){if(this.subcollectionIterator.hasNext())return this.subcollectionIterator.next();this.subcollectionIterator=null}if(this.index>=this.max)throw new x;var t=this.parent.getGeometryN(this.index++);return t instanceof ft?(this.subcollectionIterator=new Re(t),this.subcollectionIterator.next()):t},remove:function(){throw new UnsupportedOperationException(this.getClass().getName())},hasNext:function(){if(this.atStart)return!0;if(null!==this.subcollectionIterator){if(this.subcollectionIterator.hasNext())return!0;this.subcollectionIterator=null}return!(this.index>=this.max)},interfaces_:function(){return[p]},getClass:function(){return Re}}),Re.isAtomic=function(t){return!(t instanceof ft)},e(Te.prototype,{locateInternal:function(){if(arguments[0]instanceof g&&arguments[1]instanceof Tt){var t=arguments[0],e=arguments[1];if(e.isEmpty())return L.EXTERIOR;var n=e.getExteriorRing(),i=this.locateInPolygonRing(t,n);if(i===L.EXTERIOR)return L.EXTERIOR;if(i===L.BOUNDARY)return L.BOUNDARY;for(var r=0;r<e.getNumInteriorRing();r++){var s=e.getInteriorRingN(r),o=this.locateInPolygonRing(t,s);if(o===L.INTERIOR)return L.EXTERIOR;if(o===L.BOUNDARY)return L.BOUNDARY}return L.INTERIOR}if(arguments[0]instanceof g&&arguments[1]instanceof St){var a=arguments[0],u=arguments[1];if(!u.getEnvelopeInternal().intersects(a))return L.EXTERIOR;var l=u.getCoordinates();return u.isClosed()||!a.equals(l[0])&&!a.equals(l[l.length-1])?he.isOnLine(a,l)?L.INTERIOR:L.EXTERIOR:L.BOUNDARY}if(arguments[0]instanceof g&&arguments[1]instanceof Lt){var h=arguments[0],c=arguments[1],f=c.getCoordinate();return f.equals2D(h)?L.INTERIOR:L.EXTERIOR}},locateInPolygonRing:function(t,e){return e.getEnvelopeInternal().intersects(t)?he.locatePointInRing(t,e.getCoordinates()):L.EXTERIOR},intersects:function(t,e){return this.locate(t,e)!==L.EXTERIOR},updateLocationInfo:function(t){t===L.INTERIOR&&(this.isIn=!0),t===L.BOUNDARY&&this.numBoundaries++},computeLocation:function(t,e){if(e instanceof Lt&&this.updateLocationInfo(this.locateInternal(t,e)),e instanceof St)this.updateLocationInfo(this.locateInternal(t,e));else if(e instanceof Tt)this.updateLocationInfo(this.locateInternal(t,e));else if(e instanceof gt)for(var n=e,i=0;i<n.getNumGeometries();i++){var r=n.getGeometryN(i);this.updateLocationInfo(this.locateInternal(t,r))}else if(e instanceof Ot)for(var s=e,i=0;i<s.getNumGeometries();i++){var o=s.getGeometryN(i);this.updateLocationInfo(this.locateInternal(t,o))}else if(e instanceof ft)for(var a=new Re(e);a.hasNext();){var u=a.next();u!==e&&this.computeLocation(t,u)}},locate:function(t,e){return e.isEmpty()?L.EXTERIOR:e instanceof St?this.locateInternal(t,e):e instanceof Tt?this.locateInternal(t,e):(this.isIn=!1,this.numBoundaries=0,this.computeLocation(t,e),this.boundaryRule.isInBoundary(this.numBoundaries)?L.BOUNDARY:this.numBoundaries>0||this.isIn?L.INTERIOR:L.EXTERIOR)},interfaces_:function(){return[]},getClass:function(){return Te}}),e(Pe.prototype,{interfaces_:function(){return[]},getClass:function(){return Pe}}),Pe.octant=function(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1];if(0===t&&0===e)throw new i("Cannot compute the octant for point ( "+t+", "+e+" )");var n=Math.abs(t),r=Math.abs(e);return t>=0?e>=0?n>=r?0:1:n>=r?7:6:e>=0?n>=r?3:2:n>=r?4:5}if(arguments[0]instanceof g&&arguments[1]instanceof g){var s=arguments[0],o=arguments[1],a=o.x-s.x,u=o.y-s.y;if(0===a&&0===u)throw new i("Cannot compute the octant for two identical points "+s);return Pe.octant(a,u)}},e(be.prototype,{getCoordinates:function(){},size:function(){},getCoordinate:function(t){},isClosed:function(){},setData:function(t){},getData:function(){},interfaces_:function(){return[]},getClass:function(){return be}}),e(Oe.prototype,{getCoordinates:function(){return this.pts},size:function(){return this.pts.length},getCoordinate:function(t){return this.pts[t]},isClosed:function(){return this.pts[0].equals(this.pts[this.pts.length-1])},getSegmentOctant:function(t){return t===this.pts.length-1?-1:Pe.octant(this.getCoordinate(t),this.getCoordinate(t+1))},setData:function(t){this.data=t},getData:function(){return this.data},toString:function(){return se.toLineString(new Gt(this.pts))},interfaces_:function(){return[be]},getClass:function(){return Oe}}),e(_e.prototype,{getBounds:function(){},interfaces_:function(){return[]},getClass:function(){return _e}}),e(Me.prototype,{getItem:function(){return this.item},getBounds:function(){return this.bounds},interfaces_:function(){return[_e,u]},getClass:function(){return Me}}),e(De.prototype,{poll:function(){if(this.isEmpty())return null;var t=this.items.get(1);return this.items.set(1,this.items.get(this._size)),this._size-=1,this.reorder(1),t},size:function(){return this._size},reorder:function(t){for(var e=null,n=this.items.get(t);2*t<=this._size&&(e=2*t,e!==this._size&&this.items.get(e+1).compareTo(this.items.get(e))<0&&e++,this.items.get(e).compareTo(n)<0);t=e)this.items.set(t,this.items.get(e));this.items.set(t,n)},clear:function(){this._size=0,this.items.clear()},isEmpty:function(){return 0===this._size},add:function(t){this.items.add(null),this._size+=1;var e=this._size;for(this.items.set(0,t);t.compareTo(this.items.get(Math.trunc(e/2)))<0;e/=2)this.items.set(e,this.items.get(Math.trunc(e/2)));this.items.set(e,t)},interfaces_:function(){return[]},getClass:function(){return De}}),e(Ae.prototype,{visitItem:function(t){},interfaces_:function(){return[]},getClass:function(){return Ae}}),e(Fe.prototype,{insert:function(t,e){},remove:function(t,e){},query:function(){if(1===arguments.length){arguments[0]}else if(2===arguments.length){arguments[0],arguments[1]}},interfaces_:function(){return[]},getClass:function(){return Fe}}),e(Ge.prototype,{getLevel:function(){return this.level},size:function(){return this.childBoundables.size()},getChildBoundables:function(){return this.childBoundables},addChildBoundable:function(t){f.isTrue(null===this.bounds),this.childBoundables.add(t)},isEmpty:function(){return this.childBoundables.isEmpty()},getBounds:function(){return null===this.bounds&&(this.bounds=this.computeBounds()),this.bounds},interfaces_:function(){return[_e,u]},getClass:function(){return Ge}}),Ge.serialVersionUID=0x5a1e55ec41369800;var ho={reverseOrder:function(){return{compare:function(t,e){return e.compareTo(t)}}},min:function(t){return ho.sort(t),t.get(0)},sort:function(t,e){var n=t.toArray();e?ut.sort(n,e):ut.sort(n);for(var i=t.iterator(),r=0,s=n.length;s>r;r++)i.next(),i.set(n[r])},singletonList:function(t){var e=new I;return e.add(t),e}};e(qe.prototype,{expandToQueue:function(t,e){var n=qe.isComposite(this.boundable1),r=qe.isComposite(this.boundable2);if(n&&r)return qe.area(this.boundable1)>qe.area(this.boundable2)?(this.expand(this.boundable1,this.boundable2,t,e),null):(this.expand(this.boundable2,this.boundable1,t,e),null);if(n)return this.expand(this.boundable1,this.boundable2,t,e),null;if(r)return this.expand(this.boundable2,this.boundable1,t,e),null;throw new i("neither boundable is composite")},isLeaves:function(){return!(qe.isComposite(this.boundable1)||qe.isComposite(this.boundable2))},compareTo:function(t){var e=t;return this._distance<e._distance?-1:this._distance>e._distance?1:0},expand:function(t,e,n,i){for(var r=t.getChildBoundables(),s=r.iterator();s.hasNext();){var o=s.next(),a=new qe(o,e,this.itemDistance);a.getDistance()<i&&n.add(a)}},getBoundable:function(t){return 0===t?this.boundable1:this.boundable2},getDistance:function(){return this._distance},distance:function(){return this.isLeaves()?this.itemDistance.distance(this.boundable1,this.boundable2):this.boundable1.getBounds().distance(this.boundable2.getBounds())},interfaces_:function(){return[s]},getClass:function(){return qe}}),qe.area=function(t){return t.getBounds().getArea()},qe.isComposite=function(t){return t instanceof Ge},e(Be.prototype,{getNodeCapacity:function(){return this.nodeCapacity},lastNode:function(t){return t.get(t.size()-1)},size:function t(){if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.size(this.root));if(1===arguments.length){for(var e=arguments[0],t=0,n=e.getChildBoundables().iterator();n.hasNext();){var i=n.next();i instanceof Ge?t+=this.size(i):i instanceof Me&&(t+=1)}return t}},removeItem:function(t,e){for(var n=null,i=t.getChildBoundables().iterator();i.hasNext();){var r=i.next();r instanceof Me&&r.getItem()===e&&(n=r)}return null!==n?(t.getChildBoundables().remove(n),!0):!1},itemsTree:function(){if(0===arguments.length){this.build();var t=this.itemsTree(this.root);return null===t?new I:t}if(1===arguments.length){for(var e=arguments[0],n=new I,i=e.getChildBoundables().iterator();i.hasNext();){var r=i.next();if(r instanceof Ge){var s=this.itemsTree(r);null!==s&&n.add(s)}else r instanceof Me?n.add(r.getItem()):f.shouldNeverReachHere()}return n.size()<=0?null:n}},insert:function(t,e){f.isTrue(!this.built,"Cannot insert items into an STR packed R-tree after it has been built."),this.itemBoundables.add(new Me(t,e))},boundablesAtLevel:function(){if(1===arguments.length){var t=arguments[0],e=new I;return this.boundablesAtLevel(t,this.root,e),e}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];if(f.isTrue(n>-2),i.getLevel()===n)return r.add(i),null;for(var s=i.getChildBoundables().iterator();s.hasNext();){var o=s.next();o instanceof Ge?this.boundablesAtLevel(n,o,r):(f.isTrue(o instanceof Me),-1===n&&r.add(o))}return null}},query:function(){if(1===arguments.length){var t=arguments[0];this.build();var e=new I;return this.isEmpty()?e:(this.getIntersectsOp().intersects(this.root.getBounds(),t)&&this.query(t,this.root,e),e)}if(2===arguments.length){var n=arguments[0],i=arguments[1];if(this.build(),this.isEmpty())return null;this.getIntersectsOp().intersects(this.root.getBounds(),n)&&this.query(n,this.root,i)}else if(3===arguments.length)if(R(arguments[2],Ae)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge)for(var r=arguments[0],s=arguments[1],o=arguments[2],a=s.getChildBoundables(),u=0;u<a.size();u++){var l=a.get(u);this.getIntersectsOp().intersects(l.getBounds(),r)&&(l instanceof Ge?this.query(r,l,o):l instanceof Me?o.visitItem(l.getItem()):f.shouldNeverReachHere())}else if(R(arguments[2],y)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge)for(var h=arguments[0],c=arguments[1],g=arguments[2],a=c.getChildBoundables(),u=0;u<a.size();u++){var l=a.get(u);this.getIntersectsOp().intersects(l.getBounds(),h)&&(l instanceof Ge?this.query(h,l,g):l instanceof Me?g.add(l.getItem()):f.shouldNeverReachHere())}},build:function(){return this.built?null:(this.root=this.itemBoundables.isEmpty()?this.createNode(0):this.createHigherLevels(this.itemBoundables,-1),this.itemBoundables=null,void(this.built=!0))},getRoot:function(){return this.build(),this.root},remove:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.build(),this.getIntersectsOp().intersects(this.root.getBounds(),t)?this.remove(t,this.root,e):!1}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2],s=this.removeItem(i,r);if(s)return!0;for(var o=null,a=i.getChildBoundables().iterator();a.hasNext();){var u=a.next();if(this.getIntersectsOp().intersects(u.getBounds(),n)&&u instanceof Ge&&(s=this.remove(n,u,r))){o=u;break}}return null!==o&&o.getChildBoundables().isEmpty()&&i.getChildBoundables().remove(o),s}},createHigherLevels:function(t,e){f.isTrue(!t.isEmpty());var n=this.createParentBoundables(t,e+1);return 1===n.size()?n.get(0):this.createHigherLevels(n,e+1)},depth:function(){if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.depth(this.root));if(1===arguments.length){for(var t=arguments[0],e=0,n=t.getChildBoundables().iterator();n.hasNext();){var i=n.next();if(i instanceof Ge){var r=this.depth(i);r>e&&(e=r)}}return e+1}},createParentBoundables:function(t,e){f.isTrue(!t.isEmpty());var n=new I;n.add(this.createNode(e));var i=new I(t);ho.sort(i,this.getComparator());for(var r=i.iterator();r.hasNext();){var s=r.next();this.lastNode(n).getChildBoundables().size()===this.getNodeCapacity()&&n.add(this.createNode(e)),this.lastNode(n).addChildBoundable(s)}return n},isEmpty:function(){return this.built?this.root.isEmpty():this.itemBoundables.isEmpty()},interfaces_:function(){return[u]},getClass:function(){return Be}}),Be.compareDoubles=function(t,e){return t>e?1:e>t?-1:0},Be.IntersectsOp=ze,Be.serialVersionUID=-0x35ef64c82d4c5400,Be.DEFAULT_NODE_CAPACITY=10,e(Ve.prototype,{distance:function(t,e){},interfaces_:function(){return[]},getClass:function(){return Ve}}),h(ke,Be),e(ke.prototype,{createParentBoundablesFromVerticalSlices:function(t,e){f.isTrue(t.length>0);for(var n=new I,i=0;i<t.length;i++)n.addAll(this.createParentBoundablesFromVerticalSlice(t[i],e));return n},createNode:function(t){return new Ye(t)},size:function(){return 0===arguments.length?Be.prototype.size.call(this):Be.prototype.size.apply(this,arguments)},insert:function(){if(2!==arguments.length)return Be.prototype.insert.apply(this,arguments);var t=arguments[0],e=arguments[1];return t.isNull()?null:void Be.prototype.insert.call(this,t,e)},getIntersectsOp:function(){return ke.intersectsOp},verticalSlices:function(t,e){for(var n=Math.trunc(Math.ceil(t.size()/e)),i=new Array(e).fill(null),r=t.iterator(),s=0;e>s;s++){i[s]=new I;for(var o=0;r.hasNext()&&n>o;){var a=r.next();i[s].add(a),o++}}return i},query:function(){if(1===arguments.length){var t=arguments[0];return Be.prototype.query.call(this,t)}if(2===arguments.length){var e=arguments[0],n=arguments[1];Be.prototype.query.call(this,e,n)}else if(3===arguments.length)if(R(arguments[2],Ae)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge){var i=arguments[0],r=arguments[1],s=arguments[2];Be.prototype.query.call(this,i,r,s)}else if(R(arguments[2],y)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge){var o=arguments[0],a=arguments[1],u=arguments[2];Be.prototype.query.call(this,o,a,u)}},getComparator:function(){return ke.yComparator},createParentBoundablesFromVerticalSlice:function(t,e){return Be.prototype.createParentBoundables.call(this,t,e)},remove:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return Be.prototype.remove.call(this,t,e)}return Be.prototype.remove.apply(this,arguments)},depth:function(){return 0===arguments.length?Be.prototype.depth.call(this):Be.prototype.depth.apply(this,arguments)},createParentBoundables:function(t,e){f.isTrue(!t.isEmpty());var n=Math.trunc(Math.ceil(t.size()/this.getNodeCapacity())),i=new I(t);ho.sort(i,ke.xComparator);var r=this.verticalSlices(i,Math.trunc(Math.ceil(Math.sqrt(n))));return this.createParentBoundablesFromVerticalSlices(r,e)},nearestNeighbour:function(){if(1===arguments.length){if(R(arguments[0],Ve)){var t=arguments[0],e=new qe(this.getRoot(),this.getRoot(),t);return this.nearestNeighbour(e)}if(arguments[0]instanceof qe){var n=arguments[0];return this.nearestNeighbour(n,r.POSITIVE_INFINITY)}}else if(2===arguments.length){if(arguments[0]instanceof ke&&R(arguments[1],Ve)){var i=arguments[0],s=arguments[1],e=new qe(this.getRoot(),i.getRoot(),s);return this.nearestNeighbour(e)}if(arguments[0]instanceof qe&&"number"==typeof arguments[1]){var o=arguments[0],a=arguments[1],u=a,l=null,h=new De;for(h.add(o);!h.isEmpty()&&u>0;){var c=h.poll(),f=c.getDistance();if(f>=u)break;c.isLeaves()?(u=f,l=c):c.expandToQueue(h,u)}return[l.getBoundable(0).getItem(),l.getBoundable(1).getItem()]}}else if(3===arguments.length){var g=arguments[0],d=arguments[1],p=arguments[2],v=new Me(g,d),e=new qe(this.getRoot(),v,p);return this.nearestNeighbour(e)[0]}},interfaces_:function(){return[Fe,u]},getClass:function(){return ke}}),ke.centreX=function(t){return ke.avg(t.getMinX(),t.getMaxX())},ke.avg=function(t,e){return(t+e)/2},ke.centreY=function(t){return ke.avg(t.getMinY(),t.getMaxY())},h(Ye,Ge),e(Ye.prototype,{computeBounds:function(){for(var t=null,e=this.getChildBoundables().iterator();e.hasNext();){var n=e.next();null===t?t=new C(n.getBounds()):t.expandToInclude(n.getBounds())}return t},interfaces_:function(){return[]},getClass:function(){return Ye}}),ke.STRtreeNode=Ye,ke.serialVersionUID=0x39920f7d5f261e0,ke.xComparator={interfaces_:function(){return[a]},compare:function(t,e){return Be.compareDoubles(ke.centreX(t.getBounds()),ke.centreX(e.getBounds()))}},ke.yComparator={interfaces_:function(){return[a]},compare:function(t,e){return Be.compareDoubles(ke.centreY(t.getBounds()),ke.centreY(e.getBounds()))}},ke.intersectsOp={interfaces_:function(){return[IntersectsOp]},intersects:function(t,e){return t.intersects(e)}},ke.DEFAULT_NODE_CAPACITY=10,e(Ue.prototype,{interfaces_:function(){return[]},getClass:function(){return Ue}}),Ue.relativeSign=function(t,e){return e>t?-1:t>e?1:0},Ue.compare=function(t,e,n){if(e.equals2D(n))return 0;var i=Ue.relativeSign(e.x,n.x),r=Ue.relativeSign(e.y,n.y);switch(t){case 0:return Ue.compareValue(i,r);case 1:return Ue.compareValue(r,i);case 2:return Ue.compareValue(r,-i);case 3:return Ue.compareValue(-i,r);case 4:return Ue.compareValue(-i,-r);case 5:return Ue.compareValue(-r,-i);case 6:return Ue.compareValue(-r,i);case 7:return Ue.compareValue(i,-r)}return f.shouldNeverReachHere("invalid octant value"),0},Ue.compareValue=function(t,e){return 0>t?-1:t>0?1:0>e?-1:e>0?1:0},e(Xe.prototype,{getCoordinate:function(){return this.coord},print:function(t){t.print(this.coord),t.print(" seg # = "+this.segmentIndex)},compareTo:function(t){var e=t;return this.segmentIndex<e.segmentIndex?-1:this.segmentIndex>e.segmentIndex?1:this.coord.equals2D(e.coord)?0:Ue.compare(this.segmentOctant,this.coord,e.coord)},isEndPoint:function(t){return 0!==this.segmentIndex||this._isInterior?this.segmentIndex===t:!0},isInterior:function(){return this._isInterior},interfaces_:function(){return[s]},getClass:function(){return Xe}}),e(He.prototype,{getSplitCoordinates:function(){var t=new N;this.addEndpoints();for(var e=this.iterator(),n=e.next();e.hasNext();){var i=e.next();this.addEdgeCoordinates(n,i,t),n=i}return t.toCoordinateArray()},addCollapsedNodes:function(){var t=new I;this.findCollapsesFromInsertedNodes(t),this.findCollapsesFromExistingVertices(t);for(var e=t.iterator();e.hasNext();){var n=e.next().intValue();this.add(this.edge.getCoordinate(n),n)}},print:function(t){t.println("Intersections:");for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},findCollapsesFromExistingVertices:function(t){for(var e=0;e<this.edge.size()-2;e++){var n=this.edge.getCoordinate(e),i=(this.edge.getCoordinate(e+1),this.edge.getCoordinate(e+2));n.equals2D(i)&&t.add(new b(e+1))}},addEdgeCoordinates:function(t,e,n){var i=e.segmentIndex-t.segmentIndex+2,r=this.edge.getCoordinate(e.segmentIndex),s=e.isInterior()||!e.coord.equals2D(r);s||i--;n.add(new g(t.coord),!1);for(var o=t.segmentIndex+1;o<=e.segmentIndex;o++)n.add(this.edge.getCoordinate(o));s&&n.add(new g(e.coord))},iterator:function(){return this.nodeMap.values().iterator()},addSplitEdges:function(t){this.addEndpoints(),this.addCollapsedNodes();for(var e=this.iterator(),n=e.next();e.hasNext();){var i=e.next(),r=this.createSplitEdge(n,i);t.add(r),n=i}},findCollapseIndex:function(t,e,n){if(!t.coord.equals2D(e.coord))return!1;var i=e.segmentIndex-t.segmentIndex;return e.isInterior()||i--,1===i?(n[0]=t.segmentIndex+1,!0):!1},findCollapsesFromInsertedNodes:function(t){for(var e=new Array(1).fill(null),n=this.iterator(),i=n.next();n.hasNext();){var r=n.next(),s=this.findCollapseIndex(i,r,e);s&&t.add(new b(e[0])),i=r}},getEdge:function(){return this.edge},addEndpoints:function(){var t=this.edge.size()-1;this.add(this.edge.getCoordinate(0),0),this.add(this.edge.getCoordinate(t),t)},createSplitEdge:function(t,e){var n=e.segmentIndex-t.segmentIndex+2,i=this.edge.getCoordinate(e.segmentIndex),r=e.isInterior()||!e.coord.equals2D(i);r||n--;var s=new Array(n).fill(null),o=0;s[o++]=new g(t.coord);for(var a=t.segmentIndex+1;a<=e.segmentIndex;a++)s[o++]=this.edge.getCoordinate(a);return r&&(s[o]=new g(e.coord)),new Ke(s,this.edge.getData())},add:function(t,e){var n=new Xe(this.edge,t,e,this.edge.getSegmentOctant(e)),i=this.nodeMap.get(n);return null!==i?(f.isTrue(i.coord.equals2D(t),"Found equal nodes with different coordinates"),i):(this.nodeMap.put(n,n),n)},checkSplitEdgesCorrectness:function(t){var e=this.edge.getCoordinates(),n=t.get(0),i=n.getCoordinate(0);if(!i.equals2D(e[0]))throw new l("bad split edge start point at "+i);var r=t.get(t.size()-1),s=r.getCoordinates(),o=s[s.length-1];if(!o.equals2D(e[e.length-1]))throw new l("bad split edge end point at "+o)},interfaces_:function(){return[]},getClass:function(){return He}}),e(We.prototype,{next:function(){return null===this.currNode?(this.currNode=this.nextNode,this.currSegIndex=this.currNode.segmentIndex,this.readNextNode(),this.currNode):null===this.nextNode?null:this.nextNode.segmentIndex===this.currNode.segmentIndex?(this.currNode=this.nextNode,this.currSegIndex=this.currNode.segmentIndex,this.readNextNode(),this.currNode):(this.nextNode.segmentIndex>this.currNode.segmentIndex,null)},remove:function(){throw new UnsupportedOperationException(this.getClass().getName())},hasNext:function(){return null!==this.nextNode},readNextNode:function(){this.nodeIt.hasNext()?this.nextNode=this.nodeIt.next():this.nextNode=null},interfaces_:function(){return[p]},getClass:function(){return We}}),e(je.prototype,{addIntersection:function(t,e){},interfaces_:function(){return[be]},getClass:function(){return je}}),e(Ke.prototype,{getCoordinates:function(){return this.pts},size:function(){return this.pts.length},getCoordinate:function(t){return this.pts[t]},isClosed:function(){return this.pts[0].equals(this.pts[this.pts.length-1])},getSegmentOctant:function(t){return t===this.pts.length-1?-1:this.safeOctant(this.getCoordinate(t),this.getCoordinate(t+1))},setData:function(t){this.data=t},safeOctant:function(t,e){return t.equals2D(e)?0:Pe.octant(t,e)},getData:function(){return this.data},addIntersection:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.addIntersectionNode(t,e)}else if(4===arguments.length){var n=arguments[0],i=arguments[1],r=(arguments[2],arguments[3]),s=new g(n.getIntersection(r));this.addIntersection(s,i)}},toString:function(){return se.toLineString(new Gt(this.pts))},getNodeList:function(){return this.nodeList},addIntersectionNode:function(t,e){var n=e,i=n+1;if(i<this.pts.length){var r=this.pts[i];t.equals2D(r)&&(n=i)}var s=this.nodeList.add(t,n);return s},addIntersections:function(t,e,n){for(var i=0;i<t.getIntersectionNum();i++)this.addIntersection(t,e,n,i)},interfaces_:function(){return[je]},getClass:function(){return Ke}}),Ke.getNodedSubstrings=function(){if(1===arguments.length){var t=arguments[0],e=new I;return Ke.getNodedSubstrings(t,e),e}if(2===arguments.length)for(var n=arguments[0],i=arguments[1],r=n.iterator();r.hasNext();){var s=r.next();s.getNodeList().addSplitEdges(i)}},e(Ze.prototype,{overlap:function(){if(2===arguments.length){arguments[0],arguments[1]}else if(4===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];t.getLineSegment(e,this.overlapSeg1),n.getLineSegment(i,this.overlapSeg2),this.overlap(this.overlapSeg1,this.overlapSeg2)}},interfaces_:function(){return[]},getClass:function(){return Ze}}),e(Qe.prototype,{getLineSegment:function(t,e){e.p0=this.pts[t],e.p1=this.pts[t+1]},computeSelect:function(t,e,n,i){var r=this.pts[e],s=this.pts[n];if(i.tempEnv1.init(r,s),n-e===1)return i.select(this,e),null;if(!t.intersects(i.tempEnv1))return null;var o=Math.trunc((e+n)/2);
o>e&&this.computeSelect(t,e,o,i),n>o&&this.computeSelect(t,o,n,i)},getCoordinates:function(){for(var t=new Array(this.end-this.start+1).fill(null),e=0,n=this.start;n<=this.end;n++)t[e++]=this.pts[n];return t},computeOverlaps:function(t,e){this.computeOverlapsInternal(this.start,this.end,t,t.start,t.end,e)},setId:function(t){this.id=t},select:function(t,e){this.computeSelect(t,this.start,this.end,e)},getEnvelope:function(){if(null===this.env){var t=this.pts[this.start],e=this.pts[this.end];this.env=new C(t,e)}return this.env},getEndIndex:function(){return this.end},getStartIndex:function(){return this.start},getContext:function(){return this.context},getId:function(){return this.id},computeOverlapsInternal:function(t,e,n,i,r,s){var o=this.pts[t],a=this.pts[e],u=n.pts[i],l=n.pts[r];if(e-t===1&&r-i===1)return s.overlap(this,t,n,i),null;if(s.tempEnv1.init(o,a),s.tempEnv2.init(u,l),!s.tempEnv1.intersects(s.tempEnv2))return null;var h=Math.trunc((t+e)/2),c=Math.trunc((i+r)/2);h>t&&(c>i&&this.computeOverlapsInternal(t,h,n,i,c,s),r>c&&this.computeOverlapsInternal(t,h,n,c,r,s)),e>h&&(c>i&&this.computeOverlapsInternal(h,e,n,i,c,s),r>c&&this.computeOverlapsInternal(h,e,n,c,r,s))},interfaces_:function(){return[]},getClass:function(){return Qe}}),e(Je.prototype,{interfaces_:function(){return[]},getClass:function(){return Je}}),Je.isNorthern=function(t){return t===Je.NE||t===Je.NW},Je.isOpposite=function(t,e){if(t===e)return!1;var n=(t-e+4)%4;return 2===n},Je.commonHalfPlane=function(t,e){if(t===e)return t;var n=(t-e+4)%4;if(2===n)return-1;var i=e>t?t:e,r=t>e?t:e;return 0===i&&3===r?3:i},Je.isInHalfPlane=function(t,e){return e===Je.SE?t===Je.SE||t===Je.SW:t===e||t===e+1},Je.quadrant=function(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1];if(0===t&&0===e)throw new i("Cannot compute the quadrant for point ( "+t+", "+e+" )");return t>=0?e>=0?Je.NE:Je.SE:e>=0?Je.NW:Je.SW}if(arguments[0]instanceof g&&arguments[1]instanceof g){var n=arguments[0],r=arguments[1];if(r.x===n.x&&r.y===n.y)throw new i("Cannot compute the quadrant for two identical points "+n);return r.x>=n.x?r.y>=n.y?Je.NE:Je.SE:r.y>=n.y?Je.NW:Je.SW}},Je.NE=0,Je.NW=1,Je.SW=2,Je.SE=3,e($e.prototype,{interfaces_:function(){return[]},getClass:function(){return $e}}),$e.getChainStartIndices=function(t){var e=0,n=new I;n.add(new b(e));do{var i=$e.findChainEnd(t,e);n.add(new b(i)),e=i}while(e<t.length-1);var r=$e.toIntArray(n);return r},$e.findChainEnd=function(t,e){for(var n=e;n<t.length-1&&t[n].equals2D(t[n+1]);)n++;if(n>=t.length-1)return t.length-1;for(var i=Je.quadrant(t[n],t[n+1]),r=e+1;r<t.length;){if(!t[r-1].equals2D(t[r])){var s=Je.quadrant(t[r-1],t[r]);if(s!==i)break}r++}return r-1},$e.getChains=function(){if(1===arguments.length){var t=arguments[0];return $e.getChains(t,null)}if(2===arguments.length){for(var e=arguments[0],n=arguments[1],i=new I,r=$e.getChainStartIndices(e),s=0;s<r.length-1;s++){var o=new Qe(e,r[s],r[s+1],n);i.add(o)}return i}},$e.toIntArray=function(t){for(var e=new Array(t.size()).fill(null),n=0;n<e.length;n++)e[n]=t.get(n).intValue();return e},e(tn.prototype,{computeNodes:function(t){},getNodedSubstrings:function(){},interfaces_:function(){return[]},getClass:function(){return tn}}),e(en.prototype,{setSegmentIntersector:function(t){this.segInt=t},interfaces_:function(){return[tn]},getClass:function(){return en}}),h(nn,en),e(nn.prototype,{getMonotoneChains:function(){return this.monoChains},getNodedSubstrings:function(){return Ke.getNodedSubstrings(this.nodedSegStrings)},getIndex:function(){return this.index},add:function(t){for(var e=$e.getChains(t.getCoordinates(),t),n=e.iterator();n.hasNext();){var i=n.next();i.setId(this.idCounter++),this.index.insert(i.getEnvelope(),i),this.monoChains.add(i)}},computeNodes:function(t){this.nodedSegStrings=t;for(var e=t.iterator();e.hasNext();)this.add(e.next());this.intersectChains()},intersectChains:function(){for(var t=new rn(this.segInt),e=this.monoChains.iterator();e.hasNext();)for(var n=e.next(),i=this.index.query(n.getEnvelope()),r=i.iterator();r.hasNext();){var s=r.next();if(s.getId()>n.getId()&&(n.computeOverlaps(s,t),this.nOverlaps++),this.segInt.isDone())return null}},interfaces_:function(){return[]},getClass:function(){return nn}}),h(rn,Ze),e(rn.prototype,{overlap:function(){if(4!==arguments.length)return Ze.prototype.overlap.apply(this,arguments);var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3],r=t.getContext(),s=n.getContext();this.si.processIntersections(r,e,s,i)},interfaces_:function(){return[]},getClass:function(){return rn}}),nn.SegmentOverlapAction=rn,h(sn,l),e(sn.prototype,{getCoordinate:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return sn}}),sn.msgWithCoord=function(t,e){return null!==e?t+" [ "+e+" ]":t},e(on.prototype,{processIntersections:function(t,e,n,i){},isDone:function(){},interfaces_:function(){return[]},getClass:function(){return on}}),e(an.prototype,{getInteriorIntersection:function(){return this.interiorIntersection},setCheckEndSegmentsOnly:function(t){this.isCheckEndSegmentsOnly=t},getIntersectionSegments:function(){return this.intSegments},count:function(){return this.intersectionCount},getIntersections:function(){return this.intersections},setFindAllIntersections:function(t){this.findAllIntersections=t},setKeepIntersections:function(t){this.keepIntersections=t},processIntersections:function(t,e,n,i){if(!this.findAllIntersections&&this.hasIntersection())return null;if(t===n&&e===i)return null;if(this.isCheckEndSegmentsOnly){var r=this.isEndSegment(t,e)||this.isEndSegment(n,i);if(!r)return null}var s=t.getCoordinates()[e],o=t.getCoordinates()[e+1],a=n.getCoordinates()[i],u=n.getCoordinates()[i+1];this.li.computeIntersection(s,o,a,u),this.li.hasIntersection()&&this.li.isInteriorIntersection()&&(this.intSegments=new Array(4).fill(null),this.intSegments[0]=s,this.intSegments[1]=o,this.intSegments[2]=a,this.intSegments[3]=u,this.interiorIntersection=this.li.getIntersection(0),this.keepIntersections&&this.intersections.add(this.interiorIntersection),this.intersectionCount++)},isEndSegment:function(t,e){return 0===e?!0:e>=t.size()-2},hasIntersection:function(){return null!==this.interiorIntersection},isDone:function(){return this.findAllIntersections?!1:null!==this.interiorIntersection},interfaces_:function(){return[on]},getClass:function(){return an}}),an.createAllIntersectionsFinder=function(t){var e=new an(t);return e.setFindAllIntersections(!0),e},an.createAnyIntersectionFinder=function(t){return new an(t)},an.createIntersectionCounter=function(t){var e=new an(t);return e.setFindAllIntersections(!0),e.setKeepIntersections(!1),e},e(un.prototype,{execute:function(){return null!==this.segInt?null:void this.checkInteriorIntersections()},getIntersections:function(){return this.segInt.getIntersections()},isValid:function(){return this.execute(),this._isValid},setFindAllIntersections:function(t){this.findAllIntersections=t},checkInteriorIntersections:function(){this._isValid=!0,this.segInt=new an(this.li),this.segInt.setFindAllIntersections(this.findAllIntersections);var t=new nn;return t.setSegmentIntersector(this.segInt),t.computeNodes(this.segStrings),this.segInt.hasIntersection()?(this._isValid=!1,null):void 0},checkValid:function(){if(this.execute(),!this._isValid)throw new sn(this.getErrorMessage(),this.segInt.getInteriorIntersection())},getErrorMessage:function(){if(this._isValid)return"no intersections found";var t=this.segInt.getIntersectionSegments();return"found non-noded intersection between "+se.toLineString(t[0],t[1])+" and "+se.toLineString(t[2],t[3])},interfaces_:function(){return[]},getClass:function(){return un}}),un.computeIntersections=function(t){var e=new un(t);return e.setFindAllIntersections(!0),e.isValid(),e.getIntersections()},e(ln.prototype,{checkValid:function(){this.nv.checkValid()},interfaces_:function(){return[]},getClass:function(){return ln}}),ln.toSegmentStrings=function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();e.add(new Oe(i.getCoordinates(),i))}return e},ln.checkValid=function(t){var e=new ln(t);e.checkValid()},e(hn.prototype,{map:function(t){for(var e=new I,n=0;n<t.getNumGeometries();n++){var i=this.mapOp.map(t.getGeometryN(n));i.isEmpty()||e.add(i)}return t.getFactory().createGeometryCollection(ie.toGeometryArray(e))},interfaces_:function(){return[]},getClass:function(){return hn}}),hn.map=function(t,e){var n=new hn(e);return n.map(t)},e(cn.prototype,{interfaces_:function(){return[]},getClass:function(){return cn}}),cn.opposite=function(t){return t===cn.LEFT?cn.RIGHT:t===cn.RIGHT?cn.LEFT:t},cn.ON=0,cn.LEFT=1,cn.RIGHT=2,e(fn.prototype,{setAllLocations:function(t){for(var e=0;e<this.location.length;e++)this.location[e]=t},isNull:function(){for(var t=0;t<this.location.length;t++)if(this.location[t]!==L.NONE)return!1;return!0},setAllLocationsIfNull:function(t){for(var e=0;e<this.location.length;e++)this.location[e]===L.NONE&&(this.location[e]=t)},isLine:function(){return 1===this.location.length},merge:function(t){if(t.location.length>this.location.length){var e=new Array(3).fill(null);e[cn.ON]=this.location[cn.ON],e[cn.LEFT]=L.NONE,e[cn.RIGHT]=L.NONE,this.location=e}for(var n=0;n<this.location.length;n++)this.location[n]===L.NONE&&n<t.location.length&&(this.location[n]=t.location[n])},getLocations:function(){return this.location},flip:function(){if(this.location.length<=1)return null;var t=this.location[cn.LEFT];this.location[cn.LEFT]=this.location[cn.RIGHT],this.location[cn.RIGHT]=t},toString:function(){var t=new P;return this.location.length>1&&t.append(L.toLocationSymbol(this.location[cn.LEFT])),t.append(L.toLocationSymbol(this.location[cn.ON])),this.location.length>1&&t.append(L.toLocationSymbol(this.location[cn.RIGHT])),t.toString()},setLocations:function(t,e,n){this.location[cn.ON]=t,this.location[cn.LEFT]=e,this.location[cn.RIGHT]=n},get:function(t){return t<this.location.length?this.location[t]:L.NONE},isArea:function(){return this.location.length>1},isAnyNull:function(){for(var t=0;t<this.location.length;t++)if(this.location[t]===L.NONE)return!0;return!1},setLocation:function(){if(1===arguments.length){var t=arguments[0];this.setLocation(cn.ON,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.location[e]=n}},init:function(t){this.location=new Array(t).fill(null),this.setAllLocations(L.NONE)},isEqualOnSide:function(t,e){return this.location[e]===t.location[e]},allPositionsEqual:function(t){for(var e=0;e<this.location.length;e++)if(this.location[e]!==t)return!1;return!0},interfaces_:function(){return[]},getClass:function(){return fn}}),e(gn.prototype,{getGeometryCount:function(){var t=0;return this.elt[0].isNull()||t++,this.elt[1].isNull()||t++,t},setAllLocations:function(t,e){this.elt[t].setAllLocations(e)},isNull:function(t){return this.elt[t].isNull()},setAllLocationsIfNull:function(){if(1===arguments.length){var t=arguments[0];this.setAllLocationsIfNull(0,t),this.setAllLocationsIfNull(1,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.elt[e].setAllLocationsIfNull(n)}},isLine:function(t){return this.elt[t].isLine()},merge:function(t){for(var e=0;2>e;e++)null===this.elt[e]&&null!==t.elt[e]?this.elt[e]=new fn(t.elt[e]):this.elt[e].merge(t.elt[e])},flip:function(){this.elt[0].flip(),this.elt[1].flip()},getLocation:function(){if(1===arguments.length){var t=arguments[0];return this.elt[t].get(cn.ON)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return this.elt[e].get(n)}},toString:function(){var t=new P;return null!==this.elt[0]&&(t.append("A:"),t.append(this.elt[0].toString())),null!==this.elt[1]&&(t.append(" B:"),t.append(this.elt[1].toString())),t.toString()},isArea:function(){if(0===arguments.length)return this.elt[0].isArea()||this.elt[1].isArea();if(1===arguments.length){var t=arguments[0];return this.elt[t].isArea()}},isAnyNull:function(t){return this.elt[t].isAnyNull()},setLocation:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.elt[t].setLocation(cn.ON,e)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.elt[n].setLocation(i,r)}},isEqualOnSide:function(t,e){return this.elt[0].isEqualOnSide(t.elt[0],e)&&this.elt[1].isEqualOnSide(t.elt[1],e)},allPositionsEqual:function(t,e){return this.elt[t].allPositionsEqual(e)},toLine:function(t){this.elt[t].isArea()&&(this.elt[t]=new fn(this.elt[t].location[0]))},interfaces_:function(){return[]},getClass:function(){return gn}}),gn.toLineLabel=function(t){for(var e=new gn(L.NONE),n=0;2>n;n++)e.setLocation(n,t.getLocation(n));return e},e(dn.prototype,{computeRing:function(){if(null!==this.ring)return null;for(var t=new Array(this.pts.size()).fill(null),e=0;e<this.pts.size();e++)t[e]=this.pts.get(e);this.ring=this.geometryFactory.createLinearRing(t),this._isHole=he.isCCW(this.ring.getCoordinates())},isIsolated:function(){return 1===this.label.getGeometryCount()},computePoints:function(t){this.startDe=t;var e=t,n=!0;do{if(null===e)throw new sn("Found null DirectedEdge");if(e.getEdgeRing()===this)throw new sn("Directed Edge visited twice during ring-building at "+e.getCoordinate());this.edges.add(e);var i=e.getLabel();f.isTrue(i.isArea()),this.mergeLabel(i),this.addPoints(e.getEdge(),e.isForward(),n),n=!1,this.setEdgeRing(e,this),e=this.getNext(e)}while(e!==this.startDe)},getLinearRing:function(){return this.ring},getCoordinate:function(t){return this.pts.get(t)},computeMaxNodeDegree:function(){this.maxNodeDegree=0;var t=this.startDe;do{var e=t.getNode(),n=e.getEdges().getOutgoingDegree(this);n>this.maxNodeDegree&&(this.maxNodeDegree=n),t=this.getNext(t)}while(t!==this.startDe);this.maxNodeDegree*=2},addPoints:function(t,e,n){var i=t.getCoordinates();if(e){var r=1;n&&(r=0);for(var s=r;s<i.length;s++)this.pts.add(i[s])}else{var r=i.length-2;n&&(r=i.length-1);for(var s=r;s>=0;s--)this.pts.add(i[s])}},isHole:function(){return this._isHole},setInResult:function(){var t=this.startDe;do t.getEdge().setInResult(!0),t=t.getNext();while(t!==this.startDe)},containsPoint:function(t){var e=this.getLinearRing(),n=e.getEnvelopeInternal();if(!n.contains(t))return!1;if(!he.isPointInRing(t,e.getCoordinates()))return!1;for(var i=this.holes.iterator();i.hasNext();){var r=i.next();if(r.containsPoint(t))return!1}return!0},addHole:function(t){this.holes.add(t)},isShell:function(){return null===this.shell},getLabel:function(){return this.label},getEdges:function(){return this.edges},getMaxNodeDegree:function(){return this.maxNodeDegree<0&&this.computeMaxNodeDegree(),this.maxNodeDegree},getShell:function(){return this.shell},mergeLabel:function(){if(1===arguments.length){var t=arguments[0];this.mergeLabel(t,0),this.mergeLabel(t,1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1],i=e.getLocation(n,cn.RIGHT);if(i===L.NONE)return null;if(this.label.getLocation(n)===L.NONE)return this.label.setLocation(n,i),null}},setShell:function(t){this.shell=t,null!==t&&t.addHole(this)},toPolygon:function(t){for(var e=new Array(this.holes.size()).fill(null),n=0;n<this.holes.size();n++)e[n]=this.holes.get(n).getLinearRing();var i=t.createPolygon(this.getLinearRing(),e);return i},interfaces_:function(){return[]},getClass:function(){return dn}}),h(pn,dn),e(pn.prototype,{setEdgeRing:function(t,e){t.setMinEdgeRing(e)},getNext:function(t){return t.getNextMin()},interfaces_:function(){return[]},getClass:function(){return pn}}),h(vn,dn),e(vn.prototype,{buildMinimalRings:function(){var t=new I,e=this.startDe;do{if(null===e.getMinEdgeRing()){var n=new pn(e,this.geometryFactory);t.add(n)}e=e.getNext()}while(e!==this.startDe);return t},setEdgeRing:function(t,e){t.setEdgeRing(e)},linkDirectedEdgesForMinimalEdgeRings:function(){var t=this.startDe;do{var e=t.getNode();e.getEdges().linkMinimalDirectedEdges(this),t=t.getNext()}while(t!==this.startDe)},getNext:function(t){return t.getNext()},interfaces_:function(){return[]},getClass:function(){return vn}}),e(mn.prototype,{setVisited:function(t){this._isVisited=t},setInResult:function(t){this._isInResult=t},isCovered:function(){return this._isCovered},isCoveredSet:function(){return this._isCoveredSet},setLabel:function(t){this.label=t},getLabel:function(){return this.label},setCovered:function(t){this._isCovered=t,this._isCoveredSet=!0},updateIM:function(t){f.isTrue(this.label.getGeometryCount()>=2,"found partial label"),this.computeIM(t)},isInResult:function(){return this._isInResult},isVisited:function(){return this._isVisited},interfaces_:function(){return[]},getClass:function(){return mn}}),h(yn,mn),e(yn.prototype,{isIncidentEdgeInResult:function(){for(var t=this.getEdges().getEdges().iterator();t.hasNext();){var e=t.next();if(e.getEdge().isInResult())return!0}return!1},isIsolated:function(){return 1===this.label.getGeometryCount()},getCoordinate:function(){return this.coord},print:function(t){t.println("node "+this.coord+" lbl: "+this.label)},computeIM:function(t){},computeMergedLocation:function(t,e){var n=L.NONE;if(n=this.label.getLocation(e),!t.isNull(e)){var i=t.getLocation(e);n!==L.BOUNDARY&&(n=i)}return n},setLabel:function(){if(2!==arguments.length)return mn.prototype.setLabel.apply(this,arguments);var t=arguments[0],e=arguments[1];null===this.label?this.label=new gn(t,e):this.label.setLocation(t,e)},getEdges:function(){return this.edges},mergeLabel:function(){if(arguments[0]instanceof yn){var t=arguments[0];this.mergeLabel(t.label)}else if(arguments[0]instanceof gn)for(var e=arguments[0],n=0;2>n;n++){var i=this.computeMergedLocation(e,n),r=this.label.getLocation(n);r===L.NONE&&this.label.setLocation(n,i)}},add:function(t){this.edges.insert(t),t.setNode(this)},setLabelBoundary:function(t){if(null===this.label)return null;var e=L.NONE;null!==this.label&&(e=this.label.getLocation(t));var n=null;switch(e){case L.BOUNDARY:n=L.INTERIOR;break;case L.INTERIOR:n=L.BOUNDARY;break;default:n=L.BOUNDARY}this.label.setLocation(t,n)},interfaces_:function(){return[]},getClass:function(){return yn}}),e(xn.prototype,{find:function(t){return this.nodeMap.get(t)},addNode:function(){if(arguments[0]instanceof g){var t=arguments[0],e=this.nodeMap.get(t);return null===e&&(e=this.nodeFact.createNode(t),this.nodeMap.put(t,e)),e}if(arguments[0]instanceof yn){var n=arguments[0],e=this.nodeMap.get(n.getCoordinate());return null===e?(this.nodeMap.put(n.getCoordinate(),n),n):(e.mergeLabel(n),e)}},print:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},iterator:function(){return this.nodeMap.values().iterator()},values:function(){return this.nodeMap.values()},getBoundaryNodes:function(t){for(var e=new I,n=this.iterator();n.hasNext();){var i=n.next();i.getLabel().getLocation(t)===L.BOUNDARY&&e.add(i)}return e},add:function(t){var e=t.getCoordinate(),n=this.addNode(e);n.add(t)},interfaces_:function(){return[]},getClass:function(){return xn}}),e(En.prototype,{compareDirection:function(t){return this.dx===t.dx&&this.dy===t.dy?0:this.quadrant>t.quadrant?1:this.quadrant<t.quadrant?-1:he.computeOrientation(t.p0,t.p1,this.p1)},getDy:function(){return this.dy},getCoordinate:function(){return this.p0},setNode:function(t){this.node=t},print:function(t){var e=Math.atan2(this.dy,this.dx),n=this.getClass().getName(),i=n.lastIndexOf("."),r=n.substring(i+1);t.print("  "+r+": "+this.p0+" - "+this.p1+" "+this.quadrant+":"+e+"   "+this.label)},compareTo:function(t){var e=t;return this.compareDirection(e)},getDirectedCoordinate:function(){return this.p1},getDx:function(){return this.dx},getLabel:function(){return this.label},getEdge:function(){return this.edge},getQuadrant:function(){return this.quadrant},getNode:function(){return this.node},toString:function(){var t=Math.atan2(this.dy,this.dx),e=this.getClass().getName(),n=e.lastIndexOf("."),i=e.substring(n+1);return"  "+i+": "+this.p0+" - "+this.p1+" "+this.quadrant+":"+t+"   "+this.label},computeLabel:function(t){},init:function(t,e){this.p0=t,this.p1=e,this.dx=e.x-t.x,this.dy=e.y-t.y,this.quadrant=Je.quadrant(this.dx,this.dy),f.isTrue(!(0===this.dx&&0===this.dy),"EdgeEnd with identical endpoints found")},interfaces_:function(){return[s]},getClass:function(){return En}}),h(In,En),e(In.prototype,{getNextMin:function(){return this.nextMin},getDepth:function(t){return this.depth[t]},setVisited:function(t){this._isVisited=t},computeDirectedLabel:function(){this.label=new gn(this.edge.getLabel()),this._isForward||this.label.flip()},getNext:function(){return this.next},setDepth:function(t,e){if(-999!==this.depth[t]&&this.depth[t]!==e)throw new sn("assigned depths do not match",this.getCoordinate());this.depth[t]=e},isInteriorAreaEdge:function t(){for(var t=!0,e=0;2>e;e++)this.label.isArea(e)&&this.label.getLocation(e,cn.LEFT)===L.INTERIOR&&this.label.getLocation(e,cn.RIGHT)===L.INTERIOR||(t=!1);return t},setNextMin:function(t){this.nextMin=t},print:function(t){En.prototype.print.call(this,t),t.print(" "+this.depth[cn.LEFT]+"/"+this.depth[cn.RIGHT]),t.print(" ("+this.getDepthDelta()+")"),this._isInResult&&t.print(" inResult")},setMinEdgeRing:function(t){this.minEdgeRing=t},isLineEdge:function(){var t=this.label.isLine(0)||this.label.isLine(1),e=!this.label.isArea(0)||this.label.allPositionsEqual(0,L.EXTERIOR),n=!this.label.isArea(1)||this.label.allPositionsEqual(1,L.EXTERIOR);return t&&e&&n},setEdgeRing:function(t){this.edgeRing=t},getMinEdgeRing:function(){return this.minEdgeRing},getDepthDelta:function(){var t=this.edge.getDepthDelta();return this._isForward||(t=-t),t},setInResult:function(t){this._isInResult=t},getSym:function(){return this.sym},isForward:function(){return this._isForward},getEdge:function(){return this.edge},printEdge:function(t){this.print(t),t.print(" "),this._isForward?this.edge.print(t):this.edge.printReverse(t)},setSym:function(t){this.sym=t},setVisitedEdge:function(t){this.setVisited(t),this.sym.setVisited(t)},setEdgeDepths:function(t,e){var n=this.getEdge().getDepthDelta();this._isForward||(n=-n);var i=1;t===cn.LEFT&&(i=-1);var r=cn.opposite(t),s=n*i,o=e+s;this.setDepth(t,e),this.setDepth(r,o)},getEdgeRing:function(){return this.edgeRing},isInResult:function(){return this._isInResult},setNext:function(t){this.next=t},isVisited:function(){return this._isVisited},interfaces_:function(){return[]},getClass:function(){return In}}),In.depthFactor=function(t,e){return t===L.EXTERIOR&&e===L.INTERIOR?1:t===L.INTERIOR&&e===L.EXTERIOR?-1:0},e(Nn.prototype,{createNode:function(t){return new yn(t,null)},interfaces_:function(){return[]},getClass:function(){return Nn}}),e(Cn.prototype,{printEdges:function(t){t.println("Edges:");for(var e=0;e<this.edges.size();e++){t.println("edge "+e+":");var n=this.edges.get(e);n.print(t),n.eiList.print(t)}},find:function(t){return this.nodes.find(t)},addNode:function(){if(arguments[0]instanceof yn){var t=arguments[0];return this.nodes.addNode(t)}if(arguments[0]instanceof g){var e=arguments[0];return this.nodes.addNode(e)}},getNodeIterator:function(){return this.nodes.iterator()},linkResultDirectedEdges:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next();e.getEdges().linkResultDirectedEdges()}},debugPrintln:function(t){A.out.println(t)},isBoundaryNode:function(t,e){var n=this.nodes.find(e);if(null===n)return!1;var i=n.getLabel();return null!==i&&i.getLocation(t)===L.BOUNDARY},linkAllDirectedEdges:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next();e.getEdges().linkAllDirectedEdges()}},matchInSameDirection:function(t,e,n,i){return t.equals(n)?he.computeOrientation(t,e,i)===he.COLLINEAR&&Je.quadrant(t,e)===Je.quadrant(n,i):!1},getEdgeEnds:function(){return this.edgeEndList},debugPrint:function(t){A.out.print(t)},getEdgeIterator:function(){return this.edges.iterator()},findEdgeInSameDirection:function(t,e){for(var n=0;n<this.edges.size();n++){var i=this.edges.get(n),r=i.getCoordinates();if(this.matchInSameDirection(t,e,r[0],r[1]))return i;if(this.matchInSameDirection(t,e,r[r.length-1],r[r.length-2]))return i}return null},insertEdge:function(t){this.edges.add(t)},findEdgeEnd:function(t){for(var e=this.getEdgeEnds().iterator();e.hasNext();){var n=e.next();if(n.getEdge()===t)return n}return null},addEdges:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.edges.add(n);var i=new In(n,!0),r=new In(n,!1);i.setSym(r),r.setSym(i),this.add(i),this.add(r)}},add:function(t){this.nodes.add(t),this.edgeEndList.add(t)},getNodes:function(){return this.nodes.values()},findEdge:function(t,e){for(var n=0;n<this.edges.size();n++){var i=this.edges.get(n),r=i.getCoordinates();if(t.equals(r[0])&&e.equals(r[1]))return i}return null},interfaces_:function(){return[]},getClass:function(){return Cn}}),Cn.linkResultDirectedEdges=function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();n.getEdges().linkResultDirectedEdges()}},e(Sn.prototype,{sortShellsAndHoles:function(t,e,n){for(var i=t.iterator();i.hasNext();){var r=i.next();r.isHole()?n.add(r):e.add(r)}},computePolygons:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next(),r=i.toPolygon(this.geometryFactory);e.add(r)}return e},placeFreeHoles:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next();if(null===i.getShell()){var r=this.findEdgeRingContaining(i,t);if(null===r)throw new sn("unable to assign hole to a shell",i.getCoordinate(0));i.setShell(r)}}},buildMinimalEdgeRings:function(t,e,n){for(var i=new I,r=t.iterator();r.hasNext();){var s=r.next();if(s.getMaxNodeDegree()>2){s.linkDirectedEdgesForMinimalEdgeRings();var o=s.buildMinimalRings(),a=this.findShell(o);null!==a?(this.placePolygonHoles(a,o),e.add(a)):n.addAll(o)}else i.add(s)}return i},containsPoint:function(t){for(var e=this.shellList.iterator();e.hasNext();){var n=e.next();if(n.containsPoint(t))return!0}return!1},buildMaximalEdgeRings:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();if(i.isInResult()&&i.getLabel().isArea()&&null===i.getEdgeRing()){var r=new vn(i,this.geometryFactory);e.add(r),r.setInResult()}}return e},placePolygonHoles:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next();i.isHole()&&i.setShell(t)}},getPolygons:function(){var t=this.computePolygons(this.shellList);return t},findEdgeRingContaining:function(t,e){for(var n=t.getLinearRing(),i=n.getEnvelopeInternal(),r=n.getCoordinateN(0),s=null,o=null,a=e.iterator();a.hasNext();){var u=a.next(),l=u.getLinearRing(),h=l.getEnvelopeInternal();null!==s&&(o=s.getLinearRing().getEnvelopeInternal());var c=!1;h.contains(i)&&he.isPointInRing(r,l.getCoordinates())&&(c=!0),c&&(null===s||o.contains(h))&&(s=u)}return s},findShell:function(t){for(var e=0,n=null,i=t.iterator();i.hasNext();){var r=i.next();r.isHole()||(n=r,e++)}return f.isTrue(1>=e,"found two shells in MinimalEdgeRing list"),n},add:function(){if(1===arguments.length){var t=arguments[0];this.add(t.getEdgeEnds(),t.getNodes())}else if(2===arguments.length){var e=arguments[0],n=arguments[1];Cn.linkResultDirectedEdges(n);var i=this.buildMaximalEdgeRings(e),r=new I,s=this.buildMinimalEdgeRings(i,this.shellList,r);this.sortShellsAndHoles(s,this.shellList,r),this.placeFreeHoles(this.shellList,r)}},interfaces_:function(){return[]},getClass:function(){return Sn}}),e(wn.prototype,{collectLines:function(t){for(var e=this.op.getGraph().getEdgeEnds().iterator();e.hasNext();){var n=e.next();this.collectLineEdge(n,t,this.lineEdgesList),this.collectBoundaryTouchEdge(n,t,this.lineEdgesList)}},labelIsolatedLine:function(t,e){var n=this.ptLocator.locate(t.getCoordinate(),this.op.getArgGeometry(e));t.getLabel().setLocation(e,n)},build:function(t){return this.findCoveredLineEdges(),this.collectLines(t),this.buildLines(t),this.resultLineList},collectLineEdge:function(t,e,n){var i=t.getLabel(),r=t.getEdge();t.isLineEdge()&&(t.isVisited()||!ii.isResultOfOp(i,e)||r.isCovered()||(n.add(r),t.setVisitedEdge(!0)))},findCoveredLineEdges:function(){for(var t=this.op.getGraph().getNodes().iterator();t.hasNext();){var e=t.next();e.getEdges().findCoveredLineEdges()}for(var n=this.op.getGraph().getEdgeEnds().iterator();n.hasNext();){var i=n.next(),r=i.getEdge();if(i.isLineEdge()&&!r.isCoveredSet()){var s=this.op.isCoveredByA(i.getCoordinate());r.setCovered(s)}}},labelIsolatedLines:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=n.getLabel();n.isIsolated()&&(i.isNull(0)?this.labelIsolatedLine(n,0):this.labelIsolatedLine(n,1))}},buildLines:function(t){for(var e=this.lineEdgesList.iterator();e.hasNext();){var n=e.next(),i=(n.getLabel(),this.geometryFactory.createLineString(n.getCoordinates()));this.resultLineList.add(i),n.setInResult(!0)}},collectBoundaryTouchEdge:function(t,e,n){var i=t.getLabel();return t.isLineEdge()?null:t.isVisited()?null:t.isInteriorAreaEdge()?null:t.getEdge().isInResult()?null:(f.isTrue(!(t.isInResult()||t.getSym().isInResult())||!t.getEdge().isInResult()),void(ii.isResultOfOp(i,e)&&e===ii.INTERSECTION&&(n.add(t.getEdge()),t.setVisitedEdge(!0))))},interfaces_:function(){return[]},getClass:function(){return wn}}),e(Ln.prototype,{filterCoveredNodeToPoint:function(t){var e=t.getCoordinate();if(!this.op.isCoveredByLA(e)){var n=this.geometryFactory.createPoint(e);this.resultPointList.add(n)}},extractNonCoveredResultNodes:function(t){for(var e=this.op.getGraph().getNodes().iterator();e.hasNext();){var n=e.next();if(!(n.isInResult()||n.isIncidentEdgeInResult()||0!==n.getEdges().getDegree()&&t!==ii.INTERSECTION)){var i=n.getLabel();ii.isResultOfOp(i,t)&&this.filterCoveredNodeToPoint(n)}}},build:function(t){return this.extractNonCoveredResultNodes(t),this.resultPointList},interfaces_:function(){return[]},getClass:function(){return Ln}}),e(Rn.prototype,{locate:function(t){},interfaces_:function(){return[]},getClass:function(){return Rn}}),e(Tn.prototype,{locate:function(t){return Tn.locate(t,this.geom)},interfaces_:function(){return[Rn]},getClass:function(){return Tn}}),Tn.isPointInRing=function(t,e){return e.getEnvelopeInternal().intersects(t)?he.isPointInRing(t,e.getCoordinates()):!1},Tn.containsPointInPolygon=function(t,e){if(e.isEmpty())return!1;var n=e.getExteriorRing();if(!Tn.isPointInRing(t,n))return!1;for(var i=0;i<e.getNumInteriorRing();i++){var r=e.getInteriorRingN(i);if(Tn.isPointInRing(t,r))return!1}return!0},Tn.containsPoint=function(t,e){if(e instanceof Tt)return Tn.containsPointInPolygon(t,e);if(e instanceof ft)for(var n=new Re(e);n.hasNext();){var i=n.next();if(i!==e&&Tn.containsPoint(t,i))return!0}return!1},Tn.locate=function(t,e){return e.isEmpty()?L.EXTERIOR:Tn.containsPoint(t,e)?L.INTERIOR:L.EXTERIOR},e(Pn.prototype,{getNextCW:function(t){this.getEdges();var e=this.edgeList.indexOf(t),n=e-1;return 0===e&&(n=this.edgeList.size()-1),this.edgeList.get(n)},propagateSideLabels:function(t){for(var e=L.NONE,n=this.iterator();n.hasNext();){var i=n.next(),r=i.getLabel();r.isArea(t)&&r.getLocation(t,cn.LEFT)!==L.NONE&&(e=r.getLocation(t,cn.LEFT))}if(e===L.NONE)return null;for(var s=e,n=this.iterator();n.hasNext();){var i=n.next(),r=i.getLabel();if(r.getLocation(t,cn.ON)===L.NONE&&r.setLocation(t,cn.ON,s),r.isArea(t)){var o=r.getLocation(t,cn.LEFT),a=r.getLocation(t,cn.RIGHT);if(a!==L.NONE){if(a!==s)throw new sn("side location conflict",i.getCoordinate());o===L.NONE&&f.shouldNeverReachHere("found single null side (at "+i.getCoordinate()+")"),s=o}else f.isTrue(r.getLocation(t,cn.LEFT)===L.NONE,"found single null side"),r.setLocation(t,cn.RIGHT,s),r.setLocation(t,cn.LEFT,s)}}},getCoordinate:function(){var t=this.iterator();if(!t.hasNext())return null;var e=t.next();return e.getCoordinate()},print:function(t){A.out.println("EdgeEndStar:   "+this.getCoordinate());for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},isAreaLabelsConsistent:function(t){return this.computeEdgeEndLabels(t.getBoundaryNodeRule()),this.checkAreaLabelsConsistent(0)},checkAreaLabelsConsistent:function(t){var e=this.getEdges();if(e.size()<=0)return!0;var n=e.size()-1,i=e.get(n).getLabel(),r=i.getLocation(t,cn.LEFT);f.isTrue(r!==L.NONE,"Found unlabelled area edge");for(var s=r,o=this.iterator();o.hasNext();){var a=o.next(),u=a.getLabel();
f.isTrue(u.isArea(t),"Found non-area edge");var l=u.getLocation(t,cn.LEFT),h=u.getLocation(t,cn.RIGHT);if(l===h)return!1;if(h!==s)return!1;s=l}return!0},findIndex:function(t){this.iterator();for(var e=0;e<this.edgeList.size();e++){var n=this.edgeList.get(e);if(n===t)return e}return-1},iterator:function(){return this.getEdges().iterator()},getEdges:function(){return null===this.edgeList&&(this.edgeList=new I(this.edgeMap.values())),this.edgeList},getLocation:function(t,e,n){return this.ptInAreaLocation[t]===L.NONE&&(this.ptInAreaLocation[t]=Tn.locate(e,n[t].getGeometry())),this.ptInAreaLocation[t]},toString:function(){var t=new P;t.append("EdgeEndStar:   "+this.getCoordinate()),t.append("\n");for(var e=this.iterator();e.hasNext();){var n=e.next();t.append(n),t.append("\n")}return t.toString()},computeEdgeEndLabels:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();n.computeLabel(t)}},computeLabelling:function(t){this.computeEdgeEndLabels(t[0].getBoundaryNodeRule()),this.propagateSideLabels(0),this.propagateSideLabels(1);for(var e=[!1,!1],n=this.iterator();n.hasNext();)for(var i=n.next(),r=i.getLabel(),s=0;2>s;s++)r.isLine(s)&&r.getLocation(s)===L.BOUNDARY&&(e[s]=!0);for(var n=this.iterator();n.hasNext();)for(var i=n.next(),r=i.getLabel(),s=0;2>s;s++)if(r.isAnyNull(s)){var o=L.NONE;if(e[s])o=L.EXTERIOR;else{var a=i.getCoordinate();o=this.getLocation(s,a,t)}r.setAllLocationsIfNull(s,o)}},getDegree:function(){return this.edgeMap.size()},insertEdgeEnd:function(t,e){this.edgeMap.put(t,e),this.edgeList=null},interfaces_:function(){return[]},getClass:function(){return Pn}}),h(bn,Pn),e(bn.prototype,{linkResultDirectedEdges:function(){this.getResultAreaEdges();for(var t=null,e=null,n=this.SCANNING_FOR_INCOMING,i=0;i<this.resultAreaEdgeList.size();i++){var r=this.resultAreaEdgeList.get(i),s=r.getSym();if(r.getLabel().isArea())switch(null===t&&r.isInResult()&&(t=r),n){case this.SCANNING_FOR_INCOMING:if(!s.isInResult())continue;e=s,n=this.LINKING_TO_OUTGOING;break;case this.LINKING_TO_OUTGOING:if(!r.isInResult())continue;e.setNext(r),n=this.SCANNING_FOR_INCOMING}}if(n===this.LINKING_TO_OUTGOING){if(null===t)throw new sn("no outgoing dirEdge found",this.getCoordinate());f.isTrue(t.isInResult(),"unable to link last incoming dirEdge"),e.setNext(t)}},insert:function(t){var e=t;this.insertEdgeEnd(e,e)},getRightmostEdge:function(){var t=this.getEdges(),e=t.size();if(1>e)return null;var n=t.get(0);if(1===e)return n;var i=t.get(e-1),r=n.getQuadrant(),s=i.getQuadrant();if(Je.isNorthern(r)&&Je.isNorthern(s))return n;if(!Je.isNorthern(r)&&!Je.isNorthern(s))return i;return 0!==n.getDy()?n:0!==i.getDy()?i:(f.shouldNeverReachHere("found two horizontal edges incident on node"),null)},print:function(t){A.out.println("DirectedEdgeStar: "+this.getCoordinate());for(var e=this.iterator();e.hasNext();){var n=e.next();t.print("out "),n.print(t),t.println(),t.print("in "),n.getSym().print(t),t.println()}},getResultAreaEdges:function(){if(null!==this.resultAreaEdgeList)return this.resultAreaEdgeList;this.resultAreaEdgeList=new I;for(var t=this.iterator();t.hasNext();){var e=t.next();(e.isInResult()||e.getSym().isInResult())&&this.resultAreaEdgeList.add(e)}return this.resultAreaEdgeList},updateLabelling:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next(),i=n.getLabel();i.setAllLocationsIfNull(0,t.getLocation(0)),i.setAllLocationsIfNull(1,t.getLocation(1))}},linkAllDirectedEdges:function(){this.getEdges();for(var t=null,e=null,n=this.edgeList.size()-1;n>=0;n--){var i=this.edgeList.get(n),r=i.getSym();null===e&&(e=r),null!==t&&r.setNext(t),t=i}e.setNext(t)},computeDepths:function(){if(1===arguments.length){var t=arguments[0],e=this.findIndex(t),n=(t.getLabel(),t.getDepth(cn.LEFT)),i=t.getDepth(cn.RIGHT),r=this.computeDepths(e+1,this.edgeList.size(),n),s=this.computeDepths(0,e,r);if(s!==i)throw new sn("depth mismatch at "+t.getCoordinate())}else if(3===arguments.length){for(var o=arguments[0],a=arguments[1],u=arguments[2],l=u,h=o;a>h;h++){var c=this.edgeList.get(h);c.getLabel();c.setEdgeDepths(cn.RIGHT,l),l=c.getDepth(cn.LEFT)}return l}},mergeSymLabels:function(){for(var t=this.iterator();t.hasNext();){var e=t.next(),n=e.getLabel();n.merge(e.getSym().getLabel())}},linkMinimalDirectedEdges:function(t){for(var e=null,n=null,i=this.SCANNING_FOR_INCOMING,r=this.resultAreaEdgeList.size()-1;r>=0;r--){var s=this.resultAreaEdgeList.get(r),o=s.getSym();switch(null===e&&s.getEdgeRing()===t&&(e=s),i){case this.SCANNING_FOR_INCOMING:if(o.getEdgeRing()!==t)continue;n=o,i=this.LINKING_TO_OUTGOING;break;case this.LINKING_TO_OUTGOING:if(s.getEdgeRing()!==t)continue;n.setNextMin(s),i=this.SCANNING_FOR_INCOMING}}i===this.LINKING_TO_OUTGOING&&(f.isTrue(null!==e,"found null for first outgoing dirEdge"),f.isTrue(e.getEdgeRing()===t,"unable to link last incoming dirEdge"),n.setNextMin(e))},getOutgoingDegree:function(){if(0===arguments.length){for(var t=0,e=this.iterator();e.hasNext();){var n=e.next();n.isInResult()&&t++}return t}if(1===arguments.length){for(var i=arguments[0],t=0,e=this.iterator();e.hasNext();){var n=e.next();n.getEdgeRing()===i&&t++}return t}},getLabel:function(){return this.label},findCoveredLineEdges:function(){for(var t=L.NONE,e=this.iterator();e.hasNext();){var n=e.next(),i=n.getSym();if(!n.isLineEdge()){if(n.isInResult()){t=L.INTERIOR;break}if(i.isInResult()){t=L.EXTERIOR;break}}}if(t===L.NONE)return null;for(var r=t,e=this.iterator();e.hasNext();){var n=e.next(),i=n.getSym();n.isLineEdge()?n.getEdge().setCovered(r===L.INTERIOR):(n.isInResult()&&(r=L.EXTERIOR),i.isInResult()&&(r=L.INTERIOR))}},computeLabelling:function(t){Pn.prototype.computeLabelling.call(this,t),this.label=new gn(L.NONE);for(var e=this.iterator();e.hasNext();)for(var n=e.next(),i=n.getEdge(),r=i.getLabel(),s=0;2>s;s++){var o=r.getLocation(s);o!==L.INTERIOR&&o!==L.BOUNDARY||this.label.setLocation(s,L.INTERIOR)}},interfaces_:function(){return[]},getClass:function(){return bn}}),h(On,Nn),e(On.prototype,{createNode:function(t){return new yn(t,new bn)},interfaces_:function(){return[]},getClass:function(){return On}}),e(_n.prototype,{computeIntersections:function(t,e){this.mce.computeIntersectsForChain(this.chainIndex,t.mce,t.chainIndex,e)},interfaces_:function(){return[]},getClass:function(){return _n}}),e(Mn.prototype,{isDelete:function(){return this.eventType===Mn.DELETE},setDeleteEventIndex:function(t){this.deleteEventIndex=t},getObject:function(){return this.obj},compareTo:function(t){var e=t;return this.xValue<e.xValue?-1:this.xValue>e.xValue?1:this.eventType<e.eventType?-1:this.eventType>e.eventType?1:0},getInsertEvent:function(){return this.insertEvent},isInsert:function(){return this.eventType===Mn.INSERT},isSameLabel:function(t){return null===this.label?!1:this.label===t.label},getDeleteEventIndex:function(){return this.deleteEventIndex},interfaces_:function(){return[s]},getClass:function(){return Mn}}),Mn.INSERT=1,Mn.DELETE=2,e(Dn.prototype,{interfaces_:function(){return[]},getClass:function(){return Dn}}),e(An.prototype,{isTrivialIntersection:function(t,e,n,i){if(t===n&&1===this.li.getIntersectionNum()){if(An.isAdjacentSegments(e,i))return!0;if(t.isClosed()){var r=t.getNumPoints()-1;if(0===e&&i===r||0===i&&e===r)return!0}}return!1},getProperIntersectionPoint:function(){return this.properIntersectionPoint},setIsDoneIfProperInt:function(t){this.isDoneWhenProperInt=t},hasProperInteriorIntersection:function(){return this.hasProperInterior},isBoundaryPointInternal:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next(),r=i.getCoordinate();if(t.isIntersection(r))return!0}return!1},hasProperIntersection:function(){return this.hasProper},hasIntersection:function(){return this._hasIntersection},isDone:function(){return this._isDone},isBoundaryPoint:function(t,e){return null===e?!1:this.isBoundaryPointInternal(t,e[0])?!0:!!this.isBoundaryPointInternal(t,e[1])},setBoundaryNodes:function(t,e){this.bdyNodes=new Array(2).fill(null),this.bdyNodes[0]=t,this.bdyNodes[1]=e},addIntersections:function(t,e,n,i){if(t===n&&e===i)return null;this.numTests++;var r=t.getCoordinates()[e],s=t.getCoordinates()[e+1],o=n.getCoordinates()[i],a=n.getCoordinates()[i+1];this.li.computeIntersection(r,s,o,a),this.li.hasIntersection()&&(this.recordIsolated&&(t.setIsolated(!1),n.setIsolated(!1)),this.numIntersections++,this.isTrivialIntersection(t,e,n,i)||(this._hasIntersection=!0,!this.includeProper&&this.li.isProper()||(t.addIntersections(this.li,e,0),n.addIntersections(this.li,i,1)),this.li.isProper()&&(this.properIntersectionPoint=this.li.getIntersection(0).copy(),this.hasProper=!0,this.isDoneWhenProperInt&&(this._isDone=!0),this.isBoundaryPoint(this.li,this.bdyNodes)||(this.hasProperInterior=!0))))},interfaces_:function(){return[]},getClass:function(){return An}}),An.isAdjacentSegments=function(t,e){return 1===Math.abs(t-e)},h(Fn,Dn),e(Fn.prototype,{prepareEvents:function(){ho.sort(this.events);for(var t=0;t<this.events.size();t++){var e=this.events.get(t);e.isDelete()&&e.getInsertEvent().setDeleteEventIndex(t)}},computeIntersections:function(){if(1===arguments.length){var t=arguments[0];this.nOverlaps=0,this.prepareEvents();for(var e=0;e<this.events.size();e++){var n=this.events.get(e);if(n.isInsert()&&this.processOverlaps(e,n.getDeleteEventIndex(),n,t),t.isDone())break}}else if(3===arguments.length)if(arguments[2]instanceof An&&R(arguments[0],y)&&R(arguments[1],y)){var i=arguments[0],r=arguments[1],s=arguments[2];this.addEdges(i,i),this.addEdges(r,r),this.computeIntersections(s)}else if("boolean"==typeof arguments[2]&&R(arguments[0],y)&&arguments[1]instanceof An){var o=arguments[0],a=arguments[1],u=arguments[2];u?this.addEdges(o,null):this.addEdges(o),this.computeIntersections(a)}},addEdge:function(t,e){for(var n=t.getMonotoneChainEdge(),i=n.getStartIndexes(),r=0;r<i.length-1;r++){var s=new _n(n,r),o=new Mn(e,n.getMinX(r),s);this.events.add(o),this.events.add(new Mn(n.getMaxX(r),o))}},processOverlaps:function(t,e,n,i){for(var r=n.getObject(),s=t;e>s;s++){var o=this.events.get(s);if(o.isInsert()){var a=o.getObject();n.isSameLabel(o)||(r.computeIntersections(a,i),this.nOverlaps++)}}},addEdges:function(){if(1===arguments.length)for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.addEdge(n,n)}else if(2===arguments.length)for(var i=arguments[0],r=arguments[1],e=i.iterator();e.hasNext();){var n=e.next();this.addEdge(n,r)}},interfaces_:function(){return[]},getClass:function(){return Fn}}),e(Gn.prototype,{getMin:function(){return this.min},intersects:function(t,e){return!(this.min>e||this.max<t)},getMax:function(){return this.max},toString:function(){return se.toLineString(new g(this.min,0),new g(this.max,0))},interfaces_:function(){return[]},getClass:function(){return Gn}}),e(qn.prototype,{compare:function(t,e){var n=t,i=e,r=(n.min+n.max)/2,s=(i.min+i.max)/2;return s>r?-1:r>s?1:0},interfaces_:function(){return[a]},getClass:function(){return qn}}),Gn.NodeComparator=qn,h(Bn,Gn),e(Bn.prototype,{query:function(t,e,n){return this.intersects(t,e)?void n.visitItem(this.item):null},interfaces_:function(){return[]},getClass:function(){return Bn}}),h(zn,Gn),e(zn.prototype,{buildExtent:function(t,e){this.min=Math.min(t.min,e.min),this.max=Math.max(t.max,e.max)},query:function(t,e,n){return this.intersects(t,e)?(null!==this.node1&&this.node1.query(t,e,n),void(null!==this.node2&&this.node2.query(t,e,n))):null},interfaces_:function(){return[]},getClass:function(){return zn}}),e(Vn.prototype,{buildTree:function(){ho.sort(this.leaves,new IntervalRTreeNode.NodeComparator);for(var t=this.leaves,e=null,n=new I;;){if(this.buildLevel(t,n),1===n.size())return n.get(0);e=t,t=n,n=e}},insert:function(t,e,n){if(null!==this.root)throw new IllegalStateException("Index cannot be added to once it has been queried");this.leaves.add(new Bn(t,e,n))},query:function(t,e,n){this.init(),this.root.query(t,e,n)},buildRoot:function(){return null!==this.root?null:void(this.root=this.buildTree())},printNode:function(t){A.out.println(se.toLineString(new g(t.min,this.level),new g(t.max,this.level)))},init:function(){return null!==this.root?null:void this.buildRoot()},buildLevel:function(t,e){this.level++,e.clear();for(var n=0;n<t.size();n+=2){var i=t.get(n),r=n+1<t.size()?t.get(n):null;if(null===r)e.add(i);else{var s=new zn(t.get(n),t.get(n+1));e.add(s)}}},interfaces_:function(){return[]},getClass:function(){return Vn}}),e(kn.prototype,{filter:function(t){if(this.isForcedToLineString&&t instanceof bt){var e=t.getFactory().createLineString(t.getCoordinateSequence());return this.lines.add(e),null}t instanceof St&&this.lines.add(t)},setForceToLineString:function(t){this.isForcedToLineString=t},interfaces_:function(){return[q]},getClass:function(){return kn}}),kn.getGeometry=function(){if(1===arguments.length){var t=arguments[0];return t.getFactory().buildGeometry(kn.getLines(t))}if(2===arguments.length){var e=arguments[0],n=arguments[1];return e.getFactory().buildGeometry(kn.getLines(e,n))}},kn.getLines=function(){if(1===arguments.length){var t=arguments[0];return kn.getLines(t,!1)}if(2===arguments.length){if(R(arguments[0],v)&&R(arguments[1],v)){for(var e=arguments[0],n=arguments[1],i=e.iterator();i.hasNext();){var r=i.next();kn.getLines(r,n)}return n}if(arguments[0]instanceof B&&"boolean"==typeof arguments[1]){var s=arguments[0],o=arguments[1],a=new I;return s.apply(new kn(a,o)),a}if(arguments[0]instanceof B&&R(arguments[1],v)){var u=arguments[0],l=arguments[1];return u instanceof St?l.add(u):u.apply(new kn(l)),l}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&R(arguments[0],v)&&R(arguments[1],v)){for(var h=arguments[0],c=arguments[1],f=arguments[2],i=h.iterator();i.hasNext();){var r=i.next();kn.getLines(r,c,f)}return c}if("boolean"==typeof arguments[2]&&arguments[0]instanceof B&&R(arguments[1],v)){var g=arguments[0],d=arguments[1],p=arguments[2];return g.apply(new kn(d,p)),d}}},e(Yn.prototype,{visitItem:function(t){this.items.add(t)},getItems:function(){return this.items},interfaces_:function(){return[Ae]},getClass:function(){return Yn}}),e(Un.prototype,{locate:function(t){var e=new le(t),n=new Xn(e);return this.index.query(t.y,t.y,n),e.getLocation()},interfaces_:function(){return[Rn]},getClass:function(){return Un}}),e(Xn.prototype,{visitItem:function(t){var e=t;this.counter.countSegment(e.getCoordinate(0),e.getCoordinate(1))},interfaces_:function(){return[Ae]},getClass:function(){return Xn}}),e(Hn.prototype,{init:function(t){for(var e=kn.getLines(t),n=e.iterator();n.hasNext();){var i=n.next(),r=i.getCoordinates();this.addLine(r)}},addLine:function(t){for(var e=1;e<t.length;e++){var n=new ce(t[e-1],t[e]),i=Math.min(n.p0.y,n.p1.y),r=Math.max(n.p0.y,n.p1.y);this.index.insert(i,r,n)}},query:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new Yn;return this.index.query(t,e,n),n.getItems()}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];this.index.query(i,r,s)}},interfaces_:function(){return[]},getClass:function(){return Hn}}),Un.SegmentVisitor=Xn,Un.IntervalIndexedGeometry=Hn,e(Wn.prototype,{getSegmentIndex:function(){return this.segmentIndex},getCoordinate:function(){return this.coord},print:function(t){t.print(this.coord),t.print(" seg # = "+this.segmentIndex),t.println(" dist = "+this.dist)},compareTo:function(t){var e=t;return this.compare(e.segmentIndex,e.dist)},isEndPoint:function(t){return 0===this.segmentIndex&&0===this.dist?!0:this.segmentIndex===t},toString:function(){return this.coord+" seg # = "+this.segmentIndex+" dist = "+this.dist},getDistance:function(){return this.dist},compare:function(t,e){return this.segmentIndex<t?-1:this.segmentIndex>t?1:this.dist<e?-1:this.dist>e?1:0},interfaces_:function(){return[s]},getClass:function(){return Wn}}),e(jn.prototype,{print:function(t){t.println("Intersections:");for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},iterator:function(){return this.nodeMap.values().iterator()},addSplitEdges:function(t){this.addEndpoints();for(var e=this.iterator(),n=e.next();e.hasNext();){var i=e.next(),r=this.createSplitEdge(n,i);t.add(r),n=i}},addEndpoints:function(){var t=this.edge.pts.length-1;this.add(this.edge.pts[0],0,0),this.add(this.edge.pts[t],t,0)},createSplitEdge:function(t,e){var n=e.segmentIndex-t.segmentIndex+2,i=this.edge.pts[e.segmentIndex],r=e.dist>0||!e.coord.equals2D(i);r||n--;var s=new Array(n).fill(null),o=0;s[o++]=new g(t.coord);for(var a=t.segmentIndex+1;a<=e.segmentIndex;a++)s[o++]=this.edge.pts[a];return r&&(s[o]=e.coord),new Jn(s,new gn(this.edge.label))},add:function(t,e,n){var i=new Wn(t,e,n),r=this.nodeMap.get(i);return null!==r?r:(this.nodeMap.put(i,i),i)},isIntersection:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();if(n.coord.equals(t))return!0}return!1},interfaces_:function(){return[]},getClass:function(){return jn}}),e(Kn.prototype,{getChainStartIndices:function(t){var e=0,n=new I;n.add(new b(e));do{var i=this.findChainEnd(t,e);n.add(new b(i)),e=i}while(e<t.length-1);var r=Kn.toIntArray(n);return r},findChainEnd:function(t,e){for(var n=Je.quadrant(t[e],t[e+1]),i=e+1;i<t.length;){var r=Je.quadrant(t[i-1],t[i]);if(r!==n)break;i++}return i-1},interfaces_:function(){return[]},getClass:function(){return Kn}}),Kn.toIntArray=function(t){for(var e=new Array(t.size()).fill(null),n=0;n<e.length;n++)e[n]=t.get(n).intValue();return e},e(Zn.prototype,{getCoordinates:function(){return this.pts},getMaxX:function(t){var e=this.pts[this.startIndex[t]].x,n=this.pts[this.startIndex[t+1]].x;return e>n?e:n},getMinX:function(t){var e=this.pts[this.startIndex[t]].x,n=this.pts[this.startIndex[t+1]].x;return n>e?e:n},computeIntersectsForChain:function(){if(4===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.computeIntersectsForChain(this.startIndex[t],this.startIndex[t+1],e,e.startIndex[n],e.startIndex[n+1],i)}else if(6===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3],u=arguments[4],l=arguments[5],h=this.pts[r],c=this.pts[s],f=o.pts[a],g=o.pts[u];if(s-r===1&&u-a===1)return l.addIntersections(this.e,r,o.e,a),null;if(this.env1.init(h,c),this.env2.init(f,g),!this.env1.intersects(this.env2))return null;var d=Math.trunc((r+s)/2),p=Math.trunc((a+u)/2);d>r&&(p>a&&this.computeIntersectsForChain(r,d,o,a,p,l),u>p&&this.computeIntersectsForChain(r,d,o,p,u,l)),s>d&&(p>a&&this.computeIntersectsForChain(d,s,o,a,p,l),u>p&&this.computeIntersectsForChain(d,s,o,p,u,l))}},getStartIndexes:function(){return this.startIndex},computeIntersects:function(t,e){for(var n=0;n<this.startIndex.length-1;n++)for(var i=0;i<t.startIndex.length-1;i++)this.computeIntersectsForChain(n,t,i,e)},interfaces_:function(){return[]},getClass:function(){return Zn}}),e(Qn.prototype,{getDepth:function(t,e){return this.depth[t][e]},setDepth:function(t,e,n){this.depth[t][e]=n},isNull:function(){if(0===arguments.length){for(var t=0;2>t;t++)for(var e=0;3>e;e++)if(this.depth[t][e]!==Qn.NULL_VALUE)return!1;return!0}if(1===arguments.length){var n=arguments[0];return this.depth[n][1]===Qn.NULL_VALUE}if(2===arguments.length){var i=arguments[0],r=arguments[1];return this.depth[i][r]===Qn.NULL_VALUE}},normalize:function(){for(var t=0;2>t;t++)if(!this.isNull(t)){var e=this.depth[t][1];this.depth[t][2]<e&&(e=this.depth[t][2]),0>e&&(e=0);for(var n=1;3>n;n++){var i=0;this.depth[t][n]>e&&(i=1),this.depth[t][n]=i}}},getDelta:function(t){return this.depth[t][cn.RIGHT]-this.depth[t][cn.LEFT]},getLocation:function(t,e){return this.depth[t][e]<=0?L.EXTERIOR:L.INTERIOR},toString:function(){return"A: "+this.depth[0][1]+","+this.depth[0][2]+" B: "+this.depth[1][1]+","+this.depth[1][2]},add:function(){if(1===arguments.length)for(var t=arguments[0],e=0;2>e;e++)for(var n=1;3>n;n++){var i=t.getLocation(e,n);i!==L.EXTERIOR&&i!==L.INTERIOR||(this.isNull(e,n)?this.depth[e][n]=Qn.depthAtLocation(i):this.depth[e][n]+=Qn.depthAtLocation(i))}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];o===L.INTERIOR&&this.depth[r][s]++}},interfaces_:function(){return[]},getClass:function(){return Qn}}),Qn.depthAtLocation=function(t){return t===L.EXTERIOR?0:t===L.INTERIOR?1:Qn.NULL_VALUE},Qn.NULL_VALUE=-1,h(Jn,mn),e(Jn.prototype,{getDepth:function(){return this.depth},getCollapsedEdge:function(){var t=new Array(2).fill(null);t[0]=this.pts[0],t[1]=this.pts[1];var e=new Jn(t,gn.toLineLabel(this.label));return e},isIsolated:function(){return this._isIsolated},getCoordinates:function(){return this.pts},setIsolated:function(t){this._isIsolated=t},setName:function(t){this.name=t},equals:function(t){if(!(t instanceof Jn))return!1;var e=t;if(this.pts.length!==e.pts.length)return!1;for(var n=!0,i=!0,r=this.pts.length,s=0;s<this.pts.length;s++)if(this.pts[s].equals2D(e.pts[s])||(n=!1),this.pts[s].equals2D(e.pts[--r])||(i=!1),!n&&!i)return!1;return!0},getCoordinate:function(){if(0===arguments.length)return this.pts.length>0?this.pts[0]:null;if(1===arguments.length){var t=arguments[0];return this.pts[t]}},print:function(t){t.print("edge "+this.name+": "),t.print("LINESTRING (");for(var e=0;e<this.pts.length;e++)e>0&&t.print(","),t.print(this.pts[e].x+" "+this.pts[e].y);t.print(")  "+this.label+" "+this.depthDelta)},computeIM:function(t){Jn.updateIM(this.label,t)},isCollapsed:function(){return this.label.isArea()?3!==this.pts.length?!1:!!this.pts[0].equals(this.pts[2]):!1},isClosed:function(){return this.pts[0].equals(this.pts[this.pts.length-1])},getMaximumSegmentIndex:function(){return this.pts.length-1},getDepthDelta:function(){return this.depthDelta},getNumPoints:function(){return this.pts.length},printReverse:function(t){t.print("edge "+this.name+": ");for(var e=this.pts.length-1;e>=0;e--)t.print(this.pts[e]+" ");t.println("")},getMonotoneChainEdge:function(){return null===this.mce&&(this.mce=new Zn(this)),this.mce},getEnvelope:function(){if(null===this.env){this.env=new C;for(var t=0;t<this.pts.length;t++)this.env.expandToInclude(this.pts[t])}return this.env},addIntersection:function(t,e,n,i){var r=new g(t.getIntersection(i)),s=e,o=t.getEdgeDistance(n,i),a=s+1;if(a<this.pts.length){var u=this.pts[a];r.equals2D(u)&&(s=a,o=0)}this.eiList.add(r,s,o)},toString:function(){var t=new P;t.append("edge "+this.name+": "),t.append("LINESTRING (");for(var e=0;e<this.pts.length;e++)e>0&&t.append(","),t.append(this.pts[e].x+" "+this.pts[e].y);return t.append(")  "+this.label+" "+this.depthDelta),t.toString()},isPointwiseEqual:function(t){if(this.pts.length!==t.pts.length)return!1;for(var e=0;e<this.pts.length;e++)if(!this.pts[e].equals2D(t.pts[e]))return!1;return!0},setDepthDelta:function(t){this.depthDelta=t},getEdgeIntersectionList:function(){return this.eiList},addIntersections:function(t,e,n){for(var i=0;i<t.getIntersectionNum();i++)this.addIntersection(t,e,n,i)},interfaces_:function(){return[]},getClass:function(){return Jn}}),Jn.updateIM=function(){if(2!==arguments.length)return mn.prototype.updateIM.apply(this,arguments);var t=arguments[0],e=arguments[1];e.setAtLeastIfValid(t.getLocation(0,cn.ON),t.getLocation(1,cn.ON),1),t.isArea()&&(e.setAtLeastIfValid(t.getLocation(0,cn.LEFT),t.getLocation(1,cn.LEFT),2),e.setAtLeastIfValid(t.getLocation(0,cn.RIGHT),t.getLocation(1,cn.RIGHT),2))},h($n,Cn),e($n.prototype,{insertBoundaryPoint:function(t,e){var n=this.nodes.addNode(e),i=n.getLabel(),r=1,s=L.NONE;s=i.getLocation(t,cn.ON),s===L.BOUNDARY&&r++;var o=$n.determineBoundary(this.boundaryNodeRule,r);i.setLocation(t,o)},computeSelfNodes:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.computeSelfNodes(t,e,!1)}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2],s=new An(n,!0,!1);s.setIsDoneIfProperInt(r);var o=this.createEdgeSetIntersector(),a=this.parentGeom instanceof bt||this.parentGeom instanceof Tt||this.parentGeom instanceof Ot,u=i||!a;return o.computeIntersections(this.edges,s,u),this.addSelfIntersectionNodes(this.argIndex),s}},computeSplitEdges:function(t){for(var e=this.edges.iterator();e.hasNext();){var n=e.next();n.eiList.addSplitEdges(t)}},computeEdgeIntersections:function(t,e,n){var i=new An(e,n,!0);i.setBoundaryNodes(this.getBoundaryNodes(),t.getBoundaryNodes());var r=this.createEdgeSetIntersector();return r.computeIntersections(this.edges,t.edges,i),i},getGeometry:function(){return this.parentGeom},getBoundaryNodeRule:function(){return this.boundaryNodeRule},hasTooFewPoints:function(){return this._hasTooFewPoints},addPoint:function(){if(arguments[0]instanceof Lt){var t=arguments[0],e=t.getCoordinate();this.insertPoint(this.argIndex,e,L.INTERIOR)}else if(arguments[0]instanceof g){var n=arguments[0];this.insertPoint(this.argIndex,n,L.INTERIOR)}},addPolygon:function(t){this.addPolygonRing(t.getExteriorRing(),L.EXTERIOR,L.INTERIOR);for(var e=0;e<t.getNumInteriorRing();e++){var n=t.getInteriorRingN(e);this.addPolygonRing(n,L.INTERIOR,L.EXTERIOR)}},addEdge:function(t){this.insertEdge(t);var e=t.getCoordinates();this.insertPoint(this.argIndex,e[0],L.BOUNDARY),this.insertPoint(this.argIndex,e[e.length-1],L.BOUNDARY)},addLineString:function(t){var e=H.removeRepeatedPoints(t.getCoordinates());if(e.length<2)return this._hasTooFewPoints=!0,this.invalidPoint=e[0],null;var n=new Jn(e,new gn(this.argIndex,L.INTERIOR));this.lineEdgeMap.put(t,n),this.insertEdge(n),f.isTrue(e.length>=2,"found LineString with single point"),this.insertBoundaryPoint(this.argIndex,e[0]),this.insertBoundaryPoint(this.argIndex,e[e.length-1])},getInvalidPoint:function(){return this.invalidPoint},getBoundaryPoints:function(){for(var t=this.getBoundaryNodes(),e=new Array(t.size()).fill(null),n=0,i=t.iterator();i.hasNext();){var r=i.next();e[n++]=r.getCoordinate().copy()}return e},getBoundaryNodes:function(){return null===this.boundaryNodes&&(this.boundaryNodes=this.nodes.getBoundaryNodes(this.argIndex)),this.boundaryNodes},addSelfIntersectionNode:function(t,e,n){return this.isBoundaryNode(t,e)?null:void(n===L.BOUNDARY&&this.useBoundaryDeterminationRule?this.insertBoundaryPoint(t,e):this.insertPoint(t,e,n))},addPolygonRing:function(t,e,n){if(t.isEmpty())return null;var i=H.removeRepeatedPoints(t.getCoordinates());if(i.length<4)return this._hasTooFewPoints=!0,this.invalidPoint=i[0],null;var r=e,s=n;he.isCCW(i)&&(r=n,s=e);var o=new Jn(i,new gn(this.argIndex,L.BOUNDARY,r,s));this.lineEdgeMap.put(t,o),this.insertEdge(o),this.insertPoint(this.argIndex,i[0],L.BOUNDARY)},insertPoint:function(t,e,n){var i=this.nodes.addNode(e),r=i.getLabel();null===r?i.label=new gn(t,n):r.setLocation(t,n)},createEdgeSetIntersector:function(){return new Fn},addSelfIntersectionNodes:function(t){for(var e=this.edges.iterator();e.hasNext();)for(var n=e.next(),i=n.getLabel().getLocation(t),r=n.eiList.iterator();r.hasNext();){var s=r.next();this.addSelfIntersectionNode(t,s.coord,i)}},add:function(){if(1!==arguments.length)return Cn.prototype.add.apply(this,arguments);var t=arguments[0];if(t.isEmpty())return null;if(t instanceof Ot&&(this.useBoundaryDeterminationRule=!1),t instanceof Tt)this.addPolygon(t);else if(t instanceof St)this.addLineString(t);else if(t instanceof Lt)this.addPoint(t);else if(t instanceof Pt)this.addCollection(t);else if(t instanceof gt)this.addCollection(t);else if(t instanceof Ot)this.addCollection(t);else{if(!(t instanceof ft))throw new UnsupportedOperationException(t.getClass().getName());this.addCollection(t)}},addCollection:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);this.add(n)}},locate:function(t){return R(this.parentGeom,Rt)&&this.parentGeom.getNumGeometries()>50?(null===this.areaPtLocator&&(this.areaPtLocator=new Un(this.parentGeom)),this.areaPtLocator.locate(t)):this.ptLocator.locate(t,this.parentGeom)},findEdge:function(){if(1===arguments.length){var t=arguments[0];return this.lineEdgeMap.get(t)}return Cn.prototype.findEdge.apply(this,arguments)},interfaces_:function(){return[]},getClass:function(){return $n}}),$n.determineBoundary=function(t,e){return t.isInBoundary(e)?L.BOUNDARY:L.INTERIOR},e(ti.prototype,{getArgGeometry:function(t){return this.arg[t].getGeometry()},setComputationPrecision:function(t){this.resultPrecisionModel=t,this.li.setPrecisionModel(this.resultPrecisionModel)},interfaces_:function(){return[]},getClass:function(){return ti}}),e(ei.prototype,{compareTo:function(t){var e=t,n=ei.compareOriented(this.pts,this._orientation,e.pts,e._orientation);return n},interfaces_:function(){return[s]},getClass:function(){return ei}}),ei.orientation=function(t){return 1===H.increasingDirection(t)},ei.compareOriented=function(t,e,n,i){for(var r=e?1:-1,s=i?1:-1,o=e?t.length:-1,a=i?n.length:-1,u=e?0:t.length-1,l=i?0:n.length-1;;){var h=t[u].compareTo(n[l]);if(0!==h)return h;u+=r,l+=s;var c=u===o,f=l===a;if(c&&!f)return-1;if(!c&&f)return 1;if(c&&f)return 0}},e(ni.prototype,{print:function(t){t.print("MULTILINESTRING ( ");for(var e=0;e<this.edges.size();e++){var n=this.edges.get(e);e>0&&t.print(","),t.print("(");for(var i=n.getCoordinates(),r=0;r<i.length;r++)r>0&&t.print(","),t.print(i[r].x+" "+i[r].y);t.println(")")}t.print(")  ")},addAll:function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next())},findEdgeIndex:function(t){for(var e=0;e<this.edges.size();e++)if(this.edges.get(e).equals(t))return e;return-1},iterator:function(){return this.edges.iterator()},getEdges:function(){return this.edges},get:function(t){return this.edges.get(t)},findEqualEdge:function(t){var e=new ei(t.getCoordinates()),n=this.ocaMap.get(e);return n},add:function(t){this.edges.add(t);var e=new ei(t.getCoordinates());this.ocaMap.put(e,t)},interfaces_:function(){return[]},getClass:function(){return ni}}),h(ii,ti),e(ii.prototype,{insertUniqueEdge:function(t){var e=this.edgeList.findEqualEdge(t);if(null!==e){var n=e.getLabel(),i=t.getLabel();e.isPointwiseEqual(t)||(i=new gn(t.getLabel()),i.flip());var r=e.getDepth();r.isNull()&&r.add(n),r.add(i),n.merge(i)}else this.edgeList.add(t)},getGraph:function(){return this.graph},cancelDuplicateResultEdges:function(){for(var t=this.graph.getEdgeEnds().iterator();t.hasNext();){var e=t.next(),n=e.getSym();e.isInResult()&&n.isInResult()&&(e.setInResult(!1),n.setInResult(!1))}},isCoveredByLA:function(t){return this.isCovered(t,this.resultLineList)?!0:!!this.isCovered(t,this.resultPolyList)},computeGeometry:function(t,e,n,i){var r=new I;return r.addAll(t),r.addAll(e),r.addAll(n),r.isEmpty()?ii.createEmptyResult(i,this.arg[0].getGeometry(),this.arg[1].getGeometry(),this.geomFact):this.geomFact.buildGeometry(r)},mergeSymLabels:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();e.getEdges().mergeSymLabels()}},isCovered:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next(),r=this.ptLocator.locate(t,i);if(r!==L.EXTERIOR)return!0}return!1},replaceCollapsedEdges:function(){for(var t=new I,e=this.edgeList.iterator();e.hasNext();){var n=e.next();n.isCollapsed()&&(e.remove(),t.add(n.getCollapsedEdge()))}this.edgeList.addAll(t)},updateNodeLabelling:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next(),n=e.getEdges().getLabel();e.getLabel().merge(n)}},getResultGeometry:function(t){return this.computeOverlay(t),this.resultGeom},insertUniqueEdges:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.insertUniqueEdge(n)}},computeOverlay:function(t){this.copyPoints(0),this.copyPoints(1),this.arg[0].computeSelfNodes(this.li,!1),this.arg[1].computeSelfNodes(this.li,!1),this.arg[0].computeEdgeIntersections(this.arg[1],this.li,!0);var e=new I;this.arg[0].computeSplitEdges(e),this.arg[1].computeSplitEdges(e);this.insertUniqueEdges(e),this.computeLabelsFromDepths(),this.replaceCollapsedEdges(),ln.checkValid(this.edgeList.getEdges()),this.graph.addEdges(this.edgeList.getEdges()),this.computeLabelling(),this.labelIncompleteNodes(),this.findResultAreaEdges(t),this.cancelDuplicateResultEdges();var n=new Sn(this.geomFact);n.add(this.graph),this.resultPolyList=n.getPolygons();var i=new wn(this,this.geomFact,this.ptLocator);this.resultLineList=i.build(t);var r=new Ln(this,this.geomFact,this.ptLocator);this.resultPointList=r.build(t),
this.resultGeom=this.computeGeometry(this.resultPointList,this.resultLineList,this.resultPolyList,t)},labelIncompleteNode:function(t,e){var n=this.ptLocator.locate(t.getCoordinate(),this.arg[e].getGeometry());t.getLabel().setLocation(e,n)},copyPoints:function(t){for(var e=this.arg[t].getNodeIterator();e.hasNext();){var n=e.next(),i=this.graph.addNode(n.getCoordinate());i.setLabel(t,n.getLabel().getLocation(t))}},findResultAreaEdges:function(t){for(var e=this.graph.getEdgeEnds().iterator();e.hasNext();){var n=e.next(),i=n.getLabel();i.isArea()&&!n.isInteriorAreaEdge()&&ii.isResultOfOp(i.getLocation(0,cn.RIGHT),i.getLocation(1,cn.RIGHT),t)&&n.setInResult(!0)}},computeLabelsFromDepths:function(){for(var t=this.edgeList.iterator();t.hasNext();){var e=t.next(),n=e.getLabel(),i=e.getDepth();if(!i.isNull()){i.normalize();for(var r=0;2>r;r++)n.isNull(r)||!n.isArea()||i.isNull(r)||(0===i.getDelta(r)?n.toLine(r):(f.isTrue(!i.isNull(r,cn.LEFT),"depth of LEFT side has not been initialized"),n.setLocation(r,cn.LEFT,i.getLocation(r,cn.LEFT)),f.isTrue(!i.isNull(r,cn.RIGHT),"depth of RIGHT side has not been initialized"),n.setLocation(r,cn.RIGHT,i.getLocation(r,cn.RIGHT))))}}},computeLabelling:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();e.getEdges().computeLabelling(this.arg)}this.mergeSymLabels(),this.updateNodeLabelling()},labelIncompleteNodes:function(){for(var t=0,e=this.graph.getNodes().iterator();e.hasNext();){var n=e.next(),i=n.getLabel();n.isIsolated()&&(t++,i.isNull(0)?this.labelIncompleteNode(n,0):this.labelIncompleteNode(n,1)),n.getEdges().updateLabelling(i)}},isCoveredByA:function(t){return!!this.isCovered(t,this.resultPolyList)},interfaces_:function(){return[]},getClass:function(){return ii}}),ii.overlayOp=function(t,e,n){var i=new ii(t,e),r=i.getResultGeometry(n);return r},ii.intersection=function(t,e){if(t.isEmpty()||e.isEmpty())return ii.createEmptyResult(ii.INTERSECTION,t,e,t.getFactory());if(t.isGeometryCollection()){var n=e;return hn.map(t,{interfaces_:function(){return[MapOp]},map:function(t){return t.intersection(n)}})}return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.INTERSECTION)},ii.symDifference=function(t,e){if(t.isEmpty()||e.isEmpty()){if(t.isEmpty()&&e.isEmpty())return ii.createEmptyResult(ii.SYMDIFFERENCE,t,e,t.getFactory());if(t.isEmpty())return e.copy();if(e.isEmpty())return t.copy()}return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.SYMDIFFERENCE)},ii.resultDimension=function(t,e,n){var i=e.getDimension(),r=n.getDimension(),s=-1;switch(t){case ii.INTERSECTION:s=Math.min(i,r);break;case ii.UNION:s=Math.max(i,r);break;case ii.DIFFERENCE:s=i;break;case ii.SYMDIFFERENCE:s=Math.max(i,r)}return s},ii.createEmptyResult=function(t,e,n,i){var r=null;switch(ii.resultDimension(t,e,n)){case-1:r=i.createGeometryCollection(new Array(0).fill(null));break;case 0:r=i.createPoint();break;case 1:r=i.createLineString();break;case 2:r=i.createPolygon()}return r},ii.difference=function(t,e){return t.isEmpty()?ii.createEmptyResult(ii.DIFFERENCE,t,e,t.getFactory()):e.isEmpty()?t.copy():(t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.DIFFERENCE))},ii.isResultOfOp=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=t.getLocation(0),i=t.getLocation(1);return ii.isResultOfOp(n,i,e)}if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];switch(r===L.BOUNDARY&&(r=L.INTERIOR),s===L.BOUNDARY&&(s=L.INTERIOR),o){case ii.INTERSECTION:return r===L.INTERIOR&&s===L.INTERIOR;case ii.UNION:return r===L.INTERIOR||s===L.INTERIOR;case ii.DIFFERENCE:return r===L.INTERIOR&&s!==L.INTERIOR;case ii.SYMDIFFERENCE:return r===L.INTERIOR&&s!==L.INTERIOR||r!==L.INTERIOR&&s===L.INTERIOR}return!1}},ii.INTERSECTION=1,ii.UNION=2,ii.DIFFERENCE=3,ii.SYMDIFFERENCE=4,e(ri.prototype,{selfSnap:function(t){var e=new Ie(t),n=e.snapTo(t,this.snapTolerance);return n},removeCommonBits:function(t){this.cbr=new Se,this.cbr.add(t[0]),this.cbr.add(t[1]);var e=new Array(2).fill(null);return e[0]=this.cbr.removeCommonBits(t[0].copy()),e[1]=this.cbr.removeCommonBits(t[1].copy()),e},prepareResult:function(t){return this.cbr.addCommonBits(t),t},getResultGeometry:function(t){var e=this.snap(this.geom),n=ii.overlayOp(e[0],e[1],t);return this.prepareResult(n)},checkValid:function(t){t.isValid()||A.out.println("Snapped geometry is invalid")},computeSnapTolerance:function(){this.snapTolerance=Ie.computeOverlaySnapTolerance(this.geom[0],this.geom[1])},snap:function(t){var e=this.removeCommonBits(t),n=Ie.snap(e[0],e[1],this.snapTolerance);return n},interfaces_:function(){return[]},getClass:function(){return ri}}),ri.overlayOp=function(t,e,n){var i=new ri(t,e);return i.getResultGeometry(n)},ri.union=function(t,e){return ri.overlayOp(t,e,ii.UNION)},ri.intersection=function(t,e){return ri.overlayOp(t,e,ii.INTERSECTION)},ri.symDifference=function(t,e){return ri.overlayOp(t,e,ii.SYMDIFFERENCE)},ri.difference=function(t,e){return ri.overlayOp(t,e,ii.DIFFERENCE)},e(si.prototype,{getResultGeometry:function(t){var e=null,n=!1,i=null;try{e=ii.overlayOp(this.geom[0],this.geom[1],t);var r=!0;r&&(n=!0)}catch(t){if(!(t instanceof l))throw t;i=t}finally{}if(!n)try{e=ri.overlayOp(this.geom[0],this.geom[1],t)}catch(t){throw t instanceof l?i:t}finally{}return e},interfaces_:function(){return[]},getClass:function(){return si}}),si.overlayOp=function(t,e,n){var i=new si(t,e);return i.getResultGeometry(n)},si.union=function(t,e){return si.overlayOp(t,e,ii.UNION)},si.intersection=function(t,e){return si.overlayOp(t,e,ii.INTERSECTION)},si.symDifference=function(t,e){return si.overlayOp(t,e,ii.SYMDIFFERENCE)},si.difference=function(t,e){return si.overlayOp(t,e,ii.DIFFERENCE)},e(oi.prototype,{addPolygon:function(t){if(t.isEmpty())return null;var e=null,n=0,i=this.horizontalBisector(t);if(0===i.getLength())n=0,e=i.getCoordinate();else{var r=si.overlayOp(i,t,ii.INTERSECTION),s=this.widestGeometry(r);n=s.getEnvelopeInternal().getWidth(),e=oi.centre(s.getEnvelopeInternal())}(null===this.interiorPoint||n>this.maxWidth)&&(this.interiorPoint=e,this.maxWidth=n)},getInteriorPoint:function(){return this.interiorPoint},widestGeometry:function t(){if(arguments[0]instanceof ft){var e=arguments[0];if(e.isEmpty())return e;for(var t=e.getGeometryN(0),n=1;n<e.getNumGeometries();n++)e.getGeometryN(n).getEnvelopeInternal().getWidth()>t.getEnvelopeInternal().getWidth()&&(t=e.getGeometryN(n));return t}if(arguments[0]instanceof B){var i=arguments[0];return i instanceof ft?this.widestGeometry(i):i}},horizontalBisector:function(t){var e=t.getEnvelopeInternal(),n=ai.getBisectorY(t);return this.factory.createLineString([new g(e.getMinX(),n),new g(e.getMaxX(),n)])},add:function(t){if(t instanceof Tt)this.addPolygon(t);else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.add(e.getGeometryN(n))},interfaces_:function(){return[]},getClass:function(){return oi}}),oi.centre=function(t){return new g(oi.avg(t.getMinX(),t.getMaxX()),oi.avg(t.getMinY(),t.getMaxY()))},oi.avg=function(t,e){return(t+e)/2},e(ai.prototype,{updateInterval:function(t){t<=this.centreY?t>this.loY&&(this.loY=t):t>this.centreY&&t<this.hiY&&(this.hiY=t)},getBisectorY:function(){this.process(this.poly.getExteriorRing());for(var t=0;t<this.poly.getNumInteriorRing();t++)this.process(this.poly.getInteriorRingN(t));var e=oi.avg(this.hiY,this.loY);return e},process:function(t){for(var e=t.getCoordinateSequence(),n=0;n<e.size();n++){var i=e.getY(n);this.updateInterval(i)}},interfaces_:function(){return[]},getClass:function(){return ai}}),ai.getBisectorY=function(t){var e=new ai(t);return e.getBisectorY()},oi.SafeBisectorFinder=ai,e(ui.prototype,{addEndpoints:function(){if(arguments[0]instanceof B){var t=arguments[0];if(t instanceof St)this.addEndpoints(t.getCoordinates());else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.addEndpoints(e.getGeometryN(n))}else if(arguments[0]instanceof Array){var i=arguments[0];this.add(i[0]),this.add(i[i.length-1])}},getInteriorPoint:function(){return this.interiorPoint},addInterior:function(){if(arguments[0]instanceof B){var t=arguments[0];if(t instanceof St)this.addInterior(t.getCoordinates());else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.addInterior(e.getGeometryN(n))}else if(arguments[0]instanceof Array)for(var i=arguments[0],n=1;n<i.length-1;n++)this.add(i[n])},add:function(t){var e=t.distance(this.centroid);e<this.minDistance&&(this.interiorPoint=new g(t),this.minDistance=e)},interfaces_:function(){return[]},getClass:function(){return ui}}),e(li.prototype,{getInteriorPoint:function(){return this.interiorPoint},add:function(){if(arguments[0]instanceof B){var t=arguments[0];if(t instanceof Lt)this.add(t.getCoordinate());else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.add(e.getGeometryN(n))}else if(arguments[0]instanceof g){var i=arguments[0],r=i.distance(this.centroid);r<this.minDistance&&(this.interiorPoint=new g(i),this.minDistance=r)}},interfaces_:function(){return[]},getClass:function(){return li}}),e(hi.prototype,{interfaces_:function(){return[]},getClass:function(){return hi}}),hi.toDegrees=function(t){return 180*t/Math.PI},hi.normalize=function(t){for(;t>Math.PI;)t-=hi.PI_TIMES_2;for(;t<=-Math.PI;)t+=hi.PI_TIMES_2;return t},hi.angle=function(){if(1===arguments.length){var t=arguments[0];return Math.atan2(t.y,t.x)}if(2===arguments.length){var e=arguments[0],n=arguments[1],i=n.x-e.x,r=n.y-e.y;return Math.atan2(r,i)}},hi.isAcute=function(t,e,n){var i=t.x-e.x,r=t.y-e.y,s=n.x-e.x,o=n.y-e.y,a=i*s+r*o;return a>0},hi.isObtuse=function(t,e,n){var i=t.x-e.x,r=t.y-e.y,s=n.x-e.x,o=n.y-e.y,a=i*s+r*o;return 0>a},hi.interiorAngle=function(t,e,n){var i=hi.angle(e,t),r=hi.angle(e,n);return Math.abs(r-i)},hi.normalizePositive=function(t){if(0>t){for(;0>t;)t+=hi.PI_TIMES_2;t>=hi.PI_TIMES_2&&(t=0)}else{for(;t>=hi.PI_TIMES_2;)t-=hi.PI_TIMES_2;0>t&&(t=0)}return t},hi.angleBetween=function(t,e,n){var i=hi.angle(e,t),r=hi.angle(e,n);return hi.diff(i,r)},hi.diff=function(t,e){var n=null;return n=e>t?e-t:t-e,n>Math.PI&&(n=2*Math.PI-n),n},hi.toRadians=function(t){return t*Math.PI/180},hi.getTurn=function(t,e){var n=Math.sin(e-t);return n>0?hi.COUNTERCLOCKWISE:0>n?hi.CLOCKWISE:hi.NONE},hi.angleBetweenOriented=function(t,e,n){var i=hi.angle(e,t),r=hi.angle(e,n),s=r-i;return s<=-Math.PI?s+hi.PI_TIMES_2:s>Math.PI?s-hi.PI_TIMES_2:s},hi.PI_TIMES_2=2*Math.PI,hi.PI_OVER_2=Math.PI/2,hi.PI_OVER_4=Math.PI/4,hi.COUNTERCLOCKWISE=he.COUNTERCLOCKWISE,hi.CLOCKWISE=he.CLOCKWISE,hi.NONE=he.COLLINEAR,e(ci.prototype,{area:function(){return ci.area(this.p0,this.p1,this.p2)},signedArea:function(){return ci.signedArea(this.p0,this.p1,this.p2)},interpolateZ:function(t){if(null===t)throw new i("Supplied point is null.");return ci.interpolateZ(t,this.p0,this.p1,this.p2)},longestSideLength:function(){return ci.longestSideLength(this.p0,this.p1,this.p2)},isAcute:function(){return ci.isAcute(this.p0,this.p1,this.p2)},circumcentre:function(){return ci.circumcentre(this.p0,this.p1,this.p2)},area3D:function(){return ci.area3D(this.p0,this.p1,this.p2)},centroid:function(){return ci.centroid(this.p0,this.p1,this.p2)},inCentre:function(){return ci.inCentre(this.p0,this.p1,this.p2)},interfaces_:function(){return[]},getClass:function(){return ci}}),ci.area=function(t,e,n){return Math.abs(((n.x-t.x)*(e.y-t.y)-(e.x-t.x)*(n.y-t.y))/2)},ci.signedArea=function(t,e,n){return((n.x-t.x)*(e.y-t.y)-(e.x-t.x)*(n.y-t.y))/2},ci.det=function(t,e,n,i){return t*i-e*n},ci.interpolateZ=function(t,e,n,i){var r=e.x,s=e.y,o=n.x-r,a=i.x-r,u=n.y-s,l=i.y-s,h=o*l-a*u,c=t.x-r,f=t.y-s,g=(l*c-a*f)/h,d=(-u*c+o*f)/h,p=e.z+g*(n.z-e.z)+d*(i.z-e.z);return p},ci.longestSideLength=function(t,e,n){var i=t.distance(e),r=e.distance(n),s=n.distance(t),o=i;return r>o&&(o=r),s>o&&(o=s),o},ci.isAcute=function(t,e,n){return hi.isAcute(t,e,n)&&hi.isAcute(e,n,t)?!!hi.isAcute(n,t,e):!1},ci.circumcentre=function(t,e,n){var i=n.x,r=n.y,s=t.x-i,o=t.y-r,a=e.x-i,u=e.y-r,l=2*ci.det(s,o,a,u),h=ci.det(o,s*s+o*o,u,a*a+u*u),c=ci.det(s,s*s+o*o,a,a*a+u*u),f=i-h/l,d=r+c/l;return new g(f,d)},ci.perpendicularBisector=function(t,e){var n=e.x-t.x,i=e.y-t.y,r=new F(t.x+n/2,t.y+i/2,1),s=new F(t.x-i+n/2,t.y+n+i/2,1);return new F(r,s)},ci.angleBisector=function(t,e,n){var i=e.distance(t),r=e.distance(n),s=i/(i+r),o=n.x-t.x,a=n.y-t.y,u=new g(t.x+s*o,t.y+s*a);return u},ci.area3D=function(t,e,n){var i=e.x-t.x,r=e.y-t.y,s=e.z-t.z,o=n.x-t.x,a=n.y-t.y,u=n.z-t.z,l=r*u-s*a,h=s*o-i*u,c=i*a-r*o,f=l*l+h*h+c*c,g=Math.sqrt(f)/2;return g},ci.centroid=function(t,e,n){var i=(t.x+e.x+n.x)/3,r=(t.y+e.y+n.y)/3;return new g(i,r)},ci.inCentre=function(t,e,n){var i=e.distance(n),r=t.distance(n),s=t.distance(e),o=i+r+s,a=(i*t.x+r*e.x+s*n.x)/o,u=(i*t.y+r*e.y+s*n.y)/o;return new g(a,u)},e(fi.prototype,{getRadius:function(){return this.compute(),this.radius},getDiameter:function(){switch(this.compute(),this.extremalPts.length){case 0:return this.input.getFactory().createLineString();case 1:return this.input.getFactory().createPoint(this.centre)}var t=this.extremalPts[0],e=this.extremalPts[1];return this.input.getFactory().createLineString([t,e])},getExtremalPoints:function(){return this.compute(),this.extremalPts},computeCirclePoints:function(){if(this.input.isEmpty())return this.extremalPts=new Array(0).fill(null),null;if(1===this.input.getNumPoints()){var t=this.input.getCoordinates();return this.extremalPts=[new g(t[0])],null}var e=this.input.convexHull(),n=e.getCoordinates(),t=n;if(n[0].equals2D(n[n.length-1])&&(t=new Array(n.length-1).fill(null),H.copyDeep(n,0,t,0,n.length-1)),t.length<=2)return this.extremalPts=H.copyDeep(t),null;for(var i=fi.lowestPoint(t),r=fi.pointWitMinAngleWithX(t,i),s=0;s<t.length;s++){var o=fi.pointWithMinAngleWithSegment(t,i,r);if(hi.isObtuse(i,o,r))return this.extremalPts=[new g(i),new g(r)],null;if(hi.isObtuse(o,i,r))i=o;else{if(!hi.isObtuse(o,r,i))return this.extremalPts=[new g(i),new g(r),new g(o)],null;r=o}}f.shouldNeverReachHere("Logic failure in Minimum Bounding Circle algorithm!")},compute:function(){return null!==this.extremalPts?null:(this.computeCirclePoints(),this.computeCentre(),void(null!==this.centre&&(this.radius=this.centre.distance(this.extremalPts[0]))))},getFarthestPoints:function(){switch(this.compute(),this.extremalPts.length){case 0:return this.input.getFactory().createLineString();case 1:return this.input.getFactory().createPoint(this.centre)}var t=this.extremalPts[0],e=this.extremalPts[this.extremalPts.length-1];return this.input.getFactory().createLineString([t,e])},getCircle:function(){if(this.compute(),null===this.centre)return this.input.getFactory().createPolygon();var t=this.input.getFactory().createPoint(this.centre);return 0===this.radius?t:t.buffer(this.radius)},getCentre:function(){return this.compute(),this.centre},computeCentre:function(){switch(this.extremalPts.length){case 0:this.centre=null;break;case 1:this.centre=this.extremalPts[0];break;case 2:this.centre=new g((this.extremalPts[0].x+this.extremalPts[1].x)/2,(this.extremalPts[0].y+this.extremalPts[1].y)/2);break;case 3:this.centre=ci.circumcentre(this.extremalPts[0],this.extremalPts[1],this.extremalPts[2])}},interfaces_:function(){return[]},getClass:function(){return fi}}),fi.pointWitMinAngleWithX=function(t,e){for(var n=r.MAX_VALUE,i=null,s=0;s<t.length;s++){var o=t[s];if(o!==e){var a=o.x-e.x,u=o.y-e.y;0>u&&(u=-u);var l=Math.sqrt(a*a+u*u),h=u/l;n>h&&(n=h,i=o)}}return i},fi.lowestPoint=function(t){for(var e=t[0],n=1;n<t.length;n++)t[n].y<e.y&&(e=t[n]);return e},fi.pointWithMinAngleWithSegment=function(t,e,n){for(var i=r.MAX_VALUE,s=null,o=0;o<t.length;o++){var a=t[o];if(a!==e&&a!==n){var u=hi.angleBetween(e,a,n);i>u&&(i=u,s=a)}}return s},e(gi.prototype,{getWidthCoordinate:function(){return this.computeMinimumDiameter(),this.minWidthPt},getSupportingSegment:function(){return this.computeMinimumDiameter(),this.inputGeom.getFactory().createLineString([this.minBaseSeg.p0,this.minBaseSeg.p1])},getDiameter:function(){if(this.computeMinimumDiameter(),null===this.minWidthPt)return this.inputGeom.getFactory().createLineString(null);var t=this.minBaseSeg.project(this.minWidthPt);return this.inputGeom.getFactory().createLineString([t,this.minWidthPt])},computeWidthConvex:function(t){t instanceof Tt?this.convexHullPts=t.getExteriorRing().getCoordinates():this.convexHullPts=t.getCoordinates(),0===this.convexHullPts.length?(this.minWidth=0,this.minWidthPt=null,this.minBaseSeg=null):1===this.convexHullPts.length?(this.minWidth=0,this.minWidthPt=this.convexHullPts[0],this.minBaseSeg.p0=this.convexHullPts[0],this.minBaseSeg.p1=this.convexHullPts[0]):2===this.convexHullPts.length||3===this.convexHullPts.length?(this.minWidth=0,this.minWidthPt=this.convexHullPts[0],this.minBaseSeg.p0=this.convexHullPts[0],this.minBaseSeg.p1=this.convexHullPts[1]):this.computeConvexRingMinDiameter(this.convexHullPts)},computeConvexRingMinDiameter:function(t){this.minWidth=r.MAX_VALUE;for(var e=1,n=new ce,i=0;i<t.length-1;i++)n.p0=t[i],n.p1=t[i+1],e=this.findMaxPerpDistance(t,n,e)},computeMinimumDiameter:function(){if(null!==this.minWidthPt)return null;if(this.isConvex)this.computeWidthConvex(this.inputGeom);else{var t=new me(this.inputGeom).getConvexHull();this.computeWidthConvex(t)}},getLength:function(){return this.computeMinimumDiameter(),this.minWidth},findMaxPerpDistance:function(t,e,n){for(var i=e.distancePerpendicular(t[n]),r=i,s=n,o=s;r>=i;)i=r,s=o,o=gi.nextIndex(t,s),r=e.distancePerpendicular(t[o]);return i<this.minWidth&&(this.minPtIndex=s,this.minWidth=i,this.minWidthPt=t[this.minPtIndex],this.minBaseSeg=new ce(e)),s},getMinimumRectangle:function(){if(this.computeMinimumDiameter(),0===this.minWidth)return this.minBaseSeg.p0.equals2D(this.minBaseSeg.p1)?this.inputGeom.getFactory().createPoint(this.minBaseSeg.p0):this.minBaseSeg.toGeometry(this.inputGeom.getFactory());for(var t=this.minBaseSeg.p1.x-this.minBaseSeg.p0.x,e=this.minBaseSeg.p1.y-this.minBaseSeg.p0.y,n=r.MAX_VALUE,i=-r.MAX_VALUE,s=r.MAX_VALUE,o=-r.MAX_VALUE,a=0;a<this.convexHullPts.length;a++){var u=gi.computeC(t,e,this.convexHullPts[a]);u>i&&(i=u),n>u&&(n=u);var l=gi.computeC(-e,t,this.convexHullPts[a]);l>o&&(o=l),s>l&&(s=l)}var h=gi.computeSegmentForLine(-t,-e,o),c=gi.computeSegmentForLine(-t,-e,s),f=gi.computeSegmentForLine(-e,t,i),g=gi.computeSegmentForLine(-e,t,n),d=f.lineIntersection(h),p=g.lineIntersection(h),v=g.lineIntersection(c),m=f.lineIntersection(c),y=this.inputGeom.getFactory().createLinearRing([d,p,v,m,d]);return this.inputGeom.getFactory().createPolygon(y,null)},interfaces_:function(){return[]},getClass:function(){return gi}}),gi.nextIndex=function(t,e){return e++,e>=t.length&&(e=0),e},gi.computeC=function(t,e,n){return t*n.y-e*n.x},gi.getMinimumDiameter=function(t){return new gi(t).getDiameter()},gi.getMinimumRectangle=function(t){return new gi(t).getMinimumRectangle()},gi.computeSegmentForLine=function(t,e,n){var i=null,r=null;return Math.abs(e)>Math.abs(t)?(i=new g(0,n/e),r=new g(1,n/e-t/e)):(i=new g(n/t,0),r=new g(n/t-e/t,1)),new ce(i,r)};var co=Object.freeze({Centroid:ge,CGAlgorithms:he,ConvexHull:me,InteriorPointArea:oi,InteriorPointLine:ui,InteriorPointPoint:li,RobustLineIntersector:ae,MinimumBoundingCircle:fi,MinimumDiameter:gi});e(di.prototype,{getResultGeometry:function(){return new pi(this.distanceTolerance).transform(this.inputGeom)},setDistanceTolerance:function(t){if(0>=t)throw new i("Tolerance must be positive");this.distanceTolerance=t},interfaces_:function(){return[]},getClass:function(){return di}}),di.densifyPoints=function(t,e,n){for(var i=new ce,r=new N,s=0;s<t.length-1;s++){i.p0=t[s],i.p1=t[s+1],r.add(i.p0,!1);var o=i.getLength(),a=Math.trunc(o/e)+1;if(a>1)for(var u=o/a,l=1;a>l;l++){var h=l*u/o,c=i.pointAlong(h);n.makePrecise(c),r.add(c,!1)}}return r.add(t[t.length-1],!1),r.toCoordinateArray()},di.densify=function(t,e){var n=new di(t);return n.setDistanceTolerance(e),n.getResultGeometry()},h(pi,xe),e(pi.prototype,{transformMultiPolygon:function(t,e){var n=xe.prototype.transformMultiPolygon.call(this,t,e);return this.createValidArea(n)},transformPolygon:function(t,e){var n=xe.prototype.transformPolygon.call(this,t,e);return e instanceof Ot?n:this.createValidArea(n)},transformCoordinates:function(t,e){var n=t.toCoordinateArray(),i=di.densifyPoints(n,this.distanceTolerance,e.getPrecisionModel());return e instanceof St&&1===i.length&&(i=new Array(0).fill(null)),this.factory.getCoordinateSequenceFactory().create(i)},createValidArea:function(t){return t.buffer(0)},interfaces_:function(){return[]},getClass:function(){return pi}}),di.DensifyTransformer=pi;var fo=Object.freeze({Densifier:di});e(vi.prototype,{find:function(t){var e=this;do{if(null===e)return null;if(e.dest().equals2D(t))return e;e=e.oNext()}while(e!==this);return null},dest:function(){return this._sym._orig},oNext:function(){return this._sym._next},insert:function(t){if(this.oNext()===this)return this.insertAfter(t),null;var e=this.compareTo(t),n=this;do{var i=n.oNext(),r=i.compareTo(t);if(r!==e||i===this)return n.insertAfter(t),null;n=i}while(n!==this);f.shouldNeverReachHere()},insertAfter:function(t){f.equals(this._orig,t.orig());var e=this.oNext();this._sym.setNext(t),t.sym().setNext(e)},degree:function t(){var t=0,e=this;do t++,e=e.oNext();while(e!==this);return t},equals:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this._orig.equals2D(t)&&this._sym._orig.equals(e)}},deltaY:function(){return this._sym._orig.y-this._orig.y},sym:function(){return this._sym},prev:function(){return this._sym.next()._sym},compareAngularDirection:function(t){var e=this.deltaX(),n=this.deltaY(),i=t.deltaX(),r=t.deltaY();if(e===i&&n===r)return 0;var s=Je.quadrant(e,n),o=Je.quadrant(i,r);return s>o?1:o>s?-1:he.computeOrientation(t._orig,t.dest(),this.dest())},prevNode:function(){for(var t=this;2===t.degree();)if(t=t.prev(),t===this)return null;return t},compareTo:function(t){var e=t,n=this.compareAngularDirection(e);return n},next:function(){return this._next},setSym:function(t){this._sym=t},orig:function(){return this._orig},toString:function(){return"HE("+this._orig.x+" "+this._orig.y+", "+this._sym._orig.x+" "+this._sym._orig.y+")"},setNext:function(t){this._next=t},init:function(t){this.setSym(t),t.setSym(this),this.setNext(t),t.setNext(this)},deltaX:function(){return this._sym._orig.x-this._orig.x},interfaces_:function(){return[]},getClass:function(){return vi}}),vi.init=function(t,e){if(null!==t._sym||null!==e._sym||null!==t._next||null!==e._next)throw new IllegalStateException("Edges are already initialized");return t.init(e),t},vi.create=function(t,e){var n=new vi(t),i=new vi(e);return n.init(i),n},h(mi,vi),e(mi.prototype,{mark:function(){this._isMarked=!0},setMark:function(t){this._isMarked=t},isMarked:function(){return this._isMarked},interfaces_:function(){return[]},getClass:function(){return mi}}),mi.setMarkBoth=function(t,e){t.setMark(e),t.sym().setMark(e)},mi.isMarked=function(t){return t.isMarked()},mi.setMark=function(t,e){t.setMark(e)},mi.markBoth=function(t){t.mark(),t.sym().mark()},mi.mark=function(t){t.mark()},e(yi.prototype,{insert:function(t,e,n){var i=this.create(t,e);null!==n?n.insert(i):this.vertexMap.put(t,i);var r=this.vertexMap.get(e);return null!==r?r.insert(i.sym()):this.vertexMap.put(e,i.sym()),i},create:function(t,e){var n=this.createEdge(t),i=this.createEdge(e);return vi.init(n,i),n},createEdge:function(t){return new vi(t)},addEdge:function(t,e){if(!yi.isValidEdge(t,e))return null;var n=this.vertexMap.get(t),i=null;if(null!==n&&(i=n.find(e)),null!==i)return i;var r=this.insert(t,e,n);return r},getVertexEdges:function(){return this.vertexMap.values()},findEdge:function(t,e){var n=this.vertexMap.get(t);return null===n?null:n.find(e)},interfaces_:function(){return[]},getClass:function(){return yi}}),yi.isValidEdge=function(t,e){var n=e.compareTo(t);return 0!==n},h(xi,mi),e(xi.prototype,{setStart:function(){this._isStart=!0},isStart:function(){return this._isStart},interfaces_:function(){return[]},getClass:function(){return xi}}),h(Ei,yi),e(Ei.prototype,{createEdge:function(t){return new xi(t)},interfaces_:function(){return[]},getClass:function(){return Ei}}),e(Ii.prototype,{addLine:function(t){this.lines.add(this.factory.createLineString(t.toCoordinateArray()))},updateRingStartEdge:function(t){return t.isStart()||(t=t.sym(),t.isStart())?null===this.ringStartEdge?(this.ringStartEdge=t,null):void(t.orig().compareTo(this.ringStartEdge.orig())<0&&(this.ringStartEdge=t)):null},getResult:function(){return null===this.result&&this.computeResult(),this.result},process:function(t){var e=t.prevNode();null===e&&(e=t),this.stackEdges(e),this.buildLines()},buildRing:function(t){var e=new N,n=t;for(e.add(n.orig().copy(),!1);2===n.sym().degree();){var i=n.next();if(i===t)break;e.add(i.orig().copy(),!1),n=i}e.add(n.dest().copy(),!1),this.addLine(e)},buildLine:function(t){var e=new N,n=t;for(this.ringStartEdge=null,mi.markBoth(n),e.add(n.orig().copy(),!1);2===n.sym().degree();){this.updateRingStartEdge(n);var i=n.next();if(i===t)return this.buildRing(this.ringStartEdge),null;e.add(i.orig().copy(),!1),n=i,mi.markBoth(n)}e.add(n.dest().copy(),!1),this.stackEdges(n.sym()),this.addLine(e)},stackEdges:function(t){var e=t;do mi.isMarked(e)||this.nodeEdgeStack.add(e),e=e.oNext();while(e!==t)},computeResult:function(){for(var t=this.graph.getVertexEdges(),e=t.iterator();e.hasNext();){var n=e.next();mi.isMarked(n)||this.process(n)}this.result=this.factory.buildGeometry(this.lines)},buildLines:function(){for(;!this.nodeEdgeStack.empty();){var t=this.nodeEdgeStack.pop();mi.isMarked(t)||this.buildLine(t)}},add:function(){if(arguments[0]instanceof B){var t=arguments[0];t.apply({interfaces_:function(){return[q]},filter:function(t){t instanceof St&&this.add(t)}})}else if(R(arguments[0],v))for(var e=arguments[0],n=e.iterator();n.hasNext();){var i=n.next();this.add(i)}else if(arguments[0]instanceof St){var r=arguments[0];null===this.factory&&(this.factory=r.getFactory());for(var s=r.getCoordinateSequence(),o=!1,n=1;n<s.size();n++){var a=this.graph.addEdge(s.getCoordinate(n-1),s.getCoordinate(n));null!==a&&(o||(a.setStart(),o=!0))}}},interfaces_:function(){return[]},getClass:function(){return Ii}}),Ii.dissolve=function(t){var e=new Ii;return e.add(t),e.getResult()};var go=Object.freeze({LineDissolver:Ii});e(Ni.prototype,{hasChildren:function(){for(var t=0;4>t;t++)if(null!==this.subnode[t])return!0;return!1},isPrunable:function(){return!(this.hasChildren()||this.hasItems())},addAllItems:function(t){t.addAll(this.items);for(var e=0;4>e;e++)null!==this.subnode[e]&&this.subnode[e].addAllItems(t);return t},getNodeCount:function(){for(var t=0,e=0;4>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].size());return t+1},size:function(){for(var t=0,e=0;4>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].size());return t+this.items.size()},addAllItemsFromOverlapping:function(t,e){if(!this.isSearchMatch(t))return null;e.addAll(this.items);for(var n=0;4>n;n++)null!==this.subnode[n]&&this.subnode[n].addAllItemsFromOverlapping(t,e)},visitItems:function(t,e){for(var n=this.items.iterator();n.hasNext();)e.visitItem(n.next())},hasItems:function(){return!this.items.isEmpty()},remove:function(t,e){if(!this.isSearchMatch(t))return!1;for(var n=!1,i=0;4>i;i++)if(null!==this.subnode[i]&&(n=this.subnode[i].remove(t,e))){this.subnode[i].isPrunable()&&(this.subnode[i]=null);break}return n?n:n=this.items.remove(e)},visit:function(t,e){if(!this.isSearchMatch(t))return null;this.visitItems(t,e);for(var n=0;4>n;n++)null!==this.subnode[n]&&this.subnode[n].visit(t,e)},getItems:function(){return this.items},depth:function(){for(var t=0,e=0;4>e;e++)if(null!==this.subnode[e]){var n=this.subnode[e].depth();n>t&&(t=n)}return t+1},isEmpty:function t(){var t=!0;this.items.isEmpty()||(t=!1);for(var e=0;4>e;e++)null!==this.subnode[e]&&(this.subnode[e].isEmpty()||(t=!1));return t},add:function(t){this.items.add(t)},interfaces_:function(){return[u]},getClass:function(){return Ni}}),Ni.getSubnodeIndex=function(t,e,n){var i=-1;return t.getMinX()>=e&&(t.getMinY()>=n&&(i=3),t.getMaxY()<=n&&(i=1)),t.getMaxX()<=e&&(t.getMinY()>=n&&(i=2),t.getMaxY()<=n&&(i=0)),i},Ci.exponent=function(t){return Si(64,t)-1023},Ci.powerOf2=function(t){return Math.pow(2,t)},e(wi.prototype,{getLevel:function(){return this.level},computeKey:function(){if(1===arguments.length){var t=arguments[0];for(this.level=wi.computeQuadLevel(t),this.env=new C,this.computeKey(this.level,t);!this.env.contains(t);)this.level+=1,this.computeKey(this.level,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1],i=Ci.powerOf2(e);this.pt.x=Math.floor(n.getMinX()/i)*i,this.pt.y=Math.floor(n.getMinY()/i)*i,this.env.init(this.pt.x,this.pt.x+i,this.pt.y,this.pt.y+i)}},getEnvelope:function(){return this.env},getCentre:function(){return new g((this.env.getMinX()+this.env.getMaxX())/2,(this.env.getMinY()+this.env.getMaxY())/2)},getPoint:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return wi}}),wi.computeQuadLevel=function(t){var e=t.getWidth(),n=t.getHeight(),i=e>n?e:n,r=Ci.exponent(i)+1;return r},h(Li,Ni),e(Li.prototype,{find:function(t){var e=Ni.getSubnodeIndex(t,this.centrex,this.centrey);if(-1===e)return this;if(null!==this.subnode[e]){var n=this.subnode[e];return n.find(t)}return this},isSearchMatch:function(t){return this.env.intersects(t)},getSubnode:function(t){return null===this.subnode[t]&&(this.subnode[t]=this.createSubnode(t)),this.subnode[t]},getEnvelope:function(){return this.env},getNode:function(t){var e=Ni.getSubnodeIndex(t,this.centrex,this.centrey);if(-1!==e){var n=this.getSubnode(e);return n.getNode(t)}return this},createSubnode:function(t){var e=0,n=0,i=0,r=0;switch(t){case 0:e=this.env.getMinX(),n=this.centrex,i=this.env.getMinY(),r=this.centrey;break;case 1:e=this.centrex,n=this.env.getMaxX(),i=this.env.getMinY(),r=this.centrey;break;case 2:e=this.env.getMinX(),n=this.centrex,i=this.centrey,r=this.env.getMaxY();break;case 3:e=this.centrex,n=this.env.getMaxX(),i=this.centrey,r=this.env.getMaxY()}var s=new C(e,n,i,r),o=new Li(s,this.level-1);return o},insertNode:function(t){f.isTrue(null===this.env||this.env.contains(t.env));var e=Ni.getSubnodeIndex(t.env,this.centrex,this.centrey);if(t.level===this.level-1)this.subnode[e]=t;else{var n=this.createSubnode(e);n.insertNode(t),this.subnode[e]=n}},interfaces_:function(){return[]},getClass:function(){return Li}}),Li.createNode=function(t){var e=new wi(t),n=new Li(e.getEnvelope(),e.getLevel());return n},Li.createExpanded=function(t,e){var n=new C(e);null!==t&&n.expandToInclude(t.env);var i=Li.createNode(n);return null!==t&&i.insertNode(t),i},e(Ri.prototype,{interfaces_:function(){return[]},getClass:function(){return Ri}}),Ri.isZeroWidth=function(t,e){var n=e-t;if(0===n)return!0;var i=Math.max(Math.abs(t),Math.abs(e)),r=n/i,s=Ci.exponent(r);return s<=Ri.MIN_BINARY_EXPONENT},Ri.MIN_BINARY_EXPONENT=-50,h(Ti,Ni),e(Ti.prototype,{insert:function(t,e){var n=Ni.getSubnodeIndex(t,Ti.origin.x,Ti.origin.y);if(-1===n)return this.add(e),null;var i=this.subnode[n];if(null===i||!i.getEnvelope().contains(t)){var r=Li.createExpanded(i,t);this.subnode[n]=r}this.insertContained(this.subnode[n],t,e)},isSearchMatch:function(t){return!0},insertContained:function(t,e,n){f.isTrue(t.getEnvelope().contains(e));var i=Ri.isZeroWidth(e.getMinX(),e.getMaxX()),r=Ri.isZeroWidth(e.getMinY(),e.getMaxY()),s=null;s=i||r?t.find(e):t.getNode(e),s.add(n)},interfaces_:function(){return[]},getClass:function(){return Ti}}),Ti.origin=new g(0,0),e(Pi.prototype,{size:function(){return null!==this.root?this.root.size():0},insert:function(t,e){this.collectStats(t);var n=Pi.ensureExtent(t,this.minExtent);this.root.insert(n,e)},query:function(){if(1===arguments.length){var t=arguments[0],e=new Yn;return this.query(t,e),e.getItems()}if(2===arguments.length){var n=arguments[0],i=arguments[1];this.root.visit(n,i)}},queryAll:function(){var t=new I;return this.root.addAllItems(t),
t},remove:function(t,e){var n=Pi.ensureExtent(t,this.minExtent);return this.root.remove(n,e)},collectStats:function(t){var e=t.getWidth();e<this.minExtent&&e>0&&(this.minExtent=e);var n=t.getHeight();n<this.minExtent&&n>0&&(this.minExtent=n)},depth:function(){return null!==this.root?this.root.depth():0},isEmpty:function(){return null===this.root},interfaces_:function(){return[Fe,u]},getClass:function(){return Pi}}),Pi.ensureExtent=function(t,e){var n=t.getMinX(),i=t.getMaxX(),r=t.getMinY(),s=t.getMaxY();return n!==i&&r!==s?t:(n===i&&(n-=e/2,i=n+e/2),r===s&&(r-=e/2,s=r+e/2),new C(n,i,r,s))},Pi.serialVersionUID=-0x678b60c967a25400;var po=Object.freeze({Quadtree:Pi}),vo=Object.freeze({STRtree:ke}),mo=Object.freeze({quadtree:po,strtree:vo}),yo=["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"];e(bi.prototype,{read:function(t){var e=void 0;e="string"==typeof t?JSON.parse(t):t;var n=e.type;if(!xo[n])throw new Error("Unknown GeoJSON type: "+e.type);return-1!==yo.indexOf(n)?xo[n].apply(this,[e.coordinates]):"GeometryCollection"===n?xo[n].apply(this,[e.geometries]):xo[n].apply(this,[e])},write:function(t){var e=t.getGeometryType();if(!Eo[e])throw new Error("Geometry is not supported");return Eo[e].apply(this,[t])}});var xo={Feature:function(t){var e={};for(var n in t)e[n]=t[n];if(t.geometry){var i=t.geometry.type;if(!xo[i])throw new Error("Unknown GeoJSON type: "+t.type);e.geometry=this.read(t.geometry)}return t.bbox&&(e.bbox=xo.bbox.apply(this,[t.bbox])),e},FeatureCollection:function(t){var e={};if(t.features){e.features=[];for(var n=0;n<t.features.length;++n)e.features.push(this.read(t.features[n]))}return t.bbox&&(e.bbox=this.parse.bbox.apply(this,[t.bbox])),e},coordinates:function t(e){for(var t=[],n=0;n<e.length;++n){var i=e[n];t.push(new g(i[0],i[1]))}return t},bbox:function(t){return this.geometryFactory.createLinearRing([new g(t[0],t[1]),new g(t[2],t[1]),new g(t[2],t[3]),new g(t[0],t[3]),new g(t[0],t[1])])},Point:function(t){var e=new g(t[0],t[1]);return this.geometryFactory.createPoint(e)},MultiPoint:function(t){for(var e=[],n=0;n<t.length;++n)e.push(xo.Point.apply(this,[t[n]]));return this.geometryFactory.createMultiPoint(e)},LineString:function(t){var e=xo.coordinates.apply(this,[t]);return this.geometryFactory.createLineString(e)},MultiLineString:function(t){for(var e=[],n=0;n<t.length;++n)e.push(xo.LineString.apply(this,[t[n]]));return this.geometryFactory.createMultiLineString(e)},Polygon:function(t){for(var e=xo.coordinates.apply(this,[t[0]]),n=this.geometryFactory.createLinearRing(e),i=[],r=1;r<t.length;++r){var s=t[r],o=xo.coordinates.apply(this,[s]),a=this.geometryFactory.createLinearRing(o);i.push(a)}return this.geometryFactory.createPolygon(n,i)},MultiPolygon:function(t){for(var e=[],n=0;n<t.length;++n){var i=t[n];e.push(xo.Polygon.apply(this,[i]))}return this.geometryFactory.createMultiPolygon(e)},GeometryCollection:function(t){for(var e=[],n=0;n<t.length;++n){var i=t[n];e.push(this.read(i))}return this.geometryFactory.createGeometryCollection(e)}},Eo={coordinate:function(t){return[t.x,t.y]},Point:function(t){var e=Eo.coordinate.apply(this,[t.getCoordinate()]);return{type:"Point",coordinates:e}},MultiPoint:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=Eo.Point.apply(this,[i]);e.push(r.coordinates)}return{type:"MultiPoint",coordinates:e}},LineString:function(t){for(var e=[],n=t.getCoordinates(),i=0;i<n.length;++i){var r=n[i];e.push(Eo.coordinate.apply(this,[r]))}return{type:"LineString",coordinates:e}},MultiLineString:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=Eo.LineString.apply(this,[i]);e.push(r.coordinates)}return{type:"MultiLineString",coordinates:e}},Polygon:function(t){var e=[],n=Eo.LineString.apply(this,[t.shell]);e.push(n.coordinates);for(var i=0;i<t.holes.length;++i){var r=t.holes[i],s=Eo.LineString.apply(this,[r]);e.push(s.coordinates)}return{type:"Polygon",coordinates:e}},MultiPolygon:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=Eo.Polygon.apply(this,[i]);e.push(r.coordinates)}return{type:"MultiPolygon",coordinates:e}},GeometryCollection:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=i.getGeometryType();e.push(Eo[r].apply(this,[i]))}return{type:"GeometryCollection",geometries:e}}};e(Oi.prototype,{read:function(t){var e=this.parser.read(t);return this.precisionModel.getType()===ee.FIXED&&this.reducePrecision(e),e},reducePrecision:function(t){var e,n;if(t.coordinate)this.precisionModel.makePrecise(t.coordinate);else if(t.points)for(e=0,n=t.points.length;n>e;e++)this.precisionModel.makePrecise(t.points[e]);else if(t.geometries)for(e=0,n=t.geometries.length;n>e;e++)this.reducePrecision(t.geometries[e])}}),e(_i.prototype,{write:function(t){return this.parser.write(t)}}),e(Mi.prototype,{read:function(t){var e=this.parser.read(t);return this.precisionModel.getType()===ee.FIXED&&this.reducePrecision(e),e},reducePrecision:function(t){if(t.coordinate)this.precisionModel.makePrecise(t.coordinate);else if(t.points)for(var e=0,n=t.points.coordinates.length;n>e;e++)this.precisionModel.makePrecise(t.points.coordinates[e]);else if(t.geometries)for(var i=0,r=t.geometries.length;r>i;i++)this.reducePrecision(t.geometries[i])}}),e(Ai.prototype,{read:function(t){return t instanceof ol.geom.Point?this.convertFromPoint(t):t instanceof ol.geom.LineString?this.convertFromLineString(t):t instanceof ol.geom.LinearRing?this.convertFromLinearRing(t):t instanceof ol.geom.Polygon?this.convertFromPolygon(t):t instanceof ol.geom.MultiPoint?this.convertFromMultiPoint(t):t instanceof ol.geom.MultiLineString?this.convertFromMultiLineString(t):t instanceof ol.geom.MultiPolygon?this.convertFromMultiPolygon(t):t instanceof ol.geom.GeometryCollection?this.convertFromCollection(t):void 0},convertFromPoint:function(t){var e=t.getCoordinates();return this.geometryFactory.createPoint(new g(e[0],e[1]))},convertFromLineString:function(t){return this.geometryFactory.createLineString(t.getCoordinates().map(function(t){return new g(t[0],t[1])}))},convertFromLinearRing:function(t){return this.geometryFactory.createLinearRing(t.getCoordinates().map(function(t){return new g(t[0],t[1])}))},convertFromPolygon:function(t){for(var e=t.getLinearRings(),n=null,i=[],r=0;r<e.length;r++){var s=this.convertFromLinearRing(e[r]);0===r?n=s:i.push(s)}return this.geometryFactory.createPolygon(n,i)},convertFromMultiPoint:function(t){var e=t.getPoints().map(function(t){return this.convertFromPoint(t)},this);return this.geometryFactory.createMultiPoint(e)},convertFromMultiLineString:function(t){var e=t.getLineStrings().map(function(t){return this.convertFromLineString(t)},this);return this.geometryFactory.createMultiLineString(e)},convertFromMultiPolygon:function(t){var e=t.getPolygons().map(function(t){return this.convertFromPolygon(t)},this);return this.geometryFactory.createMultiPolygon(e)},convertFromCollection:function(t){var e=t.getGeometries().map(function(t){return this.read(t)},this);return this.geometryFactory.createGeometryCollection(e)},write:function(t){return"Point"===t.getGeometryType()?this.convertToPoint(t.getCoordinate()):"LineString"===t.getGeometryType()?this.convertToLineString(t):"LinearRing"===t.getGeometryType()?this.convertToLinearRing(t):"Polygon"===t.getGeometryType()?this.convertToPolygon(t):"MultiPoint"===t.getGeometryType()?this.convertToMultiPoint(t):"MultiLineString"===t.getGeometryType()?this.convertToMultiLineString(t):"MultiPolygon"===t.getGeometryType()?this.convertToMultiPolygon(t):"GeometryCollection"===t.getGeometryType()?this.convertToCollection(t):void 0},convertToPoint:function(t){return new ol.geom.Point([t.x,t.y])},convertToLineString:function(t){var e=t.points.coordinates.map(Di);return new ol.geom.LineString(e)},convertToLinearRing:function(t){var e=t.points.coordinates.map(Di);return new ol.geom.LinearRing(e)},convertToPolygon:function(t){for(var e=[t.shell.points.coordinates.map(Di)],n=0;n<t.holes.length;n++)e.push(t.holes[n].points.coordinates.map(Di));return new ol.geom.Polygon(e)},convertToMultiPoint:function(t){return new ol.geom.MultiPoint(t.getCoordinates().map(Di))},convertToMultiLineString:function(t){for(var e=[],n=0;n<t.geometries.length;n++)e.push(this.convertToLineString(t.geometries[n]).getCoordinates());return new ol.geom.MultiLineString(e)},convertToMultiPolygon:function(t){for(var e=[],n=0;n<t.geometries.length;n++)e.push(this.convertToPolygon(t.geometries[n]).getCoordinates());return new ol.geom.MultiPolygon(e)},convertToCollection:function(t){for(var e=[],n=0;n<t.geometries.length;n++){var i=t.geometries[n];e.push(this.write(i))}return new ol.geom.GeometryCollection(e)}});var Io=Object.freeze({GeoJSONReader:Oi,GeoJSONWriter:_i,OL3Parser:Ai,WKTReader:Mi,WKTWriter:se});e(Fi.prototype,{rescale:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.rescale(n.getCoordinates())}else if(arguments[0]instanceof Array){var i=arguments[0],r=null,s=null;2===i.length&&(r=new g(i[0]),s=new g(i[1]));for(var e=0;e<i.length;e++)i[e].x=i[e].x/this.scaleFactor+this.offsetX,i[e].y=i[e].y/this.scaleFactor+this.offsetY;2===i.length&&i[0].equals2D(i[1])&&A.out.println(i)}},scale:function(){if(R(arguments[0],v)){for(var t=arguments[0],e=new I,n=t.iterator();n.hasNext();){var i=n.next();e.add(new Ke(this.scale(i.getCoordinates()),i.getData()))}return e}if(arguments[0]instanceof Array){for(var r=arguments[0],s=new Array(r.length).fill(null),n=0;n<r.length;n++)s[n]=new g(Math.round((r[n].x-this.offsetX)*this.scaleFactor),Math.round((r[n].y-this.offsetY)*this.scaleFactor),r[n].z);var o=H.removeRepeatedPoints(s);return o}},isIntegerPrecision:function(){return 1===this.scaleFactor},getNodedSubstrings:function(){var t=this.noder.getNodedSubstrings();return this.isScaled&&this.rescale(t),t},computeNodes:function(t){var e=t;this.isScaled&&(e=this.scale(t)),this.noder.computeNodes(e)},interfaces_:function(){return[tn]},getClass:function(){return Fi}});var No=Object.freeze({MCIndexNoder:nn,ScaledNoder:Fi,SegmentString:be});e(Gi.prototype,{isSimpleMultiPoint:function(t){if(t.isEmpty())return!0;for(var e=new at,n=0;n<t.getNumGeometries();n++){var i=t.getGeometryN(n),r=i.getCoordinate();if(e.contains(r))return this.nonSimpleLocation=r,!1;e.add(r)}return!0},isSimplePolygonal:function(t){for(var e=kn.getLines(t),n=e.iterator();n.hasNext();){var i=n.next();if(!this.isSimpleLinearGeometry(i))return!1}return!0},hasClosedEndpointIntersection:function(t){for(var e=new rt,n=t.getEdgeIterator();n.hasNext();){var i=n.next(),r=(i.getMaximumSegmentIndex(),i.isClosed()),s=i.getCoordinate(0);this.addEndpoint(e,s,r);var o=i.getCoordinate(i.getNumPoints()-1);this.addEndpoint(e,o,r)}for(var n=e.values().iterator();n.hasNext();){var a=n.next();if(a.isClosed&&2!==a.degree)return this.nonSimpleLocation=a.getCoordinate(),!0}return!1},getNonSimpleLocation:function(){return this.nonSimpleLocation},isSimpleLinearGeometry:function(t){if(t.isEmpty())return!0;var e=new $n(0,t),n=new ae,i=e.computeSelfNodes(n,!0);return i.hasIntersection()?i.hasProperIntersection()?(this.nonSimpleLocation=i.getProperIntersectionPoint(),!1):this.hasNonEndpointIntersection(e)?!1:!this.isClosedEndpointsInInterior||!this.hasClosedEndpointIntersection(e):!0},hasNonEndpointIntersection:function(t){for(var e=t.getEdgeIterator();e.hasNext();)for(var n=e.next(),i=n.getMaximumSegmentIndex(),r=n.getEdgeIntersectionList().iterator();r.hasNext();){var s=r.next();if(!s.isEndPoint(i))return this.nonSimpleLocation=s.getCoordinate(),!0}return!1},addEndpoint:function(t,e,n){var i=t.get(e);null===i&&(i=new qi(e),t.put(e,i)),i.addEndpoint(n)},computeSimple:function(t){return this.nonSimpleLocation=null,t.isEmpty()?!0:t instanceof St?this.isSimpleLinearGeometry(t):t instanceof gt?this.isSimpleLinearGeometry(t):t instanceof Pt?this.isSimpleMultiPoint(t):R(t,Rt)?this.isSimplePolygonal(t):t instanceof ft?this.isSimpleGeometryCollection(t):!0},isSimple:function(){return this.nonSimpleLocation=null,this.computeSimple(this.inputGeom)},isSimpleGeometryCollection:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);if(!this.computeSimple(n))return!1}return!0},interfaces_:function(){return[]},getClass:function(){return Gi}}),e(qi.prototype,{addEndpoint:function(t){this.degree++,this.isClosed|=t},getCoordinate:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return qi}}),Gi.EndpointInfo=qi,e(Bi.prototype,{getEndCapStyle:function(){return this.endCapStyle},isSingleSided:function(){return this._isSingleSided},setQuadrantSegments:function(t){this.quadrantSegments=t,0===this.quadrantSegments&&(this.joinStyle=Bi.JOIN_BEVEL),this.quadrantSegments<0&&(this.joinStyle=Bi.JOIN_MITRE,this.mitreLimit=Math.abs(this.quadrantSegments)),0>=t&&(this.quadrantSegments=1),this.joinStyle!==Bi.JOIN_ROUND&&(this.quadrantSegments=Bi.DEFAULT_QUADRANT_SEGMENTS)},getJoinStyle:function(){return this.joinStyle},setJoinStyle:function(t){this.joinStyle=t},setSimplifyFactor:function(t){this.simplifyFactor=0>t?0:t},getSimplifyFactor:function(){return this.simplifyFactor},getQuadrantSegments:function(){return this.quadrantSegments},setEndCapStyle:function(t){this.endCapStyle=t},getMitreLimit:function(){return this.mitreLimit},setMitreLimit:function(t){this.mitreLimit=t},setSingleSided:function(t){this._isSingleSided=t},interfaces_:function(){return[]},getClass:function(){return Bi}}),Bi.bufferDistanceError=function(t){var e=Math.PI/2/t;return 1-Math.cos(e/2)},Bi.CAP_ROUND=1,Bi.CAP_FLAT=2,Bi.CAP_SQUARE=3,Bi.JOIN_ROUND=1,Bi.JOIN_MITRE=2,Bi.JOIN_BEVEL=3,Bi.DEFAULT_QUADRANT_SEGMENTS=8,Bi.DEFAULT_MITRE_LIMIT=5,Bi.DEFAULT_SIMPLIFY_FACTOR=.01,e(zi.prototype,{getCoordinate:function(){return this.minCoord},getRightmostSide:function(t,e){var n=this.getRightmostSideOfSegment(t,e);return 0>n&&(n=this.getRightmostSideOfSegment(t,e-1)),0>n&&(this.minCoord=null,this.checkForRightmostCoordinate(t)),n},findRightmostEdgeAtVertex:function(){var t=this.minDe.getEdge().getCoordinates();f.isTrue(this.minIndex>0&&this.minIndex<t.length,"rightmost point expected to be interior vertex of edge");var e=t[this.minIndex-1],n=t[this.minIndex+1],i=he.computeOrientation(this.minCoord,n,e),r=!1;e.y<this.minCoord.y&&n.y<this.minCoord.y&&i===he.COUNTERCLOCKWISE?r=!0:e.y>this.minCoord.y&&n.y>this.minCoord.y&&i===he.CLOCKWISE&&(r=!0),r&&(this.minIndex=this.minIndex-1)},getRightmostSideOfSegment:function(t,e){var n=t.getEdge(),i=n.getCoordinates();if(0>e||e+1>=i.length)return-1;if(i[e].y===i[e+1].y)return-1;var r=cn.LEFT;return i[e].y<i[e+1].y&&(r=cn.RIGHT),r},getEdge:function(){return this.orientedDe},checkForRightmostCoordinate:function(t){for(var e=t.getEdge().getCoordinates(),n=0;n<e.length-1;n++)(null===this.minCoord||e[n].x>this.minCoord.x)&&(this.minDe=t,this.minIndex=n,this.minCoord=e[n])},findRightmostEdgeAtNode:function(){var t=this.minDe.getNode(),e=t.getEdges();this.minDe=e.getRightmostEdge(),this.minDe.isForward()||(this.minDe=this.minDe.getSym(),this.minIndex=this.minDe.getEdge().getCoordinates().length-1)},findEdge:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();n.isForward()&&this.checkForRightmostCoordinate(n)}f.isTrue(0!==this.minIndex||this.minCoord.equals(this.minDe.getCoordinate()),"inconsistency in rightmost processing"),0===this.minIndex?this.findRightmostEdgeAtNode():this.findRightmostEdgeAtVertex(),this.orientedDe=this.minDe;var i=this.getRightmostSide(this.minDe,this.minIndex);i===cn.LEFT&&(this.orientedDe=this.minDe.getSym())},interfaces_:function(){return[]},getClass:function(){return zi}}),Vi.prototype.addLast=function(t){this.array_.push(t)},Vi.prototype.removeFirst=function(){return this.array_.shift()},Vi.prototype.isEmpty=function(){return 0===this.array_.length},e(ki.prototype,{clearVisitedEdges:function(){for(var t=this.dirEdgeList.iterator();t.hasNext();){var e=t.next();e.setVisited(!1)}},getRightmostCoordinate:function(){return this.rightMostCoord},computeNodeDepth:function(t){for(var e=null,n=t.getEdges().iterator();n.hasNext();){var i=n.next();if(i.isVisited()||i.getSym().isVisited()){e=i;break}}if(null===e)throw new sn("unable to find edge to compute depths at "+t.getCoordinate());t.getEdges().computeDepths(e);for(var n=t.getEdges().iterator();n.hasNext();){var i=n.next();i.setVisited(!0),this.copySymDepths(i)}},computeDepth:function(t){this.clearVisitedEdges();var e=this.finder.getEdge();e.getNode(),e.getLabel();e.setEdgeDepths(cn.RIGHT,t),this.copySymDepths(e),this.computeDepths(e)},create:function(t){this.addReachable(t),this.finder.findEdge(this.dirEdgeList),this.rightMostCoord=this.finder.getCoordinate()},findResultEdges:function(){for(var t=this.dirEdgeList.iterator();t.hasNext();){var e=t.next();e.getDepth(cn.RIGHT)>=1&&e.getDepth(cn.LEFT)<=0&&!e.isInteriorAreaEdge()&&e.setInResult(!0)}},computeDepths:function(t){var e=new J,n=new Vi,i=t.getNode();for(n.addLast(i),e.add(i),t.setVisited(!0);!n.isEmpty();){var r=n.removeFirst();e.add(r),this.computeNodeDepth(r);for(var s=r.getEdges().iterator();s.hasNext();){var o=s.next(),a=o.getSym();if(!a.isVisited()){var u=a.getNode();e.contains(u)||(n.addLast(u),e.add(u))}}}},compareTo:function(t){var e=t;return this.rightMostCoord.x<e.rightMostCoord.x?-1:this.rightMostCoord.x>e.rightMostCoord.x?1:0},getEnvelope:function(){if(null===this.env){for(var t=new C,e=this.dirEdgeList.iterator();e.hasNext();)for(var n=e.next(),i=n.getEdge().getCoordinates(),r=0;r<i.length-1;r++)t.expandToInclude(i[r]);this.env=t}return this.env},addReachable:function(t){var e=new pe;for(e.add(t);!e.empty();){var n=e.pop();this.add(n,e)}},copySymDepths:function(t){var e=t.getSym();e.setDepth(cn.LEFT,t.getDepth(cn.RIGHT)),e.setDepth(cn.RIGHT,t.getDepth(cn.LEFT))},add:function(t,e){t.setVisited(!0),this.nodes.add(t);for(var n=t.getEdges().iterator();n.hasNext();){var i=n.next();this.dirEdgeList.add(i);var r=i.getSym(),s=r.getNode();s.isVisited()||e.push(s)}},getNodes:function(){return this.nodes},getDirectedEdges:function(){return this.dirEdgeList},interfaces_:function(){return[s]},getClass:function(){return ki}}),e(Yi.prototype,{isDeletable:function(t,e,n,i){var r=this.inputLine[t],s=this.inputLine[e],o=this.inputLine[n];return this.isConcave(r,s,o)&&this.isShallow(r,s,o,i)?this.isShallowSampled(r,s,t,n,i):!1},deleteShallowConcavities:function(){for(var t=1,e=(this.inputLine.length-1,this.findNextNonDeletedIndex(t)),n=this.findNextNonDeletedIndex(e),i=!1;n<this.inputLine.length;){var r=!1;this.isDeletable(t,e,n,this.distanceTol)&&(this.isDeleted[e]=Yi.DELETE,r=!0,i=!0),t=r?n:e,e=this.findNextNonDeletedIndex(t),n=this.findNextNonDeletedIndex(e)}return i},isShallowConcavity:function(t,e,n,i){var r=he.computeOrientation(t,e,n),s=r===this.angleOrientation;if(!s)return!1;var o=he.distancePointLine(e,t,n);return i>o},isShallowSampled:function(t,e,n,i,r){var s=Math.trunc((i-n)/Yi.NUM_PTS_TO_CHECK);0>=s&&(s=1);for(var o=n;i>o;o+=s)if(!this.isShallow(t,e,this.inputLine[o],r))return!1;return!0},isConcave:function t(e,n,i){var r=he.computeOrientation(e,n,i),t=r===this.angleOrientation;return t},simplify:function(t){this.distanceTol=Math.abs(t),0>t&&(this.angleOrientation=he.CLOCKWISE),this.isDeleted=new Array(this.inputLine.length).fill(null);var e=!1;do e=this.deleteShallowConcavities();while(e);return this.collapseLine()},findNextNonDeletedIndex:function(t){for(var e=t+1;e<this.inputLine.length&&this.isDeleted[e]===Yi.DELETE;)e++;return e},isShallow:function(t,e,n,i){var r=he.distancePointLine(e,t,n);return i>r},collapseLine:function(){for(var t=new N,e=0;e<this.inputLine.length;e++)this.isDeleted[e]!==Yi.DELETE&&t.add(this.inputLine[e]);return t.toCoordinateArray()},interfaces_:function(){return[]},getClass:function(){return Yi}}),Yi.simplify=function(t,e){var n=new Yi(t);return n.simplify(e)},Yi.INIT=0,Yi.DELETE=1,Yi.KEEP=1,Yi.NUM_PTS_TO_CHECK=10,e(Ui.prototype,{getCoordinates:function(){var t=this.ptList.toArray(Ui.COORDINATE_ARRAY_TYPE);return t},setPrecisionModel:function(t){this.precisionModel=t},addPt:function(t){var e=new g(t);return this.precisionModel.makePrecise(e),this.isRedundant(e)?null:void this.ptList.add(e)},reverse:function(){},addPts:function(t,e){if(e)for(var n=0;n<t.length;n++)this.addPt(t[n]);else for(var n=t.length-1;n>=0;n--)this.addPt(t[n])},isRedundant:function(t){if(this.ptList.size()<1)return!1;var e=this.ptList.get(this.ptList.size()-1),n=t.distance(e);return n<this.minimimVertexDistance},toString:function(){var t=new ie,e=t.createLineString(this.getCoordinates());return e.toString()},closeRing:function(){if(this.ptList.size()<1)return null;var t=new g(this.ptList.get(0)),e=this.ptList.get(this.ptList.size()-1),n=null;return this.ptList.size()>=2&&(n=this.ptList.get(this.ptList.size()-2)),t.equals(e)?null:void this.ptList.add(t)},setMinimumVertexDistance:function(t){this.minimimVertexDistance=t},interfaces_:function(){return[]},getClass:function(){return Ui}}),Ui.COORDINATE_ARRAY_TYPE=new Array(0).fill(null),e(Xi.prototype,{addNextSegment:function(t,e){if(this.s0=this.s1,this.s1=this.s2,this.s2=t,this.seg0.setCoordinates(this.s0,this.s1),this.computeOffsetSegment(this.seg0,this.side,this.distance,this.offset0),this.seg1.setCoordinates(this.s1,this.s2),this.computeOffsetSegment(this.seg1,this.side,this.distance,this.offset1),this.s1.equals(this.s2))return null;var n=he.computeOrientation(this.s0,this.s1,this.s2),i=n===he.CLOCKWISE&&this.side===cn.LEFT||n===he.COUNTERCLOCKWISE&&this.side===cn.RIGHT;0===n?this.addCollinear(e):i?this.addOutsideTurn(n,e):this.addInsideTurn(n,e)},addLineEndCap:function(t,e){var n=new ce(t,e),i=new ce;this.computeOffsetSegment(n,cn.LEFT,this.distance,i);var r=new ce;this.computeOffsetSegment(n,cn.RIGHT,this.distance,r);var s=e.x-t.x,o=e.y-t.y,a=Math.atan2(o,s);switch(this.bufParams.getEndCapStyle()){case Bi.CAP_ROUND:this.segList.addPt(i.p1),this.addFilletArc(e,a+Math.PI/2,a-Math.PI/2,he.CLOCKWISE,this.distance),this.segList.addPt(r.p1);break;case Bi.CAP_FLAT:this.segList.addPt(i.p1),this.segList.addPt(r.p1);break;case Bi.CAP_SQUARE:var u=new g;u.x=Math.abs(this.distance)*Math.cos(a),u.y=Math.abs(this.distance)*Math.sin(a);var l=new g(i.p1.x+u.x,i.p1.y+u.y),h=new g(r.p1.x+u.x,r.p1.y+u.y);this.segList.addPt(l),this.segList.addPt(h)}},getCoordinates:function(){var t=this.segList.getCoordinates();return t},addMitreJoin:function(t,e,n,i){var r=!0,s=null;try{s=F.intersection(e.p0,e.p1,n.p0,n.p1);var o=0>=i?1:s.distance(t)/Math.abs(i);o>this.bufParams.getMitreLimit()&&(r=!1)}catch(t){if(!(t instanceof w))throw t;s=new g(0,0),r=!1}finally{}r?this.segList.addPt(s):this.addLimitedMitreJoin(e,n,i,this.bufParams.getMitreLimit())},addFilletCorner:function(t,e,n,i,r){var s=e.x-t.x,o=e.y-t.y,a=Math.atan2(o,s),u=n.x-t.x,l=n.y-t.y,h=Math.atan2(l,u);i===he.CLOCKWISE?h>=a&&(a+=2*Math.PI):a>=h&&(a-=2*Math.PI),this.segList.addPt(e),this.addFilletArc(t,a,h,i,r),this.segList.addPt(n)},addOutsideTurn:function(t,e){return this.offset0.p1.distance(this.offset1.p0)<this.distance*Xi.OFFSET_SEGMENT_SEPARATION_FACTOR?(this.segList.addPt(this.offset0.p1),null):void(this.bufParams.getJoinStyle()===Bi.JOIN_MITRE?this.addMitreJoin(this.s1,this.offset0,this.offset1,this.distance):this.bufParams.getJoinStyle()===Bi.JOIN_BEVEL?this.addBevelJoin(this.offset0,this.offset1):(e&&this.segList.addPt(this.offset0.p1),this.addFilletCorner(this.s1,this.offset0.p1,this.offset1.p0,t,this.distance),this.segList.addPt(this.offset1.p0)))},createSquare:function(t){this.segList.addPt(new g(t.x+this.distance,t.y+this.distance)),this.segList.addPt(new g(t.x+this.distance,t.y-this.distance)),this.segList.addPt(new g(t.x-this.distance,t.y-this.distance)),this.segList.addPt(new g(t.x-this.distance,t.y+this.distance)),this.segList.closeRing()},addSegments:function(t,e){this.segList.addPts(t,e)},addFirstSegment:function(){this.segList.addPt(this.offset1.p0)},addLastSegment:function(){this.segList.addPt(this.offset1.p1)},initSideSegments:function(t,e,n){this.s1=t,this.s2=e,this.side=n,this.seg1.setCoordinates(t,e),this.computeOffsetSegment(this.seg1,n,this.distance,this.offset1)},addLimitedMitreJoin:function(t,e,n,i){var r=this.seg0.p1,s=hi.angle(r,this.seg0.p0),o=(hi.angle(r,this.seg1.p1),hi.angleBetweenOriented(this.seg0.p0,r,this.seg1.p1)),a=o/2,u=hi.normalize(s+a),l=hi.normalize(u+Math.PI),h=i*n,c=h*Math.abs(Math.sin(a)),f=n-c,d=r.x+h*Math.cos(l),p=r.y+h*Math.sin(l),v=new g(d,p),m=new ce(r,v),y=m.pointAlongOffset(1,f),x=m.pointAlongOffset(1,-f);this.side===cn.LEFT?(this.segList.addPt(y),this.segList.addPt(x)):(this.segList.addPt(x),this.segList.addPt(y))},computeOffsetSegment:function(t,e,n,i){var r=e===cn.LEFT?1:-1,s=t.p1.x-t.p0.x,o=t.p1.y-t.p0.y,a=Math.sqrt(s*s+o*o),u=r*n*s/a,l=r*n*o/a;i.p0.x=t.p0.x-l,i.p0.y=t.p0.y+u,i.p1.x=t.p1.x-l,i.p1.y=t.p1.y+u},addFilletArc:function(t,e,n,i,r){var s=i===he.CLOCKWISE?-1:1,o=Math.abs(e-n),a=Math.trunc(o/this.filletAngleQuantum+.5);if(1>a)return null;var u=null,l=null;u=0,l=o/a;for(var h=u,c=new g;o>h;){var f=e+s*h;c.x=t.x+r*Math.cos(f),c.y=t.y+r*Math.sin(f),this.segList.addPt(c),h+=l}},addInsideTurn:function(t,e){if(this.li.computeIntersection(this.offset0.p0,this.offset0.p1,this.offset1.p0,this.offset1.p1),this.li.hasIntersection())this.segList.addPt(this.li.getIntersection(0));else if(this._hasNarrowConcaveAngle=!0,this.offset0.p1.distance(this.offset1.p0)<this.distance*Xi.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR)this.segList.addPt(this.offset0.p1);else{if(this.segList.addPt(this.offset0.p1),this.closingSegLengthFactor>0){var n=new g((this.closingSegLengthFactor*this.offset0.p1.x+this.s1.x)/(this.closingSegLengthFactor+1),(this.closingSegLengthFactor*this.offset0.p1.y+this.s1.y)/(this.closingSegLengthFactor+1));this.segList.addPt(n);var i=new g((this.closingSegLengthFactor*this.offset1.p0.x+this.s1.x)/(this.closingSegLengthFactor+1),(this.closingSegLengthFactor*this.offset1.p0.y+this.s1.y)/(this.closingSegLengthFactor+1));this.segList.addPt(i)}else this.segList.addPt(this.s1);this.segList.addPt(this.offset1.p0)}},createCircle:function(t){var e=new g(t.x+this.distance,t.y);this.segList.addPt(e),this.addFilletArc(t,0,2*Math.PI,-1,this.distance),this.segList.closeRing()},addBevelJoin:function(t,e){this.segList.addPt(t.p1),this.segList.addPt(e.p0)},init:function(t){this.distance=t,this.maxCurveSegmentError=t*(1-Math.cos(this.filletAngleQuantum/2)),this.segList=new Ui,this.segList.setPrecisionModel(this.precisionModel),this.segList.setMinimumVertexDistance(t*Xi.CURVE_VERTEX_SNAP_DISTANCE_FACTOR)},addCollinear:function(t){this.li.computeIntersection(this.s0,this.s1,this.s1,this.s2);var e=this.li.getIntersectionNum();e>=2&&(this.bufParams.getJoinStyle()===Bi.JOIN_BEVEL||this.bufParams.getJoinStyle()===Bi.JOIN_MITRE?(t&&this.segList.addPt(this.offset0.p1),this.segList.addPt(this.offset1.p0)):this.addFilletCorner(this.s1,this.offset0.p1,this.offset1.p0,he.CLOCKWISE,this.distance))},closeRing:function(){this.segList.closeRing()},hasNarrowConcaveAngle:function(){return this._hasNarrowConcaveAngle},interfaces_:function(){return[]},getClass:function(){return Xi}}),Xi.OFFSET_SEGMENT_SEPARATION_FACTOR=.001,Xi.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR=.001,Xi.CURVE_VERTEX_SNAP_DISTANCE_FACTOR=1e-6,Xi.MAX_CLOSING_SEG_LEN_FACTOR=80,e(Hi.prototype,{getOffsetCurve:function(t,e){if(this.distance=e,0===e)return null;var n=0>e,i=Math.abs(e),r=this.getSegGen(i);t.length<=1?this.computePointCurve(t[0],r):this.computeOffsetCurve(t,n,r);var s=r.getCoordinates();return n&&H.reverse(s),s},computeSingleSidedBufferCurve:function(t,e,n){var i=this.simplifyTolerance(this.distance);if(e){n.addSegments(t,!0);var r=Yi.simplify(t,-i),s=r.length-1;n.initSideSegments(r[s],r[s-1],cn.LEFT),n.addFirstSegment();for(var o=s-2;o>=0;o--)n.addNextSegment(r[o],!0)}else{n.addSegments(t,!1);var a=Yi.simplify(t,i),u=a.length-1;n.initSideSegments(a[0],a[1],cn.LEFT),n.addFirstSegment();for(var o=2;u>=o;o++)n.addNextSegment(a[o],!0)}n.addLastSegment(),n.closeRing()},computeRingBufferCurve:function(t,e,n){var i=this.simplifyTolerance(this.distance);e===cn.RIGHT&&(i=-i);var r=Yi.simplify(t,i),s=r.length-1;n.initSideSegments(r[s-1],r[0],e);for(var o=1;s>=o;o++){var a=1!==o;n.addNextSegment(r[o],a)}n.closeRing()},computeLineBufferCurve:function(t,e){var n=this.simplifyTolerance(this.distance),i=Yi.simplify(t,n),r=i.length-1;e.initSideSegments(i[0],i[1],cn.LEFT);for(var s=2;r>=s;s++)e.addNextSegment(i[s],!0);e.addLastSegment(),e.addLineEndCap(i[r-1],i[r]);var o=Yi.simplify(t,-n),a=o.length-1;e.initSideSegments(o[a],o[a-1],cn.LEFT);for(var s=a-2;s>=0;s--)e.addNextSegment(o[s],!0);e.addLastSegment(),e.addLineEndCap(o[1],o[0]),e.closeRing()},computePointCurve:function(t,e){switch(this.bufParams.getEndCapStyle()){case Bi.CAP_ROUND:e.createCircle(t);break;case Bi.CAP_SQUARE:e.createSquare(t)}},getLineCurve:function(t,e){if(this.distance=e,0>e&&!this.bufParams.isSingleSided())return null;if(0===e)return null;var n=Math.abs(e),i=this.getSegGen(n);if(t.length<=1)this.computePointCurve(t[0],i);else if(this.bufParams.isSingleSided()){var r=0>e;this.computeSingleSidedBufferCurve(t,r,i)}else this.computeLineBufferCurve(t,i);var s=i.getCoordinates();return s},getBufferParameters:function(){return this.bufParams},simplifyTolerance:function(t){return t*this.bufParams.getSimplifyFactor()},getRingCurve:function(t,e,n){if(this.distance=n,t.length<=2)return this.getLineCurve(t,n);if(0===n)return Hi.copyCoordinates(t);var i=this.getSegGen(n);return this.computeRingBufferCurve(t,e,i),i.getCoordinates()},computeOffsetCurve:function(t,e,n){var i=this.simplifyTolerance(this.distance);if(e){var r=Yi.simplify(t,-i),s=r.length-1;n.initSideSegments(r[s],r[s-1],cn.LEFT),n.addFirstSegment();for(var o=s-2;o>=0;o--)n.addNextSegment(r[o],!0)}else{var a=Yi.simplify(t,i),u=a.length-1;n.initSideSegments(a[0],a[1],cn.LEFT),n.addFirstSegment();for(var o=2;u>=o;o++)n.addNextSegment(a[o],!0)}n.addLastSegment()},getSegGen:function(t){return new Xi(this.precisionModel,this.bufParams,t)},interfaces_:function(){return[]},getClass:function(){return Hi}}),Hi.copyCoordinates=function(t){for(var e=new Array(t.length).fill(null),n=0;n<e.length;n++)e[n]=new g(t[n]);return e},e(Wi.prototype,{findStabbedSegments:function(){if(1===arguments.length){for(var t=arguments[0],e=new I,n=this.subgraphs.iterator();n.hasNext();){var i=n.next(),r=i.getEnvelope();t.y<r.getMinY()||t.y>r.getMaxY()||this.findStabbedSegments(t,i.getDirectedEdges(),e)}return e}if(3===arguments.length)if(R(arguments[2],y)&&arguments[0]instanceof g&&arguments[1]instanceof In)for(var s=arguments[0],o=arguments[1],a=arguments[2],u=o.getEdge().getCoordinates(),n=0;n<u.length-1;n++){this.seg.p0=u[n],this.seg.p1=u[n+1],this.seg.p0.y>this.seg.p1.y&&this.seg.reverse();var l=Math.max(this.seg.p0.x,this.seg.p1.x);if(!(l<s.x||this.seg.isHorizontal()||s.y<this.seg.p0.y||s.y>this.seg.p1.y||he.computeOrientation(this.seg.p0,this.seg.p1,s)===he.RIGHT)){var h=o.getDepth(cn.LEFT);this.seg.p0.equals(u[n])||(h=o.getDepth(cn.RIGHT));var c=new ji(this.seg,h);a.add(c)}}else if(R(arguments[2],y)&&arguments[0]instanceof g&&R(arguments[1],y))for(var f=arguments[0],d=arguments[1],p=arguments[2],n=d.iterator();n.hasNext();){var v=n.next();v.isForward()&&this.findStabbedSegments(f,v,p)}},getDepth:function(t){var e=this.findStabbedSegments(t);if(0===e.size())return 0;var n=ho.min(e);return n.leftDepth},interfaces_:function(){return[]},getClass:function(){return Wi}}),e(ji.prototype,{compareTo:function(t){var e=t;if(this.upwardSeg.minX()>=e.upwardSeg.maxX())return 1;if(this.upwardSeg.maxX()<=e.upwardSeg.minX())return-1;var n=this.upwardSeg.orientationIndex(e.upwardSeg);return 0!==n?n:(n=-1*e.upwardSeg.orientationIndex(this.upwardSeg),0!==n?n:this.upwardSeg.compareTo(e.upwardSeg))},compareX:function(t,e){var n=t.p0.compareTo(e.p0);return 0!==n?n:t.p1.compareTo(e.p1)},toString:function(){return this.upwardSeg.toString()},interfaces_:function(){return[s]},getClass:function(){return ji}}),Wi.DepthSegment=ji,e(Ki.prototype,{addPoint:function(t){if(this.distance<=0)return null;
var e=t.getCoordinates(),n=this.curveBuilder.getLineCurve(e,this.distance);this.addCurve(n,L.EXTERIOR,L.INTERIOR)},addPolygon:function(t){var e=this.distance,n=cn.LEFT;this.distance<0&&(e=-this.distance,n=cn.RIGHT);var i=t.getExteriorRing(),r=H.removeRepeatedPoints(i.getCoordinates());if(this.distance<0&&this.isErodedCompletely(i,this.distance))return null;if(this.distance<=0&&r.length<3)return null;this.addPolygonRing(r,e,n,L.EXTERIOR,L.INTERIOR);for(var s=0;s<t.getNumInteriorRing();s++){var o=t.getInteriorRingN(s),a=H.removeRepeatedPoints(o.getCoordinates());this.distance>0&&this.isErodedCompletely(o,-this.distance)||this.addPolygonRing(a,e,cn.opposite(n),L.INTERIOR,L.EXTERIOR)}},isTriangleErodedCompletely:function(t,e){var n=new ci(t[0],t[1],t[2]),i=n.inCentre(),r=he.distancePointLine(i,n.p0,n.p1);return r<Math.abs(e)},addLineString:function(t){if(this.distance<=0&&!this.curveBuilder.getBufferParameters().isSingleSided())return null;var e=H.removeRepeatedPoints(t.getCoordinates()),n=this.curveBuilder.getLineCurve(e,this.distance);this.addCurve(n,L.EXTERIOR,L.INTERIOR)},addCurve:function(t,e,n){if(null===t||t.length<2)return null;var i=new Ke(t,new gn(0,L.BOUNDARY,e,n));this.curveList.add(i)},getCurves:function(){return this.add(this.inputGeom),this.curveList},addPolygonRing:function(t,e,n,i,r){if(0===e&&t.length<bt.MINIMUM_VALID_SIZE)return null;var s=i,o=r;t.length>=bt.MINIMUM_VALID_SIZE&&he.isCCW(t)&&(s=r,o=i,n=cn.opposite(n));var a=this.curveBuilder.getRingCurve(t,n,e);this.addCurve(a,s,o)},add:function(t){if(t.isEmpty())return null;if(t instanceof Tt)this.addPolygon(t);else if(t instanceof St)this.addLineString(t);else if(t instanceof Lt)this.addPoint(t);else if(t instanceof Pt)this.addCollection(t);else if(t instanceof gt)this.addCollection(t);else if(t instanceof Ot)this.addCollection(t);else{if(!(t instanceof ft))throw new UnsupportedOperationException(t.getClass().getName());this.addCollection(t)}},isErodedCompletely:function(t,e){var n=t.getCoordinates();if(n.length<4)return 0>e;if(4===n.length)return this.isTriangleErodedCompletely(n,e);var i=t.getEnvelopeInternal(),r=Math.min(i.getHeight(),i.getWidth());return 0>e&&2*Math.abs(e)>r},addCollection:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);this.add(n)}},interfaces_:function(){return[]},getClass:function(){return Ki}}),e(Zi.prototype,{isTrivialIntersection:function(t,e,n,i){if(t===n&&1===this.li.getIntersectionNum()){if(Zi.isAdjacentSegments(e,i))return!0;if(t.isClosed()){var r=t.size()-1;if(0===e&&i===r||0===i&&e===r)return!0}}return!1},getProperIntersectionPoint:function(){return this.properIntersectionPoint},hasProperInteriorIntersection:function(){return this.hasProperInterior},getLineIntersector:function(){return this.li},hasProperIntersection:function(){return this.hasProper},processIntersections:function(t,e,n,i){if(t===n&&e===i)return null;this.numTests++;var r=t.getCoordinates()[e],s=t.getCoordinates()[e+1],o=n.getCoordinates()[i],a=n.getCoordinates()[i+1];this.li.computeIntersection(r,s,o,a),this.li.hasIntersection()&&(this.numIntersections++,this.li.isInteriorIntersection()&&(this.numInteriorIntersections++,this.hasInterior=!0),this.isTrivialIntersection(t,e,n,i)||(this._hasIntersection=!0,t.addIntersections(this.li,e,0),n.addIntersections(this.li,i,1),this.li.isProper()&&(this.numProperIntersections++,this.hasProper=!0,this.hasProperInterior=!0)))},hasIntersection:function(){return this._hasIntersection},isDone:function(){return!1},hasInteriorIntersection:function(){return this.hasInterior},interfaces_:function(){return[on]},getClass:function(){return Zi}}),Zi.isAdjacentSegments=function(t,e){return 1===Math.abs(t-e)},e(Qi.prototype,{setWorkingPrecisionModel:function(t){this.workingPrecisionModel=t},insertUniqueEdge:function(t){var e=this.edgeList.findEqualEdge(t);if(null!==e){var n=e.getLabel(),i=t.getLabel();e.isPointwiseEqual(t)||(i=new gn(t.getLabel()),i.flip()),n.merge(i);var r=Qi.depthDelta(i),s=e.getDepthDelta(),o=s+r;e.setDepthDelta(o)}else this.edgeList.add(t),t.setDepthDelta(Qi.depthDelta(t.getLabel()))},buildSubgraphs:function(t,e){for(var n=new I,i=t.iterator();i.hasNext();){var r=i.next(),s=r.getRightmostCoordinate(),o=new Wi(n),a=o.getDepth(s);r.computeDepth(a),r.findResultEdges(),n.add(r),e.add(r.getDirectedEdges(),r.getNodes())}},createSubgraphs:function(t){for(var e=new I,n=t.getNodes().iterator();n.hasNext();){var i=n.next();if(!i.isVisited()){var r=new ki;r.create(i),e.add(r)}}return ho.sort(e,ho.reverseOrder()),e},createEmptyResultGeometry:function(){var t=this.geomFact.createPolygon();return t},getNoder:function(t){if(null!==this.workingNoder)return this.workingNoder;var e=new nn,n=new ae;return n.setPrecisionModel(t),e.setSegmentIntersector(new Zi(n)),e},buffer:function(t,e){var n=this.workingPrecisionModel;null===n&&(n=t.getPrecisionModel()),this.geomFact=t.getFactory();var i=new Hi(n,this.bufParams),r=new Ki(t,e,i),s=r.getCurves();if(s.size()<=0)return this.createEmptyResultGeometry();this.computeNodedEdges(s,n),this.graph=new Cn(new On),this.graph.addEdges(this.edgeList.getEdges());var o=this.createSubgraphs(this.graph),a=new Sn(this.geomFact);this.buildSubgraphs(o,a);var u=a.getPolygons();if(u.size()<=0)return this.createEmptyResultGeometry();var l=this.geomFact.buildGeometry(u);return l},computeNodedEdges:function(t,e){var n=this.getNoder(e);n.computeNodes(t);for(var i=n.getNodedSubstrings(),r=i.iterator();r.hasNext();){var s=r.next(),o=s.getCoordinates();if(2!==o.length||!o[0].equals2D(o[1])){var a=s.getData(),u=new Jn(s.getCoordinates(),new gn(a));this.insertUniqueEdge(u)}}},setNoder:function(t){this.workingNoder=t},interfaces_:function(){return[]},getClass:function(){return Qi}}),Qi.depthDelta=function(t){var e=t.getLocation(0,cn.LEFT),n=t.getLocation(0,cn.RIGHT);return e===L.INTERIOR&&n===L.EXTERIOR?1:e===L.EXTERIOR&&n===L.INTERIOR?-1:0},Qi.convertSegStrings=function(t){for(var e=new ie,n=new I;t.hasNext();){var i=t.next(),r=e.createLineString(i.getCoordinates());n.add(r)}return e.buildGeometry(n)},e(Ji.prototype,{checkEndPtVertexIntersections:function(){if(0===arguments.length)for(var t=this.segStrings.iterator();t.hasNext();){var e=t.next(),n=e.getCoordinates();this.checkEndPtVertexIntersections(n[0],this.segStrings),this.checkEndPtVertexIntersections(n[n.length-1],this.segStrings)}else if(2===arguments.length)for(var i=arguments[0],r=arguments[1],t=r.iterator();t.hasNext();)for(var e=t.next(),n=e.getCoordinates(),s=1;s<n.length-1;s++)if(n[s].equals(i))throw new l("found endpt/interior pt intersection at index "+s+" :pt "+i)},checkInteriorIntersections:function(){if(0===arguments.length)for(var t=this.segStrings.iterator();t.hasNext();)for(var e=t.next(),n=this.segStrings.iterator();n.hasNext();){var i=n.next();this.checkInteriorIntersections(e,i)}else if(2===arguments.length)for(var r=arguments[0],s=arguments[1],o=r.getCoordinates(),a=s.getCoordinates(),u=0;u<o.length-1;u++)for(var h=0;h<a.length-1;h++)this.checkInteriorIntersections(r,u,s,h);else if(4===arguments.length){var c=arguments[0],f=arguments[1],g=arguments[2],d=arguments[3];if(c===g&&f===d)return null;var p=c.getCoordinates()[f],v=c.getCoordinates()[f+1],m=g.getCoordinates()[d],y=g.getCoordinates()[d+1];if(this.li.computeIntersection(p,v,m,y),this.li.hasIntersection()&&(this.li.isProper()||this.hasInteriorIntersection(this.li,p,v)||this.hasInteriorIntersection(this.li,m,y)))throw new l("found non-noded intersection at "+p+"-"+v+" and "+m+"-"+y)}},checkValid:function(){this.checkEndPtVertexIntersections(),this.checkInteriorIntersections(),this.checkCollapses()},checkCollapses:function(){if(0===arguments.length)for(var t=this.segStrings.iterator();t.hasNext();){var e=t.next();this.checkCollapses(e)}else if(1===arguments.length)for(var n=arguments[0],i=n.getCoordinates(),t=0;t<i.length-2;t++)this.checkCollapse(i[t],i[t+1],i[t+2])},hasInteriorIntersection:function(t,e,n){for(var i=0;i<t.getIntersectionNum();i++){var r=t.getIntersection(i);if(!r.equals(e)&&!r.equals(n))return!0}return!1},checkCollapse:function(t,e,n){if(t.equals(n))throw new l("found non-noded collapse at "+Ji.fact.createLineString([t,e,n]))},interfaces_:function(){return[]},getClass:function(){return Ji}}),Ji.fact=new ie,e($i.prototype,{intersectsScaled:function(t,e){var n=Math.min(t.x,e.x),i=Math.max(t.x,e.x),r=Math.min(t.y,e.y),s=Math.max(t.y,e.y),o=this.maxx<n||this.minx>i||this.maxy<r||this.miny>s;if(o)return!1;var a=this.intersectsToleranceSquare(t,e);return f.isTrue(!(o&&a),"Found bad envelope test"),a},initCorners:function(t){var e=.5;this.minx=t.x-e,this.maxx=t.x+e,this.miny=t.y-e,this.maxy=t.y+e,this.corner[0]=new g(this.maxx,this.maxy),this.corner[1]=new g(this.minx,this.maxy),this.corner[2]=new g(this.minx,this.miny),this.corner[3]=new g(this.maxx,this.miny)},intersects:function(t,e){return 1===this.scaleFactor?this.intersectsScaled(t,e):(this.copyScaled(t,this.p0Scaled),this.copyScaled(e,this.p1Scaled),this.intersectsScaled(this.p0Scaled,this.p1Scaled))},scale:function(t){return Math.round(t*this.scaleFactor)},getCoordinate:function(){return this.originalPt},copyScaled:function(t,e){e.x=this.scale(t.x),e.y=this.scale(t.y)},getSafeEnvelope:function(){if(null===this.safeEnv){var t=$i.SAFE_ENV_EXPANSION_FACTOR/this.scaleFactor;this.safeEnv=new C(this.originalPt.x-t,this.originalPt.x+t,this.originalPt.y-t,this.originalPt.y+t)}return this.safeEnv},intersectsPixelClosure:function(t,e){return this.li.computeIntersection(t,e,this.corner[0],this.corner[1]),this.li.hasIntersection()?!0:(this.li.computeIntersection(t,e,this.corner[1],this.corner[2]),this.li.hasIntersection()?!0:(this.li.computeIntersection(t,e,this.corner[2],this.corner[3]),this.li.hasIntersection()?!0:(this.li.computeIntersection(t,e,this.corner[3],this.corner[0]),!!this.li.hasIntersection())))},intersectsToleranceSquare:function(t,e){var n=!1,i=!1;return this.li.computeIntersection(t,e,this.corner[0],this.corner[1]),this.li.isProper()?!0:(this.li.computeIntersection(t,e,this.corner[1],this.corner[2]),this.li.isProper()?!0:(this.li.hasIntersection()&&(n=!0),this.li.computeIntersection(t,e,this.corner[2],this.corner[3]),this.li.isProper()?!0:(this.li.hasIntersection()&&(i=!0),this.li.computeIntersection(t,e,this.corner[3],this.corner[0]),this.li.isProper()?!0:n&&i?!0:t.equals(this.pt)?!0:!!e.equals(this.pt))))},addSnappedNode:function(t,e){var n=t.getCoordinate(e),i=t.getCoordinate(e+1);return this.intersects(n,i)?(t.addIntersection(this.getCoordinate(),e),!0):!1},interfaces_:function(){return[]},getClass:function(){return $i}}),$i.SAFE_ENV_EXPANSION_FACTOR=.75,e(tr.prototype,{select:function(){if(1===arguments.length){arguments[0]}else if(2===arguments.length){var t=arguments[0],e=arguments[1];t.getLineSegment(e,this.selectedSegment),this.select(this.selectedSegment)}},interfaces_:function(){return[]},getClass:function(){return tr}}),e(er.prototype,{snap:function(){if(1===arguments.length){var t=arguments[0];return this.snap(t,null,-1)}if(3===arguments.length){var e=arguments[0],n=arguments[1],i=arguments[2],r=e.getSafeEnvelope(),s=new nr(e,n,i);return this.index.query(r,{interfaces_:function(){return[Ae]},visitItem:function(t){var e=t;e.select(r,s)}}),s.isNodeAdded()}},interfaces_:function(){return[]},getClass:function(){return er}}),h(nr,tr),e(nr.prototype,{isNodeAdded:function(){return this._isNodeAdded},select:function(){if(2!==arguments.length)return tr.prototype.select.apply(this,arguments);var t=arguments[0],e=arguments[1],n=t.getContext();return null!==this.parentEdge&&n===this.parentEdge&&e===this.hotPixelVertexIndex?null:void(this._isNodeAdded=this.hotPixel.addSnappedNode(n,e))},interfaces_:function(){return[]},getClass:function(){return nr}}),er.HotPixelSnapAction=nr,e(ir.prototype,{processIntersections:function(t,e,n,i){if(t===n&&e===i)return null;var r=t.getCoordinates()[e],s=t.getCoordinates()[e+1],o=n.getCoordinates()[i],a=n.getCoordinates()[i+1];if(this.li.computeIntersection(r,s,o,a),this.li.hasIntersection()&&this.li.isInteriorIntersection()){for(var u=0;u<this.li.getIntersectionNum();u++)this.interiorIntersections.add(this.li.getIntersection(u));t.addIntersections(this.li,e,0),n.addIntersections(this.li,i,1)}},isDone:function(){return!1},getInteriorIntersections:function(){return this.interiorIntersections},interfaces_:function(){return[on]},getClass:function(){return ir}}),e(rr.prototype,{checkCorrectness:function(t){var e=Ke.getNodedSubstrings(t),n=new Ji(e);try{n.checkValid()}catch(t){if(!(t instanceof S))throw t;t.printStackTrace()}finally{}},getNodedSubstrings:function(){return Ke.getNodedSubstrings(this.nodedSegStrings)},snapRound:function(t,e){var n=this.findInteriorIntersections(t,e);this.computeIntersectionSnaps(n),this.computeVertexSnaps(t)},findInteriorIntersections:function(t,e){var n=new ir(e);return this.noder.setSegmentIntersector(n),this.noder.computeNodes(t),n.getInteriorIntersections()},computeVertexSnaps:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.computeVertexSnaps(n)}else if(arguments[0]instanceof Ke)for(var i=arguments[0],r=i.getCoordinates(),s=0;s<r.length;s++){var o=new $i(r[s],this.scaleFactor,this.li),a=this.pointSnapper.snap(o,i,s);a&&i.addIntersection(r[s],s)}},computeNodes:function(t){this.nodedSegStrings=t,this.noder=new nn,this.pointSnapper=new er(this.noder.getIndex()),this.snapRound(t,this.li)},computeIntersectionSnaps:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=new $i(n,this.scaleFactor,this.li);this.pointSnapper.snap(i)}},interfaces_:function(){return[tn]},getClass:function(){return rr}}),e(sr.prototype,{bufferFixedPrecision:function(t){var e=new Fi(new rr(new ee(1)),t.getScale()),n=new Qi(this.bufParams);n.setWorkingPrecisionModel(t),n.setNoder(e),this.resultGeometry=n.buffer(this.argGeom,this.distance)},bufferReducedPrecision:function(){if(0===arguments.length){for(var t=sr.MAX_PRECISION_DIGITS;t>=0;t--){try{this.bufferReducedPrecision(t)}catch(t){if(!(t instanceof sn))throw t;this.saveException=t}finally{}if(null!==this.resultGeometry)return null}throw this.saveException}if(1===arguments.length){var e=arguments[0],n=sr.precisionScaleFactor(this.argGeom,this.distance,e),i=new ee(n);this.bufferFixedPrecision(i)}},computeGeometry:function(){if(this.bufferOriginalPrecision(),null!==this.resultGeometry)return null;var t=this.argGeom.getFactory().getPrecisionModel();t.getType()===ee.FIXED?this.bufferFixedPrecision(t):this.bufferReducedPrecision()},setQuadrantSegments:function(t){this.bufParams.setQuadrantSegments(t)},bufferOriginalPrecision:function(){try{var t=new Qi(this.bufParams);this.resultGeometry=t.buffer(this.argGeom,this.distance)}catch(t){if(!(t instanceof l))throw t;this.saveException=t}finally{}},getResultGeometry:function(t){return this.distance=t,this.computeGeometry(),this.resultGeometry},setEndCapStyle:function(t){this.bufParams.setEndCapStyle(t)},interfaces_:function(){return[]},getClass:function(){return sr}}),sr.bufferOp=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new sr(t),i=n.getResultGeometry(e);return i}if(3===arguments.length){if(Number.isInteger(arguments[2])&&arguments[0]instanceof B&&"number"==typeof arguments[1]){var r=arguments[0],s=arguments[1],o=arguments[2],a=new sr(r);a.setQuadrantSegments(o);var i=a.getResultGeometry(s);return i}if(arguments[2]instanceof Bi&&arguments[0]instanceof B&&"number"==typeof arguments[1]){var u=arguments[0],l=arguments[1],h=arguments[2],a=new sr(u,h),i=a.getResultGeometry(l);return i}}else if(4===arguments.length){var c=arguments[0],f=arguments[1],g=arguments[2],d=arguments[3],a=new sr(c);a.setQuadrantSegments(g),a.setEndCapStyle(d);var i=a.getResultGeometry(f);return i}},sr.precisionScaleFactor=function(t,e,n){var i=t.getEnvelopeInternal(),r=T.max(Math.abs(i.getMaxX()),Math.abs(i.getMaxY()),Math.abs(i.getMinX()),Math.abs(i.getMinY())),s=e>0?e:0,o=r+2*s,a=Math.trunc(Math.log(o)/Math.log(10)+1),u=n-a,l=Math.pow(10,u);return l},sr.CAP_ROUND=Bi.CAP_ROUND,sr.CAP_BUTT=Bi.CAP_FLAT,sr.CAP_FLAT=Bi.CAP_FLAT,sr.CAP_SQUARE=Bi.CAP_SQUARE,sr.MAX_PRECISION_DIGITS=12;var Co=Object.freeze({BufferOp:sr,BufferParameters:Bi});e(or.prototype,{filter:function(t){t instanceof Tt&&this.comps.add(t)},interfaces_:function(){return[ht]},getClass:function(){return or}}),or.getPolygons=function(){if(1===arguments.length){var t=arguments[0];return or.getPolygons(t,new I)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return e instanceof Tt?n.add(e):e instanceof ft&&e.apply(new or(n)),n}},e(ar.prototype,{isInsideArea:function(){return this.segIndex===ar.INSIDE_AREA},getCoordinate:function(){return this.pt},getGeometryComponent:function(){return this.component},getSegmentIndex:function(){return this.segIndex},interfaces_:function(){return[]},getClass:function(){return ar}}),ar.INSIDE_AREA=-1,e(ur.prototype,{filter:function(t){t instanceof Lt&&this.pts.add(t)},interfaces_:function(){return[ht]},getClass:function(){return ur}}),ur.getPoints=function(){if(1===arguments.length){var t=arguments[0];return t instanceof Lt?ho.singletonList(t):ur.getPoints(t,new I)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return e instanceof Lt?n.add(e):e instanceof ft&&e.apply(new ur(n)),n}},e(lr.prototype,{filter:function(t){(t instanceof Lt||t instanceof St||t instanceof Tt)&&this.locations.add(new ar(t,0,t.getCoordinate()))},interfaces_:function(){return[ht]},getClass:function(){return lr}}),lr.getLocations=function(t){var e=new I;return t.apply(new lr(e)),e},e(hr.prototype,{computeContainmentDistance:function(){if(0===arguments.length){var t=new Array(2).fill(null);if(this.computeContainmentDistance(0,t),this.minDistance<=this.terminateDistance)return null;this.computeContainmentDistance(1,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1],i=1-e,r=or.getPolygons(this.geom[e]);if(r.size()>0){var s=lr.getLocations(this.geom[i]);if(this.computeContainmentDistance(s,r,n),this.minDistance<=this.terminateDistance)return this.minDistanceLocation[i]=n[0],this.minDistanceLocation[e]=n[1],null}}else if(3===arguments.length)if(arguments[2]instanceof Array&&R(arguments[0],y)&&R(arguments[1],y)){for(var o=arguments[0],a=arguments[1],u=arguments[2],l=0;l<o.size();l++)for(var h=o.get(l),c=0;c<a.size();c++)if(this.computeContainmentDistance(h,a.get(c),u),this.minDistance<=this.terminateDistance)return null}else if(arguments[2]instanceof Array&&arguments[0]instanceof ar&&arguments[1]instanceof Tt){var f=arguments[0],g=arguments[1],d=arguments[2],p=f.getCoordinate();if(L.EXTERIOR!==this.ptLocator.locate(p,g))return this.minDistance=0,d[0]=f,d[1]=new ar(g,p),null}},computeMinDistanceLinesPoints:function(t,e,n){for(var i=0;i<t.size();i++)for(var r=t.get(i),s=0;s<e.size();s++){var o=e.get(s);if(this.computeMinDistance(r,o,n),this.minDistance<=this.terminateDistance)return null}},computeFacetDistance:function(){var t=new Array(2).fill(null),e=kn.getLines(this.geom[0]),n=kn.getLines(this.geom[1]),i=ur.getPoints(this.geom[0]),r=ur.getPoints(this.geom[1]);return this.computeMinDistanceLines(e,n,t),this.updateMinDistance(t,!1),this.minDistance<=this.terminateDistance?null:(t[0]=null,t[1]=null,this.computeMinDistanceLinesPoints(e,r,t),this.updateMinDistance(t,!1),this.minDistance<=this.terminateDistance?null:(t[0]=null,t[1]=null,this.computeMinDistanceLinesPoints(n,i,t),this.updateMinDistance(t,!0),this.minDistance<=this.terminateDistance?null:(t[0]=null,t[1]=null,this.computeMinDistancePoints(i,r,t),void this.updateMinDistance(t,!1))))},nearestLocations:function(){return this.computeMinDistance(),this.minDistanceLocation},updateMinDistance:function(t,e){return null===t[0]?null:void(e?(this.minDistanceLocation[0]=t[1],this.minDistanceLocation[1]=t[0]):(this.minDistanceLocation[0]=t[0],this.minDistanceLocation[1]=t[1]))},nearestPoints:function(){this.computeMinDistance();var t=[this.minDistanceLocation[0].getCoordinate(),this.minDistanceLocation[1].getCoordinate()];return t},computeMinDistance:function(){if(0===arguments.length){if(null!==this.minDistanceLocation)return null;if(this.minDistanceLocation=new Array(2).fill(null),this.computeContainmentDistance(),this.minDistance<=this.terminateDistance)return null;this.computeFacetDistance()}else if(3===arguments.length)if(arguments[2]instanceof Array&&arguments[0]instanceof St&&arguments[1]instanceof Lt){var t=arguments[0],e=arguments[1],n=arguments[2];if(t.getEnvelopeInternal().distance(e.getEnvelopeInternal())>this.minDistance)return null;for(var i=t.getCoordinates(),r=e.getCoordinate(),s=0;s<i.length-1;s++){var o=he.distancePointLine(r,i[s],i[s+1]);if(o<this.minDistance){this.minDistance=o;var a=new ce(i[s],i[s+1]),u=a.closestPoint(r);n[0]=new ar(t,s,u),n[1]=new ar(e,0,r)}if(this.minDistance<=this.terminateDistance)return null}}else if(arguments[2]instanceof Array&&arguments[0]instanceof St&&arguments[1]instanceof St){var l=arguments[0],h=arguments[1],c=arguments[2];if(l.getEnvelopeInternal().distance(h.getEnvelopeInternal())>this.minDistance)return null;for(var i=l.getCoordinates(),f=h.getCoordinates(),s=0;s<i.length-1;s++)for(var g=0;g<f.length-1;g++){var o=he.distanceLineLine(i[s],i[s+1],f[g],f[g+1]);if(o<this.minDistance){this.minDistance=o;var d=new ce(i[s],i[s+1]),p=new ce(f[g],f[g+1]),v=d.closestPoints(p);c[0]=new ar(l,s,v[0]),c[1]=new ar(h,g,v[1])}if(this.minDistance<=this.terminateDistance)return null}}},computeMinDistancePoints:function(t,e,n){for(var i=0;i<t.size();i++)for(var r=t.get(i),s=0;s<e.size();s++){var o=e.get(s),a=r.getCoordinate().distance(o.getCoordinate());if(a<this.minDistance&&(this.minDistance=a,n[0]=new ar(r,0,r.getCoordinate()),n[1]=new ar(o,0,o.getCoordinate())),this.minDistance<=this.terminateDistance)return null}},distance:function(){if(null===this.geom[0]||null===this.geom[1])throw new i("null geometries are not supported");return this.geom[0].isEmpty()||this.geom[1].isEmpty()?0:(this.computeMinDistance(),this.minDistance)},computeMinDistanceLines:function(t,e,n){for(var i=0;i<t.size();i++)for(var r=t.get(i),s=0;s<e.size();s++){var o=e.get(s);if(this.computeMinDistance(r,o,n),this.minDistance<=this.terminateDistance)return null}},interfaces_:function(){return[]},getClass:function(){return hr}}),hr.distance=function(t,e){var n=new hr(t,e);return n.distance()},hr.isWithinDistance=function(t,e,n){var i=new hr(t,e,n);return i.distance()<=n},hr.nearestPoints=function(t,e){var n=new hr(t,e);return n.nearestPoints()};var So=Object.freeze({DistanceOp:hr});e(cr.prototype,{getCoordinates:function(){if(null===this.coordinates){for(var t=0,e=0,n=new N,i=this.directedEdges.iterator();i.hasNext();){var r=i.next();r.getEdgeDirection()?t++:e++,n.add(r.getEdge().getLine().getCoordinates(),!1,r.getEdgeDirection())}this.coordinates=n.toCoordinateArray(),e>t&&H.reverse(this.coordinates)}return this.coordinates},toLineString:function(){return this.factory.createLineString(this.getCoordinates())},add:function(t){this.directedEdges.add(t)},interfaces_:function(){return[]},getClass:function(){return cr}}),e(fr.prototype,{setVisited:function(t){this._isVisited=t},isMarked:function(){return this._isMarked},setData:function(t){this.data=t},getData:function(){return this.data},setMarked:function(t){this._isMarked=t},getContext:function(){return this.data},isVisited:function(){return this._isVisited},setContext:function(t){this.data=t},interfaces_:function(){return[]},getClass:function(){return fr}}),fr.getComponentWithVisitedState=function(t,e){for(;t.hasNext();){var n=t.next();if(n.isVisited()===e)return n}return null},fr.setVisited=function(t,e){for(;t.hasNext();){var n=t.next();n.setVisited(e)}},fr.setMarked=function(t,e){for(;t.hasNext();){var n=t.next();n.setMarked(e)}},h(gr,fr),e(gr.prototype,{isRemoved:function(){return null===this.parentEdge},compareDirection:function(t){return this.quadrant>t.quadrant?1:this.quadrant<t.quadrant?-1:he.computeOrientation(t.p0,t.p1,this.p1)},getCoordinate:function(){return this.from.getCoordinate()},print:function(t){var e=this.getClass().getName(),n=e.lastIndexOf("."),i=e.substring(n+1);t.print("  "+i+": "+this.p0+" - "+this.p1+" "+this.quadrant+":"+this.angle)},getDirectionPt:function(){return this.p1},getAngle:function(){return this.angle},compareTo:function(t){var e=t;return this.compareDirection(e)},getFromNode:function(){return this.from},getSym:function(){return this.sym},setEdge:function(t){this.parentEdge=t},remove:function(){this.sym=null,this.parentEdge=null},getEdge:function(){return this.parentEdge},getQuadrant:function(){return this.quadrant},setSym:function(t){this.sym=t},getToNode:function(){return this.to},getEdgeDirection:function(){return this.edgeDirection},interfaces_:function(){return[s]},getClass:function(){return gr}}),gr.toEdges=function(t){for(var e=new I,n=t.iterator();n.hasNext();)e.add(n.next().parentEdge);return e},h(dr,gr),e(dr.prototype,{getNext:function(){return 2!==this.getToNode().getDegree()?null:this.getToNode().getOutEdges().getEdges().get(0)===this.getSym()?this.getToNode().getOutEdges().getEdges().get(1):(f.isTrue(this.getToNode().getOutEdges().getEdges().get(1)===this.getSym()),this.getToNode().getOutEdges().getEdges().get(0))},interfaces_:function(){return[]},getClass:function(){return dr}}),h(pr,fr),e(pr.prototype,{isRemoved:function(){return null===this.dirEdge},setDirectedEdges:function(t,e){this.dirEdge=[t,e],t.setEdge(this),e.setEdge(this),t.setSym(e),e.setSym(t),t.getFromNode().addOutEdge(t),e.getFromNode().addOutEdge(e)},getDirEdge:function(){if(Number.isInteger(arguments[0])){var t=arguments[0];return this.dirEdge[t]}if(arguments[0]instanceof mr){var e=arguments[0];return this.dirEdge[0].getFromNode()===e?this.dirEdge[0]:this.dirEdge[1].getFromNode()===e?this.dirEdge[1]:null}},remove:function(){this.dirEdge=null},getOppositeNode:function(t){return this.dirEdge[0].getFromNode()===t?this.dirEdge[0].getToNode():this.dirEdge[1].getFromNode()===t?this.dirEdge[1].getToNode():null},interfaces_:function(){return[]},getClass:function(){return pr}}),e(vr.prototype,{getNextEdge:function(t){var e=this.getIndex(t);return this.outEdges.get(this.getIndex(e+1))},getCoordinate:function(){var t=this.iterator();if(!t.hasNext())return null;var e=t.next();return e.getCoordinate()},iterator:function(){return this.sortEdges(),this.outEdges.iterator()},sortEdges:function(){this.sorted||(ho.sort(this.outEdges),this.sorted=!0)},remove:function(t){this.outEdges.remove(t)},getEdges:function(){return this.sortEdges(),this.outEdges},getNextCWEdge:function(t){var e=this.getIndex(t);return this.outEdges.get(this.getIndex(e-1))},getIndex:function(){if(arguments[0]instanceof pr){var t=arguments[0];this.sortEdges();for(var e=0;e<this.outEdges.size();e++){var n=this.outEdges.get(e);if(n.getEdge()===t)return e}return-1}if(arguments[0]instanceof gr){var i=arguments[0];this.sortEdges();for(var e=0;e<this.outEdges.size();e++){var n=this.outEdges.get(e);if(n===i)return e}return-1}if(Number.isInteger(arguments[0])){var r=arguments[0],s=r%this.outEdges.size();return 0>s&&(s+=this.outEdges.size()),s}},add:function(t){this.outEdges.add(t),this.sorted=!1},getDegree:function(){return this.outEdges.size()},interfaces_:function(){return[]},getClass:function(){return vr}}),h(mr,fr),e(mr.prototype,{isRemoved:function(){return null===this.pt},addOutEdge:function(t){this.deStar.add(t)},getCoordinate:function(){return this.pt},getOutEdges:function(){return this.deStar},remove:function(){if(0===arguments.length)this.pt=null;else if(1===arguments.length){var t=arguments[0];this.deStar.remove(t)}},getIndex:function(t){return this.deStar.getIndex(t)},getDegree:function(){return this.deStar.getDegree()},interfaces_:function(){return[]},getClass:function(){return mr}}),mr.getEdgesBetween=function(t,e){var n=gr.toEdges(t.getOutEdges().getEdges()),i=new J(n),r=gr.toEdges(e.getOutEdges().getEdges());return i.retainAll(r),i},h(yr,pr),e(yr.prototype,{getLine:function(){return this.line},interfaces_:function(){return[]},getClass:function(){return yr}}),e(xr.prototype,{find:function(t){return this.nodeMap.get(t)},iterator:function(){return this.nodeMap.values().iterator()},remove:function(t){return this.nodeMap.remove(t)},values:function(){return this.nodeMap.values()},add:function(t){return this.nodeMap.put(t.getCoordinate(),t),t},interfaces_:function(){return[]},getClass:function(){return xr}}),e(Er.prototype,{findNodesOfDegree:function(t){for(var e=new I,n=this.nodeIterator();n.hasNext();){var i=n.next();i.getDegree()===t&&e.add(i)}return e},dirEdgeIterator:function(){return this.dirEdges.iterator()},edgeIterator:function(){return this.edges.iterator()},remove:function(){if(arguments[0]instanceof pr){var t=arguments[0];this.remove(t.getDirEdge(0)),this.remove(t.getDirEdge(1)),this.edges.remove(t),t.remove()}else if(arguments[0]instanceof gr){var e=arguments[0],n=e.getSym();null!==n&&n.setSym(null),e.getFromNode().remove(e),e.remove(),this.dirEdges.remove(e)}else if(arguments[0]instanceof mr){for(var i=arguments[0],r=i.getOutEdges().getEdges(),s=r.iterator();s.hasNext();){var o=s.next(),n=o.getSym();null!==n&&this.remove(n),this.dirEdges.remove(o);var a=o.getEdge();null!==a&&this.edges.remove(a)}this.nodeMap.remove(i.getCoordinate()),i.remove()}},findNode:function(t){return this.nodeMap.find(t)},getEdges:function(){return this.edges},nodeIterator:function(){return this.nodeMap.iterator()},contains:function(){if(arguments[0]instanceof pr){var t=arguments[0];return this.edges.contains(t)}if(arguments[0]instanceof gr){var e=arguments[0];return this.dirEdges.contains(e)}},add:function(){if(arguments[0]instanceof mr){var t=arguments[0];this.nodeMap.add(t)}else if(arguments[0]instanceof pr){var e=arguments[0];this.edges.add(e),this.add(e.getDirEdge(0)),this.add(e.getDirEdge(1))}else if(arguments[0]instanceof gr){var n=arguments[0];this.dirEdges.add(n)}},getNodes:function(){return this.nodeMap.values()},interfaces_:function(){return[]},getClass:function(){return Er}}),h(Ir,Er),e(Ir.prototype,{addEdge:function(t){if(t.isEmpty())return null;var e=H.removeRepeatedPoints(t.getCoordinates());if(e.length<=1)return null;var n=e[0],i=e[e.length-1],r=this.getNode(n),s=this.getNode(i),o=new dr(r,s,e[1],!0),a=new dr(s,r,e[e.length-2],!1),u=new yr(t);u.setDirectedEdges(o,a),this.add(u)},getNode:function(t){var e=this.findNode(t);return null===e&&(e=new mr(t),this.add(e)),e},interfaces_:function(){return[]},getClass:function(){return Ir}}),e(Nr.prototype,{buildEdgeStringsForUnprocessedNodes:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();e.isMarked()||(f.isTrue(2===e.getDegree()),this.buildEdgeStringsStartingAt(e),e.setMarked(!0))}},buildEdgeStringsForNonDegree2Nodes:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();2!==e.getDegree()&&(this.buildEdgeStringsStartingAt(e),e.setMarked(!0))}},buildEdgeStringsForObviousStartNodes:function(){this.buildEdgeStringsForNonDegree2Nodes()},getMergedLineStrings:function(){return this.merge(),this.mergedLineStrings},buildEdgeStringsStartingAt:function(t){for(var e=t.getOutEdges().iterator();e.hasNext();){var n=e.next();n.getEdge().isMarked()||this.edgeStrings.add(this.buildEdgeStringStartingWith(n))}},merge:function(){if(null!==this.mergedLineStrings)return null;fr.setMarked(this.graph.nodeIterator(),!1),fr.setMarked(this.graph.edgeIterator(),!1),this.edgeStrings=new I,this.buildEdgeStringsForObviousStartNodes(),this.buildEdgeStringsForIsolatedLoops(),this.mergedLineStrings=new I;for(var t=this.edgeStrings.iterator();t.hasNext();){var e=t.next();this.mergedLineStrings.add(e.toLineString())}},buildEdgeStringStartingWith:function(t){var e=new cr(this.factory),n=t;do e.add(n),n.getEdge().setMarked(!0),n=n.getNext();while(null!==n&&n!==t);return e},add:function(){if(arguments[0]instanceof B){var t=arguments[0];t.apply({interfaces_:function(){return[q]},filter:function(t){t instanceof St&&this.add(t)}})}else if(R(arguments[0],v)){var e=arguments[0];this.mergedLineStrings=null;for(var n=e.iterator();n.hasNext();){
var i=n.next();this.add(i)}}else if(arguments[0]instanceof St){var r=arguments[0];null===this.factory&&(this.factory=r.getFactory()),this.graph.addEdge(r)}},buildEdgeStringsForIsolatedLoops:function(){this.buildEdgeStringsForUnprocessedNodes()},interfaces_:function(){return[]},getClass:function(){return Nr}});var wo=Object.freeze({LineMerger:Nr}),Lo=Object.freeze({OverlayOp:ii});h(Cr,gr),e(Cr.prototype,{getNext:function(){return this.next},isInRing:function(){return null!==this.edgeRing},setRing:function(t){this.edgeRing=t},setLabel:function(t){this.label=t},getLabel:function(){return this.label},setNext:function(t){this.next=t},getRing:function(){return this.edgeRing},interfaces_:function(){return[]},getClass:function(){return Cr}}),h(Sr,pr),e(Sr.prototype,{getLine:function(){return this.line},interfaces_:function(){return[]},getClass:function(){return Sr}}),e(wr.prototype,{isIncluded:function(){return this._isIncluded},getCoordinates:function(){if(null===this.ringPts){for(var t=new N,e=this.deList.iterator();e.hasNext();){var n=e.next(),i=n.getEdge();wr.addEdge(i.getLine().getCoordinates(),n.getEdgeDirection(),t)}this.ringPts=t.toCoordinateArray()}return this.ringPts},isIncludedSet:function(){return this._isIncludedSet},isValid:function(){return this.getCoordinates(),this.ringPts.length<=3?!1:(this.getRing(),this.ring.isValid())},build:function(t){var e=t;do this.add(e),e.setRing(this),e=e.getNext(),f.isTrue(null!==e,"found null DE in ring"),f.isTrue(e===t||!e.isInRing(),"found DE already in ring");while(e!==t)},isOuterHole:function(){return this._isHole?!this.hasShell():!1},getPolygon:function(){var t=null;if(null!==this.holes){t=new Array(this.holes.size()).fill(null);for(var e=0;e<this.holes.size();e++)t[e]=this.holes.get(e)}var n=this.factory.createPolygon(this.ring,t);return n},isHole:function(){return this._isHole},isProcessed:function(){return this._isProcessed},addHole:function(){if(arguments[0]instanceof bt){var t=arguments[0];null===this.holes&&(this.holes=new I),this.holes.add(t)}else if(arguments[0]instanceof wr){var e=arguments[0];e.setShell(this);var n=e.getRing();null===this.holes&&(this.holes=new I),this.holes.add(n)}},setIncluded:function(t){this._isIncluded=t,this._isIncludedSet=!0},getOuterHole:function(){if(this.isHole())return null;for(var t=0;t<this.deList.size();t++){var e=this.deList.get(t),n=e.getSym().getRing();if(n.isOuterHole())return n}return null},computeHole:function(){var t=this.getRing();this._isHole=he.isCCW(t.getCoordinates())},hasShell:function(){return null!==this.shell},isOuterShell:function(){return null!==this.getOuterHole()},getLineString:function(){return this.getCoordinates(),this.factory.createLineString(this.ringPts)},toString:function(){return se.toLineString(new Gt(this.getCoordinates()))},getShell:function(){return this.isHole()?this.shell:this},add:function(t){this.deList.add(t)},getRing:function(){if(null!==this.ring)return this.ring;this.getCoordinates(),this.ringPts.length<3&&A.out.println(this.ringPts);try{this.ring=this.factory.createLinearRing(this.ringPts)}catch(t){if(!(t instanceof S))throw t;A.out.println(this.ringPts)}finally{}return this.ring},updateIncluded:function(){if(this.isHole())return null;for(var t=0;t<this.deList.size();t++){var e=this.deList.get(t),n=e.getSym().getRing().getShell();if(null!==n&&n.isIncludedSet())return this.setIncluded(!n.isIncluded()),null}},setShell:function(t){this.shell=t},setProcessed:function(t){this._isProcessed=t},interfaces_:function(){return[]},getClass:function(){return wr}}),wr.findDirEdgesInRing=function(t){var e=t,n=new I;do n.add(e),e=e.getNext(),f.isTrue(null!==e,"found null DE in ring"),f.isTrue(e===t||!e.isInRing(),"found DE already in ring");while(e!==t);return n},wr.addEdge=function(t,e,n){if(e)for(var i=0;i<t.length;i++)n.add(t[i],!1);else for(var i=t.length-1;i>=0;i--)n.add(t[i],!1)},wr.findEdgeRingContaining=function(t,e){for(var n=t.getRing(),i=n.getEnvelopeInternal(),r=n.getCoordinateN(0),s=null,o=null,a=e.iterator();a.hasNext();){var u=a.next(),l=u.getRing(),h=l.getEnvelopeInternal();if(!h.equals(i)&&h.contains(i)){r=H.ptNotInList(n.getCoordinates(),l.getCoordinates());var c=!1;he.isPointInRing(r,l.getCoordinates())&&(c=!0),c&&(null===s||o.contains(h))&&(s=u,o=s.getRing().getEnvelopeInternal())}}return s},e(Lr.prototype,{compare:function(t,e){var n=t,i=e;return n.getRing().getEnvelope().compareTo(i.getRing().getEnvelope())},interfaces_:function(){return[a]},getClass:function(){return Lr}}),wr.EnvelopeComparator=Lr,h(Rr,Er),e(Rr.prototype,{findEdgeRing:function(t){var e=new wr(this.factory);return e.build(t),e},computeDepthParity:function(){if(0===arguments.length)for(;;){var t=null;if(null===t)return null;this.computeDepthParity(t)}else if(1===arguments.length){arguments[0]}},computeNextCWEdges:function(){for(var t=this.nodeIterator();t.hasNext();){var e=t.next();Rr.computeNextCWEdges(e)}},addEdge:function(t){if(t.isEmpty())return null;var e=H.removeRepeatedPoints(t.getCoordinates());if(e.length<2)return null;var n=e[0],i=e[e.length-1],r=this.getNode(n),s=this.getNode(i),o=new Cr(r,s,e[1],!0),a=new Cr(s,r,e[e.length-2],!1),u=new Sr(t);u.setDirectedEdges(o,a),this.add(u)},deleteCutEdges:function(){this.computeNextCWEdges(),Rr.findLabeledEdgeRings(this.dirEdges);for(var t=new I,e=this.dirEdges.iterator();e.hasNext();){var n=e.next();if(!n.isMarked()){var i=n.getSym();if(n.getLabel()===i.getLabel()){n.setMarked(!0),i.setMarked(!0);var r=n.getEdge();t.add(r.getLine())}}}return t},getEdgeRings:function(){this.computeNextCWEdges(),Rr.label(this.dirEdges,-1);var t=Rr.findLabeledEdgeRings(this.dirEdges);this.convertMaximalToMinimalEdgeRings(t);for(var e=new I,n=this.dirEdges.iterator();n.hasNext();){var i=n.next();if(!i.isMarked()&&!i.isInRing()){var r=this.findEdgeRing(i);e.add(r)}}return e},getNode:function(t){var e=this.findNode(t);return null===e&&(e=new mr(t),this.add(e)),e},convertMaximalToMinimalEdgeRings:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=n.getLabel(),r=Rr.findIntersectionNodes(n,i);if(null!==r)for(var s=r.iterator();s.hasNext();){var o=s.next();Rr.computeNextCCWEdges(o,i)}}},deleteDangles:function(){for(var t=this.findNodesOfDegree(1),e=new J,n=new pe,i=t.iterator();i.hasNext();)n.push(i.next());for(;!n.isEmpty();){var r=n.pop();Rr.deleteAllEdges(r);for(var s=r.getOutEdges().getEdges(),i=s.iterator();i.hasNext();){var o=i.next();o.setMarked(!0);var a=o.getSym();null!==a&&a.setMarked(!0);var u=o.getEdge();e.add(u.getLine());var l=o.getToNode();1===Rr.getDegreeNonDeleted(l)&&n.push(l)}}return e},interfaces_:function(){return[]},getClass:function(){return Rr}}),Rr.findLabeledEdgeRings=function(t){for(var e=new I,n=1,i=t.iterator();i.hasNext();){var r=i.next();if(!(r.isMarked()||r.getLabel()>=0)){e.add(r);var s=wr.findDirEdgesInRing(r);Rr.label(s,n),n++}}return e},Rr.getDegreeNonDeleted=function(t){for(var e=t.getOutEdges().getEdges(),n=0,i=e.iterator();i.hasNext();){var r=i.next();r.isMarked()||n++}return n},Rr.deleteAllEdges=function(t){for(var e=t.getOutEdges().getEdges(),n=e.iterator();n.hasNext();){var i=n.next();i.setMarked(!0);var r=i.getSym();null!==r&&r.setMarked(!0)}},Rr.label=function(t,e){for(var n=t.iterator();n.hasNext();){var i=n.next();i.setLabel(e)}},Rr.computeNextCWEdges=function(t){for(var e=t.getOutEdges(),n=null,i=null,r=e.getEdges().iterator();r.hasNext();){var s=r.next();if(!s.isMarked()){if(null===n&&(n=s),null!==i){var o=i.getSym();o.setNext(s)}i=s}}if(null!==i){var o=i.getSym();o.setNext(n)}},Rr.computeNextCCWEdges=function(t,e){for(var n=t.getOutEdges(),i=null,r=null,s=n.getEdges(),o=s.size()-1;o>=0;o--){var a=s.get(o),u=a.getSym(),l=null;a.getLabel()===e&&(l=a);var h=null;u.getLabel()===e&&(h=u),null===l&&null===h||(null!==h&&(r=h),null!==l&&(null!==r&&(r.setNext(l),r=null),null===i&&(i=l)))}null!==r&&(f.isTrue(null!==i),r.setNext(i))},Rr.getDegree=function(t,e){for(var n=t.getOutEdges().getEdges(),i=0,r=n.iterator();r.hasNext();){var s=r.next();s.getLabel()===e&&i++}return i},Rr.findIntersectionNodes=function(t,e){var n=t,i=null;do{var r=n.getFromNode();Rr.getDegree(r,e)>1&&(null===i&&(i=new I),i.add(r)),n=n.getNext(),f.isTrue(null!==n,"found null DE in ring"),f.isTrue(n===t||!n.isInRing(),"found DE already in ring")}while(n!==t);return i},e(Tr.prototype,{getGeometry:function(){return null===this.geomFactory&&(this.geomFactory=new ie),this.polygonize(),this.extractOnlyPolygonal?this.geomFactory.buildGeometry(this.polyList):this.geomFactory.createGeometryCollection(ie.toGeometryArray(this.polyList))},getInvalidRingLines:function(){return this.polygonize(),this.invalidRingLines},findValidRings:function(t,e,n){for(var i=t.iterator();i.hasNext();){var r=i.next();r.isValid()?e.add(r):n.add(r.getLineString())}},polygonize:function(){if(null!==this.polyList)return null;if(this.polyList=new I,null===this.graph)return null;this.dangles=this.graph.deleteDangles(),this.cutEdges=this.graph.deleteCutEdges();var t=this.graph.getEdgeRings(),e=new I;this.invalidRingLines=new I,this.isCheckingRingsValid?this.findValidRings(t,e,this.invalidRingLines):e=t,this.findShellsAndHoles(e),Tr.assignHolesToShells(this.holeList,this.shellList),ho.sort(this.shellList,new wr.EnvelopeComparator);var n=!0;this.extractOnlyPolygonal&&(Tr.findDisjointShells(this.shellList),n=!1),this.polyList=Tr.extractPolygons(this.shellList,n)},getDangles:function(){return this.polygonize(),this.dangles},getCutEdges:function(){return this.polygonize(),this.cutEdges},getPolygons:function(){return this.polygonize(),this.polyList},add:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.add(n)}else if(arguments[0]instanceof St){var i=arguments[0];this.geomFactory=i.getFactory(),null===this.graph&&(this.graph=new Rr(this.geomFactory)),this.graph.addEdge(i)}else if(arguments[0]instanceof B){var r=arguments[0];r.apply(this.lineStringAdder)}},setCheckRingsValid:function(t){this.isCheckingRingsValid=t},findShellsAndHoles:function(t){this.holeList=new I,this.shellList=new I;for(var e=t.iterator();e.hasNext();){var n=e.next();n.computeHole(),n.isHole()?this.holeList.add(n):this.shellList.add(n)}},interfaces_:function(){return[]},getClass:function(){return Tr}}),Tr.findOuterShells=function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=n.getOuterHole();null===i||i.isProcessed()||(n.setIncluded(!0),i.setProcessed(!0))}},Tr.extractPolygons=function(t,e){for(var n=new I,i=t.iterator();i.hasNext();){var r=i.next();(e||r.isIncluded())&&n.add(r.getPolygon())}return n},Tr.assignHolesToShells=function(t,e){for(var n=t.iterator();n.hasNext();){var i=n.next();Tr.assignHoleToShell(i,e)}},Tr.assignHoleToShell=function(t,e){var n=wr.findEdgeRingContaining(t,e);null!==n&&n.addHole(t)},Tr.findDisjointShells=function(t){Tr.findOuterShells(t);var e=null;do{e=!1;for(var n=t.iterator();n.hasNext();){var i=n.next();i.isIncludedSet()||(i.updateIncluded(),i.isIncludedSet()||(e=!0))}}while(e)},e(Pr.prototype,{filter:function(t){t instanceof St&&this.p.add(t)},interfaces_:function(){return[q]},getClass:function(){return Pr}}),Tr.LineStringAdder=Pr;var Ro=Object.freeze({Polygonizer:Tr});e(br.prototype,{createEdgeEndForNext:function(t,e,n,i){var r=n.segmentIndex+1;if(r>=t.getNumPoints()&&null===i)return null;var s=t.getCoordinate(r);null!==i&&i.segmentIndex===n.segmentIndex&&(s=i.coord);var o=new En(t,n.coord,s,new gn(t.getLabel()));e.add(o)},createEdgeEndForPrev:function(t,e,n,i){var r=n.segmentIndex;if(0===n.dist){if(0===r)return null;r--}var s=t.getCoordinate(r);null!==i&&i.segmentIndex>=r&&(s=i.coord);var o=new gn(t.getLabel());o.flip();var a=new En(t,n.coord,s,o);e.add(a)},computeEdgeEnds:function(){if(1===arguments.length){for(var t=arguments[0],e=new I,n=t;n.hasNext();){var i=n.next();this.computeEdgeEnds(i,e)}return e}if(2===arguments.length){var r=arguments[0],s=arguments[1],o=r.getEdgeIntersectionList();o.addEndpoints();var a=o.iterator(),u=null,l=null;if(!a.hasNext())return null;var h=a.next();do u=l,l=h,h=null,a.hasNext()&&(h=a.next()),null!==l&&(this.createEdgeEndForPrev(r,s,l,u),this.createEdgeEndForNext(r,s,l,h));while(null!==l)}},interfaces_:function(){return[]},getClass:function(){return br}}),h(Or,En),e(Or.prototype,{insert:function(t){this.edgeEnds.add(t)},print:function(t){t.println("EdgeEndBundle--> Label: "+this.label);for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t),t.println()}},iterator:function(){return this.edgeEnds.iterator()},getEdgeEnds:function(){return this.edgeEnds},computeLabelOn:function(t,e){for(var n=0,i=!1,r=this.iterator();r.hasNext();){var s=r.next(),o=s.getLabel().getLocation(t);o===L.BOUNDARY&&n++,o===L.INTERIOR&&(i=!0)}var o=L.NONE;i&&(o=L.INTERIOR),n>0&&(o=$n.determineBoundary(e,n)),this.label.setLocation(t,o)},computeLabelSide:function(t,e){for(var n=this.iterator();n.hasNext();){var i=n.next();if(i.getLabel().isArea()){var r=i.getLabel().getLocation(t,e);if(r===L.INTERIOR)return this.label.setLocation(t,e,L.INTERIOR),null;r===L.EXTERIOR&&this.label.setLocation(t,e,L.EXTERIOR)}}},getLabel:function(){return this.label},computeLabelSides:function(t){this.computeLabelSide(t,cn.LEFT),this.computeLabelSide(t,cn.RIGHT)},updateIM:function(t){Jn.updateIM(this.label,t)},computeLabel:function(t){for(var e=!1,n=this.iterator();n.hasNext();){var i=n.next();i.getLabel().isArea()&&(e=!0)}e?this.label=new gn(L.NONE,L.NONE,L.NONE):this.label=new gn(L.NONE);for(var r=0;2>r;r++)this.computeLabelOn(r,t),e&&this.computeLabelSides(r)},interfaces_:function(){return[]},getClass:function(){return Or}}),h(_r,Pn),e(_r.prototype,{updateIM:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();n.updateIM(t)}},insert:function(t){var e=this.edgeMap.get(t);null===e?(e=new Or(t),this.insertEdgeEnd(t,e)):e.insert(t)},interfaces_:function(){return[]},getClass:function(){return _r}}),h(Mr,yn),e(Mr.prototype,{updateIMFromEdges:function(t){this.edges.updateIM(t)},computeIM:function(t){t.setAtLeastIfValid(this.label.getLocation(0),this.label.getLocation(1),0)},interfaces_:function(){return[]},getClass:function(){return Mr}}),h(Dr,Nn),e(Dr.prototype,{createNode:function(t){return new Mr(t,new _r)},interfaces_:function(){return[]},getClass:function(){return Dr}}),e(Ar.prototype,{insertEdgeEnds:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.nodes.add(n)}},computeProperIntersectionIM:function(t,e){var n=this.arg[0].getGeometry().getDimension(),i=this.arg[1].getGeometry().getDimension(),r=t.hasProperIntersection(),s=t.hasProperInteriorIntersection();2===n&&2===i?r&&e.setAtLeast("212101212"):2===n&&1===i?(r&&e.setAtLeast("FFF0FFFF2"),s&&e.setAtLeast("1FFFFF1FF")):1===n&&2===i?(r&&e.setAtLeast("F0FFFFFF2"),s&&e.setAtLeast("1F1FFFFFF")):1===n&&1===i&&s&&e.setAtLeast("0FFFFFFFF")},labelIsolatedEdges:function(t,e){for(var n=this.arg[t].getEdgeIterator();n.hasNext();){var i=n.next();i.isIsolated()&&(this.labelIsolatedEdge(i,e,this.arg[e].getGeometry()),this.isolatedEdges.add(i))}},labelIsolatedEdge:function(t,e,n){if(n.getDimension()>0){var i=this.ptLocator.locate(t.getCoordinate(),n);t.getLabel().setAllLocations(e,i)}else t.getLabel().setAllLocations(e,L.EXTERIOR)},computeIM:function(){var t=new fe;if(t.set(L.EXTERIOR,L.EXTERIOR,2),!this.arg[0].getGeometry().getEnvelopeInternal().intersects(this.arg[1].getGeometry().getEnvelopeInternal()))return this.computeDisjointIM(t),t;this.arg[0].computeSelfNodes(this.li,!1),this.arg[1].computeSelfNodes(this.li,!1);var e=this.arg[0].computeEdgeIntersections(this.arg[1],this.li,!1);this.computeIntersectionNodes(0),this.computeIntersectionNodes(1),this.copyNodesAndLabels(0),this.copyNodesAndLabels(1),this.labelIsolatedNodes(),this.computeProperIntersectionIM(e,t);var n=new br,i=n.computeEdgeEnds(this.arg[0].getEdgeIterator());this.insertEdgeEnds(i);var r=n.computeEdgeEnds(this.arg[1].getEdgeIterator());return this.insertEdgeEnds(r),this.labelNodeEdges(),this.labelIsolatedEdges(0,1),this.labelIsolatedEdges(1,0),this.updateIM(t),t},labelNodeEdges:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next();e.getEdges().computeLabelling(this.arg)}},copyNodesAndLabels:function(t){for(var e=this.arg[t].getNodeIterator();e.hasNext();){var n=e.next(),i=this.nodes.addNode(n.getCoordinate());i.setLabel(t,n.getLabel().getLocation(t))}},labelIntersectionNodes:function(t){for(var e=this.arg[t].getEdgeIterator();e.hasNext();)for(var n=e.next(),i=n.getLabel().getLocation(t),r=n.getEdgeIntersectionList().iterator();r.hasNext();){var s=r.next(),o=this.nodes.find(s.coord);o.getLabel().isNull(t)&&(i===L.BOUNDARY?o.setLabelBoundary(t):o.setLabel(t,L.INTERIOR))}},labelIsolatedNode:function(t,e){var n=this.ptLocator.locate(t.getCoordinate(),this.arg[e].getGeometry());t.getLabel().setAllLocations(e,n)},computeIntersectionNodes:function(t){for(var e=this.arg[t].getEdgeIterator();e.hasNext();)for(var n=e.next(),i=n.getLabel().getLocation(t),r=n.getEdgeIntersectionList().iterator();r.hasNext();){var s=r.next(),o=this.nodes.addNode(s.coord);i===L.BOUNDARY?o.setLabelBoundary(t):o.getLabel().isNull(t)&&o.setLabel(t,L.INTERIOR)}},labelIsolatedNodes:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next(),n=e.getLabel();f.isTrue(n.getGeometryCount()>0,"node with empty label found"),e.isIsolated()&&(n.isNull(0)?this.labelIsolatedNode(e,0):this.labelIsolatedNode(e,1))}},updateIM:function(t){for(var e=this.isolatedEdges.iterator();e.hasNext();){var n=e.next();n.updateIM(t)}for(var i=this.nodes.iterator();i.hasNext();){var r=i.next();r.updateIM(t),r.updateIMFromEdges(t)}},computeDisjointIM:function(t){var e=this.arg[0].getGeometry();e.isEmpty()||(t.set(L.INTERIOR,L.EXTERIOR,e.getDimension()),t.set(L.BOUNDARY,L.EXTERIOR,e.getBoundaryDimension()));var n=this.arg[1].getGeometry();n.isEmpty()||(t.set(L.EXTERIOR,L.INTERIOR,n.getDimension()),t.set(L.EXTERIOR,L.BOUNDARY,n.getBoundaryDimension()))},interfaces_:function(){return[]},getClass:function(){return Ar}}),e(Fr.prototype,{isContainedInBoundary:function(t){if(t instanceof Tt)return!1;if(t instanceof Lt)return this.isPointContainedInBoundary(t);if(t instanceof St)return this.isLineStringContainedInBoundary(t);for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);if(!this.isContainedInBoundary(n))return!1}return!0},isLineSegmentContainedInBoundary:function(t,e){if(t.equals(e))return this.isPointContainedInBoundary(t);if(t.x===e.x){if(t.x===this.rectEnv.getMinX()||t.x===this.rectEnv.getMaxX())return!0}else if(t.y===e.y&&(t.y===this.rectEnv.getMinY()||t.y===this.rectEnv.getMaxY()))return!0;return!1},isLineStringContainedInBoundary:function(t){for(var e=t.getCoordinateSequence(),n=new g,i=new g,r=0;r<e.size()-1;r++)if(e.getCoordinate(r,n),e.getCoordinate(r+1,i),!this.isLineSegmentContainedInBoundary(n,i))return!1;return!0},isPointContainedInBoundary:function(){if(arguments[0]instanceof Lt){var t=arguments[0];return this.isPointContainedInBoundary(t.getCoordinate())}if(arguments[0]instanceof g){var e=arguments[0];return e.x===this.rectEnv.getMinX()||e.x===this.rectEnv.getMaxX()||e.y===this.rectEnv.getMinY()||e.y===this.rectEnv.getMaxY()}},contains:function(t){return this.rectEnv.contains(t.getEnvelopeInternal())?!this.isContainedInBoundary(t):!1},interfaces_:function(){return[]},getClass:function(){return Fr}}),Fr.contains=function(t,e){var n=new Fr(t);return n.contains(e)},e(Gr.prototype,{intersects:function(t,e){var n=new C(t,e);if(!this.rectEnv.intersects(n))return!1;if(this.rectEnv.intersects(t))return!0;if(this.rectEnv.intersects(e))return!0;if(t.compareTo(e)>0){var i=t;t=e,e=i}var r=!1;return e.y>t.y&&(r=!0),r?this.li.computeIntersection(t,e,this.diagDown0,this.diagDown1):this.li.computeIntersection(t,e,this.diagUp0,this.diagUp1),!!this.li.hasIntersection()},interfaces_:function(){return[]},getClass:function(){return Gr}}),e(qr.prototype,{applyTo:function(t){for(var e=0;e<t.getNumGeometries()&&!this._isDone;e++){var n=t.getGeometryN(e);if(n instanceof ft)this.applyTo(n);else if(this.visit(n),this.isDone())return this._isDone=!0,null}},interfaces_:function(){return[]},getClass:function(){return qr}}),e(Br.prototype,{intersects:function(t){if(!this.rectEnv.intersects(t.getEnvelopeInternal()))return!1;var e=new zr(this.rectEnv);if(e.applyTo(t),e.intersects())return!0;var n=new Vr(this.rectangle);if(n.applyTo(t),n.containsPoint())return!0;var i=new kr(this.rectangle);return i.applyTo(t),!!i.intersects()},interfaces_:function(){return[]},getClass:function(){return Br}}),Br.intersects=function(t,e){var n=new Br(t);return n.intersects(e)},h(zr,qr),e(zr.prototype,{isDone:function(){return this._intersects===!0},visit:function(t){var e=t.getEnvelopeInternal();return this.rectEnv.intersects(e)?this.rectEnv.contains(e)?(this._intersects=!0,null):e.getMinX()>=this.rectEnv.getMinX()&&e.getMaxX()<=this.rectEnv.getMaxX()?(this._intersects=!0,null):e.getMinY()>=this.rectEnv.getMinY()&&e.getMaxY()<=this.rectEnv.getMaxY()?(this._intersects=!0,null):void 0:null},intersects:function(){return this._intersects},interfaces_:function(){return[]},getClass:function(){return zr}}),h(Vr,qr),e(Vr.prototype,{isDone:function(){return this._containsPoint===!0},visit:function(t){if(!(t instanceof Tt))return null;var e=t.getEnvelopeInternal();if(!this.rectEnv.intersects(e))return null;for(var n=new g,i=0;4>i;i++)if(this.rectSeq.getCoordinate(i,n),e.contains(n)&&Tn.containsPointInPolygon(n,t))return this._containsPoint=!0,null},containsPoint:function(){return this._containsPoint},interfaces_:function(){return[]},getClass:function(){return Vr}}),h(kr,qr),e(kr.prototype,{intersects:function(){return this.hasIntersection},isDone:function(){return this.hasIntersection===!0},visit:function(t){var e=t.getEnvelopeInternal();if(!this.rectEnv.intersects(e))return null;var n=kn.getLines(t);this.checkIntersectionWithLineStrings(n)},checkIntersectionWithLineStrings:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();if(this.checkIntersectionWithSegments(n),this.hasIntersection)return null}},checkIntersectionWithSegments:function(t){for(var e=t.getCoordinateSequence(),n=1;n<e.size();n++)if(e.getCoordinate(n-1,this.p0),e.getCoordinate(n,this.p1),this.rectIntersector.intersects(this.p0,this.p1))return this.hasIntersection=!0,null},interfaces_:function(){return[]},getClass:function(){return kr}}),h(Yr,ti),e(Yr.prototype,{getIntersectionMatrix:function(){return this._relate.computeIM()},interfaces_:function(){return[]},getClass:function(){return Yr}}),Yr.covers=function(t,e){return t.getEnvelopeInternal().covers(e.getEnvelopeInternal())?t.isRectangle()?!0:Yr.relate(t,e).isCovers():!1},Yr.intersects=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?t.isRectangle()?Br.intersects(t,e):e.isRectangle()?Br.intersects(e,t):Yr.relate(t,e).isIntersects():!1},Yr.touches=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?Yr.relate(t,e).isTouches(t.getDimension(),e.getDimension()):!1},Yr.within=function(t,e){return e.contains(t)},Yr.coveredBy=function(t,e){return Yr.covers(e,t)},Yr.relate=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new Yr(t,e),i=n.getIntersectionMatrix();return i}if(3===arguments.length){if("string"==typeof arguments[2]&&arguments[0]instanceof B&&arguments[1]instanceof B){var r=arguments[0],s=arguments[1],o=arguments[2];return Yr.relateWithCheck(r,s).matches(o)}if(R(arguments[2],V)&&arguments[0]instanceof B&&arguments[1]instanceof B){var a=arguments[0],u=arguments[1],l=arguments[2],n=new Yr(a,u,l),i=n.getIntersectionMatrix();return i}}},Yr.overlaps=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?Yr.relate(t,e).isOverlaps(t.getDimension(),e.getDimension()):!1},Yr.disjoint=function(t,e){return!t.intersects(e)},Yr.relateWithCheck=function(t,e){return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),Yr.relate(t,e)},Yr.crosses=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?Yr.relate(t,e).isCrosses(t.getDimension(),e.getDimension()):!1},Yr.contains=function(t,e){return t.getEnvelopeInternal().contains(e.getEnvelopeInternal())?t.isRectangle()?Fr.contains(t,e):Yr.relate(t,e).isContains():!1};var To=Object.freeze({RelateOp:Yr});e(Ur.prototype,{extractElements:function(t,e){if(null===t)return null;for(var n=0;n<t.getNumGeometries();n++){var i=t.getGeometryN(n);this.skipEmpty&&i.isEmpty()||e.add(i)}},combine:function(){for(var t=new I,e=this.inputGeoms.iterator();e.hasNext();){var n=e.next();this.extractElements(n,t)}return 0===t.size()?null!==this.geomFactory?this.geomFactory.createGeometryCollection(null):null:this.geomFactory.buildGeometry(t)},interfaces_:function(){return[]},getClass:function(){return Ur}}),Ur.combine=function(){if(1===arguments.length){var t=arguments[0],e=new Ur(t);return e.combine()}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=new Ur(Ur.createList(n,i));return e.combine()}if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],e=new Ur(Ur.createList(r,s,o));return e.combine()}},Ur.extractFactory=function(t){return t.isEmpty()?null:t.iterator().next().getFactory()},Ur.createList=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new I;return n.add(t),n.add(e),n}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],n=new I;return n.add(i),n.add(r),n.add(s),n}},e(Xr.prototype,{union:function(){for(var t=new Te,e=new at,n=0;n<this.pointGeom.getNumGeometries();n++){var i=this.pointGeom.getGeometryN(n),r=i.getCoordinate(),s=t.locate(r,this.otherGeom);s===L.EXTERIOR&&e.add(r)}if(0===e.size())return this.otherGeom;var o=null,a=H.toCoordinateArray(e);return o=1===a.length?this.geomFact.createPoint(a[0]):this.geomFact.createMultiPointFromCoords(a),Ur.combine(o,this.otherGeom)},interfaces_:function(){return[]},getClass:function(){return Xr}}),Xr.union=function(t,e){var n=new Xr(t,e);return n.union()},e(Hr.prototype,{filter:function(t){-1!==this.sortIndex&&t.getSortIndex()!==this.sortIndex||this.comps.add(t)},interfaces_:function(){return[ht]},getClass:function(){return Hr}}),Hr.extract=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return Hr.extract(t,e,new I)}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];return n.getSortIndex()===i?r.add(n):n instanceof ft&&n.apply(new Hr(i,r)),r}},e(Wr.prototype,{reduceToGeometries:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next(),r=null;R(i,y)?r=this.unionTree(i):i instanceof B&&(r=i),e.add(r)}return e},extractByEnvelope:function(t,e,n){for(var i=new I,r=0;r<e.getNumGeometries();r++){var s=e.getGeometryN(r);s.getEnvelopeInternal().intersects(t)?i.add(s):n.add(s)}return this.geomFactory.buildGeometry(i)},unionOptimized:function(t,e){var n=t.getEnvelopeInternal(),i=e.getEnvelopeInternal();if(!n.intersects(i)){var r=Ur.combine(t,e);return r}if(t.getNumGeometries()<=1&&e.getNumGeometries()<=1)return this.unionActual(t,e);var s=n.intersection(i);return this.unionUsingEnvelopeIntersection(t,e,s)},union:function(){if(null===this.inputPolys)throw new IllegalStateException("union() method cannot be called twice");if(this.inputPolys.isEmpty())return null;this.geomFactory=this.inputPolys.iterator().next().getFactory();for(var t=new ke(Wr.STRTREE_NODE_CAPACITY),e=this.inputPolys.iterator();e.hasNext();){var n=e.next();t.insert(n.getEnvelopeInternal(),n)}this.inputPolys=null;var i=t.itemsTree(),r=this.unionTree(i);return r},binaryUnion:function(){if(1===arguments.length){var t=arguments[0];return this.binaryUnion(t,0,t.size())}if(3===arguments.length){var e=arguments[0],n=arguments[1],i=arguments[2];if(1>=i-n){var r=Wr.getGeometry(e,n);return this.unionSafe(r,null)}if(i-n===2)return this.unionSafe(Wr.getGeometry(e,n),Wr.getGeometry(e,n+1));var s=Math.trunc((i+n)/2),r=this.binaryUnion(e,n,s),o=this.binaryUnion(e,s,i);return this.unionSafe(r,o)}},repeatedUnion:function(t){for(var e=null,n=t.iterator();n.hasNext();){var i=n.next();e=null===e?i.copy():e.union(i)}return e},unionSafe:function(t,e){return null===t&&null===e?null:null===t?e.copy():null===e?t.copy():this.unionOptimized(t,e)},unionActual:function(t,e){return Wr.restrictToPolygons(t.union(e))},unionTree:function(t){var e=this.reduceToGeometries(t),n=this.binaryUnion(e);return n},unionUsingEnvelopeIntersection:function(t,e,n){var i=new I,r=this.extractByEnvelope(n,t,i),s=this.extractByEnvelope(n,e,i),o=this.unionActual(r,s);i.add(o);var a=Ur.combine(i);return a},bufferUnion:function(){if(1===arguments.length){var t=arguments[0],e=t.get(0).getFactory(),n=e.buildGeometry(t),i=n.buffer(0);return i}if(2===arguments.length){var r=arguments[0],s=arguments[1],e=r.getFactory(),n=e.createGeometryCollection([r,s]),i=n.buffer(0);return i}},interfaces_:function(){return[]},getClass:function(){return Wr}}),Wr.restrictToPolygons=function(t){if(R(t,Rt))return t;var e=or.getPolygons(t);return 1===e.size()?e.get(0):t.getFactory().createMultiPolygon(ie.toPolygonArray(e))},Wr.getGeometry=function(t,e){return e>=t.size()?null:t.get(e)},Wr.union=function(t){var e=new Wr(t);return e.union()},Wr.STRTREE_NODE_CAPACITY=4,e(jr.prototype,{unionNoOpt:function(t){var e=this.geomFact.createPoint();return si.overlayOp(t,e,ii.UNION)},unionWithNull:function(t,e){return null===t&&null===e?null:null===e?t:null===t?e:t.union(e)},extract:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.extract(n)}else if(arguments[0]instanceof B){var i=arguments[0];null===this.geomFact&&(this.geomFact=i.getFactory()),Hr.extract(i,B.SORTINDEX_POLYGON,this.polygons),Hr.extract(i,B.SORTINDEX_LINESTRING,this.lines),Hr.extract(i,B.SORTINDEX_POINT,this.points)}},union:function t(){if(null===this.geomFact)return null;var e=null;if(this.points.size()>0){var n=this.geomFact.buildGeometry(this.points);e=this.unionNoOpt(n)}var i=null;if(this.lines.size()>0){var r=this.geomFact.buildGeometry(this.lines);i=this.unionNoOpt(r)}var s=null;this.polygons.size()>0&&(s=Wr.union(this.polygons));var o=this.unionWithNull(i,s),t=null;return t=null===e?o:null===o?e:Xr.union(e,o),null===t?this.geomFact.createGeometryCollection():t},interfaces_:function(){return[]},getClass:function(){return jr}}),jr.union=function(){if(1===arguments.length){if(R(arguments[0],v)){var t=arguments[0],e=new jr(t);return e.union()}if(arguments[0]instanceof B){var n=arguments[0],e=new jr(n);return e.union()}}else if(2===arguments.length){var i=arguments[0],r=arguments[1],e=new jr(i,r);return e.union()}};var Po=Object.freeze({UnaryUnionOp:jr});e(Kr.prototype,{visitInteriorRing:function(t,e){var n=t.getCoordinates(),i=n[0],r=Kr.findDifferentPoint(n,i),s=e.findEdgeInSameDirection(i,r),o=e.findEdgeEnd(s),a=null;o.getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR?a=o:o.getSym().getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR&&(a=o.getSym()),f.isTrue(null!==a,"unable to find dirEdge with Interior on RHS"),this.visitLinkedDirectedEdges(a)},visitShellInteriors:function(t,e){if(t instanceof Tt){var n=t;this.visitInteriorRing(n.getExteriorRing(),e)}if(t instanceof Ot)for(var i=t,r=0;r<i.getNumGeometries();r++){var n=i.getGeometryN(r);this.visitInteriorRing(n.getExteriorRing(),e)}},getCoordinate:function(){return this.disconnectedRingcoord},setInteriorEdgesInResult:function(t){for(var e=t.getEdgeEnds().iterator();e.hasNext();){var n=e.next();n.getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR&&n.setInResult(!0)}},visitLinkedDirectedEdges:function(t){var e=t,n=t;do f.isTrue(null!==n,"found null Directed Edge"),n.setVisited(!0),n=n.getNext();while(n!==e)},buildEdgeRings:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();if(i.isInResult()&&null===i.getEdgeRing()){var r=new vn(i,this.geometryFactory);r.linkDirectedEdgesForMinimalEdgeRings();var s=r.buildMinimalRings();e.addAll(s)}}return e},hasUnvisitedShellEdge:function(t){for(var e=0;e<t.size();e++){var n=t.get(e);if(!n.isHole()){var i=n.getEdges(),r=i.get(0);if(r.getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR)for(var s=0;s<i.size();s++)if(r=i.get(s),
!r.isVisited())return this.disconnectedRingcoord=r.getCoordinate(),!0}}return!1},isInteriorsConnected:function(){var t=new I;this.geomGraph.computeSplitEdges(t);var e=new Cn(new On);e.addEdges(t),this.setInteriorEdgesInResult(e),e.linkResultDirectedEdges();var n=this.buildEdgeRings(e.getEdgeEnds());return this.visitShellInteriors(this.geomGraph.getGeometry(),e),!this.hasUnvisitedShellEdge(n)},interfaces_:function(){return[]},getClass:function(){return Kr}}),Kr.findDifferentPoint=function(t,e){for(var n=0;n<t.length;n++)if(!t[n].equals(e))return t[n];return null},e(Zr.prototype,{hasChildren:function(){for(var t=0;2>t;t++)if(null!==this.subnode[t])return!0;return!1},isPrunable:function(){return!(this.hasChildren()||this.hasItems())},addAllItems:function(t){t.addAll(this.items);for(var e=0;2>e;e++)null!==this.subnode[e]&&this.subnode[e].addAllItems(t);return t},size:function(){for(var t=0,e=0;2>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].size());return t+this.items.size()},addAllItemsFromOverlapping:function(t,e){return null===t||this.isSearchMatch(t)?(e.addAll(this.items),null!==this.subnode[0]&&this.subnode[0].addAllItemsFromOverlapping(t,e),void(null!==this.subnode[1]&&this.subnode[1].addAllItemsFromOverlapping(t,e))):null},hasItems:function(){return!this.items.isEmpty()},remove:function(t,e){if(!this.isSearchMatch(t))return!1;for(var n=!1,i=0;2>i;i++)if(null!==this.subnode[i]&&(n=this.subnode[i].remove(t,e))){this.subnode[i].isPrunable()&&(this.subnode[i]=null);break}return n?n:n=this.items.remove(e)},getItems:function(){return this.items},depth:function(){for(var t=0,e=0;2>e;e++)if(null!==this.subnode[e]){var n=this.subnode[e].depth();n>t&&(t=n)}return t+1},nodeSize:function(){for(var t=0,e=0;2>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].nodeSize());return t+1},add:function(t){this.items.add(t)},interfaces_:function(){return[]},getClass:function(){return Zr}}),Zr.getSubnodeIndex=function(t,e){var n=-1;return t.min>=e&&(n=1),t.max<=e&&(n=0),n},e(Qr.prototype,{expandToInclude:function(t){t.max>this.max&&(this.max=t.max),t.min<this.min&&(this.min=t.min)},getWidth:function(){return this.max-this.min},overlaps:function(){if(1===arguments.length){var t=arguments[0];return this.overlaps(t.min,t.max)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return!(this.min>n||this.max<e)}},getMin:function(){return this.min},toString:function(){return"["+this.min+", "+this.max+"]"},contains:function(){if(1===arguments.length){if(arguments[0]instanceof Qr){var t=arguments[0];return this.contains(t.min,t.max)}if("number"==typeof arguments[0]){var e=arguments[0];return e>=this.min&&e<=this.max}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return n>=this.min&&i<=this.max}},init:function(t,e){this.min=t,this.max=e,t>e&&(this.min=e,this.max=t)},getMax:function(){return this.max},interfaces_:function(){return[]},getClass:function(){return Qr}}),e(Jr.prototype,{getInterval:function(){return this.interval},getLevel:function(){return this.level},computeKey:function(t){for(this.level=Jr.computeLevel(t),this.interval=new Qr,this.computeInterval(this.level,t);!this.interval.contains(t);)this.level+=1,this.computeInterval(this.level,t)},computeInterval:function(t,e){var n=Ci.powerOf2(t);this.pt=Math.floor(e.getMin()/n)*n,this.interval.init(this.pt,this.pt+n)},getPoint:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return Jr}}),Jr.computeLevel=function(t){var e=t.getWidth(),n=Ci.exponent(e)+1;return n},h($r,Zr),e($r.prototype,{getInterval:function(){return this.interval},find:function(t){var e=Zr.getSubnodeIndex(t,this.centre);if(-1===e)return this;if(null!==this.subnode[e]){var n=this.subnode[e];return n.find(t)}return this},insert:function(t){f.isTrue(null===this.interval||this.interval.contains(t.interval));var e=Zr.getSubnodeIndex(t.interval,this.centre);if(t.level===this.level-1)this.subnode[e]=t;else{var n=this.createSubnode(e);n.insert(t),this.subnode[e]=n}},isSearchMatch:function(t){return t.overlaps(this.interval)},getSubnode:function(t){return null===this.subnode[t]&&(this.subnode[t]=this.createSubnode(t)),this.subnode[t]},getNode:function(t){var e=Zr.getSubnodeIndex(t,this.centre);if(-1!==e){var n=this.getSubnode(e);return n.getNode(t)}return this},createSubnode:function(t){var e=0,n=0;switch(t){case 0:e=this.interval.getMin(),n=this.centre;break;case 1:e=this.centre,n=this.interval.getMax()}var i=new Qr(e,n),r=new $r(i,this.level-1);return r},interfaces_:function(){return[]},getClass:function(){return $r}}),$r.createNode=function(t){var e=new Jr(t),n=new $r(e.getInterval(),e.getLevel());return n},$r.createExpanded=function(t,e){var n=new Qr(e);null!==t&&n.expandToInclude(t.interval);var i=$r.createNode(n);return null!==t&&i.insert(t),i},h(ts,Zr),e(ts.prototype,{insert:function(t,e){var n=Zr.getSubnodeIndex(t,ts.origin);if(-1===n)return this.add(e),null;var i=this.subnode[n];if(null===i||!i.getInterval().contains(t)){var r=$r.createExpanded(i,t);this.subnode[n]=r}this.insertContained(this.subnode[n],t,e)},isSearchMatch:function(t){return!0},insertContained:function(t,e,n){f.isTrue(t.getInterval().contains(e));var i=Ri.isZeroWidth(e.getMin(),e.getMax()),r=null;r=i?t.find(e):t.getNode(e),r.add(n)},interfaces_:function(){return[]},getClass:function(){return ts}}),ts.origin=0,e(es.prototype,{size:function(){return null!==this.root?this.root.size():0},insert:function(t,e){this.collectStats(t);var n=es.ensureExtent(t,this.minExtent);this.root.insert(n,e)},query:function(){if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];return this.query(new Qr(t,t))}if(arguments[0]instanceof Qr){var e=arguments[0],n=new I;return this.query(e,n),n}}else if(2===arguments.length){var i=arguments[0],r=arguments[1];this.root.addAllItemsFromOverlapping(i,r)}},iterator:function(){var t=new I;return this.root.addAllItems(t),t.iterator()},remove:function(t,e){var n=es.ensureExtent(t,this.minExtent);return this.root.remove(n,e)},collectStats:function(t){var e=t.getWidth();e<this.minExtent&&e>0&&(this.minExtent=e)},depth:function(){return null!==this.root?this.root.depth():0},nodeSize:function(){return null!==this.root?this.root.nodeSize():0},interfaces_:function(){return[]},getClass:function(){return es}}),es.ensureExtent=function(t,e){var n=t.getMin(),i=t.getMax();return n!==i?t:(n===i&&(n-=e/2,i=n+e/2),new Qr(n,i))},e(ns.prototype,{isInside:function(t){},interfaces_:function(){return[]},getClass:function(){return ns}}),e(is.prototype,{testLineSegment:function(t,e){var n=null,i=null,r=null,s=null,o=null,a=e.p0,u=e.p1;i=a.x-t.x,r=a.y-t.y,s=u.x-t.x,o=u.y-t.y,(r>0&&0>=o||o>0&&0>=r)&&(n=ue.signOfDet2x2(i,r,s,o)/(o-r),n>0&&this.crossings++)},buildIndex:function(){this.tree=new es;for(var t=H.removeRepeatedPoints(this.ring.getCoordinates()),e=$e.getChains(t),n=0;n<e.size();n++){var i=e.get(n),r=i.getEnvelope();this.interval.min=r.getMinY(),this.interval.max=r.getMaxY(),this.tree.insert(this.interval,i)}},testMonotoneChain:function(t,e,n){n.select(t,e)},isInside:function(t){this.crossings=0;var e=new C(r.NEGATIVE_INFINITY,r.POSITIVE_INFINITY,t.y,t.y);this.interval.min=t.y,this.interval.max=t.y;for(var n=this.tree.query(this.interval),i=new rs(this,t),s=n.iterator();s.hasNext();){var o=s.next();this.testMonotoneChain(e,i,o)}return this.crossings%2===1},interfaces_:function(){return[ns]},getClass:function(){return is}}),h(rs,tr),e(rs.prototype,{select:function(){if(1!==arguments.length)return tr.prototype.select.apply(this,arguments);var t=arguments[0];this.mcp.testLineSegment(this.p,t)},interfaces_:function(){return[]},getClass:function(){return rs}}),is.MCSelecter=rs,e(ss.prototype,{insertEdgeEnds:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.nodes.add(n)}},getNodeIterator:function(){return this.nodes.iterator()},copyNodesAndLabels:function(t,e){for(var n=t.getNodeIterator();n.hasNext();){var i=n.next(),r=this.nodes.addNode(i.getCoordinate());r.setLabel(e,i.getLabel().getLocation(e))}},build:function(t){this.computeIntersectionNodes(t,0),this.copyNodesAndLabels(t,0);var e=new br,n=e.computeEdgeEnds(t.getEdgeIterator());this.insertEdgeEnds(n)},computeIntersectionNodes:function(t,e){for(var n=t.getEdgeIterator();n.hasNext();)for(var i=n.next(),r=i.getLabel().getLocation(e),s=i.getEdgeIntersectionList().iterator();s.hasNext();){var o=s.next(),a=this.nodes.addNode(o.coord);r===L.BOUNDARY?a.setLabelBoundary(e):a.getLabel().isNull(e)&&a.setLabel(e,L.INTERIOR)}},interfaces_:function(){return[]},getClass:function(){return ss}}),e(os.prototype,{isNodeEdgeAreaLabelsConsistent:function(){for(var t=this.nodeGraph.getNodeIterator();t.hasNext();){var e=t.next();if(!e.getEdges().isAreaLabelsConsistent(this.geomGraph))return this.invalidPoint=e.getCoordinate().copy(),!1}return!0},getInvalidPoint:function(){return this.invalidPoint},hasDuplicateRings:function(){for(var t=this.nodeGraph.getNodeIterator();t.hasNext();)for(var e=t.next(),n=e.getEdges().iterator();n.hasNext();){var i=n.next();if(i.getEdgeEnds().size()>1)return this.invalidPoint=i.getEdge().getCoordinate(0),!0}return!1},isNodeConsistentArea:function(){var t=this.geomGraph.computeSelfNodes(this.li,!0,!0);return t.hasProperIntersection()?(this.invalidPoint=t.getProperIntersectionPoint(),!1):(this.nodeGraph.build(this.geomGraph),this.isNodeEdgeAreaLabelsConsistent())},interfaces_:function(){return[]},getClass:function(){return os}}),e(as.prototype,{buildIndex:function(){this.index=new ke;for(var t=0;t<this.rings.size();t++){var e=this.rings.get(t),n=e.getEnvelopeInternal();this.index.insert(n,e)}},getNestedPoint:function(){return this.nestedPt},isNonNested:function(){this.buildIndex();for(var t=0;t<this.rings.size();t++)for(var e=this.rings.get(t),n=e.getCoordinates(),i=this.index.query(e.getEnvelopeInternal()),r=0;r<i.size();r++){var s=i.get(r),o=s.getCoordinates();if(e!==s&&e.getEnvelopeInternal().intersects(s.getEnvelopeInternal())){var a=ls.findPtNotNode(n,s,this.graph);if(null!==a){var u=he.isPointInRing(a,o);if(u)return this.nestedPt=a,!1}}}return!0},add:function(t){this.rings.add(t),this.totalEnv.expandToInclude(t.getEnvelopeInternal())},interfaces_:function(){return[]},getClass:function(){return as}}),e(us.prototype,{getErrorType:function(){return this.errorType},getMessage:function(){return us.errMsg[this.errorType]},getCoordinate:function(){return this.pt},toString:function(){var t="";return null!==this.pt&&(t=" at or near point "+this.pt),this.getMessage()+t},interfaces_:function(){return[]},getClass:function(){return us}}),us.ERROR=0,us.REPEATED_POINT=1,us.HOLE_OUTSIDE_SHELL=2,us.NESTED_HOLES=3,us.DISCONNECTED_INTERIOR=4,us.SELF_INTERSECTION=5,us.RING_SELF_INTERSECTION=6,us.NESTED_SHELLS=7,us.DUPLICATE_RINGS=8,us.TOO_FEW_POINTS=9,us.INVALID_COORDINATE=10,us.RING_NOT_CLOSED=11,us.errMsg=["Topology Validation Error","Repeated Point","Hole lies outside shell","Holes are nested","Interior is disconnected","Self-intersection","Ring Self-intersection","Nested shells","Duplicate Rings","Too few distinct points in geometry component","Invalid Coordinate","Ring is not closed"],e(ls.prototype,{checkInvalidCoordinates:function(){if(arguments[0]instanceof Array){for(var t=arguments[0],e=0;e<t.length;e++)if(!ls.isValid(t[e]))return this.validErr=new us(us.INVALID_COORDINATE,t[e]),null}else if(arguments[0]instanceof Tt){var n=arguments[0];if(this.checkInvalidCoordinates(n.getExteriorRing().getCoordinates()),null!==this.validErr)return null;for(var e=0;e<n.getNumInteriorRing();e++)if(this.checkInvalidCoordinates(n.getInteriorRingN(e).getCoordinates()),null!==this.validErr)return null}},checkHolesNotNested:function(t,e){for(var n=new as(e),i=0;i<t.getNumInteriorRing();i++){var r=t.getInteriorRingN(i);n.add(r)}var s=n.isNonNested();s||(this.validErr=new us(us.NESTED_HOLES,n.getNestedPoint()))},checkConsistentArea:function(t){var e=new os(t),n=e.isNodeConsistentArea();return n?void(e.hasDuplicateRings()&&(this.validErr=new us(us.DUPLICATE_RINGS,e.getInvalidPoint()))):(this.validErr=new us(us.SELF_INTERSECTION,e.getInvalidPoint()),null)},isValid:function(){return this.checkValid(this.parentGeometry),null===this.validErr},checkShellInsideHole:function(t,e,n){var i=t.getCoordinates(),r=e.getCoordinates(),s=ls.findPtNotNode(i,e,n);if(null!==s){var o=he.isPointInRing(s,r);if(!o)return s}var a=ls.findPtNotNode(r,t,n);if(null!==a){var u=he.isPointInRing(a,i);return u?a:null}return f.shouldNeverReachHere("points in shell and hole appear to be equal"),null},checkNoSelfIntersectingRings:function(t){for(var e=t.getEdgeIterator();e.hasNext();){var n=e.next();if(this.checkNoSelfIntersectingRing(n.getEdgeIntersectionList()),null!==this.validErr)return null}},checkConnectedInteriors:function(t){var e=new Kr(t);e.isInteriorsConnected()||(this.validErr=new us(us.DISCONNECTED_INTERIOR,e.getCoordinate()))},checkNoSelfIntersectingRing:function(t){for(var e=new at,n=!0,i=t.iterator();i.hasNext();){var r=i.next();if(n)n=!1;else{if(e.contains(r.coord))return this.validErr=new us(us.RING_SELF_INTERSECTION,r.coord),null;e.add(r.coord)}}},checkHolesInShell:function(t,e){for(var n=t.getExteriorRing(),i=new is(n),r=0;r<t.getNumInteriorRing();r++){var s=t.getInteriorRingN(r),o=ls.findPtNotNode(s.getCoordinates(),n,e);if(null===o)return null;var a=!i.isInside(o);if(a)return this.validErr=new us(us.HOLE_OUTSIDE_SHELL,o),null}},checkTooFewPoints:function(t){return t.hasTooFewPoints()?(this.validErr=new us(us.TOO_FEW_POINTS,t.getInvalidPoint()),null):void 0},getValidationError:function(){return this.checkValid(this.parentGeometry),this.validErr},checkValid:function(){if(arguments[0]instanceof Lt){var t=arguments[0];this.checkInvalidCoordinates(t.getCoordinates())}else if(arguments[0]instanceof Pt){var e=arguments[0];this.checkInvalidCoordinates(e.getCoordinates())}else if(arguments[0]instanceof bt){var n=arguments[0];if(this.checkInvalidCoordinates(n.getCoordinates()),null!==this.validErr)return null;if(this.checkClosedRing(n),null!==this.validErr)return null;var i=new $n(0,n);if(this.checkTooFewPoints(i),null!==this.validErr)return null;var r=new ae;i.computeSelfNodes(r,!0,!0),this.checkNoSelfIntersectingRings(i)}else if(arguments[0]instanceof St){var s=arguments[0];if(this.checkInvalidCoordinates(s.getCoordinates()),null!==this.validErr)return null;var i=new $n(0,s);this.checkTooFewPoints(i)}else if(arguments[0]instanceof Tt){var o=arguments[0];if(this.checkInvalidCoordinates(o),null!==this.validErr)return null;if(this.checkClosedRings(o),null!==this.validErr)return null;var i=new $n(0,o);if(this.checkTooFewPoints(i),null!==this.validErr)return null;if(this.checkConsistentArea(i),null!==this.validErr)return null;if(!this.isSelfTouchingRingFormingHoleValid&&(this.checkNoSelfIntersectingRings(i),null!==this.validErr))return null;if(this.checkHolesInShell(o,i),null!==this.validErr)return null;if(this.checkHolesNotNested(o,i),null!==this.validErr)return null;this.checkConnectedInteriors(i)}else if(arguments[0]instanceof Ot){for(var a=arguments[0],u=0;u<a.getNumGeometries();u++){var l=a.getGeometryN(u);if(this.checkInvalidCoordinates(l),null!==this.validErr)return null;if(this.checkClosedRings(l),null!==this.validErr)return null}var i=new $n(0,a);if(this.checkTooFewPoints(i),null!==this.validErr)return null;if(this.checkConsistentArea(i),null!==this.validErr)return null;if(!this.isSelfTouchingRingFormingHoleValid&&(this.checkNoSelfIntersectingRings(i),null!==this.validErr))return null;for(var u=0;u<a.getNumGeometries();u++){var l=a.getGeometryN(u);if(this.checkHolesInShell(l,i),null!==this.validErr)return null}for(var u=0;u<a.getNumGeometries();u++){var l=a.getGeometryN(u);if(this.checkHolesNotNested(l,i),null!==this.validErr)return null}if(this.checkShellsNotNested(a,i),null!==this.validErr)return null;this.checkConnectedInteriors(i)}else if(arguments[0]instanceof ft)for(var h=arguments[0],u=0;u<h.getNumGeometries();u++){var c=h.getGeometryN(u);if(this.checkValid(c),null!==this.validErr)return null}else if(arguments[0]instanceof B){var f=arguments[0];if(this.validErr=null,f.isEmpty())return null;if(f instanceof Lt)this.checkValid(f);else if(f instanceof Pt)this.checkValid(f);else if(f instanceof bt)this.checkValid(f);else if(f instanceof St)this.checkValid(f);else if(f instanceof Tt)this.checkValid(f);else if(f instanceof Ot)this.checkValid(f);else{if(!(f instanceof ft))throw new UnsupportedOperationException(f.getClass().getName());this.checkValid(f)}}},setSelfTouchingRingFormingHoleValid:function(t){this.isSelfTouchingRingFormingHoleValid=t},checkShellNotNested:function(t,e,n){var i=t.getCoordinates(),r=e.getExteriorRing(),s=r.getCoordinates(),o=ls.findPtNotNode(i,r,n);if(null===o)return null;var a=he.isPointInRing(o,s);if(!a)return null;if(e.getNumInteriorRing()<=0)return this.validErr=new us(us.NESTED_SHELLS,o),null;for(var u=null,l=0;l<e.getNumInteriorRing();l++){var h=e.getInteriorRingN(l);if(u=this.checkShellInsideHole(t,h,n),null===u)return null}this.validErr=new us(us.NESTED_SHELLS,u)},checkClosedRings:function(t){if(this.checkClosedRing(t.getExteriorRing()),null!==this.validErr)return null;for(var e=0;e<t.getNumInteriorRing();e++)if(this.checkClosedRing(t.getInteriorRingN(e)),null!==this.validErr)return null},checkClosedRing:function(t){if(!t.isClosed()){var e=null;t.getNumPoints()>=1&&(e=t.getCoordinateN(0)),this.validErr=new us(us.RING_NOT_CLOSED,e)}},checkShellsNotNested:function(t,e){for(var n=0;n<t.getNumGeometries();n++)for(var i=t.getGeometryN(n),r=i.getExteriorRing(),s=0;s<t.getNumGeometries();s++)if(n!==s){var o=t.getGeometryN(s);if(this.checkShellNotNested(r,o,e),null!==this.validErr)return null}},interfaces_:function(){return[]},getClass:function(){return ls}}),ls.findPtNotNode=function(t,e,n){for(var i=n.findEdge(e),r=i.getEdgeIntersectionList(),s=0;s<t.length;s++){var o=t[s];if(!r.isIntersection(o))return o}return null},ls.isValid=function(){if(arguments[0]instanceof B){var t=arguments[0],e=new ls(t);return e.isValid()}if(arguments[0]instanceof g){var n=arguments[0];return r.isNaN(n.x)?!1:r.isInfinite(n.x)?!1:r.isNaN(n.y)?!1:!r.isInfinite(n.y)}};var bo=Object.freeze({IsValidOp:ls}),Oo=Object.freeze({BoundaryOp:dt,IsSimpleOp:Gi,buffer:Co,distance:So,linemerge:wo,overlay:Lo,polygonize:Ro,relate:To,union:Po,valid:bo});h(hs,_t.CoordinateOperation),e(hs.prototype,{editCoordinates:function(t,e){if(0===t.length)return null;for(var n=new Array(t.length).fill(null),i=0;i<t.length;i++){var r=new g(t[i]);this.targetPM.makePrecise(r),n[i]=r}var s=new N(n,!1),o=s.toCoordinateArray(),a=0;e instanceof St&&(a=2),e instanceof bt&&(a=4);var u=n;return this.removeCollapsed&&(u=null),o.length<a?u:o},interfaces_:function(){return[]},getClass:function(){return hs}}),e(cs.prototype,{fixPolygonalTopology:function(t){var e=t;this.changePrecisionModel||(e=this.changePM(t,this.targetPM));var n=e.buffer(0),i=n;return this.changePrecisionModel||(i=t.getFactory().createGeometry(n)),i},reducePointwise:function(t){var e=null;if(this.changePrecisionModel){var n=this.createFactory(t.getFactory(),this.targetPM);e=new _t(n)}else e=new _t;var i=this.removeCollapsed;t.getDimension()>=2&&(i=!0);var r=e.edit(t,new hs(this.targetPM,i));return r},changePM:function(t,e){var n=this.createEditor(t.getFactory(),e);return n.edit(t,new _t.NoOpGeometryOperation)},setRemoveCollapsedComponents:function(t){this.removeCollapsed=t},createFactory:function(t,e){var n=new ie(e,t.getSRID(),t.getCoordinateSequenceFactory());return n},setChangePrecisionModel:function(t){this.changePrecisionModel=t},reduce:function(t){var e=this.reducePointwise(t);return this.isPointwise?e:R(e,Rt)?e.isValid()?e:this.fixPolygonalTopology(e):e},setPointwise:function(t){this.isPointwise=t},createEditor:function(t,e){if(t.getPrecisionModel()===e)return new _t;var n=this.createFactory(t,e),i=new _t(n);return i},interfaces_:function(){return[]},getClass:function(){return cs}}),cs.reduce=function(t,e){var n=new cs(e);return n.reduce(t)},cs.reducePointwise=function(t,e){var n=new cs(e);return n.setPointwise(!0),n.reduce(t)};var _o=Object.freeze({GeometryPrecisionReducer:cs});e(fs.prototype,{simplifySection:function(t,e){if(t+1===e)return null;this.seg.p0=this.pts[t],this.seg.p1=this.pts[e];for(var n=-1,i=t,r=t+1;e>r;r++){var s=this.seg.distance(this.pts[r]);s>n&&(n=s,i=r)}if(n<=this.distanceTolerance)for(var r=t+1;e>r;r++)this.usePt[r]=!1;else this.simplifySection(t,i),this.simplifySection(i,e)},setDistanceTolerance:function(t){this.distanceTolerance=t},simplify:function(){this.usePt=new Array(this.pts.length).fill(null);for(var t=0;t<this.pts.length;t++)this.usePt[t]=!0;this.simplifySection(0,this.pts.length-1);for(var e=new N,t=0;t<this.pts.length;t++)this.usePt[t]&&e.add(new g(this.pts[t]));return e.toCoordinateArray()},interfaces_:function(){return[]},getClass:function(){return fs}}),fs.simplify=function(t,e){var n=new fs(t);return n.setDistanceTolerance(e),n.simplify()},e(gs.prototype,{setEnsureValid:function(t){this.isEnsureValidTopology=t},getResultGeometry:function(){return this.inputGeom.isEmpty()?this.inputGeom.copy():new ds(this.isEnsureValidTopology,this.distanceTolerance).transform(this.inputGeom)},setDistanceTolerance:function(t){if(0>t)throw new i("Tolerance must be non-negative");this.distanceTolerance=t},interfaces_:function(){return[]},getClass:function(){return gs}}),gs.simplify=function(t,e){var n=new gs(t);return n.setDistanceTolerance(e),n.getResultGeometry()},h(ds,xe),e(ds.prototype,{transformPolygon:function(t,e){if(t.isEmpty())return null;var n=xe.prototype.transformPolygon.call(this,t,e);return e instanceof Ot?n:this.createValidArea(n)},createValidArea:function(t){return this.isEnsureValidTopology?t.buffer(0):t},transformCoordinates:function(t,e){var n=t.toCoordinateArray(),i=null;return i=0===n.length?new Array(0).fill(null):fs.simplify(n,this.distanceTolerance),this.factory.getCoordinateSequenceFactory().create(i)},transformMultiPolygon:function(t,e){var n=xe.prototype.transformMultiPolygon.call(this,t,e);return this.createValidArea(n)},transformLinearRing:function(t,e){var n=e instanceof Tt,i=xe.prototype.transformLinearRing.call(this,t,e);return!n||i instanceof bt?i:null},interfaces_:function(){return[]},getClass:function(){return ds}}),gs.DPTransformer=ds,h(ps,ce),e(ps.prototype,{getIndex:function(){return this.index},getParent:function(){return this.parent},interfaces_:function(){return[]},getClass:function(){return ps}}),e(vs.prototype,{addToResult:function(t){this.resultSegs.add(t)},asLineString:function(){return this.parentLine.getFactory().createLineString(vs.extractCoordinates(this.resultSegs))},getResultSize:function(){var t=this.resultSegs.size();return 0===t?0:t+1},getParent:function(){return this.parentLine},getSegment:function(t){return this.segs[t]},getParentCoordinates:function(){return this.parentLine.getCoordinates()},getMinimumSize:function(){return this.minimumSize},asLinearRing:function(){return this.parentLine.getFactory().createLinearRing(vs.extractCoordinates(this.resultSegs))},getSegments:function(){return this.segs},init:function(){var t=this.parentLine.getCoordinates();this.segs=new Array(t.length-1).fill(null);for(var e=0;e<t.length-1;e++){var n=new ps(t[e],t[e+1],this.parentLine,e);this.segs[e]=n}},getResultCoordinates:function(){return vs.extractCoordinates(this.resultSegs)},interfaces_:function(){return[]},getClass:function(){return vs}}),vs.extractCoordinates=function(t){for(var e=new Array(t.size()+1).fill(null),n=null,i=0;i<t.size();i++)n=t.get(i),e[i]=n.p0;return e[e.length-1]=n.p1,e},e(ms.prototype,{remove:function(t){this.index.remove(new C(t.p0,t.p1),t)},add:function(){if(arguments[0]instanceof vs)for(var t=arguments[0],e=t.getSegments(),n=0;n<e.length;n++){var i=e[n];this.add(i)}else if(arguments[0]instanceof ce){var r=arguments[0];this.index.insert(new C(r.p0,r.p1),r)}},query:function(t){var e=new C(t.p0,t.p1),n=new ys(t);this.index.query(e,n);var i=n.getItems();return i},interfaces_:function(){return[]},getClass:function(){return ms}}),e(ys.prototype,{visitItem:function(t){var e=t;C.intersects(e.p0,e.p1,this.querySeg.p0,this.querySeg.p1)&&this.items.add(t)},getItems:function(){return this.items},interfaces_:function(){return[Ae]},getClass:function(){return ys}}),e(xs.prototype,{flatten:function(t,e){var n=this.linePts[t],i=this.linePts[e],r=new ce(n,i);return this.remove(this.line,t,e),this.outputIndex.add(r),r},hasBadIntersection:function(t,e,n){return this.hasBadOutputIntersection(n)?!0:!!this.hasBadInputIntersection(t,e,n)},setDistanceTolerance:function(t){this.distanceTolerance=t},simplifySection:function(t,e,n){n+=1;var i=new Array(2).fill(null);if(t+1===e){var r=this.line.getSegment(t);return this.line.addToResult(r),null}var s=!0;if(this.line.getResultSize()<this.line.getMinimumSize()){var o=n+1;o<this.line.getMinimumSize()&&(s=!1)}var a=new Array(1).fill(null),u=this.findFurthestPoint(this.linePts,t,e,a);a[0]>this.distanceTolerance&&(s=!1);var l=new ce;if(l.p0=this.linePts[t],l.p1=this.linePts[e],i[0]=t,i[1]=e,this.hasBadIntersection(this.line,i,l)&&(s=!1),s){var r=this.flatten(t,e);return this.line.addToResult(r),null}this.simplifySection(t,u,n),this.simplifySection(u,e,n)},hasBadOutputIntersection:function(t){for(var e=this.outputIndex.query(t),n=e.iterator();n.hasNext();){var i=n.next();if(this.hasInteriorIntersection(i,t))return!0}return!1},findFurthestPoint:function(t,e,n,i){var r=new ce;r.p0=t[e],r.p1=t[n];for(var s=-1,o=e,a=e+1;n>a;a++){var u=t[a],l=r.distance(u);l>s&&(s=l,o=a)}return i[0]=s,o},simplify:function(t){this.line=t,this.linePts=t.getParentCoordinates(),this.simplifySection(0,this.linePts.length-1,0)},remove:function(t,e,n){for(var i=e;n>i;i++){var r=t.getSegment(i);this.inputIndex.remove(r)}},hasInteriorIntersection:function(t,e){return this.li.computeIntersection(t.p0,t.p1,e.p0,e.p1),this.li.isInteriorIntersection()},hasBadInputIntersection:function(t,e,n){for(var i=this.inputIndex.query(n),r=i.iterator();r.hasNext();){var s=r.next();if(this.hasInteriorIntersection(s,n)){if(xs.isInLineSection(t,e,s))continue;return!0}}return!1},interfaces_:function(){return[]},getClass:function(){return xs}}),xs.isInLineSection=function(t,e,n){if(n.getParent()!==t.getParent())return!1;var i=n.getIndex();return i>=e[0]&&i<e[1]},e(Es.prototype,{setDistanceTolerance:function(t){this.distanceTolerance=t},simplify:function(t){for(var e=t.iterator();e.hasNext();)this.inputIndex.add(e.next());for(var e=t.iterator();e.hasNext();){var n=new xs(this.inputIndex,this.outputIndex);n.setDistanceTolerance(this.distanceTolerance),n.simplify(e.next())}},interfaces_:function(){return[]},getClass:function(){return Es}}),e(Is.prototype,{getResultGeometry:function(){if(this.inputGeom.isEmpty())return this.inputGeom.copy();this.linestringMap=new te,this.inputGeom.apply(new Cs(this)),this.lineSimplifier.simplify(this.linestringMap.values());var t=new Ns(this.linestringMap).transform(this.inputGeom);return t},setDistanceTolerance:function(t){if(0>t)throw new i("Tolerance must be non-negative");this.lineSimplifier.setDistanceTolerance(t)},interfaces_:function(){return[]},getClass:function(){return Is}}),Is.simplify=function(t,e){var n=new Is(t);return n.setDistanceTolerance(e),n.getResultGeometry()},h(Ns,xe),e(Ns.prototype,{transformCoordinates:function(t,e){if(0===t.size())return null;if(e instanceof St){var n=this.linestringMap.get(e);return this.createCoordinateSequence(n.getResultCoordinates())}return xe.prototype.transformCoordinates.call(this,t,e)},interfaces_:function(){return[]},getClass:function(){return Ns}}),e(Cs.prototype,{filter:function(t){if(t instanceof St){var e=t;if(e.isEmpty())return null;var n=e.isClosed()?4:2,i=new vs(e,n);this.tps.linestringMap.put(e,i)}},interfaces_:function(){return[q]},getClass:function(){return Cs}}),Is.LineStringTransformer=Ns,Is.LineStringMapBuilderFilter=Cs;var Mo=Object.freeze({DouglasPeuckerSimplifier:gs,TopologyPreservingSimplifier:Is});e(Ss.prototype,{splitAt:function(){if(1===arguments.length){var t=arguments[0],e=this.minimumLen/this.segLen;if(t.distance(this.seg.p0)<this.minimumLen)return this.splitPt=this.seg.pointAlong(e),null;if(t.distance(this.seg.p1)<this.minimumLen)return this.splitPt=Ss.pointAlongReverse(this.seg,e),null;this.splitPt=t}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=this.getConstrainedLength(n),s=r/this.segLen;i.equals2D(this.seg.p0)?this.splitPt=this.seg.pointAlong(s):this.splitPt=Ss.pointAlongReverse(this.seg,s)}},setMinimumLength:function(t){this.minimumLen=t},getConstrainedLength:function(t){return t<this.minimumLen?this.minimumLen:t},getSplitPoint:function(){return this.splitPt},interfaces_:function(){return[]},getClass:function(){return Ss}}),Ss.pointAlongReverse=function(t,e){var n=new g;return n.x=t.p1.x-e*(t.p1.x-t.p0.x),n.y=t.p1.y-e*(t.p1.y-t.p0.y),n},e(ws.prototype,{findSplitPoint:function(t,e){},interfaces_:function(){return[]},getClass:function(){return ws}}),e(Ls.prototype,{findSplitPoint:function(t,e){var n=t.getLineSegment(),i=n.getLength(),r=i/2,s=new Ss(n),o=Ls.projectedSplitPoint(t,e),a=2*o.distance(e)*.8,u=a;return u>r&&(u=r),s.setMinimumLength(u),s.splitAt(o),s.getSplitPoint()},interfaces_:function(){return[ws]},getClass:function(){return Ls}}),Ls.projectedSplitPoint=function(t,e){var n=t.getLineSegment(),i=n.project(e);return i},e(Rs.prototype,{interfaces_:function(){return[]},getClass:function(){return Rs}}),Rs.triArea=function(t,e,n){return(e.x-t.x)*(n.y-t.y)-(e.y-t.y)*(n.x-t.x)},Rs.isInCircleDDNormalized=function(t,e,n,i){var r=_.valueOf(t.x).selfSubtract(i.x),s=_.valueOf(t.y).selfSubtract(i.y),o=_.valueOf(e.x).selfSubtract(i.x),a=_.valueOf(e.y).selfSubtract(i.y),u=_.valueOf(n.x).selfSubtract(i.x),l=_.valueOf(n.y).selfSubtract(i.y),h=r.multiply(a).selfSubtract(o.multiply(s)),c=o.multiply(l).selfSubtract(u.multiply(a)),f=u.multiply(s).selfSubtract(r.multiply(l)),g=r.multiply(r).selfAdd(s.multiply(s)),d=o.multiply(o).selfAdd(a.multiply(a)),p=u.multiply(u).selfAdd(l.multiply(l)),v=g.selfMultiply(c).selfAdd(d.selfMultiply(f)).selfAdd(p.selfMultiply(h)),m=v.doubleValue()>0;return m},Rs.checkRobustInCircle=function(t,e,n,i){var r=Rs.isInCircleNonRobust(t,e,n,i),s=Rs.isInCircleDDSlow(t,e,n,i),o=Rs.isInCircleCC(t,e,n,i),a=ci.circumcentre(t,e,n);A.out.println("p radius diff a = "+Math.abs(i.distance(a)-t.distance(a))/t.distance(a)),r===s&&r===o||(A.out.println("inCircle robustness failure (double result = "+r+", DD result = "+s+", CC result = "+o+")"),A.out.println(se.toLineString(new Gt([t,e,n,i]))),A.out.println("Circumcentre = "+se.toPoint(a)+" radius = "+t.distance(a)),A.out.println("p radius diff a = "+Math.abs(i.distance(a)/t.distance(a)-1)),A.out.println("p radius diff b = "+Math.abs(i.distance(a)/e.distance(a)-1)),A.out.println("p radius diff c = "+Math.abs(i.distance(a)/n.distance(a)-1)),A.out.println())},Rs.isInCircleDDFast=function(t,e,n,i){var r=_.sqr(t.x).selfAdd(_.sqr(t.y)).selfMultiply(Rs.triAreaDDFast(e,n,i)),s=_.sqr(e.x).selfAdd(_.sqr(e.y)).selfMultiply(Rs.triAreaDDFast(t,n,i)),o=_.sqr(n.x).selfAdd(_.sqr(n.y)).selfMultiply(Rs.triAreaDDFast(t,e,i)),a=_.sqr(i.x).selfAdd(_.sqr(i.y)).selfMultiply(Rs.triAreaDDFast(t,e,n)),u=r.selfSubtract(s).selfAdd(o).selfSubtract(a),l=u.doubleValue()>0;return l},Rs.isInCircleCC=function(t,e,n,i){var r=ci.circumcentre(t,e,n),s=t.distance(r),o=i.distance(r)-s;return 0>=o},Rs.isInCircleNormalized=function(t,e,n,i){var r=t.x-i.x,s=t.y-i.y,o=e.x-i.x,a=e.y-i.y,u=n.x-i.x,l=n.y-i.y,h=r*a-o*s,c=o*l-u*a,f=u*s-r*l,g=r*r+s*s,d=o*o+a*a,p=u*u+l*l,v=g*c+d*f+p*h;return v>0},Rs.isInCircleDDSlow=function(t,e,n,i){var r=_.valueOf(i.x),s=_.valueOf(i.y),o=_.valueOf(t.x),a=_.valueOf(t.y),u=_.valueOf(e.x),l=_.valueOf(e.y),h=_.valueOf(n.x),c=_.valueOf(n.y),f=o.multiply(o).add(a.multiply(a)).multiply(Rs.triAreaDDSlow(u,l,h,c,r,s)),g=u.multiply(u).add(l.multiply(l)).multiply(Rs.triAreaDDSlow(o,a,h,c,r,s)),d=h.multiply(h).add(c.multiply(c)).multiply(Rs.triAreaDDSlow(o,a,u,l,r,s)),p=r.multiply(r).add(s.multiply(s)).multiply(Rs.triAreaDDSlow(o,a,u,l,h,c)),v=f.subtract(g).add(d).subtract(p),m=v.doubleValue()>0;
return m},Rs.isInCircleNonRobust=function(t,e,n,i){var r=(t.x*t.x+t.y*t.y)*Rs.triArea(e,n,i)-(e.x*e.x+e.y*e.y)*Rs.triArea(t,n,i)+(n.x*n.x+n.y*n.y)*Rs.triArea(t,e,i)-(i.x*i.x+i.y*i.y)*Rs.triArea(t,e,n)>0;return r},Rs.isInCircleRobust=function(t,e,n,i){return Rs.isInCircleNormalized(t,e,n,i)},Rs.triAreaDDSlow=function(t,e,n,i,r,s){return n.subtract(t).multiply(s.subtract(e)).subtract(i.subtract(e).multiply(r.subtract(t)))},Rs.triAreaDDFast=function(t,e,n){var i=_.valueOf(e.x).selfSubtract(t.x).selfMultiply(_.valueOf(n.y).selfSubtract(t.y)),r=_.valueOf(e.y).selfSubtract(t.y).selfMultiply(_.valueOf(n.x).selfSubtract(t.x));return i.selfSubtract(r)},e(Ts.prototype,{circleCenter:function(t,e){var n=new Ts(this.getX(),this.getY()),i=this.bisector(n,t),r=this.bisector(t,e),s=new F(i,r),o=null;try{o=new Ts(s.getX(),s.getY())}catch(i){if(!(i instanceof w))throw i;A.err.println("a: "+n+"  b: "+t+"  c: "+e),A.err.println(i)}finally{}return o},dot:function(t){return this.p.x*t.getX()+this.p.y*t.getY()},magn:function(){return Math.sqrt(this.p.x*this.p.x+this.p.y*this.p.y)},getZ:function(){return this.p.z},bisector:function(t,e){var n=e.getX()-t.getX(),i=e.getY()-t.getY(),r=new F(t.getX()+n/2,t.getY()+i/2,1),s=new F(t.getX()-i+n/2,t.getY()+n+i/2,1);return new F(r,s)},equals:function(){if(1===arguments.length){var t=arguments[0];return this.p.x===t.getX()&&this.p.y===t.getY()}if(2===arguments.length){var e=arguments[0],n=arguments[1];return this.p.distance(e.getCoordinate())<n}},getCoordinate:function(){return this.p},isInCircle:function(t,e,n){return Rs.isInCircleRobust(t.p,e.p,n.p,this.p)},interpolateZValue:function(t,e,n){var i=t.getX(),r=t.getY(),s=e.getX()-i,o=n.getX()-i,a=e.getY()-r,u=n.getY()-r,l=s*u-o*a,h=this.getX()-i,c=this.getY()-r,f=(u*h-o*c)/l,g=(-a*h+s*c)/l,d=t.getZ()+f*(e.getZ()-t.getZ())+g*(n.getZ()-t.getZ());return d},midPoint:function(t){var e=(this.p.x+t.getX())/2,n=(this.p.y+t.getY())/2,i=(this.p.z+t.getZ())/2;return new Ts(e,n,i)},rightOf:function(t){return this.isCCW(t.dest(),t.orig())},isCCW:function(t,e){return(t.p.x-this.p.x)*(e.p.y-this.p.y)-(t.p.y-this.p.y)*(e.p.x-this.p.x)>0},getX:function(){return this.p.x},crossProduct:function(t){return this.p.x*t.getY()-this.p.y*t.getX()},setZ:function(t){this.p.z=t},times:function(t){return new Ts(t*this.p.x,t*this.p.y)},cross:function(){return new Ts(this.p.y,-this.p.x)},leftOf:function(t){return this.isCCW(t.orig(),t.dest())},toString:function(){return"POINT ("+this.p.x+" "+this.p.y+")"},sub:function(t){return new Ts(this.p.x-t.getX(),this.p.y-t.getY())},getY:function(){return this.p.y},classify:function(t,e){var n=this,i=e.sub(t),r=n.sub(t),s=i.crossProduct(r);return s>0?Ts.LEFT:0>s?Ts.RIGHT:i.getX()*r.getX()<0||i.getY()*r.getY()<0?Ts.BEHIND:i.magn()<r.magn()?Ts.BEYOND:t.equals(n)?Ts.ORIGIN:e.equals(n)?Ts.DESTINATION:Ts.BETWEEN},sum:function(t){return new Ts(this.p.x+t.getX(),this.p.y+t.getY())},distance:function(t,e){return Math.sqrt(Math.pow(e.getX()-t.getX(),2)+Math.pow(e.getY()-t.getY(),2))},circumRadiusRatio:function(t,e){var n=this.circleCenter(t,e),i=this.distance(n,t),r=this.distance(this,t),s=this.distance(t,e);return r>s&&(r=s),s=this.distance(e,this),r>s&&(r=s),i/r},interfaces_:function(){return[]},getClass:function(){return Ts}}),Ts.interpolateZ=function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=e.distance(n),r=t.distance(e),s=n.z-e.z,o=e.z+s*(r/i);return o}if(4===arguments.length){var a=arguments[0],u=arguments[1],l=arguments[2],h=arguments[3],c=u.x,f=u.y,g=l.x-c,d=h.x-c,p=l.y-f,v=h.y-f,m=g*v-d*p,y=a.x-c,x=a.y-f,E=(v*y-d*x)/m,I=(-p*y+g*x)/m,N=u.z+E*(l.z-u.z)+I*(h.z-u.z);return N}},Ts.LEFT=0,Ts.RIGHT=1,Ts.BEYOND=2,Ts.BEHIND=3,Ts.BETWEEN=4,Ts.ORIGIN=5,Ts.DESTINATION=6,h(Ps,Ts),e(Ps.prototype,{getConstraint:function(){return this.constraint},setOnConstraint:function(t){this._isOnConstraint=t},merge:function(t){t._isOnConstraint&&(this._isOnConstraint=!0,this.constraint=t.constraint)},isOnConstraint:function(){return this._isOnConstraint},setConstraint:function(t){this._isOnConstraint=!0,this.constraint=t},interfaces_:function(){return[]},getClass:function(){return Ps}}),e(bs.prototype,{equalsNonOriented:function(t){return this.equalsOriented(t)?!0:!!this.equalsOriented(t.sym())},toLineSegment:function(){return new ce(this.vertex.getCoordinate(),this.dest().getCoordinate())},dest:function(){return this.sym().orig()},oNext:function(){return this.next},equalsOriented:function(t){return!(!this.orig().getCoordinate().equals2D(t.orig().getCoordinate())||!this.dest().getCoordinate().equals2D(t.dest().getCoordinate()))},dNext:function(){return this.sym().oNext().sym()},lPrev:function(){return this.next.sym()},rPrev:function(){return this.sym().oNext()},rot:function(){return this._rot},oPrev:function(){return this._rot.next._rot},sym:function(){return this._rot._rot},setOrig:function(t){this.vertex=t},lNext:function(){return this.invRot().oNext().rot()},getLength:function(){return this.orig().getCoordinate().distance(this.dest().getCoordinate())},invRot:function(){return this._rot.sym()},setDest:function(t){this.sym().setOrig(t)},setData:function(t){this.data=t},getData:function(){return this.data},delete:function(){this._rot=null},orig:function(){return this.vertex},rNext:function(){return this._rot.next.invRot()},toString:function(){var t=this.vertex.getCoordinate(),e=this.dest().getCoordinate();return se.toLineString(t,e)},isLive:function(){return null!==this._rot},getPrimary:function(){return this.orig().getCoordinate().compareTo(this.dest().getCoordinate())<=0?this:this.sym()},dPrev:function(){return this.invRot().oNext().invRot()},setNext:function(t){this.next=t},interfaces_:function(){return[]},getClass:function(){return bs}}),bs.makeEdge=function(t,e){var n=new bs,i=new bs,r=new bs,s=new bs;n._rot=i,i._rot=r,r._rot=s,s._rot=n,n.setNext(n),i.setNext(s),r.setNext(r),s.setNext(i);var o=n;return o.setOrig(t),o.setDest(e),o},bs.swap=function(t){var e=t.oPrev(),n=t.sym().oPrev();bs.splice(t,e),bs.splice(t.sym(),n),bs.splice(t,e.lNext()),bs.splice(t.sym(),n.lNext()),t.setOrig(e.dest()),t.setDest(n.dest())},bs.splice=function(t,e){var n=t.oNext().rot(),i=e.oNext().rot(),r=e.oNext(),s=t.oNext(),o=i.oNext(),a=n.oNext();t.setNext(r),e.setNext(s),n.setNext(o),i.setNext(a)},bs.connect=function(t,e){var n=bs.makeEdge(t.dest(),e.orig());return bs.splice(n,t.lNext()),bs.splice(n.sym(),e),n},e(Os.prototype,{insertSite:function(t){var e=this.subdiv.locate(t);if(this.subdiv.isVertexOfEdge(e,t))return e;this.subdiv.isOnEdge(e,t.getCoordinate())&&(e=e.oPrev(),this.subdiv.delete(e.oNext()));var n=this.subdiv.makeEdge(e.orig(),t);bs.splice(n,e);var i=n;do n=this.subdiv.connect(e,n.sym()),e=n.oPrev();while(e.lNext()!==i);for(;;){var r=e.oPrev();if(r.dest().rightOf(e)&&t.isInCircle(e.orig(),r.dest(),e.dest()))bs.swap(e),e=e.oPrev();else{if(e.oNext()===i)return n;e=e.oNext().lPrev()}}},insertSites:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.insertSite(n)}},interfaces_:function(){return[]},getClass:function(){return Os}}),e(_s.prototype,{locate:function(t){},interfaces_:function(){return[]},getClass:function(){return _s}}),e(Ms.prototype,{init:function(){this.lastEdge=this.findEdge()},locate:function(t){this.lastEdge.isLive()||this.init();var e=this.subdiv.locateFromEdge(t,this.lastEdge);return this.lastEdge=e,e},findEdge:function(){var t=this.subdiv.getEdges();return t.iterator().next()},interfaces_:function(){return[_s]},getClass:function(){return Ms}}),h(Ds,l),e(Ds.prototype,{getSegment:function(){return this.seg},interfaces_:function(){return[]},getClass:function(){return Ds}}),Ds.msgWithSpatial=function(t,e){return null!==e?t+" [ "+e+" ]":t},e(As.prototype,{visit:function(t){},interfaces_:function(){return[]},getClass:function(){return As}}),e(Fs.prototype,{getTriangleVertices:function(t){var e=new Bs;return this.visitTriangles(e,t),e.getTriangleVertices()},isFrameVertex:function(t){return t.equals(this.frameVertex[0])?!0:t.equals(this.frameVertex[1])?!0:!!t.equals(this.frameVertex[2])},isVertexOfEdge:function(t,e){return!(!e.equals(t.orig(),this.tolerance)&&!e.equals(t.dest(),this.tolerance))},connect:function(t,e){var n=bs.connect(t,e);return this.quadEdges.add(n),n},getVoronoiCellPolygon:function(t,e){var n=new I,i=t;do{var r=t.rot().orig().getCoordinate();n.add(r),t=t.oPrev()}while(t!==i);var s=new N;s.addAll(n,!1),s.closeRing(),s.size()<4&&(A.out.println(s),s.add(s.get(s.size()-1),!0));var o=s.toCoordinateArray(),a=e.createPolygon(e.createLinearRing(o),null),u=i.orig();return a.setUserData(u.getCoordinate()),a},setLocator:function(t){this.locator=t},initSubdiv:function(){var t=this.makeEdge(this.frameVertex[0],this.frameVertex[1]),e=this.makeEdge(this.frameVertex[1],this.frameVertex[2]);bs.splice(t.sym(),e);var n=this.makeEdge(this.frameVertex[2],this.frameVertex[0]);return bs.splice(e.sym(),n),bs.splice(n.sym(),t),t},isFrameBorderEdge:function(t){var e=new Array(3).fill(null);Fs.getTriangleEdges(t,e);var n=new Array(3).fill(null);Fs.getTriangleEdges(t.sym(),n);var i=t.lNext().dest();if(this.isFrameVertex(i))return!0;var r=t.sym().lNext().dest();return!!this.isFrameVertex(r)},makeEdge:function(t,e){var n=bs.makeEdge(t,e);return this.quadEdges.add(n),n},visitTriangles:function(t,e){this.visitedKey++;var n=new pe;n.push(this.startingEdge);for(var i=new J;!n.empty();){var r=n.pop();if(!i.contains(r)){var s=this.fetchTriangleToVisit(r,n,e,i);null!==s&&t.visit(s)}}},isFrameEdge:function(t){return!(!this.isFrameVertex(t.orig())&&!this.isFrameVertex(t.dest()))},isOnEdge:function(t,e){this.seg.setCoordinates(t.orig().getCoordinate(),t.dest().getCoordinate());var n=this.seg.distance(e);return n<this.edgeCoincidenceTolerance},getEnvelope:function(){return new C(this.frameEnv)},createFrame:function(t){var e=t.getWidth(),n=t.getHeight(),i=0;i=e>n?10*e:10*n,this.frameVertex[0]=new Ts((t.getMaxX()+t.getMinX())/2,t.getMaxY()+i),this.frameVertex[1]=new Ts(t.getMinX()-i,t.getMinY()-i),this.frameVertex[2]=new Ts(t.getMaxX()+i,t.getMinY()-i),this.frameEnv=new C(this.frameVertex[0].getCoordinate(),this.frameVertex[1].getCoordinate()),this.frameEnv.expandToInclude(this.frameVertex[2].getCoordinate())},getTriangleCoordinates:function(t){var e=new zs;return this.visitTriangles(e,t),e.getTriangles()},getVertices:function(t){for(var e=new J,n=this.quadEdges.iterator();n.hasNext();){var i=n.next(),r=i.orig();!t&&this.isFrameVertex(r)||e.add(r);var s=i.dest();!t&&this.isFrameVertex(s)||e.add(s)}return e},fetchTriangleToVisit:function(t,e,n,i){var r=t,s=0,o=!1;do{this.triEdges[s]=r,this.isFrameEdge(r)&&(o=!0);var a=r.sym();i.contains(a)||e.push(a),i.add(r),s++,r=r.lNext()}while(r!==t);return o&&!n?null:this.triEdges},getEdges:function(){if(0===arguments.length)return this.quadEdges;if(1===arguments.length){for(var t=arguments[0],e=this.getPrimaryEdges(!1),n=new Array(e.size()).fill(null),i=0,r=e.iterator();r.hasNext();){var s=r.next();n[i++]=t.createLineString([s.orig().getCoordinate(),s.dest().getCoordinate()])}return t.createMultiLineString(n)}},getVertexUniqueEdges:function(t){for(var e=new I,n=new J,i=this.quadEdges.iterator();i.hasNext();){var r=i.next(),s=r.orig();n.contains(s)||(n.add(s),!t&&this.isFrameVertex(s)||e.add(r));var o=r.sym(),a=o.orig();n.contains(a)||(n.add(a),!t&&this.isFrameVertex(a)||e.add(o))}return e},getTriangleEdges:function(t){var e=new qs;return this.visitTriangles(e,t),e.getTriangleEdges()},getPrimaryEdges:function(t){this.visitedKey++;var e=new I,n=new pe;n.push(this.startingEdge);for(var i=new J;!n.empty();){var r=n.pop();if(!i.contains(r)){var s=r.getPrimary();!t&&this.isFrameEdge(s)||e.add(s),n.push(r.oNext()),n.push(r.sym().oNext()),i.add(r),i.add(r.sym())}}return e},delete:function(t){bs.splice(t,t.oPrev()),bs.splice(t.sym(),t.sym().oPrev());var e=t.sym(),n=t.rot(),i=t.rot().sym();this.quadEdges.remove(t),this.quadEdges.remove(e),this.quadEdges.remove(n),this.quadEdges.remove(i),t.delete(),e.delete(),n.delete(),i.delete()},locateFromEdge:function(t,e){for(var n=0,i=this.quadEdges.size(),r=e;;){if(n++,n>i)throw new Ds(r.toLineSegment());if(t.equals(r.orig())||t.equals(r.dest()))break;if(t.rightOf(r))r=r.sym();else if(t.rightOf(r.oNext())){if(t.rightOf(r.dPrev()))break;r=r.dPrev()}else r=r.oNext()}return r},getTolerance:function(){return this.tolerance},getVoronoiCellPolygons:function(t){this.visitTriangles(new Gs,!0);for(var e=new I,n=this.getVertexUniqueEdges(!1),i=n.iterator();i.hasNext();){var r=i.next();e.add(this.getVoronoiCellPolygon(r,t))}return e},getVoronoiDiagram:function(t){var e=this.getVoronoiCellPolygons(t);return t.createGeometryCollection(ie.toGeometryArray(e))},getTriangles:function(t){for(var e=this.getTriangleCoordinates(!1),n=new Array(e.size()).fill(null),i=0,r=e.iterator();r.hasNext();){var s=r.next();n[i++]=t.createPolygon(t.createLinearRing(s),null)}return t.createGeometryCollection(n)},insertSite:function(t){var e=this.locate(t);if(t.equals(e.orig(),this.tolerance)||t.equals(e.dest(),this.tolerance))return e;var n=this.makeEdge(e.orig(),t);bs.splice(n,e);var i=n;do n=this.connect(e,n.sym()),e=n.oPrev();while(e.lNext()!==i);return i},locate:function(){if(1===arguments.length){if(arguments[0]instanceof Ts){var t=arguments[0];return this.locator.locate(t)}if(arguments[0]instanceof g){var e=arguments[0];return this.locator.locate(new Ts(e))}}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=this.locator.locate(new Ts(n));if(null===r)return null;var s=r;r.dest().getCoordinate().equals2D(n)&&(s=r.sym());var o=s;do{if(o.dest().getCoordinate().equals2D(i))return o;o=o.oNext()}while(o!==s);return null}},interfaces_:function(){return[]},getClass:function(){return Fs}}),Fs.getTriangleEdges=function(t,e){if(e[0]=t,e[1]=e[0].lNext(),e[2]=e[1].lNext(),e[2].lNext()!==e[0])throw new i("Edges do not form a triangle")},e(Gs.prototype,{visit:function(t){for(var e=t[0].orig().getCoordinate(),n=t[1].orig().getCoordinate(),i=t[2].orig().getCoordinate(),r=ci.circumcentre(e,n,i),s=new Ts(r),o=0;3>o;o++)t[o].rot().setOrig(s)},interfaces_:function(){return[As]},getClass:function(){return Gs}}),e(qs.prototype,{getTriangleEdges:function(){return this.triList},visit:function(t){this.triList.add(t.clone())},interfaces_:function(){return[As]},getClass:function(){return qs}}),e(Bs.prototype,{visit:function(t){this.triList.add([t[0].orig(),t[1].orig(),t[2].orig()])},getTriangleVertices:function(){return this.triList},interfaces_:function(){return[As]},getClass:function(){return Bs}}),e(zs.prototype,{checkTriangleSize:function(t){var e="";t.length>=2?e=se.toLineString(t[0],t[1]):t.length>=1&&(e=se.toPoint(t[0]))},visit:function(t){this.coordList.clear();for(var e=0;3>e;e++){var n=t[e].orig();this.coordList.add(n.getCoordinate())}if(this.coordList.size()>0){this.coordList.closeRing();var i=this.coordList.toCoordinateArray();if(4!==i.length)return null;this.triCoords.add(i)}},getTriangles:function(){return this.triCoords},interfaces_:function(){return[As]},getClass:function(){return zs}}),Fs.TriangleCircumcentreVisitor=Gs,Fs.TriangleEdgesListVisitor=qs,Fs.TriangleVertexListVisitor=Bs,Fs.TriangleCoordinatesVisitor=zs,Fs.EDGE_COINCIDENCE_TOL_FACTOR=1e3,e(Vs.prototype,{getLineSegment:function(){return this.ls},getEndZ:function(){var t=this.ls.getCoordinate(1);return t.z},getStartZ:function(){var t=this.ls.getCoordinate(0);return t.z},intersection:function(t){return this.ls.intersection(t.getLineSegment())},getStart:function(){return this.ls.getCoordinate(0)},getEnd:function(){return this.ls.getCoordinate(1)},getEndY:function(){var t=this.ls.getCoordinate(1);return t.y},getStartX:function(){var t=this.ls.getCoordinate(0);return t.x},equalsTopo:function(t){return this.ls.equalsTopo(t.getLineSegment())},getStartY:function(){var t=this.ls.getCoordinate(0);return t.y},setData:function(t){this.data=t},getData:function(){return this.data},getEndX:function(){var t=this.ls.getCoordinate(1);return t.x},toString:function(){return this.ls.toString()},interfaces_:function(){return[]},getClass:function(){return Vs}}),e(ks.prototype,{visit:function(t){},interfaces_:function(){return[]},getClass:function(){return ks}}),e(Ys.prototype,{isRepeated:function(){return this.count>1},getRight:function(){return this.right},getCoordinate:function(){return this.p},setLeft:function(t){this.left=t},getX:function(){return this.p.x},getData:function(){return this.data},getCount:function(){return this.count},getLeft:function(){return this.left},getY:function(){return this.p.y},increment:function(){this.count=this.count+1},setRight:function(t){this.right=t},interfaces_:function(){return[]},getClass:function(){return Ys}}),e(Us.prototype,{insert:function(){if(1===arguments.length){var t=arguments[0];return this.insert(t,null)}if(2===arguments.length){var e=arguments[0],n=arguments[1];if(null===this.root)return this.root=new Ys(e,n),this.root;if(this.tolerance>0){var i=this.findBestMatchNode(e);if(null!==i)return i.increment(),i}return this.insertExact(e,n)}},query:function(){var t=arguments,e=this;if(1===arguments.length){var n=arguments[0],i=new I;return this.query(n,i),i}if(2===arguments.length)if(arguments[0]instanceof C&&R(arguments[1],y))!function(){var n=t[0],i=t[1];e.queryNode(e.root,n,!0,{interfaces_:function(){return[ks]},visit:function(t){i.add(t)}})}();else if(arguments[0]instanceof C&&R(arguments[1],ks)){var r=arguments[0],s=arguments[1];this.queryNode(this.root,r,!0,s)}},queryNode:function(t,e,n,i){if(null===t)return null;var r=null,s=null,o=null;n?(r=e.getMinX(),s=e.getMaxX(),o=t.getX()):(r=e.getMinY(),s=e.getMaxY(),o=t.getY());var a=o>r,u=s>=o;a&&this.queryNode(t.getLeft(),e,!n,i),e.contains(t.getCoordinate())&&i.visit(t),u&&this.queryNode(t.getRight(),e,!n,i)},findBestMatchNode:function(t){var e=new Xs(t,this.tolerance);return this.query(e.queryEnvelope(),e),e.getNode()},isEmpty:function(){return null===this.root},insertExact:function(t,e){for(var n=this.root,i=this.root,r=!0,s=!0;null!==n;){if(null!==n){var o=t.distance(n.getCoordinate())<=this.tolerance;if(o)return n.increment(),n}s=r?t.x<n.getX():t.y<n.getY(),i=n,n=s?n.getLeft():n.getRight(),r=!r}this.numberOfNodes=this.numberOfNodes+1;var a=new Ys(t,e);return s?i.setLeft(a):i.setRight(a),a},interfaces_:function(){return[]},getClass:function(){return Us}}),Us.toCoordinates=function(){if(1===arguments.length){var t=arguments[0];return Us.toCoordinates(t,!1)}if(2===arguments.length){for(var e=arguments[0],n=arguments[1],i=new N,r=e.iterator();r.hasNext();)for(var s=r.next(),o=n?s.getCount():1,a=0;o>a;a++)i.add(s.getCoordinate(),!0);return i.toCoordinateArray()}},e(Xs.prototype,{visit:function(t){var e=this.p.distance(t.getCoordinate()),n=e<=this.tolerance;if(!n)return null;var i=!1;(null===this.matchNode||e<this.matchDist||null!==this.matchNode&&e===this.matchDist&&t.getCoordinate().compareTo(this.matchNode.getCoordinate())<1)&&(i=!0),i&&(this.matchNode=t,this.matchDist=e)},queryEnvelope:function(){var t=new C(this.p);return t.expandBy(this.tolerance),t},getNode:function(){return this.matchNode},interfaces_:function(){return[ks]},getClass:function(){return Xs}}),Us.BestMatchVisitor=Xs,e(Hs.prototype,{getInitialVertices:function(){return this.initialVertices},getKDT:function(){return this.kdt},enforceConstraints:function(){this.addConstraintVertices();var t=0,e=0;do e=this.enforceGabriel(this.segments),t++;while(e>0&&t<Hs.MAX_SPLIT_ITER)},insertSites:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.insertSite(n)}},getVertexFactory:function(){return this.vertexFactory},getPointArray:function(){for(var t=new Array(this.initialVertices.size()+this.segVertices.size()).fill(null),e=0,n=this.initialVertices.iterator();n.hasNext();){var i=n.next();t[e++]=i.getCoordinate()}for(var r=this.segVertices.iterator();r.hasNext();){var i=r.next();t[e++]=i.getCoordinate()}return t},setConstraints:function(t,e){this.segments=t,this.segVertices=e},computeConvexHull:function(){var t=new ie,e=this.getPointArray(),n=new me(e,t);this.convexHull=n.getConvexHull()},addConstraintVertices:function(){this.computeConvexHull(),this.insertSites(this.segVertices)},findNonGabrielPoint:function(t){var e=t.getStart(),n=t.getEnd(),i=new g((e.x+n.x)/2,(e.y+n.y)/2),s=e.distance(i),o=new C(i);o.expandBy(s);for(var a=this.kdt.query(o),u=null,l=r.MAX_VALUE,h=a.iterator();h.hasNext();){var c=h.next(),f=c.getCoordinate();if(!f.equals2D(e)&&!f.equals2D(n)){var d=i.distance(f);if(s>d){var p=d;(null===u||l>p)&&(u=f,l=p)}}}return u},getConstraintSegments:function(){return this.segments},setSplitPointFinder:function(t){this.splitFinder=t},getConvexHull:function(){return this.convexHull},getTolerance:function(){return this.tolerance},enforceGabriel:function(t){for(var e=new I,n=0,i=new I,r=t.iterator();r.hasNext();){var s=r.next(),o=this.findNonGabrielPoint(s);if(null!==o){this.splitPt=this.splitFinder.findSplitPoint(s,o);var a=this.createVertex(this.splitPt,s),u=(this.insertSite(a),new Vs(s.getStartX(),s.getStartY(),s.getStartZ(),a.getX(),a.getY(),a.getZ(),s.getData())),l=new Vs(a.getX(),a.getY(),a.getZ(),s.getEndX(),s.getEndY(),s.getEndZ(),s.getData());e.add(u),e.add(l),i.add(s),n+=1}}return t.removeAll(i),t.addAll(e),n},createVertex:function(){if(1===arguments.length){var t=arguments[0],e=null;return e=null!==this.vertexFactory?this.vertexFactory.createVertex(t,null):new Ps(t)}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=null;return e=null!==this.vertexFactory?this.vertexFactory.createVertex(n,i):new Ps(n),e.setOnConstraint(!0),e}},getSubdivision:function(){return this.subdiv},computeBoundingBox:function(){var t=Hs.computeVertexEnvelope(this.initialVertices),e=Hs.computeVertexEnvelope(this.segVertices),n=new C(t);n.expandToInclude(e);var i=.2*n.getWidth(),r=.2*n.getHeight(),s=Math.max(i,r);this.computeAreaEnv=new C(n),this.computeAreaEnv.expandBy(s)},setVertexFactory:function(t){this.vertexFactory=t},formInitialDelaunay:function(){this.computeBoundingBox(),this.subdiv=new Fs(this.computeAreaEnv,this.tolerance),this.subdiv.setLocator(new Ms(this.subdiv)),this.incDel=new Os(this.subdiv),this.insertSites(this.initialVertices)},insertSite:function(){if(arguments[0]instanceof Ps){var t=arguments[0],e=this.kdt.insert(t.getCoordinate(),t);if(e.isRepeated()){var n=e.getData();return n.merge(t),n}return this.incDel.insertSite(t),t}if(arguments[0]instanceof g){var i=arguments[0];this.insertSite(this.createVertex(i))}},interfaces_:function(){return[]},getClass:function(){return Hs}}),Hs.computeVertexEnvelope=function(t){for(var e=new C,n=t.iterator();n.hasNext();){var i=n.next();e.expandToInclude(i.getCoordinate())}return e},Hs.MAX_SPLIT_ITER=99,e(Ws.prototype,{create:function(){if(null!==this.subdiv)return null;var t=Ws.envelope(this.siteCoords),e=Ws.toVertices(this.siteCoords);this.subdiv=new Fs(t,this.tolerance);var n=new Os(this.subdiv);n.insertSites(e)},setTolerance:function(t){this.tolerance=t},setSites:function(){if(arguments[0]instanceof B){var t=arguments[0];this.siteCoords=Ws.extractUniqueCoordinates(t)}else if(R(arguments[0],v)){var e=arguments[0];this.siteCoords=Ws.unique(H.toCoordinateArray(e))}},getEdges:function(t){return this.create(),this.subdiv.getEdges(t)},getSubdivision:function(){return this.create(),this.subdiv},getTriangles:function(t){return this.create(),this.subdiv.getTriangles(t)},interfaces_:function(){return[]},getClass:function(){return Ws}}),Ws.extractUniqueCoordinates=function(t){if(null===t)return new N;var e=t.getCoordinates();return Ws.unique(e)},Ws.envelope=function(t){for(var e=new C,n=t.iterator();n.hasNext();){var i=n.next();e.expandToInclude(i)}return e},Ws.unique=function(t){var e=H.copyDeep(t);ut.sort(e);var n=new N(e,!1);return n},Ws.toVertices=function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();e.add(new Ts(i))}return e},e(js.prototype,{createSiteVertices:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();this.constraintVertexMap.containsKey(i)||e.add(new Ps(i))}return e},create:function(){if(null!==this.subdiv)return null;var t=Ws.envelope(this.siteCoords),e=new I;null!==this.constraintLines&&(t.expandToInclude(this.constraintLines.getEnvelopeInternal()),this.createVertices(this.constraintLines),e=js.createConstraintSegments(this.constraintLines));var n=this.createSiteVertices(this.siteCoords),i=new Hs(n,this.tolerance);i.setConstraints(e,new I(this.constraintVertexMap.values())),i.formInitialDelaunay(),i.enforceConstraints(),this.subdiv=i.getSubdivision()},setTolerance:function(t){this.tolerance=t},setConstraints:function(t){this.constraintLines=t},setSites:function(t){this.siteCoords=Ws.extractUniqueCoordinates(t)},getEdges:function(t){return this.create(),this.subdiv.getEdges(t)},getSubdivision:function(){return this.create(),this.subdiv},getTriangles:function(t){return this.create(),this.subdiv.getTriangles(t)},createVertices:function(t){for(var e=t.getCoordinates(),n=0;n<e.length;n++){var i=new Ps(e[n]);this.constraintVertexMap.put(e[n],i)}},interfaces_:function(){return[]},getClass:function(){return js}}),js.createConstraintSegments=function(){if(1===arguments.length){for(var t=arguments[0],e=kn.getLines(t),n=new I,i=e.iterator();i.hasNext();){var r=i.next();js.createConstraintSegments(r,n)}return n}if(2===arguments.length)for(var s=arguments[0],o=arguments[1],a=s.getCoordinates(),i=1;i<a.length;i++)o.add(new Vs(a[i-1],a[i]))},e(Ks.prototype,{create:function(){if(null!==this.subdiv)return null;var t=Ws.envelope(this.siteCoords);this.diagramEnv=t;var e=Math.max(this.diagramEnv.getWidth(),this.diagramEnv.getHeight());this.diagramEnv.expandBy(e),null!==this.clipEnv&&this.diagramEnv.expandToInclude(this.clipEnv);var n=Ws.toVertices(this.siteCoords);this.subdiv=new Fs(t,this.tolerance);var i=new Os(this.subdiv);i.insertSites(n)},getDiagram:function(t){this.create();var e=this.subdiv.getVoronoiDiagram(t);return Ks.clipGeometryCollection(e,this.diagramEnv)},setTolerance:function(t){this.tolerance=t},setSites:function(){if(arguments[0]instanceof B){var t=arguments[0];this.siteCoords=Ws.extractUniqueCoordinates(t)}else if(R(arguments[0],v)){var e=arguments[0];this.siteCoords=Ws.unique(H.toCoordinateArray(e))}},setClipEnvelope:function(t){this.clipEnv=t},getSubdivision:function(){return this.create(),this.subdiv},interfaces_:function(){return[]},getClass:function(){return Ks}}),Ks.clipGeometryCollection=function(t,e){for(var n=t.getFactory().toGeometry(e),i=new I,r=0;r<t.getNumGeometries();r++){var s=t.getGeometryN(r),o=null;e.contains(s.getEnvelopeInternal())?o=s:e.intersects(s.getEnvelopeInternal())&&(o=n.intersection(s),o.setUserData(s.getUserData())),null===o||o.isEmpty()||i.add(o)}return t.getFactory().createGeometryCollection(ie.toGeometryArray(i))};var Do=Object.freeze({ConformingDelaunayTriangulationBuilder:js,DelaunayTriangulationBuilder:Ws,VoronoiDiagramBuilder:Ks});e(Zs.prototype,{interfaces_:function(){return[]},getClass:function(){return Zs}}),Zs.union=function(t,e){if(t.isEmpty()||e.isEmpty()){if(t.isEmpty()&&e.isEmpty())return ii.createEmptyResult(ii.UNION,t,e,t.getFactory());if(t.isEmpty())return e.copy();if(e.isEmpty())return t.copy()}return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.UNION)},e(B.prototype,{equalsTopo:function(t){return this.getEnvelopeInternal().equals(t.getEnvelopeInternal())?Yr.relate(this,t).isEquals(this.getDimension(),t.getDimension()):!1},union:function(){if(0===arguments.length)return jr.union(this);if(1===arguments.length){var t=arguments[0];return Zs.union(this,t)}},isValid:function(){return ls.isValid(this)},intersection:function(t){if(this.isEmpty()||t.isEmpty())return ii.createEmptyResult(ii.INTERSECTION,this,t,this.factory);if(this.isGeometryCollection()){var e=t;return hn.map(this,{interfaces_:function(){return[MapOp]},map:function(t){return t.intersection(e)}})}return this.checkNotGeometryCollection(this),this.checkNotGeometryCollection(t),si.overlayOp(this,t,ii.INTERSECTION)},covers:function(t){return Yr.covers(this,t)},coveredBy:function(t){return Yr.coveredBy(this,t)},touches:function(t){return Yr.touches(this,t)},intersects:function(t){return Yr.intersects(this,t)},within:function(t){return Yr.within(this,t)},overlaps:function(t){return Yr.overlaps(this,t)},disjoint:function(t){return Yr.disjoint(this,t)},crosses:function(t){return Yr.crosses(this,t)},buffer:function(){if(1===arguments.length){var t=arguments[0];return sr.bufferOp(this,t)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return sr.bufferOp(this,e,n)}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];return sr.bufferOp(this,i,r,s)}},convexHull:function(){return new me(this).getConvexHull()},relate:function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return Yr.relate.apply(Yr,[this].concat(e))},getCentroid:function(){if(this.isEmpty())return this.factory.createPoint();var t=ge.getCentroid(this);return this.createPointFromInternalCoord(t,this)},getInteriorPoint:function(){if(this.isEmpty())return this.factory.createPoint();var t=null,e=this.getDimension();if(0===e){var n=new li(this);t=n.getInteriorPoint()}else if(1===e){var n=new ui(this);t=n.getInteriorPoint()}else{var n=new oi(this);t=n.getInteriorPoint()}return this.createPointFromInternalCoord(t,this)},symDifference:function(t){if(this.isEmpty()||t.isEmpty()){if(this.isEmpty()&&t.isEmpty())return ii.createEmptyResult(ii.SYMDIFFERENCE,this,t,this.factory);if(this.isEmpty())return t.copy();if(t.isEmpty())return this.copy()}return this.checkNotGeometryCollection(this),this.checkNotGeometryCollection(t),si.overlayOp(this,t,ii.SYMDIFFERENCE)},createPointFromInternalCoord:function(t,e){return e.getPrecisionModel().makePrecise(t),e.getFactory().createPoint(t)},toText:function(){var t=new se;return t.write(this)},toString:function(){this.toText()},contains:function(t){return Yr.contains(this,t)},difference:function(t){return this.isEmpty()?ii.createEmptyResult(ii.DIFFERENCE,this,t,this.factory):t.isEmpty()?this.copy():(this.checkNotGeometryCollection(this),this.checkNotGeometryCollection(t),si.overlayOp(this,t,ii.DIFFERENCE))},isSimple:function(){var t=new Gi(this);return t.isSimple()},isWithinDistance:function(t,e){var n=this.getEnvelopeInternal().distance(t.getEnvelopeInternal());return n>e?!1:hr.isWithinDistance(this,t,e)},distance:function(t){return hr.distance(this,t)},isEquivalentClass:function(t){return this.getClass()===t.getClass()}});var Ao="1.1.2 (248dab8)";t.version=Ao,t.algorithm=co,t.densify=fo,t.dissolve=go,t.geom=lo,t.index=mo,t.io=Io,t.noding=No,t.operation=Oo,t.precision=_o,t.simplify=Mo,t.triangulate=Do});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var crop = __webpack_require__(33)
var intersect = __webpack_require__(34)
var within = __webpack_require__(36)

module.exports = function(config) {
	var msg = document.getElementById(config.progressId)
	var bbox = bbToFeat(config.bbox)
	if(config.type === 'crop') { 
		crop(0, config.feats, bbox, [], msg, function(toKeep) { done(config, toKeep, msg) }) 
	} else if(config.type === 'intersect') { 
		intersect(0, config.feats, bbox, [], msg, function(toKeep) { done(config, toKeep, msg) }) 
	} else {
		within(0, config.feats, bbox, [], msg, function(toKeep) { done(config, toKeep, msg) })
	}
}

function done(config, feats, msg) {
	msg.innerHTML = 'saving...'
	var n = config.type + '.json'
	config.evt.emit('new-collection', {type: 'FeatureCollection', features: feats}, n)
}

function bbToFeat(bb) {
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [[
				[bb[0], bb[1]],
				[bb[0], bb[3]],
				[bb[2], bb[3]],
				[bb[2], bb[1]],
				[bb[0], bb[1]]
			]]
		}
	}
}
/*
function withinLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) {
				var same = isSame(int.geometry, f.geometry)
				if(same) { toKeep.push(f) }
			}
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts.length === f.geometry.coordinates.length) { toKeep.push(f) }
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				withinLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			withinLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	}
}

function intersectLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) { toKeep.push(f) }
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts) { toKeep.push(f)	}
		}
		var f = feats[i]
		var int = intersect(f,bbox)
		if(int) { toKeep.push(f) }
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				intersectLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			intersectLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	}
}

function cropLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) { int.properties = f.properties; toKeep.push(int) }
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts) {
				pts.forEach(function(pt) { toKeep.push(pt) })
			}
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				cropLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			cropLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	} 
} 



function isSame(c1, c2) {
	var s1 = JSON.stringify(c1)
	var s2 = JSON.stringify(c2)
	return s1 === s2
} 

function multiPointsInside(ptFeat, bboxFeat) {
	var fs = []
	var props = ptFeat.properties
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	var pts = ptFeat.geometry.coordinates
	pts.forEach(function(pt) {
		if(pt[0] > xMin && pt[0] < xMax && pt[1] > yMin && pt[1] < yMax) {
			fs.push({type: 'Feature', properties: props, geometry: {type: 'Point', coordinates: pt }})
		}
	})
	if(fs.length !== 0) { return fs }
	else { return false }
}

function pointIsInside(ptFeat, bboxFeat) {
	var pt = ptFeat.geometry.coordinates
	var bboxC = bboxFeat.geometry.coordinates
	var xMin = bboxC[0][0][0]
	var xMax = bboxC[0][2][0]
	var yMin = bboxC[0][0][1]
	var yMax = bboxC[0][1][1]
	if(pt[0] > xMin && pt[0] < xMax && pt[1] > yMin && pt[1] < yMax) {
		return true
	} else {
		return false
	}
}
*/


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var intersect = __webpack_require__(21)
var pointIsInside = __webpack_require__(26)
var multiPointsInside = __webpack_require__(25)
var line = __webpack_require__(24)

module.exports = function(i, feats, bbox, toKeep, msg, callback) {
	cropLoop(i, feats, bbox, toKeep, msg, function(r) { callback(r) })
}

function cropLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) { int.properties = f.properties; toKeep.push(int) }
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts) {
				pts.forEach(function(pt) { toKeep.push(pt) })
			}
		} else if(gt === 'LineString' || gt === 'MultiLineString') {
			var newF = line.crop(f, bbox)
			if(newF) { toKeep.push(newF) }
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				cropLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			cropLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	} 
} 


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var intersect = __webpack_require__(21)
var pointIsInside = __webpack_require__(26)
var multiPointIsInside = __webpack_require__(25)
var line = __webpack_require__(24)

module.exports = function(i, feats, bbox, toKeep, msg, callback) {
	intersectLoop(i, feats, bbox, toKeep, msg, function(r) { callback(r) })
}

function intersectLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) { toKeep.push(f) }
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts) { toKeep.push(f)	}
		} else if(gt === 'LineString' || gt === 'MultiLineString') {
			if(line.intersect(f,bbox)) { toKeep.push(f) }
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				intersectLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			intersectLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	}
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var inter = __webpack_require__(29)

module.exports = function(lineCoords, bboxLine, bb) {
	var lineParts = []
	lineCoords.forEach(function(pt, i) {
		if(i !== 0) {
			var prev = lineCoords[i-1]
			var ptIn = isIn(pt, bb)
			var prevIn = isIn(prev, bb)
			if(ptIn && prevIn) { lineParts.push([prev, pt]) }
			else if(ptIn) {
				inter.coordinates([prev, pt], bboxLine.geometry.coordinates, function(pts) {
					lineParts.push([pts[0], pt])
				})
			} else if(prevIn) {
				inter.coordinates([prev, pt], bboxLine.geometry.coordinates, function(pts) {
					lineParts.push([prev, pts[0]])
				})
			} else {
				inter.coordinates([prev, pt], bboxLine.geometry.coordinates, function(pts) {
					if(pts) { lineParts.push([pts[0], pts[1]]) }
				})
			}
		}
	})
	var currLine = []
	var lines = []
	lineParts.forEach(function(l,i) {
		if(i === 0) { currLine = [l[0], l[1]] }
		else {
			if(equal(currLine[currLine.length-1], l[0])) {
				currLine.push(l[1])
			} else {
				lines.push(currLine)
				currLine = [l[0], l[1]]
			}
		}
	})
	if(currLine.length !== 0) { lines.push(currLine) }
	return lines
}

function equal(pt1, pt2) {
	if(pt1[0] === pt2[0] && pt1[1] === pt2[1]) {
		return true
	} else {
		return false
	}
}

function isIn(pt, bb) {
	if(pt[0] >= bb.x.min && pt[0] <= bb.x.max && pt[1] >= bb.y.min && pt[1] <= bb.y.max) {
		return true
	} else {
		return false
	}
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var intersect = __webpack_require__(21)
var pointIsInside = __webpack_require__(26)
var multiPointIsInside = __webpack_require__(25)
var line = __webpack_require__(24)

module.exports = function(i, feats, bbox, toKeep, msg, callback) {
	withinLoop(i, feats, bbox, toKeep, msg, function(r) { callback(r) })
}

function withinLoop(i, feats, bbox, toKeep, msg, callback) {
	if(i === feats.length) { callback(toKeep) }
	else {
		var f = feats[i]
		var gt = f.geometry.type
		if(gt === 'Polygon' || gt === 'MultiPolygon') {
			var int = intersect(f,bbox)
			if(int) {
				var same = isSame(int.geometry, f.geometry)
				if(same) { toKeep.push(f) }
			}
		} else if(gt === 'Point') {
			if(pointIsInside(f, bbox)) { toKeep.push(f) }
		} else if(gt === 'MultiPoint') {
			var pts = multiPointsInside(f, bbox)
			if(pts.length === f.geometry.coordinates.length) { toKeep.push(f) }
		} else if(gt === 'LineString' || gt === 'MultiLineString') {
			if(line.within(f,bbox)) { toKeep.push(f) }
		}
		if(Math.floor(i/10) === i/10) {
			setTimeout(function() {
				msg.innerHTML = i + ' of ' + feats.length
				withinLoop(i+1, feats, bbox, toKeep, msg, callback)
			},1)
		} else {
			withinLoop(i+1, feats, bbox, toKeep, msg, callback)
		}
	}
}

function isSame(c1, c2) {
	var s1 = JSON.stringify(c1)
	var s2 = JSON.stringify(c2)
	return s1 === s2
} 


/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(44)

exports.draw = function(evt, map) {
	setTimeout(function() {
		document.getElementById('cancel-draw').onclick = function() { evt.emit('cancel') }
	},500)
	var start = null
	var end = null
	var layer = null
	var drawing = false
	var draw = function(pt) {
		if(layer) { map.removeLayer(layer) }
		layer = L.geoJSON(util.toFeat(start, pt), { color: '#CE7668' })
		layer.addTo(map) 
	}
	var fn = function() {
		map.doubleClickZoom.disable()
		map.on('dblclick', function(e1) {
			if(!start && !end) {
				start = e1.latlng
				drawing = true
				document.getElementById('info').innerHTML = 'Double click again to finish the rectangle'
				map.on('dblclick', function(e2) {
					if(end === null) {
						end = e2.latlng
						evt.emit('rect', util.toBbox(start, end), layer)
						drawing = false
						map.off('mousemove')
						map.doubleClickZoom.enable()
					}
				})
			}
		})
		map.on('mousemove', function(e3) {
			if(drawing) {
				draw(e3.latlng)
			}
		})
	}
	return fn
}

exports.type = function(evt, bb) {
	setTimeout(function() {
		document.getElementById('cancel-draw').onclick = function() { evt.emit('cancel') }
	},500)
	var fn = function() {
		document.getElementById('within').onclick = function() { evt.emit('type', bb, 'within') }
		document.getElementById('crop').onclick = function() { evt.emit('type', bb, 'crop') }
		document.getElementById('intersect').onclick = function() { evt.emit('type', bb, 'intersect') }
		document.getElementById('redraw').onclick = function() { evt.emit('redraw') }		
	}
	return fn
}







/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var img = __webpack_require__(42)
var xml = __webpack_require__(0)

var draw = xml.create('div')
var drawP = draw.c('p')
drawP.c('b').d('Draw a bounding box')
drawP.c('br')
drawP.c('span').a({ id: 'info' }).d('Double click to start drawing')
draw.c('button').a({ id: 'cancel-draw' }).d('Cancel')
draw.c('br')

exports.draw = draw.inner()

var type = xml.create('div')
var typeDiv0 = type.c('div').a({ 'class': 'l-img-c' })
typeDiv0.c('img').a({ id: 'within', 'class': 'l-img', 
	src: 'data:image/png;base64,' + img.within, alt: 'Within' })
var typeDiv1 = type.c('div').a({ 'class': 'l-img-c' })
typeDiv1.c('img').a({ id: 'crop', 'class': 'l-img', 
	src: 'data:image/png;base64,' + img.crop, alt: 'Crop' })
var typeDiv2 = type.c('div').a({ 'class': 'l-img-c' })
typeDiv2.c('img').a({ id: 'intersect', 'class': 'l-img', 
	src: 'data:image/png;base64,' + img.intersect, alt: 'Intersect' })
type.c('hr')
var typeDiv3 = type.c('div').a({ 'class': 'l-img-c' })
typeDiv3.c('img').a({ id: 'redraw', 'class': 'l-img-sm', 
	src: 'data:image/png;base64,' + img.draw, alt: 'redraw' })
type.c('hr')
type.c('button').a({ id: 'cancel-draw', style: 'width:100%' }).d('Cancel')
type.c('br')

exports.type = type.inner()

var process = xml.create('div')
var processP = process.c('p')
processP.c('b').d('Processing')
processP.c('br')
processP.c('span').a({ id: 'progress' }).d('...')
processP.c('br')

exports.process = process.inner()



/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {
	"within": "iVBORw0KGgoAAAANSUhEUgAAAIAAAAB/CAYAAAAn+soHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAEIgAABCIB9PV4dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABXcSURBVHic7Z1rcBvXdcf/5+4uFiRIUFIoWpRJW7JkW7HiyImVh+s4jm3JsmWS0KNm2kRR4k6mSp2ZzDhppjPptOWMP3Uy/VSnE6WdevKsAo9kAqAZKXYiJ3FTJ44V105iWZJNiZZMU6LEJ0gAu3tPP2DBgiBILMDFg9b+ZjADLO/ePdw9e+895557LuDh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eFRVo4cOfK+astwNSKqLUAGIcSOSCTycCwWq6+2LFcTNaMANpullF/u7e29pdqCXC3UjAIIIdj+GiCi7kgk8vCxY8cCVRXqKqBmFCAPmxOJxJd7e3tvrbYg72WoXPWGw2F/MSfour4XwMa8lRG9wcx9oVBo0hXpPGYpiwKEw+E6Xdf/zs06mTlBRMdCodArALjgCR6OqOUuYA5E5AcQ6u3t/YJnMrrHslGADER0vaqqByKRyFaUrwu7alh2CgAAzOwD0BGJRD7b398frLY8y5llowBENAPAzPmsMwzjQDQa3VxV4ZYxy0YBmFkCUPN8Asz8cCwW293f369XU8blyLJRAADWYn+UUm4xTfNvYrHYdZUS6L3AslEAIpKFyjDzCinl5/v6+u7q6elZNv9bNXkv3iTFsqz7brvttr/q6+tbWW1hap3lpABFmXxE1GZZ1pcikcgHyyXQewHX7ehwOLxK1/U7AHzE5arjAEqaHBJCvKIoyk927tyZdFmmqvCDH/wg2NTU9CAzNzHzoBDiLIDBzs7O6WLrck0BYrFYM4DdUspr3aozG9sVXNT8Qg6jmqYd3rlz53nXhKo8FIlEbhdCbJNSzrkXQghm5kuWZb1hGMbz3d3diw6aZyt0Q6pwONyk6/qjAMpmhhGRZOYldVlEJKWUv06lUsed3qBawX7BOqWU1xcqK4Q45/P5wjt27Ij39/frlmV9Qkr523yTaa4owNNPP71OCPEFN+oqgIm07b8khBDnNU078sADD1xxQaayEg6HFV3X7xRCfFJK6fh/J6JxZn4ZwMcB1Jum+eTevXvP5ZZzZRCo6/qQG/UUgpkNN+qRUrYlk8kDsVhsixv1lYvDhw+3+v3+LwK4t5iHDwDM3ATgXgD1AEBEK/KVc20MEIlE/gGA4lZ9CzAJoNHNConoT0TUV8oAqlyEw2Gf3++/D8BHltrtZSCi411dXb/IPe6mGVj2EbbtDna7zluklF+KRqPr3a67FGKx2I1+v/9RZv6YWw8fmG0R5rHk/jTrAgkiKmtErz3SLUfVQSLaH41Gf3vixIlne3p6zHJcZDHC4XBDXV3ddillWbolZi7cBRw7diyQSCTyaooD9gBoLvFcRzDzOBGVKp8jiOhiIpE40t3d/W45r5N9yVgs9iFm3s7MdWW8TnJycvJb+/btm8g+OKcFmJmZ2UJE95dRiCVBRGX3XDJzi67rX4zFYv2dnZ0nynmto0ePrjIMo0NKeUM5r2OjNzU1dQD4UfbBOTd0amrqD0RUkRF9KRCRa11WAVTLssppIVAkEvmkYRiPVujhAwCklDflrrmYowD79u2bsCzrGApMvVYLZtYqdS0hRHs0GnXbnY2enh4RjUa7UIJp5wZCiJ3hcHi2q8lrBtoRNnvdHIW6iIXym5vZvJRMJo+64Tm0zbtPM/MGNwQrFWZ+YdeuXc8Bi/gBotHoXzLzzZUTyxkuzAmUQhzAawB+HwqFhkupIBwO1/n9/s8wc7u7ohWPEOJQZ2fnSWABM5CZqa+vr61MJteSICIDQKUVIIC0S/Xj0Wh0SEr5SiqVerW7u3vGycl9fX0rpZT7mLnq4exENPXyyy+fyvzOqwDRaLQVJU69lht7Uqhq12fmViJq1TStDsDzhcofOXKkhZn3MXNNRC8z83hPT8+sQy2vAiiKssGyanIcCNTIqiBVVfO6pA8ePKitXbu21bKsNgDtQogNUkpfhcVbEGaOZ//OqwCWZb1JRHfZ8fceeZBSBsPhsKIoSosQ4hpVVVvsqdo1UkqFKD28qrVulIimsn/nHeWHQqF3iOh3lRGpOGrFMhFCrNd1/Ruqqh4QQuyyLOtDAK5FZS2UopFSzmkBFryZQoiL5RenJGriBts2/KwsQtSEXhbEUQsAAFLKS+UXp3iIqGLOoGKQUi6LdYqOW4CZmZlLWVk7agZbAWpRrmWhAKqqOlMAAEq55l6XgpSSbF9ATbFcugBVVZ11AZqm3VwrA65cmLni8/WFYOZl0QJYluV4ELip/OKUTM0pAJZBrgIikh0dHXO8l3kV4ODBgxoRVXXCYjGcrBOsNMuhBWDmOBHN6dbzKsDq1as3VnLq9T1CzSsAgIHcA3k9gaqqCmaehK0gRGTY4wGyf1sLxZg5ZXR0NHju3LmSgiESicS03++vtYyiElkv1DXXXHOhtbW1lkzpgWAwGM09mFcBDMOYyvZ15xoD9u8lhWgPDw+vOXnyZEjTtMlSmvR4PG4FAoGacAoZhiE1TSPYL0gqlWpKpVLHakUBhBAXFEU5dM8998wbO+VVAJ/Pt1HKgs+kEcA00gOykme67r777iebm5tHiz2PiMaW2gq5Ra4shw4d+sdqypMNEV32+Xw/2rFjR96w/XljAGYmy7KcWgD1SIdUTxUs6TLMXBNvPwCLiBqqLUQ+hBATiUTiezt27IgvVGZeCxCJRO4gotXFXIiZBRHN5IQ1MxGNAyAppSKEUAComcElEXEikYBpmpMAJvLVuxhEVFdtP5W9UGVGSlmTCiClfKa7u3t8sTJzFKC/v3+1YRj3lnCtegBTSLtoMwPFRKZZJKLscQQTkWFZFvv9/sy8etF2fSUePhGNZb5LKUkIkTH3MiN+rVbffgCvhkKhNwoVmlWAnp4eYZrmbpS4WoiZG+xUbmDmOnshZ76FDsTMPlF93ym3nT+/UpOyLl5Xd2m8sXEypesKE5lCCBMApJSz/XqOEs8eq0WEEHEAR52UnX3Yt99++yop5dqlXJiZ6+yu4AqA+lq9QVoqlbpxYGCbIuWnwEwNU1NouXRp8tSGDY+ndD3gYABc0xDRTzo6Ohwtdp1VgJmZmVGfz3eFiFYt5eLMXCeESDJzpQM3HbFmZKS++eLFvyagNfu4AAIqs56qlmAuwcynOjo6/uC0/Gwz3N3dbQkhfuaGEFUI214QxTCMGwYHr7n2nXdW3nz69Jbm4eHHch8+ADAg2t9++6PVkNFligrkmdMPd3V1/RHA4FIlsCyrJqaRfclk4pbTp/cHpqa+tGps7Cs+w9i12PIy3TDubZyediUa1rYQKn4fhBBtRZXPPaBp2k+XGggihKiJkOL1g4MfBnCT0/IMBNoHB3fqpllKT2AS0RgRjcXjcUgpmZlNIUSciIwKTWCZRBQ4fvy44xZ4ngJcuXJlInsQxMyL2pH5YOYGpF3FFUVhNlTDSAiAg9PTrKdSDxVdh5Qfv+nUqf2QshglTnKaFcy8IhAIQFEUhYg0KWWAmTVmLtlZZrcm08ycAJDMo0yW7XOxpJSrJycnHf/f85rDxsbGWwGkkNYmk4gaS7S5Gyvtrr1ucHBjYGrqL4hohADBJSasYGAtMUt2HoCaIqJC8yJB+340AZi0/Qo+22pqQH7zewIAiCiALKuKmS0AE8zMRORXFCVlWdZs3gRmvjUSiZwOhUKvFhJ8Xgtg9yE60lm4m5YSFcTMKyoVviUADsTjd9gD0DYGSjZpCWjcdObMpzTTdJZrj8hROft+mACCQohGALr9gpCtHOMAJm2lGEd6jiWI+YqoIK1QTQB0y7LmKZ8Q4mNOZMo3F5DPeRPP9G/ZHynl5cx3u3nKR0Wid1aMjUEAN7pVn2pZ2zadPv3IipGRRZu/Ylu5BeIsFFs5mgA02v6UJWVCkVKu6enpKejUm6cAiqKMEpEUQkwg3QRNIt0arMj9KIqiZ74TkW6XjwOYFkJMMPO4lHLRAZVlWSm4oCTNw8Nb2e3cx8zr2y5e/Nq6s2dXZPpdZjYgZdL+Tsy8JL9JGVG2bt26pdBOrPNu2EMPPRRh5l4pZab5ydu3KYqSytFmsssHANRLKYNE1GRPAgGYXdo9zszjhmGk4vE4FEVRkZ5WLhohBK+Kx43NJ0/e6zPNB0qpoxAENDZMT3/5xjNn1imKYl3/zjt33jQwsF9hThFR2bJWuYFlWZ1Syt2LlVloadhrRPQMgBEs4BewLMuX8f0vhj3ASRLROBFpzNxERE2apvkCgQAAiFJNpPVnzqxbe+7cPwkp7ypn+hgCVD2R6Fpz/vzGpvHxB/RkctPGt976nGqaydwYuxpk0RZ4oSaTu7q6XgqFQk+Mj4//OMcvMExEl5l5vIisVro9+s07qmZmXylK4DeMmwkoZ+xiCkCciYxUXd1zK0ZHPwN7JtCXTG5qvnzZsY+hWgghFjXjC/aZ+/fvj0spM+7FdwFcw8zvy4xAXZARAOpzly0XQgAspFzn0vXnQzQ6ret9M7p+OqHrJxTDeFDkmGqWojhKEFENhBDnVVXtVRRlXnbQbBw1m0KIp0zT3CKEKGfmrMZi8gA2TE1ZzLymwHwjE9GfeLEMo8xXQHReAiqk9AsiBUS+yfr6iYZ4fC8tEu27+sqVP7/c0vLPUsqaClAVQkwoivJ9J/sjOFKAzs7OEQA/i0ajcWYuy2ALABRFIadTsS3Dwzcv9nBsTkspdQAL+8fT1ssIARdJiM0gYkuIcKDAwwcAxTRXNYyNrZoIBhcygasCEf3U6eYYRZlNnZ2dv0Ge2HK3kFKq+cYCxCxXTkwEA/H4B1TDCBKz1FKpwruDSTlARBuIyL/gByACmsH8OjFfATOZiqLmNvcL4TeMquf9yWGgpOlgJxARa5r2tBCiXGlU65l5puXSJXXTqVMfWzM01KglEjPvP3XqzvYLFz6/amzMt2Fg4MObX3/9c6qUYww8h8VG4UJcj3RwSiEIRHst5l8BSGmm2Zz0+U4VOinp8w1cam6upTwKVjKZ7C/mhKJNp507d04cP378PyYmJnZggX2BbFemQURsx9A5Dhu/7sKF1U3j448CCKweHX1g9ehoEoDOAFaMj3cg0ywTbSRgBOmH9kn79ASYhzgdbdYGKduI6CyAgm8pAURCvI8BTUh5t26abyX9/v/WE4k7FzrH8PnOsUt7GLgBM7/e3d1d1FqEkmxne4HBM729vQNEtCdTj/3QyTYPs6N2J+BQCfwzMxsxN0NZtqWR2yc3M/NKheg5mZ4YaWAh1oMZBLyIdAvn3MtIpFLapV0HKW9QksnTyAp0zSalaUMX2tuPofIp6xZjrHCRuSzJdbpr164/SSn7ZitLByPmU6ogHE4Pp1R1kIG3ncpARLdKYBuItjNwB9KWwRoAd0GIBsl81mldzLwFRL/O/NaAjYaqzsudbAox+XZ7+3dSNRT5RERDqVTq9WLPW7LvfPfu3a9kTQgtOClizxUU5Oy6dWMz9fU/WapcAADmLUoRrloC/Gz7+dOn8zpT0+aEVkshZoba2v5t2l8zzx4AQESHu7u7LxR7nlvbkbzpwH533N1cDgZdy1guFcXHTrsB5hEiyk7lqogshQCAeH39/4w1NNSU2QcAIyMjJQWcuDV7ZhVKkmTHFTh6GyeDwRQxu7OHD/MWATiLaiJilnJuV5WzBE2qas3sLWRjEtHRRx55pCSldEsBHNmddtjSCICJmZmZea5fYqb66embfKYZZMCtlbUtDDhdfNoCojgWUVRDiJqJHLeDbf69q6vrxVLrcEUBOjs7B8nZRhNBIgoCCNbV1QUSiblKy0SkWNbMhoGBXSAquEGiEwh4B0X8n0TUyNn7JeQMIUx71VAtIKUcKzV7eQbXAihM03SihRPZ6Wfz5COWq8bGpsilNPXMPMVpBXCciIIADdlJqHJWNwkhambZEBE5tpYWwjUF2LNnz6sAFgxCJKKpAlaCrEskJhunpra5JZNIp7stqj7JTHPc0VLOzaljmrXSAliKovxqqZW4GULF7777bkxK+TwRvQl7H0EiknYU0LxVtKqqZpaHx5k50XrhwvuJ+ZbcciULBEwVGy9AgAGi2YGfkrNGgmokLwERvdrR0VF0Yo1cXI2iOXDggAE7hz4zUzQabWHm7QA25iuv6/qc5eGjq1ZdCAy5YwEyMELMbblNuANGwTzrs5A5A0LF5Xu2GHYgzgjSHr71WXsMWUKIX7pxjfKFUaUnaYZ7e3vjTlcJNyQSK926vgB+K4keLPbxS2CcmM1MiFnu7hRSyooEgVB6p/P+UCj0OyC9j7CmaZ+2u9H/dePtB9yOos0DET0H4EShkC+fZSWCY2MLTrwUCwOWg3iBeRDwEIiehv3m58b8G5qW/TtZpnzKphDiqczDB4C9e/cOJRKJfzVN82Aymfy5Wxcqe3Nm71kfPXLkyIuKomzHArH7KUXxn9mw4cctw8O/aZqauo+YlxZvR+SHlBJFbjZpZ/y4G8CzAD5iAieTjY2Xkqr6hun3/+FiU9Mf63R94ty5c5MHDhwwwuGwomlaI4AVqqpul1JeuyS5gaSU8r9CodDZ3D/YO5e5uq9jxfqzPXv2XATww1gs9gkA9+Urk/T56t9ub794wTS///4zZx4UUv5Zqdcj5s1MdAZFLA79/5NpNZhfq1fVPTd87WuLxiraD2UMwNjx48efHB8f31WaxGlLyTCMH+7du7dim3dWPE1LZ2fnC1LKZ5BOrJgXqarqG5s2hdmpCzcPDKxl4I/s0P3MRBeZ+VsQ4mFLyg9YgcDfr/n614sKVL3nnnvMUCh0eGRkpCSZhRBHK/nwgQq2ANmEQqHfbd++/YWVK1d+dqEypmUNU4GYdgdsBfACgLsWLME8wETfCxL9y+pvfGPJK5qJiFtbW/mjHy0+1wQRVXxFdVUUAACeffbZ862trdi2bVveh9wyOroWC+1GzpxioosEnCPmc8z8JgvxugCGiGirlPI2ELUTc5KYL7AQuQpgMfPvBfCf06nU9zf39Lia53BoaAhjY2NFpb4TQnAymax4vsWqKQCQvlFPPPHEdx9//PHriej27JXIwYmJm5E1imfmSyD6JTEfmvH7f37LY4+NLrAq5/nsHwM9PX7W9bPE/BUiSjDwnDSM75x47bUXu596qmyJLF566aW37r+/qI3YX9izZ8/lcsmzENVM49UBIAZgA4C3wuHwap/Pt11RlBullHTDwMB1gUTiC2B+jYm+Xbdy5XfXHjhQ8lTsmW9+s0VXlMn2r361Ena8JYT4eiQSmcxnFdizeCYR+e0dUN7o7Ow8VI1lZjWjAJmDkUikUQixpW1w8INNExOXvpdMHs7e6XKZYAH424MHDz6xZs2a+wF82J4LGQfwdjKZ/EV3d3fNTCtXiw6kR+glpYyvcSwAj1VbCCdUO1unR5XxFOAqx1OAqxxPAa5yPAW4yvEU4Cqnqp5AGwW1IcdVSS3c+ILLsD3KRzU9gdcDKDqX7zLiBSwSJe3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHhUXb+D87JfH8hC8dzAAAAAElFTkSuQmCC",
	"crop": "iVBORw0KGgoAAAANSUhEUgAAAIAAAAB/CAYAAAAn+soHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAEIgAABCIB9PV4dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABZvSURBVHic7Z1/cFvVlce/59739PTDPxJIQhzC0hRaWrI0dJOWshRogRAIdkTixZ1tM2xLOxu2ndmZdpbZaTud8Z8709m/2s5suju7s6XtUjEESzYmKWlDW8pQwm8KJIUSAoH8MkksS5ber3v2Dz27si1LT/KTLJP3mdGMJb9379G7R/fHOeeeC4SEhISEhISEhISEhISEhISEhISEhISEhISEhIQ0lT179ly42DKcj4jFFmAKIcSWdDp91/DwcHyxZTmfaBsF8FivlPrG0NDQlYstyPlC2yiAEIK9PxNENJBOp+/at29fYlGFOg9oGwWowPpisfiNoaGhqxZbkA8y1KxyU6lUtJ4bDMPoB3B5xcKIDjPzSDKZnAhEupBpmqIAqVQqZhjGvwZZJjMXiWhfMpl8AQDXvCHEF+08BMyAiKIAkkNDQ18Ol4zBsWQUYAoiulTTtF3pdHoTmjeEnTcsOQUAAGaOAOhNp9NfGh0d7VpseZYyS0YBiKgAwJn1+pBt27symcz6RRVuCbNkFICZFQCtwivBzHcNDw9vHx0dNRZTxqXIklEAAG61fyqlNjiO80/Dw8N/1SqBPggsGQUgIlXrGmZeppT6h5GRkesHBweXzHdbTD6ID0m6rnvz1Vdffc/IyMjyxRam3VlKClDXko+I1rque286nf5EswT6IBD4OjqVSl1gGMa1AD4VcNF5AA05h4QQL0gpH926dasZsEyLwk9/+tOu7u7u25m5m5nfFkK8BeDtvr6+yXrLCkwBhoeHVwDYrpS6OKgyy/FMwXX5F2ZxVtf1h7Zu3XosMKFaD6XT6Y1CiFuUUjOehRCCmfm067qHbdt+fGBgoOqkebrAIKRKpVLdhmF8HUDTlmFEpJh5QUMWESml1JOWZR3w+4DaBe8H1qeUurTWtUKIo5FIJLVly5b86Oio4bruZ5VST1dypgWiAA8//PCHhBBfDqKsGjgorf0XhBDimK7re2677bYzAcjUVFKplDQM4zohxA1KKd/fnYjGmflZAJ8BEHcc53/6+/uPzr4ukEmgYRjHgyinFsxsB1GOUmqtaZq7hoeHNwRRXrN46KGHeqLR6NcA3FRP4wMAM3cDuAlAHACIaFml6wKbA6TT6e8BkEGVNw8TADqDLJCIXiWikUYmUM0ilUpFotHozQA+tdBhbwoiOrBt27bfzP48yGVg02fYnjk46DKvVErdm8lk1gVddiMMDw9/JBqNfp2Zrwmq8YHpHmEOCx5PyyooElFTI3q9mW4ziu4iorszmczTzz333GODg4NOMyqpRiqV6ojFYpuVUk0Zlpi59hCwb9++RLFYrKgpPtgBYEWD9/qCmceJqFH5fEFEp4rF4p6BgYETzaynvMrh4eFPMvNmZo41sR5zYmLiRzt37syWfzijBygUChuI6NYmCrEgiKjplktmXmUYxteGh4dH+/r6nmtmXXv37r3Atu1epdSHm1mPh9Hd3d0L4OflH854oLlc7o9E1JIZfSMQUWBDVg0013WbuUKgdDp9g23bX29R4wMAlFIfnb3nYoYC7Ny5M+u67j7UcL0uFsyst6ouIcQlmUwmaHM2BgcHRSaT2YYGlnZBIITYmkqlpoeaistAL8KmP8hZaIC4aP5ys5yDpmnuDcJy6C3vvsDMlwUhWKMw8xN33nnnfqCKHSCTyfw9M1/ROrH8EYBPoBHyAF4G8HwymTzZSAGpVCoWjUa/yMyXBCta/QghHujr6zsEzLMMZGYaGRlZ26Ql14IgIhtAqxUggZJJ9TOZTOa4UuoFy7JeGhgYKPi5eWRkZLlSaiczL3o4OxHlnn322T9Nva+oAJlMpgcNul6bjecUWrT6mbmHiHp0XY8BeLzW9Xv27FnFzDuZuS2il5l5fHBwcNqgVlEBpJSXuW5bzgOBNtkVpGlaRZP07t279TVr1vS4rrsWwCVCiMuUUpEWizcvzJwvf19RAVzX/TMRXe/F34dUQCnVlUqlpJRylRDiIk3TVnmu2tVKKUlUml612zBKRLny9xVn+clk8j0ieqY1ItVHu6xMhBDrDMP4jqZpu4QQd7qu+0kAF6O1K5S6UUrN6AHmfZhCiFPNF6ch2uIBe2v4aVmEaAu9rImvHgAAlFKnmy9O/RBRy4xB9aCUWhL7FH33AIVC4XRZ1o62wVOAdpRrSSiApmn+FACAbJbvdSEopcizBbQVS2UI0DTN3xCg6/oV7TLhmg0zt9xfXwtmXhI9gOu6vieBH2u+OA3TdgqAJZCrgIhUb2/vDOtlRQXYvXu3TkSL6rCohp99gq1mKfQAzJwnohnDekUFWLly5eWtdL1+QGh7BQBwZPYHFS2BmqYJZp6ApyBEZHvzAfLeu/PFmPnl7NmzXUePHm0oGKJYLE5Go9F2yyiqUPaDuuiii97t6elpp6X0ka6urszsDysqgG3buXJb9+zFgPd+QSHaJ0+eXH3o0KHkhfF4Tp/VLfnhWC7nJGKxeY1CESFI1rkyKyrV0MKn6Dju8mhUwhsGTuTznZZl7WsXBRBCvCulfODzn//8nLlTRQWIRCKXK1VzmO0EMInShKxhT9c3rriiYLjuynrvy3Z27u2amLit0XqDJNvVNdyVzfYBAIj4uy++2DbLZyJ6PxKJ/HzLli0Vw/bnzAGYmVzX9bsCiKMUUp2reWXACOZWxwRUxDSMw7HJyY2LLUclhBDZYrH4ky1btuTnu2ZOD5BOp68lorp+kcwsiKgwK6yZiWgcACmlpBBCAtCmJpdExMViEeNSvpaIRN6opz5Iaeu2vbaue5qAI+UZW8pTHabZdpFTAKCUemRgYGC82jUzFGB0dHSlbds3NVBXHEAOJRPt1ESxODVRJKLyeQQTke26LkejUSxznE9ELGtBE8pm4BLl8p2dB6CUwULYwnUNltIh1zVAxMSsS6USHZOT1y+2rPPwUjKZPFzromkFGBwcFI7jbEeDu4WYucNL5QZmjnkbOSttdCBmjohFtp26Up41df0AAToLoRPzMuG6y9xIZFwBBSWE1ZXN3oGllUUFACCEyAPY6+fa6cbeuHHjBUqpNQupmJlj3lBwBkC8Xf0jxVjsec00c3HT3D41c2dgIh+LHUzkcjdSm7icG4WIHu3t7fW12XVauwuFwlmv4RYEM8eEEGIRIndrwkKYhUTiEaNQWK0pdT3KrHcCSEggsdQbn5n/1Nvb+0e/108rwMDAgCuE+FUQQrRT4xcjkVetaDQzGY3+0pXy8Wgut4WAntnXMSA0255gonb0M9RDXYE8M8a3bdu2vQLg7YVK4LpuW6yDC9HowahlaZFicVu8WLxVs+0t1baXRRzn2mI0ejCIur2t7C1/DkKIulZHcyY4uq7/cqGBIEKIRQ8pVoCjue5JAB/1ew8DiYhlRUzDeFHV6XG0df3dia6uR7NdXaP5fB6qZFV0hBB5IrJb5MByiChx4MAB3z3wHAU4c+ZMttwKyMxV15GVYOYOlEzFLcXWtPesSOQ1W9ePTyYSv4lYVt1LWum6Gw3TjDq6/q7fe8xI5A0lRKEzm729M5vdnEgkIKWURKQrpRLMrDNzw8YyrzeZZOYiALOCMrmezcVVSq2cmJi4w2/ZcxSgs7PzKgAWgDwRjQshGrX3dxLRuQbvbQhHyhd001yn27bbmc9/nBtMWMHAGre0lPKFHYkcM0yz4nE3ZXR5z4MBZJVSEyg15jnM39tkAWQ9F27cm1sZnsMi6/04TSnlpJcBxAAAZr7Kb4LMOeOhEGKtUsrwKvJTxrww8zLPk9h017Ir5VjUNC/zHtLahUhOQGfEtsdMw3jdMM2PVLuWhSiyEL62iJU9j64pMwgzGyj9gs954W6CiDSllFUlGYZESaEAAK7rzknPJ4S4BsBLtWSq5AuoZLzJE9G52S+l1PtTf3vdUyVaMqu2DOMFAVRtrHqQSt1g2LaWi8X28vzb5Xmis3N/Ipvd7LfceX4M0lOObgCdnj1lQZlQlFKrBwcHaxr15iiAlPIsESkhRBalLmgCpZz8y2a/pJTG1N9EZHjX5wFMCiGyzDyulLKqCTCu64ctXX+nsa9ZwhUir5kmOGirnVLrEoXCdWYkknKlzAKleYap64cBwNG0sVihsEEEmGspQOSmTZs21DqJdc4Du+OOO9LMPKSU6kLJzVtxDiCltGZpM3nXJwDElVJdRNTtOYEATG/tHmfmcdu2rXw+j7jjXGwZRk2bdSWUELnJROJRAl7QHOdzjZRRCwI6Dcu6S2naftsw3pTAq4bjwNL1w46U42Bux8YHALiu26eU2l7tmvm2hr1MRI8AGMM8dgHXdSNTtv9qeCsCk4jGiUhn5m4i6tZ1PZJIJKAzdzRqfDF1fV8sn79FKHVdM9PHEKDpxeKNcJwnhOPcDOYrIo6DiUTi8SUQC1i1B56vy+Rt27YdTCaTPxwfH//FLLvASSJ6n5nH68hqZXiz1IpmVrLtFY6U7/ssqyQg4BqOczEBzZxgWgDyTGSDaL/mOF/EVOwf8xVd+fxyzXXb+kwCIUTVZXzNMfPuu+/OK6WmzIsnAFzEzBd6k5RAkkN3FIsbJzo6nmSiqtpajqPrJ4SPxMkNQ3SWlRoB8+uk1HMAbp/dy7hELNo0eFYIcUzTtCEp5ZzsoOX46jaFEA86jrNBCNGszFnUnc3elu3o2Nc9MdHr5wZb1w9ptn1Tjf6XiejVqhlGmc+A6JgCNCgVFUQSQISZsxCiH1WifROFwk2TicTvY20WEyCEyEop7/dzPoIvBejr6xsD8KtMJpNn5qbE4QlmXdaRRUOzLJNqh2K/7tk05rePl1YvYwScIiHWg4ihVApAf63ymegCl6ihnEHNhIh+6fdwjLqWTX19fX9AhdjywGDWbV0/4U0Kp3+1jpRnssuXj4x3dr6Si8efL8RirwqlOmqWp9QRIrqMiKLzvgAiYAWYXyPmM2AmZtb8Tip1x2m3gJEjDbmD/UBErOv6w0KIpqRR7cjnr52Mx5+ZiMf3OFIeKMTjj+Sj0d8L4MXuc+f+NqLUhGGaZrRQiGiue46B/agWUi7EpfAX40Ag6neZfwfAEkQrAPyp1k1gPmLp+kW+v2DzcU3THK3nhrqXTlu3bs0eOHDgv7LZ7BbMcy6QFxVkExF7yyTfXbtuWWfihUI/gIQ2OQmUspAbDCCWz1+DqW6Z6HICxlBqtBu824tgPs4lM+taKLWWiN4CUDM7FwFEQlzIgA6iG0H0JjP/noDr5ruHpTyWyOfbJiKYmV8bGBioay9CQ2tnb4PBI0NDQ0eIaMdUOV6jk7c8jJX5ErLwqQTScS7AzAxl5SuN2WPyCmZeLon2K2Ymog4WYh2YQcBTKPVw/m0MRBqVTNoxMH+YmF/3epg5cwEGjpvRKKKTk+20Q6lu59uCxq8777zzVaXUyHRhJQ9aJaXqgk/3MGtanol8H+xERFcp4BYQbWbgWjCvJmA1gOshRIdifstvWcy8AURPTpctxOVgnpM7mYGJyY6OZ6NtNPsnouOWZb1W730LnsBs3779hTKH0Lzh3Z6voCbRQuGuoq6/slC5AADMG2QdLk0CoqzU9OyZmT/EwAwzNQOFyc7ORxO53NbKhdS/zS0IiOihgYEB3zEMUwR1HMmffXiv/A43AroemHFFSRlhv8MA8xgRladylUQ0YzmlpHwqlssl0Wbh4mNjYw0FnAT1JdxaSZK83cW+fh1KqU5iDuYMH+YNAvAX1UTEXArUKL9/hvmahbBEyYc/T3Ut7wAcItr7la98ZT53fFWCUgBf604vbGkMQLZQKMyJuHE07fR4d/fzhVjsHQaC2lm7ioGzfq8FUR5VFNUps09UYnYChmbi5Ur6z23btj3VaBmBKEBfX9/bPg+a6CKiLgBdsVgsUSzOVFpi1l3g3IqzZ9eDKBA7PwHvoY7vSUSdVQJAwLpetYFb2QMopc41mr18isDGMcdx/Ghhtjz97Ox8xNJ1l0UtawwBpaln5hyXFMB3IgoCdJQloZrdnLJ2A7eyB1hQIA0QoALs2LHjJVSJQSOiXLVVgivl2YmOjtGYZa0PSiZRSnd7Sz33KGYqj7qlWQ2qXLddDqB2pZS/W2ghQQZR8IkTJ4ZXrVp1Rkp5CTOvBWB4D3Oi0rl1mqbhZCTy9DIpdY05rllWnlz3yrlFNygQkKs3XoAAG0QSU790IRhlv3oCiijbBT23gNbEhxDRS729vX7nNvMSaBTNrl27bHg59JmZMpnMKmbeDKBiyLRhGFhhWRsM5m7BHM3H4+OwfIcEVIWBMWJe20CDnEX5LH/WoC6V0lHFS0gBTgK8QJwxlCx868rOGHKFEL8Noo7mhVGVZsMnh4aG8tV2CQsiIbyj0CUQWAZQATytiG6vt/kVME7MzpQ3UCnFM3ayM1cdAoJqfSqddD6aTCafAUrnCOu6/gVvGH0xiF8/0AJjBhHtB/DcvFujvGykk/H4k5FCYc6mzUZhwPURLzAHAu4A0cPw2lIQzZip2lJGFVHR0bTTlqa97WjaKUUU9LnDjhDiwanGB4D+/v7jxWLxB47j7DZN89dBVdT0iFbvzPrMnj17npJSbsas2H3ylDBWKGyajMefJNdNx03z42D2vaevIkRRKKVQ52GTRNQB4EYAjwH4lFLqEAlxGkSHodQfrXj8lXfWrfvHo0ePTuzatctOpVJS1/XOeKGwes3p0z+IF4vXLkhuwFRK/V8ymXxr9j+8k8sCPdexZSHNO3bsOAXgZ8PDw58FcHPZv0opZZgjiXz+cwBgRiKHNNv+g2S+ptH6iHk9E72BOjaH/uVmWgnml+OatmP1t79ddYuY1yjnAJw7cODA7Z2HDv0bgG81JDNRzrbtn/X397fs8M6W27P7+vqeUEo9gioWNcOyPmbFYib7NeFWgIE1DLzCPodlJjrFzD+CEHe5Sv21m0h8d/V99/neHwiU3OQb7733vrGxsYZkFkLsbWXjA4u0oyWZTD6zefPmJ5YvX/6l+a6xhXgvBnx8gVVtAvAEgPndtsxHmOgnXUT/vvI731nwjmYi4p6eHv70pz/dyL0t31G9aLtaHnvssWM9PT0wN206GwHmGIikUgXMdxo5s8VEpwg4SsxHmfnPLMRrAjhORJuUUleD6BJiNon5XRZitgK4zPy8AP570rLuXz84GGiew+PHj+PcuXPZ2lf+BSEEm6bZ8nyLi7qt6fjx47jnF79I/viee+7uyue/Kss2WURsuxtls3hmPg2i3xLzA4Vo9NdXfvObZ+dxvDxe/ubI4GCUDeMtYv5nIioysF/Z9o+fe/nlpwYefLBpiSwOHjz45q231nUQ+xM7duyoa3NMECzmtqZeAMMALgPw5kP3399zaS73va5c7u80x1lZjESGoradBPPLTPQfseXL/3fNrl0NL7fe+P73VxlSTlzyrW/52sq9QFwhxH3pdHpCKXXx7H96XjyHiKLelvDDfX19D7TSkzgtS6srLGOGAkx9ODo62nXRO+98VbcsvSOXO/IT03yo/KTLJYIL4F927979w9WrV98K4G88X8g4gHdM0/zNwMBAMCbPJUwvSjP0hlLGtzkugG8uthB+aKuwppDWEyrAeU6oAOc5oQKc54QKcJ4TKsB5TjskOJJoDznOS9rhwdfehh3SNBbTEngpAN85bZcgT8BHps6QkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkKbx/1fwvEmpP1WIAAAAAElFTkSuQmCC",
	"intersect": "iVBORw0KGgoAAAANSUhEUgAAAIAAAAB/CAYAAAAn+soHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAEIgAABCIB9PV4dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAABuVSURBVHic7Z15dFzFlfDvrXpbd6tbu5DlfYsBJ5gZTIAQyNiEcRBewB48g49DBkgCmSUcAsyxHWaOvm8mfCdn8s3kxOELNhPA4M8QeXCQDQYHB7OFONiYxTgYy6u8aF+6W939tqo7f2ixlpbULb2W5Lh/5+iPfl2v6urV7VruvXUfQJYsWbJkyZIlS5YsWbJkyZIlS5YsWbJkyZIlS5YsWbJklG3bthWOtQwXI2ysBeiiqK3tu/s3bPjJjh07/GMty8XEuFEAn+sWFbS0PDSzunr/O08//RdjLc/FwrhRACalDgBgWNZlExoadh544omf7dq1KzDWcv2pM34UwHW7h34mpS+vtfUfJx88+MGbTz5581jK9acOZqreyspKI50b5tTXPxVsb/+bvtclohUOBp85M2nSI8uWLYt6J2IWgAwpQGVlpW9Off0e3bImIgDv16iUOvZpG6X0MaIBlcbS9c9bSkq+f/3q1a8DAGVA7IuSjCnAvNOnP1dte7KX9UpEKxIKvXCytPSh5cuXN3tZ98XKuFkDpAIj0vPC4W9deuLEe+9u2nQLZG4Ku2hQxlqAVJAArqtpZ4kxSyK6QCRy2tvXvlxVVcJU9dfl5eWRsZbxQuWCGAGkorRE/f6PUEquuG6u4rqFvnh85uwjRx6b+vnnb7/53HM3jLWMFyqZUwDybp3GhAhprhvUbHum6jgTVdct6/rzmea8SWfPvrZ/48bHdu7cqXvW6EVCJkcAz+ZnRmS4nLcP8r2/oLl5zeQjR/a88dxzc7xq92LgglAAAABizBqqvUAicd2k2tp39j399D0VFRUXxPQ21mTyIfXb/48ETHHvrwhRXFhX9+RtBQUv7c56GIckYwrAXTfXy/owPVlZKBZbMunEiT/8ftOmr3spx58anu+jKysrC2a1tDyY19r6qJf1hnNzXw2Fw3+ZzLI4GIQYb83N/VnD1KkV5eXlQ00jFwSbN28OTUa8O7et7Su2qn4U8ft3J3JzDy1ZsiSebl2eKcCubdtKSurr/8MfjS5ShSjyqt4u2v3+93y2fTl33bzh3J/w+fbVFxZ+c+E3v/m517KNIvjG5s0Li1ta/jUQi10DXaMiIjmc1yb8/vebcnP/f4um/XrlypUipQq9kKqysjL3stra3wTi8S97UV8yEobxGZMyoNv2lOHWIThvbc7L+181eXk/T/UBjRd27txZXFpT839y29ruRKIBg2YkohnOy3u+afr0f1y0aFFs586deqCtbVlbIPBqMmeaJ5ZAVVXzNcua4UVdA8GFCAnOW0ZYR35Jc/N/+Gz7prd37rz3xvLyRq/kyxSVlZV8Ynv7nQWfffavum1PG6o8IzLyW1vv9pvmvN899dR/5h858pBmmnOaZs++DAD6KYAni0Bd12th6G3aiGBChFxFafWiqmA0uqTk0KEP3nnqqcUe1JcxXn366WlzGhpeKq2vfyaVzu+Jnkj8+YT6+ueMROJKRuQrMs2pycp5ogDl5eUWIZpe1DUQipQBqShtXtWnue7kssbG//7w8cc3jrc4xMrKSu39jRvXzmps3B+MRhenu/BNRsA0L0923bNtoOQ808EaTBB5OsqglHpuJPKdGdXV7721adOfeVn3cHnr+ef/7LL6+teLWlp+xIXwzo5hmrOSXfZMAQRjYa/qGghUlIws3HyWNa+srm7PHzZs+KeKioox8ZBWVlbm7H/yyf9ddvr0m4H29huByNMtuuG6SU3kvRrZtWtXwDTNIQ04vpaWQJDz7gfFTTMnJ5H4mRGPXztyUQemOTd3a2E4fEem6icAigWDu06VlHx7ycqVZzPVTh/wjS1bbixtavqJEYvNz1QjLudNh4qLZ99+9929ptFe2o6trdfPPXmyarDQrLGEI2oEQH3DybwCATAnGv3GbNt++40tW+5ZuGrVW5lop4vXXnutIL+m5tH806e/rUgZzGRbihBFUxKJHwPAfT2v95oCGlx3bzQYfDmTgowE7rp5krEBvYJeoVnWjMLGxocz2AS++qtfLZr0+ee7i5ubH8x053eRF4msfnPLlut6XuulAKtXr47UlpWtsTXtxGgIlC6KlHmS81GJ/skxzZv2bdz4Ta/rraioYO9u2vT3M2tqnvXH46O68EQif2Fj408qKyt9Xdf6LQLLb7/9WO2ECXc5nI87Iwlz3VyhKBlfbAJ0RCkXtLY++eHjj/90z549niwMKysrtcVlZT8tPXfuPxXXLfGiznTxx+PXFcfjy7s+J90FLFi16t14Tk7V6ImVGlyIkIvomS1gKDq3iQ+U7d9//MNf/OLfflNVVTbcunbs2OH/QkPDCwXNzf/AxjAWEwHIYazbH5JUAYgINcu6evTESg0mREiqqhfWwLRQXXdyblvbD6cfPnz44Pr1r73zy1/e3nMYHYo9lZWlM44e3ROKRm+HMY5kdhSl7r3jxw90fU6qANu3b5+gWdbM0RMrNRiAIjlP2+XpFVzKYKC9fVFZQ8PWAtddlMo9+/7rv75YVlOz12eaGXOUpYPD+cmKigrZ9TnpUJQXDl/LiXJGT6zUEQBj7sVDAF4QiXwZAF7q+92GDRvUKSUlE/MaG//Cb1kLAi0ty5gQngbHjATivLbn56QKEAsE3ndU9ZzqOMOe8zLFeAn0Uy3ri5WVlZxzXhIQYnJeLDbf196+SIvFLtWOHJmCUo5LW4pQlKEVoHzFijMfr1+/VXWcB0ZHrDSQUoWO+MAxnUt9icRNV54+fZy7bqFEtE1dr85kPIRXuIz1snAO+INKBAJ7Mi9O+jAhQpKxjHoeU5KDyK/Y9hSUMgAAgHhhnFIzGavp+XlABWjOzf0IEMd8vu2L4rr5o2UMSgfy2HmTKRyfLzUFiAlRKxgbtT13qnApc8U4VIALBBkrKDjX88JgayrOOoe38YQiRK47DhXzQpgCXMZijLFecRsDKsCkSGQRjkOvIBMi6HI+7hTgQoA4bxdCxHpeG1ABDMtaknmR0ocR+VzGxt0UQBdArgLJefvixYsTPa8lVYANGzaoumVlNLhjRCiKPdYiXIgIxDZE7HXELqkCTCwunqPbdlJTMCHahDimHUB9/onxwHjfBRAAxQ1jd9/rSQ1BBMCbioqeBwDuMJaQnEdsRTFdny9mc+6EIpHiSefO/T2XctjmYpvzpmO23TCce4/X1OTN0PU/Drdtr7GFcNotyypA7JZpgq7rea47bvwpkby8TbE5c/6l7/WkCmATtdUXF59K8pUBAEYkFDJPKspPJ9bV3aHb9jTsTPKYlkBCJDYfOnR5jqa1c8bk0Hf0YtJ7sZibGwiMaYobi4gkEbiOI4OGwboCOcOmGbrt0ks/vVrTxlK8bmLB4I7aqVPvL1+wwO37XdIHqGnaLCkH75O43y+qZ8x4SrVtZeaJEw+mex6wawz/weWXW7qUaYc/R0OhV4ORyC3p3pcBZFsotCMvElnW9fmHn3wybqYo2zA+apo7d1X5ggVJQ+r7rQGICIUQl6ZYv9/RNK09FHonXcEEYj9tTANCKVP2x2cS2zCqA4nEuIudAABwFeVM2yWXfGPBggUDxlH2GwGqqqquQ8TidBo6V1r6viJEKBiJ3NR1zVHV0225uW9wIXwopU+VMpe5bogJEWSI2GTbDaZpTm9QlP25mpbeAooxR7espAcdRhOH80aX8wa/aY67tDSEaLcUFNx77apV9YOV66UAO3fuLHYcZ2G6jUlEo2bKlF0zqqsn+izrUgAAU9NOFrS23saFyJUALnEelYyZxFhCIiZsItswDChx3fm6bY+7TB6CsVh7MPhbIFKgY8TRkDEEITggEhKpKGUgEIuNywxl0VBow7X33vubocp1K0BFRQVzXfd2GGa8mpQycGLGjM1Ta2rKA/H4NbaiNAQ7AyEYgAJC5HNx3rdUAnB0OO14heQ8bCnK7xiAFIwpDCAXpMx1FSWCjCUI0QmFw0sydQYhk5i6fuj05MlrUinb3dlXXXVVgZRyRAEgAlE9MW3a9mBr6zulTU0rBm0YccxiOxKG8ZHuOFGfbd/StXIngGgsEPh9IB5fiB2/+gsSQnSjeXkPpZotpLsTEolEKxGN6Pw9AAAR+RQin27bg8/RRKOuAIKxaCwn5yXDNC9hQtzQ8/wdAwhwKYMXcucDAMQMY+c199yzK9Xy3Z2wcuVKwRj7rRdCtBUW1hFjscHK4ChZzkxdP2QaxraEYbziIr7l7zhuPaFvOQJgiuu208h2J2OOaxj70inf61e4dOnSQwBQM0DZlBFCSDnEg2Sj4D9NGMY+w7JUwzSX+0zzVl2IxYg44C9cc5yvmD7f771ou1mIiK1pNTDKZmt03cvSKd9vGFZV9TeMsREJzRgT7tDpXDoUIEMPiBBdRYh6APhCyvcABPREwkgYxgGJ6KTTnqMoZ01N2+lq2mtYVwf66dNx1XHqLF1/Ie7375GIiaFrGQGIlDCMj4Ho1ImKipTd+P0UoKWlJdLTCkhEaR/FIqKcmilTNolBMnrI88ZAzxTA0bSTCZ/vQ0dRzph+/+802057S8uIrvaZZsBV1TNptHtMcd2EYdvlimV9o5gxyDeMEBJ9WTfNO33x+GxHVTcLzrufJSHaborH71zOW1xVrbZVtdpS1cOiTzyEqyhnbc6fMUyThWKxh0nXU07R108BgsHglwDABoAYIoYZY8M6uWpqGp6ZMOGJgX5JiCgBeinCiBGcf2rE45eprgv+WGw2IQ4r9QsBlEnElA+gCMZOI0CvRa/CefezRYBJum2vdjVtm63rx6M+3zbB2A5FiA9iPt/mhGF83NfDKhGduM+33eb8V4rrHuW27ddsO0ezbZVJ+UehKJUxv/+F9pyctxnRfs1xvoUAX0IilQAeqH7ssV6ngAei33zIGJskO5w7Oo0w43ckGLQcTTuuW1Y/S1l3x3uUVdzlvFFPJGYjogEAk0ZSKwIEFcdpsTTt6FC7GYloMdft9/YSjtg3r49PSyT+CgAOawCLAUADAAiYJgHRKVfTXrNUNQEAfknkJ8aqQ9HorYA4GRC7jREde1aayV0XAkIQEDUAQEnPmDQEyOGIfwcAQ65nkvkCktnYY9gRTNDrT0rZHEwk0HAch4iShmrbipJ8mOscAcCjEcDWtAMMYLYXdQEAKFLeoLsujxrGroGiownRdTRth+a6/aKnksUHIEAQAa6Gzs7vLIgAME2x7aWBWOyvA7HY4pxY7Ppge/u3AXHwV+503HsJJDdWXbUnhXQ3/RSAc96KiJJ1hF1FoCO3XICI8vr+aQA5U06cWDe7uvrfLj127P6y+vovqK5rA0CcMRZRHMeM+XxJM3NKKQkAoFVVjzhpzLdJ6+I8otg2ktcHh6ScnmOaX4lr2tauUHRHVc9aqloNAOBy3qCZ5rXQs0M7QTZsURARDRzhCWICmDZF0/7yXEXFoNNgv0ZuvfXWqqqqqhNEtDzZDV1wzu3ixsYruo46a7Y9tbC5eWphSwv1NLC0FRRsixvGIb9pzo35fAfiOTkHQQi1trm5LBaLzQpJOTGhadWq40xK+59EjCf8/neMRCJHFWIhZGBniQBBn2X9lauq213O5ytSHlGFmOxo2mEBoKpJOn88gAA+Qnw5oetrAeDHA5VLqqbLli07iIivAEATDGAXEEJo7T7f8X5f9Bn68lpabkMAN5yXV6VImVPc2Pit4paWOy9BLAsEAsCl9CNjwwoxM3X9FV8stpBJef1g+/uRggCKattfQynfZK57ExDNUVwX4z7fnoGmBzYOfAgIgHyIWIuBHhotXbp0HwDse/bZZwP5+fkPSym7/qH6YDQ6OScWm+o3zVTmXOYzzXk+05zXUzYD4HyaEtctFJw3p5kXT2q2PRkB1DTuSRcbABxC1BBgt+I4q7oWWyjlnIJI5FMCmDjmPT0wAhg7PFiBIX81d911V6yqqqoBAC7htt02q6bmEc22p3smIhEGEon54dzc7aFodFGq4WWOqp5VXTdp+lNPQGwlIfYg4gwksgDxln6jjJSCMcaS7ZZGsAbwBAnwlirlj+y6urcHK5fSsMkY2+q67ryylpbveNr5PQhGIreEg8HX8iKRlM4jOKp6RHGchUP8+ggR/0hEA8e3EbUA4hkJoICUBuvYvmlEFAHGVsAgQzkCfF0S7UWA6/tXO6ZRwp/RuXOLpq5fP2Rm1ZQUYMmSJU0A8NvdW7aoBW1ttw0nCHQoGJHK0ziKxhzHTsFXX91p0xh4gYmoA0ATAjQgY3MBkUDKSgBYMVT9hFgARLWZWHyOAFMC/MPsFDofIM1t00133rmrqbDw/5G37+49b8Bw3ZCrKE0EIHq24XLeEs7LqwqHQofac3IOJHT9sOq6QyuLlCcQcSYiGgP+ASACFAHRZ0jUAkRIREqqi0oESDq6jIazKylEVbPWrn0j1eJpKQAiUnNZWUVrfv4mr46Osx7PKcc057f7/ftjweCLgvM3YobxSjQQ2I0AH+WFwzeorhvTLcs0LEvhUrYRwO5BnUmMTYXUYhwQEFcIoncAwGaIRQBwZMi7iE4A4rjJokIAUanrj6RzT9pbp/Ly8siePXu+I44erS5sbv4XRtRrOnAVpTFhGH+0VLUOFMVUXTc32NZ2KyNKulrv+/PRhGjwx2IrACCgdISQWQCgEwD44/Gr4bwXcRYCNEFHp93YebsJRLXUsQCbBFJOQsSTADDk7gIBEBkrJAAVEL8GiMeJ6HfJ5vcuiOgMIl41QH2jD+JvZz300Ol0bhnW3nlBxwGDx/Y+8cShokhkU1cSJNMwDlZPm7YVGOtlBy/S9XOl9fXfTSXahtt2AQD0HN57Kljf51pERPkccbckIkTMIcamAxEgwF7oGOFSD/BAVLDDpO0DohlIVN05wiTrz9rOlX5SS9uoHxZFJCJ6Nd3bRrRXufb++6saiopWS0TT5bzl1OTJW/p2PgBAU0FBY1tu7o5kdfSNDCJFaSeAlE3DiPglCfB1QLyZAK4DolIEKAWAG4CxHEl0MtW6iGgeIL7XXTdjs4Cotl85gChj7AMA6BcRjCOMpRguKOUuIcQr6d434s3qV+655+WWgoIXz0yZ8nNbVQcMRDg7ceIHyeID+q6V9ETiDlvTPInKAaJ5PA2XJgIYJGX36pmIphFAL18GASSYlLtJyvLkTY5+/yNRPK4od8959NG0U9x7Yq2onzDhV7FAYKjzfTyVc/0IwB3OPctMIjnXKNVpgKgJe3vgOCL22k4hwB+A86WeO55GAmOn/PH4sJJmePVPiB6m4qQQEcPzLuCe9LuPA5QikTcZQYnmMYDUopoQiaTs/eobIt67CFrU51qv4t5ukYcGsU5K+U/TKyqGlTnNKwfKpwAwZI680xMnPqObZsAXi834uLkZAaCXv1tw3hoNBo9KxDO+eLwQALww9ZYQQCuksBOAjsCKj2GQPIRSSjHoFn90p4AwOc6NM//5n6uHW4EnI8CSJUtqELHfYqkvCZ+PCtvaFhaGwyvmqOpc0+yvtJKoPT8cvhwQPbHzI8A5SOP/RMQgDZaOdqhJfnQXgX8YSecDeDiPua67d6gypQ0NM3yJxJ8DdOy7hRC93MdciHyfZTWilJ4ctiSidupQgJRfaokAKhB1rxn69uaQTp7RGwHIlXLEb3fxTAGWL1/+CQB8MtD3Rc3NEwobG1d3dXhff7nkPBz1+182LOuLXsnEEPcDQFpvD5dE2HOt0ve19T13CWPMMZ2xzSOtxMsgCqqrq9tRUlLSwjmfTESTAEBHRFkYDheUNjT8bc8XIBIRKooCdZq2t0BRgoQouGWFkSjpCw6HJRBAe7rxAgjgACLv/iUzRj1/1YToDrba7VKYvorjNUT03NR160b87gRPo2juu+8+BwDeBOjo4O3bt5f42ttXXnL27Fok6hU6xRhDXdehyHWv8FlWKSNSIzk528D2Jv8UATQh0aRheOpaoad5u8+cz4lUSmER6FHvEwEcZERHCWAhIOZ1inRMQVzvRQMZ28siIi1btqw+GIvl9fUX9BOiw09AymB++zRhAO8T4ryhS/ZGAoSpxxqgK3i1+zNjo/LCCgKIAtF9M9eunTd93boVoGlXIsBOQGxgROunrl3ryZtTMm7MqC8p+WljUdGjLue9Yud7PFgJANAeDO424nHP3kBOAGI4Z/sR4FZA/DV0/ohZH68nEqkIEKMOR1QNIDYAwHml6NwF0ABu4pRkIDrLAJbOWLfuya5rMx5++NS+AweWmkJcGXecXw637r5k/Ch05zvrH9vz4ovPFp49uz4Qiy1DAOw6GCI7h1h/LPZV0zA+kIj/HUgkrkCilM/0JQXRACklpJmHABFzAOBrAPA6AFwtpTyMjDUC4ucg5aeMsUOKZX2v/ty56PyNG53KO+7gs+fODfo1rVRFXA9ENwB0HJAdpuQnGWOLp65Zc6jvFyu3bhWwdeuQ2+10GLWz8AtWrDgDALfv/8Uvvp8fiTwGXcM9YxKEACalz59IfBUAwDSMTzTb3sukHHa2UiSaS4hHIY3DoedvxmIgOuhXlOWla9cOesy9s1PaAKBtT0XFLVN0/ScA8H0xjOkMEauZaX5jakVF/2jrDDHq9uz53/vez2qLilaFO6xz3SNATwzTvMIMBGKUqgk3CQRQRgCHUjXNEmIDET0OjN0hpPyiCAR+WPrII4N2fl8WVFS4M9asebA2HB7WCCAAHhjNzgcYo/fXffXee7fffPPNZfn5+dcO4B8AG+CUH+CKETY1HwDehSRu226IThDisyHE/1u8bl10wHIpgog0rbCQ/vrqq9OKmEJEQY4zdBSSx4xZOpTXX3/9zIQJE8C+5pqkD10BcAAgefJJIpsQGxDgFBKdIqJjxNhnDKAWEedLKa8ExMlIZCHRWWKsrwIIIvqQATwVt+3n5lZUePo+4pPNzdAQjaaVbocATo9FGvwxzYdTW1sL39606VvP3H//qpxY7DuK63Z3uNqROq57FU9EjYD4NhK9kDCMNy5/8MHWvpmvO3mz54cTFRUG6fpJJPo+IpoEsFs6zsYDBw/uXbl1a8ZeifPrjz46tGju3IXQkV53cIgkCvHjyx59tN8p40wzlvHMiwFgBwDMBIDjVVu2XDIxElmb096+UnOcCQlNe8nnOMuA6CAhPuHLz99Udt99w96DH/33fy/ROY9O/sEPMpupowPBGHvk2I9+NJ8A/gb6P+daAmhlACSJkCG+PW3Nmr8bQKEzyrhRgK6LVVVVwbK6ursMxwkFotGjz1rWiz3fdHmBIADg4f3f/e7P86ZNe4AB3AEdCSBOSqLdlm0/P7ei4qJ/58Fi6Fihe2b8GUcIAHhwrIVIhfET1pRlTMgqwEVOVgEucrIKcJGTVYCLnKwCXOSMh8zYHMaHHBcl4+HBj7oDJMt5xtISOBUAbh3D9jPNuzBIlHSWLFmyZMmSJUuWLFmyZMmSJUuWLFmyZMmSJUuWLBnnfwAE39sOB7so4AAAAABJRU5ErkJggg==",
	"draw": "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACsQAAArEBUjaMygAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAcxSURBVHic7Z1ZjBRFGMd/wyqri4oHD8qLwQONRyIxxgPQKEbfNFEuL0BQDEgERQkaY3wxUSMxUQTxAATlcj0QFBOjkZh4vJiICK5BYjSgeIIQRHaX9aGmpaa6Zqaruqu7uqf/SWV3Zur4qn756ujuqoZSSWkIsBj4DegG9gHbgUeB9uzMak2NAXYDfXXCJ8CgzKxrMc0ADlEfRhC2AadlZGPL6EGag5DDj8AZmVjaApqDGYwg/Ayck4G9hdbD2MEIwg7grNStLqgG03gAN4FyZsq2F1YXAn8SH8pPwOkp214Ynat8vhTYQ3woPwCnOre+YJoL9AC3Kd8nBaULOMF1JYqi2RxuuF5govJ7UlA2Av3dViX/0k1tn9HEGw78rYlrGuZWgKnOqmOv4FqQjfZV00fVXuALzfcPAE8q3y1ArMz7NPGHAxuAYw3KVtUF8anmOewDRmoa5n5N3AVARYrTDoxS0o1AALa1Z28rA9kPXKWBMVsTd6EGxnrEQH+Tkn4k9lD+bVUgB4BrI8J4vg6M4PceYLySzwjsxpQdrQjkIHCdBsYsTdyXgH5SnP7AWk28HuBWJb/LMJ99LcWDBkozdAM3aGDcq4n7ArWe0R94p0ne45R8TabE+6kuPrNupLRCj6bBQO8ZLxLNM3RQxir5X0K0a19TggRZN1RaMG4JoYCZhG8uRe2mTKBcDPzVIM0jcuSsGysNGGr/DnAPYRgvE4bxtkWZ3YjburIuQg9lnmpY1g3mGsYEtcLAXYRhLKYWxpHAWzHLvlkpdxjwuxTnKY1tmTda2jCm4h6GbIO6TrkAAeUJjW3gQcO5CL3oYdxNGMYSwjDeTNCWg4RndqdobPtfWTeeCxgTNfW8k+Yw2oCVDmzSLR61qlQTmOghxOrVV/UiVsmypgPzqV1XvAJMRkAC4Rmr0K9TklA3Ygr8ZbOIprRnubHXmXSesRLhDYHagBXE94RGQZ1O11WRgdyB8BjZ/lXAEVIcr2BgkXlegESF8RrJNHq9oK5tmqqIQKYQhrGaHMDAohDfgeQaBhYF+QxkMtFgvEoyjV4vqAtNIxUFiG7MWEF4NuVinZGIZwQqAhBdN5XF1DaWZwTKOxBdN5XFbGoJ4VW/lfIMxJcxYym1MNqB5baVyiuQ2wnDeJ0wjGUk0+j1gto1tgPrEPc+rJRHIJPwE0YH8EH1t922lcsbkEmEYXQiLg4GakNcPHQJQx2nOoAPpd/32FYwT0DGIy5lN4LRj/RhDAA+UuKoV5wjKy9AJtDcM9KAsZzabmog8Kkm3l7biuYByDjE/QTZjjcIw1iKXSNHDeoMbiDweZ24tg+Lew/EVxjHAZ81iL/ftsI+A9HBWE/tURUVxB1Mn2D0Af/YVtpXIGMJw3iX9GGsITyAb4yQ7oBtxX0EEhXGQgv704DRR3VrgY18A6KD8R7pw1AXmgOAjw3SH7RtAJ+A6NYZa6ndDNkPcY/aJQx1zACxA9ckD5NtdTXyBcgYonnGAgub43hGIFMgPbYN4QMQ3WxqHbWeUUHs2XAJQx0zZJkCOaTPprmyBjKaMIwNwFFSnArwnIWtpp4hr21UmQLps2kMLApJEkheYEALABmNmInkAQbYAaloc2qiLIDcSBjG+4RhzLewzwUMsAOSi8eA8ggD7IBY3VdPE8j1+NFNNZpN1ZMNEBPgQAKPrBjqW8TuIVkdHG6cCuJwl+kObehEbDWzXicYKBdjyNnATiXPjcAxCBiuuylTzwhk4yFWByinAeQa5fN5wC4l3x0WtpgE3eUQE9kAOdq0kLS6rGXA49LnzcAVwC/Sd4Mdlt+J2KeeRjcVW649ZKCUdh61/er5wK8WNqTpGYFsPGSAaSFpeMhQ6f/7qD3q6GvCnpKkcuUZkD4QEJv25SOPtiKOSlJnX3HVidgjniUM41lWGkB0hwVPBRZJ5W9CnM6WFBQfYIBF+2YFBMTuWHmr8ibgauJDWYMfMMBTIGqXJWsa4h5HYMdXwOXYjym5GzN0cj3LinKA1yLiz76Smk3Vk80s60SbglwCOdkgX/XUT93iMSsYYAfkJNNCXHdZJqf/T0NcOgmgbEacGrqrSbo1FKCbCuQaiOk7MmYAT0ufv0GsU3bWiV+IMUOWayCNBvR6mkktlC6Ep6hQfJnaJiofgYAYp+Sj77qAK6mea0tBYQRyOahvschfDo8p+Q0FnsX9AK5TKoM6FoVEBdKGeL41DpA+GhyFl7JyP8saQjLvw5iDODStJeTS9W3Gj93A94hXlm5BzLK2V/+2hLIA0oN471IX4h57VzVsRbxHtqXlEsjxiBelbEU0+HcIANuI8ah+K8jlLKtIyv2gXspCJRDPVALxTCUQz1QC8UwlEM9UAvFMJRDPZLNSH4XlU90517A0CrF5XUWp6BoE/GGSoOyyPFMJxDOVQDxTCcQzlUA8UwnEM5VAPFMJxDOVQDxTCcQzlUA803/H/wMCQc/m8gAAAABJRU5ErkJggg=="
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = function(map, position) {
	var o = this
	if(position) { o.position = position } else { o.position = 'topright' }
	var btn = L.Control.extend({
		options: {
		  position: 'topright'
		},
		onAdd: function(map) {
		 var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom')
			initContainerStyle(container)
			o.container = container
			return container
		}
	})
	o.map = map
	o.btn = new btn()

// VISIBILITY
	o.shown = false
	o.show = function() {
		o.map.addControl(o.btn)
		o.shown = true
	}
	o.hide = function() {
		o.map.removeControl(o.btn)
		o.shown = false
	}
	o.toggle = function() {
		if(o.shown) { o.hide() } else { o.show() }
	}

// CONTENT
	o.setCtrl = function(fn) {
		fn()
	}
	o.setHTML = function(html) {
		o.container.innerHTML = html
	}
	o.setHTMLcb = function(html, callback) {
		o.container.innerHTML = html
		callback()
	}
	o.setContent = function(html, fn, style) {
		o.show()
		o.setHTMLcb(html, function() {
			if(fn) { o.setCtrl(fn) }
			if(style) { o.setStyle(style) }
		})	
	}

	o.setStyle = function(style) {
		setContainerStyle(o.container, style)
	}
}

function setContainerStyle(container, style) {
	if(style) {
		for(k in style) {
			container.style[k] = style[k]
		}
	}
}

function initContainerStyle(container) {
	container.style.backgroundColor = 'white'    
	container.style.width = '100%'
	container.style.height = '100%'
}


/***/ }),
/* 44 */
/***/ (function(module, exports) {

exports.toFeat = function(p1, p2) { return toFeat(p1, p2) }
exports.toBbox = function(p1, p2) { return toBbox(p1, p2) }

function toFeat(start, end) {
	var c = getXY(start, end)
	return {
		type: 'Feature',
		properties: {},
		geometry: {
			type: 'Polygon',
			coordinates: [[
				[c.x0, c.y0],
				[c.x0, c.y1],
				[c.x1, c.y1],
				[c.x1, c.y0],
				[c.x0, c.y0]
			]]
		}
	}
}

function toBbox(start, end) {
	var c = getXY(start, end)
	return [c.x0, c.y0, c.x1, c.y1]
}

function getXY(start, end) {
	if(start.lng < end.lng) { var x0 = start.lng; var x1 = end.lng }
	else { var x1 = start.lng; var x0 = end.lng }
	if(start.lat < end.lat) { var y0 = start.lat; var y1 = end.lat }
	else { var y1 = start.lat; var y0 = end.lat }
	return { x0: x0, x1: x1, y0: y0, y1: y1 }
}


/***/ })
]);