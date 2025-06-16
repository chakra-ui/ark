<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface RadioGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface RadioGroupIndicatorProps extends Assign<HTMLProps<'div'>, RadioGroupIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'

  const props: RadioGroupIndicatorProps = $props()

  const radioGroup = useRadioGroupContext()
  const mergedProps = $derived(mergeProps(radioGroup().getIndicatorProps(), props))
</script>

<Ark as="div" {...mergedProps} />
