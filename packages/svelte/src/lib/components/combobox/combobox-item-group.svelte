<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemGroupProps } from '@zag-js/combobox'

  export interface ComboboxItemGroupBaseProps extends Partial<ItemGroupProps>, PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxItemGroupProps extends Assign<HTMLProps<'div'>, ComboboxItemGroupBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'
  import { ComboboxItemGroupPropsProvider } from './use-combobox-item-group-props-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxItemGroupProps = $props()
  const providedId = $props.id()

  const [itemGroupProps, localProps] = $derived(createSplitProps<Partial<ItemGroupProps>>()(props, ['id']))

  const groupProps = $derived({ ...itemGroupProps, id: itemGroupProps.id ?? providedId })

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getItemGroupProps(groupProps), localProps))

  ComboboxItemGroupPropsProvider(() => groupProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
