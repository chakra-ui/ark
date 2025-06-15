<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface NumberInputIncrementTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface NumberInputIncrementTriggerProps
    extends Assign<HTMLProps<'button'>, NumberInputIncrementTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  const props: NumberInputIncrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getIncrementTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
