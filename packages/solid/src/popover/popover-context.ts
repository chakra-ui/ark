import { createContext } from '../createContext'
import type { UsePopoverReturn } from './use-popover'

export type PopoverContext = UsePopoverReturn

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContext>({
  hookName: 'usePopoverContext',
  providerName: '<PopoverProvider />',
})
