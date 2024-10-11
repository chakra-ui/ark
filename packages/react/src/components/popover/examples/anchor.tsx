import { Popover } from '@ark-ui/react/popover'
import { useRef } from 'react'

export const WithAnchor = () => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <Popover.Root initialFocusEl={() => ref.current}>
      <Popover.Trigger>Click Me</Popover.Trigger>

      <Popover.Anchor>
        <input placeholder="Type here..." />
      </Popover.Anchor>

      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
