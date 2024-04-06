const path = require('node:path');
const fs = require('node:fs');
const isWindows = require('../../utils/platform-utils.js').isWindows;
const runPowershellScriptSync = require('../../utils/shell-utils.js').runPowershellScriptSync;
const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();
const ShellBookmarkCommon = require('../shell-bookmark-common.js');

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const bookmarkName = ShellBookmarkCommon.getSanitizedBookmarkName(input.args.bookmarkName);

  if (!ShellBookmarkCommon.isBookmark(bookmarkName)) {
    console.error(`${bookmarkName} does not exists!`);
    return -1;
  }

  const bookmarkPath = ShellBookmarkCommon.getBookmarkPath(bookmarkName);

  if (isWindows) {
    const getShortcutTarget = path.resolve(__dirname, 'get-shortcut-target.ps1');
    console.log(runPowershellScriptSync(getShortcutTarget, bookmarkPath));
  } else {
    console.log(fs.realpathSync(bookmarkPath));
  }
}
