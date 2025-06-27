<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface RadioGroupItemHiddenInputProps
    extends Assign<HTMLProps<'input'>, RadioGroupItemHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'
  import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

  let { ref = $bindable(), ...props }: RadioGroupItemHiddenInputProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemHiddenInputProps(itemProps()), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
