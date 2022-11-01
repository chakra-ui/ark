import { createContext } from '../createContext'
import type { UsePopoverReturn } from './use-popover'

export type PopoverContext = UsePopoverReturn

export const [PopoverProvider, usePopoverContext] = createContext<PopoverContext>({
  name: 'PopoverContext',
  hookName: 'usePopoverContext',
  providerName: '<PopoverProvider />',
})
