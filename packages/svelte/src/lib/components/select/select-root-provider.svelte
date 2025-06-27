<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { CollectionItem } from '../collection'
  import type { UseSelectReturn } from './use-select.svelte'

  export interface SelectRootProviderBaseProps<T extends CollectionItem = CollectionItem>
    extends PolymorphicProps<'div'>,
      UsePresenceProps,
      RefAttribute {
    value: UseSelectReturn<T>
  }

  export interface SelectRootProviderProps<T extends CollectionItem = CollectionItem>
    extends Assign<HTMLProps<'div'>, SelectRootProviderBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { SelectProvider } from './use-select-context'
  import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'

  let { ref = $bindable(null), ...props }: SelectRootProviderProps<T> = $props()

  const [presenceProps, localProps] = $derived(splitPresenceProps(props))

  const presence = usePresence(() => ({ present: props.value().open, ...presenceProps }))

  const mergedProps = $derived(mergeProps(props.value().getRootProps(), localProps))

  SelectProvider(() => props.value())
  PresenceProvider(presence)
</script>

<Ark as="div" bind:ref {...mergedProps} />
