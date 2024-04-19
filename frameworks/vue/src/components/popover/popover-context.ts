import { createContext } from '../../utils'
import type { UsePopoverReturn } from './use-popover'

export interface PopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContext>('PopoverContext')
