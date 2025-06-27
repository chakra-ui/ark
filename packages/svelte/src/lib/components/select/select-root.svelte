<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { CollectionItem } from '../collection'
  import type { UseSelectProps } from './use-select.svelte'

  export interface SelectRootBaseProps<T extends CollectionItem = CollectionItem>
    extends UseSelectProps<T>,
      PolymorphicProps<'div'>,
      RefAttribute {}

  export interface SelectRootProps<T extends CollectionItem = CollectionItem>
    extends Assign<HTMLProps<'div'>, SelectRootBaseProps<T>> {}
</script>

<script lang="ts" generics="T extends CollectionItem = CollectionItem">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '$lib/components/factory'
  import { SelectProvider } from './use-select-context'
  import { useSelect } from './use-select.svelte'

  let { ref = $bindable(), value = $bindable<string[] | undefined>(), ...props }: SelectRootProps<T> = $props()

  const providedId = $props.id()
  const machineProps = $derived.by<UseSelectProps<T>>(() => ({
    ...props,
    id: props.id ?? providedId,
    value,
    onValueChange(details) {
      value = details.value
      props.onValueChange?.(details)
    },
  }))

  const select = useSelect(() => machineProps)
  const mergedProps = $derived(mergeProps(select().getRootProps(), props))

  SelectProvider(select)
</script>

<Ark as="div" bind:ref {...mergedProps} />
