const isThenable = require('./isThenable')

/**
 * @module Utils/perform
 */

/**
 * Abstracts the resolve between a sync and async code
 *
 * @param {*} value - any given value
 * @returns {Promise|*} - Either a promise or a definite value
 */
const resolve = function (value) {
  if (isThenable(value)) {
    return value.then(getPromise.call(this)).catch(reject.bind(this))
  }
  let returnValue
  try {
    returnValue = this.successCallbacks.reduce((lastValue, callback) => {
      return callback(lastValue)
    }, value)
  } catch (e) {
    returnValue = this.failureCallbacks.reduce((lastValue, callback) => {
      return callback(lastValue)
    }, e)
  } finally {
    this.finallyCallbacks.reduce((lastValue, callback) => {
      return callback(lastValue)
    }, undefined)
  }
  return returnValue
}

/**
 * Performs the failure callbacks
 *
 * @param {Error} e - any error
 * @returns {Promise|Error} - Either a promise which rejects to an error or an error object
 */
const reject = (e) => {
  const returnValue = this.failureCallbacks.reduce((lastValue, callback) => {
    return callback(lastValue)
  }, e)
  this.finallyCallbacks.reduce((lastValue, callback) => {
    return callback(lastValue)
  }, undefined)

  return returnValue
}

/**
 * Returns a promise with the Performable values
 *
 * @this Performable
 * @returns {Promise} - a promise with the Performable callbacks
 */
const getPromise = function () {
  const p = Promise.resolve()
  this.successCallbacks.forEach(t => p.then(t))
  this.failureCallbacks.forEach(c => p.catch(c))
  this.finallyCallbacks.forEach(f => p.catch(f))

  return p
}

/**
 * A class represents a Promise's basic API
 */
class Performable {
  /**
   * @constructs
   * @param {Function} callback - a callback to abstract
   */
  constructor (callback) {
    this.successCallbacks = []
    this.failureCallbacks = []
    this.finallyCallbacks = []

    callback(resolve.bind(this), reject.bind(this))
  }

  /**
   * Adds a success callback
   *
   * @param {Function} callback - a callback for success
   * @returns {Performable} - A Performable object (Chainable API)
   */
  then (callback) {
    this.successCallbacks.push(callback)
    return this
  }

  /**
   * Adds a failure callback
   *
   * @param {Function} callback - a callback for success
   * @returns {Performable} - A Performable object (Chainable API)
   */
  catch (callback) {
    this.failureCallbacks.push(callback)
    return this
  }

  /**
   * Adds a finally callback
   *
   * @param {Function} callback - a callback for finally
   * @returns {Performable} - A Performable object (Chainable API)
   */
  finally (callback) {
    this.finallyCallbacks.push(callback)
    return this
  }
}

module.exports = Performable
