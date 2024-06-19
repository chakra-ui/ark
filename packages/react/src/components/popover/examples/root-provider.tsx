import { Popover, usePopover } from '../..'

export const WithRootProvider = () => {
  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
    },
  })

  return (
    <Popover.RootProvider value={popover}>
      <button onClick={() => popover.setOpen(true)}>
        Popover is {popover.open ? 'open' : 'closed'}
      </button>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.RootProvider>
  )
}
