import { mergeProps } from '@zag-js/solid'
import { splitProps, type ComponentProps, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Assign } from './types'

type ElementType = keyof JSX.IntrinsicElements

type JsxElements = {
  [E in ElementType]: ArkComponent<E>
}

type PropsFn<T extends ElementType> = (
  userProps?: JSX.IntrinsicElements[T],
) => Omit<JSX.HTMLAttributes<HTMLElement>, 'ref'>

type PolyProps<T extends ElementType> = {
  asChild?: boolean
  children?: JSX.Element | ((props: PropsFn<T>) => JSX.Element)
}

export type HTMLArkProps<E extends ElementType> = Assign<JSX.IntrinsicElements[E], PolyProps<E>>
export type ArkComponentProps<E extends ElementType> = Assign<ComponentProps<E>, PolyProps<E>>

export type ArkComponent<E extends ElementType> = {
  (props: ArkComponentProps<E>): JSX.Element
}

export const withAsProp = <T extends ElementType>(Component: T) => {
  const ArkComponent: ArkComponent<T> = (props) => {
    const [localProps, otherProps] = splitProps(props, ['asChild'])

    if (localProps.asChild) {
      if (typeof otherProps.children !== 'function') {
        throw new Error('Children must be a function')
      }

      return otherProps.children((userProps) => ({
        ref: otherProps.ref,
        ...mergeProps(otherProps, userProps ?? {}),
      }))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Dynamic component={Component} {...(otherProps as any)} />
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
