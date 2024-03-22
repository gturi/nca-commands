const nodeCommandAlias = require("node-command-alias");

/**
 * @param {nodeCommandAlias.CommandHandlerInput} input
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
