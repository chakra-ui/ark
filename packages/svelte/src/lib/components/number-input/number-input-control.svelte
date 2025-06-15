<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface NumberInputControlBaseProps extends PolymorphicProps<'div'> {}
  export interface NumberInputControlProps extends Assign<HTMLProps<'div'>, NumberInputControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  const props: NumberInputControlProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getControlProps(), props))
</script>

<Ark as="div" {...mergedProps} />
