import { createContext } from '../create-context'
import { type UseClipboardReturn } from './use-clipboard'

export interface ClipboardContext extends UseClipboardReturn {}

export const [ClipboardProvider, useClipboardContext] = createContext<ClipboardContext>({
  hookName: 'useClipboardContext',
  providerName: '<ClipboardProvider />',
})
