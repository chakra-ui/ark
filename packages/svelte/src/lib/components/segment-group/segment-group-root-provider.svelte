<script module lang="ts">
  import type { RootState } from '@zag-js/radio-group'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { UseSegmentGroupReturn } from './use-segment-group.svelte.ts'

  interface RootProviderProps {
    value: UseSegmentGroupReturn
  }

  export interface SegmentGroupRootProviderState extends RootState {}
  export interface SegmentGroupRootProviderBaseProps
    extends RootProviderProps, PolymorphicProps<'div', SegmentGroupRootProviderState>, RefAttribute {}
  export interface SegmentGroupRootProviderProps extends Assign<HTMLProps<'div'>, SegmentGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { SegmentGroupProvider } from './use-segment-group-context.ts'

  let { ref = $bindable(null), value, ...props }: SegmentGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), props))

  SegmentGroupProvider(() => value())
</script>

<Ark as="div" bind:ref {...mergedProps} state={value().getRootState()} />
