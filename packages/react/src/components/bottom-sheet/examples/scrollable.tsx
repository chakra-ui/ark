import { BottomSheet } from '@ark-ui/react/bottom-sheet'
import { XIcon } from 'lucide-react'
import styles from 'styles/bottom-sheet.module.css'

export const Scrollable = () => (
  <BottomSheet.Root>
    <BottomSheet.Trigger className={styles.Trigger}>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop className={styles.Backdrop} />
    <BottomSheet.Content className={styles.Content}>
      <BottomSheet.Grabber className={styles.Grabber}>
        <BottomSheet.GrabberIndicator className={styles.GrabberIndicator} />
      </BottomSheet.Grabber>
      <BottomSheet.Title className={styles.Title}>Scrollable Bottom Sheet</BottomSheet.Title>
      <BottomSheet.CloseTrigger className={styles.CloseTrigger}>
        <XIcon />
      </BottomSheet.CloseTrigger>
      <div className={styles.Scrollable}>
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className={styles.ScrollableItem}>
            Item {index + 1}
          </div>
        ))}
      </div>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
