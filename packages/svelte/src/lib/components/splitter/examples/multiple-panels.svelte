<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
</script>

<Splitter.Root
  panels={[
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 40 },
    { id: 'c', minSize: 20 },
  ]}
  defaultSize={[20, 60, 20]}
>
  <Splitter.Panel id="a">
    <div>Panel A (min: 20%)</div>
  </Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b" aria-label="Resize between A and B" />
  <Splitter.Panel id="b">
    <div>Panel B (min: 40%)</div>
  </Splitter.Panel>
  <Splitter.ResizeTrigger id="b:c" aria-label="Resize between B and C" />
  <Splitter.Panel id="c">
    <div>Panel C (min: 20%)</div>
  </Splitter.Panel>
</Splitter.Root>
