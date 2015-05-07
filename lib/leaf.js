module.exports = leaf;

function leaf (data) {
  this.data = data;
  this.nx = this.data.shape[0];
  this.ny = this.data.shape[1];
  this.leafs = null;
}

leaf.prototype.split = function (vertical) {
  var arr = this.data,
      dir = (~vertical + 1) * -1;

  if (arr.shape[dir] < 2) throw new Error('cannot split');

  this.dir = dir;
  var nx = this.nx, ny = this.ny, p = [null, null];
  if (vertical) {
    ny = this.ny>>1;
    p[1] = [0, ny];
  } else {
    nx = this.nx>>1;
    p[1] = [nx, 0];
  }
  p[0] = [nx, ny];
  this.leafs = [arr.hi.apply(arr, p[0]), arr.lo.apply(arr, p[1])];
  var self = this;
  this.leafs.forEach(function (data, k) {
    for (var i = 0; i < data.shape[0]; ++i) {
      for (var j = 0; j < data.shape[1]; ++j) {
        data.set(i, j, data.offset);
      }
    }
    self.leafs[k] = new leaf(data);
  });
  return this;
};

leaf.prototype.merge = function () {
  this.leafs = null;
  for (var i = 0; i < this.nx; ++i) {
    for (var j = 0; j < this.ny; ++j) {
      this.data.set(i, j, this.data.offset);
    }
  }
  return this;
};

leaf.prototype.flip = function () {
  this.data.step(-1);
  return this;
};

leaf.prototype.serialize = function () {
  var dirs = null;
  if (this.leafs) {
    dirs = this.leafs.map(function (x) {
      return x.serialize();
    });
  }
  return [this.dir+1].concat(dirs).filter(Boolean);
};
