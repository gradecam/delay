const npsUtils = require('nps-utils');

module.exports = {
  scripts: {
    build: 'rimraf dist && tsc',
    default: 'mocha',
    lint: 'tslint --project .',
    prepublishOnly: npsUtils.concurrent.nps('lint', 'test', 'build'),
    test: 'mocha',
  }
};
