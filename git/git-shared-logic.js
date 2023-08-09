const { execSync } = require('node:child_process');

const getGitBranches = (command) => {
  return execSync(command).toString()
    .split('\n')
    .filter(branch => branch !== '');
}

const protectedBranches = [
  'main',
  'master',
  'develop'
];

const getLocalBranches = () => getGitBranches("git branch --format='%(refname:short)'");

const getCurrentBranch = () => getGitBranches("git branch --show-current")[0];

module.exports = {
  getGitBranches,
  getLocalBranches,
  getCurrentBranch,
  protectedBranches
};
