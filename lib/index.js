const Sentry = require('@sentry/node');

module.exports = function () {
  return {
    noColors: true,

    reportTaskStart() {},

    reportFixtureStart(name, path, meta) {
      this.currentFixtureName = name;
      this.sentryDsn = meta != null && meta.sentryDsn;
      this.environment = meta != null && meta.environment;
    },

    reportTestDone(name, testRunInfo, meta) {
      var hasErr = !!testRunInfo.errs.length;
      const sentryDsn = meta !== null && meta.sentryDsn || this.sentryDsn || process.env.SENTRY_DSN;
      const environment = meta !== null && meta.environment || this.environment || process.env.ENVIRONMENT;

      if (hasErr) {
        Sentry.init({
          dsn: sentryDsn,
          environment
        });
        testRunInfo.errs.forEach((error, id) => {
          this.sendErrorToSentry(error, id, name);
        });
      }
    },

    reportTaskDone() {},

    sendErrorToSentry(error, id, testName) {
      Sentry.captureEvent({
        message: `[Testcafe] ${error.errMsg} in ${this.currentFixtureName} ${testName}`,
        level: Sentry.Severity.Error,
        extra: {
          error: this.formatError(error, `${id + 1} `)
        }
      });
    }

  };
};