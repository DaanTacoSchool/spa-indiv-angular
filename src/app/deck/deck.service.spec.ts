const calculator = {
  sum: function(x, y) {
    return x + y;
  }
}

describe('test test', function () {

  it('1 + 1 should equal 2', function () {
    expect(calculator.sum(1, 1)).toBe(2);
  });

});
