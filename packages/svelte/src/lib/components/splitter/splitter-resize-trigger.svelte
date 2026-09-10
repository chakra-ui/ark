<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'
  import type { ResizeTriggerProps, ResizeTriggerState } from '@zag-js/splitter'

  export interface SplitterResizeTriggerState extends ResizeTriggerState {}
  export interface SplitterResizeTriggerBaseProps
    extends ResizeTriggerProps, PolymorphicProps<'button', SplitterResizeTriggerState>, RefAttribute {}
  export interface SplitterResizeTriggerProps extends Assign<HTMLProps<'button'>, SplitterResizeTriggerBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.ts'
  import { useSplitterContext } from './use-splitter-context.ts'
  import { SplitterResizeTriggerPropsProvider } from './use-splitter-resize-trigger-props-context.ts'

  let { ref = $bindable(null), ...props }: SplitterResizeTriggerProps = $props()

  const [triggerProps, localProps] = $derived(createSplitProps<ResizeTriggerProps>()(props, ['disabled', 'id']))

  const splitter = useSplitterContext()
  const mergedProps = $derived(mergeProps(splitter().getResizeTriggerProps(triggerProps), localProps))

  SplitterResizeTriggerPropsProvider(() => triggerProps)
</script>

<Ark as="button" bind:ref {...mergedProps} state={splitter().getResizeTriggerState(triggerProps)} />
