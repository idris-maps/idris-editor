webpackJsonp([4],{23:function(t,e){t.exports=function(){throw new Error("define cannot be used indirect")}},24:function(t,e){(function(e){t.exports=e}).call(e,{})},25:function(t,e,n){var o,r=r||function(t){"use strict";if(!(void 0===t||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var e=t.document,n=function(){return t.URL||t.webkitURL||t},o=e.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,i=function(t){var e=new MouseEvent("click");t.dispatchEvent(e)},u=/constructor/i.test(t.HTMLElement)||t.safari,a=/CriOS\/[\d]+/.test(navigator.userAgent),c=function(e){(t.setImmediate||t.setTimeout)(function(){throw e},0)},f="application/octet-stream",s=4e4,l=function(t){var e=function(){"string"==typeof t?n().revokeObjectURL(t):t.remove()};setTimeout(e,s)},p=function(t,e,n){e=[].concat(e);for(var o=e.length;o--;){var r=t["on"+e[o]];if("function"==typeof r)try{r.call(t,n||t)}catch(t){c(t)}}},m=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},d=function(e,c,s){s||(e=m(e));var d,v=this,y=e.type,h=y===f,g=function(){p(v,"writestart progress write writeend".split(" "))},E=function(){if((a||h&&u)&&t.FileReader){var o=new FileReader;return o.onloadend=function(){var e=a?o.result:o.result.replace(/^data:[^;]*;/,"data:attachment/file;");t.open(e,"_blank")||(t.location.href=e),e=void 0,v.readyState=v.DONE,g()},o.readAsDataURL(e),void(v.readyState=v.INIT)}if(d||(d=n().createObjectURL(e)),h)t.location.href=d;else{t.open(d,"_blank")||(t.location.href=d)}v.readyState=v.DONE,g(),l(d)};if(v.readyState=v.INIT,r)return d=n().createObjectURL(e),void setTimeout(function(){o.href=d,o.download=c,i(o),g(),l(d),v.readyState=v.DONE});E()},v=d.prototype,y=function(t,e,n){return new d(t,e||t.name||"download",n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=m(t)),navigator.msSaveOrOpenBlob(t,e)}:(v.abort=function(){},v.readyState=v.INIT=0,v.WRITING=1,v.DONE=2,v.error=v.onwritestart=v.onprogress=v.onwrite=v.onabort=v.onerror=v.onwriteend=null,y)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);void 0!==t&&t.exports?t.exports.saveAs=r:null!==n(23)&&null!==n(24)&&void 0!==(o=function(){return r}.call(e,n,e,t))&&(t.exports=o),e.json=function(t,e){r(new Blob([JSON.stringify(e)],{type:"application/json;charset=utf-8"}),t)},e.text=function(t,e){r(new Blob([e],{type:"text/plain;charset=utf-8"}),t)},e.svg=function(t,e){r(new Blob([e],{type:"image/svg+xml;charset=utf-8"}),t)},e.blob=function(t,e){r(e,t)}},26:function(t,e){function n(t){var e=t;if("Point"===e.type)return[e.coordinates];if("LineString"===e.type||"MultiPoint"===e.type)return e.coordinates;if("Polygon"===e.type||"MultiLineString"===e.type){var n=[];return e.coordinates.forEach(function(t){t.forEach(function(t){n.push(t)})}),n}if("MultiPolygon"===e.type){var n=[];return e.coordinates.forEach(function(t){t.forEach(function(t){t.forEach(function(t){n.push(t)})})}),n}console.log('point-array ERROR: "'+e.type+'" is not a valid geometry type')}e.fromFeature=function(t){return n(t.geometry)},e.fromGeometry=function(t){return n(t)},e.fromFeatureCollection=function(t){var e=[];return t.features.forEach(function(t){n(t.geometry).forEach(function(t){e.push(t)})}),e}},27:function(t,e){e.isGeom=function(t){var e=!1;return["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"].forEach(function(n){t.type===n&&(e=!0)}),e},e.uniq=function(t){var e=[],n=!0;return t.forEach(function(t){isNaN(t)&&(n=!1);var o=!1;e.forEach(function(e){t===e&&(o=!0)}),o||e.push(t)}),n&&(e=e.map(function(t){return+t})),e.sort(function(t,e){return t>e?1:-1}),e}},3:function(t,e,n){var o=n(33),r=n(57),i=n(56),u=n(25),a=n(1).EventEmitter,c=n(58);t.exports=function(t){var e=t.data,n=new a,f=o.getAllProperties(e.features);r.init("root",f,function(){i.init(n)}),n.on("props-to-keep",function(n){c(e.features,n,function(e){t.newdata={type:"FeatureCollection",features:e},t.page="continue",t.evt.emit("continue",t),u.json("edited.json",t.newdata)})}),n.on("cancel",function(){t.page="cancel",t.evt.emit("cancel",t)})}},33:function(t,e,n){var o=n(27),r=n(26);e.getAllPoints=function(t){return"FeatureCollection"===t.type?r.fromFeatureCollection(t):"Feature"===t.type?r.fromFeature(t):o.isGeom(t)?r.fromGeometry(t):void 0};var i=n(34);e.getBbox=function(t){return"FeatureCollection"===t.type?i.fromFeatureCollection(t):"Feature"===t.type?i.fromFeature(t):o.isGeom(t)?i.fromGeometry(t):void 0};var u=n(35);e.getAllProperties=function(t){return u.getAll(t)},e.getPropertyValues=function(t,e){return u.getValues(t,e)},e.getUniqPropertyValues=function(t,e){return u.getUniqValues(t,e)},e.numericValues=function(t,e){return u.numericValues(t,e)},e.propInfo=function(t){return u.propInfo(t.features)}},34:function(t,e,n){function o(t){var e={min:1/0,max:-(1/0)},n={min:1/0,max:-(1/0)};return t.forEach(function(t){t[0]>e.max&&(e.max=t[0]),t[0]<e.min&&(e.min=t[0]),t[1]>n.max&&(n.max=t[1]),t[1]<n.min&&(n.min=t[1])}),[e.min,n.min,e.max,n.max]}var r=n(26);e.fromFeature=function(t){return o(r.fromFeature(t))},e.fromFeatureCollection=function(t){return o(r.fromFeatureCollection(t))},e.fromGeometry=function(t){return o(r.fromGeometry(t))}},35:function(t,e,n){function r(t){var e=[];for(k in t[0].properties)e.push(k);return e}function i(t,e){var n=[];return t.forEach(function(t){n.push(t.properties[e])}),n.sort(function(t,e){return t-e})}function u(t,e){var n=[];return t.forEach(function(t){n.push(t.properties[e])}),c.uniq(n)}function a(t,e){var n=!0;return t.forEach(function(t){t.properties[e]&&isNaN(t.properties[e])&&(n=!1)}),n}var c=n(27);e.getAll=function(t){return r(t)},e.getValues=function(t,e){return i(t,e)},e.getUniqValues=function(t,e){return u(t,e)},e.numericValues=function(t,e){return a(t,e)},e.propInfo=function(t){var e=[];return geo.getAllProperties(o.feats).forEach(function(t){var n={key:t,uniqValues:u(o.feats,t),isNum:a(o.feats,t)};n.maxValue=n.uniqValues[0],n.minValue=n.uniqValues[n.uniqValues.length-1],n.nbUniqValues=n.uniqValues.length,e.push(n)}),e}},56:function(t,e){function n(t){var e=document.getElementsByClassName("checkbox-input"),n=[],o=[];for(i=0;i<e.length;i++)e[i].checked?n.push(e[i].id):o.push(e[i].id);return t?n:o}e.init=function(t){document.getElementById("rm-selected").onclick=function(){var e=n(!1);t.emit("props-to-keep",e)},document.getElementById("rm-unselected").onclick=function(){var e=n(!0);t.emit("props-to-keep",e)},document.getElementById("cancel").onclick=function(){t.emit("cancel")}}},57:function(t,e,n){var o=n(0);e.init=function(t,e,n){var r=o.create("div");r.c("p").c("b").d("Choose properties");var i=r.c("div").a({class:"scroll-y"});e.forEach(function(t){var e=i.c("div").a({class:"checkbox-item"});e.c("input").a({id:t,class:"checkbox-input",type:"checkbox"}),e.c("span").d(t)}),r.c("button").a({id:"rm-selected"}).d("Remove selected"),r.c("button").a({id:"rm-unselected"}).d("Remove not selected"),r.c("button").a({id:"cancel"}).d("Cancel"),document.getElementById(t).innerHTML=r.inner(),n()}},58:function(t,e){t.exports=function(t,e,n){var o=[];t.forEach(function(t){var n={};e.forEach(function(e){n[e]=t.properties[e]}),t.properties=n,o.push(t)}),n(o)}}});