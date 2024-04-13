const CommandHandlerInput = require('../utils/nca-utils.js').commandHandlerInputType();

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const fs = require('fs');
  const path = require('path');

  function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(file => file.isDirectory())
      .map(file => file.name);
  }

  const { execSync } = require('child_process');
  const command = input.args.command.join(' ');

  const workingDir = process.cwd();

  getDirectories(workingDir).forEach(dir => {
    const childDir = path.join(workingDir, dir);
    process.chdir(childDir);

    const executionMessage = `Executing command in ${childDir}`;
    const separator = '-'.repeat(executionMessage.length);

    const message = [
      `\n\n${separator}`,
      executionMessage,
      `${separator}\n`
    ].join('\n');

    console.log(message);

    try {
      execSync(command, { stdio: "inherit" });
    } catch (error) {
      console.error(`Failed executing command '${command}' in ${process.cwd()} (exit code: ${error.status})`);
    }

    console.log(`\n${separator}`);
  });

};
