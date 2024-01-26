import { splitProps, type ComponentProps, type JSX, type ValidComponent } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Assign } from './types'

type AsProps<T extends ValidComponent = ValidComponent> = {
  as?: T
}

type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: ArkComponent<E>
}

type AsComponentProps<E extends ElementType> = ComponentProps<E> & AsProps

type ElementType = keyof JSX.IntrinsicElements

export type ArkComponent<T extends ValidComponent, P extends object = {}> = {
  <K extends ValidComponent = T>(
    props: Assign<Assign<ComponentProps<T>, ComponentProps<K>>, Assign<AsProps<K>, P>>,
  ): JSX.Element
}

export const withAsProp = <T extends ValidComponent>(Component: T) => {
  const Polymorphic: ArkComponent<T> = (props) => {
    const [localProps, otherProps] = splitProps(props as AsProps, ['as'])
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
