import { createContext } from '../../utils/create-context'
import type { UsePopoverReturn } from './use-popover'

export interface UsePopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverContext>({
  hookName: 'usePopoverContext',
  providerName: '<PopoverProvider />',
})
