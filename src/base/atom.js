const Subscribable = require('./subscribable')
const Emitter = require('./emitter')

/**
 * @name getDefaultValue
 * @private
 * @description Returns a default value for the Atom's getters
 * @returns {undefined} - Always returns undefined
 */
const getDefaultValue = () => undefined

/**
 * @name defaultOptions
 * @private
 * @constant
 * @description Constant options for defaults
 */
const defaultOptions = {
  dependencies: [],
  getValue: getDefaultValue,
  getInitialValue: getDefaultValue
}

/**
 * @name Atom
 * @class
 * @namespace Base
 * @implements {Subscribable}
 * @description Creates a basic atom
 */
class Atom extends Subscribable {
  /**
   * @constructs Atom
   * @param {*?} options - an options object
   */
  constructor (options) {
    super(options)
    const {dependencies, getValue, getInitialValue} = {...defaultOptions, ...options}
    this.value = getInitialValue()
    this.dependencies = dependencies
    this.getValue = getValue
    this.subscribable = new Emitter()
  }

  /**
   * Evaluates the value of the atom by the dependencies
   *
   * @param {*} dependencies - the atom's dependencies
   * @returns {*|Promise} - either a value or a promise
   */
  value (dependencies) {
    this.value = this.getValue(...dependencies)
    return this.value
  }

  /**
   * @description Subscribes to the atom
   * @param {Function} callback - a callback to call in each update
   * @returns {Function} - returns an unsubscribe() function
   */
  subscribe (callback) {
    return this.subscribable.subscribe(callback)
  }
}

module.exports = Atom
