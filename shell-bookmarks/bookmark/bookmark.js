const path = require('node:path');
const isWindows = require('../../utils/platform-utils.js').isWindows;
const PathUtils = require('../../utils/path-utils.js');
const StringUtils = require('../../utils/string-utils.js');
const runSync = require('../../utils/shell-utils.js').runSync;
const CommandHandlerInput = require('../../utils/nca-utils.js').commandHandlerInputType();
const ShellBookmarkCommon = require('../shell-bookmark-common.js');

/**
 * @param {CommandHandlerInput} input
 */
module.exports = function (input) {
  const directory = StringUtils.isBlank(input.args.directory)
    ? process.cwd()
    : PathUtils.resolvePath(input.args.directory);

  const bookmarkName = getBookmarkName(input, directory);

  const bookmarkPath = ShellBookmarkCommon.getBookmarkPath(bookmarkName);

  if (isWindows) {
    const createShortcut = path.resolve(__dirname, 'create-shortcut.ps1');
    runSync('powershell', '-c', createShortcut, directory, bookmarkPath);
  } else {
    runSync('ln', '-s', directory, bookmarkPath);
  }
};

function getBookmarkName(input, directory) {
  let bookmarkName = StringUtils.isBlank(input.args.bookmarkName)
    ? path.basename(directory)
    : input.args.bookmarkName;

  return ShellBookmarkCommon.getSanitizedBookmarkName(bookmarkName);
}
