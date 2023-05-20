/* eslint-disable @typescript-eslint/no-explicit-any */

import { mergeProps } from '@zag-js/react'
import { Children, cloneElement, forwardRef, isValidElement } from 'react'
import { composeRefs } from './compose-refs'

export type AsChildProps = {
  asChild?: boolean
}

type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
}

export type AsChildForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<AsChildComponentProps<E>>

export type AsChildComponentProps<E extends React.ElementType> = React.ComponentProps<E> &
  AsChildProps

export type HTMLArkProps<T extends React.ElementType> = AsChildComponentProps<T>

const withAsChild = (Component: React.ElementType) => {
  const Comp = forwardRef<unknown, React.PropsWithChildren<AsChildProps>>((props, ref) => {
    const { asChild, children, ...restProps } = props

    if (!asChild) {
      return <Component {...props} ref={ref} />
    }

    const onlyChild = Children.only(children)

    return isValidElement(onlyChild)
      ? cloneElement(onlyChild, {
          ...mergeProps(restProps, onlyChild.props as any),
          ref: ref ? composeRefs(ref, (onlyChild as any).ref) : (onlyChild as any).ref,
        })
      : null
  })

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export const jsxFactory = () => {
  const cache = new Map()

  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
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
