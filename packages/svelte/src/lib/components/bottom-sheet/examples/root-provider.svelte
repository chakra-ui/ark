<script lang="ts">
  import { BottomSheet, useBottomSheet } from '@ark-ui/svelte/bottom-sheet'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/bottom-sheet.module.css'

  const bottomSheet = useBottomSheet({
    defaultActiveSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  })
</script>

<div class="stack">
  <div class="hstack">
    <button class={button.Root} onclick={() => bottomSheet().setOpen(true)}>Open via API</button>
    <button class={button.Root} onclick={() => bottomSheet().setActiveSnapPoint(0.25)}>Set to 25%</button>
    <button class={button.Root} onclick={() => bottomSheet().setActiveSnapPoint(1)}>Set to 100%</button>
  </div>

  <BottomSheet.RootProvider value={bottomSheet}>
    <BottomSheet.Backdrop class={styles.Backdrop} />
    <BottomSheet.Content class={styles.Content}>
      <BottomSheet.Grabber class={styles.Grabber}>
        <BottomSheet.GrabberIndicator class={styles.GrabberIndicator} />
      </BottomSheet.Grabber>
      <BottomSheet.Title class={styles.Title}>Bottom Sheet with RootProvider</BottomSheet.Title>
      <p>This bottom sheet is controlled via the useBottomSheet hook and RootProvider.</p>
      <p>Active snap point: {bottomSheet().activeSnapPoint}</p>
      <BottomSheet.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.RootProvider>
</div>
