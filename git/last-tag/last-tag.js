const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  process.stdout.write('last tag: ');
  input.cliUtils.shelljsSafeExec(`git describe --tags --abbrev=0`);

  process.stdout.write('commits after last tag: ');
  input.cliUtils.shelljsSafeExec(`git describe --tags`);
};
