import { type ReactNode } from 'react'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { PopoverProvider, type PopoverContext } from './popover-context'
import { usePopover, type UsePopoverProps } from './use-popover'

export interface PopoverProps
  extends Assign<
    UsePopoverProps,
    { children?: ReactNode | ((props: PopoverContext) => ReactNode) }
  > {}

export const Popover = (props: PopoverProps) => {
  const { children, ...usePopoverProps } = props

  const api = usePopover(usePopoverProps)
  const view = runIfFn(children, api)

  return <PopoverProvider value={api}>{view}</PopoverProvider>
}
