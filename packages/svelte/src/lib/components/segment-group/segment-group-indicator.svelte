<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SegmentGroupIndicatorProps extends Assign<HTMLProps<'div'>, SegmentGroupIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { useSegmentGroupContext } from './use-segment-group-context'

  let { ref = $bindable(null), ...props }: SegmentGroupIndicatorProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = $derived(mergeProps(segmentGroup().getIndicatorProps(), parts.indicator.attrs, props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
