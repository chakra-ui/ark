import { mergeProps } from '@zag-js/vue'
import {
  Fragment,
  cloneVNode,
  defineComponent,
  h,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type ExtractPropTypes,
  type IntrinsicElementAttributes,
  type VNode,
  type VNodeProps,
} from 'vue'

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

const withAsChild = (component: ElementType) => {
  const AsChildComponent = defineComponent({
    name: 'AsChildComponent',
    inheritAttrs: false,
    props: {
      asChild: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots }) {
      if (!slots.default) return null
      if (!props.asChild) return () => h(component, { ...attrs }, slots.default?.())
      const childrens = renderSlotFragments(slots.default())
      const [firstChildren, ...otherChildren] = childrens

      if (Object.keys(attrs).length > 0) {
        delete firstChildren.props?.ref
        const mergedProps = mergeProps(attrs, firstChildren.props ?? {})
        const cloned = cloneVNode(firstChildren, mergedProps)
        for (const prop in mergedProps) {
          if (prop.startsWith('on')) {
            cloned.props ||= {}
            cloned.props[prop] = mergedProps[prop]
          }
        }
        return childrens.length === 1 ? cloned : [cloned, ...otherChildren]
      }
      return childrens
    },
  })
  return AsChildComponent
}

function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return []
  return children.flatMap((child) => {
    if (child.type === Fragment) return renderSlotFragments(child.children as VNode[])

    return [child]
  })
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
