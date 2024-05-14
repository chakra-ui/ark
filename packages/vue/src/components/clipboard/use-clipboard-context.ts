import { createContext } from '../../utils'
import type { UseClipboardReturn } from './use-clipboard'

export interface UseClipboardContext extends UseClipboardReturn {}

export const [ClipboardProvider, useClipboardContext] =
  createContext<UseClipboardContext>('ClipboardContext')
