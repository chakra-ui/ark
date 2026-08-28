<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface ComboboxTriggerProps extends Assign<HTMLProps<'button'>, ComboboxTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxTriggerProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
