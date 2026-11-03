<script lang="ts">
  import { Toc } from '../index.ts'

  const items = [
    { value: 'introduction', depth: 2 },
    { value: 'usage', depth: 2 },
  ]

  let activeIds = $state<string[]>([])
</script>

<Toc.Root {items} bind:activeIds>
  <Toc.Content>
    <h2 id="introduction">Introduction</h2>
    <h2 id="usage">Usage</h2>
  </Toc.Content>
  <Toc.Context>
    {#snippet render(toc)}
      <button type="button" onclick={() => toc().setActiveIds(['usage'])}>activate</button>
    {/snippet}
  </Toc.Context>
</Toc.Root>
<output data-testid="active">{activeIds.join(',')}</output>
