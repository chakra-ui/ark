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

export const LazyMountHideMode = () => (
  <div className="stack">
    <p style={{ margin: 0 }}>
      <code>lazyMount</code> + <code>hideMode="activity"</code> (no <code>unmountOnExit</code>). Absent until first
      open, then stays mounted. Close it and ticks freeze.
    </p>
    <Dialog.Root lazyMount hideMode="activity">
      <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Positioner className={styles.Positioner}>
          <Dialog.Content className={styles.Content}>
            <Dialog.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Dialog.CloseTrigger>
            <Dialog.Title className={styles.Title}>lazyMount + hideMode="activity"</Dialog.Title>
            <EffectProbe />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  </div>
)
