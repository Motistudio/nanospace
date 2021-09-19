const Subscribable = require('./subscribable')

/**
 * @name unsubscribe
 * @private
 * @this Emitter
 * @description Unsubscribes a function from the collection
 * @param {Function} callback - a callback to unsubscribe
 */
const unsubscribe = function (callback) {
  const index = this.subscriptions.indexOf(callback)
  if (index > -1) {
    this.subscriptions.splice(index, 1)
  }
}

/**
 * @name Emitter
 * @class
 * @namespace Base
 * @implements {Subscribable}
 * @description Creates an emitter of a single value
 * @requires Subscribable
 */
class Emitter extends Subscribable {
  /**
   * @constructs Emitter
   * @param {...*?} args - Any number of arguments. It proxys them into the base class and doesn't use them
   */
  constructor (...args) {
    super(...args)
    this.subscriptions = []
  }

  /**
   * @description Triggers the subscriptions and invokes them
   * @param {*} value - a value for the subscriptions
   */
  trigger (value) {
    this.subscriptions.forEach((callback) => callback(value))
  }

  /**
   * @description Subscribes to updates
   * @param {Function} callback - a callback for subscription updates
   * @returns {Function} - an unsubscribe function
   */
  subscribe (callback) {
    this.subscriptions.push(callback)
    return unsubscribe.bind(this, callback)
  }
}

module.exports = Emitter
