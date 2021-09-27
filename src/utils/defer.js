/**
 * Returns a deferred promise that could be resolved/rejected from the outside
 *
 * @returns {object} - a handler with {promise, resolve, reject}
 */
const defer = () => {
  const deferred = {}
  const promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  deferred.promise = promise
  return deferred
}

module.exports = defer
