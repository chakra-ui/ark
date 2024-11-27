import type { SvelteHTMLElements } from 'svelte/elements'

export type Assign<T, U> = Omit<T, keyof U> & U
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type CollectionItem = string | object

export type HTMLProps<T extends keyof SvelteHTMLElements> = SvelteHTMLElements[T]
export type Accessor<T> = () => T
