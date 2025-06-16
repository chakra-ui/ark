<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps } from '$lib/types'
  import type { UseSegmentGroupReturn } from './use-segment-group.svelte'

  interface RootProviderProps {
    value: UseSegmentGroupReturn
  }

  export interface SegmentGroupRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
  export interface SegmentGroupRootProviderProps extends Assign<HTMLProps<'div'>, SegmentGroupRootProviderBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { parts } from './segment-group.anatomy'
  import { SegmentGroupProvider } from './use-segment-group-context'

  let { value, ...props }: SegmentGroupRootProviderProps = $props()

  const mergedProps = $derived(mergeProps(value().getRootProps(), parts.root.attrs, props))

  SegmentGroupProvider(value)
</script>

<Ark as="div" {...mergedProps} />
