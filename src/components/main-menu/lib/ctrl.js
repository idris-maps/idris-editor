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
