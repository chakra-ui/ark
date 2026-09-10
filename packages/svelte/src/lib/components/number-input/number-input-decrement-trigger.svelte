<script module lang="ts">
  import type { DecrementTriggerState } from '@zag-js/number-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputDecrementTriggerState extends DecrementTriggerState {}
  export interface NumberInputDecrementTriggerBaseProps
    extends PolymorphicProps<'button', NumberInputDecrementTriggerState>, RefAttribute {}
  export interface NumberInputDecrementTriggerProps extends Assign<
    HTMLProps<'button'>,
    NumberInputDecrementTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useNumberInputContext } from './use-number-input-context.ts'

  let { ref = $bindable(null), ...props }: NumberInputDecrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getDecrementTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} state={numberInput().getDecrementTriggerState()} />
