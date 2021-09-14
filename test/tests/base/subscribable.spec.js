const Subscribable = require('../../../src/base/subscribable')

describe('Subscribable', () => {
  test('Should create a new subscribable', () => {
    const observer = new Subscribable()
    expect(typeof observer).toBe('object')
    expect(observer).toBeInstanceOf(Subscribable)
  })

  test('Should subscribe to a subscribable', () => {
    const value = 'test value'
    const observer = new Subscribable()
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
