<script lang="ts">
  import { SegmentGroup } from '@ark-ui/svelte/segment-group'

  let value = $state<string | null>('react')
</script>

<button type="button" onclick={() => (value = 'vue')}>select vue</button>
<SegmentGroup.Root bind:value>
  <SegmentGroup.Label>Framework</SegmentGroup.Label>
  {#each ['react', 'solid', 'vue'] as item (item)}
    <SegmentGroup.Item value={item}>
      <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  {/each}
</SegmentGroup.Root>
<output data-testid="value">{String(value)}</output>
