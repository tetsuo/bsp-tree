var test = require('tap').test;
var bsp = require('..');
var unpack = require('ndarray-unpack');

test('split horizontally', function (t) {
  t.plan(1);
  var tree = bsp(4);
  tree.split();
  t.deepEqual(unpack(tree.data), 
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [8, 8, 8, 8],
      [8, 8, 8, 8]
    ]
  );
});
