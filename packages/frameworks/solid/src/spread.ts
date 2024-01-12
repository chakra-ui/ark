/* eslint-disable @typescript-eslint/no-explicit-any */
import { createMemo, mergeProps } from 'solid-js'
import { spread as solidSpread } from 'solid-js/web'
import { mergeStyle } from './merge-style'

const getEventKey = (key: string) => `$$${key.toLowerCase().slice(2)}`
const hasOwn = (obj: any, key: string) => Object.prototype.hasOwnProperty.call(obj, key)

function mapProps(
  props: Record<string, unknown>,
  mapper: (key: string, value: unknown) => unknown,
): Record<string, unknown> {
  return Object.fromEntries(Object.entries(props).map(([key, value]) => [key, mapper(key, value)]))
}

export const spread = (node: HTMLElement | SVGElement, props: any) => {
  const nodeEvents = Object.fromEntries(
    Object.keys(node)
      .filter((prop) => prop.startsWith('$$'))
      // @ts-expect-error - fix later
      .map((prop) => [prop, node[prop]]),
  )

  const childProps = createMemo(() =>
    mapProps(props, (key, value) => {
      const eventKey = getEventKey(key)

      // event composition
      if (hasOwn(nodeEvents, eventKey)) {
        return function next(...args: unknown[]) {
          if (typeof value === 'function') value(...args)
          nodeEvents[eventKey](...args)
        }
      }

      // style composition
      if (key === 'style') {
        return mergeStyle(node.style.cssText, value as any)
      }

      // class composition
      if (key === 'class') {
        const nodeClass = node instanceof SVGElement ? node.getAttribute('class') : node.className
        return [nodeClass, value].filter(Boolean).join(' ')
      }

      // don't override existing child attributes
      if (node.hasAttribute(key)) return

      return value
    }),
  )

  solidSpread(node, mergeProps(childProps), node instanceof SVGElement)
}
