const fs = require("fs");
const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();
const ShellBookmarkCommon = require('../shell-bookmark-common.js');

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const iter = input.iteratorHelper.iter;
  const bookmarkNames = input.args.bookmarkNames;

  iter(bookmarkNames)
    .map(bookmarkName => ShellBookmarkCommon.getSanitizedBookmarkName(bookmarkName))
    .forEach(bookmarkName => {
      const bookmarkPath = ShellBookmarkCommon.getBookmarkPath(bookmarkName);
      if (!fs.existsSync(bookmarkPath)) {
        console.warn(`Bookmark "${bookmarkName}" does not exist`);
        return;
      }
      fs.unlinkSync(bookmarkPath);
    });
}
