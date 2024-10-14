import { Popover, usePopover } from '@ark-ui/react/popover'

export const RootProvider = () => {
  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
    },
  })

  return (
    <>
      <button onClick={() => popover.setOpen(true)}>
        Popover is {popover.open ? 'open' : 'closed'}
      </button>
      <Popover.RootProvider value={popover}>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.RootProvider>
    </>
  )
}
