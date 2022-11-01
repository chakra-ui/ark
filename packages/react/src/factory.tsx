/**
 * All html and svg elements for atlas components.
 * This is mostly for `atlas.<element>` syntax.
 */
import type { HTMLPolymorphicComponents, HTMLPolymorphicProps } from '@polymorphic-factory/react'
import { polymorphicFactory } from '@polymorphic-factory/react'
import type { ElementType } from 'react'

export type HTMLAtlasComponents = HTMLPolymorphicComponents

export type HTMLAtlasProps<T extends ElementType> = HTMLPolymorphicProps<T>

/**
 * The atlas factory serves as an object of JSX elements to render React components which accept the `as` prop
 */
export const atlas = polymorphicFactory()
