const { spawnSync } = require('node:child_process');

module.exports = {
  /**
   * @param {string} command
   * @param {string[]} args
   */
  runSync(command, ...args) {
    const sanitizedArgs = args.map(arg => arg.includes(' ') ? `"${arg}"` : arg);
    spawnSync(command, sanitizedArgs, {
      stdio: "inherit",
      shell: true
    });
  },
  /**
   * @param {string} powershellScript
   * @param {string[]} args
   */
  runPowershellScriptSync(powershellScript, ...args) {
    this.runSync('powershell', '-c', powershellScript, ...args);
  }
}
