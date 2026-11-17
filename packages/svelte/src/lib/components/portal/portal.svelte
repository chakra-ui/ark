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

  $effect(() => {
    if (disabled) return

    const target = container
    let cancelled = false
    let instance: ReturnType<typeof mount> | null = null

    tick().then(() => {
      if (cancelled) return
      instance = mount(children, { target, context })
    })

    return () => {
      cancelled = true
      if (instance) {
        void unmount(instance)
        instance = null
      }
    }
  })
</script>

{#if disabled}
  {@render children?.()}
{/if}
