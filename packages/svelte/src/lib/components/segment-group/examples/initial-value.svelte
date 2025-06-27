<script lang="ts">
  import { SegmentGroup } from '@ark-ui/svelte/segment-group'

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
</script>

<SegmentGroup.Root defaultValue="React">
  <SegmentGroup.Indicator />
  {#each frameworks as framework (framework)}
    <SegmentGroup.Item value={framework}>
      <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  {/each}
</SegmentGroup.Root>
