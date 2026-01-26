<script lang="ts">
  import { SegmentGroup, useSegmentGroup } from '@ark-ui/svelte/segment-group'
  import styles from 'styles/segment-group.module.css'

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

  const id = $props.id()
  const segmentGroup = useSegmentGroup({ id, defaultValue: 'React' })
</script>

<div class="stack">
  <output>selected: {segmentGroup().value}</output>
  <SegmentGroup.RootProvider class={styles.Root} value={segmentGroup}>
    <SegmentGroup.Indicator class={styles.Indicator} />
    {#each frameworks as framework}
      <SegmentGroup.Item class={styles.Item} value={framework}>
        <SegmentGroup.ItemText class={styles.ItemText}>{framework}</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl class={styles.ItemControl} />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    {/each}
  </SegmentGroup.RootProvider>
</div>
