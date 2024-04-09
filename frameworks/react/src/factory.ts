// Do not replace with '@zag-js/react'
import { mergeProps } from '@zag-js/core'
import React, {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
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
}

const withAsChild = (Component: React.ElementType) => {
  const Comp = memo(
    forwardRef<unknown, ArkPropsWithRef<typeof Component>>((props, ref) => {
      const { asChild, children, ...restProps } = props

      if (!asChild) {
        return createElement(Component, { ...restProps, ref }, children)
      }

      const onlyChild = Children.only(children)
      return isValidElement(onlyChild)
        ? cloneElement(onlyChild, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...mergeProps(restProps, onlyChild.props as any),

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: ref ? composeRefs(ref, (onlyChild as any).ref) : (onlyChild as any).ref,
          })
        : null
    }),
  )

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

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as React.ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const ark = jsxFactory()
