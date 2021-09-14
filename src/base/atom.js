const Subscribable = require('./subscribable')

/**
 * @class Core/Atom
 */
class Atom {
  constructor (dependencies, getValue, getInitialValue) {
    this.value = getInitialValue()
    this.getValue = getValue
    this.subscribable = new Subscribable()
  }

  value (dependencies) {
    this.value = this.getValue(dependencies)
  }

  subscribe (callback) {
    return this.subscribable.subscribe(callback)
  }
}

module.exports = Atom
