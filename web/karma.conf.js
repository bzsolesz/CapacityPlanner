// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-safari-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-junit-reporter'),
      require('karma-htmlfile-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    junitReporter: {
      outputDir: './tests',
      outputFile: undefined,
      suite: '',
      useBrowserName: true,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    },
    htmlReporter: {
      outputFile: 'tests/web-unit-test-report.html',
      pageTitle: 'Capacity Planner Web Component Unit Tests',
      groupSuites: true,
      useCompactStyle: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Safari'],
    singleRun: false
  });
};
