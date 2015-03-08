var gulpMammouth = require('../');
var should = require('should');
var mammouth = require('mammouth/lib/mammouth');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var stream = require('stream');
require('mocha');

var createFile = function (filepath, contents) {
  var base = path.dirname(filepath);
  return new gutil.File({
    path: filepath,
    base: base,
    cwd: path.dirname(base),
    contents: contents
  });
};

describe('gulp-mammouth', function() {
  describe('gulpMammouth()', function() {
    before(function() {
      this.testData = function (expected, newPath, done) {
        var newPaths = [newPath],
            expectedSourceMap;

        if (expected.v3SourceMap) {
          expectedSourceMap = JSON.parse(expected.v3SourceMap);
          expected = [expected.php];
        } else {
          expected = [expected];
        }

        return function (newFile) {
          this.expected = expected.shift();
          this.newPath = newPaths.shift();

          should.exist(newFile);
          should.exist(newFile.path);
          should.exist(newFile.relative);
          should.exist(newFile.contents);
          newFile.path.should.equal(this.newPath);
          newFile.relative.should.equal(path.basename(this.newPath));
          String(newFile.contents).should.equal(this.expected);

          if (expectedSourceMap) {
            // check whether the sources from the mammouth have been
            // applied to the files source map
            newFile.sourceMap.sources
              .should.containDeep(expectedSourceMap.sources);
          }

          if (done && !expected.length) {
            done.call(this);
          }
        };
      };
    });

    it('should concat two files', function(done) {
      var filepath = '/home/bodhibit/test/file.mammouth';
      var contents = new Buffer('a = 2');
      var opts = {bare: true};
      var expected = mammouth.compile(String(contents), opts);

      gulpMammouth(opts)
        .on('error', done)
        .on('data', this.testData(expected, path.normalize('/home/bodhibit/test/file.php'), done))
        .write(createFile(filepath, contents));
    });

    it('should emit errors correctly', function(done) {
      var filepath = '/home/bodhibit/test/file.mammouth';
      var contents = new Buffer('<p>{{if a()\r\n  then huh}}</p>');

      gulpMammouth({bare: true})
        .on('error', function(err) {
          err.message.should.equal('Parse error on line NaN: Unexpected \'LineTerminator\'');
          done();
        })
        .on('data', function(newFile) {
          throw new Error('no file should have been emitted!');
        })
        .write(createFile(filepath, contents));
    });

    it('should compile a file', function(done) {
      var filepath = 'test/fixtures/demo.mammouth';
      var contents = new Buffer(fs.readFileSync(filepath));
      var expected = mammouth.compile(String(contents));

      gulpMammouth()
        .on('error', done)
        .on('data', this.testData(expected, path.normalize('test/fixtures/demo.php'), done))
        .write(createFile(filepath, contents));
    });

  });
});
