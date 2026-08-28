<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerWeekNumberHeaderCellBaseProps extends PolymorphicProps<'th'>, RefAttribute {}
  export interface DatePickerWeekNumberHeaderCellProps extends Assign<
    HTMLProps<'th'>,
    DatePickerWeekNumberHeaderCellBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.js'

  let { ref = $bindable(null), ...props }: DatePickerWeekNumberHeaderCellProps = $props()

  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()

  const mergedProps = $derived(mergeProps(datePicker().getWeekNumberHeaderCellProps(tableProps()), props))
</script>

<Ark as="th" bind:ref {...mergedProps} />
