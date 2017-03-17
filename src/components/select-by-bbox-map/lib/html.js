var img = require('./img.json')
var xml = require('xml-string')

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
type.c('button').a({ id: 'cancel-draw' }).d('Cancel')
type.c('br')

exports.type = type.inner()

var process = xml.create('div')
var processP = process.c('p')
processP.c('b').d('Processing')
processP.c('br')
processP.c('span').d('...')
processP.c('br')

exports.process = process.inner()

