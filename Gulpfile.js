var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var babel   = require('gulp-babel');
var mocha   = require('gulp-mocha');
var del     = require('del');

function clean (cb) {
    del('lib', cb);
}

function build () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
}

function test () {
    return gulp
        .src('test/test.js')
        .pipe(mocha({
            ui:       'bdd',
            reporter: 'spec',
            timeout:  typeof v8debug === 'undefined' ? 20000 : Infinity // NOTE: disable timeouts in debug
        }));
}

function preview () {
    var buildReporterPlugin = require('testcafe').embeddingUtils.buildReporterPlugin;
    var pluginFactory       = require('./lib');
    var reporterTestCalls   = require('./test/utils/reporter-test-calls');
    var plugin              = buildReporterPlugin(pluginFactory);

    console.log();

    reporterTestCalls.forEach(function (call) {
        plugin[call.method].apply(plugin, call.args);
    });

    process.exit(0);
}

exports.clean = clean;
exports.test = gulp.series(clean, build, test);
exports.build = gulp.series(clean, build);
exports.preview = gulp.series(clean, build, preview);
