'use strict';

describe('common/util.js', function() {
  var undef;
  var util = require('../../src/common/index');

  describe('#isObject', function() {
    it('should be true for {}', function() {
      expect(util.isObject({})).toBe(true);
    });

    it('should be true for {hello: "world"}', function() {
      expect( util.isObject({ hello: 'world' }), true).toBe(true);
    });

    it('should be true for new Date', function() {
      expect( util.isObject(new Date()), true).toBe(true);
    });

    it('should return true for []', function() {
      expect( util.isObject([]), true).toBe(true);
    });

    it('should be false for null', function() {
      expect( util.isObject(null), false).toBe(false);
    });

    it('should be false for "hello"', function() {
      expect( util.isObject('hello'), false).toBe(false);
    });

    it('should be false for 1', function() {
      expect( util.isObject(1), false).toBe(false);
    });

    it('should be false for undefined', function() {
      expect( util.isObject(undef)).toBe(false);
    });
  });

  describe('#isArray', function() {
    it('should be false for {}', function() {
      expect( util.isArray({}), false).toBe(false);
    });

    it('should be false for new Date', function() {
      expect( util.isArray(new Date()), false).toBe(false);
    });

    it('should return true for []', function() {
      expect( util.isArray([]), true).toBe(true);
    });

    it('should return true for ["apple"]', function() {
      expect( util.isArray(['apple']), true).toBe(true);
    });

    it('should be false for null', function() {
      expect( util.isArray(null), false).toBe(false);
    });

    it('should be false for "hello"', function() {
      expect( util.isArray('hello'), false).toBe(false);
    });

    it('should be false for 1', function() {
      expect( util.isArray(1), false).toBe(false);
    });

    it('should be false for undefined', function() {
      expect( util.isArray(undef)).toBe(false);
    });
  });

  describe('#isFunction', function() {
    it('should be true if passed a function', function() {
      expect(util.isFunction(function() {}) ).toBe(true);
    });

    it('should be false if passed a non-function', function() {
      expect(util.isFunction(5)).toBe(false);
    });

    it('should be true if passed a key that points to a function', function() {
      var foo = { bar: function() {} };
      expect(util.isFunction(foo, 'bar')).toBe(true);
    });

    it('should be false if passed a key but object is null', function() {
      expect(util.isFunction(null, 'bar')).toBe(false);
    });

    it('should be false if passed a key that does not exist', function() {
      var foo = { bar: function() {} };
      expect(util.isFunction(foo, 'foobar')).toBe(false);
    });
  });

  describe('#extend', function() {
    it('should work for merging objects', function() {
      expect(util.extend({happy: 'happy'}, {'joy': 'joy'}))
        .toEqual({happy: 'happy', joy: 'joy'});
    });

    it('should return the first argument', function() {
      var firstArg = {};
      expect(util.extend(firstArg, {'joy': 'joy'})).toEqual(firstArg);
    });

    it('should not fail if a non-object is passed in', function() {
      expect(util.extend({happy: 'happy'}, null, 5, true, {'joy': 'joy'}))
        .toEqual({happy: 'happy', joy: 'joy'});
    });

    it('should ignore strings and not iterate their characters', function() {
      expect(util.extend({foo: 'bar'}, 'hello world', {hello: 'world'}))
        .toEqual({foo: 'bar', hello: 'world'});
    });

    it('should work for many objects', function() {
      expect(util.extend({}, {one: 1}, {two: 2}, {three: {thirty: 30}}, {four: 4}))
        .toEqual({one: 1, two: 2, three: {thirty: 30}, four: 4});
    });

    it('should recursively merge if true is passed as first arg', function() {
      expect(util.extend(true, {a: {one: 1, two: 2}, b: 2}, {a: {two: 22, three: 33}, b: 22}))
        .toEqual({a: {one: 1, two: 22, three: 33}, b: 22});
    });

    it('should not recursively merge if false is passed as first arg', function() {
      expect(util.extend(false, {a: {one: 1, two: 2}, b: 2}, {a: {two: 22}, b: 22}))
        .toEqual({a: {two: 22}, b: 22});
    });
  });

  describe('#bind', function() {
    it('should set `this` appropriately', function() {
      var obj = {hello: 'world'};
      function tryBind() {
        /*jshint validthis:true */
        return this.hello;
      }
      expect(util.bind(tryBind, obj)()).toEqual('world');
    });

    it('should work with arguments', function() {
      var obj = {hello: 'world'};
      function tryBind(a) {
        /*jshint validthis:true */
        return a+' '+this.hello;
      }
      expect(util.bind(tryBind, obj, 'hello')()).toEqual('hello world');
    });

    it('should work with null scope', function() {
      function tryBind(a, b) {
        return a+' '+b;
      }
      expect(util.bind(tryBind, null, 'hello', 'world')()).toEqual('hello world');
    });
  });

  describe('#each', function() {
    it('should iterate an array', function() {
      var vals = ['a', 'b', 'c'];
      var ct = 0;
      util.each(vals, function(v, k) {
        expect(k).toEqual(ct);
        expect(v).toEqual(vals[k]);
        ct++;
      });
      expect(ct).toEqual(vals.length);
    });

    it('should iterate an empty array', function() {
      var ct = 0;
      util.each([], function() { ct++; });
      expect(ct).toEqual(0);
    });

    it('should iterate an object', function() {
      var vals = {one: 0, two: 1, three: 2};
      var ct = 0;
      util.each(vals, function(v, k) {
        expect(v).toEqual(ct);
        expect(vals[k]).toEqual(ct);
        ct++;
      });
      expect(ct).toEqual(3);
    });

    it('should iterate an empty object', function() {
      var ct = 0;
      util.each({}, function() { ct++; });
      expect(ct).toEqual(0);
    });

    it('should iterate arguments object', function(){
      var ct = 0;
      var args = ['a', 'b', 'c'];
      function itList() {
        util.each(arguments, function(v,i) {
          expect(i).toEqual(ct);
          expect(v).toEqual(args[i]);
          ct++;
        });
        expect(ct).toEqual(args.length);
      }
      itList.apply(null, args);
    });
  });

  describe('#keys', function() {
    it('should iterate array', function() {
      expect(util.keys(['a', 'b', 'c'])).toEqual([0, 1, 2]);
    });

    it('should iterate object', function() {
      expect(util.keys({foo: 'hello', bar: 'world'})).toEqual(['foo', 'bar']);
    });

    it('should not fail with null', function() {
      expect(util.keys(null)).toEqual([]);
    });
  });

  describe('#map', function() {
    it('should iterate array', function() {
      var res = util.map([1, 2, 3], function(v) { return v*2; });
      expect(res).toEqual([2, 4, 6]);
    });

    it('should iterate objects', function() {
      var res = util.map({foo: 'bar'}, function(v, k) { return k; });
      expect(res).toEqual(['foo']);
    });

    it('should not fail with null', function() {
      var res = util.map(null, function() { return 'oops'; });
      expect(res).toEqual([]);
    });

    it('should skip undefined values', function() {
      var res = util.map([1, 2, undef, 3], function(v) { return v; });
      expect(res).toEqual([1, 2, 3]);
    });
  });

  describe('#mapObject', function() {
    it('should map objects', function() {
      var res = util.mapObject({foo: 'bar'}, function(v, k) { return k+':'+v; });
      expect(res).toEqual({foo: 'foo:bar'});
    });

    it('should not mind empty objects', function() {
      var res = util.mapObject({}, function() { return null; });
      expect(res).toEqual({});
    });

    it('should skip undefined values', function() {
      var res = util.mapObject({a: false, b: null, c: true, d: ''}, function(v,k) { return k === 'c'? undef : v; });
      expect(Object.keys(res)).toEqual(['a', 'b', 'd']);
    });

    it('should not fail with null', function() {
      var res = util.mapObject(null, function() { return 'oops'; });
      expect(res).toEqual({});
    });
  });

  describe('#indexOf', function() {
    it('should return -1 if not found', function() {
      expect(util.indexOf(['a', 'b', 'c'], 2)).toEqual(-1);
    });

    it('should return correct index if found', function() {
      expect(util.indexOf(['a', 'b', 'c'], 'c')).toEqual(2);
    });
  });

  describe('#remove', function() {
    it('should remove existing item from array', function() {
      var list = ['a', 'b', 'c', 'd', 'e'];
      expect(util.remove(list, 'c')).toBe(true);
      expect(list).toEqual(['a', 'b', 'd', 'e']);
    });

    it('should remove item from 0 index', function() {
      var list = ['a', 'b', 'c', 'd', 'e'];
      expect(util.remove(list, 'a')).toBe(true);
      expect(list).toEqual(['b', 'c', 'd', 'e']);
    });

    it('should remove item from last index', function() {
      var list = ['a', 'b', 'c', 'd', 'e'];
      expect(util.remove(list, 'e')).toBe(true);
      expect(list).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should not remove non-existent item from array', function() {
      var list = ['a', 'b', 'c', 'd', 'e'];
      expect(util.remove(list, 'f')).toBe(false);
      expect(list).toEqual(['a', 'b', 'c', 'd', 'e']);
    });

    it('should remove existing item from an object', function() {
      var list = {a: 1, b: 2, c: 3, d: 4, e: 5};
      expect(util.remove(list, 3)).toBe(true);
      expect(list).toEqual({a: 1, b: 2, d: 4, e: 5});
    });

    it('should not remove non-existent item from an object', function() {
      var list = {a: 1, b: 2, c: 3, d: 4, e: 5};
      expect(util.remove(list, 0)).toBe(false);
      expect(list).toEqual({a: 1, b: 2, c: 3, d: 4, e: 5});
    });

    it('should not fail if passed null', function() {
      expect(util.remove(null, 5)).toBe(false);
    });
  });

  describe('#isEmpty', function() {
    it('returns true for empty array', function() {
      expect(util.isEmpty([])).toBe(true);
    });

    it('returns false for full array', function() {
      expect(util.isEmpty([null])).toBe(false);
    });

    it('returns true for empty object', function() {
      expect(util.isEmpty({})).toBe(true);
    });

    it('returns false for full object', function() {
      expect(util.isEmpty({foo: 'bar'})).toBe(false);
    });

    it('returns false for a primitive value', function() {
      expect(util.isEmpty(0)).toBe(false);
    });

    it('returns true for null', function() {
      expect(util.isEmpty(null)).toBe(true);
    });

    it('returns true for undefined', function() {
      expect(util.isEmpty()).toBe(true);
    });
  });

  describe('#find', function() {
    it('passes a value and index for arrays', function() {
      util.find(['foo'], function(v, k) {
        expect(v).toEqual('foo');
        expect(k).toEqual(0);
      });
    });

    it('passes a value and a key for objects', function() {
      util.find({foo: 'bar'}, function(v, k) {
        expect(v).toEqual('bar');
        expect(k).toEqual('foo');
      });
    });

    it('finds an item in an array', function() {
      var res = util.find(['foo', 'bar'], function(v) { return v === 'bar'; });
      expect(res).toEqual('bar');
    });

    it('finds an item in an object', function() {
      var res = util.find({'foo': 'bar', 'hello': 'world'}, function(v, k) {
        return k === 'hello';
      });
      expect(res).toEqual('world');
    });

    it('returns undefined if no item found in array', function() {
      var res = util.find(['foo', 'bar'], function() { return false; });
      expect(res).toEqual(undef);
    });

    it('returns undefined if no item found in object', function() {
      var res = util.find({'foo': 'bar'}, function() { return false; });
      expect(res).toEqual(undef);
    });
  });

  describe('#defer', function() {
    it('should get invoked', function(done) {
      util.defer(done);
    });

    it('should not be invoked synchronously', function() {
      var called = false;
      util.defer(function() {
        called = true;
      });
      expect(called).toBe(false);
    });
  });

  describe('#isEqual', function() {
    it('should return false for null vs object', function() {
      expect(util.isEqual(null, {})).toBe(false);
    });

    it('should return false for null vs 0', function() {
      expect(util.isEqual(null, 0)).toBe(false);
    });

    it('should return false for null vs undefined', function() {
      expect(util.isEqual(null, undef)).toBe(false);
    });

    it('should return true for null,null', function() {
      expect(util.isEqual(null, null)).toBe(true);
    });

    it('should return true for two empty objects', function() {
      expect(util.isEqual({}, {})).toBe(true);
    });

    it('should return false for two obects with diff values of same type', function() {
      expect(util.isEqual({foo: 'foo', bar: 'bar'}, {foo: 'ffoo', bar: 'bar'})).toBe(false);
    });

    it('should return false for two obects with same value of diff types (string vs number)', function() {
      expect(util.isEqual({foo: 1, bar: 2}, {foo: 1, bar: '2'})).toBe(false);
    });

    it('should return true if keys are in diff order for an object', function() {
      expect(util.isEqual({foo: 'ffoo', bar: 'barr'}, {bar: 'barr', foo: 'ffoo'})).toBe(true);
    });

    it('should return true for nested equal objects', function() {
      expect(util.isEqual({foo: 'ffoo', bar: {barr: 'barr'}}, {bar: {barr: 'barr'}, foo: 'ffoo'})).toBe(true);
    });

    it('should return true for [] vs []', function() {
      expect(util.isEqual([], [])).toBe(true);
    });

    it('should return true for nested equal arrays', function() {
      expect(util.isEqual([1, 2, [3, 4]], [1, 2, [3, 4]])).toBe(true);
    });

    it('should return false for diff values of same type in an array', function() {
      expect(util.isEqual([1], [2])).toBe(false);
    });

    it('should return false for nested arrays with values of diff types (string vs number)', function() {
      expect(util.isEqual([1, 2, [3, 4]], [1, 2, [3, '4']])).toBe(false);
    });

    it('should return true for two equal integers', function() {
      expect(util.isEqual(1,1)).toBe(true);
    });

    it('should return false for two diff integers', function() {
      expect(util.isEqual(1,2)).toBe(false);
    });

    it('should return false for primitives of diff type (string vs number)', function() {
      expect(util.isEqual(1,'1')).toBe(false);
    });

    it('should return false for object vs array, even if same keys/vals', function() {
      expect(util.isEqual({0: 1}, [1])).toBe(false);
    });

  });

  describe('#has', function() {
    it('should find index in an array', function() {
      expect(util.has(['a', 'b', 'c', 'd'], 3)).toBe(true);
    });

    it('should find index in a hash', function() {
      expect(util.has({foo: 1, bar: 2}, 'bar')).toBe(true);
    });

    it('should return false if index not in array', function() {
      expect(util.has([1,2,3], 5)).toBe(false);
    });

    it('should return false if index not in object', function() {
      expect(util.has({foo: 1, bar: 2}, 'foobar')).toBe(false);
    });

    it('should return false if source is not a list', function() {
      expect(util.has(null, 5)).toBe(false);
    });
  });

  describe('#contains', function() {
    it('should find a value in an array', function() {
      expect(util.contains(['a', 'b', 'c', 'd'], 'c')).toBe(true);
    });

    it('should find using function in array', function() {
      expect(util.contains(['a', 'b', 'c', 'd'], function(v) { return v === 'c'; })).toBe(true);
    });

    it('should find a value in a hash', function() {
      expect(util.contains({foo: 'bar', hello: 'world'}, 'bar')).toBe(true);
    });

    it('should find using function in a hash', function() {
      expect(util.contains({foo: 'bar', hello: 'world'}, function(v,k) { return k === 'hello'; })).toBe(true);
    });

    it('should return false if value not found in array', function() {
      expect(util.contains([1,2,3], 5)).toBe(false);
    });

    it('should return false if value not found in object', function() {
      expect(util.contains({foo: 1, bar: 2}, 0)).toBe(false);
    });

    it('should return false if source is not a list', function() {
      expect(util.contains(null, 5)).toBe(false);
    });
  });

  describe('#inherits', function() {
    it('should be instanceof inherited class', function() {
      function A() {}
      function B() {}
      util.inherits(B, A);
      expect(new B()).toBeInstanceOf(A);
    });

    it('should preserve prototype methods added before calling inherits', function() {
      function A() {}
      function B() {}
      B.prototype.hello = function() { return 'world'; };
      util.inherits(B, A);
      var b = new B();
      expect(b.hello).toBeA('function');
      expect(b.hello()).toEqual('world');
    });

    it('should override methods that exist in both source and dest', function() {
      function A() {}
      A.prototype.foo = function() { return 'A'; };
      function B() {}
      B.prototype.foo = function() { return 'B'; };
      util.inherits(B, A);
      var b = new B();
      expect(b.foo).toBeA('function');
      expect(b.foo()).toEqual('B');
    });

    it('should copy prototype vars', function() {
      function A() {}
      A.prototype.foo = 'A';
      function B() {}
      B.prototype.bar = 'B';
      util.inherits(B, A);
      var b = new B();
      expect(b.foo).toEqual('A');
      expect(b.bar).toEqual('B');
    });

    it('should add additional methods passed into inherits', function() {
      function A() {}
      A.prototype.foo = 'A';
      function B() {}
      B.prototype.foo = 'B';
      util.inherits(B, A, {foo: 'C'});
      var b = new B();
      expect(b.foo).toEqual('C');
    });

    it('should inherit super of inherited class', function() {
      function A() {}
      A.prototype.foo = 'A';
      function B() {}
      B.prototype.foo = 'B';
      function C() {}
      C.prototype.foo = 'C';
      util.inherits(B, A);
      util.inherits(C, B);
      var c = new C();
      expect(c).toBeInstanceOf(B);
      expect(c).toBeInstanceOf(A);
      expect(c.foo).toEqual('C');
    });
  });

  describe('#bindAll', function() {
    it('should return the object being bound', function() {
      var o = { foo: function() {}, bar: function() {} };
      expect(util.bindAll({}, o)).toBe(o);
    });

    it('should set `this` for all methods', function() {
      var a = {}, spy = jasmine.createSpy();
      var o = {
        foo: function() { expect(this).toBe(a); spy(); },
        bar: function() { expect(this).toBe(a); spy(); }
      };
      util.bindAll(a, o);
      o.foo.call();
      o.bar.call();
      expect(spy.calls.count()).toBe(2);
    });

    it('should not affect anything but functions', function() {
      var list = ['a', 'b'];
      var o = {
        omega: list
      };
      util.bindAll({}, o);
      expect(o.omega).toBe(list);
    });
  });

  describe('#filter', function() {
    it('should remove items from array', function() {
      var vals = util.filter(['a', 'b', 'c', 'd', 'e'], function(v, k) {
        return v !== 'c' && k !== 0;
      });
      expect(vals).toEqual(['b', 'd', 'e']);
    });

    it('should remove items from object', function() {
      var vals = util.filter({one: 1, two: 2, three: 3, four: 4, five: 5}, function(v,k) {
        return v !== 1 && k !== 'five';
      });
      expect(vals).toEqual({two: 2, three: 3, four: 4});
    });

    it('should set `this` to scope in fn', function() {
      var a = {};
      util.each(['a', 'b', 'c'], function() {
        expect(this).toEqual(a);
      }, a);
    });
  });

  describe('#reduce', function() {
    it('should iterate objects', function() {
      function it(accum, v, k) {
        return accum + v;
      }

      expect(util.reduce({one: 1, five: 5, nine: 9}, 0, it)).toBe(15);
    });
    it('should iterate arrays', function() {
      function it(accum, v, k) {
        return accum + v;
      }
      expect(util.reduce([1, 5, 9], 0, it)).toBe(15);
    });

    it('should not care about primitives', function() {
      function it(accum, v, k) {
        return accum + v;
      }
      expect(util.reduce(null, 0, it)).toBe(0);
    });
  });

});
