<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface RadioGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'> {}
  export interface RadioGroupItemHiddenInputProps
    extends Assign<HTMLProps<'input'>, RadioGroupItemHiddenInputBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'
  import { useRadioGroupItemPropsContext } from './use-radio-group-item-props-context'

  const props: RadioGroupItemHiddenInputProps = $props()

  const radioGroup = useRadioGroupContext()
  const itemProps = useRadioGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(radioGroup().getItemHiddenInputProps(itemProps()), props))
</script>

<Ark as="input" {...mergedProps} />
