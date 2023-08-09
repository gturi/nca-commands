module.exports = function (input) {
  const gitSharedLogic = require('../git-shared-logic');

  const currentBranch = gitSharedLogic.getCurrentBranch();
  const localBranches = gitSharedLogic.getLocalBranches();

  return localBranches.filter(branch => branch !== currentBranch);
};
