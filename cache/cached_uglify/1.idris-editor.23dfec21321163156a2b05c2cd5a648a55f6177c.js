webpackJsonp([1],[,,function(e,t,n){var r=n(33),i=n(53),o=n(52),a=n(54),s=n(1).EventEmitter,u=n(47),c=n(55),f=n(25);e.exports=function(e){var t="root",n=e.data,d=new s,l={};l.feats=n.features,l.geoProps=r.getAllProperties(n.features),u(t,d,function(e){i.parsing(t,function(){a(e,function(e){c.checkParsed(d,e)})})}),d.on("parse-errors",function(e){i.parseErrors(t,e,function(){o.parseErrors(d)})}),d.on("parse-success",function(e){l.csv=e,i.header(t,e[0],function(){o.header(d)})}),d.on("is-not-head",function(){i.setHead(t,l.csv[0],function(){o.setHead(d,l.csv[0].length)})}),d.on("is-head",function(){d.emit("got-header",l.csv[0],!0)}),d.on("got-header",function(e,n){l.head=e,n&&l.csv.splice(0,1),l.csvJson=c.csvToJson(l.head,l.csv),i.joinProps(t,l.geoProps,l.head,function(){o.joinProps(d)})}),d.on("join-props",function(e,n){l.joinProps={geo:e,csv:n},i.joining(t,function(){c.joinThem(d,l.feats,l.csvJson,l.joinProps)})}),d.on("joined",function(t){e.newdata=t,e.page="continue",e.evt.emit("continue",e),f.json("edited.json",l.joined)}),d.on("cancel",function(){e.page="cancel",e.evt.emit("cancel",e)})}},,,,,,,,,,,,,,,,,,,,,function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t){(function(t){e.exports=t}).call(t,{})},function(e,t,n){var r,i=i||function(e){"use strict";if(!(void 0===e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),i="download"in r,o=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/constructor/i.test(e.HTMLElement)||e.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},c="application/octet-stream",f=4e4,d=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};setTimeout(t,f)},l=function(e,t,n){t=[].concat(t);for(var r=t.length;r--;){var i=e["on"+t[r]];if("function"==typeof i)try{i.call(e,n||e)}catch(e){u(e)}}},h=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},p=function(t,u,f){f||(t=h(t));var p,m=this,g=t.type,v=g===c,_=function(){l(m,"writestart progress write writeend".split(" "))},y=function(){if((s||v&&a)&&e.FileReader){var r=new FileReader;return r.onloadend=function(){var t=s?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;");e.open(t,"_blank")||(e.location.href=t),t=void 0,m.readyState=m.DONE,_()},r.readAsDataURL(t),void(m.readyState=m.INIT)}if(p||(p=n().createObjectURL(t)),v)e.location.href=p;else{e.open(p,"_blank")||(e.location.href=p)}m.readyState=m.DONE,_(),d(p)};if(m.readyState=m.INIT,i)return p=n().createObjectURL(t),void setTimeout(function(){r.href=p,r.download=u,o(r),_(),d(p),m.readyState=m.DONE});y()},m=p.prototype,g=function(e,t,n){return new p(e,t||e.name||"download",n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return t=t||e.name||"download",n||(e=h(e)),navigator.msSaveOrOpenBlob(e,t)}:(m.abort=function(){},m.readyState=m.INIT=0,m.WRITING=1,m.DONE=2,m.error=m.onwritestart=m.onprogress=m.onwrite=m.onabort=m.onerror=m.onwriteend=null,g)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==e&&e.exports?e.exports.saveAs=i:null!==n(23)&&null!==n(24)&&void 0!==(r=function(){return i}.call(t,n,t,e))&&(e.exports=r),t.json=function(e,t){i(new Blob([JSON.stringify(t)],{type:"application/json;charset=utf-8"}),e)},t.text=function(e,t){i(new Blob([t],{type:"text/plain;charset=utf-8"}),e)},t.svg=function(e,t){i(new Blob([t],{type:"image/svg+xml;charset=utf-8"}),e)},t.blob=function(e,t){i(t,e)}},function(e,t){function n(e){var t=e;if("Point"===t.type)return[t.coordinates];if("LineString"===t.type||"MultiPoint"===t.type)return t.coordinates;if("Polygon"===t.type||"MultiLineString"===t.type){var n=[];return t.coordinates.forEach(function(e){e.forEach(function(e){n.push(e)})}),n}if("MultiPolygon"===t.type){var n=[];return t.coordinates.forEach(function(e){e.forEach(function(e){e.forEach(function(e){n.push(e)})})}),n}console.log('point-array ERROR: "'+t.type+'" is not a valid geometry type')}t.fromFeature=function(e){return n(e.geometry)},t.fromGeometry=function(e){return n(e)},t.fromFeatureCollection=function(e){var t=[];return e.features.forEach(function(e){n(e.geometry).forEach(function(e){t.push(e)})}),t}},function(e,t){t.isGeom=function(e){var t=!1;return["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"].forEach(function(n){e.type===n&&(t=!0)}),t},t.uniq=function(e){var t=[],n=!0;return e.forEach(function(e){isNaN(e)&&(n=!1);var r=!1;t.forEach(function(t){e===t&&(r=!0)}),r||t.push(e)}),n&&(t=t.map(function(e){return+e})),t.sort(function(e,t){return e>t?1:-1}),t}},,,,,,function(e,t,n){var r=n(27),i=n(26);t.getAllPoints=function(e){return"FeatureCollection"===e.type?i.fromFeatureCollection(e):"Feature"===e.type?i.fromFeature(e):r.isGeom(e)?i.fromGeometry(e):void 0};var o=n(34);t.getBbox=function(e){return"FeatureCollection"===e.type?o.fromFeatureCollection(e):"Feature"===e.type?o.fromFeature(e):r.isGeom(e)?o.fromGeometry(e):void 0};var a=n(35);t.getAllProperties=function(e){return a.getAll(e)},t.getPropertyValues=function(e,t){return a.getValues(e,t)},t.getUniqPropertyValues=function(e,t){return a.getUniqValues(e,t)},t.numericValues=function(e,t){return a.numericValues(e,t)},t.propInfo=function(e){return a.propInfo(e.features)}},function(e,t,n){function r(e){var t={min:1/0,max:-(1/0)},n={min:1/0,max:-(1/0)};return e.forEach(function(e){e[0]>t.max&&(t.max=e[0]),e[0]<t.min&&(t.min=e[0]),e[1]>n.max&&(n.max=e[1]),e[1]<n.min&&(n.min=e[1])}),[t.min,n.min,t.max,n.max]}var i=n(26);t.fromFeature=function(e){return r(i.fromFeature(e))},t.fromFeatureCollection=function(e){return r(i.fromFeatureCollection(e))},t.fromGeometry=function(e){return r(i.fromGeometry(e))}},function(e,t,n){function r(e){var t=[];for(k in e[0].properties)t.push(k);return t}function i(e,t){var n=[];return e.forEach(function(e){n.push(e.properties[t])}),n.sort(function(e,t){return e-t})}function a(e,t){var n=[];return e.forEach(function(e){n.push(e.properties[t])}),u.uniq(n)}function s(e,t){var n=!0;return e.forEach(function(e){e.properties[t]&&isNaN(e.properties[t])&&(n=!1)}),n}var u=n(27);t.getAll=function(e){return r(e)},t.getValues=function(e,t){return i(e,t)},t.getUniqValues=function(e,t){return a(e,t)},t.numericValues=function(e,t){return s(e,t)},t.propInfo=function(e){var t=[];return geo.getAllProperties(o.feats).forEach(function(e){var n={key:e,uniqValues:a(o.feats,e),isNum:s(o.feats,e)};n.maxValue=n.uniqValues[0],n.minValue=n.uniqValues[n.uniqValues.length-1],n.nbUniqValues=n.uniqValues.length,t.push(n)}),t}},,,,,,,,,function(e,t,n){function r(e){return"text/csv"===e.type?(i.write("Document is a CSV file"),!0):"text/tab-separated-values"===e.type?(i.write("Document is a TSV file"),!0):(i.write("Document is not a CSV or TSV file"),!1)}var i=n(50),o=n(51);e.exports=function(e,t){i.write("Verifying document..."),r(e)&&o(e,function(e){t.emit("read-csv",e)})}},,function(e,t,n){var r,i,o;/*!
	Papa Parse
	v4.2.0
	https://github.com/mholt/PapaParse
*/
!function(n,a){i=[],r=a,void 0!==(o="function"==typeof r?r.apply(t,i):r)&&(e.exports=o)}(0,function(){"use strict";function e(e,t){if(t=t||{},t.dynamicTyping=t.dynamicTyping||!1,t.worker&&S.WORKERS_SUPPORTED){var n=f();return n.userStep=t.step,n.userChunk=t.chunk,n.userComplete=t.complete,n.userError=t.error,t.step=v(t.step),t.chunk=v(t.chunk),t.complete=v(t.complete),t.error=v(t.error),delete t.worker,void n.postMessage({input:e,config:t,workerId:n.id})}var s=null;return"string"==typeof e?s=t.download?new r(t):new o(t):e.readable===!0&&"function"==typeof e.read&&"function"==typeof e.on?s=new a(t):(y.File&&e instanceof File||e instanceof Object)&&(s=new i(t)),s.stream(e)}function t(e,t){function n(){"object"==typeof t&&("string"==typeof t.delimiter&&1===t.delimiter.length&&S.BAD_DELIMITERS.indexOf(t.delimiter)===-1&&(c=t.delimiter),("boolean"==typeof t.quotes||t.quotes instanceof Array)&&(s=t.quotes),"string"==typeof t.newline&&(f=t.newline),"string"==typeof t.quoteChar&&(d=t.quoteChar),"boolean"==typeof t.header&&(u=t.header))}function r(e){if("object"!=typeof e)return[];var t=[];for(var n in e)t.push(n);return t}function i(e,t){var n="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var r=e instanceof Array&&e.length>0,i=!(t[0]instanceof Array);if(r&&u){for(var a=0;a<e.length;a++)a>0&&(n+=c),n+=o(e[a],a);t.length>0&&(n+=f)}for(var s=0;s<t.length;s++){for(var d=r?e.length:t[s].length,l=0;l<d;l++){l>0&&(n+=c);var h=r&&i?e[l]:l;n+=o(t[s][h],l)}s<t.length-1&&(n+=f)}return n}function o(e,t){return void 0===e||null===e?"":(e=e.toString().replace(l,d+d),"boolean"==typeof s&&s||s instanceof Array&&s[t]||a(e,S.BAD_DELIMITERS)||e.indexOf(c)>-1||" "===e.charAt(0)||" "===e.charAt(e.length-1)?d+e+d:e)}function a(e,t){for(var n=0;n<t.length;n++)if(e.indexOf(t[n])>-1)return!0;return!1}var s=!1,u=!0,c=",",f="\r\n",d='"';n();var l=new RegExp(d,"g");if("string"==typeof e&&(e=JSON.parse(e)),e instanceof Array){if(!e.length||e[0]instanceof Array)return i(null,e);if("object"==typeof e[0])return i(r(e[0]),e)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),e.data instanceof Array&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=e.data[0]instanceof Array?e.fields:r(e.data[0])),e.data[0]instanceof Array||"object"==typeof e.data[0]||(e.data=[e.data])),i(e.fields||[],e.data||[]);throw"exception: Unable to serialize unrecognized input"}function n(e){function t(e){var t=m(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new s(t),this._handle.streamer=this,this._config=t}this._handle=null,this._paused=!1,this._finished=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},t.call(this,e),this.parseChunk=function(e){if(this.isFirstChunk&&v(this._config.beforeFirstChunk)){var t=this._config.beforeFirstChunk(e);void 0!==t&&(e=t)}this.isFirstChunk=!1;var n=this._partialLine+e;this._partialLine="";var r=this._handle.parse(n,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var i=r.meta.cursor;this._finished||(this._partialLine=n.substring(i-this._baseIndex),this._baseIndex=i),r&&r.data&&(this._rowCount+=r.data.length);var o=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(b)y.postMessage({results:r,workerId:S.WORKER_ID,finished:o});else if(v(this._config.chunk)){if(this._config.chunk(r,this._handle),this._paused)return;r=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(r.data),this._completeResults.errors=this._completeResults.errors.concat(r.errors),this._completeResults.meta=r.meta),!o||!v(this._config.complete)||r&&r.meta.aborted||this._config.complete(this._completeResults,this._input),o||r&&r.meta.paused||this._nextChunk(),r}},this._sendError=function(e){v(this._config.error)?this._config.error(e):b&&this._config.error&&y.postMessage({workerId:S.WORKER_ID,error:e,finished:!1})}}function r(e){function t(e){var t=e.getResponseHeader("Content-Range");return null===t?-1:parseInt(t.substr(t.lastIndexOf("/")+1))}e=e||{},e.chunkSize||(e.chunkSize=S.RemoteChunkSize),n.call(this,e);var r;this._nextChunk=E?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)return void this._chunkLoaded();if(r=new XMLHttpRequest,this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),E||(r.onload=g(this._chunkLoaded,this),r.onerror=g(this._chunkError,this)),r.open("GET",this._input,!E),this._config.chunkSize){var e=this._start+this._config.chunkSize-1;r.setRequestHeader("Range","bytes="+this._start+"-"+e),r.setRequestHeader("If-None-Match","webkit-no-cache")}try{r.send()}catch(e){this._chunkError(e.message)}E&&0===r.status?this._chunkError():this._start+=this._config.chunkSize},this._chunkLoaded=function(){if(4==r.readyState){if(r.status<200||r.status>=400)return void this._chunkError();this._finished=!this._config.chunkSize||this._start>t(r),this.parseChunk(r.responseText)}},this._chunkError=function(e){var t=r.statusText||e;this._sendError(t)}}function i(e){e=e||{},e.chunkSize||(e.chunkSize=S.LocalChunkSize),n.call(this,e);var t,r,i="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,i?(t=new FileReader,t.onload=g(this._chunkLoaded,this),t.onerror=g(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size);e=r.call(e,this._start,n)}var o=t.readAsText(e,this._config.encoding);i||this._chunkLoaded({target:{result:o}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function o(e){e=e||{},n.call(this,e);var t,r;this.stream=function(e){return t=e,r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}}}function a(e){e=e||{},n.call(this,e);var t=[],r=!0;this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._nextChunk=function(){t.length?this.parseChunk(t.shift()):r=!0},this._streamData=g(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=g(function(e){this._streamCleanUp(),this._sendError(e.message)},this),this._streamEnd=g(function(){this._streamCleanUp(),this._finished=!0,this._streamData("")},this),this._streamCleanUp=g(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function s(e){function t(){if(k&&h&&(f("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+S.DefaultDelimiter+"'"),h=!1),e.skipEmptyLines)for(var t=0;t<k.data.length;t++)1===k.data[t].length&&""===k.data[t][0]&&k.data.splice(t--,1);return n()&&r(),o()}function n(){return e.header&&0===b.length}function r(){if(k){for(var e=0;n()&&e<k.data.length;e++)for(var t=0;t<k.data[e].length;t++)b.push(k.data[e][t]);k.data.splice(0,1)}}function i(t,n){return(e.dynamicTyping[t]||e.dynamicTyping)===!0?"true"===n||"TRUE"===n||"false"!==n&&"FALSE"!==n&&c(n):n}function o(){if(!k||!e.header&&!e.dynamicTyping)return k;for(var t=0;t<k.data.length;t++){for(var n=e.header?{}:[],r=0;r<k.data[t].length;r++){var o=r,a=k.data[t][r];e.header&&(o=r>=b.length?"__parsed_extra":b[r]),a=i(o,a),"__parsed_extra"===o?(n[o]=n[o]||[],n[o].push(a)):n[o]=a}k.data[t]=n,e.header&&(r>b.length?f("FieldMismatch","TooManyFields","Too many fields: expected "+b.length+" fields but parsed "+r,t):r<b.length&&f("FieldMismatch","TooFewFields","Too few fields: expected "+b.length+" fields but parsed "+r,t))}return e.header&&k.meta&&(k.meta.fields=b),k}function a(t,n){for(var r,i,o,a=[",","\t","|",";",S.RECORD_SEP,S.UNIT_SEP],s=0;s<a.length;s++){var c=a[s],f=0,d=0;o=void 0;for(var l=new u({delimiter:c,newline:n,preview:10}).parse(t),h=0;h<l.data.length;h++){var p=l.data[h].length;d+=p,void 0!==o?p>1&&(f+=Math.abs(p-o),o=p):o=p}l.data.length>0&&(d/=l.data.length),(void 0===i||f<i)&&d>1.99&&(i=f,r=c)}return e.delimiter=r,{successful:!!r,bestDelimiter:r}}function s(e){e=e.substr(0,1048576);var t=e.split("\r"),n=e.split("\n"),r=n.length>1&&n[0].length<t[0].length;if(1===t.length||r)return"\n";for(var i=0,o=0;o<t.length;o++)"\n"===t[o][0]&&i++;return i>=t.length/2?"\r\n":"\r"}function c(e){return p.test(e)?parseFloat(e):e}function f(e,t,n,r){k.errors.push({type:e,code:t,message:n,row:r})}var d,l,h,p=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,g=this,_=0,y=!1,E=!1,b=[],k={data:[],errors:[],meta:{}};if(v(e.step)){var w=e.step;e.step=function(r){if(k=r,n())t();else{if(t(),0===k.data.length)return;_+=r.data.length,e.preview&&_>e.preview?l.abort():w(k,g)}}}this.parse=function(n,r,i){if(e.newline||(e.newline=s(n)),h=!1,e.delimiter)"function"==typeof e.delimiter&&(e.delimiter=e.delimiter(n),k.meta.delimiter=e.delimiter);else{var o=a(n,e.newline);o.successful?e.delimiter=o.bestDelimiter:(h=!0,e.delimiter=S.DefaultDelimiter),k.meta.delimiter=e.delimiter}var c=m(e);return e.preview&&e.header&&c.preview++,d=n,l=new u(c),k=l.parse(d,r,i),t(),y?{meta:{paused:!0}}:k||{meta:{paused:!1}}},this.paused=function(){return y},this.pause=function(){y=!0,l.abort(),d=d.substr(l.getCharIndex())},this.resume=function(){y=!1,g.streamer.parseChunk(d)},this.aborted=function(){return E},this.abort=function(){E=!0,l.abort(),k.meta.aborted=!0,v(e.complete)&&e.complete(k),d=""}}function u(e){e=e||{};var t=e.delimiter,n=e.newline,r=e.comments,i=e.step,o=e.preview,a=e.fastMode,s=e.quoteChar||'"';if(("string"!=typeof t||S.BAD_DELIMITERS.indexOf(t)>-1)&&(t=","),r===t)throw"Comment character same as delimiter";r===!0?r="#":("string"!=typeof r||S.BAD_DELIMITERS.indexOf(r)>-1)&&(r=!1),"\n"!=n&&"\r"!=n&&"\r\n"!=n&&(n="\n");var u=0,c=!1;this.parse=function(e,f,d){function l(e){k.push(e),S=u}function h(t){return d?m():(void 0===t&&(t=e.substr(u)),C.push(t),u=v,l(C),b&&g(),m())}function p(t){u=t,l(C),C=[],T=e.indexOf(n,u)}function m(e){return{data:k,errors:w,meta:{delimiter:t,linebreak:n,aborted:c,truncated:!!e,cursor:S+(f||0)}}}function g(){i(m()),k=[],w=[]}if("string"!=typeof e)throw"Input must be a string";var v=e.length,_=t.length,y=n.length,E=r.length,b="function"==typeof i;u=0;var k=[],w=[],C=[],S=0;if(!e)return m();if(a||a!==!1&&e.indexOf(s)===-1){for(var I=e.split(n),R=0;R<I.length;R++){var C=I[R];if(u+=C.length,R!==I.length-1)u+=n.length;else if(d)return m();if(!r||C.substr(0,E)!==r){if(b){if(k=[],l(C.split(t)),g(),c)return m()}else l(C.split(t));if(o&&R>=o)return k=k.slice(0,o),m(!0)}}return m()}for(var x=e.indexOf(t,u),T=e.indexOf(n,u),O=new RegExp(s+s,"g");;)if(e[u]!==s)if(r&&0===C.length&&e.substr(u,E)===r){if(T===-1)return m();u=T+y,T=e.indexOf(n,u),x=e.indexOf(t,u)}else if(x!==-1&&(x<T||T===-1))C.push(e.substring(u,x)),u=x+_,x=e.indexOf(t,u);else{if(T===-1)break;if(C.push(e.substring(u,T)),p(T+y),b&&(g(),c))return m();if(o&&k.length>=o)return m(!0)}else{var P=u;for(u++;;){var P=e.indexOf(s,P+1);if(P===-1)return d||w.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:k.length,index:u}),h();if(P===v-1){var L=e.substring(u,P).replace(O,s);return h(L)}if(e[P+1]!==s){if(e[P+1]===t){C.push(e.substring(u,P).replace(O,s)),u=P+1+_,x=e.indexOf(t,u),T=e.indexOf(n,u);break}if(e.substr(P+1,y)===n){if(C.push(e.substring(u,P).replace(O,s)),p(P+1+y),x=e.indexOf(t,u),b&&(g(),c))return m();if(o&&k.length>=o)return m(!0);break}}else P++}}return h()},this.abort=function(){c=!0},this.getCharIndex=function(){return u}}function c(){var e=document.getElementsByTagName("script");return e.length?e[e.length-1].src:""}function f(){if(!S.WORKERS_SUPPORTED)return!1;if(!k&&null===S.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var e=S.SCRIPT_PATH||_;e+=(e.indexOf("?")!==-1?"&":"?")+"papaworker";var t=new y.Worker(e);return t.onmessage=d,t.id=C++,w[t.id]=t,t}function d(e){var t=e.data,n=w[t.workerId],r=!1;if(t.error)n.userError(t.error,t.file);else if(t.results&&t.results.data){var i=function(){r=!0,l(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},o={abort:i,pause:h,resume:h};if(v(n.userStep)){for(var a=0;a<t.results.data.length&&(n.userStep({data:[t.results.data[a]],errors:t.results.errors,meta:t.results.meta},o),!r);a++);delete t.results}else v(n.userChunk)&&(n.userChunk(t.results,o,t.file),delete t.results)}t.finished&&!r&&l(t.workerId,t.results)}function l(e,t){var n=w[e];v(n.userComplete)&&n.userComplete(t),n.terminate(),delete w[e]}function h(){throw"Not implemented."}function p(e){var t=e.data;if(void 0===S.WORKER_ID&&t&&(S.WORKER_ID=t.workerId),"string"==typeof t.input)y.postMessage({workerId:S.WORKER_ID,results:S.parse(t.input,t.config),finished:!0});else if(y.File&&t.input instanceof File||t.input instanceof Object){var n=S.parse(t.input,t.config);n&&y.postMessage({workerId:S.WORKER_ID,results:n,finished:!0})}}function m(e){if("object"!=typeof e)return e;var t=e instanceof Array?[]:{};for(var n in e)t[n]=m(e[n]);return t}function g(e,t){return function(){e.apply(t,arguments)}}function v(e){return"function"==typeof e}var _,y=function(){return"undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==y?y:{}}(),E=!y.document&&!!y.postMessage,b=E&&/(\?|&)papaworker(=|&|$)/.test(y.location.search),k=!1,w={},C=0,S={};if(S.parse=e,S.unparse=t,S.RECORD_SEP=String.fromCharCode(30),S.UNIT_SEP=String.fromCharCode(31),S.BYTE_ORDER_MARK="\ufeff",S.BAD_DELIMITERS=["\r","\n",'"',S.BYTE_ORDER_MARK],S.WORKERS_SUPPORTED=!E&&!!y.Worker,S.SCRIPT_PATH=null,S.LocalChunkSize=10485760,S.RemoteChunkSize=5242880,S.DefaultDelimiter=",",S.Parser=u,S.ParserHandle=s,S.NetworkStreamer=r,S.FileStreamer=i,S.StringStreamer=o,S.ReadableStreamStreamer=a,y.jQuery){var I=y.jQuery;I.fn.parse=function(e){function t(){if(0===o.length)return void(v(e.complete)&&e.complete());var t=o[0];if(v(e.before)){var i=e.before(t.file,t.inputElem);if("object"==typeof i){if("abort"===i.action)return void n("AbortError",t.file,t.inputElem,i.reason);if("skip"===i.action)return void r();"object"==typeof i.config&&(t.instanceConfig=I.extend(t.instanceConfig,i.config))}else if("skip"===i)return void r()}var a=t.instanceConfig.complete;t.instanceConfig.complete=function(e){v(a)&&a(e,t.file,t.inputElem),r()},S.parse(t.file,t.instanceConfig)}function n(t,n,r,i){v(e.error)&&e.error({name:t},n,r,i)}function r(){o.splice(0,1),t()}var i=e.config||{},o=[];return this.each(function(e){if("INPUT"!==I(this).prop("tagName").toUpperCase()||"file"!==I(this).attr("type").toLowerCase()||!y.FileReader||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)o.push({file:this.files[t],inputElem:this,instanceConfig:I.extend({},i)})}),t(),this}}return b?y.onmessage=p:S.WORKERS_SUPPORTED&&(_=c(),document.body?document.addEventListener("DOMContentLoaded",function(){k=!0},!0):k=!0),r.prototype=Object.create(n.prototype),r.prototype.constructor=r,i.prototype=Object.create(n.prototype),i.prototype.constructor=i,o.prototype=Object.create(o.prototype),o.prototype.constructor=o,a.prototype=Object.create(n.prototype),a.prototype.constructor=a,S})},function(e,t,n){var r=n(48),i=n(49),o=n(44),a=n(1).EventEmitter;e.exports=function(e,t,n){var s=new a;r.init(e,function(){i(s);var e=document.getElementById("browse-btn"),t=document.getElementById("file-input");t.onchange=function(e){o(t.files[0],s)},e.onclick=function(){t.click()}}),s.on("read-csv",function(e){n(e)}),s.on("cancel",function(){t.emit("cancel")})}},function(e,t,n){var r=n(0);t.init=function(e,t){var n=document.getElementById(e),i=r.create("div");i.c("p").c("b").d("Get the CSV file"),i.c("button").a({id:"browse-btn"}).d("Browse file system"),i.c("input").a({id:"file-input",type:"file"}),i.c("div").a({id:"drop-zone"}).c("div").a({id:"dz-txt"}).d("or drop a file"),i.c("p").a({id:"msg"}),i.c("button").a({id:"cancel"}).d("Cancel"),n.innerHTML=i.inner(),t()}},function(e,t,n){function r(e,t){e.preventDefault(),o(e.dataTransfer.files[0],t)}function i(e){e.ondragover=function(e){return e.preventDefault(),!1},e.ondragenter=function(e){return e.preventDefault(),!1}}var o=n(44);e.exports=function(e){if(window.FileReader){var t=document.getElementById("drop-zone");i(t),t.ondrop=function(t){r(t,e)}}else document.getElementById("msg").innerHTML="Your browser does not support the HTML5 FileReader.";document.getElementById("cancel").onclick=function(){e.emit("cancel")}}},function(e,t){t.write=function(e){document.getElementById("msg").innerHTML=e},t.add=function(e){var t=document.getElementById("msg"),n=t.innerHTML;t.innerHTML=n+"<br/>"+e}},function(e,t){e.exports=function(e,t){var n=new FileReader;n.onload=function(){t(n.result)},n.readAsText(e)}},function(e,t){function n(e){document.getElementById("cancel").onclick=function(){e.emit("cancel")}}t.parseErrors=function(e){n(e)},t.header=function(e){n(e);var t=document.getElementById("csv-header-yes"),r=document.getElementById("csv-header-no");t.onclick=function(){e.emit("is-head")},r.onclick=function(){e.emit("is-not-head")}},t.setHead=function(e,t){n(e);var r=[];for(i=0;i<t;i++)r.push("set-head-input-"+i);var o=[];r.forEach(function(e){var t=document.getElementById(e);o.push(t)}),document.getElementById("set-head-done").onclick=function(){var n=[];o.forEach(function(e,t){var r=e.value;r&&n.push(r)}),n.length===t?e.emit("got-header",n,!1):document.getElementById("set-head-error").innerHTML="All column names need to be filled"}},t.joinProps=function(e){n(e),document.getElementById("join-btn").onclick=function(){var t=document.getElementById("geo-props").value,n=document.getElementById("csv-props").value;e.emit("join-props",t,n)}},t.done=function(e){document.getElementById("save").onclick=function(){e.emit("save")},document.getElementById("continue").onclick=function(){e.emit("continue")}}},function(e,t,n){var r=n(0);t.parsing=function(e,t){document.getElementById(e).innerHTML="<p>Parsing...</p>",t()},t.parseErrors=function(e,t,n){var i=r.create("div"),o=i.c("p");o.c("span").d("Could not parse file"),o.c("br"),o.c("b").d("Errors:"),o.c("br"),t.forEach(function(e){var t=JSON.stringify(e);o.c("span").d(t),o.c("br")}),i.c("button").a({id:"cancel"}).d("Cancel"),document.getElementById(e).innerHTML=i.inner(),n()},t.header=function(e,t,n){var i=r.create("div");i.c("p").d("This is the first line:"),t.forEach(function(e,t){i.c("p").a({class:"fake-table-cell"}).d(e)}),i.c("p").d("Are these the names of the columns?"),i.c("button").a({id:"csv-header-yes"}).d("Yes"),i.c("button").a({id:"csv-header-no"}).d("No"),i.c("button").a({id:"cancel"}).d("Cancel"),document.getElementById(e).innerHTML=i.inner(),n()},t.setHead=function(e,t,n){var i=r.create("div");i.c("p").d("Name the columns");var o=i.c("table"),a=o.c("tr");a.c("th").d("First row"),a.c("th").d("Column name"),t.forEach(function(e,t){var n=o.c("tr");n.c("td").d(e),n.c("td").c("input").a({id:"set-head-input-"+t})}),i.c("p").a({id:"set-head-error"}),i.c("button").a({id:"set-head-done"}).d("Done"),i.c("button").a({id:"cancel"}).d("Cancel"),document.getElementById(e).innerHTML=i.inner(),n()},t.joinProps=function(e,t,n,i){var o=r.create("div");o.c("p").d("Properties to use for join"),o.c("p").c("b").d("in the GeoJSON file");var a=o.c("select").a({id:"geo-props"});t.forEach(function(e){a.c("option").a({value:e}).d(e)}),o.c("p").c("b").d("in the CSV file");var s=o.c("select").a({id:"csv-props"});n.forEach(function(e){s.c("option").a({value:e}).d(e)}),o.c("button").a({id:"join-btn"}).d("OK"),o.c("button").a({id:"cancel"}).d("Cancel"),document.getElementById(e).innerHTML=o.inner(),i()},t.joining=function(e,t){document.getElementById(e).innerHTML="<p><b>Joining...</b></p>",t()},t.done=function(e,t){var n=r.create("div");n.c("p").c("b").d("Properties have been added"),n.c("button").a({id:"save"}).d("Save collection"),n.c("button").a({id:"continue"}).d("Continue editing"),document.getElementById(e).innerHTML=n.inner(),t()}},function(e,t,n){var r=n(46);e.exports=function(e,t){r.parse(e,{complete:function(e){t(e)}})}},function(e,t){function n(e,t,n){var r=e.properties[n.geo],i=!isNaN(r),o=null;return t.forEach(function(e){i?+e[n.csv]==+r&&(o=e):e[n.csv]===r&&(o=e)}),o}function r(e,t){for(k in t)e.properties[k]=t[k];return e}t.checkParsed=function(e,t){t.errors.length>0?e.emit("parse-errors",t.errors):e.emit("parse-success",t.data)},t.csvToJson=function(e,t){var n=[];return t.forEach(function(t){var r={};t.forEach(function(t,n){r[e[n]]=t}),n.push(r)}),n},t.joinThem=function(e,t,i,o){var a=[];t.forEach(function(e){var t=n(e,i,o);a.push(r(e,t))}),e.emit("joined",{type:"FeatureCollection",features:a})}}]);