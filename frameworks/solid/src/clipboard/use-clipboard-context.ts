import { createContext } from '../create-context'
import type { UseClipboardReturn } from './use-clipboard'

export interface UseClipboardContext extends UseClipboardReturn {}

export const [ClipboardProvider, useClipboardContext] = createContext<UseClipboardContext>({
  hookName: 'useClipboardContext',
  providerName: '<ClipboardProvider />',
})
