const fs = require("fs");
const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();
const ShellBookmarkCommon = require('../shell-bookmark-common.js');

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const bookmarkName = ShellBookmarkCommon.getSanitizedBookmarkName(input.args.bookmarkName);
  const newBookmarkName = ShellBookmarkCommon.getSanitizedBookmarkName(input.args.newBookmarkName);

  const bookmarkPath = ShellBookmarkCommon.getBookmarkPath(bookmarkName);
  if (!fs.existsSync(bookmarkPath)) {
    console.warn(`Bookmark "${bookmarkName}" does not exist`);
    return;
  }
  const newBookmarkPath = ShellBookmarkCommon.getBookmarkPath(newBookmarkName);

  fs.renameSync(bookmarkPath, newBookmarkPath);

  console.log(`Renamend bookmark "${bookmarkName}" to "${newBookmarkName}"`);
};
