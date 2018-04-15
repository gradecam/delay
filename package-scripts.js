const npsUtils = require('nps-utils');

module.exports = {
  scripts: {
    build: 'tsc',
    default: 'mocha',
    lint: 'tslint --project .',
    prepublishOnly: npsUtils.concurrent.nps('lint', 'test', 'build'),
    test: 'mocha',
  }
};
