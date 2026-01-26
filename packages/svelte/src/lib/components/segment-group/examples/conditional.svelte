<script lang="ts">
  import { SegmentGroup } from '@ark-ui/svelte/segment-group'
  import button from 'styles/button.module.css'
  import styles from 'styles/segment-group.module.css'

  let show = $state(false)

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
</script>

<div class="stack">
  <button class={button.Root} onclick={() => (show = !show)}>
    {show ? 'Hide' : 'Show'}
  </button>
  {#if show}
    <SegmentGroup.Root class={styles.Root} defaultValue="React">
      <SegmentGroup.Indicator class={styles.Indicator} />
      {#each frameworks as framework}
        <SegmentGroup.Item class={styles.Item} value={framework}>
          <SegmentGroup.ItemText class={styles.ItemText}>{framework}</SegmentGroup.ItemText>
          <SegmentGroup.ItemControl class={styles.ItemControl} />
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
      {/each}
    </SegmentGroup.Root>
  {/if}
</div>
