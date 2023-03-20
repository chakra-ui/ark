import { type connect } from '@zag-js/hover-card'
import { type ComputedRef } from 'vue'
import { createContext } from '../context'
import { type UseHoverCardReturn } from './use-hover-card'

export const [HoverCardProvider, useHoverCardContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('HoverCardContext')

export type HoverCardContext = UseHoverCardReturn
