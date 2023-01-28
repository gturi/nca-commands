module.exports = function (args, shelljs, safeExec) {
  const printSeparator = () => console.log('-----------------------------------------------');

  const spawn = require('child_process').spawn;
  const execCommand = (command, params) => {
    return new Promise((resolve, reject) => {
      // inherit flag makes the spawned process to use console colors
      spawn(command, params, { stdio: "inherit" }).on('exit', code => {
        if (code !== 0) {
          return reject(`not in a git repo, exit code ${code}`);
        } else {
          return resolve();
        }
      });
    });
  };

  execCommand('git', ['status'])
    .then(() => {
      printSeparator();

      const readline = require('readline');
      const interface = readline.createInterface({ input: process.stdin, output: process.stdout });
      const prompt = message => new Promise(resolve => interface.question(message, resolve));

      return prompt('Insert your commit message: ');
    })
    .then(commitMessage => execCommand('git', ['commit', '-m', `"${commitMessage}"`]))
    .then(() => {
      printSeparator();
      return execCommand('git', ['status']);
    }).then(() => {
      printSeparator();
      safeExec('git rev-parse --verify HEAD');
      printSeparator();
      process.exit(0);
    });

};
