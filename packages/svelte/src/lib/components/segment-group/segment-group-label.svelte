<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SegmentGroupLabelBaseProps extends PolymorphicProps<'label'>, RefAttribute {}
  export interface SegmentGroupLabelProps extends Assign<HTMLProps<'label'>, SegmentGroupLabelBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { useSegmentGroupContext } from './use-segment-group-context'

  let { ref = $bindable(null), ...props }: SegmentGroupLabelProps = $props()

  const segmentGroup = useSegmentGroupContext()
  const mergedProps = $derived(mergeProps(segmentGroup().getLabelProps(), parts.label.attrs, props))
</script>

<Ark as="label" bind:ref {...mergedProps} />
