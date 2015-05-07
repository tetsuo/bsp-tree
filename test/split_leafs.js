var test = require('tap').test;
var bsp = require('..');
var unpack = require('ndarray-unpack');

test('split leafs', function (t) {
  t.plan(4);
  var tree = bsp(4);
  tree.split(true);
  tree.leafs[0].split();
  t.deepEqual(unpack(tree.data),
    [
      [0, 0, 2, 2],
      [0, 0, 2, 2],
      [8, 8, 2, 2],
      [8, 8, 2, 2]
    ]
  );
  tree.leafs[1].split(true);
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0, 2, 3],
      [0, 0, 2, 3],
      [8, 8, 2, 3],
      [8, 8, 2, 3]
    ]
  );
  tree.leafs[1].leafs[0].split();
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0,  2, 3],
      [0, 0,  2, 3],
      [8, 8, 10, 3],
      [8, 8, 10, 3]
    ]
  );
  tree.leafs[0].leafs[1].split();
  t.deepEqual(unpack(tree.data), 
    [
      [0,   0,  2, 3],
      [0,   0,  2, 3],
      [8,   8, 10, 3],
      [12, 12, 10, 3]
    ]
  );
});
