<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface ComboboxItemGroupLabelBaseProps extends PolymorphicProps<'div'> {}
  export interface ComboboxItemGroupLabelProps extends Assign<HTMLProps<'div'>, ComboboxItemGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'
  import { useComboboxItemGroupPropsContext } from './use-combobox-item-group-props-context'

  const props: ComboboxItemGroupLabelProps = $props()

  const combobox = useComboboxContext()
  const groupProps = useComboboxItemGroupPropsContext()

  const mergedProps = $derived(mergeProps(combobox().getItemGroupLabelProps({ htmlFor: groupProps().id }), props))
</script>

<Ark as="div" {...mergedProps} />
