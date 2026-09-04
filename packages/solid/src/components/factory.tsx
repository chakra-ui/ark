import { mergeProps } from '@zag-js/solid'
import { warn } from '@zag-js/utils'
import { type ComponentProps, type JSX, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import type { Assign } from '../types.ts'

type ElementType = keyof JSX.IntrinsicElements

type JsxElements = {
  [E in ElementType]: ArkComponent<E>
}

type ParentProps<T extends ElementType> = (userProps?: JSX.IntrinsicElements[T]) => JSX.HTMLAttributes<any>

export type EmptyState = Record<never, never>

// intentionally `any`: the props are spread onto arbitrary user components, `unknown` would break that
export type RenderProps = Record<string, any>

export type RenderFn<State> = (props: RenderProps, state: State) => JSX.Element

export type PolymorphicProps<T extends ElementType, State = EmptyState> = {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   *
   * @deprecated Use `render` instead. `render` receives the props to spread and the part's state.
   * `asChild` will be removed in the next major.
   */
  asChild?: (props: ParentProps<T>) => JSX.Element
  /**
   * Render the part as a custom element, combining their props and behavior.
   *
   * Takes a function, or a component, since a solid component is a function of its props:
   * `render={MyButton}` and `render={(props) => <MyButton {...props} />}` both work.
   */
  render?: RenderFn<State>
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
  asChild?: (props: ParentProps<any>) => JSX.Element
  render?: RenderFn<any>
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

    // the render fn applies the props itself, so only the ref is left to the caller
    const [, restProps] = splitProps(parentProps, ['ref'])

    if (localProps.render) {
      return localProps.render(restProps as RenderProps, localProps.state ?? EMPTY_STATE)
    }

    if (localProps.asChild) {
      const propsFn = (userProps?: JSX.IntrinsicElements[T]) => mergeProps(restProps, userProps ?? {})
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
