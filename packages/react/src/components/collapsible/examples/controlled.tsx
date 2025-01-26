import { Collapsible } from '@ark-ui/react/collapsible'
import { useState } from 'react'

export const Controlled = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'}</button>
      <Collapsible.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible.Root>
    </>
  )
}
