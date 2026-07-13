// Do not replace with '@zag-js/react'
import { mergeProps } from '@zag-js/core'
import type React from 'react'
import {
  Children,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactElement,
  type ReactNode,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
} from 'react'
import { useComposedRefs } from '../utils/compose-refs.ts'

export type EmptyState = Record<never, never>

// intentionally `any`: the props are spread onto arbitrary user components, `unknown` would break that
export type RenderProps = Record<string, any>

export type RenderFn<State> = (props: RenderProps, state: State) => ReactNode

export interface PolymorphicProps<State = EmptyState> {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   *
   * @deprecated Use `render` instead. Pass the element directly (`render={<MyButton />}`) or a function
   * (`render={(props, state) => <MyButton {...props} />}`) to access the part's state.
   * `asChild` will be removed in the next major.
   */
  asChild?: boolean | undefined
  /**
   * Render the part as a custom element, combining their props and behavior.
   *
   * Pass an element to have the part's props merged into it, or a function to control the merge
   * yourself and read the part's state.
   */
  render?: ReactElement | RenderFn<State> | undefined
}

interface ArkProps extends PolymorphicProps<any> {
  children?: ReactNode | undefined
  /**
   * The state of the part, forwarded to the `render` function. Set by the component, not the consumer.
   */
  state?: unknown
}

type JsxElements = { [E in keyof JSX.IntrinsicElements]: ArkForwardRefComponent<E> }
type ArkForwardRefComponent<E extends React.ElementType> = React.ForwardRefExoticComponent<ArkPropsWithRef<E>>
type ArkPropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & ArkProps

const EMPTY_STATE: EmptyState = Object.freeze({})

// Credits to the Radix team
function getRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) {
    return (element as any).ref
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<unknown> | undefined }).ref
  }

  return (element.props as { ref?: React.Ref<unknown> | undefined }).ref || (element as any).ref
}

const withRender = (Component: React.ElementType) => {
  const Comp = memo(
    forwardRef<unknown, ArkPropsWithRef<typeof Component>>((props, ref) => {
      const { asChild, render, state, children, ...restProps } = props as ArkProps

      if (process.env.NODE_ENV !== 'production' && asChild && render) {
        throw new Error('[ark-ui] `asChild` and `render` cannot be used together. Prefer `render`.')
      }

      const rendered = typeof render === 'function' ? render({ ...restProps, children }, state ?? EMPTY_STATE) : render
      const target = render ? rendered : asChild ? children : undefined

      const onlyChild = isValidElement<Record<string, unknown>>(target) ? Children.only(target) : undefined
      const childRef = onlyChild ? getRef(onlyChild) : undefined
      const composedRef = useComposedRefs(ref, childRef)

      if (!render && !asChild) {
        return createElement(Component, { ...restProps, ref }, children)
      }

      if (!onlyChild) {
        // a render function is free to return a fragment, a string or nothing at all
        return typeof render === 'function' ? (rendered as ReactElement | null) : null
      }

      // a render function receives the props and applies them itself, so only the ref is left to compose.
      // with `asChild` the children *is* the element, so it must not be merged back into itself.
      const nextProps =
        typeof render === 'function'
          ? {}
          : mergeProps(render ? { ...restProps, children } : restProps, onlyChild.props as ArkProps)

      return cloneElement(onlyChild, {
        ...nextProps,
        ref: ref ? composedRef : childRef,
      })
    }),
  )

  // @ts-expect-error - it exists
  Comp.displayName = Component.displayName || Component.name

  return Comp
}

export type HTMLProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>
export type HTMLArkProps<T extends keyof JSX.IntrinsicElements, State = EmptyState> = HTMLProps<T> &
  PolymorphicProps<State>

export const jsxFactory = () => {
  const cache = new Map()

  return new Proxy(withRender, {
    apply(_target, _thisArg, argArray) {
      return withRender(argArray[0])
    },
    get(_, element) {
      const asElement = element as React.ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withRender(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const ark = jsxFactory()
