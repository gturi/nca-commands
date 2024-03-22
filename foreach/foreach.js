module.exports = function (input) {
  const fs = require('fs');
  const path = require('path');

  function getDirectories(source) {
    return fs.readdirSync(source, { withFileTypes: true })
      .filter(file => file.isDirectory())
      .map(file => file.name)
  }

  const shelljs = input.cliUtils.shelljs;
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

    const exitCode = shelljs.exec(command).code;

    if (exitCode !== 0) {
      console.error(`Failed executing command '${command}' in ${process.cwd()} (exit code: ${exitCode})`);
    }

    console.log(`\n${separator}`)
  });

};
