const Atom = require('./base/atom')

/**
 * @name atom
 * @description Generates an atom
 * @param {object} options - an options object
 * @param {Atom[]} dependencies - a dependencies array
 * @returns {Atom} - Returns an atom
 */
const atom = (options, dependencies) => {
  return new Atom({...options, dependencies})
}

/**
 * Generates a selector
 */
const selector = () => {}

module.exports = {
  atom,
  selector
}
