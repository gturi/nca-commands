module.exports = function (args, shelljs, safeExec) {
  const result = safeExec('git branch --show-current');

  const currentBranch = result.stdout;
  if (currentBranch === 'main' || currentBranch === 'master' || currentBranch === 'develop') {
    throw new Error(`${currentBranch} should be updated via PR`);
  }

  const branch = args.branch;
  const mergeStrategy = args.s;
  safeExec(`git checkout ${branch}`);
  safeExec(`git pull`);
  safeExec(`git checkout ${currentBranch}`);
  safeExec(`git merge ${mergeStrategy} ${branch}`);
};
