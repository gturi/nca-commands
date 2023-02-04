module.exports = function (input) {
  const result = input.shelljsSafeExec('git branch --show-current');

  const currentBranch = result.stdout;
  if (currentBranch === 'main' || currentBranch === 'master' || currentBranch === 'develop') {
    throw new Error(`${currentBranch} should be updated via PR`);
  }

  const branch = input.args.branch;
  const mergeStrategy = input.args.s;
  input.shelljsSafeExec(`git checkout ${branch}`);
  input.shelljsSafeExec(`git pull`);
  input.shelljsSafeExec(`git checkout ${currentBranch}`);
  input.shelljsSafeExec(`git merge ${mergeStrategy} ${branch}`);
};
