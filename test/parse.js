var test = require('tap').test;
var bsp = require('..');

test('parse', function (t) {
  t.plan(1);
  var tree = bsp(16).split();
  tree.leafs[0].split(true).leafs[1].split();
  var leaf = tree.leafs[1].split();
  leaf.leafs[0].split(true);
  var copy = bsp(16, tree.serialize());
  t.deepEqual(tree.serialize(), copy.serialize());
});
