import { createContext } from '$lib/utils/create-context'
import type { UseClipboardReturn } from './use-clipboard.svelte'

export interface UseClipboardContext extends UseClipboardReturn {}

export const [ClipboardProvider, useClipboardContext] = createContext<UseClipboardContext>({
  name: 'ClipboardContext',
})
