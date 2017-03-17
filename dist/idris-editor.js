/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length)
/******/ 			resolves.shift()();
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return Promise.resolve();
/******/
/******/ 		// an Promise means "currently loading".
/******/ 		if(installedChunks[chunkId]) {
/******/ 			return installedChunks[chunkId][2];
/******/ 		}
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + chunkId + ".idris-editor.js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunks[chunkId][2] = promise;
/******/
/******/ 		head.appendChild(script);
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var El = __webpack_require__(9)

exports.create = function(el) {
	var element = new El(el)
	return element
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

exports.write = function(m) {
	var p = document.getElementById('msg')
	p.innerHTML = m
}

exports.add = function(m) {
	var p = document.getElementById('msg')
	var c = p.innerHTML
	p.innerHTML = c + '<br/>' + m
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var msg = __webpack_require__(2)
var json = __webpack_require__(13)
var geojson = __webpack_require__(14)

module.exports = function(file, evt) {
	msg.write('Verifying document...')
	if(isJSON(file)) {
		json(file, function(data) {
			isGeoJSON(data, function(isValid) {
				if(isValid) {
					var name = getName(file)
					evt.emit('geojson-parsed', data)
				}
			})
		})
	}
}

function getName(file) {
	var spl = file.name.split('.')
	var n = ''
	spl.forEach(function(s, i) {
		if(i < spl.length-1) {
			if(i === 0) { n = s }
			else { n = n + '-' + s }
		}
	})
	return n
}

function isGeoJSON(data, callback) {
	geojson(data, function(isValid, errors) {
		if(isValid) { 
			msg.write('Document is a valid GeoJSON')
			callback(true)
		} else {
			msg.add('Document is not a valid GeoJSON')
			msg.add('Errors: ')
			errors.forEach(function(err) { 
				if(typeof err !== 'String') { err = err.toString() }
				msg.add(err) 
			})
			callback(false)
		}
	})
}

function isJSON(file) {
	var fileSplit = file.name.split('.')
	var fileType = fileSplit[fileSplit.length -1]
	if(fileType === 'json' || fileType === 'geojson') {
		msg.write('Document is a JSON file')
		msg.add('Verifying if it is a valid GeoJSON file...')
		return true
	} else {
		msg.write('Document is not a JSON file')
		return false
	}

/* ANDROID ????
	if(file.type === 'application/json') {
		msg.write('Document is a JSON file')
		msg.add('Verifying if it is a valid GeoJSON file...')
		return true
	} else {
		msg.write('Document is not a JSON file')
		return false
	}
*/
}

function isTooBig(file) {
	var s = file.size
	if(s > 21000000) {
		msg.write('The document is bigger than 20Mb.')
		msg.add('Try to \"simplify\" it.')
		msg.add('There is an online tool (not related to \"Idris maps\") that lets you do that:')
		msg.add('<a href="http://mapshaper.org/">Mapshaper</a>')	
		return true
	} else {
		return false
	}
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var xml = __webpack_require__(0)

module.exports = function(state) {
	html(function() {
		ctrl(state)
	})
}

function html(callback) {
	var root = xml.create('div')
	root.c('button').a({ id: 'bbox-draw' }).d('Draw bounding box')
	root.c('button').a({ id: 'bbox-vals' }).d('Enter values')
	document.getElementById('root').innerHTML = root.inner()
	callback()
}

function ctrl(state) {
	addClick('bbox-draw', state)
	addClick('bbox-vals', state)
}

function addClick(id, state) {
	var el = document.getElementById(id)
	el.onclick = function() { 
		state.page = id
		state.evt.emit(id, state)
	}
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var xml = __webpack_require__(0)

module.exports = function(state) {
	html(state.newdata.features.length, function() {
		ctrl(state)
	})
}

function html(n, callback) {
	var root = xml.create('div')
	root.c('p').d('The new version has ' + n + ' features.')
	var p = root.c('p')
	p.c('b').d('Continue editing')
	root.c('button').a({ id: 'continue-same' }).d('The original file')
	root.c('button').a({ id: 'continue-new' }).d('The edited file')
	document.getElementById('root').innerHTML = root.inner()
	callback()
}

function ctrl(state) {
	document.getElementById('continue-same').onclick = function() {
		state.newdata = undefined
		state.page = 'cancel'
		state.evt.emit('cancel', state)
	}
	document.getElementById('continue-new').onclick = function() {
		var nd = state.newdata
		state.data = nd
		state.newdata = undefined
		state.page = 'cancel'	
		state.evt.emit('cancel', state)	
	}
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var html = __webpack_require__(11)
var init = __webpack_require__(12)
var verify = __webpack_require__(4)
var Emitter = __webpack_require__(1).EventEmitter

module.exports = function(divId, callback) {
	var evt = new Emitter()
	html.init(divId, function() {
		init(evt)
		var browseBtn = document.getElementById('browse-btn')
		var input = document.getElementById('file-input')
		input.onchange = function(e) {
			verify(input.files[0], evt)
		}
		browseBtn.onclick = function() {
			input.click()
		}
	})
	evt.on('geojson-parsed', function(data) { callback(data) })
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var html = __webpack_require__(17)
var ctrl = __webpack_require__(16)
module.exports = function(state) {
	html(function() {
		ctrl(state)
	})
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(el) {
	var element = new El(el)
	return element
}

function El(el) {
	var self = this
	self.el = el

	self.childs = []
	self.child = function(childEl) {
		var newChild = new El(childEl)
		self.childs.push(newChild)
		return newChild
	}
	self.c = function(childEl) {
		return self.child(childEl)
	}

	self.attrs = {}
	self.attr = function(o) { 
		self.attrs = o
	 return self 
	}
	self.a = function(o) {
		return self.attr(o)
	}

	self.content = undefined
	self.data = function(x) {
		self.content = x
	}
	self.d = function(x) {
		self.content = x
	}

	self.inner = function() {
		var str = ''
		self.childs.forEach(function(child) {
			str = str + child.outer()
		})	
		return str	
	}
	self.outer = function() {
		var str = '<' + self.el + attrString(self.attrs) + '>'
		if(self.content !== undefined) {
			str = str + self.content
		}
		str = str	+ self.inner() + '</' + self.el + '>'
		return str
	}
	return self
}

function attrString(o) {
	var str = ''
	for(k in o) {
		str = str + ' ' + k + '="' + o[k] + '"'
	}
	return str
}


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var xml = __webpack_require__(0)

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


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var msg = __webpack_require__(2)
var verify = __webpack_require__(4)

module.exports = function(evt) {
	if(window.FileReader) {
		var dz = document.getElementById('drop-zone')
		rmDefault(dz)
		dz.ondrop = function(e) { whenDrop(e, evt) }
	} else {
		msg.write('Your browser does not support the HTML5 FileReader.')
	}
}

function whenDrop(e, evt) {
	e.preventDefault()
	verify(e.dataTransfer.files[0], evt)
}

function rmDefault(el) {
	el.ondragover = function(e) {
		e.preventDefault()
		return false
	}
	el.ondragenter = function(e) {
		e.preventDefault()
		return false
	}
}



/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(file, callback) {
	var reader = new FileReader()
	reader.onload = function() {
		callback(JSON.parse(reader.result))
	}
	reader.readAsText(file)
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var GJV = __webpack_require__(15)

module.exports = function(json, callback) {
	if(json.type !== 'FeatureCollection') {
		callback(false, ['The file is not a GeoJSON FeatureCollection'])
	} else {
		GJV.valid(json, function(isValid, errors) {
			callback(isValid, errors)
		})
	}
} 


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
* geoJSON validation according to the GeoJSON spefication Version 1
* @module geoJSONValidation
* @class Main
* @exports {GJV} 
*/

(function(exports){

    var definitions = {};

    /**
     * Test an object to see if it is a function
     * @method isFunction 
     * @param object {Object}
     * @return {Boolean}
     */
    function isFunction(object) {
        return typeof(object) == 'function';
    }
    
    /**
     * A truthy test for objects
     * @method isObject
     * @param {Object}
     * @return {Boolean}
     */
    function isObject(object) {
        return object === Object(object);
    }

    /**
     * Formats error messages, calls the callback
     * @method done
     * @private
     * @param cb {Function} callback
     * @param [message] {Function} callback
     * @return {Boolean} is the object valid or not?
     */
    function _done(cb, message){
        var valid = false;

        if(typeof message === "string"){
            message = [message];

        }else if( Object.prototype.toString.call( message ) === '[object Array]' ) {
            if(message.length === 0){
                valid = true;
            }
        }else{
            valid = true;
        }

        if( isFunction(cb)){
            if(valid){
                cb(valid, []);
            }else{
                cb(valid, message);
            }
        }

        return valid;
    }

    /**
     * calls a custom definition if one is avalible for the given type
     * @method _customDefinitions 
     * @private
     * @param type {"String"} a GeoJSON object type
     * @param object {Object} the Object being tested 
     * @return {Array} an array of errors
     */
    function _customDefinitions(type, object){

        var errors;

        if(isFunction(definitions[type])){
            try{
                errors = definitions[type](object);
            }catch(e){
                errors = ["Problem with custom definition for '" + type + ": " + e];
            }
            if(typeof result === "string"){
                errors = [errors];
            }
            if(Object.prototype.toString.call( errors ) === '[object Array]'){
                return errors;
            }
        }
        return [];
    }

    /**
     * Define a custom validation function for one of GeoJSON objects
     * @method define 
     * @param type {GeoJSON Type} the type 
     * @param definition {Function} A validation function
     * @return {Boolean} Return true if the function was loaded corectly else false
     */
    exports.define = function(type, definition){
        if((type in all_types) && isFunction(definition)){
            //TODO: check to see if the type is valid
            definitions[type] = definition;
            return true;
        }
        return false;
    };

    /**
     * Determines if an object is a position or not
     * @method isPosition 
     * @param position {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isPosition = function(position, cb){

        var errors = [];

        //It must be an array
        if(Array.isArray(position)){
            //and the array must have more than one element
            if(position.length <= 1){
                errors.push("Position must be at least two elements");
            }
        }else{
            errors.push("Position must be an array");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("Position", position));

        return _done(cb, errors);
    };

    /**
     * Determines if an object is a GeoJSON Object or not
     * @method isGeoJSONObject|valid
     * @param geoJSONObject {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isGeoJSONObject = exports.valid = function(geoJSONObject, cb){

        if(!isObject(geoJSONObject)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];
        if('type' in geoJSONObject){
            if(non_geo_types[geoJSONObject.type]){
                return non_geo_types[geoJSONObject.type](geoJSONObject, cb);
            }else if(geo_types[geoJSONObject.type]){
                return geo_types[geoJSONObject.type](geoJSONObject, cb);
            }else{
                errors.push('type must be one of: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "Feature", or "FeatureCollection"');
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("GeoJSONObject", geoJSONObject));
        return _done(cb, errors);
    };

    /**
     * Determines if an object is a Geometry Object or not
     * @method isGeometryObject
     * @param geometryObject {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isGeometryObject = function(geometryObject, cb){

        if(!isObject(geometryObject)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('type' in geometryObject){
            if(geo_types[geometryObject.type]){
                return geo_types[geometryObject.type](geometryObject, cb);
            }else{
                errors.push('type must be one of: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon" or "GeometryCollection"');
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("GeometryObject", geometryObject));
        return _done(cb, errors);
    };

    /**
     * Determines if an object is a Point or not
     * @method isPoint
     * @param point {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isPoint = function(point, cb) {

        if(!isObject(point)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in point){
            exports.isBbox(point.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in point){
            if(point.type !== "Point"){
                errors.push("type must be 'Point'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('coordinates' in point){
            exports.isPosition(point.coordinates, function(valid, err){
                if(!valid){
                    errors.push('Coordinates must be a single position');
                }
            });
        }else{
            errors.push("must have a member with the name 'coordinates'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("Point", point));

        return _done(cb, errors);
    };

    /**
     * Determines if an array can be interperted as coordinates for a MultiPoint
     * @method isMultiPointCoor
     * @param coordinates {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isMultiPointCoor = function(coordinates, cb) {

        var errors = [];

        if(Array.isArray(coordinates)){
            coordinates.forEach(function(val, index){
                exports.isPosition(val, function(valid, err){
                    if(!valid){
                        //modify the err msg from "isPosition" to note the element number
                        err[0] = "at "+ index+ ": ".concat(err[0]);
                        //build a list of invalide positions
                        errors = errors.concat(err);
                    }
                });
            });
        }else{
            errors.push("coordinates must be an array");
        }

        return _done(cb, errors);
    };
    /**
     * Determines if an object is a MultiPoint or not
     * @method isMultiPoint
     * @param position {Object}
     * @param cb {Function} the callback
     * @return {Boolean}
     */
    exports.isMultiPoint = function(multiPoint, cb) {

        if(!isObject(multiPoint)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in multiPoint){
            exports.isBbox(multiPoint.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in multiPoint){
            if(multiPoint.type !== "MultiPoint"){
                errors.push("type must be 'MultiPoint'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('coordinates' in multiPoint){
            exports.isMultiPointCoor(multiPoint.coordinates, function(valid, err){
                if(!valid){
                    errors =  errors.concat(err);
                }
            });
        }else{
            errors.push("must have a member with the name 'coordinates'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("MultiPoint", multiPoint));

        return _done(cb, errors);
    };

    /**
     * Determines if an array can be interperted as coordinates for a lineString
     * @method isLineStringCoor
     * @param coordinates {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isLineStringCoor = function(coordinates, cb) {

        var errors = [];
        if(Array.isArray(coordinates)){
            if(coordinates.length > 1){
                coordinates.forEach(function(val, index){
                    exports.isPosition(val, function(valid, err){
                        if(!valid){
                            //modify the err msg from "isPosition" to note the element number
                            err[0] = "at "+ index+ ": ".concat(err[0]);
                            //build a list of invalide positions
                            errors = errors.concat(err);
                        }
                    });
                });
            }else{
                errors.push("coordinates must have at least two elements");
            }
        }else{
            errors.push( "coordinates must be an array");
        }

        return _done(cb, errors);
    };

    /**
     * Determines if an object is a lineString or not
     * @method isLineString
     * @param lineString {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isLineString = function(lineString, cb){

        if(!isObject(lineString)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in lineString){
            exports.isBbox(lineString.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in lineString){
            if(lineString.type !== "LineString"){
                errors.push("type must be 'LineString'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('coordinates' in lineString){
            exports.isLineStringCoor(lineString.coordinates, function(valid, err){
                if(!valid){
                    errors =  errors.concat(err);
                }
            });
        }else{
            errors.push("must have a member with the name 'coordinates'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("LineString", lineString));

        return _done(cb, errors);
    };

    /**
     * Determines if an array can be interperted as coordinates for a MultiLineString
     * @method isMultiLineStringCoor
     * @param coordinates {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isMultiLineStringCoor = function(coordinates, cb) {
        var errors = [];
        if(Array.isArray(coordinates)){
            coordinates.forEach(function(val, index){
                exports.isLineStringCoor(val, function(valid, err){
                    if(!valid){
                        //modify the err msg from "isPosition" to note the element number
                        err[0] = "at "+ index+ ": ".concat(err[0]);
                        //build a list of invalide positions
                        errors = errors.concat(err);
                    }
                });
            });
        }else{
            errors.push("coordinates must be an array");
        }
        _done(cb, errors);
    };

    /**
     * Determines if an object is a MultiLine String or not
     * @method isMultiLineString
     * @param multilineString {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isMultiLineString = function(multilineString, cb){

        if(!isObject(multilineString)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in multilineString){
            exports.isBbox(multilineString.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in multilineString){
            if(multilineString.type !== "MultiLineString"){
                errors.push("type must be 'MultiLineString'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('coordinates' in multilineString){
            exports.isMultiLineStringCoor(multilineString.coordinates, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }else{
            errors.push("must have a member with the name 'coordinates'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("MultiPoint", multilineString));

        return _done(cb, errors);
    };

    /**
     * Determines if an array is a linear Ring String or not
     * @method isMultiLineString
     * @private
     * @param coordinates {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    function _linearRingCoor(coordinates, cb) {

        var errors = [];
        if(Array.isArray(coordinates)){
            //4 or more positions

            coordinates.forEach(function(val, index){
                exports.isPosition(val, function(valid, err){
                    if(!valid){
                        //modify the err msg from "isPosition" to note the element number
                        err[0] = "at "+ index+ ": ".concat(err[0]);
                        //build a list of invalide positions
                        errors = errors.concat(err);
                    }
                });
            });

            // check the first and last positions to see if they are equivalent
            // TODO: maybe better checking?
            if(coordinates[0].toString() !== coordinates[coordinates.length -1 ].toString()){
                errors.push( "The first and last positions must be equivalent");
            }

            if(coordinates.length < 4){
                errors.push("coordinates must have at least four positions");
            }
        }else{
            errors.push("coordinates must be an array");
        }

        return _done(cb, errors);
    }

    /**
     * Determines if an array is valid Polygon Coordinates or not
     * @method _polygonCoor
     * @private
     * @param coordinates {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isPolygonCoor = function (coordinates, cb){

        var errors = [];
        if(Array.isArray(coordinates)){
            coordinates.forEach(function(val, index){
                _linearRingCoor(val, function(valid, err){
                    if(!valid){
                        //modify the err msg from "isPosition" to note the element number
                        err[0] = "at "+ index+ ": ".concat(err[0]);
                        //build a list of invalid positions
                        errors = errors.concat(err);
                    }
                });
            });
        }else{
            errors.push("coordinates must be an array");
        }

        return _done(cb, errors);
    };

    /**
     * Determines if an object is a valid Polygon
     * @method isPolygon
     * @param polygon {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isPolygon = function(polygon, cb){

        if(!isObject(polygon)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in polygon){
            exports.isBbox(polygon.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in polygon){
            if(polygon.type !== "Polygon"){
                errors.push("type must be 'Polygon'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('coordinates' in polygon){
            exports.isPolygonCoor(polygon.coordinates, function(valid, err) {
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }else{
            errors.push("must have a member with the name 'coordinates'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("Polygon", polygon));

        return _done(cb, errors);
    };

    /**
     * Determines if an array can be interperted as coordinates for a MultiPolygon
     * @method isMultiPolygonCoor
     * @param coordinates {Array}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isMultiPolygonCoor = function(coordinates, cb) {
        var errors = [];
        if(Array.isArray(coordinates)){
            coordinates.forEach(function(val, index){
                exports.isPolygonCoor(val, function(valid, err){
                    if(!valid){
                        //modify the err msg from "isPosition" to note the element number
                        err[0] = "at "+ index+ ": ".concat(err[0]);
                        //build a list of invalide positions
                        errors = errors.concat(err);
                    }
                });
            });
        }else{
            errors.push("coordinates must be an array");
        }

        _done(cb, errors);
    };

    /**
     * Determines if an object is a valid MultiPolygon
     * @method isMultiPolygon
     * @param multiPolygon {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isMultiPolygon = function(multiPolygon, cb){

        if(!isObject(multiPolygon)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in multiPolygon){
            exports.isBbox(multiPolygon.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in multiPolygon){
            if(multiPolygon.type !== "MultiPolygon"){
                errors.push("type must be 'MultiPolygon'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('coordinates' in multiPolygon){
            exports.isMultiPolygonCoor(multiPolygon.coordinates, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }else{
            errors.push("must have a member with the name 'coordinates'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("MultiPolygon", multiPolygon));

        return _done(cb, errors);
    };

    /**
     * Determines if an object is a valid Geometry Collection
     * @method isGeometryCollection
     * @param geometryCollection {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isGeometryCollection = function(geometryCollection, cb){

        if(!isObject(geometryCollection)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in geometryCollection){
            exports.isBbox(geometryCollection.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in geometryCollection){
            if(geometryCollection.type !== "GeometryCollection"){
                errors.push("type must be 'GeometryCollection'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('geometries' in geometryCollection){
            if(Array.isArray(geometryCollection.geometries)){
                geometryCollection.geometries.forEach(function(val, index){
                    exports.isGeometryObject(val, function(valid, err){
                        if(!valid){
                            //modify the err msg from "isPosition" to note the element number
                            err[0] = "at "+ index+ ": ".concat(err[0]);
                            //build a list of invalide positions
                            errors = errors.concat(err);
                        }
                    });
                });
            }else{
                errors.push("'geometries' must be an array");
            }
        }else{
            errors.push("must have a member with the name 'geometries'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("GeometryCollection", geometryCollection));

        return _done( cb, errors);
    };

    /**
     * Determines if an object is a valid Feature
     * @method isFeature
     * @param feature {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isFeature = function(feature, cb){

        if(!isObject(feature)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in feature){
            exports.isBbox(feature.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in feature){
            if(feature.type !== "Feature"){
                errors.push("type must be 'feature'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if(!('properties' in feature)){
            errors.push("must have a member with the name 'properties'");
        }

        if('geometry' in feature){
            if(feature.geometry !== null){
                exports.isGeometryObject(feature.geometry, function(valid, err){
                    if(!valid){
                        errors = errors.concat(err);
                    }
                });
            }
        }else{
            errors.push("must have a member with the name 'geometry'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("Feature", feature));

        return _done(cb, errors);
    };

    /**
     * Determines if an object is a valid Feature Collection
     * @method isFeatureCollection
     * @param featureCollection {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isFeatureCollection = function(featureCollection, cb){

        if(!isObject(featureCollection)){
            return _done(cb, ['must be a JSON Object']);
        }

        var errors = [];

        if('bbox' in featureCollection){
            exports.isBbox(featureCollection.bbox, function(valid, err){
                if(!valid){
                    errors = errors.concat(err);
                }
            });
        }

        if('type' in featureCollection){
            if(featureCollection.type !== "FeatureCollection"){
                errors.push("type must be 'FeatureCollection'");
            }
        }else{
            errors.push("must have a member with the name 'type'");
        }

        if('features' in featureCollection){
            if(Array.isArray(featureCollection.features)){
                featureCollection.features.forEach(function(val, index){
                    exports.isFeature(val, function(valid, err){
                        if(!valid){
                            //modify the err msg from "isPosition" to note the element number
                            err[0] = "at "+ index+ ": ".concat(err[0]);
                            //build a list of invalide positions
                            errors = errors.concat(err);
                        }
                    });
                });
            }else{
                errors.push("'features' must be an array");
            }
        }else{
            errors.push("must have a member with the name 'features'");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("FeatureCollection", featureCollection));

        return _done(cb, errors);
    };

    /**
     * Determines if an object is a valid Bounding Box
     * @method isBbox
     * @param bbox {Object}
     * @param [cb] {Function} the callback
     * @return {Boolean}
     */
    exports.isBbox = function(bbox, cb){
        var errors = [];
        if(Array.isArray(bbox)){
            if(bbox.length % 2 !== 0){
                errors.push("bbox, must be a 2*n array");
            }
        }else{
            errors.push("bbox must be an array");
        }

        //run custom checks
        errors = errors.concat(_customDefinitions("Bbox", bbox));

        _done(cb,errors);
    };

    var non_geo_types = {
        "Feature": exports.isFeature,
        "FeatureCollection": exports.isFeatureCollection
    },

    geo_types = {
        "Point": exports.isPoint,
        "MultiPoint": exports.isMultiPoint,
        "LineString": exports.isLineString,
        "MultiLineString": exports.isMultiLineString,
        "Polygon": exports.isPolygon,
        "MultiPolygon": exports.isMultiPolygon,
        "GeometryCollection": exports.isGeometryCollection,
    },

    all_types = {
        "Feature": exports.isFeature,
        "FeatureCollection": exports.isFeatureCollection,
        "Point": exports.isPoint,
        "MultiPoint": exports.isMultiPoint,
        "LineString": exports.isLineString,
        "MultiLineString": exports.isMultiLineString,
        "Polygon": exports.isPolygon,
        "MultiPolygon": exports.isMultiPolygon,
        "GeometryCollection": exports.isGeometryCollection,
        "Bbox": exports.isBox,
        "Position": exports.isPosition,
        "GeoJSON": exports.isGeoJSONObject,
        "GeometryObject": exports.isGeometryObject
    };

    exports.all_types = all_types;

})( false? this['GJV']={}: exports);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(state) {
	var selB = addClick('select-by-bbox', state)
	var selP = addClick('select-by-prop', state)
	var selC = addClick('select-by-click', state)
	var pA = addClick('prop-add', state)
	var pR = addClick('prop-rem', state)
}

function addClick(id, state) {
	var el = document.getElementById(id)
	el.onclick = function() { 
		state.page = id
		state.evt.emit(id, state) 
	}
	return el
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var xml = __webpack_require__(0)

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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var drop = __webpack_require__(7)
var mainMenu = __webpack_require__(8)
var bboxMenu = __webpack_require__(5)
var continuePrompt = __webpack_require__(6)

var Emitter = __webpack_require__(1).EventEmitter
var evt = new Emitter()
var state = { evt: evt }

window.onload = function() {
	init(state)
}

state.evt.on('got-data', function(state) { mainMenu(state) })
state.evt.on('select-by-bbox', function(state) { bboxMenu(state) })
state.evt.on('select-by-prop', function(state) { console.log(state) })
state.evt.on('select-by-click', function(state) { console.log(state) })
state.evt.on('prop-add', function(state) { console.log(state) })
state.evt.on('prop-rem', function(state) { console.log(state) })
state.evt.on('bbox-draw', function(state) {
	__webpack_require__.e/* require.ensure */(0).then((function(require) {
		var bboxDraw = __webpack_require__(3) 
		bboxDraw(state)
	}).bind(null, __webpack_require__)).catch(__webpack_require__.oe)
})
state.evt.on('bbox-vals', function(state) { console.log(state) })
state.evt.on('cancel', function(state) { mainMenu(state) })
state.evt.on('continue', function(state) { console.log('continue'); continuePrompt(state) })

function init(state) {
	drop('root', function(data) {
		state.page = 'geojson-loaded'
		state.data = data
		state.evt.emit('got-data', state)
	})
}


/***/ })
/******/ ]);