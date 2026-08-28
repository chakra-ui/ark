import { createContext } from '../../utils/create-context.ts'
import type { UseClipboardReturn } from './use-clipboard.ts'

export interface UseClipboardContext extends UseClipboardReturn {}

export const [ClipboardProvider, useClipboardContext] = createContext<UseClipboardContext>('ClipboardContext')
