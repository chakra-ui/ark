<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
</script>

<Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]}>
  <Splitter.Context>
    {#snippet render(splitter)}
      <Splitter.Panel id="a">
        <button type="button" onclick={() => splitter().resizePanel('a', 10)}>Set to 10%</button>
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
      <Splitter.Panel id="b">
        <button type="button" onclick={() => splitter().resizePanel('b', 10)}>Set to 10%</button>
      </Splitter.Panel>
    {/snippet}
  </Splitter.Context>
</Splitter.Root>
