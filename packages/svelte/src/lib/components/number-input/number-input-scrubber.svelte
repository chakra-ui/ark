<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface NumberInputScrubberBaseProps extends PolymorphicProps<'span'> {}
  export interface NumberInputScrubberProps extends Assign<HTMLProps<'span'>, NumberInputScrubberBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  const props: NumberInputScrubberProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getScrubberProps(), props))
</script>

<Ark as="span" {...mergedProps} />
