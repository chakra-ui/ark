import type { PropsWithChildren } from 'react'
import { PopoverProvider } from './popover-context'
import { usePopover, UsePopoverProps } from './use-popover'

export type PopoverProps = PropsWithChildren<UsePopoverProps>

export const Popover = (props: PopoverProps) => {
  const { children, ...usePopoverProps } = props
  const popover = usePopover(usePopoverProps)

  return <PopoverProvider value={popover}>{children}</PopoverProvider>
}
