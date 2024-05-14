import { createContext } from '../../utils/create-context'
import type { UseHoverCardReturn } from './use-hover-card'

export interface UseHoverCardContext extends UseHoverCardReturn {}

export const [HoverCardProvider, useHoverCardContext] = createContext<UseHoverCardContext>({
  name: 'HoverCardContext',
  hookName: 'useHoverCardContext',
  providerName: '<HoverCardProvider />',
})
