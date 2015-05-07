var test = require('tap').test;
var bsp = require('..');
var unpack = require('ndarray-unpack');

test('merge', function (t) {
  t.plan(3);
  var tree = bsp(4);
  tree.split(true);
  tree.leafs[1].split().leafs[0].split(true).merge();
  tree.leafs[1].leafs[0].merge();
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0,  2,  2],
      [0, 0,  2,  2],
      [0, 0, 10, 10],
      [0, 0, 10, 10]
    ]
  );
  tree.leafs[1].merge();
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0, 2, 2],
      [0, 0, 2, 2],
      [0, 0, 2, 2],
      [0, 0, 2, 2]
    ]
  );
  tree.merge();
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  );
});
