module.exports = function() {
    var report = './report/';
    var root = './';
    var config = {
        /**
         * Files paths
         */
        alljs: [
            './lib/**/*.js',
            './*.js'
        ],
        report: report,
        root: root,
        packages : [
            './package.json'
        ],

        mocha:{reporter: 'spec'}
    };

    return config;

    ////////////////

};
