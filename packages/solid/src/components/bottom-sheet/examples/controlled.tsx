import { BottomSheet, type BottomSheetOpenChangeDetails } from '@ark-ui/solid/bottom-sheet'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/bottom-sheet.module.css'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <button class={button.Root} onClick={() => setOpen(!open())}>
        {open() ? 'Close' : 'Open'} Bottom Sheet
      </button>

      <BottomSheet.Root open={open()} onOpenChange={(details: BottomSheetOpenChangeDetails) => setOpen(details.open)}>
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
    </>
  )
}
