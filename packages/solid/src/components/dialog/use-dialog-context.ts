import { createContext } from '../../utils/create-context.ts'
import type { UseDialogReturn } from './use-dialog.ts'

export interface UseDialogContext extends UseDialogReturn {}

export const [DialogProvider, useDialogContext] = createContext<UseDialogContext>({
  hookName: 'useDialogContext',
  providerName: '<DialogProvider />',
})
