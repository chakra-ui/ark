import { createContext } from '../context'
import { type UseHoverCardReturn } from './use-hover-card'

export type HoverCardContext = UseHoverCardReturn

export const [HoverCardProvider, useHoverCardContext] =
  createContext<HoverCardContext>('HoverCardContext')
