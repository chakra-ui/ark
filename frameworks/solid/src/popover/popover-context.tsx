import type { JSX } from 'solid-js'
import { usePopoverContext, type UsePopoverContext } from './use-popover-context'

export interface PopoverContextProps {
  children: (context: UsePopoverContext) => JSX.Element
}

export const PopoverContext = (props: PopoverContextProps) => props.children(usePopoverContext())
