import { spread as solidSpread } from 'solid-js/web'
import { filterObject } from './filter-object'

const getEventKey = (key: string) => `$$${key.toLowerCase().slice(2)}`

export const spread = (node: HTMLElement, props: any) => {
  const eventListeners = filterObject(props, ([key]) => key.slice(0, 2) === 'on')
  // @ts-expect-error fix later
  const events = filterObject(node, ([key]) => key.slice(0, 2) === '$$')

  console.log({ eventListeners, events })

  const result: Record<string, unknown> = {}

  for (const key in eventListeners) {
    const prop = getEventKey(key)
    if (prop in events) {
      result[key] = function (...args: any[]) {
        // @ts-expect-error fix later
        events[prop](...args)
        eventListeners[key](...args)
      }
    } else {
      result[key] = eventListeners[key]
    }
  }

  console.log({ result })

  solidSpread(node, { ...props, ...result })
}
