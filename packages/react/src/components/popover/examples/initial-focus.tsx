import { useRef } from 'react'
import { Popover } from '../..'

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

export const WithInitialFocusEl = () => {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <Popover.Root initialFocusEl={() => ref.current}>
      <Popover.Trigger>Click Me</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <form style={style}>
            <input type="file" />
            <input placeholder="Add title" ref={ref} />
            <textarea placeholder="Add details" />
          </form>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
