<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerRangeTextBaseProps extends PolymorphicProps<'div'> {}
  export interface DatePickerRangeTextProps extends Assign<HTMLProps<'div'>, DatePickerRangeTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  const props: DatePickerRangeTextProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getRangeTextProps(), props))
</script>

<Ark as="div" {...mergedProps}>
  {datePicker().visibleRangeText.start}
</Ark>
