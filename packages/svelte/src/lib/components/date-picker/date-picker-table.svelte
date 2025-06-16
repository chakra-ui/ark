<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerTableBaseProps extends PolymorphicProps<'table'> {
    columns?: number
  }
  export interface DatePickerTableProps extends Assign<HTMLProps<'table'>, DatePickerTableBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { DatePickerTablePropsProvider } from './use-date-picker-table-props-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  const { columns, ...localProps }: DatePickerTableProps = $props()
  const providedId = $props.id()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()

  const tableProps = $derived({ id: providedId, columns, ...viewProps() })
  const mergedProps = $derived(mergeProps(datePicker().getTableProps(tableProps), localProps))

  DatePickerTablePropsProvider(() => tableProps)
</script>

<Ark as="table" {...mergedProps} />
