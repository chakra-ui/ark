<script lang="ts">
  import { BottomSheet, type BottomSheetOpenChangeDetails } from '@ark-ui/svelte/bottom-sheet'
  import { XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/bottom-sheet.module.css'

  let open = $state(false)

  const handleOpenChange = (details: BottomSheetOpenChangeDetails) => {
    open = details.open
  }
</script>

<button class={button.Root} onclick={() => (open = !open)}>
  {open ? 'Close' : 'Open'} Bottom Sheet
</button>

<BottomSheet.Root {open} onOpenChange={handleOpenChange}>
  <BottomSheet.Backdrop class={styles.Backdrop} />
  <BottomSheet.Content class={styles.Content}>
    <BottomSheet.Grabber class={styles.Grabber}>
      <BottomSheet.GrabberIndicator class={styles.GrabberIndicator} />
    </BottomSheet.Grabber>
    <BottomSheet.Title class={styles.Title}>Controlled Bottom Sheet</BottomSheet.Title>
    <p>This bottom sheet is controlled via state.</p>
    <BottomSheet.CloseTrigger class={styles.CloseTrigger}>
      <XIcon />
    </BottomSheet.CloseTrigger>
  </BottomSheet.Content>
</BottomSheet.Root>
