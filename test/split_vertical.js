var test = require('tap').test;
var bsp = require('..');
var unpack = require('ndarray-unpack');

test('split vertically', function (t) {
  t.plan(1);
  var tree = bsp(4);
  tree.split(true);
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0, 2, 2],
      [0, 0, 2, 2],
      [0, 0, 2, 2],
      [0, 0, 2, 2]
    ]
  );
});
