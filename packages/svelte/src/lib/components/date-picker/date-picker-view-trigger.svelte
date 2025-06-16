<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerViewTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface DatePickerViewTriggerProps extends Assign<HTMLProps<'button'>, DatePickerViewTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  const props: DatePickerViewTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = $derived(mergeProps(datePicker().getViewTriggerProps(viewProps()), props))
</script>

<Ark as="button" {...mergedProps} />
