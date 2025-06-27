<script lang="ts" module>
  import type { Assign, HTMLProps, PolymorphicProps, RefAttribute } from '$lib/types.js'

  export interface FloatingPanelContentBaseProps extends PolymorphicProps<'div'>, RefAttribute {}
  export interface FloatingPanelContentProps extends Assign<HTMLProps<'div'>, FloatingPanelContentBaseProps> {}
</script>

<script lang="ts">
  import { mergeProps } from '@zag-js/svelte'
  import { Ark } from '../factory/index.js'
  import { usePresenceContext } from '../presence/index.js'
  import { useFloatingPanelContext } from './use-floating-panel-context.js'

  let { ref = $bindable(), ...props }: FloatingPanelContentProps = $props()

  const floatingPanel = useFloatingPanelContext()
  const presence = usePresenceContext()

  const mergedProps = $derived(mergeProps(floatingPanel().getContentProps(), presence().getPresenceProps(), props))

  function setNode(node: HTMLElement) {
    presence().setNode(node)
  }
</script>

{#if !presence().unmounted}
  <Ark as="div" bind:ref {@attach setNode} {...mergedProps} />
{/if}
