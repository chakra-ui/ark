<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerTableHeadBaseProps extends PolymorphicProps<'thead'> {}
  export interface DatePickerTableHeadProps extends Assign<HTMLProps<'thead'>, DatePickerTableHeadBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.js'

  const props: DatePickerTableHeadProps = $props()

  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()

  const mergedProps = $derived(mergeProps(datePicker().getTableHeadProps(tableProps()), props))
</script>

<Ark as="thead" {...mergedProps} />
