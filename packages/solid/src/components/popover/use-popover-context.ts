import { createContext } from '../../utils/create-context.ts'
import type { UsePopoverReturn } from './use-popover.ts'

export interface UsePopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverContext>({
  hookName: 'usePopoverContext',
  providerName: '<PopoverProvider />',
})
