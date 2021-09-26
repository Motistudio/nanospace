/**
 * @module Utils
 */

/**
 * Returns if a parameter is a thenable object (like Promise)
 *
 * @param {*} arg - Any parameter
 * @returns {boolean} - Returns true if the argument is thenable
 */
const isThenable = (arg) => {
  return typeof arg?.then === 'function'
}

module.exports = isThenable
