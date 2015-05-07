var ndarray = require('ndarray');
var inherits = require('inherits');
var leaf = require('./leaf');
var isarray = require('isarray');

module.exports = tree;
inherits(tree, leaf);

function tree (size, arr) {
  if (!(this instanceof tree)) return new tree(size, arr);
  leaf.call(this, ndarray(new Uint8Array(size * size), [size, size]));
  this.size = size;
  if (isarray(arr)) parse(arr, this);
}

tree.prototype.north = function (offset) {
  var k = Math.floor(offset / this.size);
  var frag = this.data.pick(null, offset % this.size).hi(k);
  for (var i = k; i >= 0; i--) {
    var n = frag.get(i);
    if (n != offset) return n;
  }
};

tree.prototype.south = function (offset) {
  var k = Math.floor(offset / this.size);
  var frag = this.data.pick(null, offset % this.size).lo(k)
  for (var i = 0; i < this.size - k; i++) {
    var n = frag.get(i);
    if (n != offset) return n;
  }
};

tree.prototype.west = function (offset) {
  var k = offset % this.size;
  var frag = this.data.pick(Math.floor(offset/this.size), null).hi(k);
  for (var i = k; i >= 0; i--) {
    var n = frag.get(i);
    if (n != offset) return n;
  }
};

tree.prototype.east = function (offset) {
  var k = Math.abs((this.size - (offset % this.size)));
  var frag = this.data.pick(offset / this.size, null).hi(k);
  for (var i = 0; i < k; i++) {
    var n = frag.get(i);
    if (n != offset) return n;
  }
};

function parse (arr, cursor) {
  if (!arr.length) return;
  cursor.split(!!(arr[0]-1));
  arr.slice(1).forEach(function (x, i) {
    parse(x, cursor.leafs[i]);
  });
}
