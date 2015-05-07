# bsp-tree

constructs a binary space partitioning tree.

A [BSP](http://en.wikipedia.org/wiki/Binary_space_partitioning) tree is a binary tree used to sort and search for polytopes in n-dimensional space.

# example

For example, given a square somewhere in the `XY` plane, we select the first split, and thus the root of the BSP tree, to cut the square in half in the `X` direction. At each slice, we will choose a line of the opposite orientation from the last one, so the second slice will divide each of the new pieces in the `Y` direction.

The result is shown in the following figure along with the BSP tree which describes it:

```
+-----------+      +-----+-----+      +-----+-----+
|           |      |     |     |      |     |     |
|           |      |     |     |      |  d  |     |
|           |      |     |     |      |     |     |
|     a     |  ->  |  b  X  c  |  ->  +--Y--+  c  |  -> ...
|           |      |     |     |      |     |     |
|           |      |     |     |      |  e  |     |
|           |      |     |     |      |     |     |
+-----------+      +-----+-----+      +-----+-----+
      a                  X                  X           ...
                       -/ \+              -/ \+
                       /   \              /   \
                      b     c            Y     c
                                       -/ \+
                                       /   \
                                      d     e
```

to build such a tree that recursively divides its first half:

```js
var bsp = require('bsp-tree');

var node = bsp(8),
    vertical = true;

while (node.data.shape[0] > 1) {
  vertical = !(node.split(vertical).dir);
  node = node.leafs[0];
}
```

# methods

## var tree = bsp(size [, repr])

Returns a data structure `tree` that represents the root of a BSP tree of finite `size`.

Following methods are both applicable to a `tree` and its leafs.

## leaf.split(vertical=false)

Divides a tree (or a leaf) into `leafs`. Each `leaf` represents a convex region which is partitioned in two convex sub-regions at each side of a cut hyperplane. The root `leaf` contains the complete space.

## leaf.merge()

Merges the split parts.

## leaf.flip()

Flips the orientation.

## var repr = leaf.serialize()

Returns an array representation of a tree that you can use to create a copy.

```js
var tree = bsp(4);
tree.split().leafs[0].split(true);
var copy = bsp(4, tree.serialize());
```

Following methods are only applicable to root node.

Given an offset of a `leaf` (that can be accessed through `leaf.data.offset`) these return the nearest plane's offset in x or y direction.

## var offset = tree.north(offset)

## var offset = tree.south(offset)

## var offset = tree.west(offset)

## var offset = tree.east(offset)

# properties

## leaf.leafs

Nodes of a subdivision can be accessed through `leafs` array. If not divided this property is `null` by default.

## leaf.data

Underlying [ndarray](https://github.com/scijs/ndarray) instance which is shared among all split parts.

## leaf.dir

A boolean that indicates the split direction.

# license

mit