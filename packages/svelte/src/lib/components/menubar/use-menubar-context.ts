import { createContext } from '$lib/utils/create-context'
import type { UseMenubarReturn } from './use-menubar.svelte.ts'

export interface UseMenubarContext extends UseMenubarReturn {}
export const [MenubarProvider, useMenubarContext] = createContext<UseMenubarContext>({
  name: 'MenubarContext',
  strict: false,
})
