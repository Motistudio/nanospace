const isThenable = require('./isThenable')

/**
 * @module Utils
 */

/**
 * Performes a callback for a given value. If the value is a thenable object, it will wait for it to resolve.
 * Otherwise, it will run the code syncrounusly
 *
 * @param {*} value - any given value
 * @returns {Function} - a callback to run
 */
const perform = (value) => {
  return (callback) => {
    if (isThenable(value)) {
      return value.then(callback)
    }
    return callback(value)
  }
}

module.exports = perform
