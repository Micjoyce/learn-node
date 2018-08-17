const Timer = require('./timing')
const timer = new Timer()

var item = timer.start('hello')
console.log(item);
var endItem = timer.end('hello')
console.log(endItem);
var item = timer.start('hello')
console.log(item);
var endItem = timer.end('hello')
console.log(endItem);
var item = timer.start('hello')
console.log(item);
var endItem = timer.end('hello')
console.log(endItem);
var item = timer.start('hello')
console.log(item);
var endItem = timer.end('hello')
console.log(endItem);
