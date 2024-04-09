const { spawnSync } = require('node:child_process');

module.exports = {
  /**
   * @param {string} powershellScript
   * @param {string[]} args
   */
  runPowershellScriptSync(powershellScript, ...args) {
    runSync('powershell', '-c', powershellScript, ...args);
  },
  /**
   * @param {string} command
   * @param {string[]} args
   */
  runSync(command, ...args) {
    runSync(command, ...args);
  },
  /**
   *
   * @param {string[]} args
   * @returns {string[]}
   */
  sanitizeArgs(...args) {
    return sanitizeArgs(args);
  }
}

/**
   * @param {string} command
   * @param {string[]} args
   */
function runSync(command, ...args) {
  const sanitizedArgs = sanitizeArgs(args);
  spawnSync(command, sanitizedArgs, {
    stdio: "inherit",
    shell: true
  });
}

/**
 *
 * @param {string[]} args
 * @returns {string[]}
 */
function sanitizeArgs(args) {
  return args.map(arg => arg.includes(' ') ? `"${arg}"` : arg);
}
