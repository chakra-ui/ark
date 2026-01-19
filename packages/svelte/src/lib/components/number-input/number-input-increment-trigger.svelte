<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface NumberInputIncrementTriggerProps extends Assign<
    HTMLProps<'button'>,
    NumberInputIncrementTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  let { ref = $bindable(null), ...props }: NumberInputIncrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getIncrementTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
