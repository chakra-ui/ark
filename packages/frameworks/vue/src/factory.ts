import {
  defineComponent,
  h,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type ExtractPropTypes,
  type IntrinsicElementAttributes,
  type VNodeProps,
} from 'vue'
import { Dynamic } from './dynamic'

type DOMElements = keyof IntrinsicElementAttributes
type ElementType = Parameters<typeof h>[0]

export interface PolimoprhicProps {
  /**
   * @default false
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
      PolimoprhicProps
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

const withAsChild = (component: ElementType) => {
  const Polimoprhic = defineComponent({
    name: 'Polimoprhic',
    inheritAttrs: false,
    props: {
      asChild: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots }) {
      if (!props.asChild) return () => h(component, { ...attrs }, slots.default?.())
      return () => h(Dynamic, attrs, { default: slots.default })
    },
  })
  return Polimoprhic
}

export function jsxFactory() {
  const cache = new Map()

  const factory = new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as unknown as ElementType
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as HTMLPolymorphicComponents

  return factory
}

export const ark = jsxFactory()
