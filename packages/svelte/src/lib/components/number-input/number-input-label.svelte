<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface NumberInputLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface NumberInputLabelProps extends Assign<HTMLProps<'label'>, NumberInputLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useNumberInputContext } from './use-number-input-context'

  let { ref = $bindable(), ...props }: NumberInputLabelProps = $props()

  const numberInput = useNumberInputContext()
  const mergedProps = $derived(mergeProps(numberInput().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
