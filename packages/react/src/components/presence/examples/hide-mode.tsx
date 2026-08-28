import { Presence } from '@ark-ui/react/presence'
import { useEffect, useRef, useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/presence.module.css'

const EffectProbe = (props: { label: string }) => {
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
    <div className="stack">
      <strong>{props.label}</strong>
      <span ref={nodeRef}>
        ticks: {ticks} / ref: {refAttached ? 'attached' : 'null'}
      </span>
    </div>
  )
}

const Panel = (props: { hideMode: 'display-none' | 'activity'; description: string }) => {
  const [present, setPresent] = useState(true)

  return (
    <div className="stack">
      <p style={{ margin: 0, opacity: 0.7 }}>{props.description}</p>
      <button className={button.Root} type="button" onClick={() => setPresent((value) => !value)}>
        {present ? 'Hide' : 'Show'} ({props.hideMode})
      </button>
      <Presence className={styles.Box} present={present} hideMode={props.hideMode}>
        <EffectProbe label={props.hideMode} />
      </Presence>
    </div>
  )
}

export const HideMode = () => (
  <div className="stack">
    <p style={{ margin: 0 }}>
      Hide both panels. <code>display-none</code> keeps ticking. <code>activity</code> freezes.
    </p>
    <Panel hideMode="display-none" description="Effects stay alive." />
    <Panel hideMode="activity" description="Effects pause." />
  </div>
)
