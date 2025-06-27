<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface ComboboxPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface ComboboxPositionerProps extends Assign<HTMLProps<'div'>, ComboboxPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useComboboxContext } from './use-combobox-context'

  let { ref = $bindable(null), ...props }: ComboboxPositionerProps = $props()

  const combobox = useComboboxContext()
  const mergedProps = $derived(mergeProps(combobox().getPositionerProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
