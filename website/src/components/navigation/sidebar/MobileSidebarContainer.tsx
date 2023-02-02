'use client'
import { drawer } from '@/panda/recipes'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogTrigger,
  Portal,
} from '@ark-ui/react'
import type { PropsWithChildren } from 'react'
import { FiMenu } from 'react-icons/fi'
import { CloseButton } from '../../shared/CloseButton'
import { IconButton } from '../../shared/IconButton'

export const MobileSidebarContainer = (props: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton icon={<FiMenu />} aria-label="Menu" variant="link" minW="unset" />
      </DialogTrigger>
      <Portal>
        <DialogBackdrop className={drawer()} />
        <DialogContainer className={drawer()}>
          <DialogContent>
            {props.children}
            <DialogCloseTrigger>
              <CloseButton aria-label="Close dialog" />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
        ≈
      </Portal>
    </Dialog>
  )
}
