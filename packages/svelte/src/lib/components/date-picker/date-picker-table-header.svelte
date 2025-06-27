<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerTableHeaderBaseProps extends PolymorphicProps<'th'>, RefAttribute {}
  export interface DatePickerTableHeaderProps extends Assign<HTMLProps<'th'>, DatePickerTableHeaderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context.js'

  let { ref = $bindable(), ...props }: DatePickerTableHeaderProps = $props()

  const datePicker = useDatePickerContext()
  const tableProps = useDatePickerTablePropsContext()

  const mergedProps = $derived(mergeProps(datePicker().getTableHeaderProps(tableProps()), props))
</script>

<Ark as="th" bind:ref {...mergedProps} />
