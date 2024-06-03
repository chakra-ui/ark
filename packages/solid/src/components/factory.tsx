import { mergeProps } from '@zag-js/solid'
import { type ComponentProps, type JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Assign } from '../types'

type ElementType = keyof JSX.IntrinsicElements

type JsxElements = {
  [E in ElementType]: ArkComponent<E>
}

type ParentProps<T extends ElementType> = (
  userProps?: JSX.IntrinsicElements[T],
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
) => JSX.HTMLAttributes<any>

type PolymorphicProps<T extends ElementType> = {
  asChild?: (props: ParentProps<T>) => JSX.Element
}

type HTMLArkProps<E extends ElementType> = Assign<ComponentProps<E>, PolymorphicProps<E>>

type ArkComponent<E extends ElementType> = (props: HTMLArkProps<E>) => JSX.Element

const withAsProp = <T extends ElementType>(Component: T) => {
  const ArkComponent: ArkComponent<T> = (props) => {
    const [localProps, parentProps] = splitProps(props, ['asChild'])

    if (localProps.asChild) {
      // @ts-expect-error
      const propsFn = (userProps) => {
        const [, restProps] = splitProps(parentProps, ['ref'])
        return mergeProps(restProps, userProps)
      }
      return localProps.asChild(propsFn)
    }
    // @ts-expect-error
    return <Dynamic component={Component} {...parentProps} />
  }

  return ArkComponent
}

function jsxFactory() {
  const cache = new Map()

  return new Proxy(withAsProp, {
    apply(_target, _thisArg, argArray) {
      return withAsProp(argArray[0])
    },
    get(_, element) {
      const asElement = element as ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsProp(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const ark = jsxFactory()
export type { HTMLArkProps }
