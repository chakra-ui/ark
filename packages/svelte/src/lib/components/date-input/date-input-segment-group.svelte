<script module lang="ts">
  import type { SegmentGroupProps } from '@zag-js/date-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputSegmentGroupBaseProps extends PolymorphicProps<'div'>, RefAttribute, SegmentGroupProps {}
  export interface DateInputSegmentGroupProps extends Assign<HTMLProps<'div'>, DateInputSegmentGroupBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'

  let { ref = $bindable(null), ...props }: DateInputSegmentGroupProps = $props()
  const dateInput = useDateInputContext()
  const [segmentGroupProps, localProps] = $derived(createSplitProps<SegmentGroupProps>()(props, ['index']))
  const mergedProps = $derived(mergeProps(dateInput().getSegmentGroupProps(segmentGroupProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
