var getFeats = require('./get-features') 
var save = require('../../utils/save')

exports.init = function(state) {
	var fn = function() {
		cancelBtn(state)
	}
	return fn
}

exports.download = function(col, state) {
	var fn = function() {
		document.getElementById('download-btn').onclick = function() {
			var c = { type: 'FeatureCollection', features: [] }
			col.feats.forEach(function(f) {
				if(f.keep) { c.features.push(f.data) }
			})
			state.evt.emit('saved-select-by-click', c)
			save.json('selected.json', c)
		}
		cancelBtn(state)
	}
	return fn
}

function cancelBtn(state) {
	document.getElementById('cancel').onclick = function() {
		state.evt.emit('cancel-select-by-click')
	}
}
