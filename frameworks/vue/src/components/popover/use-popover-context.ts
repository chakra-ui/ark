import { createContext } from '../../utils'
import type { UsePopoverReturn } from './use-popover'

export interface UsePopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] =
  createContext<UsePopoverContext>('PopoverContext')
