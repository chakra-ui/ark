import { createContext } from '$lib/utils/create-context'
import type { UsePinInputReturn } from './use-pin-input.svelte.ts'

export interface UsePinInputContext extends UsePinInputReturn {}
export const [PinInputProvider, usePinInputContext] = createContext<UsePinInputContext>({
  name: 'PinInputContext',
})
