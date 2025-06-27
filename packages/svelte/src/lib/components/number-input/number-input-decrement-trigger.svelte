<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface NumberInputDecrementTriggerProps
    extends Assign<HTMLProps<'button'>, NumberInputDecrementTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  let { ref = $bindable(), ...props }: NumberInputDecrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getDecrementTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
