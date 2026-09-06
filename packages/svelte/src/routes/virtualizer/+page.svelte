<script lang="ts">
  import { page } from '$app/state'
  import DynamicSize from '$lib/components/virtualizer/examples/dynamic-size.svelte'
  import Grid from '$lib/components/virtualizer/examples/grid.svelte'
  import Horizontal from '$lib/components/virtualizer/examples/horizontal.svelte'
  import List from '$lib/components/virtualizer/examples/list.svelte'
  import ScrollToIndex from '$lib/components/virtualizer/examples/scroll-to-index.svelte'
  import Window from '$lib/components/virtualizer/examples/window.svelte'

  const examples = { list: List, 'scroll-to-index': ScrollToIndex, 'dynamic-size': DynamicSize, horizontal: Horizontal, grid: Grid, window: Window }
  const current = $derived((page.url.searchParams.get('example') ?? 'list') as keyof typeof examples)
  const Example = $derived(examples[current])
</script>

<div style="padding: 20px">
  <nav style="display: flex; gap: 12px; margin-bottom: 16px">
    {#each Object.keys(examples) as key}
      <a href={`?example=${key}`} style:font-weight={key === current ? 'bold' : 'normal'}>{key}</a>
    {/each}
  </nav>
  <Example />
</div>
