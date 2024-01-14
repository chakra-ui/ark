import { type Component, type ComponentProps, type JSX } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Polymorphic, type PolymorphicProps } from './polymorphic'

type ElementType = keyof JSX.IntrinsicElements
type AsChildProps = {
  asChild?: boolean
}
type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
}
type AsChildForwardRefComponent<E extends ElementType> = Component<AsChildComponentProps<E>>
type AsChildComponentProps<E extends ElementType> = ComponentProps<E> & AsChildProps

function withAsChild<C extends ElementType>(Component: C) {
  return function jsx(props: PolymorphicProps<C>) {
    return <Dynamic component={Polymorphic} as={Component} {...props} />
  }
}

function jsxFactory() {
  const cache = new Map()

  return new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export type HTMLArkProps<T extends ElementType> = AsChildComponentProps<T>
export const ark = jsxFactory()
