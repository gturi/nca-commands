module.exports = function (input) {
  const result = input.cliUtils.shelljsSafeExec('git branch --show-current');

  const currentBranch = result.stdout;
  if (currentBranch === 'main' || currentBranch === 'master' || currentBranch === 'develop') {
    throw new Error(`${currentBranch} should be updated via PR`);
  }

  const branch = input.args.branch;
  const mergeStrategy = input.args.s;
  input.cliUtils.shelljsSafeExec(`git checkout ${branch}`);
  input.cliUtils.shelljsSafeExec(`git pull`);
  input.cliUtils.shelljsSafeExec(`git checkout ${currentBranch}`);
  input.cliUtils.shelljsSafeExec(`git merge ${mergeStrategy} ${branch}`);
};
