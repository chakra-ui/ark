<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SegmentGroupIndicatorBaseProps extends PolymorphicProps<'div'> {}
  export interface SegmentGroupIndicatorProps extends Assign<HTMLProps<'div'>, SegmentGroupIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { useSegmentGroupContext } from './use-segment-group-context'

  const props: SegmentGroupIndicatorProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = $derived(mergeProps(segmentGroup().getIndicatorProps(), parts.indicator.attrs, props))
</script>

<Ark as="div" {...mergedProps} />
