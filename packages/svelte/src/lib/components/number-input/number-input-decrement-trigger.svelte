<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface NumberInputDecrementTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface NumberInputDecrementTriggerProps
    extends Assign<HTMLProps<'button'>, NumberInputDecrementTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  const props: NumberInputDecrementTriggerProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getDecrementTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
