module.exports = function (input) {
  const result = input.cliUtils.shelljsSafeExec('git branch --show-current');

  const currentBranch = result.stdout;
  if (currentBranch === 'main' || currentBranch === 'master' || currentBranch === 'develop') {
    throw new Error(`${currentBranch} cannot be deleted`);
  }

  const branches = input.args.branches.join(' ');
  input.cliUtils.shelljsSafeExec(`git branch -d ${branches}`);
  input.cliUtils.shelljsSafeExec(`git push origin --delete ${branches}`);
};
