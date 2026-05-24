import { createContext } from '../../utils/create-context.ts'
import type { UseHoverCardReturn } from './use-hover-card.ts'

export interface UseHoverCardContext extends UseHoverCardReturn {}

export const [HoverCardProvider, useHoverCardContext] = createContext<UseHoverCardContext>({
  hookName: 'useHoverCardContext',
  providerName: '<HoverCardProvider />',
})
