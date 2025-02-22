import { createContext } from '../../utils/create-context'

export type RootNode = ShadowRoot | Document | Node

export interface UseEnvironmentContext {
  /**
   * The root node of the application.
   * This is used to determine the window and document objects.
   */
  getRootNode(): RootNode
  /**
   * The document context for the root node.
   */
  getDocument(): Document
  /**
   * The window context for the root node.
   */
  getWindow(): Window & typeof globalThis
}

export const [EnvironmentContextProvider, useEnvironmentContext] = createContext<UseEnvironmentContext>({
  name: 'EnvironmentContext',
  hookName: 'useEnvironmentContext',
  providerName: '<EnvironmentProvider />',
  strict: false,
  defaultValue: {
    getRootNode: () => document,
    getDocument: () => document,
    getWindow: () => window,
  },
})
