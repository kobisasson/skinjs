"use strict";
var assert = require('assert');
var shell = require('shelljs');
var AV = require('./../src/aspectValidator');
var C = require('./../src/contracts.js')
var R = require('ramda');

describe('Aspect Validator test', function () {


    describe('Basic APIs', function () {

        it('aspect  test', function () {
            const log = (x) => console.log("before:", x);
            this.x = "yooo";
            let before = function () {
                this.start = new Date();
                return R.slice(0, Infinity, arguments);
            };
            let after = function (result) {
                assert.equal(this.x, "yooo");
            };
            const funcValidator = AV.aspect(this, before, after, C.integer32, C.string);
            const func = funcValidator((y) => y + '');
            assert.deepEqual(func(3), "3");
            assert.deepEqual(func(33), "33");
            assert.throws(()=> func("33"));
        });

        it('aspect Builder test', function () {

            const aspect = AV.aspectBuilder();
            const log = (x) => console.log("before:", x);
            this.x = "yooo";
            const func = aspect.before(function () {
                this.start = new Date();
                return R.slice(0, Infinity, arguments);
            }).after(function (result) {
                assert.equal(this.x, "yooo");
            }).bind(this)
                .validate(C.integer32, C.string)
                .for((y) => y + '');

            assert.deepEqual(func(3), "3");
            assert.deepEqual(func(33), "33");
            assert.throws(()=> func("33"));
        });

        it('aspect Builder test: Partial initialization', function () {
            const aspect = AV.aspectBuilder();
            const func = aspect.bind(this)
                .validate(C.integer32, C.string)
                .for(function add (y){ return y +''});

            assert.deepEqual(func(3), "3");
            assert.deepEqual(func(33), "33");
            assert.throws(()=> func("33"));
        });

        it('aspect Builder test: Partial initialization:no bind', function () {
            const aspect = AV.aspectBuilder();
            const func = aspect.validate(C.integer32, C.string)
                .for((y) => y + '');

            assert.deepEqual(func(3), "3");
            assert.deepEqual(func(33), "33");
            assert.throws(()=> func("33"));
        });

        it('aspect Builder test: use strategy', function () {
            const aspect = AV.aspectBuilder();
            function long(y){
                for (let i=0;i<1000000;i++) {}
                return y +'';
            }
            const func = aspect.use(AV.perfStrategy(__filename)).validate(C.integer32, C.string)
                .for(long);

            assert.deepEqual(func(3), "3");
            assert.deepEqual(func(33), "33");
            assert.throws(()=> func("33"));
        });

    });
});
