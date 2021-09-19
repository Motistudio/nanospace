/**
 * @interface Subscribable
 * Enables the basic API of subscribing and triggering
 */
class Subscribable {
  /**
   * @name trigger
   * @description Triggers the subscriptions and invokes them
   * @param {*} value - a value for the subscriptions
   */
  trigger (value) {
    throw new Error('Need to implement trigger() function')
  }

  /**
   * @name subscribe
   * @description Subscribes to updates
   * @param {Function} callback - a callback for subscription updates
   * @returns {Function} - an unsubscribe function
   */
  subscribe (callback) {
    throw new Error('Need to implement subscribe function')
  }
}

module.exports = Subscribable
