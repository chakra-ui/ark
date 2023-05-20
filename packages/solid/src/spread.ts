/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMemo, mergeProps } from 'solid-js'
import { spread as solidSpread } from 'solid-js/web'
import { filterProps, mapProps } from './filter-props'
import { mergeStyle } from './merge-style'

const getEventKey = (key: string) => `$$${key.toLowerCase().slice(2)}`
const hasOwn = (obj: any, key: string) => Object.prototype.hasOwnProperty.call(obj, key)

export const spread = (node: HTMLElement, props: any) => {
  const parentProps = filterProps(
    props,
    (key) => typeof key === 'string' && key.slice(0, 2) === 'on',
  )

  const nodeEvents = Object.fromEntries(
    Object.keys(node)
      .filter((prop) => prop.startsWith('$$'))
      // @ts-expect-error - fix later
      .map((prop) => [prop, node[prop]]),
  )

  const composedProps = createMemo(() => {
    return mapProps(parentProps, (key, value) => {
      const prop = getEventKey(key)

      // event composition
      if (hasOwn(nodeEvents, prop)) {
        return function next(...args: unknown[]) {
          // @ts-expect-error - fix later
          value(...args)
          nodeEvents[prop](...args)
        }
      }

      // style composition
      if (key === 'style') {
        return mergeStyle(node.style.cssText, value as any)
      }

      return value
    })
  })

  solidSpread(node, mergeProps(props, composedProps))
}
