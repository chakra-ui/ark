import { createContext } from '../context'
import { type UsePopoverReturn } from './use-popover'

export interface PopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContext>('PopoverContext')
