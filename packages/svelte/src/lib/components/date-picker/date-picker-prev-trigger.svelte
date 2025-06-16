<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types.js'

  export interface DatePickerPrevTriggerBaseProps extends PolymorphicProps<'button'> {}
  export interface DatePickerPrevTriggerProps extends Assign<HTMLProps<'button'>, DatePickerPrevTriggerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context.js'

  const props: DatePickerPrevTriggerProps = $props()

  const datePicker = useDatePickerContext()
  const viewProps = useDatePickerViewPropsContext()
  const mergedProps = $derived(mergeProps(datePicker().getPrevTriggerProps(viewProps()), props))
</script>

<Ark as="button" {...mergedProps} /> 
