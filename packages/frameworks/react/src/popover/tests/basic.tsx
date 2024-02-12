import { Popover, type PopoverRootProps } from '../'

export const ComponentUnderTest = (props: PopoverRootProps) => (
  <Popover.Root {...props}>
    <Popover.Trigger>
      click me
      <Popover.Indicator />
    </Popover.Trigger>
    <Popover.Anchor>Anchor</Popover.Anchor>
    <Popover.Positioner data-testid="positioner">
      <Popover.Arrow>
        <Popover.ArrowTip />
      </Popover.Arrow>
      <Popover.Content>
        <Popover.Title>title</Popover.Title>
        <Popover.Description>description</Popover.Description>
        <Popover.CloseTrigger>close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
