/* eslint-disable @typescript-eslint/no-explicit-any */

import { mergeProps } from '@zag-js/core'
import React, {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type JSX,
} from 'react'
import { composeRefs } from './compose-refs'

type JsxElements = { [E in keyof JSX.IntrinsicElements]: ArkForwardRefComponent<E> }
type ArkForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<
  ArkPropsWithRef<E>
>
type ArkPropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & {
  asChild?: boolean
  as?: React.ElementType
}

const withAs = (Component: React.ElementType) => {
  const Comp = forwardRef<unknown, ArkPropsWithRef<typeof Component>>((props, ref) => {
    const { as, asChild, children, ...restProps } = props

    if (asChild) {
      const onlyChild = Children.only(children)
      return isValidElement(onlyChild)
        ? cloneElement(onlyChild, {
            ...mergeProps(restProps, onlyChild.props as any),
            ref: ref ? composeRefs(ref, (onlyChild as any).ref) : (onlyChild as any).ref,
          })
        : null
    }

    if (as) {
      return createElement(as, { ...restProps, ref }, children)
    }

    return createElement(Component, { ...restProps, ref }, children)
  })

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export type HTMLArkProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T> & {
  /**
   * Render as a different element type.
   */
  asChild?: boolean
}

export const jsxFactory = () => {
  const cache = new Map()

  return new Proxy(withAs, {
    apply(target, thisArg, argArray) {
      return withAs(argArray[0])
    },
    get(_, element) {
      const asElement = element as React.ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAs(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const ark = jsxFactory()
