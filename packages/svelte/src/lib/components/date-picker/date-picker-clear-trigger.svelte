<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerClearTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface DatePickerClearTriggerProps extends Assign<HTMLProps<'button'>, DatePickerClearTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  const props: DatePickerClearTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getClearTriggerProps(), props))
</script>

<Ark as="button" {...mergedProps} />
