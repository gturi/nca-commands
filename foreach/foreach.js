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

    const exitCode = shelljs.exec(command).code;

    if (exitCode !== 0) {
      console.error(`Failed executing command '${command}' in ${process.cwd()} (exit code: ${exitCode})`);
    }
  });

};
