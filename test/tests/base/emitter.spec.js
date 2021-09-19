const Emitter = require('../../../src/base/emitter')

describe('Emitter', () => {
  test('Should create a new emitter', () => {
    const observer = new Emitter()
    expect(typeof observer).toBe('object')
    expect(observer).toBeInstanceOf(Emitter)
  })

  test('Should subscribe to a emitter', () => {
    const value = 'test value'
    const observer = new Emitter()
    const callback = jest.fn()
    const unsubscribe = observer.subscribe(callback)
    expect(observer.subscriptions.length).toBe(1)
    observer.trigger(value)
    expect(callback).toHaveBeenCalledWith(value)
    unsubscribe()
    expect(observer.subscriptions.length).toBe(0)

    // unsubscribes a second time
    unsubscribe()
    // everything should remain alright
    expect(observer.subscriptions.length).toBe(0)
  })
})
