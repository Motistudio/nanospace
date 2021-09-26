const isThenable = require('./isThenable')

/**
 * @module Utils
 */

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

module.exports = evaluate
