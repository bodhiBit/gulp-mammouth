![status](https://secure.travis-ci.org/bodhiBit/gulp-mammouth.png?branch=master)

## Information

<table>
<tr>
<td>Package</td><td>gulp-mammouth</td>
</tr>
<tr>
<td>Description</td>
<td>Compiles .mammouth files to PHP</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
</table>

The code is copied from [gulp-coffee](https://github.com/wearefractal/gulp-coffee) and adapted to use [mammouth](https://github.com/btwael/mammouth) instead.

## Usage

```javascript
var mammouth = require('gulp-mammouth');

gulp.task('mammouth', function() {
  gulp.src('./src/*.mammouth')
    .pipe(mammouth().on('error', gutil.log))
    .pipe(gulp.dest('./public/'))
});
```

### Error handling

gulp-mammouth will emit an error for cases such as invalid mammouth syntax. If uncaught, the error will crash gulp.

You will need to attach a listener (i.e. `.on('error')`) for the error event emitted by gulp-mammouth:

```javascript
var mammouthStream = mammouth();

// Attach listener
mammouthStream.on('error', function(err) {});
```

In addition, you may utilize [gulp-util](https://github.com/wearefractal/gulp-util)'s logging function:

```javascript
var gutil = require('gulp-util');

// ...

var mammouthStream = mammouth();

// Attach listener
mammouthStream.on('error', gutil.log);

```

Since `.on(...)` returns `this`, you can make you can compact it as inline code:

```javascript

gulp.src('./src/*.mammouth')
  .pipe(mammouth().on('error', gutil.log))
  // ...
```

## Options

There are no options for the Mammouth compiler

## LICENSE

(MIT License)

Copyright (c) 2015 bodhiBit

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
