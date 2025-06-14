<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { CollectionItem } from '../collection'
  import type { UseSelectReturn } from './use-select.svelte'

  export interface SelectRootProviderBaseProps<T extends CollectionItem = CollectionItem>
    extends PolymorphicProps<'div'> {
    value: UseSelectReturn<T>
  }

  export interface SelectRootProviderProps<T extends CollectionItem = CollectionItem>
    extends Assign<HTMLProps<'div'>, SelectRootProviderBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { SelectProvider } from './use-select-context'

  const props: SelectRootProviderProps<T> = $props()

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), props))

  SelectProvider(() => props.value())
</script>

<Ark as="div" {...mergedProps} />
