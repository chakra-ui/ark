import { children, createEffect, type JSX } from 'solid-js'
import { spread } from './spread'
import { ssrSpread } from './ssr-spread'

export const cloneElement = (child: JSX.Element, spreadProps: () => Record<string, unknown>) => {
  const cloneProps = spreadProps()
  const getChildren = children(() => ssrSpread(child, cloneProps))

  createEffect(() => {
    const children = getChildren()
    if (children instanceof HTMLElement || children instanceof SVGElement) {
      spread(children, spreadProps())
    }
  })

  return getChildren()
}
