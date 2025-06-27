<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface ComboboxClearTriggerProps extends Assign<HTMLProps<'button'>, ComboboxClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'

  let { ref = $bindable(null), ...props }: ComboboxClearTriggerProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getClearTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
