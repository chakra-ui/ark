<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ItemProps } from '@zag-js/radio-group'

  export interface SegmentGroupItemBaseProps extends ItemProps, PolymorphicProps<'label'>, RefAttribute {}
  export interface SegmentGroupItemProps extends Assign<HTMLProps<'label'>, SegmentGroupItemBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { useSegmentGroupContext } from './use-segment-group-context'
  import { SegmentGroupItemProvider } from './use-segment-group-item-context'
  import { SegmentGroupItemPropsProvider } from './use-segment-group-item-props-context'
  import { createSplitProps } from '$lib/utils/create-split-props'

  let { ref = $bindable(null), ...props }: SegmentGroupItemProps = $props()

  const [itemProps, localProps] = $derived(createSplitProps<ItemProps>()(props, ['value', 'disabled', 'invalid']))

  const segmentGroup = useSegmentGroupContext()

  const itemState = $derived(segmentGroup().getItemState(itemProps))
  const mergedProps = $derived(mergeProps(segmentGroup().getItemProps(itemProps), parts.item.attrs, localProps))

  SegmentGroupItemProvider(() => itemState)
  SegmentGroupItemPropsProvider(() => itemProps)
</script>

<Ark as="label" bind:ref {...mergedProps} />
