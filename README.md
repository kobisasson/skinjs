# README #


Summary
------------
Light weight aspect oriented library which enable validating functions based on contracts.
the library also enables to define pre and post activities before function.
or use your a predefined skin ( or more then one) which will be activated before and after the function body.

Installation
------------

To use with node:

```bash
$ npm install  skinjs
```


Documentation
------------
add the required  library in your code:
```javascript
var AV = require('skinjs').aspect;
var AB = AV.aspectBuilder;
var C = require('skinjs').contracts;
```

Then you can provide a contract to your function and attach before and after functions:
```javascript
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
                
```

you can also provide a skin ( or more then one) that will be activated before and after the function:
```javascript
const aspect = AV.aspectBuilder();

function long(y){
    for (let i=0;i<1000000;i++) {}
    return "done";
}

 const perfSkin = function (filename) {
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
const func = aspect.use(perfSkin(__filename)).validate(C.integer32, C.string)
    .for(long);

```


Running The Test Suite
----------------------

**Console:**

To run the test suite from the console, you need to have `mocha` installed:
```bash
$ npm install -g mocha
```
Then from the root of the project, you can just call
```bash
$ mocha
```
Alternately, if you've installed the dependencies, via:
```bash
$ npm install
```
then you can run the tests (and get detailed output) by running:
```bash
$ gulp test
```