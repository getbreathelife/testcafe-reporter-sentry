# testcafe-reporter-sentry
[![Build Status](https://travis-ci.org/fallard84/testcafe-reporter-sentry.svg)](https://travis-ci.org/fallard84/testcafe-reporter-sentry)

This is the **sentry** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/fallard84/testcafe-reporter-sentry/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-sentry
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter sentry
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('sentry') // <-
    .run();
```

## Author
Francois Allard 
