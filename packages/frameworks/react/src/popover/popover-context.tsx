import { usePopoverContext, type UsePopoverContext } from './use-popover-context'

export interface PopoverContextProps {
  children: (context: UsePopoverContext) => React.ReactNode
}

export const PopoverContext = (props: PopoverContextProps) => props.children(usePopoverContext())
