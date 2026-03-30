<script module lang="ts">
  import type * as dateInput from '@zag-js/date-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputSegmentBaseProps extends PolymorphicProps<'span'>, RefAttribute {
    segment: dateInput.DateSegment
    index?: number
  }
  export interface DateInputSegmentProps extends Assign<HTMLProps<'span'>, DateInputSegmentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), segment, index, ...props }: DateInputSegmentProps = $props()

  const dateInput = useDateInputContext()
  const mergedProps = $derived(mergeProps(dateInput().getSegmentProps({ segment, index }), props))
</script>

<Ark as="span" bind:ref {...mergedProps}>{segment.text}</Ark>
