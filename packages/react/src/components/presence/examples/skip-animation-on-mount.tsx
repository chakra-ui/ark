import { Presence } from '@ark-ui/react/presence'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/presence.module.css'

export const SkipAnimationOnMount = () => {
  const [present, setPresent] = useState(true)
  return (
    <div className="stack">
      <button className={button.Root} type="button" onClick={() => setPresent(!present)}>
        Toggle
      </button>
      <Presence className={styles.Box} present={present} skipAnimationOnMount>
        No Initial Animation
      </Presence>
    </div>
  )
}
