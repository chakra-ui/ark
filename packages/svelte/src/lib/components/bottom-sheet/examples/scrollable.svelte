<script lang="ts">
  import { BottomSheet } from '@ark-ui/svelte/bottom-sheet'
  import { XIcon } from 'lucide-svelte'
  import styles from 'styles/bottom-sheet.module.css'
</script>

<BottomSheet.Root>
  <BottomSheet.Trigger class={styles.Trigger}>Open</BottomSheet.Trigger>
  <BottomSheet.Backdrop class={styles.Backdrop} />
  <BottomSheet.Content class={styles.Content}>
    <BottomSheet.Grabber class={styles.Grabber}>
      <BottomSheet.GrabberIndicator class={styles.GrabberIndicator} />
    </BottomSheet.Grabber>
    <BottomSheet.Title class={styles.Title}>Scrollable Bottom Sheet</BottomSheet.Title>
    <BottomSheet.CloseTrigger class={styles.CloseTrigger}>
      <XIcon />
    </BottomSheet.CloseTrigger>
    <div class={styles.Scrollable}>
      {#each Array.from({ length: 50 }) as _, index}
        <div class={styles.ScrollableItem}>Item {index + 1}</div>
      {/each}
    </div>
  </BottomSheet.Content>
</BottomSheet.Root>
