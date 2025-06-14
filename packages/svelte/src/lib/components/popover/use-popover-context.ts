import { createContext } from '$lib/utils/create-context'
import type { UsePopoverReturn } from './use-popover.svelte'

export interface UsePopoverContext extends UsePopoverReturn {}

export const [PopoverProvider, usePopoverContext] = createContext<UsePopoverContext>({
  name: 'PopoverContext',
})
