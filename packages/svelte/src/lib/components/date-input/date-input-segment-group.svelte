<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputSegmentGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute {
    index?: number
  }
  export interface DateInputSegmentGroupProps extends Assign<HTMLProps<'div'>, DateInputSegmentGroupBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), index, ...props }: DateInputSegmentGroupProps = $props()

  const dateInput = useDateInputContext()
  const mergedProps = $derived(mergeProps(dateInput().getSegmentGroupProps({ index }), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
