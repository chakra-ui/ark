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
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { CloseButton } from '../../shared/CloseButton'
import { IconButton } from '../../shared/IconButton'

export const MobileSidebarContainer = (props: PropsWithChildren) => (
  <Dialog>
    {({ close }) => (
      <>
        <DialogTrigger asChild>
          <IconButton icon={<FiMenu />} aria-label="Menu" variant="link" minW="unset" />
        </DialogTrigger>
        <RouteChangeHandler close={close} />
        <Portal>
          <DialogBackdrop className={drawer({ placement: 'left' })} />
          <DialogContainer className={drawer({ placement: 'left' })}>
            <DialogContent>
              {props.children}
              <DialogCloseTrigger asChild>
                <CloseButton aria-label="Close dialog" />
              </DialogCloseTrigger>
            </DialogContent>
          </DialogContainer>
        </Portal>
      </>
    )}
  </Dialog>
)

const RouteChangeHandler = ({ close }: { close: () => void }) => {
  const pathname = usePathname()
  useEffect(() => {
    close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  return null
}
