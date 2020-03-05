const Sentry = require('@sentry/node');

module.exports = function () {
    return {

        reportTaskStart ( startTime, userAgents, testCount ) {},

        reportFixtureStart ( name, path, meta ) {
            this.currentFixtureName = name;
        },

        reportTestDone (name, testRunInfo, meta) {
            var hasErr = !!testRunInfo.errs.length;
            const sentryDsn = meta !== null && meta.sentryDsn || process.env.SENTRY_DSN;

            if (hasErr) {
                Sentry.init({
                    dsn: sentryDsn
                });
                Sentry.captureEvent({ message: `Error with testcafe test ${this.currentFixtureName} ${name}. ${testRunInfo}`, level: Sentry.Severity.Error, extra: testRunInfo });
            }
            
        },

        reportTaskDone ( endTime, passed, warnings, results ) {}
    };
};
