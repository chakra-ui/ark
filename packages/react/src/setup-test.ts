import '@testing-library/jest-dom/vitest'
import 'vitest-axe/extend-expect'

// TODO after zag 1.10+ remove this polyfill
if (!Set.prototype.difference) {
  Set.prototype.difference = function (otherSet) {
    // Validate that the input is a Set
    if (!(otherSet instanceof Set)) {
      throw new TypeError('difference: otherSet must be an instance of Set')
    }

    const result = new Set()

    // Add elements from this Set that are not in otherSet
    for (const elem of this) {
      if (!otherSet.has(elem)) {
        result.add(elem)
      }
    }

    return result
  }
}
