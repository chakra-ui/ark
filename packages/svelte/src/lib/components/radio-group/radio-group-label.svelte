<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RadioGroupLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface RadioGroupLabelProps extends Assign<HTMLProps<'span'>, RadioGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useRadioGroupContext } from './use-radio-group-context.ts'

  let { ref = $bindable(null), ...props }: RadioGroupLabelProps = $props()
  const radioGroup = useRadioGroupContext()
  const mergedProps = $derived(mergeProps(radioGroup().getLabelProps(), props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
