module.exports = {
  /**
   * @param {string} s
   * @returns {boolean}
   */
  isBlank(s) {
    return !s || s.trim().length === 0;
  }
}
