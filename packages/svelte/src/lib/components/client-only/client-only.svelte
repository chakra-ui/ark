<script module lang="ts">
  import type { Snippet } from 'svelte'

  export interface ClientOnlyProps {
    children?: Snippet
    fallback?: Snippet
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'

  const props: ClientOnlyProps = $props()

  let isClient = $state(false)

  onMount(() => {
    isClient = true
  })
</script>

{#if isClient}
  {@render props.children?.()}
{:else if props.fallback}
  {@render props.fallback()}
{/if}
