import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'

export interface UseEnvironmentContext {
  /**
   * The root node of the application.
   * This is used to determine the window and document objects.
   */
  getRootNode(): ShadowRoot | Document | Node
}

export const [EnvironmentProvider, useEnvironmentContext] =
  createContext<ComputedRef<UseEnvironmentContext> | null>('EnvironmentContext')
