var test = require('tap').test;
var bsp = require('..');

test('get nearest on y axis', function (t) {
  t.plan(12);
  var tree = bsp(4);
  tree.split(true);
  var p = tree.leafs[0].split();
  p.leafs[0].split();
  p.leafs[1].split();
  tree.leafs[1].split();
  // [ 
  //   [ 0,   0,  2,  2 ],
  //   [ 4,   4,  2,  2 ],
  //   [ 8,   8, 10, 10 ],
  //   [ 12, 12, 10, 10 ] 
  // ]
  t.equal(tree.north(0), undefined);
  t.equal(tree.north(4), 0);
  t.equal(tree.north(8), 4);
  t.equal(tree.north(12), 8);
  t.equal(tree.north(2), undefined);
  t.equal(tree.north(10), 2);
  t.equal(tree.south(0), 4);
  t.equal(tree.south(4), 8);
  t.equal(tree.south(8), 12);
  t.equal(tree.south(12), undefined);
  t.equal(tree.south(2), 10);
  t.equal(tree.south(10), undefined);
});