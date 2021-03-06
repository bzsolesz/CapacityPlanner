// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-htmlfile-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: 'target/coverage',
      reports: [ 'html' ],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
        emitWarning: false,
        global: {
          statements: 85,
          lines: 85,
          branches: 85,
          functions: 85
        },
        each: {
          statements: 85,
          lines: 85,
          branches: 85,
          functions: 85,
          overrides: {
            '**/*.stub.ts': {
              statements: 0,
              lines: 0,
              branches: 0,
              functions: 0,
            }
          }
        }
      }
    },
    angularCli: {
      environment: 'dev'
    },
    htmlReporter: {
      outputFile: 'target/tests/unit-test-report.html',
      pageTitle: 'Capacity Planner Web Component Unit Tests',
      groupSuites: true,
      useCompactStyle: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
