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
) => JSX.HTMLAttributes<HTMLElement>

type PolymorphicProps<T extends ElementType> = {
  asChild?: boolean
  children?: JSX.Element | ((props: PropsFn<T>) => JSX.Element)
}

type HTMLArkProps<E extends ElementType> = Assign<ComponentProps<E>, PolymorphicProps<E>>

type ArkComponent<E extends ElementType> = {
  (props: HTMLArkProps<E>): JSX.Element
}

const withAsProp = <T extends ElementType>(Component: T) => {
  const ArkComponent: ArkComponent<T> = (props) => {
    const [localProps, otherProps] = splitProps(props, ['asChild'])

    if (localProps.asChild) {
      if (typeof otherProps.children !== 'function') {
        throw new Error('Children must be a function')
      }

      // @ts-expect-error TODO improve
      const fn = (userProps) => {
        // console.log(userProps)
        const [, restProps] = splitProps(otherProps, ['children', 'ref'])

        return { ref: otherProps.ref, ...mergeProps(restProps, userProps) }
      }

      // @ts-expect-error TODO improve
      return <>{otherProps.children(fn)}</>
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
export type { HTMLArkProps }
