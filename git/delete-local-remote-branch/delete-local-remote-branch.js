const nodeCommandAlias = require("node-command-alias");

/**
 * @param {nodeCommandAlias.CommandHandlerInput} input
 */
module.exports = function (input) {
  const sharedLogic = require('./shared-logic');

  const forbiddenBranchNames = sharedLogic.getForbiddenBranchNames();

  const nonDeletableBranches = input.args.branches
    .filter(branch => forbiddenBranchNames.includes(branch))
    .join(' ');

  if (nonDeletableBranches.length > 0) {
    throw new Error(`${nonDeletableBranches} cannot be deleted`);
  }

  const branches = input.args.branches.join(' ');
  input.cliUtils.shelljsSafeExec(`git branch -d ${branches}`);
  input.cliUtils.shelljsSafeExec(`git push origin --delete ${branches}`);
};
