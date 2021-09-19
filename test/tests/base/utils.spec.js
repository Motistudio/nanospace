const Atom = require('../../../src/base/atom')
const {isThenable, evaluate} = require('../../../src/base/utils')

describe('Utils', () => {
  describe('isThenable', () => {
    test('Should return true for thenable object', () => {
      const thenable = {then: () => null}
      expect(isThenable(thenable)).toBe(true)
    })

    test('Should return false for un-thenable object', () => {
      const thenable = {then: null}
      expect(isThenable(thenable)).toBe(false)
    })

    test('Should return false for any non-object argument', () => {
      expect(isThenable({})).toBe(false)
      expect(isThenable(null)).toBe(false)
      expect(isThenable(undefined)).toBe(false)
      expect(isThenable(NaN)).toBe(false)
      expect(isThenable('test')).toBe(false)
      expect(isThenable(15)).toBe(false)
      expect(isThenable(true)).toBe(false)
    })
  })

  describe('Evaluate', () => {
    const values = [0, 10, 15]
    const syncedAtoms = values.map((value) => new Atom({getValue: () => value}))
    const asyncValues = [0, 3, ...values.map(v => Promise.resolve(v))]
    const asyncedAtoms = asyncValues.map((value) => new Atom({getValue: () => value}))
    test('Should evaluate primitive values', () => {
      const evaluatedValues = evaluate(syncedAtoms)
      expect(Array.isArray(evaluatedValues)).toBe(true)
      expect(evaluatedValues).toMatchObject(values)
    })

    test('Should evaluate async values', async () => {
      const evaluatedValuesPromise = evaluate(asyncedAtoms)
      // return value is promise
      expect(isThenable(evaluatedValuesPromise)).toBe(true)
      const evaluatedValues = await evaluatedValuesPromise
      // check the other stuff
      expect(Array.isArray(evaluatedValues)).toBe(true)
      expect(evaluatedValues).toMatchObject([0, 3, ...values])
    })
  })
})
