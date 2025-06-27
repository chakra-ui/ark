<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface FloatingPanelPositionerBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FloatingPanelPositionerProps extends Assign<HTMLProps<'div'>, FloatingPanelPositionerBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { usePresenceContext } from '../presence/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(null), ...props }: FloatingPanelPositionerProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(floatingPanel().getPositionerProps(), props))
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {...mergedProps} />
{/if}
