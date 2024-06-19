import { Dialog as ArkDialog, Popover, Portal } from '@ark-ui/react'
import { useState } from 'react'

export const WithDialog = () => (
  <Popover.Root>
    <Popover.Trigger>Open Popover</Popover.Trigger>
    {/* portal the popover content. No need for portals in dialogs */}
    <Portal>
      <Popover.Positioner>
        <Popover.Content style={{ backgroundColor: 'pink', width: '300px', height: '300px' }}>
          <AppDialogs />
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)

interface DialogProps {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  bg: string
}

const Dialog = (props: DialogProps) => {
  const { children, isOpen, setIsOpen, bg } = props
  return (
    <>
      <ArkDialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <ArkDialog.Backdrop />
        <ArkDialog.Positioner style={{ position: 'fixed', left: '0px', top: '0px' }}>
          <ArkDialog.Content style={{ backgroundColor: bg, width: '300px', height: '200px' }}>
            <ArkDialog.CloseTrigger asChild>
              <button>Close</button>
            </ArkDialog.CloseTrigger>
            {children}
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </ArkDialog.Root>
    </>
  )
}

const AppDialogs = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isChildOpen, setIsChildOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Parent Dialog</button>
      <Dialog isOpen={isOpen} setIsOpen={setIsOpen} bg="green">
        This is parent
        <button onClick={() => setIsChildOpen(true)}>Open Child Dialog</button>
        <Dialog isOpen={isChildOpen} setIsOpen={setIsChildOpen} bg="red">
          This is child
        </Dialog>
      </Dialog>
    </>
  )
}
