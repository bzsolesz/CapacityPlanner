// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: "http://localhost:4200",
  seleniumAddress: 'http://localhost:9515/',
  directConnect: false,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  ngApimockOpts: {
    angularVersion: 5,
    hybrid: false
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    jasmine.getEnv().addReporter(
      new HtmlReporter({
        baseDirectory: 'target/e2e',
        screenshotsSubfolder: 'screenshots',
        jsonsSubfolder: 'jsons',
        takeScreenShotsOnlyForFailedSpecs: true,
        docTitle: 'Capacity Planner Web e2e Protractor Test Execution Report',
        docName: 'test-result.html',
        preserveDirectory: true,
        cssOverrideFile: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
      }
    ).getJasmine2Reporter());

    browser.ngApimock = require('./e2e/mock_backend/target/protractor.mock.js');
  }
};
