<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerNextTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DatePickerNextTriggerProps extends Assign<HTMLProps<'button'>, DatePickerNextTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  let { ref = $bindable(), ...props }: DatePickerNextTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = $derived(mergeProps(datePicker().getNextTriggerProps(viewProps()), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
