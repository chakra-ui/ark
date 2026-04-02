<script module lang="ts">
  import type { SegmentProps } from '@zag-js/date-input'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface DateInputSegmentBaseProps
    extends PolymorphicProps<'span'>, RefAttribute, Pick<SegmentProps, 'segment'> {}
  export interface DateInputSegmentProps extends Assign<HTMLProps<'span'>, DateInputSegmentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { Ark } from '../factory/index.js'
  import { useDateInputContext } from './use-date-input-context.js'
  import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context.js'

  let { ref = $bindable(null), ...props }: DateInputSegmentProps = $props()

  const dateInput = useDateInputContext()
  const segmentGroupProps = useDateInputSegmentGroupPropsContext()
  const [segmentProps, localProps] = $derived(createSplitProps<Pick<SegmentProps, 'segment'>>()(props, ['segment']))
  const resolvedProps = $derived({ ...segmentProps, index: segmentGroupProps().index })
  const mergedProps = $derived(mergeProps(dateInput().getSegmentProps(resolvedProps), localProps))
</script>

<Ark as="span" bind:ref {...mergedProps}>{segmentProps.segment.text}</Ark>
