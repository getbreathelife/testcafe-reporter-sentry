var assert = require("assert");
var normalizeNewline = require("normalize-newline");
var read = require("read-file-relative").readSync;
var createReport = require("./utils/create-report");

it("Should produce report", function() {
    var report = createReport(true);
    var expected = JSON.parse(read("./data/report-with-colors.json"));

    report = normalizeNewline(report).trim();
    expected = normalizeNewline(expected).trim();

    assert.strictEqual(report, expected);
});
