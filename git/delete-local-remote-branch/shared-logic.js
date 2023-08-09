const gitSharedLogic = require('../git-shared-logic');

const getForbiddenBranchNames = () => {
  const currentBranch = gitSharedLogic.getCurrentBranch();
  return [...gitSharedLogic.protectedBranches, currentBranch];
}

const getDeletableBranches = () => {
  const localBranches = gitSharedLogic.getLocalBranches();
  const forbidden = getForbiddenBranchNames(); 
  return localBranches.filter(branchName => !forbidden.includes(branchName));
}

module.exports = {
  getDeletableBranches,
  getForbiddenBranchNames
};
