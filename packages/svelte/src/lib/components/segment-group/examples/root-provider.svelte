<script lang="ts">
  import { SegmentGroup, useSegmentGroup } from '@ark-ui/svelte/segment-group'

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

  const id = $props.id()
  const segmentGroup = useSegmentGroup({ id })
</script>

<button onclick={() => segmentGroup().focus()}>Focus</button>

<SegmentGroup.RootProvider value={segmentGroup}>
  <SegmentGroup.Indicator />
  {#each frameworks as framework}
    <SegmentGroup.Item value={framework}>
      <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  {/each}
</SegmentGroup.RootProvider>
