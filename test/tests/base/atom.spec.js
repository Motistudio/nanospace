const Atom = require('../../../src/base/atom')

describe('Atom', () => {
  test('Should create a new Atom', () => {
    const atom = new Atom({}, [])
    expect(typeof atom).toBe('object')
    expect(atom).toBeInstanceOf(Atom)
  })
})
