/**
 * All html and svg elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
import type { ElementType } from 'react'
import { ComponentWithAs, forwardRef, PropsOf } from './forwardRef'

export type DOMElements = keyof JSX.IntrinsicElements

export type HTMLAtlasComponents = {
  [Tag in DOMElements]: ComponentWithAs<Tag>
}

export type HTMLAtlasProps<T extends ElementType> = Omit<PropsOf<T>, 'ref'> & { as?: ElementType }

type AtlasFactory = {
  <T extends ElementType, P extends Record<string, unknown> = Record<string, unknown>>(
    component: T,
  ): ComponentWithAs<T, P>
}

function factory() {
  const cache = new Map<DOMElements, ComponentWithAs<DOMElements>>()
  const styled = (originalComponent: DOMElements) =>
    forwardRef((props, ref) => {
      const { as, ...restProps } = props
      const Component = as || originalComponent
      return <Component {...restProps} ref={ref} />
    })
  return new Proxy(styled, {
    /**
     * @example
     * <atlas.div />
     */
    get(_, element: DOMElements) {
      if (!cache.has(element)) {
        cache.set(element, styled(element))
      }
      return cache.get(element)
    },
  }) as AtlasFactory & HTMLAtlasComponents
}

/**
 * The Atlas factory serves as an object of JSX elements to render React Components which accept the `as` prop
 */
export const atlas = factory()
