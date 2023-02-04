module.exports = function (input) {
  const result = input.shelljsSafeExec('git branch --show-current');

  const currentBranch = result.stdout;
  if (currentBranch === 'main' || currentBranch === 'master' || currentBranch === 'develop') {
    throw new Error(`${currentBranch} cannot be deleted`);
  }

  const branches = input.args.branches.join(' ');
  input.shelljsSafeExec(`git branch -d ${branches}`);
  input.shelljsSafeExec(`git push origin --delete ${branches}`);
};
