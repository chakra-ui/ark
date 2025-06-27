<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { UseDatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context.js'

  export interface DatePickerTableCellBaseProps
    extends ReturnType<UseDatePickerTableCellPropsContext>,
      PolymorphicProps<'td'>,
      RefAttribute {}
  export interface DatePickerTableCellProps extends Assign<HTMLProps<'td'>, DatePickerTableCellBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { DatePickerTableCellPropsProvider } from './use-date-picker-table-cell-props-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  let { ref = $bindable(), ...props }: DatePickerTableCellProps = $props()

  const [cellProps, localProps] = $derived(
    createSplitProps<ReturnType<UseDatePickerTableCellPropsContext>>()(props, [
      'disabled',
      'value',
      'visibleRange',
      'columns',
    ]),
  )

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()

  const tableCellProps = $derived(() => {
    const viewMap = {
      day: datePicker().getDayTableCellProps,
      month: datePicker().getMonthTableCellProps,
      year: datePicker().getYearTableCellProps,
    }

    // @ts-expect-error value is number filter
    return viewMap[viewProps().view](cellProps)
  })

  const mergedProps = $derived(mergeProps(tableCellProps, localProps))

  DatePickerTableCellPropsProvider(() => cellProps)
</script>

<Ark as="td" bind:ref {...mergedProps} />
