/* eslint-disable @typescript-eslint/no-explicit-any */
import { $PROXY } from 'solid-js'

function trueFn() {
  return true
}

export const propTraps: ProxyHandler<{
  get: (k: string | number | symbol) => any
  has: (k: string | number | symbol) => boolean
  keys: () => string[]
}> = {
  get(_, property, receiver) {
    if (property === $PROXY) return receiver
    return _.get(property)
  },
  has(_, property) {
    return _.has(property)
  },
  set: trueFn,
  deleteProperty: trueFn,
  getOwnPropertyDescriptor(_, property) {
    return {
      configurable: true,
      enumerable: true,
      get() {
        return _.get(property)
      },
      set: trueFn,
      deleteProperty: trueFn,
    }
  },
  ownKeys(_) {
    return _.keys()
  },
}
