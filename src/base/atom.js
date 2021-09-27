// const Subscribable = require('./subscribable')
const Valuable = require('./valuable')
const Emitter = require('./emitter')
const perform = require('../utils/perform')
const evaluate = require('../utils/evaluate')
const defer = require('../utils/defer')
// const isThenable = require('../utils/isThenable')

/**
 * @name getDefaultValue
 * @private
 * @description Returns a default value for the Atom's getters
 * @returns {undefined} - Always returns undefined
 */
const getDefaultValue = () => undefined

/**
 * Resolves the value of a dependencies and a getter
 *
 * @private
 * @param {Array} dependencies - an array of dependencies
 * @param {Function} getValue - a getter for a value
 * @returns {Promise|*} - either a promise or a definitive value
 */
const resolveValue = function (dependencies, getValue) {
  this.isPending = true
  const deferred = defer()
  this.promise = deferred.promise
  // evaluates the dependencies
  return perform(evaluate(dependencies))((value) => {
    // evaluates the getter
    return perform(getValue(value))((value) => {
      deferred.resolve()
      this.isPending = false
      this.current = value
      this.promise = null
      return value
    })
  })
}

/**
 * @name defaultOptions
 * @private
 * @constant
 * @description Constant options for defaults
 */
const defaultOptions = {
  dependencies: [],
  getValue: getDefaultValue,
  getInitialValue: null
}

/**
 * @name Atom
 * @class
 * @namespace Base
 * @implements {Valuable}
 * @description Creates a basic atom
 */
class Atom extends Valuable {
  /**
   * @constructs Atom
   * @param {*?} options - an options object
   * @param {Array} dependencies - An array of dependencies
   */
  constructor (options, dependencies = []) {
    super(options)
    const {getValue, getInitialValue} = {...defaultOptions, ...options}

    // dependencies control
    this.dependencies = dependencies || []
    this.getValue = getValue
    this.subscribable = new Emitter()

    // state management
    this.promise = null
    this.isPending = false
    this.error = null
    this.current = null
    resolveValue.call(this, dependencies, getInitialValue || getValue)
  }

  /**
   * Evaluates the value of the atom by the dependencies
   *
   * @returns {*|Promise} - either a value or a promise
   */
  value () {
    return resolveValue.call(this, this.dependencies, this.getValue)
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
