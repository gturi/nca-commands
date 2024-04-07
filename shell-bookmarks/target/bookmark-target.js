const path = require('node:path');
const fs = require('node:fs');
const { isWindows, isGitBashSession } = require('../../utils/platform-utils.js');
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

  console.log(getBookmarkTarget(bookmarkPath));
}

/**
 *
 * @param {string} bookmarkPath
 * @return {string}
 */
function getBookmarkTarget(bookmarkPath) {
  if (isWindows) {
    const getShortcutTarget = path.resolve(__dirname, 'get-shortcut-target.ps1');
    const windowsStylePath = runPowershellScriptSync(getShortcutTarget, bookmarkPath);

    return isGitBashSession ? toUnixPath(windowsStylePath) : windowsStylePath;
  } else {
    return fs.realpathSync(bookmarkPath);
  }
}

/**
 *
 * @param {string} windowsStylePath
 * @return {string}
 */
function toUnixPath(windowsStylePath) {
  // Replace backslashes with forward slashes
  const unixPath = windowsStylePath.replace(/\\/g, '/');

  // Convert drive letter to lowercase and prepend with '/'
  return unixPath.replace(
    /^([a-zA-Z]):/,
    (_, driveLetter) => `/${driveLetter.toLowerCase()}`
  );
}
