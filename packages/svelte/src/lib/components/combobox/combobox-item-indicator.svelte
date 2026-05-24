<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxItemIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxItemIndicatorProps extends Assign<HTMLProps<'div'>, ComboboxItemIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'
  import { useComboboxItemPropsContext } from './use-combobox-item-props-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxItemIndicatorProps = $props()

  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = $derived(mergeProps(combobox().getItemIndicatorProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
