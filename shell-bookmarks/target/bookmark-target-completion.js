const CompletionInputType = require('../../utils/nca-utils.js').completionInputType();
const ShellBookmarkCommon = require('../shell-bookmark-common.js');

/**
 * @param {CompletionInputType} input
 */
module.exports = function (input) {
  return ShellBookmarkCommon.getInstalledBookmarkNames();
}
