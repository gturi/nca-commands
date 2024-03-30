const path = require('node:path');
const os = require("os");
const fs = require("fs");
const isWindows = require('../../utils/platform-utils.js').isWindows;
const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const iter = input.iteratorHelper.iter;
  const bookmarkNames = input.args.bookmarkNames;

  iter(bookmarkNames)
    .map(bookmarkName => isWindows && !bookmarkName.endsWith('.lnk') ? `${bookmarkName}.lnk` : bookmarkName)
    .forEach(bookmarkName => {
      const bookmarkPath = path.resolve(os.homedir(), '.shell-bookmarks', bookmarkName);
      if (!fs.existsSync(bookmarkPath)) {
        console.warn(`Bookmark "${bookmarkName}" does not exist`);
        return;
      }
      fs.unlinkSync(bookmarkPath);
    });
}
