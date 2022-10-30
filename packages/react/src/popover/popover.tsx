import { PropsWithChildren } from 'react'
import { PopoverProvider } from './popover-context'
import { usePopover, UsePopoverProps } from './use-popover'

export type PopoverProps = PropsWithChildren<UsePopoverProps>

export const Popover = (props: PopoverProps) => {
  const { children, ...popoverProps } = props
  const { api } = usePopover(popoverProps)
  return <PopoverProvider value={api}>{children}</PopoverProvider>
}
