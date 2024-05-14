import { useState } from 'react'
import { Popover } from '../..'

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        Toggle
      </button>
      <Popover.Root open={isOpen}>
        <Popover.Anchor>Anchor</Popover.Anchor>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.Root>
    </>
  )
}
