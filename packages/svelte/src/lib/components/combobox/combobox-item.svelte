<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxItemBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    item: unknown
    persistFocus?: boolean
  }
  export interface ComboboxItemProps extends Assign<HTMLProps<'div'>, ComboboxItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { Ark } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'
  import { ComboboxItemProvider } from './use-combobox-item-context.ts'
  import { ComboboxItemPropsProvider } from './use-combobox-item-props-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxItemProps = $props()

  const [itemProps, localProps] = $derived(
    createSplitProps<{ item: any; persistFocus?: boolean }>()(props, ['item', 'persistFocus']),
  )

  const combobox = useComboboxContext()
  const itemState = $derived(combobox().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(combobox().getItemProps(itemProps), localProps))

  ComboboxItemProvider(() => itemState)
  ComboboxItemPropsProvider(() => itemProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
