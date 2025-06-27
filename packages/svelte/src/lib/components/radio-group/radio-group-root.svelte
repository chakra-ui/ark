<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ValueChangeDetails } from '@zag-js/radio-group'
  import type { UseRadioGroupProps } from './use-radio-group.svelte'

  export interface RadioGroupRootEmits {
    valueChange: ValueChangeDetails
  }

  export interface RadioGroupRootBaseProps extends UseRadioGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface RadioGroupRootProps extends Assign<HTMLProps<'div'>, RadioGroupRootBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { RadioGroupProvider } from './use-radio-group-context'
  import { useRadioGroup } from './use-radio-group.svelte'

  let { ref = $bindable(), value = $bindable(), ...props }: RadioGroupRootProps = $props()
  const providedId = $props.id()

  const [radioGroupProps, localProps] = $derived(
    createSplitProps<UseRadioGroupProps>()(props, [
      'defaultValue',
      'disabled',
      'form',
      'id',
      'ids',
      'name',
      'onValueChange',
      'orientation',
      'readOnly',
      'value',
    ]),
  )

  const resolvedProps = $derived<UseRadioGroupProps>({
    ...radioGroupProps,
    id: radioGroupProps.id ?? providedId,
    value,
    onValueChange(details) {
      radioGroupProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const radioGroup = useRadioGroup(() => resolvedProps)
  const mergedProps = $derived(mergeProps(radioGroup().getRootProps(), localProps))

  RadioGroupProvider(radioGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />
