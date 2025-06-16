<script lang="ts">
  import { SegmentGroup } from '@ark-ui/svelte/segment-group'

  let show = $state(false)

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
</script>

<div>
  <button onclick={() => (show = !show)}>Toggle</button>
  {#if show}
    <SegmentGroup.Root defaultValue="React">
      <SegmentGroup.Indicator />
      {#each frameworks as framework}
        <SegmentGroup.Item value={framework}>
          <SegmentGroup.ItemText>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      {/each}
    </SegmentGroup.Root>
  {/if}
</div>
