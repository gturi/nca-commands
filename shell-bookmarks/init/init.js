const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const cmd = input.args.cmd;

  if (cmd === '') {
    console.error('Error: cmd cannot be empty');
    return -1;
  }

  if (cmd.includes(' ')) {
    console.error('Error: cmd cannot contain whitespaces');
    return -1;
  }

  const shellType = input.args.shellType;

  const shellCompletion = require(`./template/${shellType}.js`);

  console.log(shellCompletion(cmd));
};
