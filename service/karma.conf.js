var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        basePath: 'src',
        frameworks: ['mocha', 'chai', 'promise'],
        files: [
            '**/*.ts'
        ],
        preprocessors: {
            '**/*.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        autoWatch: true,
        singleRun: false
    });
}