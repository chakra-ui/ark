import type { connect } from '@zag-js/tabs'
import type { ComputedRef } from 'vue'
import { createContext } from '../context'
import type { UseTabsReturn } from './use-tabs'

export const [TabsProvider, useTabsContext] =
  createContext<ComputedRef<ReturnType<typeof connect>>>('TabsContext')

export type TabsContext = UseTabsReturn
