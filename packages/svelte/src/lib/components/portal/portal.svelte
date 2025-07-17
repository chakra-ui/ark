<script module lang="ts">
  import type { Snippet } from 'svelte'

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
</script>

<script lang="ts">
  /**
   * @see https://github.com/sveltejs/svelte/issues/7082
   */
  import { getAllContexts, mount, unmount } from 'svelte'
  import PortalConsumer from './portal-consumer.svelte'

  const { container = globalThis?.document?.body, children, disabled = false }: PortalProps = $props()

  const context = getAllContexts()

  let instance: ReturnType<typeof mount> | null = null

  const unmountInstance = () => {
    if (instance) {
      unmount(instance)
      instance = null
    }
  }

  $effect(() => {
    if (disabled || !container) {
      unmountInstance()
      return
    }

    instance = mount(PortalConsumer, {
      target: container,
      props: { children },
      context,
    })

    return () => {
      unmountInstance()
    }
  })
</script>

{#if disabled}
  {@render children?.()}
{/if}
