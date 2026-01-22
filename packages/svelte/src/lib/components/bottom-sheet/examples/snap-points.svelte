<script lang="ts">
  import { BottomSheet } from '@ark-ui/svelte/bottom-sheet'
  import { XIcon } from 'lucide-svelte'
  import styles from 'styles/bottom-sheet.module.css'
</script>

<BottomSheet.Root snapPoints={[0.25, 0.5, 1]} defaultActiveSnapPoint={0.5}>
  <BottomSheet.Trigger class={styles.Trigger}>Open</BottomSheet.Trigger>
  <BottomSheet.Backdrop class={styles.Backdrop} />
  <BottomSheet.Content class={styles.Content}>
    <BottomSheet.Grabber class={styles.Grabber}>
      <BottomSheet.GrabberIndicator class={styles.GrabberIndicator} />
    </BottomSheet.Grabber>
    <BottomSheet.Title class={styles.Title}>Bottom Sheet with Snap Points</BottomSheet.Title>
    <p>This bottom sheet has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
    <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
    <BottomSheet.CloseTrigger class={styles.CloseTrigger}>
      <XIcon />
    </BottomSheet.CloseTrigger>
  </BottomSheet.Content>
</BottomSheet.Root>
