import type { Snippet } from 'svelte'
import type { HTMLAttributes, SvelteHTMLElements } from 'svelte/elements'

export type Assign<T, U> = Omit<T, keyof U> & U
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type Accessor<T> = () => T

export type HTMLTag = keyof SvelteHTMLElements
export type PropsFn<T extends HTMLTag> = (props?: HTMLProps<T>) => HTMLAttributes<HTMLElement>

export type HTMLProps<T extends HTMLTag> = SvelteHTMLElements[T]

export type EmptyState = Record<never, never>

export type PolymorphicProps<T extends HTMLTag, State = EmptyState> = {
  /**
   * The children snippet of the component.
   */
  children?: Snippet
  /**
   * Use the provided child element as the default rendered element, combining their props and behavior.
   *
   * @deprecated Use the `render` snippet instead. It also receives the part's state.
   * `asChild` will be removed in the next major.
   */
  asChild?: Snippet<[PropsFn<T>]>
  /**
   * Render the part as a custom element, combining their props and behavior.
   *
   * A template can't take an element as a prop value, so this is a snippet rather than react's
   * `render` prop. It receives the props to bind and the part's state.
   */
  render?: Snippet<[PropsFn<T>, State]>
}

export interface RefAttribute<T extends Element = Element> {
  ref?: T | null | undefined
}
