const isWindows = require('../utils/platform-utils.js').isWindows;
const path = require('node:path');
const os = require("os");

module.exports = {
  getSanitizedBookmarkName(bookmarkName) {
    const result = isWindows && !bookmarkName.endsWith('.lnk') ? `${bookmarkName}.lnk` : bookmarkName;

    if (!result.includes(' ')) {
      return result;
    }

    console.warn("Bookmark name cannot contain spaces, replacing them with dashes");
    return result.replace(' ', '-');
  },
  /**
   * @param {string} bookmarkName
   * @returns {string}
   */
  getBookmarkPath(bookmarkName) {
    return path.resolve(os.homedir(), '.shell-bookmarks', bookmarkName);
  }
}
