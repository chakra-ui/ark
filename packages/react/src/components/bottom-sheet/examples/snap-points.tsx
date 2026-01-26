import { BottomSheet } from '@ark-ui/react/bottom-sheet'
import { XIcon } from 'lucide-react'
import styles from 'styles/bottom-sheet.module.css'

export const SnapPoints = () => (
  <BottomSheet.Root snapPoints={[0.25, 0.5, 1]} defaultActiveSnapPoint={0.5}>
    <BottomSheet.Trigger className={styles.Trigger}>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop className={styles.Backdrop} />
    <BottomSheet.Content className={styles.Content}>
      <BottomSheet.Grabber className={styles.Grabber}>
        <BottomSheet.GrabberIndicator className={styles.GrabberIndicator} />
      </BottomSheet.Grabber>
      <BottomSheet.Title className={styles.Title}>Bottom Sheet with Snap Points</BottomSheet.Title>
      <p>This bottom sheet has multiple snap points at 25%, 50%, and 100% of the viewport height.</p>
      <p>Drag the grabber to snap between different heights, or swipe to dismiss.</p>
      <BottomSheet.CloseTrigger className={styles.CloseTrigger}>
        <XIcon />
      </BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
