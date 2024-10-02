import { Popover } from '@ark-ui/solid/popover'

export const OnOpenChange = () => {
  return (
    <Popover.Root onOpenChange={(open) => alert(open ? 'opened' : 'closed')}>
      <Popover.Trigger>
        Click Me <Popover.Indicator>{'>'}</Popover.Indicator>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
