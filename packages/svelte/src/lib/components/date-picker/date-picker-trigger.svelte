<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DatePickerTriggerProps extends Assign<HTMLProps<'button'>, DatePickerTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(), ...props }: DatePickerTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getTriggerProps(), props))
</script>

<Ark as="button" bind:ref {...mergedProps} />
