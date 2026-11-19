<script lang="ts">
  import { SegmentGroup } from '@ark-ui/svelte/segment-group'

  const props: SegmentGroup.RootProps = $props()

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]
</script>

<SegmentGroup.Root {...props}>
  <SegmentGroup.Label>Framework</SegmentGroup.Label>
  <SegmentGroup.Indicator data-testid="indicator" />
  {#each items as item (item.value)}
    <SegmentGroup.Item value={item.value} disabled={item.disabled} data-testid={`item-${item.value}`}>
      <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  {/each}
</SegmentGroup.Root>
