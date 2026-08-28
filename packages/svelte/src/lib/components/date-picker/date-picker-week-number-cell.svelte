<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { DateValue } from '@zag-js/date-picker'

  export interface DatePickerWeekNumberCellBaseProps extends PolymorphicProps<'td'>, RefAttribute {
    weekIndex: number
    week: DateValue[]
  }
  export interface DatePickerWeekNumberCellProps extends Assign<HTMLProps<'td'>, DatePickerWeekNumberCellBaseProps> {}
</script>

<script lang="ts">
  import type { WeekNumberCellProps } from '@zag-js/date-picker'
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(null), ...props }: DatePickerWeekNumberCellProps = $props()

  const [cellProps, localProps] = $derived(createSplitProps<WeekNumberCellProps>()(props, ['weekIndex', 'week']))

  const datePicker = useDatePickerContext()

  const mergedProps = $derived(mergeProps(datePicker().getWeekNumberCellProps(cellProps), localProps))
</script>

<Ark as="td" bind:ref {...mergedProps} />
