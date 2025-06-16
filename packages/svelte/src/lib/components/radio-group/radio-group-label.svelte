<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface RadioGroupLabelBaseProps extends PolymorphicProps<'label'> {}
  export interface RadioGroupLabelProps extends Assign<HTMLProps<'label'>, RadioGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'

  const props: RadioGroupLabelProps = $props()
  const radioGroup = useRadioGroupContext()
  const mergedProps = $derived(mergeProps(radioGroup().getLabelProps(), props))
</script>

<Ark as="label" {...mergedProps} />
