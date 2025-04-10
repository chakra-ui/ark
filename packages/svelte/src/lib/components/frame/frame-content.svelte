<script lang="ts">
  import type { Snippet } from 'svelte'

  interface FrameContentProps {
    onMount?(): void
    onUnmount?(): void
    children: Snippet
  }

  const { onMount, onUnmount, children }: FrameContentProps = $props()

  $effect(() => {
    onMount?.()

    return onUnmount
  })
</script>

{@render children()}
