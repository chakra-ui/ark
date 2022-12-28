/**
 * All html and svg elements for ark components.
 * This is mostly for `ark.<element>` syntax.
 */
import {
  polymorphicFactory,
  type DOMElements,
  type HTMLPolymorphicComponents,
  type HTMLPolymorphicProps,
} from '@polymorphic-factory/vue'

export type HTMLArkComponents = HTMLPolymorphicComponents

export type HTMLArkProps<T extends DOMElements> = HTMLPolymorphicProps<T>

/**
 * The ark factory serves as an object of JSX elements to render React components which accept the `as` prop
 */
export const ark = polymorphicFactory()
