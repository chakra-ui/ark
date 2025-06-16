<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface DatePickerTableCellTriggerProps
    extends Assign<HTMLProps<'button'>, DatePickerTableCellTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  const props: DatePickerTableCellTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const cellProps = useDatePickerTableCellPropsContext()
  const viewProps = useDatePickerViewPropsContext()

  const triggerProps = $derived.by(() => {
    const viewMap = {
      day: datePicker().getDayTableCellTriggerProps,
      month: datePicker().getMonthTableCellTriggerProps,
      year: datePicker().getYearTableCellTriggerProps,
    }

    // @ts-expect-error fix later
    const viewFn = viewMap[viewProps().view]

    return viewFn(cellProps())
  })

  const mergedProps = $derived(mergeProps(triggerProps, props))
</script>

<Ark as="button" {...mergedProps} />
