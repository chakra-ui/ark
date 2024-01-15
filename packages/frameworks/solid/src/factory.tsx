import {
  children,
  createEffect,
  splitProps,
  type Component,
  type ComponentProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { spread } from './spread'
import { ssrSpread } from './ssr-spread'

type ElementType = keyof JSX.IntrinsicElements
type AsChildProps = {
  asChild?: boolean
}
type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
}
type AsChildForwardRefComponent<E extends ElementType> = Component<AsChildComponentProps<E>>
type AsChildComponentProps<E extends ElementType> = ComponentProps<E> & AsChildProps

function withAsChild(Component: ElementType) {
  return function jsx(props: ParentProps<AsChildProps>) {
    const [localProps, restProps] = splitProps(props, ['asChild', 'children'])

    if (!localProps.asChild) {
      return (
        <Dynamic component={Component} {...restProps}>
          {localProps.children}
        </Dynamic>
      )
    }

    const getChildren = children(() => ssrSpread(localProps.children, restProps))

    createEffect(() => {
      const children = getChildren()
      if (children instanceof HTMLElement || children instanceof SVGElement) {
        spread(children, restProps)
      }
    })

    return getChildren
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
