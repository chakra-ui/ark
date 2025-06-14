import { createContext } from '$lib/utils/create-context'
import type { UseDialogReturn } from './use-dialog.svelte'

export interface UseDialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<UseDialogContext>({
  name: 'DialogContext',
})
