<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SegmentGroupItemControlBaseProps extends PolymorphicProps<'div'> {}
  export interface SegmentGroupItemControlProps extends Assign<HTMLProps<'div'>, SegmentGroupItemControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { useSegmentGroupContext } from './use-segment-group-context'
  import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

  const props: SegmentGroupItemControlProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(
    mergeProps(segmentGroup().getItemControlProps(itemProps()), parts.itemControl.attrs, props),
  )
</script>

<Ark as="div" {...mergedProps} />
