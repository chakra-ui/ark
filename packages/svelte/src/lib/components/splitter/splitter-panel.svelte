<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { PanelProps } from '@zag-js/splitter'

  export interface SplitterPanelBaseProps extends PanelProps, PolymorphicProps<'div'>, RefAttribute {}
  export interface SplitterPanelProps extends Assign<HTMLProps<'div'>, SplitterPanelBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSplitterContext } from './use-splitter-context'

  let { ref = $bindable(), ...props }: SplitterPanelProps = $props()

  const [splitterPanelProps, localProps] = $derived(createSplitProps<PanelProps>()(props, ['id']))

  const splitter = useSplitterContext()
  const mergedProps = $derived(mergeProps(splitter().getPanelProps(splitterPanelProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
