/**
 * All html and svg elements for ark components.
 * This is mostly for `ark.<element>` syntax.
 */

import {
  cloneVNode,
  defineComponent,
  h,
  type AllowedComponentProps,
  type ComponentCustomProps,
  type DefineComponent,
  type ExtractPropTypes,
  type PropType,
  type VNodeProps,
} from 'vue'
import type { IntrinsicElementAttributes } from './dom.types'
import { isValidVNodeElement, mergeProps, renderSlotFragments } from './utils'

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
  const component = defineComponent<AsChildProps>(({ asChild }, { attrs, slots }) => {
    if (!asChild) return () => <__component {...attrs}>{slots.default?.()}</__component>
    else {
      return () => {
        let children = slots.default?.()
        children = renderSlotFragments(children || [])

        if (Object.keys(attrs).length > 0) {
          const [firstChild, ...otherChildren] = children
          if (!isValidVNodeElement(firstChild) || otherChildren.length > 0)
            // TODO Improve error message
            throw new Error('Only one child is allowed')

          const mergedProps = mergeProps(firstChild.props ?? {}, attrs)
          let cloned = cloneVNode(firstChild, mergedProps)
          // Explicitly override props starting with `on`.
          // It seems cloneVNode from Vue doesn't like overriding `onXXX` props. So
          // we have to do it manually.
          for (let prop in mergedProps) {
            if (prop.startsWith('on')) {
              cloned.props ||= {}
              cloned.props[prop] = mergedProps[prop]
            }
          }
          return cloned
        }

        if (Array.isArray(children) && children.length === 1) {
          return children[0]
        }

        return children
      }
    }
  })

  component.props = {
    asChild: Boolean as PropType<boolean>,
  }
  component.inheritAttrs = false
  return component
}

export function jsxFactory<
  Component extends ElementType,
  Props extends Record<string, unknown>,
  Options = never,
>() {
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
