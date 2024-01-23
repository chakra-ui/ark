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
  as?: ElementType
}
type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
}
type AsChildForwardRefComponent<E extends ElementType> = Component<AsChildComponentProps<E>>
type AsChildComponentProps<E extends ElementType> = ComponentProps<E> & AsChildProps

function withAs(Component: ElementType) {
  return function jsx(props: ParentProps<AsChildProps>) {
    const [localProps, restProps] = splitProps(props, ['asChild', 'as', 'children'])

    if (localProps.asChild) {
      const getChildren = children(() => ssrSpread(localProps.children, restProps))

      createEffect(() => {
        const children = getChildren()
        if (children instanceof HTMLElement || children instanceof SVGElement) {
          spread(children, restProps)
        }
      })

      return getChildren
    }

    if (localProps.as) {
      return (
        <Dynamic component={localProps.as} {...restProps}>
          {localProps.children}
        </Dynamic>
      )
    }

    return (
      <Dynamic component={Component} {...restProps}>
        {localProps.children}
      </Dynamic>
    )
  }
}

function jsxFactory() {
  const cache = new Map()

  return new Proxy(withAs, {
    apply(target, thisArg, argArray) {
      return withAs(argArray[0])
    },
    get(_, element) {
      const asElement = element as ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAs(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export type HTMLArkProps<T extends ElementType> = AsChildComponentProps<T>
export const ark = jsxFactory()
