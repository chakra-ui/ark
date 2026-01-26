import { BottomSheet, type BottomSheetOpenChangeDetails } from '@ark-ui/react/bottom-sheet'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/bottom-sheet.module.css'

export const Controlled = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className={button.Root} onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'} Bottom Sheet
      </button>

      <BottomSheet.Root open={open} onOpenChange={(details: BottomSheetOpenChangeDetails) => setOpen(details.open)}>
        <BottomSheet.Backdrop className={styles.Backdrop} />
        <BottomSheet.Content className={styles.Content}>
          <BottomSheet.Grabber className={styles.Grabber}>
            <BottomSheet.GrabberIndicator className={styles.GrabberIndicator} />
          </BottomSheet.Grabber>
          <BottomSheet.Title className={styles.Title}>Controlled Bottom Sheet</BottomSheet.Title>
          <p>This bottom sheet is controlled via state.</p>
          <BottomSheet.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </BottomSheet.CloseTrigger>
        </BottomSheet.Content>
      </BottomSheet.Root>
    </>
  )
}
