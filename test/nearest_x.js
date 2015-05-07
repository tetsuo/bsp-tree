var test = require('tap').test;
var bsp = require('..');

test('get nearest on x axis', function (t) {
  t.plan(12);
  var tree = bsp(4);
  tree.split();
  var p = tree.leafs[0].split(true);
  p.leafs[0].split(true);
  p.leafs[1].split(true);
  tree.leafs[1].split(true);
  // [ 
  //   [ 0,  1,  2,  3 ],
  //   [ 0,  1,  2,  3 ],
  //   [ 8,  8, 10, 10 ],
  //   [ 8,  8, 10, 10 ] 
  // ]
  t.equal(tree.east(0), 1);
  t.equal(tree.east(1), 2);
  t.equal(tree.east(2), 3);
  t.equal(tree.east(3), undefined);
  t.equal(tree.east(8), 10);
  t.equal(tree.east(10), undefined);
  t.equal(tree.west(10), 8);
  t.equal(tree.west(8), undefined);
  t.equal(tree.west(3), 2);
  t.equal(tree.west(2), 1);
  t.equal(tree.west(1), 0);
  t.equal(tree.west(0), undefined);
});