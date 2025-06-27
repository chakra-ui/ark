<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RadioGroupLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface RadioGroupLabelProps extends Assign<HTMLProps<'label'>, RadioGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'

  let { ref = $bindable(), ...props }: RadioGroupLabelProps = $props()
  const radioGroup = useRadioGroupContext()
  const mergedProps = $derived(mergeProps(radioGroup().getLabelProps(), props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
