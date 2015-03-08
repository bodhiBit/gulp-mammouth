var through = require('through2');
var mammouth = require('mammouth/lib/mammouth');
var gutil = require('gulp-util');
var applySourceMap = require('vinyl-sourcemaps-apply');
var path = require('path');
var merge = require('merge');

var PluginError = gutil.PluginError;

module.exports = function () {
  function replaceExtension(path) {
    return gutil.replaceExtension(path, '.php');
  }

  function transform(file, enc, cb) {
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) return cb(new PluginError('gulp-mammouth', 'Streaming not supported'));

    var data;
    var str = file.contents.toString('utf8');
    var dest = replaceExtension(file.path);

    try {
      data = mammouth.compile(str);
    } catch (err) {
      return cb(new PluginError('gulp-mammouth', err));
    }

    file.contents = new Buffer(data);
    file.path = dest;
    cb(null, file);
  }

  return through.obj(transform);
};
