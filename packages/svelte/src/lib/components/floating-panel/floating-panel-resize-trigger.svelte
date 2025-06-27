<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { ResizeTriggerProps } from '@zag-js/floating-panel'

  export interface FloatingPanelResizeTriggerBaseProps
    extends ResizeTriggerProps,
      PolymorphicProps<'div'>,
      RefAttribute {}
  export interface FloatingPanelResizeTriggerProps
    extends Assign<HTMLProps<'div'>, FloatingPanelResizeTriggerBaseProps> {}
</script>

<script lang="ts">
  import { createSplitProps } from '$lib/utils/create-split-props.js'
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(null), ...props }: FloatingPanelResizeTriggerProps = $props()
  const [resizeProps, localProps] = createSplitProps<ResizeTriggerProps>()(props, ['axis'])

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getResizeTriggerProps(resizeProps), localProps))
</script>

<Ark as="div" bind:ref {...mergedProps} />
