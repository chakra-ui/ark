<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'

  export interface SegmentGroupItemTextBaseProps extends PolymorphicProps<'span'> {}
  export interface SegmentGroupItemTextProps extends Assign<HTMLProps<'span'>, SegmentGroupItemTextBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { useSegmentGroupContext } from './use-segment-group-context'
  import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context'

  const props: SegmentGroupItemTextProps = $props()
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(segmentGroup().getItemTextProps(itemProps()), parts.itemText.attrs, props))
</script>

<Ark as="span" {...mergedProps} />
