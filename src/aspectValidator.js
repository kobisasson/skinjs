'use strict';
var R = require('ramda');
var C = require('./contracts');

/*************************************
 *
 *************************************/

const aspectValidator = function () {

    const slice = Function.prototype.call.bind([].slice);

    const arity = function (n, fn) {
        /*jshint maxcomplexity:false */
        switch (n) {
            case 0:
                return function () {
                    return fn.apply(this, arguments);
                };
            case 1:
                return function (a0) {
                    return fn.apply(this, arguments);
                };
            case 2:
                return function (a0, a1) {
                    return fn.apply(this, arguments);
                };
            case 3:
                return function (a0, a1, a2) {
                    return fn.apply(this, arguments);
                };
            case 4:
                return function (a0, a1, a2, a3) {
                    return fn.apply(this, arguments);
                };
            case 5:
                return function (a0, a1, a2, a3, a4) {
                    return fn.apply(this, arguments);
                };
            case 6:
                return function (a0, a1, a2, a3, a4, a5) {
                    return fn.apply(this, arguments);
                };
            case 7:
                return function (a0, a1, a2, a3, a4, a5, a6) {
                    return fn.apply(this, arguments);
                };
            case 8:
                return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                    return fn.apply(this, arguments);
                };
            case 9:
                return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                    return fn.apply(this, arguments);
                };
            case 10:
                return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                    return fn.apply(this, arguments);
                };
            default:
                throw new Error('First argument must be between 0 to 10');
        }
    };


    const weakTraverse = function (aContracts) {
        C.arrayOf(C.function)(aContracts);
        const len = aContracts.length;
        return function (args) {
            C.array(args);
            if (args.length > len) {
                throw new TypeError('Too much arguments, Expected: ' + len + ' Actual: ' + args.length);
            }
            const result = [];
            for (let i = 0; i < len; ++i) {
                result[i] = aContracts[i](args[i]);
            }
            return result;
        };
    };


                            /*context,before,after arg1, ..., argn, output */
    const aspect = R.curry(function aspect(context, before, after, __placeholder) {
        const args = slice(arguments);
        const len = arguments.length;
        context = args[0] || {};
        before = C.functionOrNil(args[1]);
        after = C.functionOrNil(args[2]);
        const beforeValidator = weakTraverse(C.arrayOf(C.function)(slice(args, 3, len - 1)));
        const afterValidator = C.function(args[len - 1]);
        const result = function (middle) {
            const result = arity(len - 4, function () {
                const beforeFn = (before && before.bind(context)) || null;
                const afterFn = (after && after.bind(context)) || null;
                let args = slice(arguments);
                args = (beforeFn && beforeFn.apply(context, args) ) || args;
                let output = middle.apply(this,
                    beforeValidator(args));
                output = (afterFn && afterFn(output)) || output;
                return afterValidator(output);
            });
            return result;
        };

        return result;
    });

    const perfStrategy = function (filename) {
        const atom = {};
        atom.context = atom;
        atom.before = function () {
            this.start = new Date();
        };
        atom.after = function () {
            console.log(( filename || '') +': function ' + atom.__funcName + ' took  ' +
                (new Date().getTime() - this.start.getTime() ) + ' ms to generate ' + arguments[0] );
        };
        return atom;
    };


    const aspectBuilder = function () {
        const atom = {};
        const strategies = [];
        const userStrategy = {};
        let funcName;
        const __before = function () {
            const args = arguments;
            strategies.forEach(function (strategy) {
                strategy.__funcName = funcName;
                if (strategy.before) {
                    strategy.before.apply(strategy.context, args);
                }
            });
        };

        const __after = function () {
            const args = arguments;
            strategies.forEach(function (strategy) {
                strategy.__funcName = funcName;
                if (strategy.after) {
                    strategy.after.apply(strategy.context, args);
                }
            });
        };

        atom.bind = function (context) {
            C.object(context);
            userStrategy.context = context;
            return atom;
        };
        atom.before = function (beforeFn) {
            C.function(beforeFn);
            userStrategy.before = beforeFn;
            return atom;
        };
        atom.after = function (afterFn) {
            C.function(afterFn);
            userStrategy.after = afterFn;
            return atom;
        };
        atom.use = function (strategy) {
            C.object(strategy);
            strategies.push(strategy);
            return atom;
        };
        atom.validate = function () {
            atom._args = slice(arguments);
            return atom;
        };
        atom.for = function (body) {
            C.function(body);
            funcName = body.name;
            strategies.push(userStrategy);
            const asp = aspect(atom._context, __before, __after);
            return asp.apply(null, atom._args)(body);

        };
        return atom;
    };

    return {
        'perfStrategy':perfStrategy,
        'aspectBuilder': aspectBuilder,
        'aspect': aspect
    };

};

module.exports = aspectValidator();


