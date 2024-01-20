import { defineComponent, h, type Component, type IntrinsicElementAttributes } from 'vue'
import { Dynamic } from './dynamic'

type DOMElements = keyof IntrinsicElementAttributes

export interface PolimoprhicProps {
  /**
   * @default false
   */
  asChild?: boolean
}

const withAsChild = (component: Component) => {
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

export type HTMLPolymorphicComponents = {
  [E in DOMElements]: any // TODO: fix this
}

export function jsxFactory() {
  const cache = new Map()

  const factory = new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as unknown as Component
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as HTMLPolymorphicComponents

  return factory
}

export const ark = jsxFactory()
