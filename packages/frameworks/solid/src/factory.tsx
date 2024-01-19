import {
  splitProps,
  type Component,
  type ComponentProps,
  type JSX,
  type ValidComponent,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

type AsProps = {
  as?: ValidComponent
}

type PolymorphicProps<T extends ValidComponent, P = ComponentProps<T>> = {
  [K in keyof P]: P[K]
} & AsProps

type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: AsForwardRefComponent<E>
}

type AsForwardRefComponent<E extends ElementType> = Component<AsComponentProps<E>>
type AsComponentProps<E extends ElementType> = ComponentProps<E> & AsProps
type ElementType = keyof JSX.IntrinsicElements

export const withAsProp = <T extends ValidComponent>(Component: T) => {
  const Polymorphic = (props: PolymorphicProps<T>) => {
    const [localProps, otherProps] = splitProps(props as PolymorphicProps<ValidComponent>, ['as'])
    return <Dynamic component={localProps.as || Component} {...otherProps} />
  }
  return Polymorphic
}

function jsxFactory() {
  const cache = new Map()

  return new Proxy(withAsProp, {
    apply(target, thisArg, argArray) {
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

export type HTMLArkProps<T extends ElementType> = AsComponentProps<T>
export const ark = jsxFactory()
