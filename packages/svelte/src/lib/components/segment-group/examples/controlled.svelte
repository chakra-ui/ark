<script lang="ts">
  import { SegmentGroup } from '@ark-ui/svelte/segment-group'
  import styles from 'styles/segment-group.module.css'

  let value = $state<string | null>(null)

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
</script>

<SegmentGroup.Root class={styles.Root} bind:value>
  <SegmentGroup.Indicator class={styles.Indicator} />
  {#each frameworks as framework}
    <SegmentGroup.Item class={styles.Item} value={framework}>
      <SegmentGroup.ItemText class={styles.ItemText}>{framework}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl class={styles.ItemControl} />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  {/each}
</SegmentGroup.Root>
