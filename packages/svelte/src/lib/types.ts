import type { Snippet } from 'svelte'
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements'

export type Assign<T, U> = Omit<T, keyof U> & U
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CollectionItem = string | object

export type Accessor<T> = () => T

export type HTMLTag = keyof SvelteHTMLElements
export type PropsFn<T extends HTMLTag> = (props?: HTMLProps<T>) => HTMLAttributes<HTMLElement>

export type HTMLProps<T extends HTMLTag> = SvelteHTMLElements[T]
export type PolymorphicProps<T extends HTMLTag> = {
  asChild?: boolean
  children?: Snippet
  render?: Snippet<[PropsFn<T>]>
}
