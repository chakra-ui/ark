import { createContext } from '../../utils'
import type { UseClipboardReturn } from './use-clipboard'

export interface ClipboardContext extends UseClipboardReturn {}
export const [ClipboardProvider, useClipboardContext] =
  createContext<ClipboardContext>('ClipboardContext')
