/**
 * All html and svg elements for ark components.
 * This is mostly for `ark.<element>` syntax.
 */
import type { HTMLPolymorphicComponents, HTMLPolymorphicProps } from '@polymorphic-factory/react'
import { polymorphicFactory } from '@polymorphic-factory/react'
import type { ElementType } from 'react'

export type HTMLArkComponents = HTMLPolymorphicComponents

export type HTMLArkProps<T extends ElementType> = HTMLPolymorphicProps<T>

/**
 * The ark factory serves as an object of JSX elements to render React components which accept the `as` prop
 */
export const ark = polymorphicFactory()
