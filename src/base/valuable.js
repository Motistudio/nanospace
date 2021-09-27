/**
 * Represents an object that has value which could be set/get
 *
 * @interface
 */
class Valuable {
  /**
   * An abstract method to implement: a function that gets the value
   */
  value () {
    throw new Error('This method should be implemented')
  }

  /**
   * A setter
   */
  set () {
    throw new Error('This method should be implemented')
  }
}

module.exports = Valuable
