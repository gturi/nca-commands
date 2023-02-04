module.exports = function (input) {
  const printSeparator = () => console.log('-'.repeat(50));

  input.spawn('git', ['status'])
    .then(() => {
      printSeparator();

      const readline = require('readline');
      const interface = readline.createInterface({ input: process.stdin, output: process.stdout });
      const prompt = message => new Promise(resolve => interface.question(message, resolve));

      return prompt('Insert your commit message: ');
    })
    .then(commitMessage => input.spawn('git', ['commit', '-m', `"${commitMessage}"`]))
    .then(() => {
      printSeparator();
      return input.spawn('git', ['status']);
    }).then(() => {
      printSeparator();
      input.shelljsSafeExec('git rev-parse --verify HEAD');
      printSeparator();
      process.exit(0);
    }).catch(code => process.exit(code));

};
