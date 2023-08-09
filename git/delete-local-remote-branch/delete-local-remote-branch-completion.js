module.exports = function () {
  const sharedLogic = require('./shared-logic');
  return sharedLogic.getDeletableBranches();
};
