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

  let { children, container = globalThis.document?.body, disabled = false }: PortalProps = $props()

  const context = getAllContexts()

  let instance: any = null
  $effect(() => {
    const cleanup = () => {
      if (instance) {
        void unmount(instance)
        instance = null
      }
    }

    if (disabled) {
      cleanup()
      return
    }

    tick().then(() => {
      instance = mount(children, { target: container, context })
    })
    return () => {
      cleanup()
    }
  })
</script>

{#if disabled}
  {@render children?.()}
{/if}
