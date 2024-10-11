import { Presence } from '@ark-ui/react/presence'
import { useState } from 'react'

export const LazyMountAndUnmountOnExit = () => {
  const [present, setPresent] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present)}>
        Toggle
      </button>
      <Presence present={present} lazyMount unmountOnExit>
        Lazy Mount and Unmounted on Exit
      </Presence>
    </>
  )
}
