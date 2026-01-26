import { Presence } from '@ark-ui/react/presence'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/presence.module.css'

export const Basic = () => {
  const [present, setPresent] = useState(false)
  return (
    <div className="stack">
      <button className={button.Root} type="button" onClick={() => setPresent(!present)}>
        Toggle
      </button>
      <Presence className={styles.Box} present={present}>
        Content
      </Presence>
    </div>
  )
}
