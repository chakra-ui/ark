import {
  type AllowedComponentProps,
  type ComponentCustomProps,
  type ExtractPropTypes,
  type IntrinsicElementAttributes,
  type VNodeProps,
  defineComponent,
  h,
} from 'vue'
import { Dynamic } from '../utils/dynamic'

type DOMElements = keyof IntrinsicElementAttributes
type ElementType = Parameters<typeof h>[0]

export interface PolymorphicProps {
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   */
  asChild?: boolean
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
}

export type HTMLArkProps<T extends DOMElements> = HTMLPolymorphicProps<T>

// For self closing tags, don't provide default slots because of hydration issue
const SELF_CLOSING_TAGS = 'br, hr, img, input, area, textarea'.split(', ')
const isSelfClosingTag = (tag: unknown) => typeof tag === 'string' && SELF_CLOSING_TAGS.includes(tag)

const withAsChild = (component: ElementType) => {
  return defineComponent({
    name: 'Polymorphic',
    inheritAttrs: false,
    props: {
      asChild: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots }) {
      if (!props.asChild) return () => h(component, attrs, isSelfClosingTag(component) ? undefined : slots.default?.())
      return () => h(Dynamic, attrs, slots)
    },
  })
}

export function jsxFactory() {
  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      return withAsChild(element as ElementType)
    },
  }) as unknown as HTMLPolymorphicComponents
}

export const ark = jsxFactory()
