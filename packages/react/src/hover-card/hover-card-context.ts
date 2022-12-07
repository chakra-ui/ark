import { createContext } from '../create-context'
import type { UseHoverCardReturn } from './use-hover-card'

export type HoverCardContext = UseHoverCardReturn

export const [HoverCardProvider, useHoverCardContext] = createContext<HoverCardContext>({
  name: 'HoverCardContext',
  hookName: 'useHoverCardContext',
  providerName: '<HoverCardProvider />',
})
