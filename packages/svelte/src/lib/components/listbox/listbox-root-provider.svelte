<script lang="ts" module>
  import type { Snippet } from 'svelte'

  interface RootProviderProps<T extends CollectionItem> {
    value: UseListboxReturn<T>
  }

  export interface ListboxRootProviderBaseProps<T extends CollectionItem>
    extends PolymorphicProps<'div'>, RootProviderProps<T> {}
  export interface ListboxRootProviderProps<T extends CollectionItem> extends Assign<
    HTMLProps<'div'>,
    ListboxRootProviderBaseProps<T>
  > {}

  export type ListboxRootProviderComponent<P = {}> = <T extends CollectionItem>(
    props: Assign<ListboxRootProviderProps<T>, P>,
  ) => Snippet
</script>

<script lang="ts" generics="T extends CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'
  import { Ark } from '../factory/index.js'
  import type { CollectionItem } from '../collection/index.js'
  import type { UseListboxReturn } from './use-listbox.svelte.js'
  import { ListboxProvider } from './use-listbox-context.js'

  let { value, ...props }: ListboxRootProviderProps<T> = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  ListboxProvider(value)
</script>

<Ark as="div" {...mergedProps} />
