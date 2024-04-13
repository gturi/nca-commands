const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const gitSharedLogic = require('../git-shared-logic');

  const currentBranch = gitSharedLogic.getCurrentBranch();
  const protectedBranches = gitSharedLogic.protectedBranches;
  if (protectedBranches.includes(currentBranch)) {
    throw new Error(`${currentBranch} should be updated via PR`);
  }

  const branch = input.args.branch;
  if (currentBranch === branch) {
    throw new Error(`current branch and target branch should be different`);
  }

  const mergeStrategy = input.args.s;
  input.cliUtils.shelljsSafeExec(`git checkout ${branch}`);
  input.cliUtils.shelljsSafeExec(`git pull`);
  input.cliUtils.shelljsSafeExec(`git checkout ${currentBranch}`);
  input.cliUtils.shelljsSafeExec(`git merge ${mergeStrategy} ${branch}`);
};
