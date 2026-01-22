import { BottomSheet } from '@ark-ui/react/bottom-sheet'
import { XIcon } from 'lucide-react'
import styles from 'styles/bottom-sheet.module.css'

export const Basic = () => (
  <BottomSheet.Root>
    <BottomSheet.Trigger className={styles.Trigger}>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop className={styles.Backdrop} />
    <BottomSheet.Content className={styles.Content}>
      <BottomSheet.Grabber className={styles.Grabber}>
        <BottomSheet.GrabberIndicator className={styles.GrabberIndicator} />
      </BottomSheet.Grabber>
      <BottomSheet.Title className={styles.Title}>Bottom Sheet Title</BottomSheet.Title>
      <p>This is the content of the bottom sheet.</p>
      <BottomSheet.CloseTrigger className={styles.CloseTrigger}>
        <XIcon />
      </BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
