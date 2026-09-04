import {
  type AllowedComponentProps,
  type ComponentCustomProps,
  type ExtractPropTypes,
  type IntrinsicElementAttributes,
  type VNode,
  type VNodeProps,
  defineComponent,
  h,
} from 'vue'
import { Dynamic } from '../utils/dynamic.ts'

type DOMElements = keyof IntrinsicElementAttributes
type ElementType = Parameters<typeof h>[0]

export type EmptyState = Record<never, never>

// intentionally `any`: the props are bound onto arbitrary user components, `unknown` would break that
export type RenderProps = Record<string, any>

export interface RenderSlotScope<State = EmptyState> {
  /**
   * The part's props, to bind onto your own element.
   */
  props: RenderProps
  /**
   * The part's state.
   */
  state: State
}

export interface PolymorphicProps {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   *
   * @deprecated Use the `render` slot instead. `asChild` will be removed in the next major.
   */
  asChild?: boolean
}

export interface PolymorphicSlots<State = EmptyState> {
  default?: () => VNode[]
  /**
   * Render the part as a custom element, combining their props and behavior.
   *
   * Vue templates cannot take an element as a prop value, so this is a scoped slot rather than
   * react's `render` prop.
   */
  render?: (scope: RenderSlotScope<State>) => VNode[]
}

export type AsChildComponent<
  Component extends ElementType,
  P extends Record<string, unknown> = Record<never, never>,
> = {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      ExtractPropTypes<Component> &
      (Component extends keyof IntrinsicElementAttributes
        ? IntrinsicElementAttributes[Component]
        : Record<never, never>) &
      P &
      PolymorphicProps
    $slots: PolymorphicSlots
  }
}

export type HTMLPolymorphicComponents = {
  [E in DOMElements]: AsChildComponent<E>
}

export type HTMLPolymorphicProps<T extends ElementType> = Omit<
  // If T is the keyof a DOM element (i.e. `img`) then need to obtain that element's attribute object to extract props.
  // Otherwise, return T which could be a component (`DefineComponent` definition)
  ExtractPropTypes<T extends DOMElements ? IntrinsicElementAttributes[T] : T>,
  'ref'
> & {
  asChild?: boolean
  state?: unknown
}

export type HTMLArkProps<T extends DOMElements> = HTMLPolymorphicProps<T>

// For self closing tags, don't provide default slots because of hydration issue
const SELF_CLOSING_TAGS = 'br, hr, img, input, area, textarea'.split(', ')
const isSelfClosingTag = (tag: unknown) => typeof tag === 'string' && SELF_CLOSING_TAGS.includes(tag)

const EMPTY_STATE: EmptyState = Object.freeze({})

const withRender = (component: ElementType) => {
  return defineComponent({
    name: 'Polymorphic',
    inheritAttrs: false,
    props: {
      asChild: {
        type: Boolean,
        default: false,
      },
      state: {
        type: null,
        default: undefined,
      },
    },
    setup(props, { attrs, slots }) {
      return () => {
        // the slot binds the props itself, so it owns the merge
        if (slots.render) return slots.render({ props: attrs, state: props.state ?? EMPTY_STATE })
        if (props.asChild) return h(Dynamic, attrs, slots)
        return h(component, attrs, isSelfClosingTag(component) ? undefined : slots.default?.())
      }
    },
  })
}

export function jsxFactory() {
  const cache = new Map()

  const factory = new Proxy(withRender, {
    apply(_target, _thisArg, argArray) {
      return withRender(argArray[0])
    },
    get(_, element) {
      if (!cache.has(element)) {
        cache.set(element, withRender(element as ElementType))
      }
      return cache.get(element)
    },
  }) as unknown as HTMLPolymorphicComponents

  return factory
}

export const ark = jsxFactory()
