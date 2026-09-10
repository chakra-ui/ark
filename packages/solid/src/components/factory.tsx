import { mergeProps } from '@zag-js/solid'
import { warn } from '@zag-js/utils'
import { type Accessor, type ComponentProps, type JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Assign } from '../types.ts'

type ElementType = keyof JSX.IntrinsicElements

type JsxElements = {
  [E in ElementType]: ArkComponent<E>
}

export type EmptyState = Record<never, never>

// intentionally `any`: the props are spread onto arbitrary user components, `unknown` would break that
export type RenderProps = Record<string, any>

// call it to get the part's props, passing your own to merge them in
export type PropsFn<T extends ElementType> = (userProps?: JSX.IntrinsicElements[T]) => RenderProps

// the render fn runs once, so the state has to be an accessor
export type RenderFn<T extends ElementType, State> = (props: PropsFn<T>, state: Accessor<State>) => JSX.Element

export type PolymorphicProps<T extends ElementType, State = EmptyState> = {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   *
   * @deprecated Use `render` instead. It takes the same props function, plus the part's state.
   * `asChild` will be removed in the next major.
   */
  asChild?: (props: PropsFn<T>) => JSX.Element
  /**
   * Render the part as a custom element, combining their props and behavior.
   *
   * Call `props()` to spread the part's props, passing your own to merge them rather than overwrite them.
   * The state arrives as an accessor:
   * `render={(props, state) => <button {...props({ onClick: mine })}>{state().open}</button>}`
   */
  render?: RenderFn<T, State>
}
export type HTMLProps<E extends ElementType> = JSX.IntrinsicElements[E]
export type HTMLArkProps<E extends ElementType> = Assign<ComponentProps<E>, PolymorphicProps<E>>

/**
 * The state of the part, forwarded to the `render` function. Set by the component, not the consumer.
 */
interface StateProp {
  state?: unknown
}

interface FactoryProps extends Record<string, any> {
  asChild?: (props: PropsFn<any>) => JSX.Element
  render?: RenderFn<any, any>
  state?: unknown
}

// `any` for the state so a render fn can declare the shape its part provides
type ArkComponent<E extends ElementType> = (
  props: Assign<ComponentProps<E>, PolymorphicProps<E, any>> & StateProp,
) => JSX.Element

const EMPTY_STATE: EmptyState = Object.freeze({})

const withRender = <T extends ElementType>(Component: T) => {
  const ArkComponent: ArkComponent<T> = (props) => {
    const [localProps, parentProps] = splitProps(props as FactoryProps, ['asChild', 'render', 'state'])

    warn(
      Boolean(localProps.asChild) && Boolean(localProps.render),
      '[ark-ui] `asChild` and `render` cannot be used together. Prefer `render`.',
    )

    // the caller applies the props itself, so only the ref is left to us
    const [, restProps] = splitProps(parentProps, ['ref'])
    const propsFn = (userProps?: JSX.IntrinsicElements[T]) => mergeProps(restProps, userProps ?? {})

    if (localProps.render) {
      return localProps.render(propsFn, () => localProps.state ?? EMPTY_STATE)
    }

    if (localProps.asChild) {
      return localProps.asChild(propsFn)
    }

    // @ts-expect-error generic element props can't be expressed against Dynamic
    return <Dynamic component={Component} {...parentProps} />
  }

  return ArkComponent
}

function jsxFactory() {
  const cache = new Map()

  return new Proxy(withRender, {
    apply(_target, _thisArg, argArray) {
      return withRender(argArray[0])
    },
    get(_, element) {
      const asElement = element as ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withRender(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as JsxElements
}

export const ark = jsxFactory()
