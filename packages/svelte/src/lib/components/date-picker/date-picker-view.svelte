<script module lang="ts">
  import type { ViewProps } from '@zag-js/date-picker'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerViewBaseProps extends ViewProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerViewProps extends Assign<HTMLProps<'div'>, DatePickerViewBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '../../utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'
  import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context.js'

  let { ref = $bindable(), ...props }: DatePickerViewProps = $props()

  const [viewProps, localProps] = $derived(createSplitProps<ViewProps>()(props, ['view']))
  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getViewProps(viewProps), localProps))

  DatePickerViewPropsProvider(() => viewProps)
</script>

<Ark as="div" bind:ref {...mergedProps} />
