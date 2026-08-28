import { Drawer } from '@ark-ui/react/drawer'
import { XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from 'styles/drawer.module.css'

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
    <p ref={nodeRef}>
      ticks: {ticks} / ref: {refAttached ? 'attached' : 'null'}
    </p>
  )
}

const DrawerDemo = (props: { hideMode: 'display-none' | 'activity' }) => (
  <Drawer.Root hideMode={props.hideMode}>
    <Drawer.Trigger className={styles.Trigger}>Open ({props.hideMode})</Drawer.Trigger>
    <Drawer.Backdrop className={styles.Backdrop} />
    <Drawer.Positioner className={styles.Positioner}>
      <Drawer.Content className={styles.Content}>
        <Drawer.Grabber className={styles.Grabber}>
          <Drawer.GrabberIndicator className={styles.GrabberIndicator} />
        </Drawer.Grabber>
        <Drawer.Title className={styles.Title}>hideMode="{props.hideMode}"</Drawer.Title>
        <EffectProbe />
        <Drawer.CloseTrigger className={styles.CloseTrigger}>
          <XIcon />
        </Drawer.CloseTrigger>
      </Drawer.Content>
    </Drawer.Positioner>
  </Drawer.Root>
)

export const HideMode = () => (
  <div className="stack">
    <p style={{ margin: 0 }}>
      Close each drawer. <code>display-none</code> keeps ticking. <code>activity</code> freezes.
    </p>
    <DrawerDemo hideMode="display-none" />
    <DrawerDemo hideMode="activity" />
  </div>
)
