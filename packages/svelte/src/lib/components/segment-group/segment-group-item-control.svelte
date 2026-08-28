<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SegmentGroupItemControlBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SegmentGroupItemControlProps extends Assign<HTMLProps<'div'>, SegmentGroupItemControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './segment-group.anatomy.ts'
  import { useSegmentGroupContext } from './use-segment-group-context.ts'
  import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

  let { ref = $bindable(null), ...props }: SegmentGroupItemControlProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(
    mergeProps(segmentGroup().getItemControlProps(itemProps()), parts.itemControl.attrs, props),
  )
</script>

<Ark as="div" bind:ref {...mergedProps} />
