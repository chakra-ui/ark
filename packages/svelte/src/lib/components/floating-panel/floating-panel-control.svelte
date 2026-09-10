<script lang="ts" module>
  import type { ControlState } from '@zag-js/floating-panel'
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface FloatingPanelControlState extends ControlState {}
  export interface FloatingPanelControlBaseProps
    extends PolymorphicProps<'div', FloatingPanelControlState>, RefAttribute {}
  export interface FloatingPanelControlProps extends Assign<HTMLProps<'div'>, FloatingPanelControlBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(null), ...props }: FloatingPanelControlProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const mergedProps = $derived(mergeProps(floatingPanel().getControlProps(), props))
</script>

<Ark as="div" bind:ref {...mergedProps} state={floatingPanel().getControlState()} />
