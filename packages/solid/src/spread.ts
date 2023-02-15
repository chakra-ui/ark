import { spread as solidSpread } from 'solid-js/web'
import { filterObject } from './filter-object'

const getEventKey = (key: string) => `$$${key.toLowerCase().slice(2)}`

export const spread = (node: HTMLElement, props: any) => {
  const eventListeners = filterObject(props, ([key]) => key.slice(0, 2) === 'on')
  // @ts-expect-error - TODO iterator type
  const events = filterObject(node, ([key]) => key.slice(0, 2) === '$$')

  const result = Object.fromEntries(
    Object.entries(eventListeners).map(([key, value]) => {
      const prop = getEventKey(key)
      const newValue =
        prop in events
          ? function (...args: unknown[]) {
              // @ts-expect-error - TODO iterator type
              events[prop](...args)
              value(...args)
            }
          : value
      return [key, newValue]
    }),
  )

  solidSpread(node, { ...props, ...result })
}
