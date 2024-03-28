import type { ReactNode } from 'react'
import { usePopoverContext, type UsePopoverContext } from './use-popover-context'

export interface PopoverContextProps {
  children: (context: UsePopoverContext) => ReactNode
}

export const PopoverContext = (props: PopoverContextProps) => props.children(usePopoverContext())
