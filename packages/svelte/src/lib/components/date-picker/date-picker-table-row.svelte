<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerTableRowBaseProps extends PolymorphicProps<'tr'> {}
  export interface DatePickerTableRowProps extends Assign<HTMLProps<'tr'>, DatePickerTableRowBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.js'

  const props: DatePickerTableRowProps = $props()

  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()

  const mergedProps = $derived(mergeProps(datePicker().getTableRowProps(tableProps()), props))
</script>

<Ark as="tr" {...mergedProps} />
