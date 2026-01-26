import { BottomSheet } from '@ark-ui/solid/bottom-sheet'
import { XIcon } from 'lucide-solid'
import styles from 'styles/bottom-sheet.module.css'

export const Modal = () => (
  <BottomSheet.Root modal>
    <BottomSheet.Trigger class={styles.Trigger}>Open</BottomSheet.Trigger>
    <BottomSheet.Backdrop class={styles.Backdrop} />
    <BottomSheet.Content class={styles.Content}>
      <BottomSheet.Grabber class={styles.Grabber}>
        <BottomSheet.GrabberIndicator class={styles.GrabberIndicator} />
      </BottomSheet.Grabber>
      <BottomSheet.Title class={styles.Title}>Modal Bottom Sheet</BottomSheet.Title>
      <BottomSheet.CloseTrigger class={styles.CloseTrigger}>
        <XIcon />
      </BottomSheet.CloseTrigger>
    </BottomSheet.Content>
  </BottomSheet.Root>
)
