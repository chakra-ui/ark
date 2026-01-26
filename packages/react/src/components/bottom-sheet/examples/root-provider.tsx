import { BottomSheet, useBottomSheet } from '@ark-ui/react/bottom-sheet'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/bottom-sheet.module.css'

export const RootProvider = () => {
  const bottomSheet = useBottomSheet({
    defaultActiveSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  })

  return (
    <div className="stack">
      <div className="hstack">
        <button className={button.Root} onClick={() => bottomSheet.setOpen(true)}>
          Open via API
        </button>
        <button className={button.Root} onClick={() => bottomSheet.setActiveSnapPoint(0.25)}>
          Set to 25%
        </button>
        <button className={button.Root} onClick={() => bottomSheet.setActiveSnapPoint(1)}>
          Set to 100%
        </button>
      </div>

      <BottomSheet.RootProvider value={bottomSheet}>
        <BottomSheet.Backdrop className={styles.Backdrop} />
        <BottomSheet.Content className={styles.Content}>
          <BottomSheet.Grabber className={styles.Grabber}>
            <BottomSheet.GrabberIndicator className={styles.GrabberIndicator} />
          </BottomSheet.Grabber>
          <BottomSheet.Title className={styles.Title}>Bottom Sheet with RootProvider</BottomSheet.Title>
          <p>This bottom sheet is controlled via the useBottomSheet hook and RootProvider.</p>
          <p>Active snap point: {bottomSheet.activeSnapPoint}</p>
          <BottomSheet.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </BottomSheet.CloseTrigger>
        </BottomSheet.Content>
      </BottomSheet.RootProvider>
    </div>
  )
}
