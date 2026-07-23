import { Collapsible } from '@ark-ui/react/collapsible'
import { ChevronRightIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import styles from 'styles/collapsible.module.css'

const EffectProbe = () => {
  const [ticks, setTicks] = useState(0)
  const [refAttached, setRefAttached] = useState(false)
  const nodeRef = useRef<HTMLSpanElement>(null)

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
    <span ref={nodeRef}>
      ticks: {ticks} / ref: {refAttached ? 'attached' : 'null'}
    </span>
  )
}

const Panel = (props: { hideMode: 'display-none' | 'activity' }) => (
  <Collapsible.Root className={styles.Root} defaultOpen hideMode={props.hideMode}>
    <Collapsible.Trigger className={styles.Trigger}>
      hideMode="{props.hideMode}"
      <Collapsible.Indicator className={styles.Indicator}>
        <ChevronRightIcon />
      </Collapsible.Indicator>
    </Collapsible.Trigger>
    <Collapsible.Content className={styles.Content}>
      <div className={styles.Body}>
        <EffectProbe />
      </div>
    </Collapsible.Content>
  </Collapsible.Root>
)

export const HideMode = () => (
  <div className="stack">
    <p style={{ margin: 0 }}>
      Collapse both panels. <code>display-none</code> keeps ticking. <code>activity</code> freezes.
    </p>
    <Panel hideMode="display-none" />
    <Panel hideMode="activity" />
  </div>
)
