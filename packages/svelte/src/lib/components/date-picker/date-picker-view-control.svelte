<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerViewControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerViewControlProps extends Assign<HTMLProps<'div'>, DatePickerViewControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  let { ref = $bindable(null), ...props }: DatePickerViewControlProps = $props()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = $derived(mergeProps(datePicker().getViewControlProps(viewProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
