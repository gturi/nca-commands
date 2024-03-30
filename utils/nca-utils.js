/**
 * This module is used to get the types of the input objects for the node-command-alias package.
 * If the package is not installed, the functions will return null instead of throwing an error.
 */
module.exports = {
  /**
   * @returns {import("node-command-alias").CommandHandlerInput}
   */
  commandHandlerInputType() {
    return loadNodeCommandAlias()?.CommandHandlerInput;
  },
  /**
   * @returns {import("node-command-alias").CompletionInput}
   */
  completionInputType() {
    return loadNodeCommandAlias()?.CompletionInput;
  }
}

/**
 * @returns {import("node-command-alias") | null}
 */
function loadNodeCommandAlias() {
  try {
    return require("node-command-alias");
  } catch (e) {
    return null;
  }
}


