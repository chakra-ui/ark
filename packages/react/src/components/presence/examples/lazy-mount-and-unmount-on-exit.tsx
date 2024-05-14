import { useState } from 'react'
import { Presence } from '../..'

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
