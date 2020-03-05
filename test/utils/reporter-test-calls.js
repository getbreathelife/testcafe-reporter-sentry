var TestRunErrorFormattableAdapter = require('testcafe').embeddingUtils.TestRunErrorFormattableAdapter;
var UncaughtErrorOnPage            = require('testcafe').embeddingUtils.testRunErrors.UncaughtErrorOnPage;
var ActionElementNotFoundError     = require('testcafe').embeddingUtils.testRunErrors.ActionElementNotFoundError;
var testCallsite                   = require('./test-callsite');


function makeErrors (errDescrs) {
    return errDescrs.map(function (descr) {
        return new TestRunErrorFormattableAdapter(descr.err, descr.metaInfo);
    });
}

module.exports = [
    {
        method: 'reportTestDone',
        args:   [
            'First test in first fixture',
            {
                errs:           [],
                durationMs:     74000,
                unstable:       true,
                screenshotPath: '/screenshots/1445437598847'
            }, 
            {
                sentryDsn: 'FAKEDSN1'
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Second test in first fixture',
            {
                errs: makeErrors([
                    {

                        err: new UncaughtErrorOnPage('Some error', 'http://example.org'),

                        metaInfo: {
                            userAgent:      'Chrome 41.0.2227 / Mac OS X 10.10.1',
                            screenshotPath: '/screenshots/1445437598847/errors',
                            callsite:       testCallsite,
                            testRunState:   'inTest'
                        }
                    },
                    {
                        err: new ActionElementNotFoundError({ apiFnChain: ['one', 'two', 'three'], apiFnIndex: 1 }),

                        metaInfo: {
                            userAgent:    'Firefox 47 / Mac OS X 10.10.1',
                            callsite:     testCallsite,
                            testRunState: 'inTest'
                        }
                    }
                ]),

                durationMs:     74000,
                unstable:       false,
                screenshotPath: '/screenshots/1445437598847'
            }, 
            {
                sentryDsn: 'https://XXX@sentry.io/XXX'
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Third test in first fixture',
            {
                errs:           [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: null
            }, 
            {
                sentryDsn: 'FAKEDSN3'
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in second fixture',
            {
                errs:           [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: null
            }, 
            {
                sentryDsn: 'FAKEDSN4'
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Second test in second fixture',
            {
                errs:           [],
                durationMs:     74000,
                unstable:       false,
                screenshotPath: null
            }, 
            {
                sentryDsn: 'FAKEDSN5'
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'Third test in second fixture',
            {
                errs:           [],
                durationMs:     0,
                unstable:       false,
                screenshotPath: null,
                skipped:        false
            }, 
            {
                sentryDsn: 'FAKEDSN6'
            }
        ]
    },
    {
        method: 'reportTestDone',
        args:   [
            'First test in third fixture',
            {
                errs: makeErrors([
                    {
                        err: new ActionElementNotFoundError({ apiFnChain: ['one', 'two', 'three'], apiFnIndex: 1 }),

                        metaInfo: {
                            userAgent:    'Firefox 47 / Mac OS X 10.10.1',
                            callsite:     testCallsite,
                            testRunState: 'inBeforeEach'
                        }
                    }
                ]),

                durationMs:     74000,
                unstable:       true,
                screenshotPath: null
            }, 
            {
                sentryDsn: 'https://YYY@sentry.io/YYY'
            }
        ]
    },
];
