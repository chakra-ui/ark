import { Presence } from '@ark-ui/react/presence'
import { useState } from 'react'

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
