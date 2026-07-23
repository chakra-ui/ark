import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const EffectProbe = () => {
  const [ticks, setTicks] = useState(0)
  const [refAttached, setRefAttached] = useState(false)
  const nodeRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const id = window.setInterval(() => {
      setTicks((count) => count + 1)
    }, 200)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    setRefAttached(Boolean(nodeRef.current))
  })

  return (
    <p ref={nodeRef} className={styles.Description}>
      ticks: {ticks} / ref: {refAttached ? 'attached' : 'null'}
    </p>
  )
}

const DialogDemo = (props: { hideMode: 'display-none' | 'activity' }) => (
  <Dialog.Root hideMode={props.hideMode}>
    <Dialog.Trigger className={button.Root}>Open ({props.hideMode})</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Positioner className={styles.Positioner}>
        <Dialog.Content className={styles.Content}>
          <Dialog.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={styles.Title}>hideMode="{props.hideMode}"</Dialog.Title>
          <EffectProbe />
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)

export const HideMode = () => (
  <div className="stack">
    <p style={{ margin: 0 }}>
      Close each dialog. <code>display-none</code> keeps ticking. <code>activity</code> freezes.
    </p>
    <DialogDemo hideMode="display-none" />
    <DialogDemo hideMode="activity" />
  </div>
)
