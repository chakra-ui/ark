<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
</script>

<Splitter.Root
  defaultSize={[15, 20]}
  panels={[
    { id: 'a', collapsible: true, collapsedSize: 5, minSize: 10, maxSize: 20 },
    { id: 'b', minSize: 50 },
  ]}
>
  <Splitter.Panel id="a">A</Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
  <Splitter.Panel id="b">B</Splitter.Panel>
</Splitter.Root>
