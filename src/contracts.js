'use strict';


/*************************************
 *
 *************************************/

const contracts = function (){
    const getObjectName = Function.prototype.call.bind({}.toString);

    //TYPES:
    // 1. Undefined
    // 2, Null
    // 3. Boolean
    // 4, String
    // 5. Symbol
    // 6. Number
    // 7. Object.
    const typeOf = function (type ){

        return function(x){
            if( x !== null &&  typeof x === type ){
                return x;
            }else{
                throw new TypeError('Expected a '+ type + '.');
            }
        };
    };

    const weakTypeOf = function (type ){
        return function(x){
            if( x === null || x === undefined || typeof x === type ){
                return x;
            }else{
                throw new TypeError('Expected a '+ type + '.');
            }
        };
    };

    // Creates a contract for an object inheriting from ctor
    var instanceOf = function (ctor) {
        return function (inst) {
            if (!(inst instanceof ctor)) {
                throw new TypeError('Expected an instance of ' + ctor);
            }
            return inst;
        };
    };
    const typeOf32Int = function (predicate,domain) {
        domain = strOrNil(domain) || '';
        predicate = predicate || (() => true);
        return function(n) {
            /*jslint bitwise: true */
            if ((n | 0) === n && predicate(n)) {
                return n;
            }
            throw new TypeError('Expected a 32-bit '+ domain + ' integer.');
        };
    };

    const typeOfInt = function (predicate,domain) {
        domain = strOrNil(domain) || '';
        predicate = predicate || (() => true);
        return function(n) {
            /*jslint bitwise: true */
            if ((typeof n === 'number') && (n % 1 === 0 || n === Number.MIN_VALUE) && predicate(n)) {
                return n;
            }
            throw new TypeError('Expected a  '+ domain + ' integer.');
        };
    };
    const typeOfObject = function (type){
        return function(x){
            if(getObjectName(x) !== '[object '+type+']'){
                throw new TypeError('Expected an '+type);
            }else {
                return x;
            }
        };
    };

    const expression = function(exp){
        regexp(exp);
        return function(x){
            if(exp.test(x)){
                return x;
            }else{
                throw new TypeError('Input value does not match experssion:' + exp.toString());
            }
        };
    };
    // List all contracts
    const nil = (x) => x === undefined || x === null;
    const any = (x) => x;
    const str = typeOf('string');
    const num = typeOf('number');
    const bool = typeOf('boolean');
    const undef = typeOf('undefined');
    const obj = typeOf('object');
    const func = typeOf('function');
    const strOrNil = weakTypeOf('string'); // jshint ignore:line
    const objOrNil = weakTypeOf('object');
    const numOrNil = weakTypeOf('number');
    const boolOrNil = weakTypeOf('boolean');
    const funcOrNil = weakTypeOf('function');
    const int32 = typeOf32Int();
    const int32Positive  = typeOf32Int((n) => ( n > 0 ),'positive');
    const int32Negative  = typeOf32Int((n) => ( n < 0 ),'negative');
    const integer = typeOfInt();
    const integerPositive  = typeOfInt((n) => ( n > 0 ),'positive');
    const integerNegative  = typeOfInt((n) => ( n < 0 ),'negative');
    const arr = typeOfObject('Array');
    const date = typeOfObject('Date');
    const regexp = typeOfObject('RegExp');// jshint ignore:line
    const exp = expression;

    const createObject = function(o){
        obj(o);
        return Object.create(Object.getPrototypeOf(obj));
    };

    // Creates a contract for an array whose
    // enumerable properties all satisfy the contract c
    const arrOf = function(contract){
        return function(x){
            return arr(x).map(contract);
        };
    };
    // Creates a contract for an object whose
    // enumerable properties all satisfy the contract c
    const objOf = function (c) {
        func(c);
        return function (o) {
            var result = createObject(o);
            for (let i in o) {  // jshint ignore:line
                result[i] = c(o[i]);
            }
            return result;
        };
    };


    return {
        'any': any,
        // 5 basic javascript types.
        'string': str,
        'number': num,
        'boolean': bool,
        'function': func,
        'date': date,
        // the 5 basics yet optional.
        'stringOrNil': strOrNil,
        'numberOrNil': numOrNil,
        'booleanOrNil': boolOrNil,
        'functionOrNil': funcOrNil,
        'objectOrNil': objOrNil,
        // specialized  types
        'array': arr,
        'object': obj,
        'undefined': undef,

        'integer':integer,
        'integerPositive':integerPositive,
        'integerNegative':integerNegative,

        'integer32':int32,
        'integer32Positive':int32Positive,
        'integer32Negative':int32Negative,

        'arrayOf': arrOf,
        'objectOf':objOf,
        'typeOf': typeOf,
        'instanceOf':instanceOf,
        'expression': expression

    };

};

module.exports = contracts();


