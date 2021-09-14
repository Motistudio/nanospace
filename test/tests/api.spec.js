const {atom, selector} = require('../../')

describe('Main API', () => {
  test.each([atom, selector].map(fn => [fn.name, fn]))('Should have the main functions (%s)', (name, fn) => {
    expect(typeof fn).toBe('function')
  })
})
