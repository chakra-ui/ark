<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SegmentGroupLabelBaseProps extends PolymorphicProps<'span'>, RefAttribute {}
  export interface SegmentGroupLabelProps extends Assign<HTMLProps<'span'>, SegmentGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { parts } from './segment-group.anatomy.ts'
  import { useSegmentGroupContext } from './use-segment-group-context.ts'

  let { ref = $bindable(null), ...props }: SegmentGroupLabelProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = $derived(mergeProps(segmentGroup().getLabelProps(), parts.label.attrs, props))
</script>

<Ark as="span" bind:ref {...mergedProps} />
