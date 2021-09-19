const Subscribable = require('../../../src/base/subscribable')

describe('Emitter', () => {
  test('Should create a new subscribable', () => {
    const observer = new Subscribable()
    expect(typeof observer).toBe('object')
    expect(observer).toBeInstanceOf(Subscribable)
  })

  test('Should not subscribe to a emitter', () => {
    const observer = new Subscribable()
    const callback = jest.fn()
    expect(() => {
      observer.subscribe(callback)
    }).toThrow()
  })

  test('Should fail to trigger a value', () => {
    const observer = new Subscribable()
    expect(() => {
      observer.trigger(null)
    }).toThrow()
  })
})
