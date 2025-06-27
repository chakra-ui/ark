<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RadioGroupItemControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupItemControlProps extends Assign<HTMLProps<'div'>, RadioGroupItemControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'
  import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

  let { ref = $bindable(null), ...props }: RadioGroupItemControlProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemControlProps(itemProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
