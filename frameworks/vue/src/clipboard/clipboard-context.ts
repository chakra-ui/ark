import { createContext } from '../context'
import type { UseClipboardReturn } from './use-clipboard'

export interface ClipboardContext extends UseClipboardReturn {}
export const [ClipboardProvider, useClipboardContext] =
  createContext<ClipboardContext>('ClipboardContext')
