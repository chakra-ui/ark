<script lang="ts">
  import { type Snippet, getAllContexts, mount, tick, unmount } from 'svelte'

  export interface PortalProps {
    /**
     * If true, the portal will not be rendered.
     */
    disabled?: boolean
    /**
     * The container to render the portal into.
     */
    container?: HTMLElement
    /**
     * The children to render in the portal.
     */
    children: Snippet
  }

  const {
    children,
    container = typeof document === 'undefined' ? undefined : document.body,
    disabled = false,
  }: PortalProps = $props()

  const context = getAllContexts()

  $effect(() => {
    if (disabled || !container) {
      return
    }
    const instance = mount(children, {
      target: container,
      context,
    })
    return () => {
      unmount(instance)
    }
  })
</script>

{#if disabled || typeof document === 'undefined'}
  {@render children?.()}
{/if}
