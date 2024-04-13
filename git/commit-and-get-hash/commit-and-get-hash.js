const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const printSeparator = () => console.log('-'.repeat(50));

  printSeparator();

  input.cliUtils.spawnSync('git', ['status']);

  printSeparator();

  input.cliUtils.spawnSync('git', ['commit'], { stdio: 'inherit' });

  printSeparator();

  input.cliUtils.spawnSync('git', ['status']);

  printSeparator();

  input.cliUtils.shelljsSafeExec('git rev-parse --verify HEAD');

  printSeparator();
};
