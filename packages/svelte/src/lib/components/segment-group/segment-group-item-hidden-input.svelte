<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SegmentGroupItemHiddenInputBaseProps extends PolymorphicProps<'input'>, RefAttribute {}
  export interface SegmentGroupItemHiddenInputProps extends Assign<
    HTMLProps<'input'>,
    SegmentGroupItemHiddenInputBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useSegmentGroupContext } from './use-segment-group-context.ts'
  import { useSegmentGroupItemPropsContext } from './use-segment-group-item-props-context.ts'

  let { ref = $bindable(null), ...props }: SegmentGroupItemHiddenInputProps = $props()
  const segmentGroup = useSegmentGroupContext()
  const itemProps = useSegmentGroupItemPropsContext()

  const mergedProps = $derived(mergeProps(segmentGroup().getItemHiddenInputProps(itemProps()), props))
</script>

<Ark as="input" bind:ref {...mergedProps} />
