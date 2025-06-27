<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/radio-group'

  export interface RadioGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'>, RefAttribute {}
  export interface RadioGroupItemProps extends Assign<HTMLProps<'label'>, RadioGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useRadioGroupContext } from './use-radio-group-context'
  import { RadioGroupItemProvider } from './use-radio-group-item-context'
  import { RadioGroupItemPropsProvider } from './use-radio-group-item-props-context'

  let { ref = $bindable(null), ...props }: RadioGroupItemProps = $props()
  const radioGroup = useRadioGroupContext()

  const itemState = $derived(radioGroup().getItemState(props))
  const mergedProps = $derived(mergeProps(radioGroup().getItemProps(props), props))

  RadioGroupItemProvider(() => itemState)
  RadioGroupItemPropsProvider(() => props)
</script>

<Ark as="label" bind:ref {...mergedProps} />
