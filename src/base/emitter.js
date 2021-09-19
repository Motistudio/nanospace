const Subscribable = require('./subscribable')

/**
 * @name unsubscribe
 * @private
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
 * @class Emitter
 * @namespace Base
 * @implements {Subscribable}
 * Enables the basic API of subscribing and triggering
 */
class Emitter extends Subscribable {
  /**
   * @constructs
   */
  constructor (...args) {
    super(...args)
    this.subscriptions = []
  }

  /**
   * @name trigger
   * @description Triggers the subscriptions and invokes them
   * @param {*} value - a value for the subscriptions
   */
  trigger (value) {
    this.subscriptions.forEach((callback) => callback(value))
  }

  /**
   * @name subscribe
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
