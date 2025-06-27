<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ResizeTriggerProps } from '@zag-js/splitter'

  export interface SplitterResizeTriggerBaseProps extends ResizeTriggerProps, PolymorphicProps<'button'>, RefAttribute {}
  export interface SplitterResizeTriggerProps extends Assign<HTMLProps<'button'>, SplitterResizeTriggerBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSplitterContext } from './use-splitter-context'

  let { ref = $bindable(), ...props }: SplitterResizeTriggerProps = $props()

  const [triggerProps, localProps] = $derived(createSplitProps<ResizeTriggerProps>()(props, ['disabled', 'id']))

  const splitter = useSplitterContext()
  const mergedProps = $derived(mergeProps(splitter().getResizeTriggerProps(triggerProps), localProps))
</script>

<Ark as="button" bind:ref {...mergedProps} />
