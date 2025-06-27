<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxListBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxListProps extends Assign<HTMLProps<'div'>, ComboboxListBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'

  let { ref = $bindable(), ...props }: ComboboxListProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getListProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
