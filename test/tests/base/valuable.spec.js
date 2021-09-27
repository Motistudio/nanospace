const Valuable = require('../../../src/base/valuable')

describe('Valuable', () => {
  test('Should create a new subscribable', () => {
    const observer = new Valuable()
    expect(typeof observer).toBe('object')
    expect(observer).toBeInstanceOf(Valuable)
  })

  test('Should not subscribe to a emitter', () => {
    const observer = new Valuable()
    const callback = jest.fn()
    expect(() => {
      observer.value(callback)
    }).toThrow()
  })

  test('Should fail to trigger a value', () => {
    const observer = new Valuable()
    expect(() => {
      observer.set(null)
    }).toThrow()
  })
})
