const { execSync } = require('node:child_process');

const getGitBranches = (command) => {
  return execSync(command).toString()
    .split('\n')
    .filter(branch => branch !== '');
}

const forbiddenBranchNames = [
  'main',
  'master',
  'develop'
];

const getForbiddenBranchNames = () => {
  const currentBranch = getGitBranches("git branch --show-current");
  return [...forbiddenBranchNames, ...currentBranch];
}

const getDeletableBranches = () => {
  const localBranches = getGitBranches("git branch --format='%(refname:short)'");
  const forbidden = getForbiddenBranchNames(); 
  return localBranches.filter(branchName => !forbidden.includes(branchName));
}
module.exports = {
  getDeletableBranches,
  getForbiddenBranchNames
};
