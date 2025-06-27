<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DatePickerRangeTextBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface DatePickerRangeTextProps extends Assign<HTMLProps<'div'>, DatePickerRangeTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { uniq } from '@zag-js/utils'
  import { Ark } from '../factory/index.js'
  import { useDatePickerContext } from './use-date-picker-context.js'

  let { ref = $bindable(), ...props }: DatePickerRangeTextProps = $props()

  const datePicker = useDatePickerContext()
  const mergedProps = $derived(mergeProps(datePicker().getRangeTextProps(), props))

  const visibleRangeText = $derived.by(() => {
    const { start, end } = datePicker().visibleRangeText
    return uniq([start, end]).filter(Boolean).join(' - ')
  })
</script>

<Ark as="div" bind:ref {...mergedProps}>
  {visibleRangeText}
</Ark>
