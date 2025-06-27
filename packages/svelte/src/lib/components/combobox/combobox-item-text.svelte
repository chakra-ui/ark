<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxItemTextBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface ComboboxItemTextProps extends Assign<HTMLProps<'span'>, ComboboxItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'
  import { useComboboxItemPropsContext } from './use-combobox-item-props-context'

  let { ref = $bindable(null), ...props }: ComboboxItemTextProps = $props()

  const combobox = useComboboxContext()
  const itemProps = useComboboxItemPropsContext()
  const mergedProps = $derived(mergeProps(combobox().getItemTextProps(itemProps()), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
