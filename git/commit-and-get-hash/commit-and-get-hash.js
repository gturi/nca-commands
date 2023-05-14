module.exports = function (input) {
  const printSeparator = () => console.log('-'.repeat(50));

  printSeparator();

  input.spawnSync('git', ['status']);

  printSeparator();

  input.spawnSync('git', ['commit'], { stdio: 'inherit' });

  printSeparator();

  input.spawnSync('git', ['status']);

  printSeparator();

  input.shelljsSafeExec('git rev-parse --verify HEAD');

  printSeparator();
};
