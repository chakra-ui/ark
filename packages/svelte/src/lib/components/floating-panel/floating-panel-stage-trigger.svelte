<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'
  import type { StageTriggerProps, StageTriggerState } from '@zag-js/floating-panel'

  export interface FloatingPanelStageTriggerState extends StageTriggerState {}
  export interface FloatingPanelStageTriggerBaseProps
    extends StageTriggerProps, PolymorphicProps<'button', FloatingPanelStageTriggerState>, RefAttribute {}
  export interface FloatingPanelStageTriggerProps extends Assign<
    HTMLProps<'button'>,
    FloatingPanelStageTriggerBaseProps
  > {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(null), stage, ...props }: FloatingPanelStageTriggerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getStageTriggerProps({ stage }), props))
</script>

<Ark as="button" bind:ref {...mergedProps} state={floatingPanel().getStageTriggerState({ stage })} />
