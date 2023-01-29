module.exports = function (args, shelljs, safeExec) {
  const result = safeExec('git branch --show-current');

  const currentBranch = result.stdout;
  if (currentBranch === 'main' || currentBranch === 'master' || currentBranch === 'develop') {
    throw new Error(`${currentBranch} cannot be deleted`);
  }

  const branches = args.branches.join(" ");
  safeExec(`git branch -d ${branches}`);
  safeExec(`git push origin --delete ${branches}`);
};
