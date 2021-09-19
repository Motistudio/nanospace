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

/**
 * Evaluates a list of valuable
 *
 * @param {Array} valuables - an array of valuables
 * @returns {Array|Promise} - either an array or a promise which will resolve to array
 */
const evaluate = (valuables) => {
  const results = valuables.map(v => v.value())
  if (results.some(v => isThenable(v))) {
    return Promise.all(results.filter(v => isThenable(v))).then((asyncResults) => {
      return results.map((r) => {
        if (isThenable(r)) {
          return asyncResults.shift()
        }
        return r
      })
    })
  }
  return results
}

module.exports = {isThenable, evaluate}
