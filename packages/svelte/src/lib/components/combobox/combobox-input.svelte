<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface ComboboxInputProps extends Assign<HTMLProps<'input'>, ComboboxInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useComboboxContext } from './use-combobox-context.ts'

  let { ref = $bindable(null), ...props }: ComboboxInputProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getInputProps(), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
