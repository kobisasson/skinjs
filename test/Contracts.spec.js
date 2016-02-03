"use strict";
var assert = require('assert');

var C = require('./../src/contracts.js');


describe('Contracts lib test', function () {

    describe('Test basic APIs', function () {

        it('string contract test', function () {
            assert.equal(C.string('aaa'), 'aaa');

            assert.throws(() => C.string(3));
            assert.throws(() => C.string(null));
            assert.throws(() => C.string(undefined));
            assert.throws(() => C.string(true));
            assert.throws(() => C.string({}));
            assert.throws(() => C.string([]));
            assert.throws(() => C.string((x)=> x ));
            assert.throws(() => C.string(new Date()));
        });

        it('number contract test', function () {
            assert.equal(C.number(3), 3);

            assert.throws(() => C.number(''));
            assert.throws(() => C.number(null));
            assert.throws(() => C.number(undefined));
            assert.throws(() => C.number(true));
            assert.throws(() => C.number({}));
            assert.throws(() => C.number([]));
            assert.throws(() => C.number((x)=> x ));
            assert.throws(() => C.number(new Date()));
        });

        it('boolean contract test', function () {
            assert.equal(C.boolean(true), true);

            assert.throws(() => C.boolean(''));
            assert.throws(() => C.boolean(null));
            assert.throws(() => C.boolean(undefined));
            assert.throws(() => C.boolean(3));
            assert.throws(() => C.boolean({}));
            assert.throws(() => C.boolean([]));
            assert.throws(() => C.boolean((x)=> x ));
            assert.throws(() => C.boolean(new Date()));
        });

        it('function contract test', function () {
            const func = (x)=> x ;
            assert.equal(C.function(func), func);

            assert.throws(() => C.function(''));
            assert.throws(() => C.function(null));
            assert.throws(() => C.function(undefined));
            assert.throws(() => C.function(3));
            assert.throws(() => C.function({}));
            assert.throws(() => C.function([]));
            assert.throws(() => C.function(true));
            assert.throws(() => C.function(new Date()));
        });

        it('object contract test', function () {
            const obj = {},arr =[],date= new Date(),func =(x)=> x, str = new String() ;
            assert.equal(C.object(obj), obj);
            assert.equal(C.object(arr), arr);
            assert.equal(C.object(str), str);


            assert.throws(() => C.object(''));
            assert.throws(() => C.object(undefined));
            assert.throws(() => C.object(true));
            assert.throws(() => C.object(null));
            assert.throws(() => C.object(3));
            assert.throws(() => C.date((x) => x ));
        });

        it('date contract test', function () {
            const date = new Date() ;
            assert.equal(C.date(date), date);
            assert.throws(() => C.date(''));
            assert.throws(() => C.date(null));
            assert.throws(() => C.date(undefined));
            assert.throws(() => C.date(3));
            assert.throws(() => C.date({}));
            assert.throws(() => C.date([]));
            assert.throws(() => C.date(true));
            assert.throws(() => C.date((x) => x ));
        });

        it('stringOrNil contract test', function () {
            assert.equal(C.stringOrNil('aaa'), 'aaa');
            assert.equal(C.stringOrNil(null), null);
            assert.equal(C.stringOrNil(undefined), undefined);
            assert.throws(() => C.stringOrNil(3));
            assert.throws(() => C.stringOrNil(true));
            assert.throws(() => C.stringOrNil({}));
            assert.throws(() => C.stringOrNil([]));
            assert.throws(() => C.stringOrNil((x)=> x ));
            assert.throws(() => C.stringOrNil(new Date()));
        });

        it('numberOrNil contract test', function () {
            assert.equal(C.numberOrNil(3), 3);
            assert.equal(C.numberOrNil(null), null);
            assert.equal(C.numberOrNil(undefined), undefined);
            assert.throws(() => C.numberOrNil(''));
            assert.throws(() => C.numberOrNil(true));
            assert.throws(() => C.numberOrNil({}));
            assert.throws(() => C.numberOrNil([]));
            assert.throws(() => C.numberOrNil((x)=> x ));
            assert.throws(() => C.numberOrNil(new Date()));
        });

        it('booleanOrNil contract test', function () {
            assert.equal(C.booleanOrNil(true), true);
            assert.equal(C.booleanOrNil(null), null);
            assert.equal(C.booleanOrNil(undefined), undefined);
            assert.throws(() => C.booleanOrNil(''));
            assert.throws(() => C.booleanOrNil(3));
            assert.throws(() => C.booleanOrNil({}));
            assert.throws(() => C.booleanOrNil([]));
            assert.throws(() => C.booleanOrNil((x)=> x ));
            assert.throws(() => C.booleanOrNil(new Date()));
        });

        it('functionOrNil contract test', function () {
            const func = (x)=> x ;
            assert.equal(C.functionOrNil(func), func);
            assert.equal(C.functionOrNil(null), null);
            assert.equal(C.functionOrNil(undefined), undefined);
            assert.throws(() => C.functionOrNil(''));
            assert.throws(() => C.functionOrNil(3));
            assert.throws(() => C.functionOrNil({}));
            assert.throws(() => C.functionOrNil([]));
            assert.throws(() => C.functionOrNil(true));
            assert.throws(() => C.functionOrNil(new Date()));
        });

        it('objectOrNil contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.objectOrNil(obj), obj);
            assert.equal(C.objectOrNil(null), null);
            assert.equal(C.objectOrNil(undefined), undefined);
            assert.equal(C.objectOrNil(arr), arr);
            //assert.throws(() => C.objectOrNil(''));
            assert.throws(() => C.objectOrNil(3));
            assert.throws(() => C.objectOrNil(true));
            assert.throws(() => C.objectOrNil((x) => x ));
        });

        it('integer contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.integer(3), 3);
            assert.equal(C.integer(-3), -3);
            assert.equal(C.integer(0), 0);
            assert.equal(C.integer(Number.MAX_VALUE), Number.MAX_VALUE);
            assert.equal(C.integer(Number.MIN_VALUE), Number.MIN_VALUE);

            assert.throws(() => C.integer(NaN));
            assert.throws(() => C.integer(''));
            assert.throws(() => C.integer(3.3));
            assert.throws(() => C.integer(true));
            assert.throws(() => C.integer((x) => x ));
        });

        it('Positive integer contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.integerPositive(3), 3);

            assert.throws(() => C.integerPositive(-3));
            assert.throws(() => C.integerPositive(0));
            assert.throws(() => C.integerPositive(NaN));
            assert.throws(() => C.integerPositive(''));
            assert.throws(() => C.integerPositive(3.3));
            assert.throws(() => C.integerPositive(true));
            assert.throws(() => C.integerPositive((x) => x ));
        });

        it('Negetive integer contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.integerNegative(-3), -3);

            assert.throws(() => C.integerNegative(3));
            assert.throws(() => C.integerNegative(0));
            assert.throws(() => C.integerNegative(NaN));
            assert.throws(() => C.integerNegative(''));
            assert.throws(() => C.integerNegative(3.3));
            assert.throws(() => C.integerNegative(true));
            assert.throws(() => C.integerNegative((x) => x ));
        });

        it('integer32 contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.integer32(3), 3);
            assert.equal(C.integer32(-3), -3);
            assert.equal(C.integer32(0), 0);
            assert.equal(C.integer32(Math.pow(2, 31)-1), Math.pow(2, 31)-1);
            assert.equal(C.integer32(-Math.pow(2, 31))+1, -Math.pow(2, 31)+1);

            assert.throws(() => C.integer32(Math.pow(2, 32)));
            assert.throws(() => C.integer32(-Math.pow(2, 32)));
            assert.throws(() => C.integer32(Number.MIN_VALUE));
            assert.throws(() => C.integer32(NaN));
            assert.throws(() => C.integer32(''));
            assert.throws(() => C.integer32(3.3));
            assert.throws(() => C.integer32(true));
            assert.throws(() => C.integer32((x) => x ));
        });

        it('Positive 32 integer contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.integer32Positive(3), 3);
            assert.equal(C.integer32Positive(Math.pow(2, 31)-1), Math.pow(2, 31)-1);

            assert.throws(() => C.integer32Positive(-3));
            assert.throws(() => C.integer32Positive(0));
            assert.throws(() => C.integer32Positive(NaN));
            assert.throws(() => C.integer32Positive(''));
            assert.throws(() => C.integer32Positive(3.3));
            assert.throws(() => C.integer32Positive(true));
            assert.throws(() => C.integer32Positive((x) => x ));
        });

        it('Negative 32 integer contract test', function () {
            const obj = {} , arr = [];
            assert.equal(C.integer32Negative(-3), -3);
            assert.equal(C.integer32Negative(-Math.pow(2, 31))+1, -Math.pow(2, 31)+1);

            assert.throws(() => C.integer32Negative(3));
            assert.throws(() => C.integer32Negative(0));
            assert.throws(() => C.integer32Negative(NaN));
            assert.throws(() => C.integer32Negative(''));
            assert.throws(() => C.integer32Negative(3.3));
            assert.throws(() => C.integer32Negative(true));
            assert.throws(() => C.integer32Negative((x) => x ));
        });

        it('experssion contract test', function () {
            const obj = {} , arr = [];
            const exp = C.expression(/^\d+/);
            assert.equal(exp(3), 3);

            assert.throws(() => exp(-4));
            assert.throws(() => exp(NaN));
            assert.throws(() => exp(''));
            assert.throws(() => exp(true));
            assert.throws(() => exp((x) => x ));
        });

    });
});
