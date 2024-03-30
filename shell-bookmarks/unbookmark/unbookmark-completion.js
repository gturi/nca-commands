const fs = require("fs");
const isWindows = require('../../utils/platform-utils.js').isWindows;
const CompletionInputType = require('../../utils/nca-utils.js').completionInputType();
const ShellBookmarkCommon = require('../shell-bookmark-common.js');

/**
 * @param {CompletionInputType} input
 */
module.exports = function (input) {
  return fs.readdirSync(ShellBookmarkCommon.bookmarkDirectoryPath)
    .filter(file => isBookmark(file));
}

/**
 *
 * @param {string} fileName
 * @returns {boolean}
 */
function isBookmark(fileName) {
  if (fileName.includes(' ')) {
    return false;
  }

  if (isWindows) {
    // not very precise, but good enough for now
    return fileName.endsWith('.lnk');
  } else {
    const bookmarkPath = ShellBookmarkCommon.getBookmarkPath(fileName);
    return fs.lstatSync(bookmarkPath).isSymbolicLink();
  }
}
