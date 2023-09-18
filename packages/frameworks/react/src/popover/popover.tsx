import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { PopoverProvider, type PopoverContext } from './popover-context'
import { usePopover, type UsePopoverProps } from './use-popover'

export type PopoverProps = Assign<
  UsePopoverProps,
  {
    children?: ReactNode | ((props: PopoverContext) => ReactNode)
  }
>

export const Popover = (props: PopoverProps) => {
  const { children, ...usePopoverProps } = props
  const popover = usePopover(usePopoverProps)
  const view = runIfFn(children, popover)

  return <PopoverProvider value={popover}>{view}</PopoverProvider>
}
