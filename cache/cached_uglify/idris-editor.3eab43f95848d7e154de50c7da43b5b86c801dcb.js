!function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n=window.webpackJsonp;window.webpackJsonp=function(e,o,r){for(var s,u,c=0,a=[];c<e.length;c++)u=e[c],i[u]&&a.push(i[u][0]),i[u]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s]);for(n&&n(e,o,r);a.length;)a.shift()()};var o={},i={1:0};e.e=function(t){function n(){r.onerror=r.onload=null,clearTimeout(s);var e=i[t];0!==e&&(e&&e[1](new Error("Loading chunk "+t+" failed.")),i[t]=void 0)}if(0===i[t])return Promise.resolve();if(i[t])return i[t][2];var o=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.charset="utf-8",r.async=!0,r.timeout=12e4,e.nc&&r.setAttribute("nonce",e.nc),r.src=e.p+""+t+".idris-editor.js";var s=setTimeout(n,12e4);r.onerror=r.onload=n;var u=new Promise(function(e,n){i[t]=[e,n]});return i[t][2]=u,o.appendChild(r),u},e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e.oe=function(t){throw console.error(t),t},e(e.s=18)}([function(t,e){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function o(t){return"function"==typeof t}function i(t){return"number"==typeof t}function r(t){return"object"==typeof t&&null!==t}function s(t){return void 0===t}t.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(t){if(!i(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},n.prototype.emit=function(t){var e,n,i,u,c,a;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var l=new Error('Uncaught, unspecified "error" event. ('+e+")");throw l.context=e,l}if(n=this._events[t],s(n))return!1;if(o(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:u=Array.prototype.slice.call(arguments,1),n.apply(this,u)}else if(r(n))for(u=Array.prototype.slice.call(arguments,1),a=n.slice(),i=a.length,c=0;c<i;c++)a[c].apply(this,u);return!0},n.prototype.addListener=function(t,e){var i;if(!o(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,o(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(i=s(this._maxListeners)?n.defaultMaxListeners:this._maxListeners)&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(t,e){function n(){this.removeListener(t,n),i||(i=!0,e.apply(this,arguments))}if(!o(e))throw TypeError("listener must be a function");var i=!1;return n.listener=e,this.on(t,n),this},n.prototype.removeListener=function(t,e){var n,i,s,u;if(!o(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(n=this._events[t],s=n.length,i=-1,n===e||o(n.listener)&&n.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(n)){for(u=s;u-- >0;)if(n[u]===e||n[u].listener&&n[u].listener===e){i=u;break}if(i<0)return this;1===n.length?(n.length=0,delete this._events[t]):n.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},n.prototype.removeAllListeners=function(t){var e,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[t],o(n))this.removeListener(t,n);else if(n)for(;n.length;)this.removeListener(t,n[n.length-1]);return delete this._events[t],this},n.prototype.listeners=function(t){return this._events&&this._events[t]?o(this._events[t])?[this._events[t]]:this._events[t].slice():[]},n.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(o(e))return 1;if(e)return e.length}return 0},n.listenerCount=function(t,e){return t.listenerCount(e)}},function(t,e,n){var o=n(9);e.create=function(t){return new o(t)}},function(t,e){e.write=function(t){document.getElementById("msg").innerHTML=t},e.add=function(t){var e=document.getElementById("msg"),n=e.innerHTML;e.innerHTML=n+"<br/>"+t}},,function(t,e,n){function o(t){var e=t.name.split("."),n="";return e.forEach(function(t,o){o<e.length-1&&(n=0===o?t:n+"-"+t)}),n}function i(t,e){c(t,function(t,n){t?(s.write("Document is a valid GeoJSON"),e(!0)):(s.add("Document is not a valid GeoJSON"),s.add("Errors: "),n.forEach(function(t){"String"!=typeof t&&(t=t.toString()),s.add(t)}),e(!1))})}function r(t){var e=t.name.split("."),n=e[e.length-1];return"json"===n||"geojson"===n?(s.write("Document is a JSON file"),s.add("Verifying if it is a valid GeoJSON file..."),!0):(s.write("Document is not a JSON file"),!1)}var s=n(2),u=n(13),c=n(14);t.exports=function(t,e){s.write("Verifying document..."),r(t)&&u(t,function(n){i(n,function(i){if(i){o(t);e.emit("geojson-parsed",n)}})})}},function(t,e,n){function o(t){var e=s.create("div");e.c("button").a({id:"bbox-draw"}).d("Draw bounding box"),e.c("button").a({id:"bbox-vals"}).d("Enter values"),document.getElementById("root").innerHTML=e.inner(),t()}function i(t){r("bbox-draw",t),r("bbox-vals",t)}function r(t,e){document.getElementById(t).onclick=function(){e.page=t,e.evt.emit(t,e)}}var s=n(1);t.exports=function(t){o(function(){i(t)})}},function(t,e,n){function o(t,e){var n=r.create("div");n.c("p").d("The new version has "+t+" features."),n.c("p").c("b").d("Continue editing"),n.c("button").a({id:"continue-same"}).d("The original file"),n.c("button").a({id:"continue-new"}).d("The edited file"),document.getElementById("root").innerHTML=n.inner(),e()}function i(t){document.getElementById("continue-same").onclick=function(){t.newdata=void 0,t.page="cancel",t.evt.emit("cancel",t)},document.getElementById("continue-new").onclick=function(){var e=t.newdata;t.data=e,t.newdata=void 0,t.page="cancel",t.evt.emit("cancel",t)}}var r=n(1);t.exports=function(t){o(t.newdata.features.length,function(){i(t)})}},function(t,e,n){var o=n(11),i=n(12),r=n(10),s=n(0).EventEmitter;t.exports=function(t,e){var n=new s;o.init(t,function(){i(n),document.getElementById("browse-btn").onclick=function(){o.browse(t,function(){r(n)})}}),n.on("geojson-parsed",function(t){e(t)})}},function(t,e,n){var o=n(17),i=n(16);t.exports=function(t){o(function(){i(t)})}},function(t,e){function n(t){var e=this;return e.el=t,e.childs=[],e.child=function(t){var o=new n(t);return e.childs.push(o),o},e.c=function(t){return e.child(t)},e.attrs={},e.attr=function(t){return e.attrs=t,e},e.a=function(t){return e.attr(t)},e.content=void 0,e.data=function(t){e.content=t},e.d=function(t){e.content=t},e.inner=function(){var t="";return e.childs.forEach(function(e){t+=e.outer()}),t},e.outer=function(){var t="<"+e.el+o(e.attrs)+">";return void 0!==e.content&&(t+=e.content),t=t+e.inner()+"</"+e.el+">"},e}function o(t){var e="";for(k in t)e=e+" "+k+'="'+t[k]+'"';return e}t.exports=function(t){return new n(t)}},function(t,e,n){var o=(n(2),n(4));t.exports=function(t){var e=document.getElementById("file-input");e.onchange=function(n){o(e.files[0],t)}}},function(t,e){e.init=function(t,e){document.getElementById(t).innerHTML='<div id="drop-zone"></div><p id="msg"></p><button id="browse-btn">Browse the file system</button>',e()},e.browse=function(t,e){document.getElementById(t).innerHTML='<p id="msg">Load a GeoJSON file</p><input id="file-input" type="file"></input>',e()}},function(t,e,n){function o(t,e){t.preventDefault(),s(t.dataTransfer.files[0],e)}function i(t){t.ondragover=function(t){return t.preventDefault(),!1},t.ondragenter=function(t){return t.preventDefault(),!1}}var r=n(2),s=n(4);t.exports=function(t){if(window.FileReader){var e=document.getElementById("drop-zone");i(e),e.ondrop=function(e){o(e,t)},r.write("Drop a GeoJSON file"),r.add("or")}else r.write("Your browser does not support the HTML5 FileReader.")}},function(t,e){t.exports=function(t,e){var n=new FileReader;n.onload=function(){e(JSON.parse(n.result))},n.readAsText(t)}},function(t,e,n){var o=n(15);t.exports=function(t,e){"FeatureCollection"!==t.type?e(!1,["The file is not a GeoJSON FeatureCollection"]):o.valid(t,function(t,n){e(t,n)})}},function(t,e,n){!function(t){function e(t){return"function"==typeof t}function n(t){return t===Object(t)}function o(t,n){var o=!1;return"string"==typeof n?n=[n]:"[object Array]"===Object.prototype.toString.call(n)?0===n.length&&(o=!0):o=!0,e(t)&&(o?t(o,[]):t(o,n)),o}function i(t,n){var o;if(e(s[t])){try{o=s[t](n)}catch(e){o=["Problem with custom definition for '"+t+": "+e]}if("string"==typeof result&&(o=[o]),"[object Array]"===Object.prototype.toString.call(o))return o}return[]}function r(e,n){var i=[];return Array.isArray(e)?(e.forEach(function(e,n){t.isPosition(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),i=i.concat(e))})}),e[0].toString()!==e[e.length-1].toString()&&i.push("The first and last positions must be equivalent"),e.length<4&&i.push("coordinates must have at least four positions")):i.push("coordinates must be an array"),o(n,i)}var s={};t.define=function(t,n){return!!(t in a&&e(n))&&(s[t]=n,!0)},t.isPosition=function(t,e){var n=[];return Array.isArray(t)?t.length<=1&&n.push("Position must be at least two elements"):n.push("Position must be an array"),n=n.concat(i("Position",t)),o(e,n)},t.isGeoJSONObject=t.valid=function(t,e){if(!n(t))return o(e,["must be a JSON Object"]);var r=[];if("type"in t){if(u[t.type])return u[t.type](t,e);if(c[t.type])return c[t.type](t,e);r.push('type must be one of: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection", "Feature", or "FeatureCollection"')}else r.push("must have a member with the name 'type'");return r=r.concat(i("GeoJSONObject",t)),o(e,r)},t.isGeometryObject=function(t,e){if(!n(t))return o(e,["must be a JSON Object"]);var r=[];if("type"in t){if(c[t.type])return c[t.type](t,e);r.push('type must be one of: "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon" or "GeometryCollection"')}else r.push("must have a member with the name 'type'");return r=r.concat(i("GeometryObject",t)),o(e,r)},t.isPoint=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"Point"!==e.type&&s.push("type must be 'Point'"):s.push("must have a member with the name 'type'"),"coordinates"in e?t.isPosition(e.coordinates,function(t,e){t||s.push("Coordinates must be a single position")}):s.push("must have a member with the name 'coordinates'"),s=s.concat(i("Point",e)),o(r,s)},t.isMultiPointCoor=function(e,n){var i=[];return Array.isArray(e)?e.forEach(function(e,n){t.isPosition(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),i=i.concat(e))})}):i.push("coordinates must be an array"),o(n,i)},t.isMultiPoint=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"MultiPoint"!==e.type&&s.push("type must be 'MultiPoint'"):s.push("must have a member with the name 'type'"),"coordinates"in e?t.isMultiPointCoor(e.coordinates,function(t,e){t||(s=s.concat(e))}):s.push("must have a member with the name 'coordinates'"),s=s.concat(i("MultiPoint",e)),o(r,s)},t.isLineStringCoor=function(e,n){var i=[];return Array.isArray(e)?e.length>1?e.forEach(function(e,n){t.isPosition(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),i=i.concat(e))})}):i.push("coordinates must have at least two elements"):i.push("coordinates must be an array"),o(n,i)},t.isLineString=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"LineString"!==e.type&&s.push("type must be 'LineString'"):s.push("must have a member with the name 'type'"),"coordinates"in e?t.isLineStringCoor(e.coordinates,function(t,e){t||(s=s.concat(e))}):s.push("must have a member with the name 'coordinates'"),s=s.concat(i("LineString",e)),o(r,s)},t.isMultiLineStringCoor=function(e,n){var i=[];Array.isArray(e)?e.forEach(function(e,n){t.isLineStringCoor(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),i=i.concat(e))})}):i.push("coordinates must be an array"),o(n,i)},t.isMultiLineString=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"MultiLineString"!==e.type&&s.push("type must be 'MultiLineString'"):s.push("must have a member with the name 'type'"),"coordinates"in e?t.isMultiLineStringCoor(e.coordinates,function(t,e){t||(s=s.concat(e))}):s.push("must have a member with the name 'coordinates'"),s=s.concat(i("MultiPoint",e)),o(r,s)},t.isPolygonCoor=function(t,e){var n=[];return Array.isArray(t)?t.forEach(function(t,e){r(t,function(t,o){t||(o[0]="at "+e+": ".concat(o[0]),n=n.concat(o))})}):n.push("coordinates must be an array"),o(e,n)},t.isPolygon=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"Polygon"!==e.type&&s.push("type must be 'Polygon'"):s.push("must have a member with the name 'type'"),"coordinates"in e?t.isPolygonCoor(e.coordinates,function(t,e){t||(s=s.concat(e))}):s.push("must have a member with the name 'coordinates'"),s=s.concat(i("Polygon",e)),o(r,s)},t.isMultiPolygonCoor=function(e,n){var i=[];Array.isArray(e)?e.forEach(function(e,n){t.isPolygonCoor(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),i=i.concat(e))})}):i.push("coordinates must be an array"),o(n,i)},t.isMultiPolygon=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"MultiPolygon"!==e.type&&s.push("type must be 'MultiPolygon'"):s.push("must have a member with the name 'type'"),"coordinates"in e?t.isMultiPolygonCoor(e.coordinates,function(t,e){t||(s=s.concat(e))}):s.push("must have a member with the name 'coordinates'"),s=s.concat(i("MultiPolygon",e)),o(r,s)},t.isGeometryCollection=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"GeometryCollection"!==e.type&&s.push("type must be 'GeometryCollection'"):s.push("must have a member with the name 'type'"),"geometries"in e?Array.isArray(e.geometries)?e.geometries.forEach(function(e,n){t.isGeometryObject(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),s=s.concat(e))})}):s.push("'geometries' must be an array"):s.push("must have a member with the name 'geometries'"),s=s.concat(i("GeometryCollection",e)),o(r,s)},t.isFeature=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"Feature"!==e.type&&s.push("type must be 'feature'"):s.push("must have a member with the name 'type'"),"properties"in e||s.push("must have a member with the name 'properties'"),"geometry"in e?null!==e.geometry&&t.isGeometryObject(e.geometry,function(t,e){t||(s=s.concat(e))}):s.push("must have a member with the name 'geometry'"),s=s.concat(i("Feature",e)),o(r,s)},t.isFeatureCollection=function(e,r){if(!n(e))return o(r,["must be a JSON Object"]);var s=[];return"bbox"in e&&t.isBbox(e.bbox,function(t,e){t||(s=s.concat(e))}),"type"in e?"FeatureCollection"!==e.type&&s.push("type must be 'FeatureCollection'"):s.push("must have a member with the name 'type'"),"features"in e?Array.isArray(e.features)?e.features.forEach(function(e,n){t.isFeature(e,function(t,e){t||(e[0]="at "+n+": ".concat(e[0]),s=s.concat(e))})}):s.push("'features' must be an array"):s.push("must have a member with the name 'features'"),s=s.concat(i("FeatureCollection",e)),o(r,s)},t.isBbox=function(t,e){var n=[];Array.isArray(t)?t.length%2!=0&&n.push("bbox, must be a 2*n array"):n.push("bbox must be an array"),n=n.concat(i("Bbox",t)),o(e,n)};var u={Feature:t.isFeature,FeatureCollection:t.isFeatureCollection},c={Point:t.isPoint,MultiPoint:t.isMultiPoint,LineString:t.isLineString,MultiLineString:t.isMultiLineString,Polygon:t.isPolygon,MultiPolygon:t.isMultiPolygon,GeometryCollection:t.isGeometryCollection},a={Feature:t.isFeature,FeatureCollection:t.isFeatureCollection,Point:t.isPoint,MultiPoint:t.isMultiPoint,LineString:t.isLineString,MultiLineString:t.isMultiLineString,Polygon:t.isPolygon,MultiPolygon:t.isMultiPolygon,GeometryCollection:t.isGeometryCollection,Bbox:t.isBox,Position:t.isPosition,GeoJSON:t.isGeoJSONObject,GeometryObject:t.isGeometryObject};t.all_types=a}(e)},function(t,e){function n(t,e){var n=document.getElementById(t);return n.onclick=function(){e.page=t,e.evt.emit(t,e)},n}t.exports=function(t){n("select-by-bbox",t),n("select-by-prop",t),n("select-by-click",t),n("prop-add",t),n("prop-rem",t)}},function(t,e,n){var o=n(1);t.exports=function(t){var e=o.create("div");e.c("p").a({class:"title"}).d("Select features by:"),e.c("button").a({id:"select-by-bbox"}).d("Bounding box"),e.c("button").a({id:"select-by-prop"}).d("Property"),e.c("button").a({id:"select-by-click"}).d("Clicking"),e.c("p").a({class:"title"}).d("Edit properties"),e.c("button").a({id:"prop-add"}).d("Add from CSV"),e.c("button").a({id:"prop-rem"}).d("Remove"),document.getElementById("root").innerHTML=e.inner(),t()}},function(t,e,n){function o(t){i("root",function(e){t.page="geojson-loaded",t.data=e,t.evt.emit("got-data",t)})}var i=n(7),r=n(8),s=n(5),u=n(6),c=n(0).EventEmitter,a=new c,l={evt:a};window.onload=function(){o(l)},l.evt.on("got-data",function(t){r(t)}),l.evt.on("select-by-bbox",function(t){s(t)}),l.evt.on("select-by-prop",function(t){console.log(t)}),l.evt.on("select-by-click",function(t){console.log(t)}),l.evt.on("prop-add",function(t){console.log(t)}),l.evt.on("prop-rem",function(t){console.log(t)}),l.evt.on("bbox-draw",function(t){n.e(0).then(function(e){n(3)(t)}.bind(null,n)).catch(n.oe)}),l.evt.on("bbox-vals",function(t){console.log(t)}),l.evt.on("cancel",function(t){r(t)}),l.evt.on("continue",function(t){console.log("continue"),u(t)})}]);