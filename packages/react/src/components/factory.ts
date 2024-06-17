// Do not replace with '@zag-js/react'
import { mergeProps } from '@zag-js/core'
import type React from 'react'
import {
  Children,
  type ComponentPropsWithoutRef,
  type JSX,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
} from 'react'
import { composeRefs } from '../utils/compose-refs'

export interface PolymorphicProps {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   */
  asChild?: boolean
}

type JsxElements = { [E in keyof JSX.IntrinsicElements]: ArkForwardRefComponent<E> }
type ArkForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<
  ArkPropsWithRef<E>
>
type ArkPropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> &
  PolymorphicProps

// Future proof: access ref from props, fallback to element.ref
// https://github.com/facebook/react/pull/28348
function getRef(child: React.ReactElement) {
  if ('ref' in child.props) return child.props.ref
  if ('ref' in child) return child.ref
  return null
}

const withAsChild = (Component: React.ElementType) => {
  const Comp = memo(
    forwardRef<unknown, ArkPropsWithRef<typeof Component>>((props, ref) => {
      const { asChild, children, ...restProps } = props

      if (!asChild) {
        return createElement(Component, { ...restProps, ref }, children)
      }

      const onlyChild: React.ReactNode = Children.only(children)

      if (!isValidElement(onlyChild)) {
        return null
      }

      const childRef = getRef(onlyChild)

      return cloneElement(onlyChild, {
        ...mergeProps(restProps, onlyChild.props),
        ref: ref ? composeRefs(ref, childRef) : childRef,
      })
    }),
  )

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

/**
 * @deprecated
 */
export type HTMLArkProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T> &
  PolymorphicProps

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
