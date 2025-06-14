<script lang="ts">
  import { Splitter } from '@ark-ui/svelte/splitter'
</script>

<Splitter.Root panels={[{ id: 'a' }, { id: 'b' }]}>
  <Splitter.Panel id="a">A</Splitter.Panel>
  <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
  <Splitter.Panel id="b">B</Splitter.Panel>
</Splitter.Root>
