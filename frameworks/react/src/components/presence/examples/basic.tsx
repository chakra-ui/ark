import { useState } from 'react'
import { Presence } from '../..'

export const Basic = () => {
  const [present, setPresent] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setPresent(!present)}>
        Toggle
      </button>
      <Presence present={present}>Hidden and Hidden</Presence>
    </>
  )
}
