const isWindows = require('../utils/platform-utils.js').isWindows;
const path = require('node:path');
const os = require("os");
const fs = require("fs");

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
    return path.resolve(getBookmarkDirectoryPath(), bookmarkName);
  },
  bookmarkDirectoryPath: getBookmarkDirectoryPath(),
  /**
   *
   * @param {string} fileName
   * @returns {boolean}
   */
  isBookmark(fileName) {
    if (fileName.includes(' ')) {
      return false;
    }

    const bookmarkPath = this.getBookmarkPath(fileName);
    if (!fs.existsSync(bookmarkPath)) {
      return false;
    }

    if (isWindows) {
      // not very precise, but good enough for now
      return fileName.endsWith('.lnk');
    } else {
      return fs.lstatSync(bookmarkPath).isSymbolicLink();
    }
  },
  /**
   * @returns {string[]}
   */
  getInstalledBookmarkNames() {
    return fs.readdirSync(this.bookmarkDirectoryPath)
      .filter(file => this.isBookmark(file));
  }
}

/**
 *
 * @returns {string}
 */
function getBookmarkDirectoryPath() {
  return path.resolve(os.homedir(), '.shell-bookmarks');
}
