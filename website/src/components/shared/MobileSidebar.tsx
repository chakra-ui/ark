import { dialog } from '@/panda/recipes'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogTrigger,
  Portal,
} from '@ark-ui/react'
import { FiMenu } from 'react-icons/fi'
import { CloseButton } from './CloseButton'
import { IconButton } from './IconButton'

export const MobileSidebar = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton icon={<FiMenu />} aria-label="Menu" variant="link" minW="unset" />
      </DialogTrigger>
      <Portal>
        <DialogBackdrop className={dialog({ variant: 'drawer' })} />
        <DialogContainer className={dialog({ variant: 'drawer' })}>
          <DialogContent>
            <div>Content</div>
            <DialogCloseTrigger>
              <CloseButton aria-label="Close dialog" />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}
