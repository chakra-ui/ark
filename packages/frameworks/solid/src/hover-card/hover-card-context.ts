import { createContext } from '../create-context'
import { type UseHoverCardReturn } from './use-hover-card'

export interface HoverCardContext extends UseHoverCardReturn {}

export const [HoverCardProvider, useHoverCardContext] = createContext<HoverCardContext>({
  hookName: 'useHoverCardContext',
  providerName: '<HoverCardProvider />',
})
