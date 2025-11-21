<script module lang="ts">
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types'

  export interface SplitterResizeTriggerIndicatorBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface SplitterResizeTriggerIndicatorProps
    extends Assign<HTMLProps<'div'>, SplitterResizeTriggerIndicatorBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory'
  import { useSplitterContext } from './use-splitter-context'
  import { useSplitterResizeTriggerPropsContext } from './use-splitter-resize-trigger-props-context'

  let { ref = $bindable(null), ...props }: SplitterResizeTriggerIndicatorProps = $props()

  const splitter = useSplitterContext()
  const triggerProps = useSplitterResizeTriggerPropsContext()
  const mergedProps = $derived(mergeProps(splitter().getResizeTriggerIndicator(triggerProps()), props))
</script>

<Ark as="div" bind:ref {...mergedProps} />
