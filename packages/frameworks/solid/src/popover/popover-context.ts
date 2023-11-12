import { createContext } from '../create-context'
import { type UsePopoverReturn } from './use-popover'

export interface PopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContext>({
  hookName: 'usePopoverContext',
  providerName: '<PopoverProvider />',
})
