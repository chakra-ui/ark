<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerClearTriggerBaseProps extends PolymorphicProps<'button'>, RefAttribute {}
  export interface DatePickerClearTriggerProps extends Assign<HTMLProps<'button'>, DatePickerClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(), ...props }: DatePickerClearTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getClearTriggerProps(), props))
</script>

<Ark bind:ref as="button" {...mergedProps} />
