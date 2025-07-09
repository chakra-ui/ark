<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface ComboboxLabelProps extends Assign<HTMLProps<'label'>, ComboboxLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'

  let { ref = $bindable(null), ...props }: ComboboxLabelProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
