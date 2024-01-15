import {
  splitProps,
  type Component,
  type ComponentProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { Dynamic } from 'solid-js/web'

type ElementType = keyof JSX.IntrinsicElements
type AsChildProps<E extends Component | ElementType> = {
  asChild?: boolean
  as?: E
}
type JsxElements = {
  [E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
}
type AsChildForwardRefComponent<E extends ElementType> = Component<AsChildComponentProps<E>>

interface AsChildComponentProps<E extends ElementType> {
  <T extends Component | ElementType>(props: ComponentProps<E> & AsChildProps<T>): JSX.Element
}

function withAsChild(Component: ElementType) {
  return function jsx(props: ParentProps<AsChildProps>) {
    const [localProps, restProps] = splitProps(props, ['as', 'children'])

    return (
      <Dynamic component={localProps.as || Component} {...restProps}>
        {localProps.children}
      </Dynamic>
    )
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
