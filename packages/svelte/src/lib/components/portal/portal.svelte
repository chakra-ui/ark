<script module lang="ts">
  import type { Snippet } from 'svelte'
  export interface PortalProps {
    container?: HTMLElement
    children: Snippet
  }
</script>

<script lang="ts">
  /**
   * @see https://github.com/sveltejs/svelte/issues/7082
   */
  import { getAllContexts, mount, unmount } from 'svelte'
  import PortalConsumer from './portal-consumer.svelte'

  const { container = document.body, children }: PortalProps = $props()

  const context = getAllContexts()

  $effect(() => {
    mount(PortalConsumer, { target: container, props: { children }, context })

    return () => unmount(PortalConsumer)
  })
</script>
