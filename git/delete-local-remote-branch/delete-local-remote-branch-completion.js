const CompletionInputType = require('../../utils/nca-utils.js').completionInputType();

/**
 * @param {CompletionInputType} input
 */
module.exports = function () {
  const sharedLogic = require('./shared-logic');
  return sharedLogic.getDeletableBranches();
};
