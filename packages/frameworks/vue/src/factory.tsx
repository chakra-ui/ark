/**
 * All html and svg elements for ark components.
 * This is mostly for `ark.<element>` syntax.
 */

import { mergeProps } from '@zag-js/vue'
import {
  cloneVNode,
  defineComponent,
  getCurrentInstance,
  h,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type DefineComponent,
  type ExtractPropTypes,
  type IntrinsicElementAttributes,
  type PropType,
  type VNodeProps,
} from 'vue'
import { isValidVNodeElement, renderSlotFragments } from './utils'
export type AsChildProps = {
  asChild?: boolean
}

export type DOMElements = keyof IntrinsicElementAttributes

export type ElementType = DOMElements | DefineComponent

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
      P & {
        asChild?: boolean
      }
  }
}

export type HTMLPolymorphicComponents = {
  [Tag in DOMElements]: AsChildComponent<Tag>
}

export type HTMLPolymorphicProps<T extends ElementType> = Omit<ExtractPropTypes<T>, 'ref'> & {
  asChild?: boolean
}

export type HTMLArkProps<T extends DOMElements> = HTMLPolymorphicProps<T>

type RenderFunctionArgs = Parameters<typeof h>[0]

export function withAsChild(__component: RenderFunctionArgs) {
  const component = defineComponent({
    name: 'ComponentWithAsChild',
    inheritAttrs: false,
    props: {
      asChild: Boolean as PropType<boolean>,
    },
    setup(props, { attrs, slots }) {
      const instance = getCurrentInstance()
      if (!props.asChild) return () => h(__component, { ...attrs }, slots.default?.())
      else {
        return () => {
          let children = slots.default?.()
          children = renderSlotFragments(children || [])

          if (Object.keys(attrs).length > 0) {
            const [firstChild, ...otherChildren] = children
            if (!isValidVNodeElement(firstChild) || otherChildren.length > 0) {
              const componentName = instance?.parent?.type.name
                ? `<${instance.parent.type.name} />`
                : 'component'
              throw new Error(
                [
                  `Detected an invalid children for \`${componentName}\` with \`asChild\` prop.`,
                  '',
                  `Note: All components accepting \`asChild\` expect only one direct child of valid VNode type.`,
                  'You can apply a few solutions:',
                  [
                    'Provide a single child element so that we can forward the props onto that element.',
                    'Ensure the first child is an actual element instead of a raw text node or comment node.',
                  ]
                    .map((line) => `  - ${line}`)
                    .join('\n'),
                ].join('\n'),
              )
            }

            const mergedProps = mergeProps(firstChild.props ?? {}, attrs)
            const cloned = cloneVNode(firstChild, mergedProps)
            // Explicitly override props starting with `on`.
            // It seems cloneVNode from Vue doesn't like overriding `onXXX` props. So
            // we have to do it manually.
            for (const prop in mergedProps) {
              if (prop.startsWith('on')) {
                cloned.props ||= {}
                cloned.props[prop] = mergedProps[prop]
              }
            }
            return cloned
          } else if (Array.isArray(children) && children.length === 1) {
            // No props to inherit
            return children[0]
          } else {
            // No children.
            return null
          }
        }
      }
    },
  })

  return component
}

export function jsxFactory() {
  const cache = new Map()

  const factory = new Proxy(withAsChild, {
    apply(target, thisArg, argArray) {
      return withAsChild(argArray[0])
    },
    get(_, element) {
      const asElement = element as unknown as RenderFunctionArgs
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement))
      }
      return cache.get(asElement)
    },
  }) as unknown as HTMLPolymorphicComponents

  return factory
}

export const ark = jsxFactory()
