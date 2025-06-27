<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ValueChangeDetails } from '@zag-js/radio-group'
  import type { UseSegmentGroupProps } from './use-segment-group.svelte'

  export interface SegmentGroupRootEmits {
    valueChange: ValueChangeDetails
  }

  export interface SegmentGroupRootBaseProps extends UseSegmentGroupProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SegmentGroupRootProps extends Assign<HTMLProps<'div'>, SegmentGroupRootBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { splitSegmentGroupProps } from './split-segment-group-props.svelte'
  import { useSegmentGroup } from './use-segment-group.svelte'
  import { SegmentGroupProvider } from './use-segment-group-context'

  let { ref = $bindable(null), value = $bindable(), ...props }: SegmentGroupRootProps = $props()
  const providedId = $props.id()

  const [segmentGroupProps, localProps] = $derived(splitSegmentGroupProps(props))

  const resolvedProps = $derived<UseSegmentGroupProps>({
    ...segmentGroupProps,
    id: segmentGroupProps.id ?? providedId,
    value,
    onValueChange(details) {
      segmentGroupProps.onValueChange?.(details)
      if (value !== undefined) value = details.value
    },
  })

  const segmentGroup = useSegmentGroup(() => resolvedProps)
  const mergedProps = $derived(mergeProps(segmentGroup().getRootProps(), parts.root.attrs, localProps))

  SegmentGroupProvider(segmentGroup)
</script>

<Ark as="div" bind:ref {...mergedProps} />
