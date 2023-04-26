/* eslint-disable @typescript-eslint/no-explicit-any */

import { mergeProps } from '@zag-js/react'
import { Children, forwardRef as __forwardRef, cloneElement, isValidElement } from 'react'
import { composeRefs } from './compose-refs'
import type { Assign } from './types'

type AsChildProps = {
  asChild?: boolean
}

export type ComponentPropsWithAsChild<T extends React.ElementType> =
  React.ComponentPropsWithRef<T> & AsChildProps

type JsxFactoryFn<T extends React.ElementType = React.ElementType> = (
  component: T,
) => React.FC<ComponentPropsWithAsChild<T>>

type JsxElements = {
  [K in keyof JSX.IntrinsicElements]: React.FC<ComponentPropsWithAsChild<K>>
}

function withAsChild(Component: React.ElementType) {
  const Comp = __forwardRef<unknown, React.PropsWithChildren<AsChildProps>>((props, ref) => {
    const { asChild, ...restProps } = props

    if (!asChild) {
      return <Component {...restProps} ref={ref} />
    }

    const onlyChild = Children.only(props.children)
    const forwardedRef = composeRefs(ref, (onlyChild as any).ref)

    return isValidElement(onlyChild)
      ? cloneElement(onlyChild, {
          ...mergeProps(restProps, onlyChild.props as any),
          ref: forwardedRef,
        })
      : null
  })

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export function jsxFactory() {
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
  }) as unknown as JsxFactoryFn & JsxElements
}

export const ark = jsxFactory()

export type HTMLArkProps<
  T extends React.ElementType,
  P extends Record<never, never> = Record<never, never>,
> = Assign<ComponentPropsWithAsChild<T>, P>
