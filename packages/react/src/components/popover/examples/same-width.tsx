import { Popover } from '@ark-ui/react/popover'

const style: React.CSSProperties = {
  minWidth: '200px',
}

export const WithSameWidth = () => {
  return (
    <Popover.Root positioning={{ sameWidth: true }}>
      <Popover.Trigger style={style}>Click Me</Popover.Trigger>
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
