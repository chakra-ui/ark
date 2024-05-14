import { createContext } from '../../utils'
import type { UseHoverCardReturn } from './use-hover-card'

export interface UseHoverCardContext extends UseHoverCardReturn {}

export const [HoverCardProvider, useHoverCardContext] =
  createContext<UseHoverCardContext>('HoverCardContext')
